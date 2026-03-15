import { Link } from "react-router";
import { Droplets, FileText, Users, Shield, ArrowRight, AlertTriangle, Clock } from "lucide-react";
import { pengumumanList } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-20 border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-sky-600" />
            <span className="text-sky-800" style={{ fontSize: "1.25rem", fontWeight: 700 }}>TirtaBantu</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#pengumuman" className="text-sky-700 hover:text-sky-900 hidden sm:inline" style={{ fontSize: "0.875rem" }}>Pengumuman</a>
            <a href="#fitur" className="text-sky-700 hover:text-sky-900 hidden sm:inline" style={{ fontSize: "0.875rem" }}>Fitur</a>
            <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors" style={{ fontSize: "0.875rem" }}>
              Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-4 py-1.5 mb-6" style={{ fontSize: "0.85rem" }}>
              <Droplets className="w-4 h-4" />
              Sistem Informasi Air Bersih
            </div>
            <h1 className="text-sky-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.1 }}>
              TirtaBantu
            </h1>
            <p className="text-sky-700 mb-2" style={{ fontSize: "1.15rem" }}>
              Sistem Informasi Manajemen Pelaporan dan Distribusi Air Bersih
            </p>
            <p className="text-slate-600 mb-8" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
              Laporkan masalah infrastruktur air dengan mudah. Pantau status perbaikan secara real-time. Bersama wujudkan akses air bersih untuk semua.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-sky-200">
                Mulai Lapor <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#fitur" className="border border-sky-300 text-sky-700 hover:bg-sky-50 px-6 py-3 rounded-xl transition-colors">
                Pelajari Fitur
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1574718944703-2857f03a82b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3AlMjBibHVlJTIwc3BsYXNofGVufDF8fHx8MTc3MzUzMjI1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Water"
              className="rounded-2xl shadow-2xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section id="pengumuman" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-sky-900 mb-8 text-center" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Pengumuman Terbaru
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {pengumumanList.map((p) => (
              <div key={p.id} className="bg-sky-50 border border-sky-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  {p.penting ? (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-sky-400" />
                  )}
                  {p.penting && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded" style={{ fontSize: "0.7rem", fontWeight: 600 }}>PENTING</span>}
                </div>
                <h3 className="text-sky-800 mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{p.judul}</h3>
                <p className="text-slate-600 mb-3" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{p.isi}</p>
                <p className="text-sky-400" style={{ fontSize: "0.75rem" }}>{p.tgl_posting}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-sky-900 mb-3 text-center" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Fitur Utama
          </h2>
          <p className="text-slate-500 text-center mb-10" style={{ fontSize: "0.9rem" }}>
            Solusi terintegrasi untuk pelaporan dan distribusi air bersih
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FileText, title: "Pelaporan Mudah", desc: "Buat laporan masalah air dengan foto dan lokasi dalam hitungan menit." },
              { icon: Users, title: "Penugasan Otomatis", desc: "Admin dapat menugaskan petugas langsung melalui sistem dispatch." },
              { icon: Shield, title: "Tracking Real-time", desc: "Pantau status laporan dari Menunggu hingga Selesai secara transparan." },
              { icon: Droplets, title: "Dashboard Analytics", desc: "Visualisasi data laporan per bulan dan kinerja petugas." },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-sky-800 mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{f.title}</h3>
                <p className="text-slate-500" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Bisnis */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-sky-900 mb-8" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Alur Pelaporan</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Masyarakat Melapor", desc: "Buat tiket laporan dengan foto dan deskripsi melalui web." },
              { step: "2", title: "Admin Menugaskan", desc: "Admin memvalidasi dan menugaskan petugas lapangan." },
              { step: "3", title: "Petugas Menyelesaikan", desc: "Petugas mengerjakan dan mengunggah bukti penyelesaian." },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  {s.step}
                </div>
                <h3 className="text-sky-800 mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{s.title}</h3>
                <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white/70 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-sky-300" />
            <span className="text-white" style={{ fontWeight: 600 }}>TirtaBantu</span>
          </div>
          <p style={{ fontSize: "0.8rem" }}>Sistem Informasi Manajemen Pelaporan dan Distribusi Air Bersih</p>
          <p style={{ fontSize: "0.75rem" }} className="mt-2">&copy; 2026 TirtaBantu. SDG 6 - Air Bersih dan Sanitasi Layak.</p>
        </div>
      </footer>
    </div>
  );
}
