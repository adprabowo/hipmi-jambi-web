// Data Identitas Organisasi
export const organizationInfo = {
  name: "Badan Kajian Strategis BPD HIPMI Jambi",
  shortName: "BKS HIPMI Jambi",
  tagline: "Merajut Data, Membangun Ekonomi Jambi",
  description: "Lembaga think-tank independen di bawah naungan BPD HIPMI Jambi yang berfokus pada riset ekonomi, analisis kebijakan publik, dan pengembangan ekosistem kewirausahaan di Provinsi Jambi.",
  address: "Sekretariat HIPMI Jambi, Jl. Mayjen Jusuf Singedekane, Kota Jambi, 36122",
  email: "info@bakastra.hipmijambi.co.id",
  phone: "+62 741 1234 5678",
  social: {
    instagram: "@hipmijambi.bakastra",
    linkedin: "Badan Kajian Strategis HIPMI Jambi"
  }
};

// Data Statistik (Untuk Hero Section)
export const statistics = [
  { label: "Publikasi Riset", value: "45+", suffix: "Dokumen" },
  { label: "Mitra Kolaborasi", value: "28", suffix: "Institusi" },
  { label: "Rekomendasi Kebijakan", value: "12", suffix: "Diadopsi" },
  { label: "Keterlibatan Ahli", value: "30+", suffix: "Peneliti" },
];

