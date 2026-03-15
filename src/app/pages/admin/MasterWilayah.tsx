import { useState } from "react";
import { wilayahList, Wilayah } from "../../data/mockData";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";

export function MasterWilayah() {
  const [data, setData] = useState<Wilayah[]>([...wilayahList]);
  const [editing, setEditing] = useState<Wilayah | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nama: "", kecamatan: "" });

  const handleSave = () => {
    if (!form.nama || !form.kecamatan) return;
    if (editing) {
      setData(data.map((w) => w.id === editing.id ? { ...w, ...form } : w));
    } else {
      setData([...data, { id: Date.now(), ...form }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ nama: "", kecamatan: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (w: Wilayah) => {
    setEditing(w);
    setForm({ nama: w.nama, kecamatan: w.kecamatan });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((w) => w.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Master Data Wilayah</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Kelola data kecamatan/kelurahan cakupan layanan</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ nama: "", kecamatan: "" }); }}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          style={{ fontSize: "0.85rem" }}
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm mb-6">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>
            {editing ? "Edit Wilayah" : "Tambah Wilayah Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Nama Desa/Kelurahan</label>
              <input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Kecamatan</label>
              <input
                value={form.kecamatan}
                onChange={(e) => setForm({ ...form, kecamatan: e.target.value })}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>
              Simpan
            </button>
            <button onClick={resetForm} className="border border-sky-200 text-sky-700 px-5 py-2 rounded-lg hover:bg-sky-50 transition-colors" style={{ fontSize: "0.85rem" }}>
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">ID</th>
              <th className="p-4">Nama Desa/Kelurahan</th>
              <th className="p-4">Kecamatan</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((w) => (
              <tr key={w.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                <td className="p-4 text-sky-600" style={{ fontWeight: 600 }}>{w.id}</td>
                <td className="p-4 text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-400" />{w.nama}</td>
                <td className="p-4 text-slate-600">{w.kecamatan}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(w)} className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(w.id)} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
