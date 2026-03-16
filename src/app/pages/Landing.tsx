import { Link } from "react-router";
import {
  Droplets, FileText, Users, Shield, ArrowRight, AlertTriangle, Clock,
  MapPin, Phone, Mail, CheckCircle, Star, CreditCard, Map, MessageSquare, ChevronRight,
} from "lucide-react";
import { pengumumanList, kategoriList } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const kategoriIkon: Record<string, string> = {
  darurat: "bg-red-100 text-red-600",
  gangguan: "bg-amber-100 text-amber-600",
  jadwal: "bg-blue-100 text-blue-600",
  info: "bg-emerald-100 text-emerald-600",
};

const kategoriLabel: Record<string, string> = {
  darurat: "DARURAT",
  gangguan: "GANGGUAN",
  jadwal: "JADWAL",
  info: "INFORMASI",
};

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-20 border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-sky-800" style={{ fontSize: "1.2rem", fontWeight: 700 }}>TirtaBantu</span>
          </div>
          <nav className="hidden md:flex items-center gap-6" style={{ fontSize: "0.875rem" }}>
            <a href="#pengumuman" className="text-sky-700 hover:text-sky-900 transition-colors">Pengumuman</a>
            <a href="#tarif" className="text-sky-700 hover:text-sky-900 transition-colors">Tarif Layanan</a>
            <a href="#fitur" className="text-sky-700 hover:text-sky-900 transition-colors">Fitur</a>
            <a href="#alur" className="text-sky-700 hover:text-sky-900 transition-colors">Alur Pelaporan</a>
            <a href="#kontak" className="text-sky-700 hover:text-sky-900 transition-colors">Kontak</a>
          </nav>
          <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors shadow-sm" style={{ fontSize: "0.875rem" }}>
            Masuk
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 mb-6 border border-white/20" style={{ fontSize: "0.8rem" }}>
              <Droplets className="w-4 h-4" />
              SDG 6 - Air Bersih dan Sanitasi Layak
            </div>
            <h1 className="mb-4" style={{ fontSize: "2.75rem", fontWeight: 800, lineHeight: 1.1 }}>
              TirtaBantu
            </h1>
            <p className="text-sky-100 mb-2" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
              Sistem Informasi Manajemen Pelaporan & Distribusi Air Bersih
            </p>
            <p className="text-sky-200/80 mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
              Laporkan masalah infrastruktur air langsung dari rumah Anda. Pantau perbaikan secara real-time dengan peta lokasi. Bayar biaya layanan secara online. Bersama wujudkan akses air bersih untuk semua.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="bg-white text-sky-700 hover:bg-sky-50 px-7 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg" style={{ fontWeight: 600 }}>
                Mulai Lapor <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#fitur" className="border border-white/30 text-white hover:bg-white/10 px-7 py-3 rounded-xl transition-colors backdrop-blur">
                Pelajari Fitur
              </a>
            </div>
            {/* Quick stats */}
            <div className="flex gap-6 mt-10 pt-8 border-t border-white/15">
              {[
                { num: "150+", label: "Laporan Ditangani" },
                { num: "95%", label: "Tingkat Penyelesaian" },
                { num: "3", label: "Petugas Aktif" },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.num}</p>
                  <p className="text-sky-300" style={{ fontSize: "0.75rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1574718944703-2857f03a82b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3AlMjBibHVlJTIwc3BsYXNofGVufDF8fHx8MTc3MzUzMjI1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Air Bersih"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover border-4 border-white/20"
            />
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section id="pengumuman" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-4 py-1.5 mb-3" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
              <AlertTriangle className="w-4 h-4" /> Info Terkini
            </div>
            <h2 className="text-sky-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Pengumuman & Info Gangguan</h2>
            <p className="text-slate-500 mt-2" style={{ fontSize: "0.9rem" }}>Informasi terbaru seputar distribusi air di wilayah Anda</p>
          </div>

          {/* Featured announcement */}
          {pengumumanList.filter(p => p.penting).length > 0 && (
            <div className="mb-6">
              {(() => {
                const featured = pengumumanList.find(p => p.kategori === "darurat") || pengumumanList.find(p => p.penting)!;
                return (
                  <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-200 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                        {kategoriLabel[featured.kategori]}
                      </span>
                      <span className="text-slate-400" style={{ fontSize: "0.8rem" }}>{featured.tgl_posting}</span>
                    </div>
                    <h3 className="text-red-800 mb-2" style={{ fontSize: "1.15rem", fontWeight: 700 }}>{featured.judul}</h3>
                    <p className="text-slate-700" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{featured.isi}</p>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pengumumanList.filter((_, i) => i > 0).map((p) => (
              <div key={p.id} className="bg-white border border-sky-100 rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${kategoriIkon[p.kategori]} px-2.5 py-0.5 rounded-full`} style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                    {kategoriLabel[p.kategori]}
                  </span>
                  <span className="text-slate-400 ml-auto" style={{ fontSize: "0.75rem" }}>{p.tgl_posting}</span>
                </div>
                <h3 className="text-sky-800 mb-2" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{p.judul}</h3>
                <p className="text-slate-600" style={{ fontSize: "0.83rem", lineHeight: 1.6 }}>{p.isi.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIF LAYANAN - Transparent Pricing */}
      <section id="tarif" className="py-16 bg-sky-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 mb-3" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
              <CreditCard className="w-4 h-4" /> Transparan & Terjangkau
            </div>
            <h2 className="text-sky-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Tarif Layanan TirtaBantu</h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto" style={{ fontSize: "0.9rem" }}>
              Kami berkomitmen menyediakan layanan air bersih yang terjangkau untuk semua lapisan masyarakat.
              Berikut tarif resmi per jenis layanan — tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {kategoriList.map((k) => (
              <div key={k.id} className={`bg-white rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden ${k.tarif === 0 ? "border-emerald-300" : "border-sky-100"}`}>
                {/* Header */}
                <div className={`px-6 py-4 ${k.tarif === 0 ? "bg-gradient-to-r from-emerald-50 to-emerald-100" : "bg-gradient-to-r from-sky-50 to-sky-100"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: "1.5rem" }}>{k.icon}</span>
                    <h3 className="text-sky-800" style={{ fontSize: "1rem", fontWeight: 700 }}>{k.nama}</h3>
                  </div>
                  {k.tarif === 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700" style={{ fontSize: "1.75rem", fontWeight: 800 }}>GRATIS</span>
                      <span className="bg-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 700 }}>DISUBSIDI</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sky-500" style={{ fontSize: "0.85rem" }}>Rp</span>
                      <span className="text-sky-800" style={{ fontSize: "1.75rem", fontWeight: 800 }}>{k.tarif.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>
                {/* Body */}
                <div className="px-6 py-4">
                  <p className="text-slate-600 mb-3" style={{ fontSize: "0.83rem", lineHeight: 1.6 }}>{k.deskripsi}</p>
                  <div className={`rounded-lg p-3 ${k.tarif === 0 ? "bg-emerald-50" : "bg-sky-50"}`}>
                    <p className={`${k.tarif === 0 ? "text-emerald-700" : "text-sky-700"}`} style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                      {k.keterangan_tarif}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-6 md:p-8 text-white">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="mb-2" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Komitmen Kami: Layanan Terjangkau untuk Semua</h3>
                <p className="text-sky-100" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                  Tarif TirtaBantu dirancang serendah mungkin karena tujuan utama kami adalah <strong>membantu masyarakat</strong> mendapatkan
                  akses air bersih. Pengecekan kualitas air <strong>gratis</strong>, perbaikan ringan mulai <strong>Rp 35.000</strong>.
                  Untuk daerah bencana/darurat, layanan tangki air <strong>tidak dikenakan biaya</strong>.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 border border-white/20">
                    <p className="text-sky-200" style={{ fontSize: "0.68rem" }}>Mulai dari</p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>Rp 0</p>
                  </div>
                  <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 border border-white/20">
                    <p className="text-sky-200" style={{ fontSize: "0.68rem" }}>Perbaikan ringan</p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>Rp 35.000</p>
                  </div>
                  <div className="bg-white/15 backdrop-blur rounded-lg px-4 py-2 border border-white/20">
                    <p className="text-sky-200" style={{ fontSize: "0.68rem" }}>Bisa bayar</p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>Bertahap</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-5 backdrop-blur border border-white/20">
                  <CheckCircle className="w-10 h-10 text-emerald-300 mx-auto mb-2" />
                  <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>Tanpa Biaya Tersembunyi</p>
                  <p className="text-sky-200 mt-1" style={{ fontSize: "0.78rem" }}>Semua tarif sudah termasuk jasa petugas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-sky-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Fitur Lengkap TirtaBantu</h2>
            <p className="text-slate-500 mt-2" style={{ fontSize: "0.9rem" }}>Solusi terintegrasi dari pelaporan hingga pembayaran</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: FileText, title: "Pelaporan Detail", desc: "Buat laporan dengan alamat rumah lengkap, koordinat GPS, dan foto bukti. Admin tahu persis lokasinya.", color: "bg-blue-100 text-blue-600" },
              { icon: Map, title: "Peta Lokasi Real-time", desc: "Lihat posisi laporan di peta interaktif. Petugas bisa navigasi langsung ke lokasi rumah.", color: "bg-emerald-100 text-emerald-600" },
              { icon: Shield, title: "Validasi Admin", desc: "Admin meninjau dan memutuskan apakah perlu turun lapangan atau bisa diselesaikan secara remote.", color: "bg-violet-100 text-violet-600" },
              { icon: Users, title: "Penugasan Petugas", desc: "Sistem dispatch otomatis: admin assign petugas, petugas update progress di lapangan.", color: "bg-amber-100 text-amber-600" },
              { icon: MessageSquare, title: "Konfirmasi & Feedback", desc: "Pelanggan wajib konfirmasi apakah perbaikan sudah benar. Bisa kasih feedback jika belum selesai.", color: "bg-cyan-100 text-cyan-600" },
              { icon: CreditCard, title: "Pembayaran Online", desc: "Bayar biaya perbaikan langsung via transfer. Upload bukti bayar, admin verifikasi.", color: "bg-pink-100 text-pink-600" },
              { icon: Star, title: "Rating & Ulasan", desc: "Beri rating bintang dan ulasan setelah pekerjaan selesai untuk evaluasi kinerja petugas.", color: "bg-orange-100 text-orange-600" },
              { icon: Droplets, title: "Dashboard Analytics", desc: "Visualisasi data laporan per bulan, kinerja petugas, dan rekapitulasi pendapatan.", color: "bg-sky-100 text-sky-600" },
              { icon: AlertTriangle, title: "Pengumuman Publik", desc: "Info gangguan distribusi air massal, jadwal pemadaman, dan himbauan bisa dibaca tanpa login.", color: "bg-red-100 text-red-600" },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sky-800 mb-2" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{f.title}</h3>
                <p className="text-slate-500" style={{ fontSize: "0.83rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Pelaporan (REVISED) */}
      <section id="alur" className="py-16 bg-sky-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sky-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Alur Pelaporan TirtaBantu</h2>
            <p className="text-slate-500 mt-2" style={{ fontSize: "0.9rem" }}>Proses transparan dari laporan hingga konfirmasi selesai</p>
          </div>
          <div className="space-y-0">
            {[
              { step: "1", title: "Masyarakat Melapor", desc: "Buat tiket laporan dengan foto, alamat rumah lengkap, dan pin lokasi di peta. Sistem mencatat koordinat otomatis.", color: "bg-sky-600", line: true },
              { step: "2", title: "Admin Memvalidasi", desc: "Admin memeriksa laporan: apakah perlu turun ke lapangan atau bisa ditangani secara remote (misalnya reset jaringan, info area terdampak). Jika ditolak, ada catatan alasan.", color: "bg-blue-600", line: true },
              { step: "3", title: "Penugasan Petugas", desc: "Jika perlu turun lapangan, admin menugaskan petugas. Petugas melihat detail masalah, alamat, dan navigasi ke lokasi via peta.", color: "bg-violet-600", line: true },
              { step: "4", title: "Petugas Mengerjakan", desc: "Petugas update status: Menuju Lokasi → Sedang Dikerjakan → Selesai. Upload foto bukti penyelesaian.", color: "bg-emerald-600", line: true },
              { step: "5", title: "Pelanggan Konfirmasi", desc: "Pelanggan menerima notifikasi dan diminta mengonfirmasi: SELESAI atau BELUM SELESAI. Jika belum, wajib isi alasan/feedback agar ditindaklanjuti.", color: "bg-amber-600", line: true },
              { step: "6", title: "Pembayaran & Rating", desc: "Jika ada biaya, pelanggan bayar via transfer dan upload bukti. Setelah lunas, pelanggan bisa memberi rating bintang dan ulasan.", color: "bg-pink-600", line: false },
            ].map((s, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`w-11 h-11 ${s.color} text-white rounded-full flex items-center justify-center shrink-0 shadow-md`} style={{ fontSize: "1rem", fontWeight: 700 }}>
                    {s.step}
                  </div>
                  {s.line && <div className="w-0.5 flex-1 bg-sky-200 my-1" />}
                </div>
                <div className={`pb-8 ${!s.line ? 'pb-0' : ''}`}>
                  <h3 className="text-sky-800 mb-1" style={{ fontSize: "1rem", fontWeight: 600 }}>{s.title}</h3>
                  <p className="text-slate-500" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin & Kontak */}
      <section id="kontak" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tentang */}
            <div className="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm">
              <h3 className="text-sky-900 mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Tentang TirtaBantu</h3>
              <p className="text-slate-600 mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                TirtaBantu adalah aplikasi web manajemen pelaporan dan distribusi air bersih yang dikembangkan untuk mendukung <strong>SDG Poin 6</strong> - Air Bersih dan Sanitasi Layak.
              </p>
              <p className="text-slate-600 mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                Platform ini menjembatani masyarakat, petugas lapangan, dan pengelola PDAM dengan sistem yang transparan, terukur, dan terdokumentasi.
              </p>
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-sky-800 mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Wilayah Layanan Aktif:</p>
                <div className="flex flex-wrap gap-2">
                  {["Kec. Cianjur", "Kec. Cibadak", "Kec. Sumedang", "Kec. Cipanas", "Kec. Bandung Selatan"].map((w) => (
                    <span key={w} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full" style={{ fontSize: "0.75rem" }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div className="bg-white rounded-2xl p-8 border border-sky-100 shadow-sm">
              <h3 className="text-sky-900 mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Hubungi Kami</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-sky-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sky-800" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Kantor PDAM TirtaBantu</p>
                    <p className="text-slate-500" style={{ fontSize: "0.83rem" }}>Jl. Raya Cianjur No. 100, Kec. Cianjur, Jawa Barat 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-sky-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sky-800" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Telepon & WhatsApp</p>
                    <p className="text-slate-500" style={{ fontSize: "0.83rem" }}>(0263) 123-456 | WA: 0812-3456-7890</p>
                    <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>Senin - Jumat, 08.00 - 16.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-sky-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sky-800" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Email</p>
                    <p className="text-slate-500" style={{ fontSize: "0.83rem" }}>cs@tirtabantu.id</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/login" className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
                  Masuk ke Sistem <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white/70 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-sky-300" />
                <span className="text-white" style={{ fontWeight: 700 }}>TirtaBantu</span>
              </div>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>
                Sistem Informasi Manajemen Pelaporan dan Distribusi Air Bersih untuk masyarakat Indonesia.
              </p>
            </div>
            <div>
              <p className="text-white mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Layanan</p>
              <ul className="space-y-1.5" style={{ fontSize: "0.8rem" }}>
                <li>Laporan Pipa Bocor</li>
                <li>Permintaan Tangki Air</li>
                <li>Cek Kualitas Air</li>
                <li>Sambungan Baru</li>
              </ul>
            </div>
            <div>
              <p className="text-white mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Tautan</p>
              <ul className="space-y-1.5" style={{ fontSize: "0.8rem" }}>
                <li><a href="#pengumuman" className="hover:text-white transition-colors">Pengumuman</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#alur" className="hover:text-white transition-colors">Alur Pelaporan</a></li>
                <li><a href="#kontak" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p style={{ fontSize: "0.75rem" }}>&copy; 2026 TirtaBantu. Mendukung SDG 6 - Air Bersih dan Sanitasi Layak untuk Semua.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}