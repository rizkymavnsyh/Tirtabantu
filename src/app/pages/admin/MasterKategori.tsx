import { useState } from "react";
import { kategoriList, KategoriLaporan } from "../../data/mockData";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

export function MasterKategori() {
  const [data, setData] = useState<KategoriLaporan[]>([...kategoriList]);
  const [editing, setEditing] = useState<KategoriLaporan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nama: "", deskripsi: "", tarif: 0, keterangan_tarif: "" });

  const handleSave = () => {
    if (!form.nama) return;
    if (editing) {
      setData(data.map((k) => k.id === editing.id ? { ...k, ...form } : k));
    } else {
      setData([...data, { id: Date.now(), icon: "\uD83D\uDCCB", ...form }]);
    }
    resetForm();
  };

  const resetForm = () => { setForm({ nama: "", deskripsi: "", tarif: 0, keterangan_tarif: "" }); setEditing(null); setShowForm(false); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Master Kategori Laporan</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Kelola jenis-jenis laporan masalah air</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ nama: "", deskripsi: "", tarif: 0, keterangan_tarif: "" }); }}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          style={{ fontSize: "0.85rem" }}
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm mb-6">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>{editing ? "Edit" : "Tambah"} Kategori</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Nama Kategori</label>
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.85rem" }} />
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Deskripsi</label>
              <textarea value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-20 resize-none" style={{ fontSize: "0.85rem" }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Tarif (Rp)</label>
                <input type="number" value={form.tarif} onChange={(e) => setForm({ ...form, tarif: Number(e.target.value) })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.85rem" }} placeholder="0 = Gratis" />
              </div>
              <div>
                <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Keterangan Tarif</label>
                <input value={form.keterangan_tarif} onChange={(e) => setForm({ ...form, keterangan_tarif: e.target.value })} className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" style={{ fontSize: "0.85rem" }} placeholder="Penjelasan biaya" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>Simpan</button>
            <button onClick={resetForm} className="border border-sky-200 text-sky-700 px-5 py-2 rounded-lg hover:bg-sky-50 transition-colors" style={{ fontSize: "0.85rem" }}>Batal</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((k) => (
          <div key={k.id} className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mb-3" style={{ fontSize: "1.3rem" }}>
                {k.icon}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(k); setForm({ nama: k.nama, deskripsi: k.deskripsi, tarif: k.tarif, keterangan_tarif: k.keterangan_tarif }); setShowForm(true); }} className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setData(data.filter((x) => x.id !== k.id))} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-sky-800 mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{k.nama}</h3>
            <p className="text-slate-500 mb-3" style={{ fontSize: "0.8rem" }}>{k.deskripsi}</p>
            <div className={`rounded-lg p-2.5 ${k.tarif === 0 ? "bg-emerald-50" : "bg-sky-50"}`}>
              <div className="flex items-center justify-between">
                <span className="text-slate-500" style={{ fontSize: "0.75rem" }}>Tarif</span>
                {k.tarif === 0 ? (
                  <span className="text-emerald-700" style={{ fontSize: "0.85rem", fontWeight: 700 }}>GRATIS</span>
                ) : (
                  <span className="text-sky-800" style={{ fontSize: "0.85rem", fontWeight: 700 }}>Rp {k.tarif.toLocaleString("id-ID")}</span>
                )}
              </div>
              {k.keterangan_tarif && (
                <p className="text-slate-500 mt-1" style={{ fontSize: "0.72rem" }}>{k.keterangan_tarif}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}