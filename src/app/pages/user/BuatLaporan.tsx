import { useState } from "react";
import { kategoriList, wilayahList } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { Send, Upload, CheckCircle2 } from "lucide-react";

export function BuatLaporan() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    kategori_id: "",
    wilayah_id: "",
    deskripsi: "",
    foto: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kategori_id || !form.wilayah_id || !form.deskripsi) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-sky-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Laporan Terkirim!</h2>
          <p className="text-slate-500 mb-6" style={{ fontSize: "0.9rem" }}>
            Laporan Anda telah diterima dan akan segera ditinjau oleh Admin.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ kategori_id: "", wilayah_id: "", deskripsi: "", foto: null }); }}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl transition-colors"
            style={{ fontSize: "0.9rem" }}
          >
            Buat Laporan Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Buat Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporkan masalah infrastruktur air di wilayah Anda</p>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm space-y-5">
          <div>
            <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.85rem" }}>Kategori Masalah *</label>
            <select
              value={form.kategori_id}
              onChange={(e) => setForm({ ...form, kategori_id: e.target.value })}
              className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
              style={{ fontSize: "0.85rem" }}
              required
            >
              <option value="">Pilih kategori...</option>
              {kategoriList.map((k) => (
                <option key={k.id} value={k.id}>{k.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.85rem" }}>Wilayah *</label>
            <select
              value={form.wilayah_id}
              onChange={(e) => setForm({ ...form, wilayah_id: e.target.value })}
              className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
              style={{ fontSize: "0.85rem" }}
              required
            >
              <option value="">Pilih wilayah...</option>
              {wilayahList.map((w) => (
                <option key={w.id} value={w.id}>{w.nama} - {w.kecamatan}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.85rem" }}>Deskripsi Masalah *</label>
            <textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              placeholder="Jelaskan masalah yang Anda temukan secara detail..."
              className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-32 resize-none"
              style={{ fontSize: "0.85rem" }}
              required
            />
          </div>

          <div>
            <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.85rem" }}>Foto Bukti (opsional)</label>
            <label className="border-2 border-dashed border-sky-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition-colors">
              <Upload className="w-8 h-8 text-sky-400 mb-2" />
              <span className="text-sky-600" style={{ fontSize: "0.85rem" }}>
                {form.foto ? form.foto.name : "Klik untuk upload foto"}
              </span>
              <span className="text-slate-400 mt-1" style={{ fontSize: "0.75rem" }}>Maks. 5MB (JPG, PNG)</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setForm({ ...form, foto: e.target.files?.[0] || null })} />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-200"
          >
            <Send className="w-4 h-4" /> Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
}
