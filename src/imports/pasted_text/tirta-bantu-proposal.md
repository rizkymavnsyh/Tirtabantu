Proposal Pengembangan Produk

TirtaBantu: Sistem Informasi Manajemen Pelaporan dan Distribusi Air Bersih

Disusun oleh:

[NIM 1] - [Nama Lengkap 1]

[NIM 2] - [Nama Lengkap 2]

[NIM 3] - [Nama Lengkap 3]

[NIM 4] - [Nama Lengkap 4]

[NIM 5] - [Nama Lengkap 5]

[NIM 6] - [Nama Lengkap 6]

Tanggal Pembuatan Dokumen: 15 Maret 2026

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
4.1 Use Case Diagram
4.2 Rancangan ERD
4.3 Class Diagram
4.4 Mockup

Metode Pengembangan
5.1 Jadwal Pengembangan
5.2 Tim Pengembang

1. Pendahuluan

1.1 Latar Belakang

Akses terhadap air bersih dan sanitasi yang layak merupakan hak dasar manusia dan menjadi salah satu fokus utama dalam Sustainable Development Goals (SDG) poin ke-6. Di berbagai daerah, masyarakat masih sering mengalami kendala seperti kebocoran pipa distribusi, pencemaran sumber air, atau kekeringan yang membutuhkan pasokan air darurat. Saat ini, proses pelaporan kerusakan pipa atau permintaan air bersih masih dilakukan secara manual melalui telepon atau pesan singkat ke aparat desa/PDAM setempat. Hal ini menyebabkan lambatnya respons, sulitnya melacak status perbaikan, dan tidak adanya pendataan masalah secara terpusat untuk analisis infrastruktur ke depannya. Oleh karena itu, diperlukan sebuah platform terintegrasi untuk menjembatani masyarakat, petugas lapangan, dan pengelola penyedia air.

1.2 Tujuan

Tujuan dari pengembangan produk "TirtaBantu" adalah:

Membangun sistem informasi berbasis web untuk memudahkan masyarakat dalam melaporkan masalah infrastruktur air dan meminta pasokan air darurat.

Mempercepat waktu respons dan penanganan masalah oleh petugas lapangan melalui sistem penugasan yang sistematis.

Menyediakan dashboard pelaporan dan master data bagi admin untuk memonitor distribusi air dan riwayat kerusakan sebagai bahan evaluasi infrastruktur.

1.3 Output

Output dari proyek ini adalah Aplikasi Web TirtaBantu yang dibangun menggunakan framework PHP Laravel. Aplikasi ini mencakup minimal 3 role (Masyarakat, Admin, Petugas Lapangan), memiliki fungsionalitas CRUD untuk Master Data (Wilayah, Kategori Laporan), fitur transaksi (Pelaporan & Penugasan), serta mini dashboard/reporting. Sistem juga akan dilengkapi dengan automated testing menggunakan Laravel Dusk untuk memastikan seluruh fitur fungsional berjalan dengan baik.

2. Deskripsi Produk

2.1 Usulan Solusi

Solusi yang diusulkan adalah membangun aplikasi web TirtaBantu. Aplikasi ini menyelesaikan permasalahan pelaporan yang tidak terstruktur dengan memberikan form pelaporan terstandarisasi bagi masyarakat. Keterkaitan masalah dengan solusi ini sangat erat: lambatnya penanganan diatasi dengan fitur "Penugasan Petugas" (Dispatch System) secara real-time, dan minimnya data evaluasi diatasi dengan "Dashboard Reporting" bagi pihak pengelola.

2.2 Deskripsi Produk

TirtaBantu adalah aplikasi web manajemen pelaporan dan distribusi air bersih. Fungsi utamanya meliputi pencatatan laporan (kebocoran/krisis air) dari masyarakat beserta titik lokasi, pengelolaan status penugasan untuk teknisi/petugas, dan rekapitulasi data. Keunggulan produk ini adalah kemudahan tracking status laporan (Menunggu -> Diproses -> Selesai) sehingga masyarakat mendapat transparansi informasi.

2.3 Proses Bisnis

Proses Bisnis Existing (Sebelum ada sistem):
Masyarakat menemukan kebocoran pipa $\rightarrow$ Menelepon atau mengirim WhatsApp ke nomor kantor pengelola air $\rightarrow$ Admin kantor mencatat di buku catatan $\rightarrow$ Admin menghubungi petugas lapangan via telepon $\rightarrow$ Petugas memperbaiki $\rightarrow$ Masyarakat tidak tahu kapan petugas datang dan perbaikan selesai.

