import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FileText, Tag, Users, ClipboardList, PlusCircle, History,
  Megaphone, Bell, LogOut, Droplets, BarChart3, Menu, X, CreditCard, Map,
  CheckCircle2, Info, AlertCircle, User, BellOff, Trash2, Wrench
} from "lucide-react";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function Sidebar() {
  const { user, logout, notifications, unreadCount, markAsRead, markAllAsRead, deleteUserNotification, clearAllUserNotifications } = useAuth();
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
    { to: "/app/notifikasi-admin", label: "Manajemen Notifikasi", icon: Bell },
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment_needed": return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "payment_proof": return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case "new_task": return <Wrench className="w-4 h-4 text-sky-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const navContent = (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 bg-sky-400/20 rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-sky-300" />
          </div>
          <span className="text-white tracking-wide" style={{ fontSize: "1.2rem", fontWeight: 700 }}>TirtaBantu</span>
        </div>
        <div 
          onClick={() => {
            navigate("/app/profil");
            setOpen(false);
          }}
          className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/15 transition-colors group"
          title="Edit Profil"
        >
          <div className="flex items-center gap-3">
            <div className="relative inline-block shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.nama} className="w-9 h-9 rounded-full object-cover shadow-sm border border-white/20 group-hover:border-white/40 transition-colors" />
              ) : (
                <div className="w-9 h-9 bg-sky-400/30 rounded-full flex items-center justify-center text-white group-hover:bg-sky-400/40 transition-colors" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  {user.nama.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-white/90 truncate group-hover:text-white transition-colors" style={{ fontSize: "0.85rem", fontWeight: 500 }}>{user.nama}</p>
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
        <NavLink
          to="/app/profil"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${
              isActive
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/60 hover:bg-white/8 hover:text-white/90"
            }`
          }
          style={{ fontSize: "0.85rem" }}
        >
          <User className="w-[18px] h-[18px]" />
          Profil Saya
        </NavLink>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/8 hover:text-white/90 w-full transition-all outline-none"
              style={{ fontSize: "0.85rem" }}
            >
              <Bell className="w-[18px] h-[18px]" />
              Notifikasi
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center px-1" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  {unreadCount}
                </span>
              )}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden mr-4 mb-2 origin-bottom-left"
              sideOffset={5}
              side="right"
              align="end"
            >
              <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 
                  className="font-semibold text-gray-800 text-sm hover:text-sky-600 cursor-pointer transition-colors"
                  onClick={() => {
                    navigate("/app/notifikasi");
                    setOpen(false);
                  }}
                >
                  Notifikasi
                </h3>
                <div className="flex gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => markAllAsRead()}
                      className="text-[11px] text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Tandai semua dibaca
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button 
                      onClick={() => clearAllUserNotifications()}
                      className="text-[11px] text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Bersihkan Semua
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center justify-center h-full">
                    <BellOff className="w-12 h-12 mb-3 text-gray-300" />
                    Belum ada notifikasi baru
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-3 transition-colors hover:bg-gray-50 flex gap-3 group relative ${!notif.read ? 'bg-sky-50/30' : ''}`}
                      >
                        <div className="mt-0.5 shrink-0" onClick={() => {
                          if (!notif.read) markAsRead(notif.id);
                          if (notif.link) {
                            navigate(notif.link);
                            setOpen(false);
                          }
                        }}>
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${!notif.read ? 'bg-white shadow-sm border border-sky-100' : 'bg-gray-100'}`}>
                            {getNotificationIcon(notif.type)}
                          </div>
                        </div>
                        <div className="flex-1 cursor-pointer pr-6" onClick={() => {
                          if (!notif.read) markAsRead(notif.id);
                          if (notif.link) {
                            navigate(notif.link);
                            setOpen(false);
                          }
                        }}>
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className={`text-sm leading-tight ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                              {notif.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed text-gray-500">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {formatDistanceToNow(new Date(notif.date), { addSuffix: true, locale: id })}
                          </span>
                        </div>
                        
                        {/* Hover Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteUserNotification(notif.id);
                          }}
                          className="absolute right-2 top-2 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                          title="Hapus notifikasi"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        {!notif.read && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sky-500 rounded-r-md" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => {
                    navigate("/app/notifikasi");
                    setOpen(false);
                  }}
                  className="w-full text-center text-sm font-medium text-sky-600 hover:text-sky-700 py-1.5 transition-colors"
                >
                  Lihat Semua Notifikasi
                </button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
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
