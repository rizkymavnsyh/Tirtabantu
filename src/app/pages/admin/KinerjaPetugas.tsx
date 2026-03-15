import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { kinerjaPetugas } from "../../data/mockData";
import { Award, TrendingUp } from "lucide-react";

export function KinerjaPetugas() {
  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Kinerja Petugas Lapangan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporan produktivitas setiap petugas</p>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <TrendingUp className="w-5 h-5 text-sky-600" /> Grafik Kinerja
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={kinerjaPetugas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="nama" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="selesai" fill="#10b981" name="Selesai" radius={[6, 6, 0, 0]} />
              <Bar dataKey="aktif" fill="#0284c7" name="Sedang Aktif" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {kinerjaPetugas.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-sky-100 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 600 }}>
                    {p.nama.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sky-800" style={{ fontWeight: 600 }}>{p.nama}</p>
                    <p className="text-slate-400" style={{ fontSize: "0.8rem" }}>Petugas Lapangan</p>
                  </div>
                </div>
                {p.selesai >= 2 && <Award className="w-6 h-6 text-amber-400" />}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <p className="text-emerald-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.selesai}</p>
                  <p className="text-emerald-600" style={{ fontSize: "0.75rem" }}>Tugas Selesai</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3 text-center">
                  <p className="text-sky-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{p.aktif}</p>
                  <p className="text-sky-600" style={{ fontSize: "0.75rem" }}>Tugas Aktif</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