// Data Publikasi (Riset, Policy Brief, Artikel)
export const publications = [
  {
    id: "pub-001",
    slug: "outlook-ekonomi-jambi-2026",
    title: "Jambi Economic Outlook 2026: Navigasi di Tengah Fluktuasi Komoditas",
    category: "Laporan Tahunan",
    date: "10 Januari 2026",
    author: "Tim Riset Ekonomi Makro",
    excerpt: "Analisis komprehensif mengenai proyeksi pertumbuhan ekonomi Jambi dengan fokus pada sektor perkebunan (sawit & karet) serta tantangan transisi energi di sektor pertambangan.",
    image: "/images/pub-outlook.jpg", // Pastikan file ada atau gunakan placeholder
    downloadLink: "#",
    tags: ["Ekonomi Makro", "Komoditas", "Investasi"]
  },
  {
    id: "pub-002",
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
    id: "pub-003",
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
    id: "pub-004",
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

// Data Pengurus BPD HIPMI Jambi (Section 1)
export const bpdHipmiLeaders = [
  {
    id: "bpd-01",
    name: "Fadhillah Hasrul",
    role: "Ketua Umum",
    bio: "Visioner di balik arah strategis BPD HIPMI Jambi, berfokus pada kolaborasi lintas sektor dan pemberdayaan pengusaha muda daerah.",
    image: "", // Kosongkan agar muncul inisial
  },
  {
    id: "bpd-02",
    name: "Daillon Rezano",
    role: "Wakil Ketua Umum",
    bio: "Bertanggung jawab dalam koordinasi internal dan eksternal organisasi serta memastikan program kerja berjalan efektif.",
    image: "",
  },
  {
    id: "bpd-03",
    name: "Revki Ramadhoni",
    role: "Sekretaris Umum",
    bio: "Mengelola administrasi organisasi dan menjadi jembatan komunikasi utama antar bidang dalam kepengurusan.",
    image: "",
  },
  {
    id: "bpd-04",
    name: "M. Kadafi",
    role: "Bendahara Umum",
    bio: "Mengelola tata kelola keuangan organisasi yang transparan dan akuntabel untuk mendukung keberlanjutan program.",
    image: "",
  }
];

// Data Pengurus Basnom Bakastra (Section 2)
export const bakastraLeaders = [
  {
    id: "bakastra-01",
    name: "Aditya Prabowo",
    role: "Ketua",
    bio: "Memimpin arah riset dan kajian strategis untuk memberikan rekomendasi kebijakan berbasis data bagi HIPMI dan pemerintah.",
    image: "",
  },
  {
    id: "bakastra-02",
    name: "Deden",
    role: "Sekretaris",
    bio: "Mengkoordinasikan tim peneliti dan jadwal publikasi kajian serta memastikan kelancaran operasional badan.",
    image: "",
  },
  {
    id: "bakastra-03",
    name: "Novita",
    role: "Bendahara",
    bio: "Mengelola anggaran riset dan kegiatan operasional Badan Kajian Strategis agar efisien dan tepat sasaran.",
    image: "",
  }
];

// Data Berita & Kegiatan Terbaru
export const newsArticles = [
  {
    id: "news-01",
    slug: "audiensi-gubernur-jambi-2026",
    title: "BKS HIPMI Jambi Sampaikan 5 Poin Rekomendasi Strategis kepada Gubernur",
    date: "12 Januari 2026",
    category: "Kegiatan",
    excerpt: "Dalam audiensi tertutup, Bakastra HIPMI menyoroti pentingnya percepatan perbaikan infrastruktur jalan khusus batubara.",
    content: "..." // Isi lengkap bisa ditambahkan nanti
  },
  {
    id: "news-02",
    slug: "mou-bank-jambi",
    title: "Penandatanganan MoU dengan Bank Jambi untuk Riset Inklusi Keuangan",
    date: "05 Januari 2026",
    category: "Kerjasama",
    excerpt: "Kerjasama ini bertujuan memetakan akses permodalan bagi pengusaha muda pemula (start-up) di 11 Kabupaten/Kota.",
    content: "..."
  },
  {
    id: "news-03",
    slug: "pelantikan-pengurus-2026",
    title: "Wajah Baru, Semangat Baru: Pelantikan Pengurus Badan Kajian Strategis Periode 2026-2029",
    date: "20 Desember 2025",
    category: "Internal",
    excerpt: "Ketua Umum BPD HIPMI Jambi resmi melantik jajaran pengurus baru dengan fokus pada transformasi ekonomi hijau.",
    content: "..."
  }
];

// Data Acara (Events)
export const events = [
  {
    id: "evt-01",
    title: "Jambi Business & Investment Forum 2026",
    date: "15 Februari 2026",
    time: "09:00 - 16:00 WIB",
    location: "Ballroom Swiss-Belhotel Jambi",
    type: "Konferensi",
    description: "Pertemuan tahunan terbesar pelaku usaha Jambi membahas iklim investasi pasca Pemilu.",
    registrationLink: "#"
  },
  {
    id: "evt-02",
    title: "FGD: Masa Depan Hilirisasi Sawit Jambi",
    date: "28 Januari 2026",
    time: "13:00 - 15:00 WIB",
    location: "Ruang Pola Kantor Gubernur Jambi",
    type: "Focus Group Discussion",
    description: "Diskusi terarah melibatkan asosiasi petani, pengusaha pabrik, dan dinas perkebunan.",
    registrationLink: "#"
  },
  {
    id: "evt-03",
    title: "Workshop: Data Science untuk Analisis Pasar",
    date: "10 Maret 2026",
    time: "10:00 - 15:00 WIB",
    location: "Graha HIPMI Jambi",
    type: "Pelatihan",
    description: "Pelatihan teknis bagi anggota HIPMI untuk memanfaatkan Big Data dalam pengambilan keputusan bisnis.",
    registrationLink: "#"
  }
];

// Data Program Unggulan
export const programs = [
  {
    id: "prog-01",
    title: "HIPMI Jambi Research Fellowship",
    description: "Program beasiswa penelitian bagi mahasiswa tingkat akhir di Jambi untuk melakukan skripsi bertema kewirausahaan.",
    status: "Buka",
    icon: "GraduationCap" // Nama icon untuk mapping di komponen
  },
  {
    id: "prog-02",
    title: "Klinik Kebijakan Bisnis",
    description: "Layanan konsultasi dan advokasi regulasi bagi anggota HIPMI yang terkendala masalah perizinan daerah.",
    status: "Aktif",
    icon: "Briefcase"
  },
  {
    id: "prog-03",
    title: "Jambi Economic Database (JED)",
    description: "Pengembangan pusat data terpadu ekonomi daerah yang dapat diakses oleh publik dan investor.",
    status: "Dalam Pengembangan",
    icon: "Database"
  }
];

// Data FAQ (Untuk Halaman Kontak/Support)
export const faqs = [
  {
    question: "Bagaimana cara mengakses hasil riset Bakastra HIPMI Jambi?",
    answer: "Semua publikasi ringkasan eksekutif dapat diunduh gratis di halaman Publikasi. Untuk laporan lengkap, silakan mengajukan permohonan via email."
  },
  {
    question: "Apakah BKS HIPMI Jambi menerima kerjasama riset?",
    answer: "Ya, kami sangat terbuka untuk kolaborasi riset dengan universitas, pemerintah daerah, dan sektor swasta."
  },
  {
    question: "Bagaimana cara menjadi peneliti tamu?",
    answer: "Silakan pantau halaman Program untuk pembukaan Research Fellowship atau kirimkan CV dan portofolio riset Anda ke email kami."
  }
];