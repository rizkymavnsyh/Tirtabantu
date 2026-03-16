import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { kinerjaPetugas, penugasanList, laporanList } from "../../data/mockData";
import { Award, TrendingUp, Star, MapPin, CheckCircle } from "lucide-react";

export function KinerjaPetugas() {
  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Kinerja Petugas Lapangan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporan produktivitas dan kualitas layanan setiap petugas</p>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <TrendingUp className="w-5 h-5 text-sky-600" /> Grafik Kinerja
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={kinerjaPetugas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="nama" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="selesai" fill="#10b981" name="Selesai" radius={[6, 6, 0, 0]} />
              <Bar dataKey="aktif" fill="#0284c7" name="Aktif" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {kinerjaPetugas.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {p.nama.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sky-800" style={{ fontWeight: 600 }}>{p.nama}</p>
                    <p className="text-slate-400" style={{ fontSize: "0.78rem" }}>Petugas Lapangan</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {p.selesai >= 3 && <Award className="w-6 h-6 text-amber-400" />}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-amber-700" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{p.rating_avg}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <p className="text-emerald-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.selesai}</p>
                  <p className="text-emerald-600" style={{ fontSize: "0.72rem" }}>Selesai</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3 text-center">
                  <p className="text-sky-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.aktif}</p>
                  <p className="text-sky-600" style={{ fontSize: "0.72rem" }}>Aktif</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-amber-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.rating_avg}</p>
                  <p className="text-amber-600" style={{ fontSize: "0.72rem" }}>Avg Rating</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed task history */}
      <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
        <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Riwayat Penugasan</h3>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.83rem" }}>
            <thead>
              <tr className="text-left text-slate-500 border-b border-sky-100">
                <th className="pb-3 pr-4">Laporan</th>
                <th className="pb-3 pr-4">Petugas</th>
                <th className="pb-3 pr-4">Lokasi</th>
                <th className="pb-3 pr-4">Tanggal</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {penugasanList.map(p => {
                const lap = laporanList.find(l => l.id === p.laporan_id);
                const pet = kinerjaPetugas.find((_, i) => [2, 3, 6][i] === p.petugas_id);
                return (
                  <tr key={p.id} className="border-b border-sky-50">
                    <td className="py-3 pr-4 text-sky-600" style={{ fontWeight: 600 }}>#{p.laporan_id}</td>
                    <td className="py-3 pr-4 text-slate-700">ID-{p.petugas_id}</td>
                    <td className="py-3 pr-4">
                      {lap && (
                        <span className="text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          <span className="truncate max-w-[150px]">{lap.alamat_lengkap}, {lap.kelurahan}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-slate-500">{p.tgl_penugasan}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full ${p.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`} style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 max-w-[200px] truncate">{p.catatan_petugas || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
