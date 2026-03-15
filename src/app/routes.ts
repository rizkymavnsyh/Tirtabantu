import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { AppLayout } from "./components/Layout";
import { Dashboard } from "./pages/admin/Dashboard";
import { Reports } from "./pages/admin/Reports";
import { MasterWilayah } from "./pages/admin/MasterWilayah";
import { MasterKategori } from "./pages/admin/MasterKategori";
import { ManajemenPengguna } from "./pages/admin/ManajemenPengguna";
import { KinerjaPetugas } from "./pages/admin/KinerjaPetugas";
import { PengumumanAdmin } from "./pages/admin/Pengumuman";
import { BuatLaporan } from "./pages/user/BuatLaporan";
import { RiwayatLaporan } from "./pages/user/RiwayatLaporan";
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
      { path: "laporan", Component: Reports },
      { path: "wilayah", Component: MasterWilayah },
      { path: "kategori", Component: MasterKategori },
      { path: "pengguna", Component: ManajemenPengguna },
      { path: "kinerja", Component: KinerjaPetugas },
      { path: "pengumuman", Component: PengumumanAdmin },
      // User routes
      { path: "buat-laporan", Component: BuatLaporan },
      { path: "riwayat", Component: RiwayatLaporan },
      // Petugas routes
      { path: "tugas", Component: DaftarTugas },
    ],
  },
]);
