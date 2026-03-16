import { useState } from "react";
import { pembayaranList, laporanList, kategoriList, userList, Pembayaran } from "../../data/mockData";
import { StatusBadge } from "./Dashboard";
import { CreditCard, CheckCircle, XCircle, Eye, Plus, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { pendapatanBulanan } from "../../data/mockData";

export function PembayaranAdmin() {
  const [data, setData] = useState<Pembayaran[]>([...pembayaranList]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getUser = (id: number) => userList.find(u => u.id === id);
  const getLaporan = (id: number) => laporanList.find(l => l.id === id);
  const getKategori = (laporanId: number) => {
    const lap = getLaporan(laporanId);
    return lap ? kategoriList.find(k => k.id === lap.kategori_id) : null;
  };

  const handleVerifikasi = (id: number, status: "Lunas" | "Belum Dibayar") => {
    setData(data.map(p => p.id === id ? { ...p, status } : p));
  };

  const totalAll = data.reduce((s, p) => s + p.jumlah, 0);
  const totalLunas = data.filter(p => p.status === "Lunas").reduce((s, p) => s + p.jumlah, 0);
  const belumBayar = data.filter(p => p.status === "Belum Dibayar").reduce((s, p) => s + p.jumlah, 0);
  const menungguVerif = data.filter(p => p.status === "Menunggu Verifikasi").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Kelola Pembayaran</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Verifikasi pembayaran dan kelola tagihan pelanggan</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors" style={{ fontSize: "0.85rem" }}>
          <Plus className="w-4 h-4" /> Buat Tagihan
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
          <p className="text-slate-500" style={{ fontSize: "0.78rem" }}>Total Tagihan</p>
          <p className="text-sky-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {totalAll.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <p className="text-slate-500" style={{ fontSize: "0.78rem" }}>Sudah Lunas</p>
          <p className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {totalLunas.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-slate-500" style={{ fontSize: "0.78rem" }}>Belum Dibayar</p>
          <p className="text-red-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {belumBayar.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p className="text-slate-500" style={{ fontSize: "0.78rem" }}>Menunggu Verifikasi</p>
          <p className="text-amber-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{menungguVerif}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm mb-6">
        <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Pendapatan Per Bulan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={pendapatanBulanan}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000)}k`} />
            <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} />
            <Legend />
            <Bar dataKey="total" fill="#0284c7" name="Total Tagihan" radius={[6, 6, 0, 0]} />
            <Bar dataKey="lunas" fill="#10b981" name="Lunas" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Verification queue */}
      {data.filter(p => p.status === "Menunggu Verifikasi").length > 0 && (
        <div className="mb-6">
          <h3 className="text-amber-700 mb-3 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <CreditCard className="w-5 h-5" /> Menunggu Verifikasi
          </h3>
          <div className="space-y-3">
            {data.filter(p => p.status === "Menunggu Verifikasi").map(p => {
              const user = getUser(p.user_id);
              const kat = getKategori(p.laporan_id);
              return (
                <div key={p.id} className="bg-white rounded-xl p-4 border-2 border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sky-600" style={{ fontWeight: 600, fontSize: "0.83rem" }}>#{p.laporan_id}</span>
                        <span className="text-slate-500" style={{ fontSize: "0.78rem" }}>{kat?.icon} {kat?.nama}</span>
                      </div>
                      <p className="text-slate-700" style={{ fontSize: "0.85rem" }}>{user?.nama} - {p.deskripsi_biaya}</p>
                      <p className="text-slate-400" style={{ fontSize: "0.78rem" }}>Dibayar: {p.tgl_bayar} via {p.metode_bayar}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sky-800" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Rp {p.jumlah.toLocaleString("id-ID")}</p>
                      <button onClick={() => handleVerifikasi(p.id, "Lunas")} className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg" title="Verifikasi Lunas">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleVerifikasi(p.id, "Belum Dibayar")} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg" title="Tolak">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All payments table */}
      <h3 className="text-sky-800 mb-3" style={{ fontSize: "1rem", fontWeight: 600 }}>Semua Tagihan</h3>
      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.83rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">Laporan</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Jumlah</th>
              <th className="p-4">Jatuh Tempo</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(p => {
              const user = getUser(p.user_id);
              return (
                <tr key={p.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                  <td className="p-4 text-sky-600" style={{ fontWeight: 600 }}>#{p.laporan_id}</td>
                  <td className="p-4 text-slate-700">{user?.nama}</td>
                  <td className="p-4 text-slate-600 max-w-[220px] truncate">{p.deskripsi_biaya}</td>
                  <td className="p-4" style={{ fontWeight: 600 }}>
                    {p.jumlah === 0 ? <span className="text-sky-600">GRATIS</span> : <span>Rp {p.jumlah.toLocaleString("id-ID")}</span>}
                  </td>
                  <td className="p-4 text-slate-500">{p.tgl_jatuh_tempo}</td>
                  <td className="p-4"><StatusBadge status={p.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
