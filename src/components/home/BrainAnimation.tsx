"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Neural Network Nodes
function NeuralNodes() {
    const groupRef = useRef<THREE.Group>(null);
    const nodesRef = useRef<THREE.InstancedMesh>(null);

    // Generate random node positions in a brain-like shape
    const { positions, connections } = useMemo(() => {
        const nodeCount = 60;
        const positions: THREE.Vector3[] = [];
        const connections: [number, number][] = [];

        // Create nodes in a spherical brain-like distribution
        for (let i = 0; i < nodeCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;

            const radius = 2 + Math.random() * 0.5;
            const x = radius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.5;
            const y = radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.5;
            const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 0.5;

            positions.push(new THREE.Vector3(x, y, z));
        }

        // Create connections between nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = positions[i].distanceTo(positions[j]);
                if (dist < 1.5 && Math.random() > 0.3) {
                    connections.push([i, j]);
                }
            }
        }

        return { positions, connections };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {positions.map((pos, i) => (
                <mesh key={`node-${i}`} position={pos}>
                    <sphereGeometry args={[0.06 + Math.random() * 0.04, 16, 16]} />
                    <meshStandardMaterial
                        color="#4ade80"
                        emissive="#22c55e"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}

            {/* Connections */}
            {connections.map(([i, j], idx) => {
                const start = positions[i];
                const end = positions[j];
                const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
                const direction = new THREE.Vector3().subVectors(end, start);
                const length = direction.length();

                return (
                    <mesh key={`conn-${idx}`} position={mid}>
                        <cylinderGeometry args={[0.008, 0.008, length, 4]} />
                        <meshStandardMaterial
                            color="#86efac"
                            transparent
                            opacity={0.4}
                        />
                        <primitive
                            object={new THREE.Object3D()}
                            ref={(el: THREE.Object3D | null) => {
                                if (el) {
                                    el.parent?.lookAt(end);
                                    el.parent?.rotateX(Math.PI / 2);
                                }
                            }}
                        />
                    </mesh>
                );
            })}

            {/* Central Brain Core */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh scale={1.2}>
                    <icosahedronGeometry args={[1, 2]} />
                    <MeshDistortMaterial
                        color="#fbbf24"
                        distort={0.3}
                        speed={2}
                        roughness={0.4}
                        metalness={0.8}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </Float>
        </group>
    );
}

// Floating Particles
function Particles() {
    const particlesRef = useRef<THREE.Points>(null);

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={200}
                    array={particlePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} />
        </points>
    );
}

export default function BrainAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full min-h-[400px]"
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
                <NeuralNodes />
                <Particles />
            </Canvas>
        </motion.div>
    );
}
