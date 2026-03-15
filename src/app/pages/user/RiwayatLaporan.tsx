import { useState } from "react";
import { laporanList, kategoriList, wilayahList } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { StatusBadge } from "../admin/Dashboard";
import { Star, MessageSquare, Clock, ChevronDown, ChevronUp } from "lucide-react";

export function RiwayatLaporan() {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [ratingForm, setRatingForm] = useState<{ id: number; rating: number; ulasan: string } | null>(null);

  // Show all for demo purposes
  const myLaporan = laporanList.filter((l) => l.user_id === user?.id || true).slice(0, 6);

  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);
  const getWilayah = (id: number) => wilayahList.find((w) => w.id === id);

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Riwayat Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Pantau status laporan yang pernah Anda buat</p>

      <div className="space-y-4">
        {myLaporan.map((l) => {
          const kategori = getKategori(l.kategori_id);
          const wilayah = getWilayah(l.wilayah_id);
          const expanded = expandedId === l.id;

          return (
            <div key={l.id} className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(expanded ? null : l.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-sky-50/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-700" style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                      #{l.id}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sky-800 truncate" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{kategori?.nama}</p>
                    <p className="text-slate-500 truncate" style={{ fontSize: "0.8rem" }}>{l.deskripsi}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-slate-400" style={{ fontSize: "0.8rem" }}>
                      <Clock className="w-3.5 h-3.5" /> {l.tgl_lapor}
                    </div>
                    <StatusBadge status={l.status} />
                    {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              </button>

              {expanded && (
                <div className="px-5 pb-5 border-t border-sky-50">
                  <div className="grid sm:grid-cols-2 gap-4 mt-4" style={{ fontSize: "0.85rem" }}>
                    <div>
                      <span className="text-slate-500">Wilayah:</span>
                      <p className="text-slate-800">{wilayah?.nama}, {wilayah?.kecamatan}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Tanggal Lapor:</span>
                      <p className="text-slate-800">{l.tgl_lapor}</p>
                    </div>
                  </div>
                  <div className="mt-3" style={{ fontSize: "0.85rem" }}>
                    <span className="text-slate-500">Deskripsi:</span>
                    <p className="text-slate-800 mt-1 bg-sky-50 p-3 rounded-lg">{l.deskripsi}</p>
                  </div>

                  {/* Status timeline */}
                  <div className="mt-4">
                    <p className="text-slate-500 mb-2" style={{ fontSize: "0.85rem" }}>Progress:</p>
                    <div className="flex items-center gap-1">
                      {["Menunggu", "Divalidasi", "Diproses", "Selesai"].map((s, i) => {
                        const statusOrder = { Menunggu: 0, Divalidasi: 1, Diproses: 2, Selesai: 3, Ditolak: -1 };
                        const current = statusOrder[l.status as keyof typeof statusOrder] ?? -1;
                        const active = i <= current && current >= 0;
                        return (
                          <div key={s} className="flex items-center gap-1 flex-1">
                            <div className={`w-full h-2 rounded-full ${active ? "bg-sky-500" : "bg-sky-100"}`} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1">
                      {["Menunggu", "Validasi", "Proses", "Selesai"].map((s) => (
                        <span key={s} className="text-slate-400" style={{ fontSize: "0.65rem" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Rating for completed */}
                  {l.status === "Selesai" && !l.rating && (
                    <div className="mt-4 bg-amber-50 rounded-lg p-4">
                      <p className="text-amber-800 mb-2 flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        <Star className="w-4 h-4" /> Beri Rating Pelayanan
                      </p>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s} className="text-amber-400 hover:scale-110 transition-transform" style={{ fontSize: "1.5rem" }}>
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {l.rating && (
                    <div className="mt-4 bg-emerald-50 rounded-lg p-4" style={{ fontSize: "0.85rem" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-500">{"★".repeat(l.rating)}{"☆".repeat(5 - l.rating)}</span>
                      </div>
                      {l.ulasan && <p className="text-slate-600 italic">"{l.ulasan}"</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
