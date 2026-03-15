import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Tag,
  Users,
  ClipboardList,
  PlusCircle,
  History,
  Megaphone,
  Bell,
  LogOut,
  Droplets,
  BarChart3,
  Menu,
  X,
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
    { to: "/app/laporan", label: "Kelola Laporan", icon: FileText },
    { to: "/app/wilayah", label: "Master Wilayah", icon: MapPin },
    { to: "/app/kategori", label: "Master Kategori", icon: Tag },
    { to: "/app/pengguna", label: "Manajemen Pengguna", icon: Users },
    { to: "/app/kinerja", label: "Kinerja Petugas", icon: BarChart3 },
    { to: "/app/pengumuman", label: "Pengumuman", icon: Megaphone },
  ];

  const petugasLinks = [
    { to: "/app/tugas", label: "Daftar Tugas", icon: ClipboardList },
  ];

  const masyarakatLinks = [
    { to: "/app/buat-laporan", label: "Buat Laporan", icon: PlusCircle },
    { to: "/app/riwayat", label: "Riwayat Laporan", icon: History },
  ];

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "petugas"
      ? petugasLinks
      : masyarakatLinks;

  const roleLabel =
    user.role === "admin" ? "Admin" : user.role === "petugas" ? "Petugas Lapangan" : "Masyarakat";

  const navContent = (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-7 h-7 text-sky-300" />
          <span className="text-white tracking-wide" style={{ fontSize: "1.25rem", fontWeight: 700 }}>TirtaBantu</span>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white/90 truncate" style={{ fontSize: "0.875rem" }}>{user.nama}</p>
          <p className="text-sky-300 mt-0.5" style={{ fontSize: "0.75rem" }}>{roleLabel}</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
            style={{ fontSize: "0.875rem" }}
          >
            <link.icon className="w-5 h-5 shrink-0" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => { clearNotifications(); setOpen(false); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full transition-colors"
          style={{ fontSize: "0.875rem" }}
        >
          <Bell className="w-5 h-5" />
          Notifikasi
          {notifications > 0 && (
            <span className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "0.7rem" }}>
              {notifications}
            </span>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-300 w-full transition-colors"
          style={{ fontSize: "0.875rem" }}
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-sky-700 text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-sky-800 to-sky-900 flex flex-col z-40 transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
