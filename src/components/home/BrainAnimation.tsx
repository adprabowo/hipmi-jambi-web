"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Colors for the brain particles - White and Blue palette for contrast with red background
const COLORS = [
    new THREE.Color(0xffffff), // White
    new THREE.Color(0xe0f2fe), // Light Sky Blue
    new THREE.Color(0x7dd3fc), // Sky Blue
    new THREE.Color(0x38bdf8), // Bright Blue
    new THREE.Color(0x0ea5e9), // Cyan Blue
];

// Custom shader material for brain particles
const vertexShader = `
  uniform vec3 uPointer;
  uniform float uHover;
  uniform float uRotation;
  uniform float uSize;
  
  varying vec3 vColor;
  
  attribute vec3 aColor;
  attribute float aRotation;
  attribute float aSize;
  
  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  
  void main() {
    vColor = aColor;
    
    vec3 pos = position;
    
    // Scale based on size attribute
    pos *= aSize;
    
    // Rotation
    pos.xz *= rotate2d(aRotation * 3.14159);
    
    // Add instance position
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
    
    // Hover effect - particles move toward pointer
    if (uHover > 0.0) {
      vec3 worldPos = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      float dist = distance(worldPos, uPointer);
      float influence = smoothstep(0.3, 0.0, dist) * uHover;
      mvPosition.xyz += normalize(worldPos - uPointer) * influence * 0.05;
    }
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

function BrainModel() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { camera, pointer } = useThree();

    const [hovered, setHovered] = useState(false);
    const pointerRef = useRef(new THREE.Vector3());
    const hoverRef = useRef(0);

    // Load the brain model
    const { scene } = useGLTF("/models/brain.glb");

    // Extract vertices from brain mesh
    const { positions, colors, rotations, sizes, count } = useMemo(() => {
        let brainMesh: THREE.Mesh | null = null;
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                brainMesh = child as THREE.Mesh;
            }
        });

        if (!brainMesh) return { positions: [], colors: [], rotations: [], sizes: [], count: 0 };

        const geometry = (brainMesh as THREE.Mesh).geometry;
        const posArray = geometry.attributes.position.array;
        const count = geometry.attributes.position.count;

        const positions: THREE.Vector3[] = [];
        const colors: THREE.Color[] = [];
        const rotations: number[] = [];
        const sizes: number[] = [];

        for (let i = 0; i < posArray.length; i += 3) {
            positions.push(new THREE.Vector3(posArray[i], posArray[i + 1], posArray[i + 2]));
            colors.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
            rotations.push(THREE.MathUtils.randFloat(-1, 1));
            sizes.push(THREE.MathUtils.randFloat(0.3, 2));
        }

        return { positions, colors, rotations, sizes, count };
    }, [scene]);

    // Setup instanced mesh
    useEffect(() => {
        if (!meshRef.current || count === 0) return;

        const dummy = new THREE.Object3D();
        const colorArray = new Float32Array(count * 3);
        const rotationArray = new Float32Array(count);
        const sizeArray = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            dummy.position.copy(positions[i]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            colorArray[i * 3] = colors[i].r;
            colorArray[i * 3 + 1] = colors[i].g;
            colorArray[i * 3 + 2] = colors[i].b;

            rotationArray[i] = rotations[i];
            sizeArray[i] = sizes[i];
        }

        meshRef.current.instanceMatrix.needsUpdate = true;

        // Add custom attributes
        meshRef.current.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(colorArray, 3));
        meshRef.current.geometry.setAttribute("aRotation", new THREE.InstancedBufferAttribute(rotationArray, 1));
        meshRef.current.geometry.setAttribute("aSize", new THREE.InstancedBufferAttribute(sizeArray, 1));
    }, [count, positions, colors, rotations, sizes]);

    // Animation loop
    useFrame((state) => {
        if (!groupRef.current || !meshRef.current) return;

        // Slow rotation
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;

        // Update hover uniform
        const material = meshRef.current.material as THREE.ShaderMaterial;
        if (material.uniforms) {
            // Smooth hover transition
            hoverRef.current += (hovered ? 1 : 0 - hoverRef.current) * 0.1;
            material.uniforms.uHover.value = hoverRef.current;
            material.uniforms.uPointer.value = pointerRef.current;
        }

        // Camera follows mouse slightly
        camera.position.x += (pointer.x * 0.15 - camera.position.x) * 0.05;
        camera.position.y += (pointer.y * 0.1 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    if (count === 0) return null;

    return (
        <group
            ref={groupRef}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onPointerMove={(e) => {
                pointerRef.current.copy(e.point);
            }}
        >
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[0.004, 0.004, 0.004]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    wireframe
                    uniforms={{
                        uPointer: { value: new THREE.Vector3() },
                        uHover: { value: 0 },
                    }}
                />
            </instancedMesh>

            {/* Invisible mesh for raycasting */}
            <mesh visible={false}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial />
            </mesh>
        </group>
    );
}

export default function BrainAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full min-h-[500px]"
        >
            <Canvas
                camera={{ position: [0, 0, 0.95], fov: 75 }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
            >
                <BrainModel />
            </Canvas>
        </motion.div>
    );
}

// Preload the brain model
useGLTF.preload("/models/brain.glb");
