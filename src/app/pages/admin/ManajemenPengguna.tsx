import { useState } from "react";
import { userList, User } from "../../data/mockData";
import { Plus, Pencil, Trash2, Shield, Wrench, Users as UsersIcon } from "lucide-react";

export function ManajemenPengguna() {
  const [data, setData] = useState<User[]>([...userList]);

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: "bg-purple-100 text-purple-700",
      petugas: "bg-emerald-100 text-emerald-700",
      masyarakat: "bg-amber-100 text-amber-700",
    };
    return (
      <span className={`${styles[role]} px-2.5 py-1 rounded-full`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
        {role === "admin" ? "Admin" : role === "petugas" ? "Petugas" : "Masyarakat"}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-sky-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Manajemen Pengguna</h1>
          <p className="text-slate-500" style={{ fontSize: "0.85rem" }}>Kelola data pengguna dan role akses</p>
        </div>
        <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors" style={{ fontSize: "0.85rem" }}>
          <Plus className="w-4 h-4" /> Tambah Pengguna
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-center">
          <Shield className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <p className="text-purple-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{data.filter(u => u.role === "admin").length}</p>
          <p className="text-purple-500" style={{ fontSize: "0.78rem" }}>Admin</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
          <Wrench className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <p className="text-emerald-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{data.filter(u => u.role === "petugas").length}</p>
          <p className="text-emerald-500" style={{ fontSize: "0.78rem" }}>Petugas</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
          <UsersIcon className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-amber-700" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{data.filter(u => u.role === "masyarakat").length}</p>
          <p className="text-amber-500" style={{ fontSize: "0.78rem" }}>Masyarakat</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-sky-100 shadow-sm overflow-x-auto">
        <table className="w-full" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr className="text-left text-slate-500 border-b border-sky-100 bg-sky-50/50">
              <th className="p-4">ID</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">Telepon</th>
              <th className="p-4">Role</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="border-b border-sky-50 hover:bg-sky-50/30">
                <td className="p-4 text-sky-600" style={{ fontWeight: 600 }}>{u.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center text-sky-700" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {u.nama.charAt(0)}
                    </div>
                    <span className="text-slate-800">{u.nama}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-500">{u.email}</td>
                <td className="p-4 text-slate-500">{u.telepon}</td>
                <td className="p-4">{roleBadge(u.role)}</td>
                <td className="p-4 flex gap-2">
                  <button className="text-sky-600 hover:bg-sky-100 p-1.5 rounded-lg"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setData(data.filter((x) => x.id !== u.id))} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
