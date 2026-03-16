// =============================================
// TirtaBantu - Mock Data (Revised)
// =============================================

export type Role = "admin" | "petugas" | "masyarakat";

export interface User {
  id: number;
  nama: string;
  email: string;
  role: Role;
  telepon: string;
  avatar?: string;
}

export interface KategoriLaporan {
  id: number;
  nama: string;
  deskripsi: string;
  icon: string;
  tarif: number;
  keterangan_tarif: string;
}

export type StatusLaporan =
  | "Menunggu Validasi"
  | "Divalidasi"
  | "Ditolak"
  | "Ditugaskan"
  | "Menuju Lokasi"
  | "Sedang Dikerjakan"
  | "Menunggu Konfirmasi"
  | "Selesai"
  | "Belum Selesai";

export interface Koordinat {
  lat: number;
  lng: number;
}

export interface Laporan {
  id: number;
  user_id: number;
  kategori_id: number;
  // Alamat detail rumah
  alamat_lengkap: string;
  no_rumah: string;
  rt_rw: string;
  kelurahan: string;
  kecamatan: string;
  koordinat: Koordinat;
  // Detail laporan
  deskripsi: string;
  foto_bukti: string;
  status: StatusLaporan;
  tgl_lapor: string;
  // Validasi admin
  perlu_turun_lapangan: boolean | null; // null = belum divalidasi
  catatan_validasi: string;
  // Rating & feedback pelanggan
  rating?: number;
  ulasan?: string;
  // Feedback jika belum selesai
  feedback_pelanggan?: string;
}

export interface Penugasan {
  id: number;
  laporan_id: number;
  petugas_id: number;
  tgl_penugasan: string;
  status: "Ditugaskan" | "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai";
  foto_penyelesaian?: string;
  catatan_petugas?: string;
}

export interface Pembayaran {
  id: number;
  laporan_id: number;
  user_id: number;
  jumlah: number;
  deskripsi_biaya: string;
  status: "Belum Dibayar" | "Menunggu Verifikasi" | "Lunas" | "Gratis";
  metode_bayar?: string;
  tgl_bayar?: string;
  tgl_jatuh_tempo: string;
  bukti_bayar?: string;
}

export interface Pengumuman {
  id: number;
  judul: string;
  isi: string;
  tgl_posting: string;
  penting: boolean;
  kategori: "gangguan" | "jadwal" | "info" | "darurat";
}

// =============================================
// DATA
// =============================================

export const kategoriList: KategoriLaporan[] = [
  { id: 1, nama: "Pipa Bocor", deskripsi: "Laporan kebocoran pipa distribusi air di area rumah", icon: "🔧", tarif: 50000, keterangan_tarif: "Biaya jasa perbaikan ringan. Jika butuh material tambahan, dikenakan biaya material sesuai kebutuhan." },
  { id: 2, nama: "Air Keruh / Berbau", deskripsi: "Laporan kualitas air yang keruh, berbau, atau berubah warna", icon: "💧", tarif: 0, keterangan_tarif: "GRATIS — Pengecekan kualitas air adalah layanan dasar yang disubsidi pemerintah." },
  { id: 3, nama: "Permintaan Tangki Air", deskripsi: "Permintaan pasokan air darurat via tangki ke rumah", icon: "🚛", tarif: 75000, keterangan_tarif: "Biaya operasional pengiriman per tangki (5.000 liter). Gratis untuk daerah bencana/darurat." },
  { id: 5, nama: "Pipa Tersumbat", deskripsi: "Laporan pipa yang tersumbat atau aliran air kecil/mati", icon: "🚫", tarif: 35000, keterangan_tarif: "Biaya jasa pembersihan dan pemeriksaan pipa. Sudah termasuk alat kerja." },
  { id: 6, nama: "Sambungan Baru", deskripsi: "Permohonan pemasangan sambungan air baru ke rumah", icon: "🏠", tarif: 250000, keterangan_tarif: "Biaya survey + pemasangan awal (DP). Total biaya tergantung jarak pipa, dibayar bertahap." },
];

export const userList: User[] = [
  { id: 1, nama: "Admin Utama", email: "admin@tirtabantu.id", role: "admin", telepon: "08111222333" },
  { id: 2, nama: "Budi Hartono", email: "budi@tirtabantu.id", role: "petugas", telepon: "08222333444" },
  { id: 3, nama: "Siti Aminah", email: "siti@tirtabantu.id", role: "petugas", telepon: "08333444555" },
  { id: 4, nama: "Andi Pratama", email: "andi@gmail.com", role: "masyarakat", telepon: "08444555666" },
  { id: 5, nama: "Dewi Lestari", email: "dewi@gmail.com", role: "masyarakat", telepon: "08555666777" },
  { id: 6, nama: "Rudi Setiawan", email: "rudi@tirtabantu.id", role: "petugas", telepon: "08666777888" },
  { id: 7, nama: "Nur Halimah", email: "nur@gmail.com", role: "masyarakat", telepon: "08777888999" },
];

