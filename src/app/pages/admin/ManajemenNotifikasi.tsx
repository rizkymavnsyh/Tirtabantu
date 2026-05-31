import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { SystemNotification } from "../../context/AuthContext";
import { Bell, Plus, Pencil, Trash2, ShieldAlert, Users, Info, Siren } from "lucide-react";

export function ManajemenNotifikasi() {
  const { allSystemNotifications, addSystemNotification, updateSystemNotification, deleteSystemNotification } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", message: "", targetRole: "all" as SystemNotification["targetRole"], type: "info" as SystemNotification["type"], link: "" });

  const resetForm = () => {
    setForm({ title: "", message: "", targetRole: "all", type: "info", link: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.title || !form.message) return;
    
    if (editId) {
      updateSystemNotification(editId, form);
    } else {
      addSystemNotification({
        title: form.title,
        message: form.message,
        targetRole: form.targetRole,
        type: form.type,
        link: form.link || undefined
      });
    }
    
    resetForm();
  };

  const handleEdit = (notif: SystemNotification) => {
    setForm({
      title: notif.title,
      message: notif.message,
      targetRole: notif.targetRole,
      type: notif.type,
      link: notif.link || ""
    });
    setEditId(notif.id);
    setShowForm(true);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "system": return <ShieldAlert className="w-4 h-4" />;
      case "payment_needed":
      case "payment_proof": return <Siren className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "system": return "bg-purple-100 text-purple-700";
      case "payment_needed": return "bg-orange-100 text-orange-700";
      case "payment_proof": return "bg-emerald-100 text-emerald-700";
      case "new_task": return "bg-sky-100 text-sky-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Manajemen Notifikasi</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Kirim dan kelola notifikasi sistem (push notification) ke pengguna</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(!showForm); }} 
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors" 
          style={{ fontSize: "0.85rem" }}
        >
          <Plus className="w-4 h-4" /> Buat Notifikasi
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-5 border border-sky-100 shadow-sm mb-6 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-sky-800 mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <Bell className="w-4 h-4 text-sky-600" />
            {editId ? "Edit Notifikasi" : "Buat Notifikasi Baru"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sky-800 mb-1 block font-medium" style={{ fontSize: "0.85rem" }}>Judul Notifikasi</label>
              <input 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                placeholder="Contoh: Pemeliharaan Server"
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" 
                style={{ fontSize: "0.85rem" }} 
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sky-800 mb-1 block font-medium" style={{ fontSize: "0.85rem" }}>Pesan</label>
              <textarea 
                value={form.message} 
                onChange={(e) => setForm({ ...form, message: e.target.value })} 
                placeholder="Tulis detail notifikasi..."
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-24 resize-none" 
                style={{ fontSize: "0.85rem" }} 
              />
            </div>

            <div>
              <label className="text-sky-800 mb-1 block font-medium" style={{ fontSize: "0.85rem" }}>Target Pengguna</label>
              <select 
                value={form.targetRole}
                onChange={(e) => setForm({ ...form, targetRole: e.target.value as any })}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              >
                <option value="all">Semua Pengguna</option>
                <option value="admin">Hanya Admin</option>
                <option value="petugas">Hanya Petugas Lapangan</option>
                <option value="masyarakat">Hanya Masyarakat</option>
              </select>
            </div>

            <div>
              <label className="text-sky-800 mb-1 block font-medium" style={{ fontSize: "0.85rem" }}>Tipe (Icon & Warna)</label>
              <select 
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              >
                <option value="info">Informasi Biasa</option>
                <option value="system">Peringatan Sistem</option>
                <option value="new_task">Tugas Baru</option>
                <option value="payment_needed">Tagihan / Peringatan</option>
                <option value="payment_proof">Bukti / Sukses</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sky-800 mb-1 block font-medium" style={{ fontSize: "0.85rem" }}>Tautan Aksi (Opsional)</label>
              <input 
                value={form.link} 
                onChange={(e) => setForm({ ...form, link: e.target.value })} 
                placeholder="Contoh: /app/laporan"
                className="w-full px-3 py-2 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300" 
                style={{ fontSize: "0.85rem" }} 
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <button onClick={resetForm} className="border border-sky-200 text-sky-700 px-5 py-2 rounded-lg hover:bg-sky-50 transition-colors font-medium" style={{ fontSize: "0.85rem" }}>Batal</button>
            <button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors font-medium shadow-sm shadow-sky-600/20" style={{ fontSize: "0.85rem" }}>
              {editId ? "Simpan Perubahan" : "Kirim Notifikasi"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-slate-500 font-semibold" style={{ fontSize: "0.75rem" }}>TANGGAL</th>
                <th className="px-5 py-3 text-slate-500 font-semibold" style={{ fontSize: "0.75rem" }}>NOTIFIKASI</th>
                <th className="px-5 py-3 text-slate-500 font-semibold" style={{ fontSize: "0.75rem" }}>TARGET ROLE</th>
                <th className="px-5 py-3 text-slate-500 font-semibold text-right" style={{ fontSize: "0.75rem" }}>AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allSystemNotifications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-500 text-sm">
                    Belum ada notifikasi yang dibuat.
                  </td>
                </tr>
              ) : (
                allSystemNotifications.map((notif) => (
                  <tr key={notif.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-slate-600" style={{ fontSize: "0.85rem" }}>
                        {new Date(notif.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-slate-400" style={{ fontSize: "0.75rem" }}>
                        {new Date(notif.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' })}
                      </div>
                    </td>
                    <td className="px-5 py-4 min-w-[300px]">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-7 h-7 rounded flex items-center justify-center shrink-0 ${getTypeColor(notif.type)}`}>
                          {getTypeIcon(notif.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 mb-0.5" style={{ fontSize: "0.9rem" }}>{notif.title}</div>
                          <div className="text-slate-600 line-clamp-2" style={{ fontSize: "0.85rem" }}>{notif.message}</div>
                          {notif.link && (
                            <div className="text-sky-600 mt-1 hover:underline cursor-pointer" style={{ fontSize: "0.75rem" }}>
                              Link: {notif.link}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full border text-center inline-flex items-center gap-1.5 ${
                        notif.targetRole === 'all' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' :
                        notif.targetRole === 'admin' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                        notif.targetRole === 'petugas' ? 'bg-sky-50 border-sky-100 text-sky-700' :
                        'bg-emerald-50 border-emerald-100 text-emerald-700'
                      }`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        <Users className="w-3 h-3" />
                        {notif.targetRole === 'all' ? 'Semua User' :
                         notif.targetRole === 'admin' ? 'Admin' :
                         notif.targetRole === 'petugas' ? 'Petugas' : 'Masyarakat'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button onClick={() => handleEdit(notif)} className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg mr-1" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteSystemNotification(notif.id)} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
