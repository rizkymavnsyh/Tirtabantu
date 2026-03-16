Proposal Pengembangan Produk
TirtaBantu: Sistem Informasi Manajemen Pelaporan dan Distribusi Air Bersih
Disusun oleh:
[NIM 1] - [Nama Lengkap 1]
[NIM 2] - [Nama Lengkap 2]
[NIM 3] - [Nama Lengkap 3]
[NIM 4] - [Nama Lengkap 4]
[NIM 5] - [Nama Lengkap 5]
[NIM 6] - [Nama Lengkap 6]
Tanggal Pembuatan Dokumen: 16 Maret 2026
Daftar Isi
Pendahuluan
1.1 Latar Belakang
1.2 Tujuan
1.3 Output
Deskripsi Produk
2.1 Usulan Solusi
2.2 Deskripsi Produk
2.3 Proses Bisnis
Kebutuhan Sistem
3.1 Kebutuhan Fungsional
3.1.1 Daftar Kebutuhan
3.1.2 Karakteristik Pengguna
3.2 Kebutuhan Non Fungsional
3.3 Kebutuhan Teknis
Rancangan Sistem
4.1 Analisis UCD, Use Case & Skenario
4.2 Rancangan ERD
4.3 Class Diagram
4.4 Sequence Diagram
4.5 Mockup
Metode Pengembangan
5.1 Jadwal Pengembangan
5.2 Tim Pengembang
1. Pendahuluan
1.1 Latar Belakang
Akses terhadap air bersih dan sanitasi layak merupakan hak dasar dan menjadi target utama Sustainable Development Goals (SDG) Poin ke-6. Namun, pelaksanaannya di Indonesia masih menghadapi tantangan operasional yang signifikan. Berdasarkan data Badan Pusat Statistik (BPS) tahun 2023, masih terdapat sekitar 10% rumah tangga yang belum memiliki akses air minum layak. Salah satu penyebab utamanya adalah lambatnya penanganan kebocoran pipa distribusi dan krisis air lokal akibat sistem pelaporan yang tidak terstruktur.
Menurut penelitian Widodo & Pratama (2022) dalam Jurnal Sistem Informasi Pelayanan Publik, pelaporan masalah infrastruktur berbasis manual (melalui telepon/pesan teks tanpa koordinat pasti) menyebabkan waktu respons teknisi melambat hingga 45% akibat ketidakakuratan lokasi dan miskomunikasi. Oleh karena itu, diperlukan sebuah platform ticketing berbasis Geolocation (Maps) yang terintegrasi. Sistem ini dirancang tidak hanya untuk mencatat pengaduan dan tagihan layanan, tetapi juga mendukung transparansi penanganan yang melibatkan peran aktif warga dalam proses konfirmasi layanan.
1.2 Tujuan
Tujuan dari pengembangan produk "TirtaBantu" adalah:
Membangun sistem informasi berbasis web yang dilengkapi integrasi peta (Maps) agar masyarakat dapat melaporkan masalah infrastruktur air lengkap dengan koordinat spesifik.
Mempercepat waktu respons melalui fitur validasi dan penugasan (dispatching) petugas yang sistematis secara real-time.
Mengakomodasi proses administrasi terpadu, termasuk transaksi pembayaran untuk biaya perbaikan fasilitas mandiri atau permintaan tangki air darurat.
Memberikan transparansi di mana masyarakat dapat memantau status laporan, memberikan feedback (konfirmasi selesai/belum selesai), dan melihat pengumuman gangguan layanan air secara terpusat.
1.3 Output
Output proyek ini adalah Aplikasi Web TirtaBantu yang dibangun dengan framework PHP Laravel. Aplikasi ini memiliki 3 role (Masyarakat, Admin, Petugas), fitur Master Data, sistem Dashboard rekapitulasi, serta fitur transaksi operasional dan finansial. Aplikasi akan diuji fungsionalitasnya secara otomatis menggunakan Laravel Dusk.
2. Deskripsi Produk
2.1 Usulan Solusi
Solusi yang diusulkan adalah membangun aplikasi web TirtaBantu, sebuah sistem dispatching dan pengaduan layanan air bersih berbasis User-Centered Design (UCD). Keterkaitan masalah dengan solusi ini sangat erat: lambatnya penanganan diatasi dengan pemetaan koordinat (Maps) dan sistem penugasan (work order) langsung ke akun aplikasi petugas.
Hal ini didukung oleh literatur dari Smart City & E-Government Journal (Susanti et al., 2023) yang menyatakan bahwa digitalisasi sistem penugasan teknisi (dispatching system) berbasis lokasi terbukti memangkas waktu operasional perbaikan hingga 30%.
Untuk menjamin berjalannya operasional, sistem ini didesain memenuhi syarat transaksi antar-role (Transactions between roles) melalui 4 alur utama:
Transaksi Pelaporan: Warga menyerahkan data laporan/keluhan beserta koordinat lokasi ke Admin.
Transaksi Pembayaran: Warga melakukan pembayaran layanan/tagihan perbaikan kepada Admin (Sistem).
Transaksi Penugasan (Work Order): Admin menerbitkan dan menyerahkan data penugasan/surat jalan ke Petugas Lapangan.
Transaksi Konfirmasi: Petugas menyerahkan bukti selesai ke sistem, lalu Warga membalas dengan validasi (Selesai/Belum) dan memberikan rating.
2.2 Deskripsi Produk
TirtaBantu adalah sistem informasi manajemen pengaduan dan operasional air bersih. Fitur intinya meliputi halaman Beranda Pengumuman Publik, form pelaporan berbasis Geolocation, sistem pembayaran digital terintegrasi, serta dashboard pengelolaan tugas. Keunggulan utamanya ada pada perlindungan hak konsumen: petugas lapangan tidak bisa secara sepihak menutup laporan sebagai "Selesai" sebelum pengguna (pelanggan) meninjau hasil perbaikan dan memberikan persetujuan.
2.3 Proses Bisnis
Proses Bisnis Existing:
Warga menemukan pipa bocor di rumah  Menelepon admin pengelola air  Admin mencatat di buku tanpa lokasi pasti  Admin menelepon petugas  Petugas mencari alamat (sering nyasar)  Petugas lapor ke admin perbaikan selesai  Jika masih bocor, warga harus mengulangi proses melapor dari awal.
Proses Bisnis Usulan (Targeting):
Proses bisnis targeting ini memecahkan masalah dengan mengotomatisasi aliran data dan koordinat:
Beranda & Publikasi: Masyarakat membuka web dan melihat feed Pengumuman dari Admin terkait pemadaman/gangguan air massal.
Pelaporan Berbasis Peta: Warga membuat tiket laporan dengan melakukan pinpoint koordinat di Maps dan mengisi detail alamat.
Validasi & Pembayaran: Admin memvalidasi tiket (apakah butuh petugas lapangan). Jika ada biaya perbaikan/tangki air, sistem menerbitkan tagihan. Warga membayar dan mengunggah bukti bayar untuk diverifikasi Admin.
Penugasan (Dispatch): Admin meng-assign tiket ke Petugas Lapangan tertentu.
Eksekusi Lapangan: Petugas membuka aplikasi, melihat koordinat warga, memperbaiki masalah, lalu mengunggah bukti foto. Status berubah menjadi "Menunggu Konfirmasi Warga".
Konfirmasi & Feedback: Warga menekan tombol "Belum Selesai" (tiket dikembalikan ke petugas) atau "Selesai" lalu memberikan Rating.
Reporting: Seluruh siklus transaksi terekap di Dashboard Admin untuk evaluasi.
3. Kebutuhan Sistem
3.1 Kebutuhan Fungsional
3.1.1 Daftar Kebutuhan (FR)
ID
Kebutuhan Fungsional
Deskripsi
FR-01
Fitur Beranda & Pengumuman Publik
Fitur halaman muka (tanpa login) yang menampilkan daftar informasi/berita gangguan distribusi dari admin.
FR-02
Fitur Manajemen Master Data
Fitur CRUD bagi Admin untuk mengelola data wilayah (Kecamatan/Desa) dan kategori laporan beserta tarifnya.
FR-03
Fitur Manajemen Akun & Role
Fitur bagi Admin untuk mengelola akun pengguna, mendaftarkan petugas, dan mengatur hak akses (roles).
FR-04
Fitur Pembuatan Laporan Berbasis Peta
Fitur bagi masyarakat untuk melapor, dilengkapi integrasi peta (Maps) untuk penentuan titik koordinat dan unggah foto.
FR-05
Fitur Riwayat Laporan Pengguna
Fitur bagi masyarakat untuk melacak timeline proses pelaporan secara real-time.
FR-06
Fitur Validasi Keputusan Lapangan
Fitur bagi Admin untuk memvalidasi laporan masuk dan menentukan apakah kasus tersebut mengharuskan "Petugas Turun" atau tidak.
FR-07
Fitur Transaksi Pembayaran
Fitur bagi warga untuk mengunggah bukti bayar tagihan layanan, dan bagi admin untuk memverifikasi pembayaran (Lunas/Ditolak).
FR-08
Fitur Transaksi Penugasan (Admin)
Fitur bagi Admin untuk membuat work order dengan meng-assign Petugas Lapangan sesuai area.
FR-09
Fitur Daftar Tugas Lapangan
Fitur bagi Petugas untuk melihat daftar penugasan lengkap dengan navigasi/link ke titik koordinat Maps.
FR-10
Fitur Update Bukti Lapangan (Petugas)
Fitur bagi petugas untuk mengunggah foto perbaikan. Status berubah menjadi "Menunggu Konfirmasi Warga" (bukan langsung Selesai).
FR-11
Fitur Konfirmasi Laporan (Warga)
Fitur hak pelanggan di mana warga dapat menekan tombol "Belum Selesai" (pekerjaan dikembalikan) atau "Selesai".
FR-12
Fitur Ulasan & Feedback (Warga)
Fitur wajib bagi warga untuk memberikan rating bintang (1-5) dan komentar evaluasi setelah pekerjaan diselesaikan.
FR-13
Fitur Dashboard Statistik (Admin)
Fitur grafik/chart di halaman Admin untuk memantau jumlah laporan, omset pembayaran, dan rasio penyelesaian laporan.
FR-14
Fitur Mini Report Kinerja Petugas
Fitur tabel rekapitulasi bagi Admin untuk memonitor produktivitas dan rata-rata rating dari masing-masing petugas.
FR-15
Fitur Export Laporan Data (Admin)
Fitur bagi Admin untuk mengekspor rekapitulasi data laporan, transaksi finansial, dan kinerja ke PDF/Excel.
FR-16
Fitur Manajemen Pengumuman (Admin)
Fitur CRUD bagi admin untuk menulis dan mempublikasikan teks pengumuman yang akan tampil di Beranda Publik.
FR-17
Fitur Filter & Pencarian Lanjut (Admin)
Fitur mesin pencari bagi admin untuk memfilter tiket berdasarkan status bayar, rentang bulan, alamat warga, atau kategori.
FR-18


