import { useState } from "react";
import { laporanList, kategoriList, userList, Laporan } from "../../data/mockData";
import { StatusBadge } from "./Dashboard";
import { MapDisplay } from "../../components/MapView";
import {
  Search, UserPlus, Eye, X, CheckCircle, XCircle, MapPin, Navigation, Clock,
  AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown,
} from "lucide-react";

export function Reports() {
  const [data, setData] = useState<Laporan[]>([...laporanList]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterKategori, setFilterKategori] = useState("semua");
  const [filterTurun, setFilterTurun] = useState("semua");
  const [selectedLaporan, setSelectedLaporan] = useState<number | null>(null);
  const [showValidasiModal, setShowValidasiModal] = useState<number | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<number | null>(null);

  const filtered = data.filter((l) => {
    const matchSearch =
      l.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      l.alamat_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      l.kelurahan.toLowerCase().includes(search.toLowerCase()) ||
      l.kecamatan.toLowerCase().includes(search.toLowerCase()) ||
      String(l.id).includes(search);
    const matchStatus = filterStatus === "semua" || l.status === filterStatus;
    const matchKategori = filterKategori === "semua" || l.kategori_id === Number(filterKategori);
    const matchTurun =
      filterTurun === "semua" ||
      (filterTurun === "ya" && l.perlu_turun_lapangan === true) ||
      (filterTurun === "tidak" && l.perlu_turun_lapangan === false) ||
      (filterTurun === "belum" && l.perlu_turun_lapangan === null);
    return matchSearch && matchStatus && matchKategori && matchTurun;
  });

  const getUser = (id: number) => userList.find((u) => u.id === id);
  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);
  const petugasList = userList.filter((u) => u.role === "petugas");

  const handleValidasi = (id: number, perluTurun: boolean, catatan: string) => {
    setData(data.map((l) =>
      l.id === id
        ? {
            ...l,
            perlu_turun_lapangan: perluTurun,
            catatan_validasi: catatan,
            status: perluTurun ? "Divalidasi" : "Divalidasi",
          }
        : l
    ));
    setShowValidasiModal(null);
  };

  const handleTolak = (id: number, catatan: string) => {
    setData(data.map((l) =>
      l.id === id ? { ...l, status: "Ditolak" as const, catatan_validasi: catatan, perlu_turun_lapangan: false } : l
    ));
    setShowValidasiModal(null);
  };

  const handleAssign = (laporanId: number, petugasId: number) => {
    setData(data.map((l) =>
      l.id === laporanId ? { ...l, status: "Ditugaskan" as const } : l
    ));
    setShowAssignModal(null);
  };

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Kelola Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Validasi, tinjau kebutuhan turun lapangan, dan kelola seluruh laporan</p>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID, alamat, deskripsi..."
              className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
              style={{ fontSize: "0.83rem" }}
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.83rem" }}>
            <option value="semua">Semua Status</option>
            {["Menunggu Validasi", "Divalidasi", "Ditugaskan", "Menuju Lokasi", "Sedang Dikerjakan", "Menunggu Konfirmasi", "Selesai", "Belum Selesai", "Ditolak"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.83rem" }}>
            <option value="semua">Semua Kategori</option>
            {kategoriList.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
          </select>
          <select value={filterTurun} onChange={(e) => setFilterTurun(e.target.value)} className="border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 text-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.83rem" }}>
            <option value="semua">Turun Lapangan</option>
            <option value="ya">Perlu Turun</option>
            <option value="tidak">Tidak Perlu</option>
            <option value="belum">Belum Divalidasi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.83rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">ID</th>
              <th className="p-4">Pelapor</th>
              <th className="p-4">Alamat Rumah</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Turun?</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const pelapor = getUser(l.user_id);
              const kategori = getKategori(l.kategori_id);
              return (
                <tr key={l.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                  <td className="p-4 text-sky-600" style={{ fontWeight: 600 }}>#{l.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="text-slate-700">{pelapor?.nama}</p>
                      <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>{pelapor?.telepon}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-1.5 max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-700 truncate">{l.alamat_lengkap} No. {l.no_rumah}</p>
                        <p className="text-slate-400" style={{ fontSize: "0.72rem" }}>{l.rt_rw}, {l.kelurahan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{kategori?.icon} {kategori?.nama}</td>
                  <td className="p-4 text-slate-500">{l.tgl_lapor}</td>
                  <td className="p-4">
                    {l.perlu_turun_lapangan === null ? (
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>Belum</span>
                    ) : l.perlu_turun_lapangan ? (
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit" style={{ fontSize: "0.7rem" }}>
                        <Navigation className="w-3 h-3" /> Ya
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full" style={{ fontSize: "0.7rem" }}>Tidak</span>
                    )}
                  </td>
                  <td className="p-4"><StatusBadge status={l.status} /></td>
                  <td className="p-4">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelectedLaporan(l.id)} className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg transition-colors" title="Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                      {l.status === "Menunggu Validasi" && (
                        <button onClick={() => setShowValidasiModal(l.id)} className="text-emerald-600 hover:bg-emerald-100 p-1.5 rounded-lg transition-colors" title="Validasi">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {l.status === "Belum Selesai" && (
                        <button onClick={() => setShowValidasiModal(l.id)} className="text-orange-600 hover:bg-orange-100 p-1.5 rounded-lg transition-colors" title="Tinjau Ulang">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
                      {(l.status === "Divalidasi" && l.perlu_turun_lapangan) && (
                        <button onClick={() => setShowAssignModal(l.id)} className="text-violet-600 hover:bg-violet-100 p-1.5 rounded-lg transition-colors" title="Tugaskan">
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
      {selectedLaporan && (() => {
        const l = data.find((x) => x.id === selectedLaporan)!;
        const pelapor = getUser(l.user_id);
        const kategori = getKategori(l.kategori_id);
        return (
          <Modal onClose={() => setSelectedLaporan(null)} title={`Detail Laporan #${l.id}`}>
            <div className="space-y-4" style={{ fontSize: "0.85rem" }}>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={l.status} />
                {l.perlu_turun_lapangan === true && (
                  <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full flex items-center gap-1" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                    <Navigation className="w-3 h-3" /> Perlu Turun Lapangan
                  </span>
                )}
                {l.perlu_turun_lapangan === false && l.status !== "Ditolak" && (
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                    Tidak Perlu Turun
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InfoRow label="Pelapor" value={pelapor?.nama || ""} />
                <InfoRow label="Telepon" value={pelapor?.telepon || ""} />
                <InfoRow label="Kategori" value={`${kategori?.icon} ${kategori?.nama}`} />
                <InfoRow label="Tanggal Lapor" value={l.tgl_lapor} />
                <InfoRow label="Tarif Dasar" value={kategori ? (kategori.tarif === 0 ? "GRATIS" : `Rp ${kategori.tarif.toLocaleString("id-ID")}`) : "-"} />
              </div>

              {/* Alamat rumah */}
              <div className="bg-sky-50 rounded-xl p-4">
                <p className="text-sky-700 mb-2 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <MapPin className="w-4 h-4" /> Alamat Rumah
                </p>
                <p className="text-slate-800">{l.alamat_lengkap} No. {l.no_rumah}</p>
                <p className="text-slate-600">{l.rt_rw}, Kel. {l.kelurahan}, Kec. {l.kecamatan}</p>
                <p className="text-slate-400 mt-1" style={{ fontSize: "0.78rem" }}>
                  Koordinat: {l.koordinat.lat.toFixed(6)}, {l.koordinat.lng.toFixed(6)}
                </p>
              </div>

              {/* Map */}
              <MapDisplay lat={l.koordinat.lat} lng={l.koordinat.lng} label={`${l.alamat_lengkap} No. ${l.no_rumah}`} height="200px" />

              {/* Deskripsi */}
              <div>
                <p className="text-slate-500 mb-1" style={{ fontWeight: 600 }}>Deskripsi Masalah:</p>
                <p className="text-slate-800 bg-sky-50 p-3 rounded-lg">{l.deskripsi}</p>
              </div>

              {/* Catatan validasi */}
              {l.catatan_validasi && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-blue-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <CheckCircle className="w-4 h-4" /> Catatan Validasi Admin
                  </p>
                  <p className="text-slate-700">{l.catatan_validasi}</p>
                </div>
              )}

              {/* Feedback pelanggan */}
              {l.feedback_pelanggan && (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-orange-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <MessageSquare className="w-4 h-4" /> Feedback Pelanggan (Belum Selesai)
                  </p>
                  <p className="text-slate-700">{l.feedback_pelanggan}</p>
                </div>
              )}

              {/* Rating */}
              {l.rating && (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-500" style={{ fontSize: "1.1rem" }}>{"★".repeat(l.rating)}{"☆".repeat(5 - l.rating)}</span>
                    <span className="text-slate-500" style={{ fontSize: "0.8rem" }}>({l.rating}/5)</span>
                  </div>
                  {l.ulasan && <p className="text-slate-600 italic">"{l.ulasan}"</p>}
                </div>
              )}
            </div>
          </Modal>
        );
      })()}

      {/* Validasi Modal */}
      {showValidasiModal && <ValidasiModal
        laporan={data.find(l => l.id === showValidasiModal)!}
        onValidasi={handleValidasi}
        onTolak={handleTolak}
        onClose={() => setShowValidasiModal(null)}
      />}

      {/* Assign Modal */}
      {showAssignModal && (
        <Modal onClose={() => setShowAssignModal(null)} title="Tugaskan Petugas Lapangan">
          <p className="text-slate-500 mb-4" style={{ fontSize: "0.85rem" }}>
            Pilih petugas untuk menangani laporan #{showAssignModal}
          </p>
          {(() => {
            const l = data.find(x => x.id === showAssignModal)!;
            return (
              <div className="bg-sky-50 rounded-lg p-3 mb-4" style={{ fontSize: "0.83rem" }}>
                <p className="text-sky-700" style={{ fontWeight: 600 }}>Lokasi: {l.alamat_lengkap} No. {l.no_rumah}</p>
                <p className="text-slate-500">{l.rt_rw}, {l.kelurahan}, {l.kecamatan}</p>
              </div>
            );
          })()}
          <div className="space-y-2">
            {petugasList.map((p) => (
              <button
                key={p.id}
                onClick={() => handleAssign(showAssignModal, p.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all text-left"
              >
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 600 }}>
                  {p.nama.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sky-800" style={{ fontSize: "0.9rem", fontWeight: 500 }}>{p.nama}</p>
                  <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>{p.email} | {p.telepon}</p>
                </div>
                <UserPlus className="w-4 h-4 text-sky-400" />
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400" style={{ fontSize: "0.75rem" }}>{label}</p>
      <p className="text-slate-800">{value}</p>
    </div>
  );
}

// Validasi Modal - Admin decides if needs fieldwork or not
function ValidasiModal({
  laporan,
  onValidasi,
  onTolak,
  onClose,
}: {
  laporan: Laporan;
  onValidasi: (id: number, perluTurun: boolean, catatan: string) => void;
  onTolak: (id: number, catatan: string) => void;
  onClose: () => void;
}) {
  const [catatan, setCatatan] = useState(laporan.catatan_validasi || "");
  const kategori = kategoriList.find(k => k.id === laporan.kategori_id);

  return (
    <Modal onClose={onClose} title={`Validasi Laporan #${laporan.id}`}>
      <div className="space-y-4" style={{ fontSize: "0.85rem" }}>
        {/* Info laporan */}
        <div className="bg-sky-50 rounded-xl p-4">
          <p className="text-sky-700 mb-2" style={{ fontWeight: 600 }}>{kategori?.icon} {kategori?.nama}</p>
          <p className="text-slate-700 mb-2">{laporan.deskripsi}</p>
          <div className="flex items-center gap-1.5 text-slate-500" style={{ fontSize: "0.8rem" }}>
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            {laporan.alamat_lengkap} No. {laporan.no_rumah}, {laporan.rt_rw}, {laporan.kelurahan}
          </div>
        </div>

        {/* Map lokasi */}
        <MapDisplay lat={laporan.koordinat.lat} lng={laporan.koordinat.lng} label={laporan.alamat_lengkap} height="180px" />

        {/* Feedback pelanggan jika ada */}
        {laporan.feedback_pelanggan && (
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-orange-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
              <MessageSquare className="w-4 h-4" /> Feedback Sebelumnya
            </p>
            <p className="text-slate-700">{laporan.feedback_pelanggan}</p>
          </div>
        )}

        {/* Catatan validasi */}
        <div>
          <label className="text-sky-800 mb-1.5 block" style={{ fontWeight: 600 }}>Catatan Validasi *</label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Tulis catatan validasi (alasan perlu/tidak turun lapangan, atau alasan penolakan)..."
            className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-24 resize-none"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        {/* Decision buttons */}
        <div className="space-y-2">
          <p className="text-sky-800" style={{ fontWeight: 600 }}>Keputusan:</p>
          <button
            onClick={() => catatan && onValidasi(laporan.id, true, catatan)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Perlu Turun Lapangan
          </button>
          <button
            onClick={() => catatan && onValidasi(laporan.id, false, catatan)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Tidak Perlu Turun (Selesaikan Remote)
          </button>
          <button
            onClick={() => catatan && onTolak(laporan.id, catatan)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Tolak Laporan
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title?: string }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-sky-800" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{title}</h3>}
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}