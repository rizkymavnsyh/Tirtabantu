import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { AppLayout } from "./components/Layout";
import { Dashboard } from "./pages/admin/Dashboard";
import { Reports } from "./pages/admin/Reports";
import { PetaLaporan } from "./pages/admin/PetaLaporan";
import { MasterKategori } from "./pages/admin/MasterKategori";
import { ManajemenPengguna } from "./pages/admin/ManajemenPengguna";
import { KinerjaPetugas } from "./pages/admin/KinerjaPetugas";
import { PengumumanAdmin } from "./pages/admin/Pengumuman";
import { PembayaranAdmin } from "./pages/admin/PembayaranAdmin";
import { BuatLaporan } from "./pages/user/BuatLaporan";
import { RiwayatLaporan } from "./pages/user/RiwayatLaporan";
import { PembayaranUser } from "./pages/user/Pembayaran";
import { DaftarTugas } from "./pages/petugas/DaftarTugas";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      // Admin routes
      { path: "dashboard", Component: Dashboard },
      { path: "peta", Component: PetaLaporan },
      { path: "laporan", Component: Reports },
      { path: "kategori", Component: MasterKategori },
      { path: "pengguna", Component: ManajemenPengguna },
      { path: "pembayaran-admin", Component: PembayaranAdmin },
      { path: "kinerja", Component: KinerjaPetugas },
      { path: "pengumuman", Component: PengumumanAdmin },
      // User routes
      { path: "buat-laporan", Component: BuatLaporan },
      { path: "riwayat", Component: RiwayatLaporan },
      { path: "pembayaran", Component: PembayaranUser },
      // Petugas routes
      { path: "tugas", Component: DaftarTugas },
    ],
  },
]);
