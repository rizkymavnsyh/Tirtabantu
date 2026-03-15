// Mock data for TirtaBantu

export type Role = "admin" | "petugas" | "masyarakat";

export interface User {
  id: number;
  nama: string;
  email: string;
  role: Role;
  wilayah_id: number;
  avatar?: string;
}

export interface Wilayah {
  id: number;
  nama: string;
  kecamatan: string;
}

export interface KategoriLaporan {
  id: number;
  nama: string;
  deskripsi: string;
}

export type StatusLaporan = "Menunggu" | "Divalidasi" | "Diproses" | "Selesai" | "Ditolak";

export interface Laporan {
  id: number;
  user_id: number;
  wilayah_id: number;
  kategori_id: number;
  deskripsi: string;
  foto_bukti: string;
  status: StatusLaporan;
  tgl_lapor: string;
  rating?: number;
  ulasan?: string;
}

export interface Penugasan {
  id: number;
  laporan_id: number;
  petugas_id: number;
  tgl_penugasan: string;
  status: "Ditugaskan" | "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai";
  foto_penyelesaian?: string;
}

export interface Pengumuman {
  id: number;
  judul: string;
  isi: string;
  tgl_posting: string;
  penting: boolean;
}

export const wilayahList: Wilayah[] = [
  { id: 1, nama: "Desa Sukamaju", kecamatan: "Kec. Cianjur" },
  { id: 2, nama: "Desa Mekarjaya", kecamatan: "Kec. Sumedang" },
  { id: 3, nama: "Kel. Cibadak", kecamatan: "Kec. Cibadak" },
  { id: 4, nama: "Desa Cipanas", kecamatan: "Kec. Cipanas" },
  { id: 5, nama: "Kel. Cimaung", kecamatan: "Kec. Bandung Selatan" },
];

export const kategoriList: KategoriLaporan[] = [
  { id: 1, nama: "Pipa Bocor", deskripsi: "Laporan kebocoran pipa distribusi air" },
  { id: 2, nama: "Air Keruh", deskripsi: "Laporan kualitas air yang keruh atau berbau" },
  { id: 3, nama: "Permintaan Tangki Air", deskripsi: "Permintaan pasokan air darurat via tangki" },
  { id: 4, nama: "Kerusakan Meteran", deskripsi: "Laporan kerusakan pada alat meteran air" },
  { id: 5, nama: "Pipa Tersumbat", deskripsi: "Laporan pipa yang tersumbat atau tidak mengalir" },
];

export const userList: User[] = [
  { id: 1, nama: "Admin Utama", email: "admin@tirtabantu.id", role: "admin", wilayah_id: 1 },
  { id: 2, nama: "Budi Hartono", email: "budi@tirtabantu.id", role: "petugas", wilayah_id: 1 },
  { id: 3, nama: "Siti Aminah", email: "siti@tirtabantu.id", role: "petugas", wilayah_id: 2 },
  { id: 4, nama: "Andi Pratama", email: "andi@gmail.com", role: "masyarakat", wilayah_id: 1 },
  { id: 5, nama: "Dewi Lestari", email: "dewi@gmail.com", role: "masyarakat", wilayah_id: 3 },
  { id: 6, nama: "Rudi Setiawan", email: "rudi@tirtabantu.id", role: "petugas", wilayah_id: 4 },
  { id: 7, nama: "Nur Halimah", email: "nur@gmail.com", role: "masyarakat", wilayah_id: 2 },
];