export const laporanList: Laporan[] = [
  {
    id: 1001, user_id: 4, kategori_id: 1,
    alamat_lengkap: "Jl. Merdeka No. 12", no_rumah: "12", rt_rw: "RT 03/RW 05",
    kelurahan: "Sukamaju", kecamatan: "Cianjur",
    koordinat: { lat: -6.7324, lng: 107.1400 },
    deskripsi: "Pipa bocor di depan rumah, air menyembur sejak pagi hari. Sudah mengganggu jalan dan halaman tetangga.",
    foto_bukti: "", status: "Selesai", tgl_lapor: "2026-02-10",
    perlu_turun_lapangan: true, catatan_validasi: "Perlu dicek langsung, potensi kerusakan besar.",
    rating: 5, ulasan: "Petugas sangat cepat tanggap, perbaikan rapi. Terima kasih!"
  },
  {
    id: 1002, user_id: 5, kategori_id: 2,
    alamat_lengkap: "Jl. Kenanga No. 7A", no_rumah: "7A", rt_rw: "RT 01/RW 02",
    kelurahan: "Cibadak", kecamatan: "Cibadak",
    koordinat: { lat: -6.8750, lng: 106.7710 },
    deskripsi: "Air yang keluar dari keran berwarna cokelat dan berbau tanah sejak 2 hari lalu. Seluruh keran di rumah sama.",
    foto_bukti: "", status: "Sedang Dikerjakan", tgl_lapor: "2026-03-01",
    perlu_turun_lapangan: true, catatan_validasi: "Kirim petugas untuk cek sumber kontaminasi."
  },
  {
    id: 1003, user_id: 7, kategori_id: 3,
    alamat_lengkap: "Jl. Raya Sumedang KM 5", no_rumah: "25", rt_rw: "RT 05/RW 08",
    kelurahan: "Mekarjaya", kecamatan: "Sumedang",
    koordinat: { lat: -6.8580, lng: 107.9190 },
    deskripsi: "Desa kami sudah 3 hari tidak ada air dari PDAM. Mohon segera kirimkan tangki air darurat untuk warga.",
    foto_bukti: "", status: "Menunggu Validasi", tgl_lapor: "2026-03-10",
    perlu_turun_lapangan: null, catatan_validasi: ""
  },
  {
    id: 1005, user_id: 5, kategori_id: 1,
    alamat_lengkap: "Jl. Mawar No. 3", no_rumah: "3", rt_rw: "RT 02/RW 04",
    kelurahan: "Cibadak", kecamatan: "Cibadak",
    koordinat: { lat: -6.8760, lng: 106.7720 },
    deskripsi: "Pipa utama di depan gang retak besar, air terbuang ke jalan. Sudah dilaporkan warga sekitar.",
    foto_bukti: "", status: "Selesai", tgl_lapor: "2026-01-20",
    perlu_turun_lapangan: true, catatan_validasi: "Kerusakan pipa utama, prioritas tinggi.",
    rating: 4, ulasan: "Perbaikan cukup baik, tapi agak lama datangnya."
  },
  {
    id: 1006, user_id: 7, kategori_id: 5,
    alamat_lengkap: "Jl. Raya Sumedang No. 10", no_rumah: "10", rt_rw: "RT 03/RW 06",
    kelurahan: "Mekarjaya", kecamatan: "Sumedang",
    koordinat: { lat: -6.8570, lng: 107.9200 },
    deskripsi: "Pipa di bawah dapur tersumbat total, air tidak mengalir ke rumah sejak kemarin sore.",
    foto_bukti: "", status: "Menunggu Konfirmasi", tgl_lapor: "2026-03-05",
    perlu_turun_lapangan: true, catatan_validasi: "Kirim petugas segera."
  },
  {
    id: 1007, user_id: 4, kategori_id: 2,
    alamat_lengkap: "Jl. Merdeka No. 15B", no_rumah: "15B", rt_rw: "RT 04/RW 05",
    kelurahan: "Sukamaju", kecamatan: "Cianjur",
    koordinat: { lat: -6.7330, lng: 107.1410 },
    deskripsi: "Air PDAM keruh kecokelatan sudah 1 minggu. Tidak layak pakai untuk masak dan mandi.",
    foto_bukti: "", status: "Menunggu Validasi", tgl_lapor: "2026-03-13",
    perlu_turun_lapangan: null, catatan_validasi: ""
  },
  {
    id: 1008, user_id: 5, kategori_id: 3,
    alamat_lengkap: "Jl. Kenanga No. 20", no_rumah: "20", rt_rw: "RT 03/RW 02",
    kelurahan: "Cibadak", kecamatan: "Cibadak",
    koordinat: { lat: -6.8740, lng: 106.7700 },
    deskripsi: "Kekeringan di area Cibadak, rumah sudah 5 hari tanpa air sama sekali.",
    foto_bukti: "", status: "Ditolak", tgl_lapor: "2026-02-28",
    perlu_turun_lapangan: false, catatan_validasi: "Area sudah masuk jadwal perbaikan pipa utama minggu depan. Sementara bisa ambil air di posko darurat Balai Desa."
  },
  {
    id: 1009, user_id: 7, kategori_id: 1,
    alamat_lengkap: "Jl. Anggrek No. 8", no_rumah: "8", rt_rw: "RT 01/RW 07",
    kelurahan: "Mekarjaya", kecamatan: "Sumedang",
    koordinat: { lat: -6.8590, lng: 107.9180 },
    deskripsi: "Bocor pada sambungan pipa baru di depan rumah. Air menggenang di halaman.",
    foto_bukti: "", status: "Selesai", tgl_lapor: "2026-01-15",
    perlu_turun_lapangan: true, catatan_validasi: "Cek sambungan instalasi baru.",
    rating: 5, ulasan: "Penanganan sangat cepat dan profesional, terima kasih TirtaBantu!"
  },
  {
    id: 1010, user_id: 4, kategori_id: 6,
    alamat_lengkap: "Jl. Merdeka No. 30", no_rumah: "30", rt_rw: "RT 06/RW 05",
    kelurahan: "Sukamaju", kecamatan: "Cianjur",
    koordinat: { lat: -6.7340, lng: 107.1420 },
    deskripsi: "Mohon pemasangan sambungan air baru ke rumah. Rumah baru dibangun, belum ada akses air PDAM.",
    foto_bukti: "", status: "Belum Selesai", tgl_lapor: "2026-03-08",
    perlu_turun_lapangan: true, catatan_validasi: "Survey lokasi untuk jalur pipa baru.",
    feedback_pelanggan: "Petugas sudah datang tapi hanya survey, belum ada pemasangan. Mohon segera ditindaklanjuti."
  },
];