Proses Bisnis Usulan (Dengan Sistem TirtaBantu):

Masyarakat membuat "Tiket Laporan" (menyertakan foto dan alamat) melalui Web.

Tiket masuk ke sistem, Admin memvalidasi tiket tersebut.

Admin memilih Petugas Lapangan yang available dan menugaskannya melalui sistem (Transaksi).

Petugas Lapangan melihat tugas di akun mereka, mendatangi lokasi, dan melakukan perbaikan.

Petugas mengupdate status di sistem menjadi "Selesai" dan mengunggah foto bukti perbaikan.

Masyarakat dan Admin melihat perubahan status secara real-time. Admin dapat melihat rekapitulasi bulanan di Dashboard.

3. Kebutuhan Sistem

3.1 Kebutuhan Fungsional

3.1.1 Daftar Kebutuhan (PBI)

(Sesuai ketentuan: Minimal 12-16 PBI. Disini dibuat 18 PBI agar 6 anggota tim masing-masing mendapat tepat 3 PBI).

ID

Kebutuhan Fungsional (PBI)

Deskripsi

PBI-01

CRUD Master Data Wilayah

Fitur bagi Admin untuk mengelola data kecamatan/kelurahan cakupan layanan untuk memudahkan klasifikasi area pelaporan.

PBI-02

CRUD Master Data Kategori Laporan

Fitur bagi Admin untuk mengelola jenis laporan (contoh: Pipa Bocor, Air Keruh, Permintaan Tangki Air).

PBI-03

Manajemen Akun Pengguna & Petugas

Fitur bagi Admin untuk menambah, mengedit, menghapus, dan mengatur role data pengguna dan petugas lapangan.

PBI-04

Fitur Pembuatan Laporan (Masyarakat)

Fitur form bagi masyarakat untuk membuat laporan/permintaan baru dilengkapi dengan upload foto kondisi lapangan dan deskripsi.

PBI-05

Fitur Riwayat Laporan Pengguna

Fitur bagi masyarakat untuk melihat daftar laporan yang pernah dibuat beserta status real-time nya (Menunggu, Diproses, Selesai, Ditolak).

PBI-06

Validasi Laporan Masuk (Admin)

Fitur bagi Admin untuk meninjau laporan masyarakat yang masuk, menolak jika tidak valid, atau menerima untuk diteruskan.

PBI-07

Pembuatan Transaksi Penugasan (Admin)

Fitur bagi Admin untuk membuat work order dengan meng-assign/menugaskan suatu laporan kepada Petugas Lapangan tertentu.

PBI-08

Daftar Tugas Petugas (Petugas)

Fitur bagi Petugas Lapangan untuk melihat daftar pekerjaan/laporan yang ditugaskan kepada mereka beserta detail masalah dan lokasinya.

PBI-09

Update Status Pekerjaan (Petugas)

Fitur bagi Petugas untuk mengubah status pengerjaan (Misal: Sedang Menuju Lokasi, Sedang Dikerjakan) agar sistem terupdate.

PBI-10

Konfirmasi Penyelesaian Tugas (Petugas)

Fitur form bagi petugas untuk menutup laporan dengan mengunggah foto bukti bahwa perbaikan atau pengiriman air telah selesai.

PBI-11

Ulasan & Rating Pelayanan (Masyarakat)

Fitur bagi masyarakat untuk memberikan rating bintang dan komentar atas hasil kerja petugas setelah laporan berstatus selesai.

PBI-12

Dashboard Statistik Admin

Fitur visualisasi data (grafik/chart) di halaman Admin untuk melihat jumlah laporan per bulan dan persentase status penyelesaian.

PBI-13

Mini Report Laporan Kinerja Petugas

Fitur tabel/laporan bagi Admin untuk melihat produktivitas setiap petugas (jumlah laporan yang berhasil diselesaikan per petugas).

PBI-14

Export Laporan Data (Admin)

Fitur bagi Admin untuk mengunduh rekap data laporan dan penugasan dalam format PDF/Excel untuk kebutuhan rapat evaluasi.

PBI-15

Fitur Pengumuman/Berita (Admin)

Fitur CRUD bagi admin untuk memposting info gangguan distribusi air massal agar dapat dibaca oleh seluruh masyarakat di halaman utama.

PBI-16

Halaman Tampil Pengumuman (Masyarakat)

