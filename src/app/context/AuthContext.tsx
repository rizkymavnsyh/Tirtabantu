import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { User, userList } from "../data/mockData";
import { toast } from "sonner";

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: "payment_needed" | "payment_proof" | "new_task" | "info" | "system";
  date: string;
  link?: string;
  targetRole: "all" | "admin" | "petugas" | "masyarakat";
}

export interface UserNotificationReadState {
  userId: number;
  notificationId: string;
}

const initialMockNotifications: SystemNotification[] = [
  { id: "sys-1", title: "Pembaruan Sistem v2.0", message: "Sistem telah diperbarui. Silakan cek fitur terbaru kami.", type: "system", date: new Date(Date.now() - 86400000).toISOString(), targetRole: "all" },
  { id: "adm-1", title: "Bukti Pembayaran Baru", message: "Andi Pratama mengunggah bukti pembayaran untuk Laporan #1005.", type: "payment_proof", date: new Date().toISOString(), link: "/app/pembayaran-admin", targetRole: "admin" },
  { id: "adm-2", title: "Laporan Baru", message: "Laporan #1011 butuh validasi segera.", type: "info", date: new Date().toISOString(), link: "/app/laporan", targetRole: "admin" },
  { id: "pet-1", title: "Pengecekan Rutin", message: "Harap lakukan pengecekan instalasi di area masing-masing.", type: "new_task", date: new Date().toISOString(), link: "/app/tugas", targetRole: "petugas" },
  { id: "mas-1", title: "Tips Hemat Air", message: "Matikan keran saat tidak digunakan untuk menghemat persediaan air bersih.", type: "info", date: new Date().toISOString(), targetRole: "masyarakat" },
];

export interface AppNotification extends SystemNotification {
  read: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  
  // Notification States
  notifications: AppNotification[]; // Current user's notifications
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteUserNotification: (id: string) => void;
  clearAllUserNotifications: () => void;
  
  // Admin Notification CRUD
  allSystemNotifications: SystemNotification[];
  addSystemNotification: (notif: Omit<SystemNotification, "id" | "date">) => void;
  updateSystemNotification: (id: string, notif: Partial<SystemNotification>) => void;
  deleteSystemNotification: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>(initialMockNotifications);
  const [readStates, setReadStates] = useState<UserNotificationReadState[]>([]);
  const [deletedStates, setDeletedStates] = useState<{userId: number, notificationId: string}[]>([]);
  const [notifiedToasts, setNotifiedToasts] = useState<Set<string>>(new Set());

  // Get current user's notifications based on targetRole
  const notifications = useMemo(() => {
    if (!user) return [];
    
    return systemNotifications
      .filter(n => n.targetRole === "all" || n.targetRole === user.role)
      .filter(n => !deletedStates.some(ds => ds.userId === user.id && ds.notificationId === n.id))
      .map(n => ({
        ...n,
        read: readStates.some(rs => rs.userId === user.id && rs.notificationId === n.id)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [user, systemNotifications, readStates, deletedStates]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Show toasts for new unread notifications
  useEffect(() => {
    if (!user) return;
    
    const unread = notifications.filter(n => !n.read && !notifiedToasts.has(n.id));
    
    if (unread.length > 0) {
      unread.forEach((notif, index) => {
        setTimeout(() => {
          toast(notif.title, {
            description: notif.message,
            action: notif.link ? {
              label: "Lihat",
              onClick: () => { window.location.href = notif.link!; }
            } : undefined
          });
          setNotifiedToasts(prev => new Set(prev).add(notif.id));
        }, 1000 + (index * 1500));
      });
    }
  }, [notifications, user, notifiedToasts]);

  const markAsRead = (id: string) => {
    if (!user) return;
    if (!readStates.some(rs => rs.userId === user.id && rs.notificationId === id)) {
      setReadStates(prev => [...prev, { userId: user.id, notificationId: id }]);
    }
  };

  const markAllAsRead = () => {
    if (!user) return;
    
    const newReadStates = [...readStates];
    notifications.forEach(n => {
      if (!n.read) {
        newReadStates.push({ userId: user.id, notificationId: n.id });
      }
    });
    setReadStates(newReadStates);
  };

  const deleteUserNotification = (id: string) => {
    if (!user) return;
    setDeletedStates(prev => [...prev, { userId: user.id, notificationId: id }]);
  };

  const clearAllUserNotifications = () => {
    if (!user) return;
    const newDeletedStates = [...deletedStates];
    notifications.forEach(n => {
      newDeletedStates.push({ userId: user.id, notificationId: n.id });
    });
    setDeletedStates(newDeletedStates);
  };

  // CRUD for Admin
  const addSystemNotification = (notif: Omit<SystemNotification, "id" | "date">) => {
    const newNotif: SystemNotification = {
      ...notif,
      id: "sys-" + Date.now().toString(),
      date: new Date().toISOString()
    };
    setSystemNotifications(prev => [newNotif, ...prev]);
  };

  const updateSystemNotification = (id: string, updatedFields: Partial<SystemNotification>) => {
    setSystemNotifications(prev => prev.map(n => n.id === id ? { ...n, ...updatedFields } : n));
  };

  const deleteSystemNotification = (id: string) => {
    setSystemNotifications(prev => prev.filter(n => n.id !== id));
    // Also cleanup read states
    setReadStates(prev => prev.filter(rs => rs.notificationId !== id));
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
    <AuthContext.Provider value={{ 
      user, login, logout, updateProfile, 
      notifications, unreadCount, markAsRead, markAllAsRead,
      deleteUserNotification, clearAllUserNotifications,
      allSystemNotifications: systemNotifications,
      addSystemNotification, updateSystemNotification, deleteSystemNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
