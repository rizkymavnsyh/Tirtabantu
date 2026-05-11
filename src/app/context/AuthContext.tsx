import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, userList } from "../data/mockData";
import { toast } from "sonner";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "payment_needed" | "payment_proof" | "new_task" | "info";
  read: boolean;
  date: string;
  link?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Generate role-based mock notifications on login
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const mockNotifs: AppNotification[] = [];
    
    if (user.role === "admin") {
      mockNotifs.push({
        id: "1", title: "Bukti Pembayaran Baru", message: "Andi Pratama mengunggah bukti pembayaran untuk Laporan #1005.", type: "payment_proof", read: false, date: new Date().toISOString(), link: "/app/pembayaran-admin"
      });
      mockNotifs.push({
        id: "2", title: "Laporan Baru", message: "Laporan #1011 butuh validasi segera.", type: "info", read: false, date: new Date().toISOString(), link: "/app/laporan"
      });
    } else if (user.role === "petugas") {
      mockNotifs.push({
        id: "3", title: "Tugas Baru", message: "Anda ditugaskan ke Laporan #1006 (Pipa Tersumbat) di Jl. Raya Sumedang.", type: "new_task", read: false, date: new Date().toISOString(), link: "/app/tugas"
      });
    } else if (user.role === "masyarakat") {
      mockNotifs.push({
        id: "4", title: "Tagihan Pembayaran", message: "Laporan #1006 (Pipa Tersumbat) menunggu pembayaran Anda sebesar Rp 100.000.", type: "payment_needed", read: false, date: new Date().toISOString(), link: "/app/pembayaran"
      });
      mockNotifs.push({
        id: "5", title: "Laporan Selesai", message: "Laporan #1001 Anda telah selesai dikerjakan.", type: "info", read: false, date: new Date().toISOString(), link: "/app/riwayat"
      });
    }

    setNotifications(mockNotifs);

    // Simulate arriving alerts shortly after login
    mockNotifs.forEach((notif, index) => {
      setTimeout(() => {
        toast(notif.title, {
          description: notif.message,
          action: notif.link ? {
            label: "Lihat",
            onClick: () => { window.location.href = notif.link!; }
          } : undefined
        });
      }, 1000 + (index * 1500)); // Stagger toasts
    });

  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const login = (email: string, _password: string) => {
    const found = userList.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
