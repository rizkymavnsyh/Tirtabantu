import { useState } from "react";
import { pembayaranList, laporanList, kategoriList, Pembayaran } from "../../data/mockData";
import { StatusBadge } from "../admin/Dashboard";
import { CreditCard, Upload, Clock, CheckCircle2, AlertTriangle, X, Receipt, Wallet } from "lucide-react";

export function PembayaranUser() {
  const [data, setData] = useState<Pembayaran[]>([...pembayaranList]);
  const [showBayarModal, setShowBayarModal] = useState<number | null>(null);

  const getLaporan = (id: number) => laporanList.find(l => l.id === id);
  const getKategori = (laporanId: number) => {
    const lap = getLaporan(laporanId);
    return lap ? kategoriList.find(k => k.id === lap.kategori_id) : null;
  };

  const handleBayar = (id: number, metode: string) => {
    setData(data.map(p =>
      p.id === id ? { ...p, status: "Menunggu Verifikasi" as const, metode_bayar: metode, tgl_bayar: "2026-03-16", bukti_bayar: "uploaded" } : p
    ));
    setShowBayarModal(null);
  };

  const totalBelumBayar = data.filter(p => p.status === "Belum Dibayar").reduce((s, p) => s + p.jumlah, 0);
  const totalLunas = data.filter(p => p.status === "Lunas").reduce((s, p) => s + p.jumlah, 0);

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Pembayaran</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Kelola tagihan biaya perbaikan dan layanan air</p>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-sky-100">
          <div className="flex items-center gap-2 text-slate-500 mb-1" style={{ fontSize: "0.78rem" }}>
            <Receipt className="w-4 h-4" /> Total Tagihan
          </div>
          <p className="text-sky-800" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{data.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-2 text-red-500 mb-1" style={{ fontSize: "0.78rem" }}>
            <AlertTriangle className="w-4 h-4" /> Belum Dibayar
          </div>
          <p className="text-red-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {totalBelumBayar.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-600 mb-1" style={{ fontSize: "0.78rem" }}>
            <Clock className="w-4 h-4" /> Menunggu Verifikasi
          </div>
          <p className="text-amber-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{data.filter(p => p.status === "Menunggu Verifikasi").length}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-600 mb-1" style={{ fontSize: "0.78rem" }}>
            <CheckCircle2 className="w-4 h-4" /> Sudah Lunas
          </div>
          <p className="text-emerald-700" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {totalLunas.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Tagihan yang perlu dibayar */}
      {data.filter(p => p.status === "Belum Dibayar").length > 0 && (
        <div className="mb-6">
          <h3 className="text-sky-800 mb-3 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <AlertTriangle className="w-5 h-5 text-red-500" /> Tagihan Belum Dibayar
          </h3>
          <div className="space-y-3">
            {data.filter(p => p.status === "Belum Dibayar").map((p) => {
              const kat = getKategori(p.laporan_id);
              const lap = getLaporan(p.laporan_id);
              return (
                <div key={p.id} className="bg-white rounded-xl p-5 border-2 border-red-200 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sky-600" style={{ fontWeight: 700, fontSize: "0.83rem" }}>Laporan #{p.laporan_id}</span>
                        <span className="text-slate-400" style={{ fontSize: "0.78rem" }}>{kat?.icon} {kat?.nama}</span>
                      </div>
                      <p className="text-slate-700" style={{ fontSize: "0.85rem" }}>{p.deskripsi_biaya}</p>
                      {lap && (
                        <p className="text-slate-400 mt-0.5" style={{ fontSize: "0.78rem" }}>
                          {lap.alamat_lengkap} No. {lap.no_rumah}, {lap.kelurahan}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-red-600" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Rp {p.jumlah.toLocaleString("id-ID")}</p>
                      <p className="text-red-400 flex items-center gap-1 justify-end" style={{ fontSize: "0.75rem" }}>
                        <Clock className="w-3 h-3" /> Jatuh tempo: {p.tgl_jatuh_tempo}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBayarModal(p.id)}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <Wallet className="w-4 h-4" /> Bayar Sekarang
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All payments */}
      <h3 className="text-sky-800 mb-3" style={{ fontSize: "1rem", fontWeight: 600 }}>Riwayat Pembayaran</h3>
      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.83rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">Laporan</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Jumlah</th>
              <th className="p-4">Metode</th>
              <th className="p-4">Tgl Bayar</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => {
              const kat = getKategori(p.laporan_id);
              return (
                <tr key={p.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sky-600" style={{ fontWeight: 600 }}>#{p.laporan_id}</span>
                      <span className="text-slate-400" style={{ fontSize: "0.75rem" }}>{kat?.icon}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 max-w-[250px]">{p.deskripsi_biaya}</td>
                  <td className="p-4" style={{ fontWeight: 600 }}>
                    {p.jumlah === 0 ? (
                      <span className="text-sky-600">GRATIS</span>
                    ) : (
                      <span className="text-slate-800">Rp {p.jumlah.toLocaleString("id-ID")}</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500">{p.metode_bayar || "-"}</td>
                  <td className="p-4 text-slate-500">{p.tgl_bayar || "-"}</td>
                  <td className="p-4"><StatusBadge status={p.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bayar Modal */}
      {showBayarModal && (() => {
        const payment = data.find(p => p.id === showBayarModal)!;
        return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowBayarModal(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sky-800" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Pembayaran</h3>
                <button onClick={() => setShowBayarModal(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>

              <div className="bg-sky-50 rounded-xl p-4 mb-5">
                <p className="text-slate-500" style={{ fontSize: "0.8rem" }}>Total Pembayaran</p>
                <p className="text-sky-800" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Rp {payment.jumlah.toLocaleString("id-ID")}</p>
                <p className="text-slate-500 mt-1" style={{ fontSize: "0.8rem" }}>{payment.deskripsi_biaya}</p>
              </div>

              {/* Bank info */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
                <p className="text-slate-800 mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Transfer ke:</p>
                <div className="space-y-1" style={{ fontSize: "0.83rem" }}>
                  <p className="text-slate-700">Bank BRI: <strong>1234-5678-9012-3456</strong></p>
                  <p className="text-slate-700">a.n. <strong>PDAM TirtaBantu</strong></p>
                </div>
              </div>

              {/* Upload bukti */}
              <div className="mb-4">
                <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.83rem", fontWeight: 600 }}>Upload Bukti Transfer</label>
                <label className="border-2 border-dashed border-sky-200 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition-colors">
                  <Upload className="w-7 h-7 text-sky-400 mb-2" />
                  <span className="text-sky-600" style={{ fontSize: "0.83rem" }}>Klik untuk upload bukti transfer</span>
                  <span className="text-slate-400 mt-1" style={{ fontSize: "0.72rem" }}>JPG, PNG (Maks. 5MB)</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Metode */}
              <div className="mb-5">
                <p className="text-sky-800 mb-2" style={{ fontSize: "0.83rem", fontWeight: 600 }}>Pilih Metode:</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Transfer Bank", "E-Wallet", "QRIS", "Tunai di Kantor"].map((m) => (
                    <button
                      key={m}
                      onClick={() => handleBayar(showBayarModal, m)}
                      className="border border-sky-200 hover:border-sky-400 hover:bg-sky-50 rounded-lg p-3 text-sky-800 transition-all text-left"
                      style={{ fontSize: "0.83rem" }}
                    >
                      <CreditCard className="w-4 h-4 text-sky-500 mb-1" />
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
