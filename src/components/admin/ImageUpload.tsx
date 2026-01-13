"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Gambar" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Upload gagal");
                return;
            }

            onChange(data.url);
        } catch (err) {
            console.error("Upload error:", err);
            setError("Terjadi kesalahan saat upload");
        } finally {
            setIsUploading(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            {value ? (
                <div className="relative inline-block">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-hipmi-green transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                        ) : (
                            <>
                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload</span>
                                <span className="text-xs text-gray-400">Max 5MB</span>
                            </>
                        )}
                    </label>
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            {/* Manual URL input */}
            <div className="mt-3">
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Atau masukkan URL gambar"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                />
            </div>
        </div>
    );
}
