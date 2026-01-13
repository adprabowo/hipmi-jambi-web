"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const checkWhitelist = async (email: string): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/check-whitelist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            return data.allowed;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Check whitelist first
            const isAllowed = await checkWhitelist(formData.email);
            if (!isAllowed) {
                setError("Email tidak terdaftar sebagai admin. Hubungi administrator.");
                setIsLoading(false);
                return;
            }

            if (isLogin) {
                const result = await signIn.email({
                    email: formData.email,
                    password: formData.password,
                });
                if (result.error) {
                    setError(result.error.message || "Login gagal");
                } else {
                    router.push("/admin");
                    router.refresh();
                }
            } else {
                const result = await signUp.email({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                if (result.error) {
                    setError(result.error.message || "Registrasi gagal");
                } else {
                    router.push("/admin");
                    router.refresh();
                }
            }
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-hipmi-green/10 via-white to-hipmi-gold/10 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-hipmi-green rounded-2xl mb-4">
                        <span className="text-white font-bold text-2xl">H</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-gray-600">HIPMI Jambi CMS</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${isLogin
                                    ? "bg-hipmi-green text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Masuk
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${!isLogin
                                    ? "bg-hipmi-green text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Daftar
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    required={!isLogin}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent transition-all"
                                    placeholder="Masukkan nama"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent transition-all"
                                placeholder="admin@hipmijambi.co.id"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                                }
                                required
                                minLength={8}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent transition-all"
                                placeholder="Minimal 8 karakter"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-hipmi-green text-white font-medium rounded-lg hover:bg-hipmi-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? "Memproses..."
                                : isLogin
                                    ? "Masuk"
                                    : "Daftar Akun"}
                        </button>
                    </form>

                    {/* Info */}
                    <p className="mt-4 text-xs text-gray-500 text-center">
                        Hanya email yang terdaftar sebagai admin yang dapat mengakses dashboard.
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    &copy; 2026 Badan Kajian Strategis HIPMI Jambi
                </p>
            </div>
        </div>
    );
}
