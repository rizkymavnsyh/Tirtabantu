[PBI-18] Fitur Notifikasi Sistem / Alert (FR-18) - Siklus CRUD Fullstack (Dengan Halaman Khusus)

Epic / Feature: Sistem Notifikasi & User Engagement
Assignee: Mochamad Rizky Maulana Aviansyah
Story Points: 8
Priority: Medium
Sprint: Sprint 2

1. Story

Sebagai pengguna (Masyarakat, Admin, dan Petugas),
Saya ingin memiliki sistem manajemen notifikasi in-app yang interaktif baik berupa dropdown ringkas maupun halaman detail /notifikasi,
Agar saya dapat mengelola, membaca, memfilter, dan menghapus riwayat notifikasi secara transparan guna menjaga kebersihan kotak masuk saya.

2. Precondition

[ ] Pengguna telah berhasil melakukan autentikasi (Login) dan memiliki sesi aktif di sistem TirtaBantu.

[ ] Sistem telah terkonfigurasi dengan driver database untuk Laravel Notifications pada sisi backend.

[ ] Skema basis data siap menangani relasi polimorfik untuk mencatat target pengguna (notifiable_id dan notifiable_type).

3. Alur / Proses Bisnis / Skenario (Siklus CRUD)

a. Skenario Pembuatan Notifikasi Otomatis - Create (C)

[ ] Given: Terjadi aktivitas transaksi penting di dalam sistem (misal: Admin menugaskan petugas lapangan di PBI-08).

[ ] When: Proses transaksi tersebut berhasil dieksekusi oleh sistem di sisi backend.

[ ] Then: Sistem secara otomatis memicu (trigger) event class untuk menyisipkan data notifikasi baru ke dalam tabel notifications dengan status awal belum dibaca (read_at bernilai NULL).

b. Skenario Menampilkan Daftar Notifikasi - Read (R)

[ ] Given: Pengguna sedang mengakses halaman utama Notifikasi /notifikasi atau membuka dropdown di Navbar.

[ ] When: Halaman dimuat, atau pengguna mengetik di kolom pencarian serta berpindah tab filter (Semua, Belum Dibaca, Sudah Dibaca).

[ ] Then: Sistem mengirimkan permintaan API (fetch request) ke server untuk mengambil daftar notifikasi pengguna sesuai filter.

[ ] And: Halaman menampilkan daftar kartu notifikasi secara kronologis (terbaru di atas) dengan paginasi.

c. Skenario Membaca Notifikasi - Update (U)

[ ] Given: Pengguna melihat daftar notifikasi pada halaman /notifikasi.

[ ] When: Pengguna mengklik tombol "Tandai Dibaca" (ikon centang) pada item tertentu, atau menekan tombol massal "Tandai Semua Dibaca" di bagian atas halaman.

[ ] Then: Sistem mengirim permintaan API (patch request) ke server untuk mengubah nilai kolom read_at menjadi waktu saat ini (timestamp).

[ ] And: Tampilan visual item tersebut berubah menjadi pudar dan angka indikator lonceng di Navbar berkurang secara asinkron.

d. Skenario Menghapus Notifikasi - Delete (D)

[ ] Given: Pengguna berada di halaman /notifikasi.

[ ] When: Pengguna mengklik ikon tempat sampah pada salah satu item notifikasi, atau menekan tombol "Bersihkan Semua" di sudut halaman.

[ ] Then: Sistem mengirimkan permintaan API (delete request) ke server untuk menghapus baris data tersebut dari tabel notifications.

[ ] And: Sistem secara real-time menghapus elemen item tersebut dari tampilan antarmuka pengguna (UI layout) tanpa memuat ulang halaman secara utuh.

4. Mockup & UI Reference

Berdasarkan standar komponen Shadcn UI yang digunakan dalam proyek TirtaBantu, spesifikasi antarmuka manajemen notifikasi adalah:

a. Trigger Component (Button + Badge)

▪ Menggunakan komponen <Button variant="ghost" size="icon" className="relative"> sebagai tombol pemicu dropdown ringkas di Navbar.

▪ Di dalamnya terdapat ikon Bell dari pustaka lucide-react.

▪ Komponen <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"> untuk menampilkan angka akumulasi notifikasi yang belum dibaca (unread count).

b. Halaman Utama Notifikasi (Notification Page Layout - /notifikasi)

▪ Filter Tabs: Komponen <Tabs defaultValue="semua"> dengan tiga tab pilihan: "Semua", "Belum Dibaca" (read_at NULL), dan "Sudah Dibaca" (read_at NOT NULL).

▪ Search Box: Input pencarian dengan ikon Search di sebelah kiri untuk memfilter pesan berdasarkan kata kunci teks.

▪ Control Header: Area atas berisi tombol massal "Tandai Semua Dibaca" (ikon CheckCheck) untuk aksi Update massal dan tombol "Bersihkan Semua" (ikon Trash2) untuk aksi Delete massal.

c. Notification Card Item

▪ Interactive State: Latar belakang kartu berwarna biru muda redup (bg-sky-50/50) jika berstatus belum dibaca, dan putih bersih jika sudah dibaca.

▪ Avatar: Menggunakan komponen <Avatar className="h-10 w-10"> untuk menampilkan ikon representatif kategori (misal: Wrench untuk penugasan baru, CreditCard untuk tagihan, Check untuk sukses).

▪ Card Actions: Di sisi kanan setiap kartu terdapat tombol kecil "Tandai Dibaca" (ikon centang) dan tombol "Hapus" (ikon sampah kecil) yang fungsional.

