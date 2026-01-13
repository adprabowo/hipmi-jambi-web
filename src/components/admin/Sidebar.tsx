"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Newspaper,
    Calendar,
    FolderOpen,
    FileText,
    Users,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/berita", label: "Berita", icon: Newspaper },
    { href: "/admin/acara", label: "Acara", icon: Calendar },
    { href: "/admin/program", label: "Program", icon: FolderOpen },
    { href: "/admin/publikasi", label: "Publikasi", icon: FileText },
    { href: "/admin/tim", label: "Tim", icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-hipmi-green rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">H</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">HIPMI Jambi</p>
                                <p className="text-xs text-gray-500">Admin Panel</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-hipmi-green text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Kembali ke Website
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
