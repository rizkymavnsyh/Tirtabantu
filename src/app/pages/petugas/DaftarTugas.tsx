import { useState } from "react";
import { penugasanList, laporanList, kategoriList, userList } from "../../data/mockData";
import { StatusBadge } from "../admin/Dashboard";
import { MapDisplay } from "../../components/MapView";
import {
  MapPin, Clock, Upload, CheckCircle, ArrowRight, Navigation, Home,
  Phone, ChevronDown, ChevronUp, Camera,
} from "lucide-react";

export function DaftarTugas() {
  const [tasks, setTasks] = useState([...penugasanList]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState<number | null>(null);

  const getLaporan = (id: number) => laporanList.find((l) => l.id === id);
  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);
  const getPelapor = (id: number) => userList.find((u) => u.id === id);

  const updateStatus = (taskId: number, newStatus: "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai") => {
    setTasks(tasks.map((t) => t.id === taskId ? { ...t, status: newStatus } : t));
    if (newStatus === "Selesai") setShowCompleteModal(null);
  };

  const activeTasks = tasks.filter((t) => t.status !== "Selesai");
  const completedTasks = tasks.filter((t) => t.status === "Selesai");

  const statusSteps = ["Ditugaskan", "Menuju Lokasi", "Sedang Dikerjakan", "Selesai"];
  const getStepIdx = (status: string) => statusSteps.indexOf(status);

  const nextStatusMap: Record<string, "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai"> = {
    Ditugaskan: "Menuju Lokasi",
    "Menuju Lokasi": "Sedang Dikerjakan",
    "Sedang Dikerjakan": "Selesai",
  };

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Daftar Tugas</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporan yang ditugaskan kepada Anda beserta lokasi rumah pelanggan</p>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
          <p className="text-slate-500" style={{ fontSize: "0.8rem" }}>Tugas Aktif</p>
          <p className="text-sky-700" style={{ fontSize: "2rem", fontWeight: 700 }}>{activeTasks.length}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <p className="text-slate-500" style={{ fontSize: "0.8rem" }}>Telah Selesai</p>
          <p className="text-emerald-700" style={{ fontSize: "2rem", fontWeight: 700 }}>{completedTasks.length}</p>
        </div>
      </div>

      {/* Active tasks */}
      <h2 className="text-sky-800 mb-3" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Tugas Aktif</h2>
      {activeTasks.length === 0 && (
        <div className="bg-white rounded-xl p-8 border border-sky-100 text-center text-slate-400 mb-8" style={{ fontSize: "0.9rem" }}>
          Tidak ada tugas aktif saat ini.
        </div>
      )}
      <div className="space-y-4 mb-8">
        {activeTasks.map((t) => {
          const laporan = getLaporan(t.laporan_id);
          if (!laporan) return null;
          const kategori = getKategori(laporan.kategori_id);
          const pelapor = getPelapor(laporan.user_id);
          const expanded = expandedId === t.id;
          const stepIdx = getStepIdx(t.status);

          return (
            <div key={t.id} className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedId(expanded ? null : t.id)}
                className="w-full p-5 text-left hover:bg-sky-50/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sky-600" style={{ fontWeight: 700, fontSize: "0.85rem" }}>#{laporan.id}</span>
                      <span style={{ fontSize: "1.1rem" }}>{kategori?.icon}</span>
                      <span className="text-sky-800" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{kategori?.nama}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500" style={{ fontSize: "0.8rem" }}>
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {laporan.alamat_lengkap} No. {laporan.no_rumah}, {laporan.rt_rw}, {laporan.kelurahan}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 hidden sm:inline" style={{ fontSize: "0.78rem" }}>{t.tgl_penugasan}</span>
                    {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-1 mt-3">
                  {statusSteps.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div className={`h-1.5 rounded-full ${i <= stepIdx ? "bg-sky-500" : "bg-sky-100"}`} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {statusSteps.map(s => (
                    <span key={s} className="text-slate-400" style={{ fontSize: "0.6rem" }}>{s}</span>
                  ))}
                </div>
              </button>

              {/* Expanded */}
              {expanded && (
                <div className="px-5 pb-5 border-t border-sky-50 space-y-4">
                  {/* Pelapor info */}
                  <div className="bg-sky-50 rounded-xl p-4 mt-4">
                    <p className="text-sky-700 mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Info Pelanggan</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 600 }}>
                        {pelapor?.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-800" style={{ fontSize: "0.9rem", fontWeight: 500 }}>{pelapor?.nama}</p>
                        <p className="text-slate-500 flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                          <Phone className="w-3 h-3" /> {pelapor?.telepon}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Alamat detail */}
                  <div className="bg-sky-50 rounded-xl p-4">
                    <p className="text-sky-700 mb-2 flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      <Home className="w-4 h-4" /> Alamat Rumah Lengkap
                    </p>
                    <p className="text-slate-800">{laporan.alamat_lengkap} No. {laporan.no_rumah}</p>
                    <p className="text-slate-600">{laporan.rt_rw}, Kel. {laporan.kelurahan}, Kec. {laporan.kecamatan}</p>
                    <p className="text-slate-400 mt-1 flex items-center gap-1" style={{ fontSize: "0.78rem" }}>
                      <Navigation className="w-3 h-3" /> {laporan.koordinat.lat.toFixed(6)}, {laporan.koordinat.lng.toFixed(6)}
                    </p>
                  </div>

                  {/* Map */}
                  <MapDisplay
                    lat={laporan.koordinat.lat}
                    lng={laporan.koordinat.lng}
                    label={`${laporan.alamat_lengkap} No. ${laporan.no_rumah} - ${pelapor?.nama}`}
                    height="250px"
                  />

                  {/* Open in maps link */}
                  <a
                    href={`https://www.google.com/maps?q=${laporan.koordinat.lat},${laporan.koordinat.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors w-full"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <Navigation className="w-4 h-4" /> Buka di Google Maps
                  </a>

                  {/* Deskripsi */}
                  <div>
                    <p className="text-slate-500 mb-1" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Deskripsi Masalah:</p>
                    <p className="text-slate-800 bg-sky-50 p-3 rounded-lg" style={{ fontSize: "0.85rem" }}>{laporan.deskripsi}</p>
                  </div>

                  {/* Catatan admin */}
                  {laporan.catatan_validasi && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100" style={{ fontSize: "0.83rem" }}>
                      <p className="text-blue-700" style={{ fontWeight: 600 }}>Catatan Admin:</p>
                      <p className="text-slate-700">{laporan.catatan_validasi}</p>
                    </div>
                  )}

                  {/* Action button */}
                  {nextStatusMap[t.status] && (
                    <div className="pt-2">
                      {nextStatusMap[t.status] === "Selesai" ? (
                        <button
                          onClick={() => setShowCompleteModal(t.id)}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <CheckCircle className="w-5 h-5" /> Selesaikan & Upload Bukti
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(t.id, nextStatusMap[t.status])}
                          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <ArrowRight className="w-5 h-5" /> Update: {nextStatusMap[t.status]}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completed tasks */}
      <h2 className="text-sky-800 mb-3" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Riwayat Selesai</h2>
      <div className="space-y-3">
        {completedTasks.map((t) => {
          const laporan = getLaporan(t.laporan_id);
          if (!laporan) return null;
          const kategori = getKategori(laporan.kategori_id);
          return (
            <div key={t.id} className="bg-white rounded-xl border border-emerald-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-700" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    #{laporan.id} - {kategori?.icon} {kategori?.nama}
                  </p>
                  <p className="text-slate-400 truncate" style={{ fontSize: "0.78rem" }}>
                    {laporan.alamat_lengkap} No. {laporan.no_rumah}, {laporan.kelurahan}
                  </p>
                  {t.catatan_petugas && (
                    <p className="text-slate-500 mt-0.5" style={{ fontSize: "0.78rem" }}>Catatan: {t.catatan_petugas}</p>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                {laporan.rating && (
                  <span className="text-amber-500" style={{ fontSize: "0.85rem" }}>{"★".repeat(laporan.rating)}</span>
                )}
                <p className="text-slate-400" style={{ fontSize: "0.72rem" }}>{t.tgl_penugasan}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowCompleteModal(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sky-800 mb-2" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Konfirmasi Penyelesaian</h3>
            <p className="text-slate-500 mb-4" style={{ fontSize: "0.85rem" }}>
              Upload foto bukti perbaikan dan tambahkan catatan.
            </p>

            {/* Photo upload */}
            <label className="border-2 border-dashed border-sky-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition-colors mb-4">
              <Camera className="w-8 h-8 text-sky-400 mb-2" />
              <span className="text-sky-600" style={{ fontSize: "0.85rem" }}>Upload Foto Bukti Perbaikan</span>
              <span className="text-slate-400" style={{ fontSize: "0.72rem" }}>Foto sebelum & sesudah perbaikan</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>

            {/* Catatan petugas */}
            <div className="mb-4">
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem", fontWeight: 600 }}>Catatan Pekerjaan</label>
              <textarea
                placeholder="Jelaskan apa yang sudah dikerjakan, material yang digunakan, dsb..."
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-24 resize-none"
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 mb-4" style={{ fontSize: "0.78rem" }}>
              <p className="text-cyan-700">
                <strong>Info:</strong> Setelah Anda menyelesaikan, pelanggan akan diminta mengonfirmasi apakah masalah sudah teratasi.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(showCompleteModal, "Selesai")}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl transition-colors"
                style={{ fontSize: "0.85rem" }}
              >
                Konfirmasi Selesai
              </button>
              <button
                onClick={() => setShowCompleteModal(null)}
                className="flex-1 border border-sky-200 text-sky-700 py-2.5 rounded-xl hover:bg-sky-50 transition-colors"
                style={{ fontSize: "0.85rem" }}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
