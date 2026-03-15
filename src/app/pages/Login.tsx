import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Droplets, Mail, Lock, AlertCircle } from "lucide-react";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email harus diisi");
      return;
    }
    const success = login(email, password);
    if (success) {
      // Redirect based on role
      const u = { email };
      if (email.includes("admin")) navigate("/app/dashboard");
      else if (email.endsWith("@tirtabantu.id")) navigate("/app/tugas");
      else navigate("/app/buat-laporan");
    } else {
      setError("Email tidak ditemukan. Gunakan email demo yang tersedia.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Droplets className="w-10 h-10 text-sky-600" />
            <span className="text-sky-800" style={{ fontSize: "2rem", fontWeight: 800 }}>TirtaBantu</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-sky-100">
          <h2 className="text-sky-900 mb-1 text-center" style={{ fontSize: "1.35rem", fontWeight: 700 }}>Masuk ke Sistem</h2>
          <p className="text-slate-500 text-center mb-6" style={{ fontSize: "0.85rem" }}>Silakan login dengan akun Anda</p>

          {error && (
            <div className="bg-red-50 text-red-600 rounded-lg p-3 mb-4 flex items-center gap-2" style={{ fontSize: "0.85rem" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.85rem" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl transition-colors shadow-lg shadow-sky-200">
              Masuk
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="mt-6 bg-white/80 rounded-xl p-5 border border-sky-100">
          <p className="text-sky-800 mb-3" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Akun Demo:</p>
          <div className="space-y-2">
            {[
              { role: "Admin", email: "admin@tirtabantu.id", color: "bg-purple-100 text-purple-700" },
              { role: "Petugas", email: "budi@tirtabantu.id", color: "bg-emerald-100 text-emerald-700" },
              { role: "Masyarakat", email: "andi@gmail.com", color: "bg-amber-100 text-amber-700" },
            ].map((acc) => (
              <button
                key={acc.email}
                onClick={() => { setEmail(acc.email); setPassword("demo123"); setError(""); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors text-left"
              >
                <span className={`${acc.color} px-2 py-0.5 rounded`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>{acc.role}</span>
                <span className="text-slate-600" style={{ fontSize: "0.8rem" }}>{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