Fitur bagi masyarakat untuk melihat info pemadaman air/gangguan pipa massal dari Admin tanpa harus login.

PBI-17

Fitur Pencarian & Filter Tiket (Admin)

Fitur pencarian tingkat lanjut bagi admin untuk memfilter tiket laporan berdasarkan wilayah, kategori, bulan, atau status.

PBI-18

Notifikasi Status Internal Sistem

Fitur alert/tanda lonceng dalam sistem untuk memberitahu masyarakat ketika status laporannya berubah, atau petugas saat mendapat tugas baru.

3.1.2 Karakteristik Pengguna

Kategori Pengguna

Deskripsi

Hak Akses

Admin (Pengelola)

Staf pengelola/PDAM/Desa yang bertugas memantau sistem secara keseluruhan.

Full Access (CRUD Master Data, Assign Tugas, Lihat Dashboard, Export Data)

Petugas Lapangan

Teknisi pipa atau supir tangki air yang mengeksekusi laporan di lapangan.

Read Data Tugas, Update Status Pekerjaan, Upload Bukti Penyelesaian.

Masyarakat (User)

Warga yang membutuhkan akses perbaikan sanitasi atau distribusi air.

Buat Laporan, Lihat Riwayat Laporan Pribadi, Beri Ulasan.

3.2 Kebutuhan Non Fungsional

ID

Kebutuhan Non Fungsional

Deskripsi

NFR-01

Usability (Kemudahan Penggunaan)

Antarmuka web harus bersifat responsive sehingga mudah diakses dengan baik melalui perangkat mobile (smartphone) oleh masyarakat dan petugas di lapangan.

NFR-02

Reliability (Keandalan)

Sistem tidak boleh down atau error saat menerima upload file foto berukuran hingga 5MB secara bersamaan.

NFR-03

Security (Keamanan)

Password pengguna wajib dienkripsi (Hash). Terdapat validasi role-based access control sehingga masyarakat tidak bisa mengakses halaman admin.

NFR-04

Testability

Setiap fungsi utama wajib lolos uji otomatisasi End-to-End (E2E) menggunakan Laravel Dusk.

3.3 Kebutuhan Teknis

ID

Kebutuhan Teknis

Deskripsi

TR-01

Bahasa Pemrograman & Framework

Sistem menggunakan PHP versi 8.x dengan framework Laravel versi 10.x atau terbaru.

TR-02

Basis Data (Database)

Menggunakan MySQL / MariaDB untuk menyimpan relasi data terstruktur.

TR-03

Tampilan Antarmuka (Front-End)

Menggunakan Blade Template Engine bawaan Laravel yang dikombinasikan dengan framework CSS Bootstrap 5 atau Tailwind CSS.

TR-04

Testing Tool

Menggunakan Laravel Dusk untuk pengujian aplikasi (browser automation & testing).

4. Rancangan Sistem

4.1 Use Case Diagram

(Deskripsi skenario, untuk gambar dapat dibuat menggunakan tools seperti Draw.io/StarUML)

Masyarakat: Melakukan Registrasi/Login, Membuat Laporan Air/Sanitasi, Melihat Riwayat Laporan, Memberikan Ulasan.

Petugas: Melakukan Login, Menerima Penugasan, Mengupdate Status Laporan, Mengunggah Bukti Selesai.

Admin: Melakukan Login, Mengelola Master Data (Wilayah, Kategori, User), Memvalidasi Laporan, Menugaskan Petugas, Melihat Dashboard & Export Data.

4.2 Rancangan ERD

(Deskripsi relasi entitas basis data)

Users: Menyimpan data pengguna (id, nama, email, password, role_id, wilayah_id).

Roles: Menyimpan jenis hak akses (Admin, Petugas, Masyarakat).

Wilayah: Menyimpan data lokasi kecamatan/desa.

Kategori_Laporan: Menyimpan jenis masalah (Pipa, Kualitas Air, dsb).

Laporan: Entitas transaksi utama. Berelasi dengan Users (pelapor), Wilayah, dan Kategori_Laporan. Field: id, tgl_lapor, deskripsi, foto_bukti, status (Menunggu, Proses, Selesai).

Penugasan: Entitas transaksi yang menghubungkan Laporan dan Users (Petugas). Field: id, laporan_id, petugas_id, tgl_penugasan, foto_penyelesaian, rating.

4.3 Class Diagram

Class diagram akan dirancang berdasarkan pola arsitektur MVC (Model-View-Controller) pada Laravel.

