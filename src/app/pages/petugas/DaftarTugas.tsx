import { useState } from "react";
import { penugasanList, laporanList, kategoriList, wilayahList, userList } from "../../data/mockData";
import { StatusBadge } from "../admin/Dashboard";
import { MapPin, Clock, Upload, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";

export function DaftarTugas() {
  const [tasks, setTasks] = useState([...penugasanList]);
  const [showCompleteModal, setShowCompleteModal] = useState<number | null>(null);

  const getLaporan = (id: number) => laporanList.find((l) => l.id === id);
  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);
  const getWilayah = (id: number) => wilayahList.find((w) => w.id === id);
  const getPelapor = (id: number) => userList.find((u) => u.id === id);

  const updateStatus = (taskId: number, newStatus: "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai") => {
    setTasks(tasks.map((t) => t.id === taskId ? { ...t, status: newStatus } : t));
    if (newStatus === "Selesai") setShowCompleteModal(null);
  };

  const activeTasks = tasks.filter((t) => t.status !== "Selesai");
  const completedTasks = tasks.filter((t) => t.status === "Selesai");

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Daftar Tugas</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporan yang ditugaskan kepada Anda</p>

      {/* Summary cards */}
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
      <div className="space-y-4 mb-8">
        {activeTasks.length === 0 && (
          <div className="bg-white rounded-xl p-8 border border-sky-100 text-center text-slate-400" style={{ fontSize: "0.9rem" }}>
            Tidak ada tugas aktif saat ini.
          </div>
        )}
        {activeTasks.map((t) => {
          const laporan = getLaporan(t.laporan_id);
          if (!laporan) return null;
          const kategori = getKategori(laporan.kategori_id);
          const wilayah = getWilayah(laporan.wilayah_id);
          const pelapor = getPelapor(laporan.user_id);

          const nextStatus: Record<string, "Menuju Lokasi" | "Sedang Dikerjakan" | "Selesai"> = {
            Ditugaskan: "Menuju Lokasi",
            "Menuju Lokasi": "Sedang Dikerjakan",
            "Sedang Dikerjakan": "Selesai",
          };

          return (
            <div key={t.id} className="bg-white rounded-xl border border-sky-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sky-600" style={{ fontWeight: 700, fontSize: "0.85rem" }}>Laporan #{laporan.id}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <h3 className="text-sky-800" style={{ fontSize: "1rem", fontWeight: 600 }}>{kategori?.nama}</h3>
                </div>
                <div className="flex items-center gap-1 text-slate-400" style={{ fontSize: "0.8rem" }}>
                  <Clock className="w-3.5 h-3.5" /> {t.tgl_penugasan}
                </div>
              </div>

              <p className="text-slate-600 mb-3 bg-sky-50 p-3 rounded-lg" style={{ fontSize: "0.85rem" }}>
                {laporan.deskripsi}
              </p>

              <div className="flex flex-wrap gap-4 mb-4" style={{ fontSize: "0.8rem" }}>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  {wilayah?.nama}, {wilayah?.kecamatan}
                </div>
                <div className="text-slate-500">
                  Pelapor: <span className="text-slate-700">{pelapor?.nama}</span>
                </div>
              </div>

              {/* Status progress */}
              <div className="flex items-center gap-2 mb-4">
                {["Ditugaskan", "Menuju Lokasi", "Sedang Dikerjakan", "Selesai"].map((s, i) => {
                  const order = { Ditugaskan: 0, "Menuju Lokasi": 1, "Sedang Dikerjakan": 2, Selesai: 3 };
                  const current = order[t.status as keyof typeof order];
                  const active = i <= current;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`h-1.5 rounded-full flex-1 ${active ? "bg-sky-500" : "bg-sky-100"}`} />
                    </div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                {t.status !== "Selesai" && nextStatus[t.status] && (
                  nextStatus[t.status] === "Selesai" ? (
                    <button
                      onClick={() => setShowCompleteModal(t.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <CheckCircle className="w-4 h-4" /> Selesaikan Tugas
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(t.id, nextStatus[t.status])}
                      className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <ArrowRight className="w-4 h-4" /> {nextStatus[t.status]}
                    </button>
                  )
                )}
              </div>
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
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-slate-700" style={{ fontSize: "0.9rem", fontWeight: 500 }}>#{laporan.id} - {kategori?.nama}</p>
                  <p className="text-slate-400" style={{ fontSize: "0.8rem" }}>Selesai pada {t.tgl_penugasan}</p>
                </div>
              </div>
              {laporan.rating && (
                <span className="text-amber-500" style={{ fontSize: "0.85rem" }}>{"★".repeat(laporan.rating)}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Complete modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowCompleteModal(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sky-800 mb-4" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Konfirmasi Penyelesaian</h3>
            <p className="text-slate-500 mb-4" style={{ fontSize: "0.85rem" }}>Upload foto bukti bahwa perbaikan telah selesai dilakukan.</p>
            <label className="border-2 border-dashed border-sky-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition-colors mb-4">
              <Upload className="w-8 h-8 text-sky-400 mb-2" />
              <span className="text-sky-600" style={{ fontSize: "0.85rem" }}>Klik untuk upload foto bukti</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(showCompleteModal, "Selesai")}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg transition-colors"
                style={{ fontSize: "0.85rem" }}
              >
                Konfirmasi Selesai
              </button>
              <button
                onClick={() => setShowCompleteModal(null)}
                className="flex-1 border border-sky-200 text-sky-700 py-2.5 rounded-lg hover:bg-sky-50 transition-colors"
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
