import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { 
  Bell, BellOff, Check, CheckCheck, Trash2, X, Search, 
  CreditCard, AlertCircle, Info, Wrench 
} from "lucide-react";
import { useNavigate } from "react-router";

export function Notifikasi() {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteUserNotification, 
    clearAllUserNotifications 
  } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"semua" | "belum_dibaca" | "sudah_dibaca">("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment_needed": return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "payment_proof": return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case "new_task": return <Wrench className="w-5 h-5 text-sky-500" />;
      case "system": return <Bell className="w-5 h-5 text-indigo-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    // Filter by tab
    if (activeTab === "belum_dibaca" && notif.read) return false;
    if (activeTab === "sudah_dibaca" && !notif.read) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notif.title.toLowerCase().includes(query) || 
        notif.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-sky-600" />
            Kotak Masuk Notifikasi
          </h1>
          <p className="text-gray-500 mt-1">Kelola dan baca semua pemberitahuan sistem Anda.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => markAllAsRead()}
            disabled={notifications.filter(n => !n.read).length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Tandai Semua Dibaca</span>
          </button>
          <button
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat notifikasi?")) {
                clearAllUserNotifications();
              }
            }}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bersihkan Semua</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex bg-gray-100/80 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("semua")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "semua" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab("belum_dibaca")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "belum_dibaca" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              Belum Dibaca
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("sudah_dibaca")}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "sudah_dibaca" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              Sudah Dibaca
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari notifikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all text-sm outline-none bg-white"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center bg-gray-50/30">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada notifikasi baru</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                {searchQuery 
                  ? "Tidak ada notifikasi yang cocok dengan kata kunci pencarian Anda." 
                  : "Anda sudah membaca semua notifikasi. Kami akan memberi tahu Anda jika ada aktivitas baru."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 sm:p-5 transition-all hover:bg-gray-50 flex gap-4 group relative ${!notif.read ? 'bg-sky-50/50' : 'bg-white'}`}
              >
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
                )}
                
                <div 
                  className="mt-1 shrink-0 cursor-pointer"
                  onClick={() => {
                    if (!notif.read) markAsRead(notif.id);
                    if (notif.link) navigate(notif.link);
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notif.read ? 'bg-white shadow-sm border border-sky-100' : 'bg-gray-100 border border-gray-200'}`}>
                    {getNotificationIcon(notif.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 pr-12">
                  <div 
                    className="cursor-pointer"
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                      if (notif.link) navigate(notif.link);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-4">
                      <h4 className={`text-base leading-tight truncate ${!notif.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notif.title}
                      </h4>
                      <span className={`text-xs whitespace-nowrap ${!notif.read ? 'text-sky-600 font-medium' : 'text-gray-400'}`}>
                        {formatDistanceToNow(new Date(notif.date), { addSuffix: true, locale: id })}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${!notif.read ? 'text-gray-700' : 'text-gray-500'}`}>
                      {notif.message}
                    </p>
                  </div>
                  
                  {notif.link && (
                    <button 
                      onClick={() => {
                        if (!notif.read) markAsRead(notif.id);
                        navigate(notif.link!);
                      }}
                      className="mt-3 text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      Lihat Detail →
                    </button>
                  )}
                </div>
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-gray-100">
                  {!notif.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notif.id);
                      }}
                      className="p-1.5 rounded-md text-sky-600 hover:bg-sky-50 transition-colors"
                      title="Tandai dibaca"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUserNotification(notif.id);
                    }}
                    className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                    title="Hapus notifikasi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}