import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  laporanList, laporanPerBulan, statusDistribusi, pembayaranList, kategoriList,
} from "../../data/mockData";
import { FileText, CheckCircle, Clock, AlertTriangle, CreditCard, MapPin, TrendingUp, XCircle } from "lucide-react";

export function Dashboard() {
  const totalLaporan = laporanList.length;
  const menunggu = laporanList.filter((l) => l.status === "Menunggu Validasi").length;
  const diproses = laporanList.filter((l) => ["Divalidasi", "Ditugaskan", "Menuju Lokasi", "Sedang Dikerjakan"].includes(l.status)).length;
  const selesai = laporanList.filter((l) => l.status === "Selesai").length;
  const menungguKonfirmasi = laporanList.filter((l) => l.status === "Menunggu Konfirmasi").length;
  const belumSelesai = laporanList.filter((l) => l.status === "Belum Selesai").length;
  const totalPendapatan = pembayaranList.filter(p => p.status === "Lunas").reduce((s, p) => s + p.jumlah, 0);
  const belumBayar = pembayaranList.filter(p => p.status === "Belum Dibayar").length;

  const cards = [
    { label: "Total Laporan", value: totalLaporan, icon: FileText, color: "bg-sky-500", bgLight: "bg-sky-50", textColor: "text-sky-700" },
    { label: "Menunggu Validasi", value: menunggu, icon: Clock, color: "bg-amber-500", bgLight: "bg-amber-50", textColor: "text-amber-700" },
    { label: "Sedang Diproses", value: diproses, icon: TrendingUp, color: "bg-violet-500", bgLight: "bg-violet-50", textColor: "text-violet-700" },
    { label: "Selesai", value: selesai, icon: CheckCircle, color: "bg-emerald-500", bgLight: "bg-emerald-50", textColor: "text-emerald-700" },
    { label: "Menunggu Konfirmasi", value: menungguKonfirmasi, icon: AlertTriangle, color: "bg-cyan-500", bgLight: "bg-cyan-50", textColor: "text-cyan-700" },
    { label: "Belum Selesai", value: belumSelesai, icon: XCircle, color: "bg-orange-500", bgLight: "bg-orange-50", textColor: "text-orange-700" },
  ];

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Dashboard Admin</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Ringkasan sistem pelaporan dan distribusi air bersih</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cards.map((c, i) => (
          <div key={i} className={`${c.bgLight} rounded-xl p-4 border border-sky-100`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`${c.color} w-9 h-9 rounded-lg flex items-center justify-center shrink-0`}>
                <c.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-slate-500" style={{ fontSize: "0.78rem" }}>{c.label}</p>
            </div>
            <p className={c.textColor} style={{ fontSize: "1.75rem", fontWeight: 700 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue card */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5" />
            <span style={{ fontSize: "0.85rem" }}>Total Pendapatan (Lunas)</span>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 700 }}>Rp {totalPendapatan.toLocaleString("id-ID")}</p>
          <p className="text-emerald-100 mt-1" style={{ fontSize: "0.8rem" }}>{belumBayar} pembayaran belum lunas</p>
        </div>
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            <span style={{ fontSize: "0.85rem" }}>Laporan Perlu Turun Lapangan</span>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: 700 }}>{laporanList.filter(l => l.perlu_turun_lapangan === true).length}</p>
          <p className="text-sky-100 mt-1" style={{ fontSize: "0.8rem" }}>{laporanList.filter(l => l.perlu_turun_lapangan === null).length} belum divalidasi</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Laporan Per Bulan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={laporanPerBulan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#0284c7" radius={[6, 6, 0, 0]} name="Total" />
              <Bar dataKey="selesai" fill="#10b981" radius={[6, 6, 0, 0]} name="Selesai" />
              <Bar dataKey="ditolak" fill="#ef4444" radius={[6, 6, 0, 0]} name="Ditolak" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Distribusi Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusDistribusi} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" label={({ name, value }) => `${value}`}>
                {statusDistribusi.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
        <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Laporan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.83rem" }}>
            <thead>
              <tr className="text-left text-slate-500 border-b border-sky-100">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Alamat</th>
                <th className="pb-3 pr-4">Kategori</th>
                <th className="pb-3 pr-4">Tanggal</th>
                <th className="pb-3 pr-4">Turun Lapangan</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {laporanList.slice(0, 6).map((l) => {
                const kat = kategoriList.find(k => k.id === l.kategori_id);
                return (
                  <tr key={l.id} className="border-b border-sky-50">
                    <td className="py-3 pr-4 text-sky-600" style={{ fontWeight: 600 }}>#{l.id}</td>
                    <td className="py-3 pr-4 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{l.alamat_lengkap}, {l.kelurahan}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{kat?.nama}</td>
                    <td className="py-3 pr-4 text-slate-500">{l.tgl_lapor}</td>
                    <td className="py-3 pr-4">
                      {l.perlu_turun_lapangan === null ? (
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>Belum</span>
                      ) : l.perlu_turun_lapangan ? (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>Ya</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>Tidak</span>
                      )}
                    </td>
                    <td className="py-3"><StatusBadge status={l.status} /></td>
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

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Menunggu Validasi": "bg-amber-100 text-amber-700",
    "Divalidasi": "bg-blue-100 text-blue-700",
    "Ditolak": "bg-red-100 text-red-700",
    "Ditugaskan": "bg-indigo-100 text-indigo-700",
    "Menuju Lokasi": "bg-cyan-100 text-cyan-700",
    "Sedang Dikerjakan": "bg-violet-100 text-violet-700",
    "Menunggu Konfirmasi": "bg-teal-100 text-teal-700",
    "Selesai": "bg-emerald-100 text-emerald-700",
    "Belum Selesai": "bg-orange-100 text-orange-700",
    "Belum Dibayar": "bg-red-100 text-red-700",
    "Menunggu Verifikasi": "bg-amber-100 text-amber-700",
    "Lunas": "bg-emerald-100 text-emerald-700",
    "Gratis": "bg-sky-100 text-sky-700",
  };
  return (
    <span className={`${styles[status] || "bg-gray-100 text-gray-700"} px-2.5 py-1 rounded-full inline-block whitespace-nowrap`} style={{ fontSize: "0.72rem", fontWeight: 600 }}>
      {status}
    </span>
  );
}