export const penugasanList: Penugasan[] = [
  { id: 1, laporan_id: 1001, petugas_id: 2, tgl_penugasan: "2026-02-10", status: "Selesai", foto_penyelesaian: "", catatan_petugas: "Pipa retak sepanjang 30cm, sudah diganti dengan pipa baru." },
  { id: 2, laporan_id: 1002, petugas_id: 3, tgl_penugasan: "2026-03-02", status: "Sedang Dikerjakan", catatan_petugas: "Sedang flush pipa, sumber kontaminasi dari endapan tanah." },
  { id: 3, laporan_id: 1005, petugas_id: 2, tgl_penugasan: "2026-01-21", status: "Selesai", foto_penyelesaian: "", catatan_petugas: "Pipa utama diganti 2 meter. Aliran normal kembali." },
  { id: 4, laporan_id: 1006, petugas_id: 3, tgl_penugasan: "2026-03-06", status: "Selesai", catatan_petugas: "Pipa tersumbat kerak, sudah dibersihkan dan aliran lancar." },
  { id: 5, laporan_id: 1009, petugas_id: 3, tgl_penugasan: "2026-01-16", status: "Selesai", foto_penyelesaian: "", catatan_petugas: "Sambungan pipa diperbaiki, lem dan klem baru." },
  { id: 6, laporan_id: 1010, petugas_id: 6, tgl_penugasan: "2026-03-09", status: "Selesai", catatan_petugas: "Survey jalur selesai, menunggu material." },
];

