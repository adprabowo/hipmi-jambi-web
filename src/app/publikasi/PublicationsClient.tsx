"use client";

import { useState } from "react";
import PublicationCard from "@/components/shared/PublicationCard";
import { Search, Filter, X } from "lucide-react";

interface Publication {
    id: string;
    slug: string;
    title: string;
    category: string;
    date: string;
    author: string | null;
    excerpt: string | null;
    image: string | null;
    downloadLink: string | null;
    tags: string[];
    published: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface Props {
    publications: Publication[];
}

export default function PublicationsClient({ publications }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ["Semua", ...Array.from(new Set(publications.map((item) => item.category)))];

    const filteredPublications = publications.filter((pub) => {
        const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (pub.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
        const matchesCategory = selectedCategory === "Semua" || pub.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="relative z-10 min-h-screen bg-gray-50 pb-20 bg-white">
            {/* Header */}
            <div className="bg-white border-b sticky top-20 z-40 shadow-sm">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
                        <h1 className="text-4xl font-serif font-bold text-hipmi-neutral mb-4">Perpustakaan Riset</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Akses koleksi lengkap analisis kebijakan, laporan ekonomi, dan jurnal riset kami.
                        </p>

                        {/* Search Bar UI */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari judul riset atau topik..."
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-hipmi-green focus:ring-1 focus:ring-hipmi-green transition shadow-sm"
                                />
                                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />

                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-red-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`px-6 py-3 border rounded-lg font-medium flex items-center gap-2 transition ${isFilterOpen || selectedCategory !== "Semua"
                                    ? "bg-hipmi-green text-white border-hipmi-green"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                Filter {selectedCategory !== "Semua" ? `(${selectedCategory})` : ""}
                            </button>
                        </div>

                        {isFilterOpen && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Pilih Kategori:</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat
                                                ? "bg-hipmi-gold text-white shadow-md"
                                                : "bg-white text-gray-600 border border-gray-200 hover:border-hipmi-gold hover:text-hipmi-gold"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-4 py-12">
                {filteredPublications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPublications.map((pub) => (
                            <PublicationCard
                                key={pub.id}
                                title={pub.title}
                                category={pub.category}
                                date={pub.date}
                                excerpt={pub.excerpt || ""}
                                slug={pub.slug}
                                image={pub.image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tidak ditemukan</h3>
                        <p className="text-gray-500">
                            Maaf, tidak ada riset yang cocok dengan kata kunci &quot;{searchQuery}&quot;
                            {selectedCategory !== "Semua" ? ` di kategori ${selectedCategory}` : ""}.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); }}
                            className="mt-6 text-hipmi-green font-bold hover:underline"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
