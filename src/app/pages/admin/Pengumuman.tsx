import { useState } from "react";
import { pengumumanList, Pengumuman } from "../../data/mockData";
import { Plus, Pencil, Trash2, Megaphone, AlertTriangle } from "lucide-react";

export function PengumumanAdmin() {
  const [data, setData] = useState<Pengumuman[]>([...pengumumanList]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ judul: "", isi: "", penting: false });

  const handleSave = () => {
    if (!form.judul || !form.isi) return;
    setData([{ id: Date.now(), tgl_posting: "2026-03-14", ...form }, ...data]);
    setForm({ judul: "", isi: "", penting: false });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Pengumuman</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Kelola info gangguan distribusi air</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors" style={{ fontSize: "0.85rem" }}>
          <Plus className="w-4 h-4" /> Buat Pengumuman
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm mb-6">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Buat Pengumuman Baru</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Judul</label>
              <input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.85rem" }} />
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Isi Pengumuman</label>
              <textarea value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-24 resize-none" style={{ fontSize: "0.85rem" }} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.85rem" }}>
              <input type="checkbox" checked={form.penting} onChange={(e) => setForm({ ...form, penting: e.target.checked })} className="w-4 h-4 accent-sky-600" />
              <span className="text-sky-800">Tandai sebagai penting</span>
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>Publikasikan</button>
            <button onClick={() => setShowForm(false)} className="border border-sky-200 text-sky-700 px-5 py-2 rounded-lg hover:bg-sky-50 transition-colors" style={{ fontSize: "0.85rem" }}>Batal</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="w-5 h-5 text-sky-500" />
                {p.penting && (
                  <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded flex items-center gap-1" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                    <AlertTriangle className="w-3 h-3" /> PENTING
                  </span>
                )}
                <span className="text-slate-400" style={{ fontSize: "0.8rem" }}>{p.tgl_posting}</span>
              </div>
              <div className="flex gap-1">
                <button className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setData(data.filter((x) => x.id !== p.id))} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-sky-800 mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{p.judul}</h3>
            <p className="text-slate-600" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{p.isi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
