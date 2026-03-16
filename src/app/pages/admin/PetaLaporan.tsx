import { useState } from "react";
import { laporanList, kategoriList, userList } from "../../data/mockData";
import { MapOverview, MapMarker } from "../../components/MapView";
import { StatusBadge } from "./Dashboard";
import { MapPin, Filter } from "lucide-react";

export function PetaLaporan() {
  const [filterStatus, setFilterStatus] = useState("semua");

  const filtered = laporanList.filter((l) =>
    filterStatus === "semua" || l.status === filterStatus
  );

  const markers: MapMarker[] = filtered.map((l) => {
    const kat = kategoriList.find(k => k.id === l.kategori_id);
    return {
      id: l.id,
      lat: l.koordinat.lat,
      lng: l.koordinat.lng,
      label: `${kat?.icon} ${kat?.nama} - ${l.alamat_lengkap} No.${l.no_rumah}, ${l.kelurahan}`,
      status: l.status,
    };
  });

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Peta Laporan</h1>
      <p className="text-slate-500 mb-4" style={{ fontSize: "0.85rem" }}>Visualisasi lokasi seluruh laporan di peta interaktif</p>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-sky-500" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.83rem" }}>
            <option value="semua">Semua Status</option>
            {["Menunggu Validasi", "Divalidasi", "Ditugaskan", "Sedang Dikerjakan", "Menunggu Konfirmasi", "Selesai", "Belum Selesai", "Ditolak"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex items-center gap-3 ml-auto" style={{ fontSize: "0.78rem" }}>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full inline-block" /> Aktif/Menunggu</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Selesai</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Lainnya</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapOverview markers={markers} height="500px" />

      {/* List below map */}
      <div className="mt-4 bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <div className="p-4 border-b border-sky-100">
          <p className="text-sky-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{filtered.length} Laporan Ditampilkan</p>
        </div>
        <div className="divide-y divide-sky-50">
          {filtered.map((l) => {
            const kat = kategoriList.find(k => k.id === l.kategori_id);
            const user = userList.find(u => u.id === l.user_id);
            return (
              <div key={l.id} className="p-4 hover:bg-sky-50/30 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sky-600 shrink-0" style={{ fontWeight: 600, fontSize: "0.83rem" }}>#{l.id}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <p className="text-slate-700 truncate" style={{ fontSize: "0.83rem" }}>{l.alamat_lengkap} No. {l.no_rumah}, {l.kelurahan}</p>
                      </div>
                      <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>{kat?.icon} {kat?.nama} | {user?.nama} | {l.koordinat.lat.toFixed(4)}, {l.koordinat.lng.toFixed(4)}</p>
                    </div>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
