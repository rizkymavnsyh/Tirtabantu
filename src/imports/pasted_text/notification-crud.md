[PBI-18] Fitur Notifikasi Sistem / Alert (FR-18) - Siklus CRUD Fullstack

Epic / Feature: Sistem Notifikasi & User Engagement
Assignee: Mochamad Rizky Maulana Aviansyah
Story Points: 8
Priority: Medium
Sprint: Sprint 2

1. Story

Sebagai pengguna (Masyarakat, Admin, dan Petugas),
Saya ingin memiliki sistem manajemen notifikasi in-app yang interaktif (menerima, melihat, membaca, dan menghapus notifikasi),
Agar saya dapat merespon setiap pembaruan sistem secara real-time dan menjaga kebersihan kotak masuk (inbox) notifikasi saya.

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

[ ] Given: Pengguna sedang melihat halaman aplikasi apa saja.

[ ] When: Pengguna mengklik ikon lonceng pada navigasi atas (Navbar).

[ ] Then: Sistem mengirimkan permintaan API (fetch request) ke server untuk mengambil daftar notifikasi terbaru milik pengguna.

[ ] And: Sistem menampilkan daftar tersebut di dalam dropdown interaktif yang dapat digulir (scrollable).

c. Skenario Membaca Notifikasi - Update (U)

[ ] Given: Daftar notifikasi dropdown sedang terbuka dan menampilkan item bertanda belum dibaca.

[ ] When: Pengguna mengklik salah satu item notifikasi tersebut.

[ ] Then: Sistem memicu permintaan API (patch request) ke server untuk mengubah nilai kolom read_at dari NULL menjadi waktu saat ini (timestamp).

[ ] And: Sistem secara otomatis mengurangi angka indikator merah (badge counter) di ikon lonceng.

[ ] And: Sistem mengarahkan (redirect) browser ke URL tujuan yang tercantum dalam data notifikasi tersebut.

d. Skenario Menghapus Notifikasi - Delete (D)

[ ] Given: Daftar notifikasi dropdown terbuka.

[ ] When: Pengguna mengklik ikon tempat sampah atau tombol "Hapus" pada salah satu item notifikasi, atau menekan tombol "Hapus Semua".

[ ] Then: Sistem mengirimkan permintaan API (delete request) ke server untuk menghapus baris data tersebut dari tabel notifications.

[ ] And: Sistem secara real-time menghapus elemen item tersebut dari tampilan antarmuka pengguna (UI layout).

4. Mockup & UI Reference

Berdasarkan standar komponen Shadcn UI yang digunakan dalam proyek TirtaBantu, spesifikasi antarmuka manajemen notifikasi adalah:

a. Trigger Component (Button + Badge)

▪ Menggunakan komponen <Button variant="ghost" size="icon" className="relative"> sebagai tombol pemicu dropdown.

▪ Di dalamnya terdapat ikon Bell dari pustaka lucide-react.

▪ Komponen <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"> untuk menampilkan angka akumulasi notifikasi yang belum dibaca (unread count).

b. Container Dropdown (DropdownMenu)

▪ Menggunakan <DropdownMenuContent align="end" className="w-85 p-0 bg-white border border-slate-200 rounded-xl shadow-lg"> sebagai wadah utama.

▪ Bagian atas (Header) bertuliskan "Notifikasi" dengan aksi cepat "Tandai semua dibaca" (untuk aksi Update) dan "Bersihkan Semua" (untuk aksi Delete).

c. Scrollable Area (ScrollArea)

▪ Menggunakan <ScrollArea className="h-[350px]"> untuk membungkus daftar notifikasi agar daftar item dapat digulir dengan nyaman jika melebihi batas tinggi maksimal.

d. Notification Item Card (Interactive CRUD Card)

▪ Avatar: Menggunakan komponen <Avatar className="h-9 w-9"> untuk menampilkan ikon representatif kategori (misal: Wrench untuk tugas baru, CreditCard untuk tagihan).

▪ Text Content: Kontainer div berisi judul notifikasi dengan ketebalan teks tebal (bold) jika belum dibaca, serta deskripsi singkat notifikasi dengan warna teks pudar (text-muted-foreground).

▪ Delete Button: Ikon kecil X atau Trash di sisi kanan item card yang hanya muncul saat kursor diarahkan (hover) ke item tersebut, berfungsi untuk memicu aksi hapus (Delete) satu per satu.

▪ Time Text: Teks kecil di bagian bawah item untuk menunjukkan waktu pembuatan notifikasi (misal: "3 menit yang lalu").

e. Empty State Panel

▪ Menampilkan ikon BellOff berukuran besar berwarna abu-abu redup dengan keterangan teks "Belum ada notifikasi baru" jika data di database kosong atau sudah dibersihkan semua.

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

e. Slicing UI Dropdown Lonceng Notifikasi (Frontend CRUD Integration)

[ ] Membangun tampilan dropdown di file Navbar.tsx atau Layout.tsx menggunakan komponen Shadcn UI, serta mengintegrasikannya dengan Axios untuk melakukan request ke API Controller.

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

[Read] Menampilkan list notifikasi di dropdown

1. Login Petugas A.



2. Klik ikon lonceng di Navbar.

Request: GET

List notifikasi termuat di dalam ScrollArea secara urutan kronologis terbaru.

TC-003

[Update] Menandai satu notifikasi telah dibaca

1. Klik salah satu item di dropdown.



2. Periksa database.

Request: PATCH

Browser diarahkan ke URL tujuan, angka badge counter berkurang, dan kolom read_at di database terisi timestamp.

TC-004

[Delete] Menghapus satu item notifikasi

1. Arahkan mouse ke item.



2. Klik ikon 'Hapus/X' di samping item.

Request: DELETE

Item tersebut langsung hilang dari daftar dropdown dan baris data terhapus secara permanen di database.

TC-005

[Delete] Membersihkan seluruh riwayat notifikasi

1. Buka dropdown.



2. Klik tombol "Bersihkan Semua".

Request: DELETE

Semua item notifikasi terhapus di database. Tampilan dropdown berubah menampilkan panel Empty State (BellOff).

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