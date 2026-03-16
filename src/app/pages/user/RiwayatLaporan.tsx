import { useState } from "react";
import { laporanList, kategoriList, Laporan } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { StatusBadge } from "../admin/Dashboard";
import { MapDisplay } from "../../components/MapView";
import {
  Star, Clock, ChevronDown, ChevronUp, MapPin, Home, Navigation,
  CheckCircle2, XCircle, MessageSquare, AlertTriangle, ThumbsUp, ThumbsDown,
} from "lucide-react";

export function RiwayatLaporan() {
  const { user } = useAuth();
  const [data, setData] = useState<Laporan[]>([...laporanList]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<number | null>(null);
  const [showRatingModal, setShowRatingModal] = useState<number | null>(null);

  // In real app, filter by user. For demo show relevant ones
  const myLaporan = data.filter(() => true);

  const getKategori = (id: number) => kategoriList.find((k) => k.id === id);

  const handleConfirmSelesai = (id: number, rating: number, ulasan: string) => {
    setData(data.map(l => l.id === id ? { ...l, status: "Selesai" as const, rating, ulasan } : l));
    setShowConfirmModal(null);
  };

  const handleBelumSelesai = (id: number, feedback: string) => {
    setData(data.map(l => l.id === id ? { ...l, status: "Belum Selesai" as const, feedback_pelanggan: feedback } : l));
    setShowConfirmModal(null);
  };

  const handleRating = (id: number, rating: number, ulasan: string) => {
    setData(data.map(l => l.id === id ? { ...l, rating, ulasan } : l));
    setShowRatingModal(null);
  };

  const statusSteps = ["Menunggu Validasi", "Divalidasi", "Ditugaskan", "Sedang Dikerjakan", "Menunggu Konfirmasi", "Selesai"];
  const getStepIndex = (status: string) => {
    const idx = statusSteps.indexOf(status);
    if (status === "Menuju Lokasi") return 3;
    if (status === "Belum Selesai") return 4;
    return idx >= 0 ? idx : -1;
  };

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Riwayat Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>
        Pantau status laporan Anda. Konfirmasi penyelesaian dan berikan feedback.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: myLaporan.length, color: "bg-sky-50 text-sky-700" },
          { label: "Menunggu", value: myLaporan.filter(l => ["Menunggu Validasi", "Divalidasi", "Ditugaskan"].includes(l.status)).length, color: "bg-amber-50 text-amber-700" },
          { label: "Perlu Konfirmasi", value: myLaporan.filter(l => l.status === "Menunggu Konfirmasi").length, color: "bg-cyan-50 text-cyan-700" },
          { label: "Selesai", value: myLaporan.filter(l => l.status === "Selesai").length, color: "bg-emerald-50 text-emerald-700" },
        ].map((s, i) => (
          <div key={i} className={`${s.color} rounded-xl p-4 border border-sky-100`}>
            <p className="opacity-70" style={{ fontSize: "0.78rem" }}>{s.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Needs confirmation banner */}
      {myLaporan.filter(l => l.status === "Menunggu Konfirmasi").length > 0 && (
        <div className="bg-gradient-to-r from-cyan-50 to-sky-50 border-2 border-cyan-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-cyan-600 shrink-0" />
          <div>
            <p className="text-cyan-800" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              Ada {myLaporan.filter(l => l.status === "Menunggu Konfirmasi").length} laporan menunggu konfirmasi Anda!
            </p>
            <p className="text-cyan-600" style={{ fontSize: "0.8rem" }}>
              Petugas sudah menyelesaikan pekerjaan. Silakan konfirmasi apakah masalah sudah teratasi.
            </p>
          </div>
        </div>
      )}

      {/* Laporan list */}
      <div className="space-y-4">
        {myLaporan.map((l) => {
          const kategori = getKategori(l.kategori_id);
          const expanded = expandedId === l.id;
          const needsConfirm = l.status === "Menunggu Konfirmasi";
          const stepIdx = getStepIndex(l.status);

          return (
            <div
              key={l.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                needsConfirm ? "border-cyan-300 ring-1 ring-cyan-200" : "border-sky-100"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(expanded ? null : l.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-sky-50/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${needsConfirm ? "bg-cyan-100" : "bg-sky-100"}`} style={{ fontSize: "1.2rem" }}>
                      {kategori?.icon}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sky-600" style={{ fontWeight: 700, fontSize: "0.83rem" }}>#{l.id}</span>
                      <span className="text-sky-800" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{kategori?.nama}</span>
                      {needsConfirm && (
                        <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full animate-pulse" style={{ fontSize: "0.68rem", fontWeight: 700 }}>
                          KONFIRMASI
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      <p className="text-slate-500 truncate" style={{ fontSize: "0.78rem" }}>{l.alamat_lengkap} No. {l.no_rumah}, {l.kelurahan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-slate-400" style={{ fontSize: "0.78rem" }}>
                      <Clock className="w-3.5 h-3.5" /> {l.tgl_lapor}
                    </div>
                    <StatusBadge status={l.status} />
                    {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {expanded && (
                <div className="px-5 pb-5 border-t border-sky-50">
                  {/* Address details */}
                  <div className="bg-sky-50 rounded-xl p-4 mt-4">
                    <p className="text-sky-700 mb-2 flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      <Home className="w-4 h-4" /> Detail Alamat Rumah
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-slate-700" style={{ fontSize: "0.83rem" }}>
                      <div><span className="text-slate-400">Alamat: </span>{l.alamat_lengkap} No. {l.no_rumah}</div>
                      <div><span className="text-slate-400">RT/RW: </span>{l.rt_rw}</div>
                      <div><span className="text-slate-400">Kelurahan: </span>{l.kelurahan}</div>
                      <div><span className="text-slate-400">Kecamatan: </span>{l.kecamatan}</div>
                    </div>
                    <p className="text-slate-400 mt-2 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                      <Navigation className="w-3 h-3" /> {l.koordinat.lat.toFixed(6)}, {l.koordinat.lng.toFixed(6)}
                    </p>
                  </div>

                  {/* Map */}
                  <div className="mt-3">
                    <MapDisplay lat={l.koordinat.lat} lng={l.koordinat.lng} label={`${l.alamat_lengkap} No. ${l.no_rumah}`} height="180px" />
                  </div>

                  {/* Description */}
                  <div className="mt-4" style={{ fontSize: "0.85rem" }}>
                    <p className="text-slate-500 mb-1" style={{ fontWeight: 600 }}>Deskripsi Masalah:</p>
                    <p className="text-slate-800 bg-sky-50 p-3 rounded-lg">{l.deskripsi}</p>
                  </div>

                  {/* Validasi info */}
                  {l.catatan_validasi && (
                    <div className="mt-3 bg-blue-50 rounded-xl p-3 border border-blue-100" style={{ fontSize: "0.83rem" }}>
                      <p className="text-blue-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
                        <CheckCircle2 className="w-4 h-4" /> Catatan Admin
                      </p>
                      <p className="text-slate-700">{l.catatan_validasi}</p>
                      {l.perlu_turun_lapangan !== null && (
                        <p className="text-blue-600 mt-1" style={{ fontSize: "0.78rem" }}>
                          {l.perlu_turun_lapangan ? "→ Petugas akan datang ke lokasi" : "→ Ditangani tanpa kunjungan lapangan"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Status progress bar */}
                  {l.status !== "Ditolak" && (
                    <div className="mt-4">
                      <p className="text-slate-500 mb-2" style={{ fontSize: "0.83rem", fontWeight: 600 }}>Progress:</p>
                      <div className="flex items-center gap-1">
                        {statusSteps.map((s, i) => (
                          <div key={s} className="flex-1">
                            <div className={`h-2 rounded-full ${i <= stepIdx ? "bg-sky-500" : "bg-sky-100"}`} />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1">
                        {["Validasi", "Divalidasi", "Ditugaskan", "Dikerjakan", "Konfirmasi", "Selesai"].map((s) => (
                          <span key={s} className="text-slate-400" style={{ fontSize: "0.58rem" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rejected info */}
                  {l.status === "Ditolak" && (
                    <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-100" style={{ fontSize: "0.85rem" }}>
                      <p className="text-red-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
                        <XCircle className="w-4 h-4" /> Laporan Ditolak
                      </p>
                      <p className="text-slate-700">{l.catatan_validasi}</p>
                    </div>
                  )}

                  {/* Feedback pelanggan (Belum Selesai) */}
                  {l.feedback_pelanggan && (
                    <div className="mt-4 bg-orange-50 rounded-xl p-4 border border-orange-100" style={{ fontSize: "0.85rem" }}>
                      <p className="text-orange-700 mb-1 flex items-center gap-2" style={{ fontWeight: 600 }}>
                        <MessageSquare className="w-4 h-4" /> Feedback Anda (Belum Selesai)
                      </p>
                      <p className="text-slate-700">{l.feedback_pelanggan}</p>
                      <p className="text-orange-500 mt-1" style={{ fontSize: "0.78rem" }}>Laporan akan ditinjau ulang oleh Admin.</p>
                    </div>
                  )}

                  {/* CONFIRM / REJECT BUTTONS for Menunggu Konfirmasi */}
                  {l.status === "Menunggu Konfirmasi" && (
                    <div className="mt-4 bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl p-5 border-2 border-cyan-200">
                      <p className="text-cyan-800 mb-1" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                        Konfirmasi Penyelesaian
                      </p>
                      <p className="text-slate-600 mb-4" style={{ fontSize: "0.83rem" }}>
                        Petugas sudah menyelesaikan pekerjaan. Apakah masalah Anda sudah teratasi?
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowConfirmModal(l.id)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <ThumbsUp className="w-5 h-5" /> Ya, Sudah Selesai
                        </button>
                        <button
                          onClick={() => setShowConfirmModal(-(l.id))}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <ThumbsDown className="w-5 h-5" /> Belum Selesai
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rating for completed without rating */}
                  {l.status === "Selesai" && !l.rating && (
                    <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                      <p className="text-amber-800 mb-2 flex items-center gap-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        <Star className="w-5 h-5" /> Beri Rating Pelayanan
                      </p>
                      <p className="text-slate-500 mb-3" style={{ fontSize: "0.83rem" }}>Bagaimana pelayanan petugas? Ulasan Anda membantu kami meningkatkan kualitas.</p>
                      <button
                        onClick={() => setShowRatingModal(l.id)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg transition-colors"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Beri Rating & Ulasan
                      </button>
                    </div>
                  )}

                  {/* Existing rating */}
                  {l.rating && (
                    <div className="mt-4 bg-emerald-50 rounded-xl p-4 border border-emerald-100" style={{ fontSize: "0.85rem" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-500" style={{ fontSize: "1.1rem" }}>{"★".repeat(l.rating)}{"☆".repeat(5 - l.rating)}</span>
                        <span className="text-slate-400" style={{ fontSize: "0.78rem" }}>({l.rating}/5)</span>
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

      {/* Confirm Modal (Selesai) */}
      {showConfirmModal && showConfirmModal > 0 && (
        <ConfirmSelesaiModal
          laporanId={showConfirmModal}
          onConfirm={handleConfirmSelesai}
          onClose={() => setShowConfirmModal(null)}
        />
      )}

      {/* Confirm Modal (Belum Selesai) */}
      {showConfirmModal && showConfirmModal < 0 && (
        <BelumSelesaiModal
          laporanId={-showConfirmModal}
          onSubmit={handleBelumSelesai}
          onClose={() => setShowConfirmModal(null)}
        />
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          laporanId={showRatingModal}
          onSubmit={handleRating}
          onClose={() => setShowRatingModal(null)}
        />
      )}
    </div>
  );
}

// ==========================================
// MODALS
// ==========================================

function ConfirmSelesaiModal({ laporanId, onConfirm, onClose }: {
  laporanId: number;
  onConfirm: (id: number, rating: number, ulasan: string) => void;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <ThumbsUp className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-sky-800" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Konfirmasi Selesai</h3>
          <p className="text-slate-500 mt-1" style={{ fontSize: "0.83rem" }}>Masalah di laporan #{laporanId} sudah teratasi</p>
        </div>

        {/* Rating stars */}
        <div className="text-center mb-4">
          <p className="text-sky-800 mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Beri Rating Pelayanan</p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-110"
                style={{ fontSize: "2rem", color: s <= (hoverRating || rating) ? "#f59e0b" : "#d1d5db" }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-amber-600 mt-1" style={{ fontSize: "0.78rem" }}>
              {["", "Sangat Buruk", "Buruk", "Cukup", "Baik", "Sangat Baik"][rating]}
            </p>
          )}
        </div>

        {/* Ulasan */}
        <div className="mb-4">
          <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>Ulasan (opsional)</label>
          <textarea
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            placeholder="Bagikan pengalaman Anda..."
            className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-20 resize-none"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => rating > 0 && onConfirm(laporanId, rating, ulasan)}
            disabled={rating === 0}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              rating > 0
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            style={{ fontSize: "0.85rem" }}
          >
            Konfirmasi Selesai
          </button>
          <button onClick={onClose} className="flex-1 border border-sky-200 text-sky-700 py-3 rounded-xl hover:bg-sky-50 transition-colors" style={{ fontSize: "0.85rem" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

function BelumSelesaiModal({ laporanId, onSubmit, onClose }: {
  laporanId: number;
  onSubmit: (id: number, feedback: string) => void;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <ThumbsDown className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-sky-800" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Masalah Belum Selesai</h3>
          <p className="text-slate-500 mt-1" style={{ fontSize: "0.83rem" }}>Beritahu kami apa yang masih bermasalah</p>
        </div>

        <div className="mb-4">
          <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.83rem", fontWeight: 600 }}>Feedback / Alasan *</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Jelaskan kenapa masalah belum teratasi. Contoh: Pipa masih bocor di bagian lain, air masih keruh, petugas belum memasang dengan benar..."
            className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-28 resize-none"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-100" style={{ fontSize: "0.78rem" }}>
          <p className="text-orange-700">
            <strong>Info:</strong> Laporan akan dikirim kembali ke Admin untuk ditinjau ulang. Admin dapat menugaskan petugas lagi atau menghubungi Anda.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => feedback.trim() && onSubmit(laporanId, feedback)}
            disabled={!feedback.trim()}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              feedback.trim()
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            style={{ fontSize: "0.85rem" }}
          >
            Kirim Feedback
          </button>
          <button onClick={onClose} className="flex-1 border border-sky-200 text-sky-700 py-3 rounded-xl hover:bg-sky-50 transition-colors" style={{ fontSize: "0.85rem" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingModal({ laporanId, onSubmit, onClose }: {
  laporanId: number;
  onSubmit: (id: number, rating: number, ulasan: string) => void;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-sky-800 mb-4 text-center" style={{ fontSize: "1.15rem", fontWeight: 700 }}>Rating & Ulasan</h3>
        <div className="text-center mb-4">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-110"
                style={{ fontSize: "2rem", color: s <= (hoverRating || rating) ? "#f59e0b" : "#d1d5db" }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={ulasan}
          onChange={(e) => setUlasan(e.target.value)}
          placeholder="Tulis ulasan..."
          className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-20 resize-none mb-4"
          style={{ fontSize: "0.85rem" }}
        />
        <div className="flex gap-2">
          <button
            onClick={() => rating > 0 && onSubmit(laporanId, rating, ulasan)}
            disabled={rating === 0}
            className={`flex-1 py-3 rounded-xl ${rating > 0 ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
            style={{ fontSize: "0.85rem" }}
          >
            Kirim Rating
          </button>
          <button onClick={onClose} className="flex-1 border border-sky-200 text-sky-700 py-3 rounded-xl hover:bg-sky-50" style={{ fontSize: "0.85rem" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
