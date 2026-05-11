import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Camera, User, Phone, Mail, Lock, Shield, Save } from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const { user, updateProfile } = useAuth();
  
  // Profile Form State
  const [nama, setNama] = useState(user?.nama || "");
  const [email, setEmail] = useState(user?.email || "");
  const [telepon, setTelepon] = useState(user?.telepon || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null);
  const [file, setFile] = useState<File | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Silakan login untuk melihat profil.</p>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // File size validation (max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("Gagal", {
        description: "Ukuran file foto maksimal 2MB.",
      });
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!nama || !email || !telepon) {
      toast.error("Validasi Gagal", {
        description: "Semua field profil harus diisi.",
      });
      return;
    }
    
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(telepon.replace(/\s+/g, ''))) {
      toast.error("Validasi Gagal", {
        description: "Format nomor HP tidak valid (10-13 digit angka).",
      });
      return;
    }

    setIsSavingProfile(true);

    try {
      // Mock API call: PATCH /user/{id} (including file upload)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateProfile({
        nama,
        email,
        telepon,
        avatar: previewUrl || undefined
      });
      
      toast.success("Berhasil", {
        description: "Profil berhasil diperbarui.",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Gagal memperbarui profil.",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Validasi Gagal", {
        description: "Semua field password harus diisi.",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Validasi Gagal", {
        description: "Password baru minimal 8 karakter.",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Validasi Gagal", {
        description: "Konfirmasi password tidak cocok.",
      });
      return;
    }
    
    if (oldPassword === newPassword) {
      toast.error("Validasi Gagal", {
        description: "Password baru tidak boleh sama dengan password lama.",
      });
      return;
    }

    setIsSavingPassword(true);
    
    try {
      // Mock API call: PATCH /user/{id}/password
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Berhasil", {
        description: "Password berhasil diubah.",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Error", {
        description: "Gagal mengganti password.",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Profil</h1>
        <p className="text-slate-500 mt-1">Kelola informasi pribadi dan keamanan akun Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Informasi Profil */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-slate-800">Informasi Pribadi</h2>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-6">
              {/* Foto Profil */}
              <div className="mb-6 flex items-center gap-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center relative">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-800 mb-1">Foto Profil</h3>
                  <p className="text-xs text-slate-500 mb-3">JPG, JPEG, atau PNG. Maks 2MB.</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Pilih Foto Baru
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/jpg"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                        className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                        placeholder="081234567890"
                      />
                    </div>
                  </div>
                </div>

                {user.role === "petugas" && user.area_kerja && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Area Kerja (Hanya Petugas)</label>
                    <input
                      type="text"
                      value={user.area_kerja}
                      disabled
                      className="w-full rounded-lg border-slate-200 border bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Kolom Ganti Password */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-slate-800">Keamanan</h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password Lama</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                      placeholder="Minimal 8 karakter"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 w-full rounded-lg border-slate-300 border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSavingPassword ? "Memproses..." : "Ganti Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
