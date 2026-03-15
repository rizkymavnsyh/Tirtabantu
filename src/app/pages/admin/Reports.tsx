import { useState } from "react";
import { laporanList, wilayahList, kategoriList, userList, penugasanList, StatusLaporan } from "../../data/mockData";
import { StatusBadge } from "./Dashboard";
import { Search, Filter, UserPlus, Eye, X, CheckCircle, XCircle } from "lucide-react";

export function Reports() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("semua");
  const [filterKategori, setFilterKategori] = useState<string>("semua");
  const [selectedLaporan, setSelectedLaporan] = useState<number | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<number | null>(null);

  const filtered = laporanList.filter((l) => {
    const matchSearch = l.deskripsi.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "semua" || l.status === filterStatus;
    const matchKategori = filterKategori === "semua" || l.kategori_id === Number(filterKategori);
    return matchSearch && matchStatus && matchKategori;
  });

  const getUser = (id: number) => userList.find((u) => u.id === id);
  const getWilayah = (id: number) => wilayahList.find((w) => w.id === id);
  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);
  const petugasList = userList.filter((u) => u.role === "petugas");

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Kelola Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Validasi dan kelola seluruh laporan masyarakat</p>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari laporan..."
              className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
              style={{ fontSize: "0.85rem" }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
            style={{ fontSize: "0.85rem" }}
          >
            <option value="semua">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Divalidasi">Divalidasi</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditolak">Ditolak</option>
          </select>
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
            style={{ fontSize: "0.85rem" }}
          >
            <option value="semua">Semua Kategori</option>
            {kategoriList.map((k) => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">ID</th>
              <th className="p-4">Pelapor</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Wilayah</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const pelapor = getUser(l.user_id);
              const kategori = getKategori(l.kategori_id);
              const wilayah = getWilayah(l.wilayah_id);
              return (
                <tr key={l.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                  <td className="p-4 text-sky-600" style={{ fontWeight: 600 }}>#{l.id}</td>
                  <td className="p-4 text-slate-700">{pelapor?.nama}</td>
                  <td className="p-4 text-slate-600">{kategori?.nama}</td>
                  <td className="p-4 text-slate-600">{wilayah?.nama}</td>
                  <td className="p-4 text-slate-500">{l.tgl_lapor}</td>
                  <td className="p-4"><StatusBadge status={l.status} /></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedLaporan(l.id)}
                        className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {l.status === "Menunggu" && (
                        <>
                          <button className="text-emerald-600 hover:bg-emerald-100 p-1.5 rounded-lg transition-colors" title="Validasi">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg transition-colors" title="Tolak">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {(l.status === "Divalidasi") && (
                        <button
                          onClick={() => setShowAssignModal(l.id)}
                          className="text-violet-600 hover:bg-violet-100 p-1.5 rounded-lg transition-colors"
                          title="Tugaskan Petugas"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-400" style={{ fontSize: "0.9rem" }}>Tidak ada laporan ditemukan.</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLaporan && (
        <Modal onClose={() => setSelectedLaporan(null)}>
          {(() => {
            const l = laporanList.find((x) => x.id === selectedLaporan)!;
            const pelapor = getUser(l.user_id);
            const kategori = getKategori(l.kategori_id);
            const wilayah = getWilayah(l.wilayah_id);
            return (
              <div>
                <h3 className="text-sky-800 mb-4" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Detail Laporan #{l.id}</h3>
                <div className="space-y-3" style={{ fontSize: "0.85rem" }}>
                  <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Pelapor:</span><span className="text-slate-800">{pelapor?.nama}</span></div>
                  <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Kategori:</span><span className="text-slate-800">{kategori?.nama}</span></div>
                  <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Wilayah:</span><span className="text-slate-800">{wilayah?.nama}, {wilayah?.kecamatan}</span></div>
                  <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Tanggal:</span><span className="text-slate-800">{l.tgl_lapor}</span></div>
                  <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Status:</span><StatusBadge status={l.status} /></div>
                  <div><span className="text-slate-500">Deskripsi:</span><p className="text-slate-800 mt-1 bg-sky-50 p-3 rounded-lg">{l.deskripsi}</p></div>
                  {l.rating && (
                    <div className="flex gap-2"><span className="text-slate-500 w-28 shrink-0">Rating:</span>
                      <span className="text-amber-500">{"★".repeat(l.rating)}{"☆".repeat(5 - l.rating)}</span>
                    </div>
                  )}
                  {l.ulasan && (
                    <div><span className="text-slate-500">Ulasan:</span><p className="text-slate-700 mt-1 italic">"{l.ulasan}"</p></div>
                  )}
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <Modal onClose={() => setShowAssignModal(null)}>
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1.1rem", fontWeight: 600 }}>Tugaskan Petugas</h3>
          <p className="text-slate-500 mb-4" style={{ fontSize: "0.85rem" }}>Pilih petugas lapangan untuk menangani laporan #{showAssignModal}</p>
          <div className="space-y-2">
            {petugasList.map((p) => (
              <button
                key={p.id}
                onClick={() => setShowAssignModal(null)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-sky-200 hover:bg-sky-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 600 }}>
                  {p.nama.charAt(0)}
                </div>
                <div>
                  <p className="text-sky-800" style={{ fontSize: "0.9rem", fontWeight: 500 }}>{p.nama}</p>
                  <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>{p.email}</p>
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