Fitur Notifikasi Sistem (Alert)
Fitur pengingat (in-app alert) jika ada tiket butuh pembayaran, bukti pembayaran masuk, atau tugas baru bagi petugas.

3.1.2 Karakteristik Pengguna
Kategori Pengguna
Deskripsi
Hak Akses
Admin (Pengelola)
Staf PDAM/Desa pengelola sistem pelaporan.
Full Access (Master Data, Validasi Keputusan, Verifikasi Pembayaran, Assign Tugas, Dashboard)
Petugas Lapangan
Teknisi/supir tangki air yang mengeksekusi tugas.
Read Data Tugas, Update Status, Upload Bukti.
Masyarakat (Pelanggan)
Warga pengguna layanan air bersih.
Baca Beranda, Buat Laporan (Maps), Bayar Tagihan, Konfirmasi Hasil, Beri Ulasan.

3.2 Kebutuhan Non Fungsional
ID
Kebutuhan Non Fungsional
Deskripsi
NFR-01
Usability
Desain antarmuka User-Centered yang responsif (mobile-friendly), terutama pada modul peta (Maps) agar mudah digeser melalui smartphone.
NFR-02
Reliability
Sistem mampu memproses upload gambar bukti laporan, perbaikan, dan bukti transfer hingga ukuran maksimal 5MB per file tanpa interupsi.
NFR-03
Security
Autentikasi ketat menggunakan Middleware Laravel. Password dienkripsi dengan Bcrypt Hash.
NFR-04
Testability
Setiap fitur fungsional utama wajib diuji dengan skenario otomasi menggunakan Laravel Dusk.

