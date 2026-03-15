import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  laporanList, laporanPerBulan, statusDistribusi, penugasanList,
} from "../../data/mockData";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export function Dashboard() {
  const totalLaporan = laporanList.length;
  const menunggu = laporanList.filter((l) => l.status === "Menunggu").length;
  const diproses = laporanList.filter((l) => l.status === "Diproses" || l.status === "Divalidasi").length;
  const selesai = laporanList.filter((l) => l.status === "Selesai").length;

  const cards = [
    { label: "Total Laporan", value: totalLaporan, icon: FileText, color: "bg-sky-500", bgLight: "bg-sky-50" },
    { label: "Menunggu", value: menunggu, icon: Clock, color: "bg-amber-500", bgLight: "bg-amber-50" },
    { label: "Sedang Diproses", value: diproses, icon: AlertTriangle, color: "bg-violet-500", bgLight: "bg-violet-50" },
    { label: "Selesai", value: selesai, icon: CheckCircle, color: "bg-emerald-500", bgLight: "bg-emerald-50" },
  ];

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Dashboard Admin</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Ringkasan data pelaporan dan distribusi air bersih</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <div key={i} className={`${c.bgLight} rounded-xl p-5 border border-sky-100`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`${c.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-slate-500 mb-1" style={{ fontSize: "0.8rem" }}>{c.label}</p>
            <p className="text-sky-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Laporan Per Bulan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={laporanPerBulan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#0284c7" radius={[6, 6, 0, 0]} name="Total Laporan" />
              <Bar dataKey="selesai" fill="#10b981" radius={[6, 6, 0, 0]} name="Selesai" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Distribusi Status Laporan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusDistribusi} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusDistribusi.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent reports */}
      <div className="mt-6 bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
        <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Laporan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: "0.85rem" }}>
            <thead>
              <tr className="text-left text-slate-500 border-b border-sky-100">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Deskripsi</th>
                <th className="pb-3 pr-4">Tanggal</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {laporanList.slice(0, 5).map((l) => (
                <tr key={l.id} className="border-b border-sky-50">
                  <td className="py-3 pr-4 text-sky-600" style={{ fontWeight: 600 }}>#{l.id}</td>
                  <td className="py-3 pr-4 text-slate-700 max-w-xs truncate">{l.deskripsi}</td>
                  <td className="py-3 pr-4 text-slate-500">{l.tgl_lapor}</td>
                  <td className="py-3">
                    <StatusBadge status={l.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Menunggu: "bg-amber-100 text-amber-700",
    Divalidasi: "bg-blue-100 text-blue-700",
    Diproses: "bg-violet-100 text-violet-700",
    Selesai: "bg-emerald-100 text-emerald-700",
    Ditolak: "bg-red-100 text-red-700",
    Ditugaskan: "bg-blue-100 text-blue-700",
    "Menuju Lokasi": "bg-cyan-100 text-cyan-700",
    "Sedang Dikerjakan": "bg-violet-100 text-violet-700",
  };
  return (
    <span className={`${styles[status] || "bg-gray-100 text-gray-700"} px-2.5 py-1 rounded-full inline-block`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
      {status}
    </span>
  );
}
