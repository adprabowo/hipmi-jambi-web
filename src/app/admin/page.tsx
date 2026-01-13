import { db } from "@/db";
import { news, events, programs, publications, teamMembers } from "@/db/schema";
import { Newspaper, Calendar, FolderOpen, FileText, Users } from "lucide-react";

async function getStats() {
    const [newsCount, eventsCount, programsCount, publicationsCount, teamCount] = await Promise.all([
        db.select().from(news),
        db.select().from(events),
        db.select().from(programs),
        db.select().from(publications),
        db.select().from(teamMembers),
    ]);

    return {
        news: newsCount.length,
        events: eventsCount.length,
        programs: programsCount.length,
        publications: publicationsCount.length,
        team: teamCount.length,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        { label: "Berita", value: stats.news, icon: Newspaper, color: "bg-blue-500" },
        { label: "Acara", value: stats.events, icon: Calendar, color: "bg-green-500" },
        { label: "Program", value: stats.programs, icon: FolderOpen, color: "bg-purple-500" },
        { label: "Publikasi", value: stats.publications, icon: FileText, color: "bg-orange-500" },
        { label: "Anggota Tim", value: stats.team, icon: Users, color: "bg-pink-500" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Selamat datang di Admin Panel HIPMI Jambi</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Panduan Cepat</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hipmi-green/10 text-hipmi-green rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        <p>Gunakan menu di samping untuk navigasi ke halaman yang ingin dikelola</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hipmi-green/10 text-hipmi-green rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        <p>Klik tombol &quot;Tambah&quot; untuk menambahkan konten baru</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hipmi-green/10 text-hipmi-green rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        <p>Gunakan tombol Edit atau Hapus pada setiap item untuk mengelola konten</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hipmi-green/10 text-hipmi-green rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        <p>Perubahan akan langsung terlihat di website publik</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