export const laporanList: Laporan[] = [
  { id: 1, user_id: 4, wilayah_id: 1, kategori_id: 1, deskripsi: "Pipa bocor di depan rumah Jl. Merdeka No 12, air menyembur sejak pagi.", foto_bukti: "", status: "Selesai", tgl_lapor: "2026-02-10", rating: 5, ulasan: "Petugas sangat cepat tanggap." },
  { id: 2, user_id: 5, wilayah_id: 3, kategori_id: 2, deskripsi: "Air yang keluar dari keran berwarna cokelat dan berbau sejak 2 hari lalu.", foto_bukti: "", status: "Diproses", tgl_lapor: "2026-03-01" },
  { id: 3, user_id: 7, wilayah_id: 2, kategori_id: 3, deskripsi: "Desa kami sudah 3 hari tidak ada air, mohon kirim tangki air darurat.", foto_bukti: "", status: "Menunggu", tgl_lapor: "2026-03-10" },
  { id: 4, user_id: 4, wilayah_id: 1, kategori_id: 4, deskripsi: "Meteran air di rumah saya berputar terus padahal keran ditutup.", foto_bukti: "", status: "Divalidasi", tgl_lapor: "2026-03-12" },
  { id: 5, user_id: 5, wilayah_id: 3, kategori_id: 1, deskripsi: "Pipa utama di Gang Mawar retak dan air terbuang ke jalan.", foto_bukti: "", status: "Selesai", tgl_lapor: "2026-01-20", rating: 4, ulasan: "Perbaikan cukup baik." },
  { id: 6, user_id: 7, wilayah_id: 2, kategori_id: 5, deskripsi: "Pipa di RT 03 tersumbat, air tidak mengalir sama sekali ke rumah warga.", foto_bukti: "", status: "Diproses", tgl_lapor: "2026-03-05" },
  { id: 7, user_id: 4, wilayah_id: 1, kategori_id: 2, deskripsi: "Air PDAM keruh kecokelatan sudah 1 minggu di wilayah Sukamaju.", foto_bukti: "", status: "Menunggu", tgl_lapor: "2026-03-13" },
  { id: 8, user_id: 5, wilayah_id: 3, kategori_id: 3, deskripsi: "Kekeringan di area Cibadak, butuh suplai air bersih segera.", foto_bukti: "", status: "Ditolak", tgl_lapor: "2026-02-28" },
  { id: 9, user_id: 7, wilayah_id: 2, kategori_id: 1, deskripsi: "Bocor pada sambungan pipa baru di Jl. Raya Sumedang.", foto_bukti: "", status: "Selesai", tgl_lapor: "2026-01-15", rating: 5, ulasan: "Penanganan cepat, terima kasih!" },
  { id: 10, user_id: 4, wilayah_id: 1, kategori_id: 4, deskripsi: "Meteran air pecah terkena benda jatuh.", foto_bukti: "", status: "Diproses", tgl_lapor: "2026-03-08" },
];

export const penugasanList: Penugasan[] = [
  { id: 1, laporan_id: 1, petugas_id: 2, tgl_penugasan: "2026-02-10", status: "Selesai", foto_penyelesaian: "" },
  { id: 2, laporan_id: 2, petugas_id: 3, tgl_penugasan: "2026-03-02", status: "Sedang Dikerjakan" },
  { id: 3, laporan_id: 5, petugas_id: 2, tgl_penugasan: "2026-01-21", status: "Selesai", foto_penyelesaian: "" },
  { id: 4, laporan_id: 6, petugas_id: 3, tgl_penugasan: "2026-03-06", status: "Menuju Lokasi" },
  { id: 5, laporan_id: 9, petugas_id: 3, tgl_penugasan: "2026-01-16", status: "Selesai", foto_penyelesaian: "" },
  { id: 6, laporan_id: 10, petugas_id: 6, tgl_penugasan: "2026-03-09", status: "Ditugaskan" },
];

export const pengumumanList: Pengumuman[] = [
  { id: 1, judul: "Pemadaman Air Wilayah Cianjur", isi: "Sehubungan dengan perbaikan pipa utama distribusi, air PDAM di wilayah Kec. Cianjur akan dipadamkan pada tanggal 16-17 Maret 2026. Mohon warga menyiapkan cadangan air.", tgl_posting: "2026-03-14", penting: true },
  { id: 2, judul: "Jadwal Pengiriman Tangki Air Darurat", isi: "Bagi warga Desa Mekarjaya yang terdampak kekeringan, pengiriman tangki air darurat akan dilakukan setiap hari Senin dan Kamis pukul 08.00 WIB di Balai Desa.", tgl_posting: "2026-03-12", penting: true },
  { id: 3, judul: "Himbauan Hemat Air", isi: "Memasuki musim kemarau, kami menghimbau seluruh warga untuk menghemat penggunaan air. Mari bersama-sama menjaga ketersediaan air bersih.", tgl_posting: "2026-03-10", penting: false },
];

// Chart data for dashboard
export const laporanPerBulan = [
  { bulan: "Jan", total: 5, selesai: 4 },
  { bulan: "Feb", total: 8, selesai: 6 },
  { bulan: "Mar", total: 12, selesai: 3 },
];

export const statusDistribusi = [
  { name: "Menunggu", value: 2, color: "#f59e0b" },
  { name: "Divalidasi", value: 1, color: "#3b82f6" },
  { name: "Diproses", value: 3, color: "#8b5cf6" },
  { name: "Selesai", value: 3, color: "#10b981" },
  { name: "Ditolak", value: 1, color: "#ef4444" },
];

export const kinerjaPetugas = [
  { nama: "Budi Hartono", selesai: 2, aktif: 0 },
  { nama: "Siti Aminah", selesai: 2, aktif: 2 },
  { nama: "Rudi Setiawan", selesai: 0, aktif: 1 },
];