3.3 Kebutuhan Teknis
ID
Kebutuhan Teknis
Deskripsi
TR-01
Framework
Menggunakan PHP dengan framework Laravel.
TR-02
Integrasi Peta
Menggunakan Google Maps API atau Leaflet.js untuk fungsi tagging koordinat peta.
TR-03
Database
Menggunakan sistem manajemen basis data relasional MySQL.
TR-04
Front-End & Testing
Penggunaan Bootstrap/Tailwind CSS untuk UI dan Laravel Dusk untuk otomasi End-to-End Testing.

4. Rancangan Sistem
4.1 Analisis User Centered Design (UCD), Use Case & Skenario
Aplikasi ini dianalisis dengan pendekatan UCD untuk menjamin kemudahan pengguna:
Masyarakat: Diberikan antarmuka form interaktif berupa peta (map pointer) yang mudah diarahkan, serta timeline tracker yang jelas.
Petugas: Diberikan halaman "Daftar Tugas" yang simpel dan fokus pada tombol unggah bukti serta navigasi arah jalan.
Admin: Diberikan antarmuka Dashboard analitik dan Data Table yang mendukung filtering untuk memproses ratusan data secara efisien.
(Gambarkan Use Case Diagram disini)
Skenario Use Case Utama (Pelaporan):
Aktor (Warga) menekan tombol "Buat Laporan".
Sistem merender halaman form beserta komponen Peta (Maps).
Aktor menandai titik koordinat lokasi, mengetik alamat blok rumah, mengunggah foto, dan klik "Submit".
Sistem menyimpan data tiket dengan status "Menunggu Validasi" dan memberi notifikasi ke Admin.
4.2 Rancangan ERD
(Gambarkan ERD dengan metode yang jelas disini)
Users: (id, nama, email, password, role_id, no_telp).
Wilayah & Kategori: Tabel master (id, nama_kategori, tarif).
Laporan: (id, user_id, latitude, longitude, alamat_rumah, deskripsi, status_lapangan, foto).
Pembayaran: (id, laporan_id, nominal, bukti_transfer, status_bayar).
Penugasan: (id, laporan_id, petugas_id, foto_perbaikan, konfirmasi_warga, rating).
4.3 Class Diagram
(Gambarkan rancangan class diagram MVC)
Models: User, Laporan, Pembayaran, Penugasan, Kategori, Wilayah, Pengumuman. (Model Laporan memiliki relasi One-to-One ke Pembayaran dan Penugasan).
Controllers: AuthController, PublicController, AdminController, LaporanController, PembayaranController, PenugasanController.
4.4 Sequence Diagram
(Gambarkan Sequence Diagram disini)
Penjelasan Sequence (Alur Penugasan & Konfirmasi):
AdminController menginisiasi assign tugas dan menyimpan data ke tabel Penugasan.
View di dashboard Petugas membaca data dari PenugasanController. Petugas melakukan aksi uploadBukti().
Model memperbarui status menjadi Menunggu_Konfirmasi.
View di sisi Warga menangkap perubahan status dan memunculkan pop-up persetujuan. Warga memanggil method submitUlasan() di LaporanController, sistem mencatat rating, dan menutup tiket (Selesai).
4.5 Mockup & Integrasi Halaman
(Cantumkan gambar UI Mockup disini)
Alur Pelaporan Publik: Pengguna membuka Beranda (Pengumuman)  klik tombol "Lapor"  masuk ke Halaman Form Peta (Maps)  setelah disubmit dialihkan ke Halaman Riwayat Laporan yang menampilkan timeline progres secara kohesif.
Alur Pembayaran: Jika tiket divalidasi dan muncul biaya  pengguna membuka Halaman Detail Laporan  klik "Bayar Tagihan"  masuk ke form Upload Bukti Transfer  status otomatis menjadi "Menunggu Verifikasi Admin".
Alur Konfirmasi: Saat petugas selesai, di Halaman Riwayat warga akan muncul tombol interaktif. Jika dipilih "Selesai", warga langsung dialihkan ke Halaman Rating/Ulasan secara sekuensial.
5. Metode Pengembangan
Metode yang digunakan adalah Agile Scrum. Pendekatan ini dipilih agar tim dapat beradaptasi secara fleksibel dan mengembangkan aplikasi dalam tahapan (Sprint) yang terukur, sehingga pengujian Laravel Dusk dapat diintegrasikan dengan baik.
5.1 Jadwal Pengembangan
Proyek dikerjakan dalam kurun waktu 10 minggu, dibagi menjadi 2 Sprint Utama.
Sprint 1: Minggu 6 - Minggu 10 (Fokus Front-Page, Maps, & Autentikasi)
Setup Database & Integrasi API Peta (Google Maps/Leaflet).
FR-01, FR-16 (Modul Beranda & Pengumuman Publik).
FR-02, FR-03 (CRUD Master Data & Autentikasi Akun).
FR-04, FR-05 (Pembuatan Tiket Laporan via Maps & Riwayat Pengguna).
FR-06, FR-07 (Validasi Admin, Penerbitan Tagihan, & Sistem Pembayaran).
Pembuatan skrip Laravel Dusk Automation Test untuk Sprint 1.
Sprint 2: Minggu 11 - Minggu 15 (Fokus Penugasan, Konfirmasi, & Dashboard)
FR-08, FR-09 (Sistem Penugasan Dispatch & View Tugas Petugas).
FR-10, FR-11 (Upload Bukti Petugas & Hak Konfirmasi Warga).
FR-12, FR-18 (Ulasan/Rating Pelanggan & Notifikasi Alert Sistem).
FR-13, FR-14 (Dashboard Visual Admin & Perhitungan Kinerja Petugas).
FR-15, FR-17 (Ekspor Data PDF/Excel & Filter Pencarian Tiket Lanjut).
Pembuatan skrip Laravel Dusk Automation Test untuk Sprint 2 & Final UAT.
5.2 Tim Pengembang
(Total 6 Anggota yang bertindak sebagai Developer, masing-masing mengerjakan 3 FR)
[Nama Anggota 1] - Developer
Tanggung Jawab: Modul Beranda, Publikasi Publik, & Master Data.
Target Pengerjaan: FR-01, FR-02, FR-16.
[Nama Anggota 2] - Developer
Tanggung Jawab: Modul Transaksi Laporan (Integrasi Maps) & Riwayat User.
Target Pengerjaan: FR-03, FR-04, FR-05.
[Nama Anggota 3] - Developer
Tanggung Jawab: Modul Validasi Admin & Transaksi Pembayaran.
Target Pengerjaan: FR-06, FR-07, FR-17.
[Nama Anggota 4] - Developer
Tanggung Jawab: Modul Transaksi Penugasan (Work Order) & View Petugas.
Target Pengerjaan: FR-08, FR-09, FR-10.
[Nama Anggota 5] - Developer
Tanggung Jawab: Modul Transaksi Konfirmasi Warga, Feedback, & Notifikasi.
Target Pengerjaan: FR-11, FR-12, FR-18.
[Nama Anggota 6] - Developer
Tanggung Jawab: Modul Data Reporting, Dashboard Statistik, & Ekspor Dokumen.
Target Pengerjaan: FR-13, FR-14, FR-15.
