"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
    id: string;
    type: "news" | "events" | "programs" | "publications" | "team";
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Gagal menghapus item");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Terjadi kesalahan");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
