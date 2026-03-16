import { useState } from "react";
import { kategoriList } from "../../data/mockData";
import { MapPicker } from "../../components/MapView";
import { Send, Upload, CheckCircle2, MapPin, Home, Navigation, CreditCard } from "lucide-react";

export function BuatLaporan() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    kategori_id: "",
    alamat_lengkap: "",
    no_rumah: "",
    rt_rw: "",
    kelurahan: "",
    kecamatan: "",
    lat: -6.8,
    lng: 107.0,
    deskripsi: "",
    foto: null as File | null,
  });
  const [mapReady, setMapReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.kategori_id) err.kategori_id = "Pilih kategori";
    if (!form.alamat_lengkap) err.alamat_lengkap = "Alamat wajib diisi";
    if (!form.no_rumah) err.no_rumah = "No. rumah wajib diisi";
    if (!form.rt_rw) err.rt_rw = "RT/RW wajib diisi";
    if (!form.kelurahan) err.kelurahan = "Kelurahan wajib diisi";
    if (!form.kecamatan) err.kecamatan = "Kecamatan wajib diisi";
    if (!form.deskripsi) err.deskripsi = "Deskripsi wajib diisi";
    if (!mapReady) err.koordinat = "Tandai lokasi di peta";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const handleMapPick = (lat: number, lng: number) => {
    setForm({ ...form, lat, lng });
    setMapReady(true);
    setErrors({ ...errors, koordinat: "" });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm({ ...form, lat: pos.coords.latitude, lng: pos.coords.longitude });
          setMapReady(true);
          setErrors({ ...errors, koordinat: "" });
        },
        () => alert("Gagal mendapatkan lokasi. Silakan pin manual di peta.")
      );
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-sky-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Laporan Terkirim!</h2>
          <p className="text-slate-500 mb-2" style={{ fontSize: "0.9rem" }}>
            Laporan Anda telah diterima dan menunggu validasi dari Admin.
          </p>
          <p className="text-slate-400 mb-6" style={{ fontSize: "0.8rem" }}>
            Admin akan meninjau dan memutuskan apakah perlu penanganan langsung di lokasi. Pantau status di halaman Riwayat Laporan.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ kategori_id: "", alamat_lengkap: "", no_rumah: "", rt_rw: "", kelurahan: "", kecamatan: "", lat: -6.8, lng: 107.0, deskripsi: "", foto: null });
              setMapReady(false);
            }}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl transition-colors"
            style={{ fontSize: "0.9rem" }}
          >
            Buat Laporan Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-sky-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Buat Laporan</h1>
      <p className="text-slate-500 mb-6" style={{ fontSize: "0.85rem" }}>Laporkan masalah infrastruktur air di rumah Anda dengan detail lengkap</p>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Kategori */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            Jenis Masalah
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {kategoriList.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => { setForm({ ...form, kategori_id: String(k.id) }); setErrors({ ...errors, kategori_id: "" }); }}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  form.kategori_id === String(k.id)
                    ? "border-sky-500 bg-sky-50 shadow-sm"
                    : "border-sky-100 hover:border-sky-200"
                }`}
              >
                <span style={{ fontSize: "1.5rem" }}>{k.icon}</span>
                <p className="text-sky-800 mt-2" style={{ fontSize: "0.83rem", fontWeight: 600 }}>{k.nama}</p>
                <p className="text-slate-400 mt-0.5" style={{ fontSize: "0.72rem" }}>{k.deskripsi}</p>
                <div className={`mt-2 pt-2 border-t ${form.kategori_id === String(k.id) ? "border-sky-200" : "border-sky-50"}`}>
                  {k.tarif === 0 ? (
                    <span className="text-emerald-600" style={{ fontSize: "0.75rem", fontWeight: 700 }}>GRATIS</span>
                  ) : (
                    <span className="text-sky-600" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Rp {k.tarif.toLocaleString("id-ID")}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          {errors.kategori_id && <p className="text-red-500 mt-2" style={{ fontSize: "0.8rem" }}>{errors.kategori_id}</p>}
        </div>

        {/* Estimasi Biaya */}
        {form.kategori_id && (() => {
          const selectedKat = kategoriList.find(k => k.id === Number(form.kategori_id));
          if (!selectedKat) return null;
          return (
            <div className={`rounded-xl p-5 border-2 ${selectedKat.tarif === 0 ? "bg-emerald-50 border-emerald-200" : "bg-sky-50 border-sky-200"}`}>
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className={`w-5 h-5 ${selectedKat.tarif === 0 ? "text-emerald-600" : "text-sky-600"}`} />
                <h3 className={`${selectedKat.tarif === 0 ? "text-emerald-800" : "text-sky-800"}`} style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Estimasi Biaya Layanan
                </h3>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                {selectedKat.tarif === 0 ? (
                  <span className="text-emerald-700" style={{ fontSize: "1.5rem", fontWeight: 800 }}>GRATIS</span>
                ) : (
                  <>
                    <span className={`${selectedKat.tarif === 0 ? "text-emerald-500" : "text-sky-500"}`} style={{ fontSize: "0.85rem" }}>Mulai dari Rp</span>
                    <span className="text-sky-800" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{selectedKat.tarif.toLocaleString("id-ID")}</span>
                  </>
                )}
              </div>
              <p className={`${selectedKat.tarif === 0 ? "text-emerald-700" : "text-sky-700"}`} style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                {selectedKat.keterangan_tarif}
              </p>
              <p className="text-slate-400 mt-2" style={{ fontSize: "0.72rem" }}>
                * Biaya final ditentukan setelah validasi admin. Tarif sudah termasuk jasa petugas.
              </p>
            </div>
          );
        })()}

        {/* Alamat Rumah */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <Home className="w-5 h-5 text-sky-500" /> Alamat Rumah
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>Alamat Lengkap (Nama Jalan) *</label>
              <input
                value={form.alamat_lengkap}
                onChange={(e) => { setForm({ ...form, alamat_lengkap: e.target.value }); setErrors({ ...errors, alamat_lengkap: "" }); }}
                placeholder="Contoh: Jl. Merdeka"
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.alamat_lengkap && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.alamat_lengkap}</p>}
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>No. Rumah *</label>
              <input
                value={form.no_rumah}
                onChange={(e) => { setForm({ ...form, no_rumah: e.target.value }); setErrors({ ...errors, no_rumah: "" }); }}
                placeholder="Contoh: 12A"
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.no_rumah && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.no_rumah}</p>}
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>RT/RW *</label>
              <input
                value={form.rt_rw}
                onChange={(e) => { setForm({ ...form, rt_rw: e.target.value }); setErrors({ ...errors, rt_rw: "" }); }}
                placeholder="Contoh: RT 03/RW 05"
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.rt_rw && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.rt_rw}</p>}
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>Kelurahan/Desa *</label>
              <input
                value={form.kelurahan}
                onChange={(e) => { setForm({ ...form, kelurahan: e.target.value }); setErrors({ ...errors, kelurahan: "" }); }}
                placeholder="Contoh: Sukamaju"
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.kelurahan && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.kelurahan}</p>}
            </div>
            <div>
              <label className="text-sky-800 mb-1 block" style={{ fontSize: "0.83rem" }}>Kecamatan *</label>
              <input
                value={form.kecamatan}
                onChange={(e) => { setForm({ ...form, kecamatan: e.target.value }); setErrors({ ...errors, kecamatan: "" }); }}
                placeholder="Contoh: Cianjur"
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.kecamatan && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.kecamatan}</p>}
            </div>
          </div>
        </div>

        {/* Lokasi Peta */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-2 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            <MapPin className="w-5 h-5 text-sky-500" /> Pin Lokasi di Peta
          </h3>
          <p className="text-slate-400 mb-3" style={{ fontSize: "0.8rem" }}>
            Klik pada peta untuk menandai lokasi rumah Anda, atau gunakan GPS otomatis.
          </p>
          <button
            type="button"
            onClick={handleGetLocation}
            className="mb-3 bg-sky-100 hover:bg-sky-200 text-sky-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            style={{ fontSize: "0.83rem" }}
          >
            <Navigation className="w-4 h-4" /> Gunakan Lokasi GPS Saya
          </button>
          <MapPicker lat={form.lat} lng={form.lng} onPick={handleMapPick} height="300px" />
          {mapReady && (
            <div className="mt-3 flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-lg p-2.5" style={{ fontSize: "0.8rem" }}>
              <CheckCircle2 className="w-4 h-4" />
              Koordinat: {form.lat.toFixed(6)}, {form.lng.toFixed(6)}
            </div>
          )}
          {errors.koordinat && <p className="text-red-500 mt-2" style={{ fontSize: "0.78rem" }}>{errors.koordinat}</p>}
        </div>

        {/* Deskripsi */}
        <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-sm">
          <h3 className="text-sky-800 mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>Detail Masalah</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.83rem" }}>Deskripsi Masalah *</label>
              <textarea
                value={form.deskripsi}
                onChange={(e) => { setForm({ ...form, deskripsi: e.target.value }); setErrors({ ...errors, deskripsi: "" }); }}
                placeholder="Jelaskan masalah secara detail: apa yang terjadi, sudah berapa lama, bagian mana yang bermasalah..."
                className="w-full px-3 py-2.5 border border-sky-200 rounded-lg bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-300 h-32 resize-none"
                style={{ fontSize: "0.85rem" }}
              />
              {errors.deskripsi && <p className="text-red-500 mt-1" style={{ fontSize: "0.78rem" }}>{errors.deskripsi}</p>}
            </div>
            <div>
              <label className="text-sky-800 mb-1.5 block" style={{ fontSize: "0.83rem" }}>Foto Bukti (opsional)</label>
              <label className="border-2 border-dashed border-sky-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 transition-colors">
                <Upload className="w-8 h-8 text-sky-400 mb-2" />
                <span className="text-sky-600" style={{ fontSize: "0.83rem" }}>
                  {form.foto ? form.foto.name : "Klik untuk upload foto kondisi masalah"}
                </span>
                <span className="text-slate-400 mt-1" style={{ fontSize: "0.72rem" }}>Maks. 5MB (JPG, PNG)</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setForm({ ...form, foto: e.target.files?.[0] || null })} />
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-200"
        >
          <Send className="w-5 h-5" /> Kirim Laporan
        </button>
      </form>
    </div>
  );
}