export const pembayaranList: Pembayaran[] = [
  { id: 1, laporan_id: 1001, user_id: 4, jumlah: 150000, deskripsi_biaya: "Biaya perbaikan pipa bocor (material + jasa)", status: "Lunas", metode_bayar: "Transfer Bank", tgl_bayar: "2026-02-15", tgl_jatuh_tempo: "2026-02-25", bukti_bayar: "" },
  { id: 2, laporan_id: 1005, user_id: 5, jumlah: 200000, deskripsi_biaya: "Penggantian pipa utama 2 meter (material + jasa)", status: "Lunas", metode_bayar: "Transfer Bank", tgl_bayar: "2026-01-28", tgl_jatuh_tempo: "2026-02-05", bukti_bayar: "" },
  { id: 3, laporan_id: 1009, user_id: 7, jumlah: 0, deskripsi_biaya: "Perbaikan garansi instalasi baru - GRATIS", status: "Gratis", tgl_jatuh_tempo: "2026-01-25" },
  { id: 4, laporan_id: 1006, user_id: 7, jumlah: 100000, deskripsi_biaya: "Biaya pembersihan pipa tersumbat (jasa)", status: "Belum Dibayar", tgl_jatuh_tempo: "2026-03-20" },
  { id: 5, laporan_id: 1010, user_id: 4, jumlah: 500000, deskripsi_biaya: "Survey + Pemasangan sambungan baru (DP 50%)", status: "Menunggu Verifikasi", metode_bayar: "Transfer Bank", tgl_bayar: "2026-03-12", tgl_jatuh_tempo: "2026-03-25", bukti_bayar: "" },
];

export const pengumumanList: Pengumuman[] = [
  {
    id: 1, judul: "DARURAT: Pemadaman Air Wilayah Cianjur",
    isi: "Sehubungan dengan perbaikan pipa utama distribusi, aliran air PDAM di wilayah Kec. Cianjur akan dihentikan sementara pada tanggal 16-17 Maret 2026 pukul 08.00-17.00 WIB. Posko air darurat tersedia di Balai Desa Sukamaju. Mohon warga mempersiapkan cadangan air.",
    tgl_posting: "2026-03-14", penting: true, kategori: "darurat"
  },
  {
    id: 2, judul: "Jadwal Pengiriman Tangki Air Darurat - Mekarjaya",
    isi: "Bagi warga Desa Mekarjaya yang terdampak kekeringan, pengiriman tangki air darurat akan dilakukan setiap hari Senin dan Kamis pukul 08.00 WIB di Balai Desa. Silakan bawa wadah masing-masing, maksimal 2 jerigen per KK.",
    tgl_posting: "2026-03-12", penting: true, kategori: "jadwal"
  },
  {
    id: 3, judul: "Info Tarif Baru Sambungan Air 2026",
    isi: "Mulai April 2026, tarif pemasangan sambungan air baru menjadi Rp 1.500.000,- (sudah termasuk meteran dan pipa 10 meter). Pendaftaran bisa melalui aplikasi TirtaBantu atau kantor PDAM.",
    tgl_posting: "2026-03-10", penting: false, kategori: "info"
  },
  {
    id: 4, judul: "Himbauan Hemat Air Musim Kemarau",
    isi: "Memasuki musim kemarau 2026, kami menghimbau seluruh warga untuk menghemat penggunaan air. Tips: tutup keran saat menyikat gigi, gunakan air bekas cucian untuk menyiram tanaman, periksa kebocoran pipa secara berkala.",
    tgl_posting: "2026-03-08", penting: false, kategori: "info"
  },
  {
    id: 5, judul: "Gangguan Air Wilayah Cibadak",
    isi: "Terjadi kerusakan pipa distribusi utama di Kec. Cibadak. Tim teknis sedang melakukan perbaikan. Estimasi air kembali normal dalam 24-48 jam. Kami mohon maaf atas ketidaknyamanan ini.",
    tgl_posting: "2026-03-06", penting: true, kategori: "gangguan"
  },
];

// =============================================
// Chart Data
// =============================================
export const laporanPerBulan = [
  { bulan: "Jan", total: 5, selesai: 4, ditolak: 0 },
  { bulan: "Feb", total: 8, selesai: 6, ditolak: 1 },
  { bulan: "Mar", total: 12, selesai: 3, ditolak: 1 },
];

export const statusDistribusi = [
  { name: "Menunggu Validasi", value: 2, color: "#f59e0b" },
  { name: "Sedang Dikerjakan", value: 1, color: "#8b5cf6" },
  { name: "Menunggu Konfirmasi", value: 1, color: "#06b6d4" },
  { name: "Selesai", value: 3, color: "#10b981" },
  { name: "Belum Selesai", value: 1, color: "#f97316" },
  { name: "Ditolak", value: 1, color: "#ef4444" },
];

export const kinerjaPetugas = [
  { nama: "Budi Hartono", selesai: 3, aktif: 0, rating_avg: 4.5 },
  { nama: "Siti Aminah", selesai: 3, aktif: 1, rating_avg: 4.3 },
  { nama: "Rudi Setiawan", selesai: 1, aktif: 0, rating_avg: 3.5 },
];

export const pendapatanBulanan = [
  { bulan: "Jan", total: 200000, lunas: 200000 },
  { bulan: "Feb", total: 150000, lunas: 150000 },
  { bulan: "Mar", total: 600000, lunas: 0 },
];