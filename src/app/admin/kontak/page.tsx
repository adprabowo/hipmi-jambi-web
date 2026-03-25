"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, MapPin, Mail, Phone, MessageCircle, Clock, Building2 } from "lucide-react";

interface ContactData {
    officeName: string;
    address: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    operationalHours: string;
}

export default function AdminContactPage() {
    const [formData, setFormData] = useState<ContactData>({
        officeName: "",
        address: "",
        email: "",
        phone: "",
        whatsappNumber: "",
        operationalHours: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Load existing contact data
    useEffect(() => {
        fetch("/api/contact")
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    officeName: data.officeName || "",
                    address: data.address || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    whatsappNumber: data.whatsappNumber || "",
                    operationalHours: data.operationalHours || "",
                });
            })
            .catch((err) => console.error("Error loading contact:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/contact", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            setMessage({ type: "success", text: "Informasi kontak berhasil disimpan!" });
        } catch {
            setMessage({ type: "error", text: "Gagal menyimpan. Silakan coba lagi." });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Kelola Halaman Kontak</h1>
                <p className="text-gray-600 mt-1">
                    Edit informasi kontak yang tampil di halaman Kontak dan Footer website
                </p>
            </div>

            {message && (
                <div
                    className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    {/* Nama Kantor */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            Nama Kantor
                        </label>
                        <input
                            type="text"
                            name="officeName"
                            value={formData.officeName}
                            onChange={handleChange}
                            placeholder="Contoh: Sekretariat HIPMI Jambi"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition"
                        />
                    </div>

                    {/* Alamat */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            Alamat Lengkap
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Alamat lengkap kantor..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition resize-none"
                        />
                    </div>

                    {/* Email & Telepon */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Mail className="w-4 h-4 text-gray-400" />
                                Email Resmi
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@contoh.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Phone className="w-4 h-4 text-gray-400" />
                                Telepon / WhatsApp (Tampilan)
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+62 741 1234 5678"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition"
                            />
                        </div>
                    </div>

                    {/* WhatsApp Number & Jam Operasional */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <MessageCircle className="w-4 h-4 text-gray-400" />
                                Nomor WhatsApp (untuk Form Kontak)
                            </label>
                            <input
                                type="text"
                                name="whatsappNumber"
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                placeholder="6285377347995 (tanpa + atau 0)"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition"
                            />
                            <p className="text-xs text-gray-500">Format: 628xxxxxxxx (tanpa tanda + atau 0 di depan)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Clock className="w-4 h-4 text-gray-400" />
                                Jam Operasional
                            </label>
                            <input
                                type="text"
                                name="operationalHours"
                                value={formData.operationalHours}
                                onChange={handleChange}
                                placeholder="Senin - Jumat: 08.00 - 17.00 WIB"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Tombol Simpan */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-hipmi-green text-white font-semibold rounded-lg hover:bg-hipmi-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" /> Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
