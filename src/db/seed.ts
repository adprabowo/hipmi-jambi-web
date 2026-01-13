import 'dotenv/config';
import { db } from './index';
import { news, events, programs, publications, teamMembers } from './schema';
import { nanoid } from 'nanoid';

// Data from dummy-data.ts
const newsArticles = [
    {
        slug: "audiensi-gubernur-jambi-2026",
        title: "BKS HIPMI Jambi Sampaikan 5 Poin Rekomendasi Strategis kepada Gubernur",
        date: "12 Januari 2026",
        category: "Kegiatan",
        excerpt: "Dalam audiensi tertutup, Bakastra HIPMI menyoroti pentingnya percepatan perbaikan infrastruktur jalan khusus batubara.",
        content: "Lorem ipsum dolor sit amet...",
    },
    {
        slug: "mou-bank-jambi",
        title: "Penandatanganan MoU dengan Bank Jambi untuk Riset Inklusi Keuangan",
        date: "05 Januari 2026",
        category: "Kerjasama",
        excerpt: "Kerjasama ini bertujuan memetakan akses permodalan bagi pengusaha muda pemula (start-up) di 11 Kabupaten/Kota.",
        content: "Lorem ipsum dolor sit amet...",
    },
    {
        slug: "pelantikan-pengurus-2026",
        title: "Wajah Baru, Semangat Baru: Pelantikan Pengurus Badan Kajian Strategis Periode 2026-2029",
        date: "20 Desember 2025",
        category: "Internal",
        excerpt: "Ketua Umum BPD HIPMI Jambi resmi melantik jajaran pengurus baru dengan fokus pada transformasi ekonomi hijau.",
        content: "Lorem ipsum dolor sit amet...",
    }
];

const eventsData = [
    {
        title: "Jambi Business & Investment Forum 2026",
        date: "15 Februari 2026",
        time: "09:00 - 16:00 WIB",
        location: "Ballroom Swiss-Belhotel Jambi",
        type: "Konferensi",
        description: "Pertemuan tahunan terbesar pelaku usaha Jambi membahas iklim investasi pasca Pemilu.",
        registrationLink: "#"
    },
    {
        title: "FGD: Masa Depan Hilirisasi Sawit Jambi",
        date: "28 Januari 2026",
        time: "13:00 - 15:00 WIB",
        location: "Ruang Pola Kantor Gubernur Jambi",
        type: "Focus Group Discussion",
        description: "Diskusi terarah melibatkan asosiasi petani, pengusaha pabrik, dan dinas perkebunan.",
        registrationLink: "#"
    },
    {
        title: "Workshop: Data Science untuk Analisis Pasar",
        date: "10 Maret 2026",
        time: "10:00 - 15:00 WIB",
        location: "Graha HIPMI Jambi",
        type: "Pelatihan",
        description: "Pelatihan teknis bagi anggota HIPMI untuk memanfaatkan Big Data dalam pengambilan keputusan bisnis.",
        registrationLink: "#"
    }
];

const programsData = [
    {
        title: "HIPMI Jambi Research Fellowship",
        description: "Program beasiswa penelitian bagi mahasiswa tingkat akhir di Jambi untuk melakukan skripsi bertema kewirausahaan.",
        status: "Buka",
        icon: "GraduationCap"
    },
    {
        title: "Klinik Kebijakan Bisnis",
        description: "Layanan konsultasi dan advokasi regulasi bagi anggota HIPMI yang terkendala masalah perizinan daerah.",
        status: "Aktif",
        icon: "Briefcase"
    },
    {
        title: "Jambi Economic Database (JED)",
        description: "Pengembangan pusat data terpadu ekonomi daerah yang dapat diakses oleh publik dan investor.",
        status: "Dalam Pengembangan",
        icon: "Database"
    }
];

