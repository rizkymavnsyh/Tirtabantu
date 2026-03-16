import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FileText, Tag, Users, ClipboardList, PlusCircle, History,
  Megaphone, Bell, LogOut, Droplets, BarChart3, Menu, X, CreditCard, Map,
} from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const { user, logout, notifications, clearNotifications } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/peta", label: "Peta Laporan", icon: Map },
    { to: "/app/laporan", label: "Kelola Laporan", icon: FileText },
    { to: "/app/kategori", label: "Master Kategori", icon: Tag },
    { to: "/app/pengguna", label: "Manajemen Pengguna", icon: Users },
    { to: "/app/pembayaran-admin", label: "Kelola Pembayaran", icon: CreditCard },
    { to: "/app/kinerja", label: "Kinerja Petugas", icon: BarChart3 },
    { to: "/app/pengumuman", label: "Pengumuman", icon: Megaphone },
  ];

  const petugasLinks = [
    { to: "/app/tugas", label: "Daftar Tugas", icon: ClipboardList },
  ];

  const masyarakatLinks = [
    { to: "/app/buat-laporan", label: "Buat Laporan", icon: PlusCircle },
    { to: "/app/riwayat", label: "Riwayat Laporan", icon: History },
    { to: "/app/pembayaran", label: "Pembayaran", icon: CreditCard },
  ];

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "petugas"
      ? petugasLinks
      : masyarakatLinks;

  const roleLabel =
    user.role === "admin" ? "Administrator" : user.role === "petugas" ? "Petugas Lapangan" : "Masyarakat";

  const navContent = (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 bg-sky-400/20 rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-sky-300" />
          </div>
          <span className="text-white tracking-wide" style={{ fontSize: "1.2rem", fontWeight: 700 }}>TirtaBantu</span>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-400/30 rounded-full flex items-center justify-center text-white" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
              {user.nama.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-white/90 truncate" style={{ fontSize: "0.85rem", fontWeight: 500 }}>{user.nama}</p>
              <p className="text-sky-300 mt-0.5" style={{ fontSize: "0.7rem" }}>{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-2 pb-1 text-sky-400/60 uppercase tracking-wider" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/8 hover:text-white/90"
              }`
            }
            style={{ fontSize: "0.85rem" }}
          >
            <link.icon className="w-[18px] h-[18px] shrink-0" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-0.5">
        <button
          onClick={() => { clearNotifications(); setOpen(false); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/8 hover:text-white/90 w-full transition-all"
          style={{ fontSize: "0.85rem" }}
        >
          <Bell className="w-[18px] h-[18px]" />
          Notifikasi
          {notifications > 0 && (
            <span className="ml-auto bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center px-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
              {notifications}
            </span>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-red-500/20 hover:text-red-300 w-full transition-all"
          style={{ fontSize: "0.85rem" }}
        >
          <LogOut className="w-[18px] h-[18px]" />
          Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-sky-700 text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-sky-800 via-sky-850 to-sky-900 flex flex-col z-40 transition-transform md:translate-x-0 shrink-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