d. Empty State Panel

▪ Menampilkan ikon BellOff berukuran besar berwarna abu-abu redup dengan keterangan teks "Belum ada notifikasi baru" jika data kosong atau sudah dibersihkan semua dari database.

5. Pembagian ke Sub Task

Pekerjaan Fullstack CRUD ini dipecah menjadi langkah-langkah teknis spesifik sebagai berikut:

a. Setup Skema Database Notifikasi (CRUD Foundation)

[ ] Menyiapkan tabel notifications melalui migrasi internal Laravel untuk mendukung pencatatan data secara persisten dan relasional.

b. Pembuatan Logic Notification Creators (Create Logic)

[ ] Membuat kelas-kelas notifikasi Laravel (misal: TaskAssignedNotification, InvoiceIssuedNotification) yang bertugas memformat array payload data, ikon, dan tautan URL saat data dibuat.

c. Integrasi Event Hooks & Triggers (Create Automation)

[ ] Menyisipkan baris kode pemicu notify() pada endpoint controller lain (seperti saat admin menugaskan petugas lapangan di Reports.tsx / LaporanController).

d. Pembuatan REST API Controller untuk Notifikasi (Read, Update, Delete Engine)

[ ] Membangun NotificationController dengan endpoint:

[ ] GET /api/notifications untuk mengambil list notifikasi milik user aktif (Read).

[ ] PATCH /api/notifications/{id}/read untuk menandai satu data sebagai dibaca (Update).

[ ] POST /api/notifications/read-all untuk menandai semua data sebagai dibaca (Update).

[ ] DELETE /api/notifications/{id} untuk menghapus satu baris notifikasi (Delete).

[ ] DELETE /api/notifications/clear-all untuk menghapus seluruh data notifikasi milik user (Delete).

e. Slicing UI Halaman Utama Notifikasi (Frontend CRUD Integration)

[ ] Membangun file halaman utama /notifikasi (Notifikasi.tsx) lengkap dengan tab filter, sistem pencarian kata kunci, aksi tandai dibaca, dan hapus riwayat.

f. E2E Automated Testing Skenario CRUD (Laravel Dusk)

[ ] Menulis skrip pengujian otomatis untuk memvalidasi siklus hidup notifikasi dari sejak dibuat (C), dibaca (R), diubah statusnya (U), hingga dihapus dari database (D).

6. Test Case

ID Test Case

Skenario Pengujian

Langkah-langkah

Data Input

Hasil yang Diharapkan

TC-001

[Create] Pemicu pembuatan notifikasi otomatis

1. Login Admin.



2. Tugaskan Petugas A ke Laporan #102.

Petugas_ID: Petugas A

Baris data baru tersimpan di tabel notifications dengan kolom read_at bernilai NULL.

TC-002

[Read] Menampilkan list notifikasi di halaman utama

1. Login Petugas A.



2. Buka halaman /notifikasi.

Request: GET

List notifikasi termuat di halaman secara urutan kronologis terbaru lengkap dengan tab filter.

TC-003

[Update] Menandai satu notifikasi telah dibaca

1. Klik ikon centang pada salah satu kartu notifikasi belum dibaca.

Request: PATCH

Status visual kartu berubah menjadi pudar, angka badge counter berkurang, dan kolom read_at di database terisi timestamp.

TC-004

[Delete] Menghapus satu item notifikasi

1. Klik ikon tempat sampah di samping kanan kartu notifikasi.

Request: DELETE

Item tersebut langsung hilang dari daftar tampilan halaman dan baris data terhapus secara permanen di database.

TC-005

[Delete] Membersihkan seluruh riwayat notifikasi

1. Klik tombol "Bersihkan Semua" di kanan atas halaman.



2. Konfirmasi penghapusan.

Request: DELETE

Semua item notifikasi terhapus di database. Tampilan halaman berubah menampilkan panel Empty State (BellOff).

7. Lampiran dan Informasi Lainnya

a. Kebutuhan Non Fungsional (NFR) Terkait

▪ NFR-01 (Performance): Pengambilan data notifikasi (Read) menggunakan query terbatasi (limit 15 item terbaru) agar durasi load halaman tetap di bawah 0.5 detik.

▪ NFR-02 (Security): Endpoint Update & Delete harus diproteksi dengan middleware autentikasi (Sanctum/Session) agar user tidak dapat mengubah atau menghapus notifikasi milik user lain secara ilegal.

b. Detail Kebutuhan Teknis (Tech Stack)

▪ Icons: Lucide-React (Bell, BellOff, CreditCard, Wrench, Trash2, X).

▪ Frontend: React + Tailwind CSS + Shadcn UI (DropdownMenu, ScrollArea, Badge, Avatar).

▪ Backend: Laravel 10 (Database Notifications Driver & REST API).

c. Hubungan Antar PBI (Dependencies)

▪ Fitur Notifikasi Sistem (PBI-18) membutuhkan pemicu pembuatan data (Create) yang terintegrasi langsung dengan modul PBI-04 (Laporan), PBI-08 (Penugasan), dan PBI-07 (Pembayaran).

d. Definition of Done (DoD)

[ ] Seluruh fungsionalitas CRUD (Create, Read, Update, Delete) berjalan normal tanpa error.

[ ] Angka indikator pada lonceng sinkron secara asinkron dengan database saat terjadi aksi klik.

[ ] Kode program lolos seluruh skenario Automated Test Case (TC-001 s/d TC-005) di Laravel Dusk.