const publicationsData = [
    {
        slug: "outlook-ekonomi-jambi-2026",
        title: "Jambi Economic Outlook 2026: Navigasi di Tengah Fluktuasi Komoditas",
        category: "Laporan Tahunan",
        date: "10 Januari 2026",
        author: "Tim Riset Ekonomi Makro",
        excerpt: "Analisis komprehensif mengenai proyeksi pertumbuhan ekonomi Jambi dengan fokus pada sektor perkebunan (sawit & karet) serta tantangan transisi energi di sektor pertambangan.",
        image: "/images/pub-outlook.jpg",
        downloadLink: "#",
        tags: ["Ekonomi Makro", "Komoditas", "Investasi"]
    },
    {
        slug: "policy-brief-hilirisasi-karet",
        title: "Policy Brief: Percepatan Hilirisasi Industri Karet Rakyat di Kabupaten Bungo & Tebo",
        category: "Policy Brief",
        date: "15 Desember 2025",
        author: "Dr. Rahmat Hidayat, SE, ME",
        excerpt: "Rekomendasi kebijakan untuk meningkatkan nilai tambah petani karet melalui skema offtaker BUMD dan insentif teknologi pengolahan lateks.",
        image: "/images/pub-karet.jpg",
        downloadLink: "#",
        tags: ["Hilirisasi", "Pertanian", "Kebijakan Publik"]
    },
    {
        slug: "digitalisasi-umkm-batik-jambi",
        title: "Transformasi Digital UMKM Batik Jambi: Studi Kasus Seberang Kota Jambi",
        category: "Jurnal Riset",
        date: "22 November 2025",
        author: "Divisi Kewirausahaan Digital",
        excerpt: "Studi lapangan mengenai efektivitas penggunaan marketplace dan pembayaran QRIS pada 50 pengerajin batik di kawasan Seberang.",
        image: "/images/pub-batik.jpg",
        downloadLink: "#",
        tags: ["UMKM", "Digitalisasi", "Ekonomi Kreatif"]
    },
    {
        slug: "potensi-wisata-geopark-merangin",
        title: "Mengukur Dampak Ekonomi Penetapan UNESCO Global Geopark Merangin",
        category: "Artikel Analisis",
        date: "05 November 2025",
        author: "Siti Aminah, S.Par",
        excerpt: "Evaluasi dampak ekonomi terhadap pendapatan masyarakat lokal pasca penetapan status UNESCO pada Geopark Merangin.",
        image: "/images/pub-geopark.jpg",
        downloadLink: "#",
        tags: ["Pariwisata", "Ekonomi Daerah"]
    }
];

const bpdHipmiLeaders = [
    { name: "Fadhillah Hasrul", role: "Ketua Umum", bio: "Visioner di balik arah strategis BPD HIPMI Jambi, berfokus pada kolaborasi lintas sektor dan pemberdayaan pengusaha muda daerah.", category: "bpd", sortOrder: 1 },
    { name: "Daillon Rezano", role: "Wakil Ketua Umum", bio: "Bertanggung jawab dalam koordinasi internal dan eksternal organisasi serta memastikan program kerja berjalan efektif.", category: "bpd", sortOrder: 2 },
    { name: "Revki Ramadhoni", role: "Sekretaris Umum", bio: "Mengelola administrasi organisasi dan menjadi jembatan komunikasi utama antar bidang dalam kepengurusan.", category: "bpd", sortOrder: 3 },
    { name: "M. Kadafi", role: "Bendahara Umum", bio: "Mengelola tata kelola keuangan organisasi yang transparan dan akuntabel untuk mendukung keberlanjutan program.", category: "bpd", sortOrder: 4 },
];

const bakastraLeaders = [
    { name: "Aditya Prabowo", role: "Ketua", bio: "Memimpin arah riset dan kajian strategis untuk memberikan rekomendasi kebijakan berbasis data bagi HIPMI dan pemerintah.", category: "bakastra", sortOrder: 1 },
    { name: "Deden", role: "Sekretaris", bio: "Mengkoordinasikan tim peneliti dan jadwal publikasi kajian serta memastikan kelancaran operasional badan.", category: "bakastra", sortOrder: 2 },
    { name: "Novita", role: "Bendahara", bio: "Mengelola anggaran riset dan kegiatan operasional Badan Kajian Strategis agar efisien dan tepat sasaran.", category: "bakastra", sortOrder: 3 },
];

async function seed() {
    console.log('🌱 Seeding database...');

    // Seed news
    console.log('📰 Seeding news...');
    for (const article of newsArticles) {
        await db.insert(news).values({
            id: nanoid(),
            ...article,
        }).onConflictDoNothing();
    }

    // Seed events
    console.log('📅 Seeding events...');
    for (const event of eventsData) {
        await db.insert(events).values({
            id: nanoid(),
            ...event,
        }).onConflictDoNothing();
    }

    // Seed programs
    console.log('📋 Seeding programs...');
    for (const program of programsData) {
        await db.insert(programs).values({
            id: nanoid(),
            ...program,
        }).onConflictDoNothing();
    }

    // Seed publications
    console.log('📚 Seeding publications...');
    for (const pub of publicationsData) {
        await db.insert(publications).values({
            id: nanoid(),
            ...pub,
            tags: JSON.stringify(pub.tags),
        }).onConflictDoNothing();
    }

    // Seed team members
    console.log('👥 Seeding team members...');
    for (const member of [...bpdHipmiLeaders, ...bakastraLeaders]) {
        await db.insert(teamMembers).values({
            id: nanoid(),
            ...member,
        }).onConflictDoNothing();
    }

    console.log('✅ Seeding completed!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