Models: User, Laporan, Penugasan, Wilayah, Kategori. Model Laporan memiliki fungsi belongsTo User dan hasOne Penugasan.

Controllers: AuthController, MasterWilayahController, MasterKategoriController, LaporanController (untuk masyarakat), PenugasanController (untuk admin & petugas), DashboardController.

4.4 Mockup

Halaman Form Lapor (User): Terdapat form sederhana dengan dropdown pilihan kategori masalah, dropdown wilayah, text area untuk deskripsi lengkap, dan tombol Choose File untuk unggah foto.

Halaman Dashboard (Admin): Menampilkan Card jumlah "Laporan Masuk", "Sedang Dikerjakan", dan "Selesai". Di bawahnya terdapat grafik batang jumlah laporan per bulan.

Halaman Daftar Tugas (Petugas): Berisi Data Table dengan tombol aksi "Update Status" dan "Selesaikan Tugas" yang memunculkan pop-up/modal untuk upload foto.

5. Metode Pengembangan

Metode pengembangan yang digunakan adalah Agile Scrum. Pendekatan ini dipilih agar tim dapat beradaptasi terhadap perubahan kebutuhan sistem dengan cepat. Proses pengembangan dibagi ke dalam fase tahapan pendek (Sprint).

5.1 Jadwal Pengembangan

Proyek dikerjakan dalam kurun waktu 10 minggu, terbagi menjadi 2 Sprint.

Sprint 1: Minggu 6 - Minggu 10 (Fokus Konfigurasi Dasar, Master Data, & Pelaporan)

Setup Environment, Database Migration & Seeder.

Pengerjaan Fitur Login & Autentikasi.

Pengerjaan PBI-01 (Master Wilayah), PBI-02 (Master Kategori), PBI-03 (Manajemen User).

Pengerjaan PBI-15 & PBI-16 (Pengumuman Berita).

Pengerjaan PBI-04 (Pembuatan Laporan) dan PBI-05 (Riwayat Laporan).

Pengerjaan PBI-06 (Validasi Laporan Admin).

Pembuatan Laravel Dusk Automation Test untuk Sprint 1.

Sprint 2: Minggu 11 - Minggu 15 (Fokus Transaksi Penugasan, Dashboard, & Laporan Data)

Pengerjaan PBI-07 (Penugasan Petugas), PBI-08 (Daftar Tugas).

Pengerjaan PBI-09 & PBI-10 (Update Status & Bukti Selesai Petugas).

Pengerjaan PBI-11 (Ulasan/Rating) & PBI-18 (Notifikasi Internal).

Pengerjaan PBI-12 (Dashboard Admin), PBI-13 (Kinerja Petugas), PBI-17 (Filter).

Pengerjaan PBI-14 (Export Laporan).

Pembuatan Laravel Dusk Automation Test untuk Sprint 2.

Integrasi akhir, UAT (User Acceptance Test), dan Finalisasi Dokumen.

5.2 Tim Pengembang

(Total 6 Anggota, semua berperan sebagai Fullstack Developer dengan pembagian fokus PBI)

[Nama Anggota 1] - Fullstack Developer

Tanggung Jawab: Autentikasi & Pengelolaan Master Data Sistem.

PBI yang dikerjakan: PBI-01, PBI-02, PBI-03.

[Nama Anggota 2] - Fullstack Developer

Tanggung Jawab: Modul Portal Berita & Pengumuman Publik.

PBI yang dikerjakan: PBI-15, PBI-16, PBI-17.

[Nama Anggota 3] - Fullstack Developer

Tanggung Jawab: Alur Laporan dari Sisi Masyarakat (Front-End User).

PBI yang dikerjakan: PBI-04, PBI-05, PBI-11.

[Nama Anggota 4] - Fullstack Developer

Tanggung Jawab: Alur Manajemen Laporan dan Transaksi Penugasan di sisi Admin.

PBI yang dikerjakan: PBI-06, PBI-07, PBI-18.

[Nama Anggota 5] - Fullstack Developer

Tanggung Jawab: Alur Kerja Petugas Lapangan (Aplikasi Mobile-Web View).

PBI yang dikerjakan: PBI-08, PBI-09, PBI-10.

[Nama Anggota 6] - Fullstack Developer

Tanggung Jawab: Sistem Dashboarding, Charting, dan Reporting (Export Data).

PBI yang dikerjakan: PBI-12, PBI-13, PBI-14.