import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pendapatan from "./pages/Pendapatan/Pendapatan";
import Pengeluaran from "./pages/Pengeluaran/Pengeluaran";
import PajakRekan from "./pages/PajakRekan/PajakRekan";
import Stok from "./pages/Stok/Stok";
import PajakPerusahaan from "./pages/PajakPerusahaan/PajakPerusahaan";
import Gaji from "./pages/Gaji/Gaji";
import NotFound from "./components/NotFound";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import DaftarAkun from "./pages/DaftarAkun/DaftarAkun";
import DetailPajakRekan from "./pages/DetailPajakRekan/DetailPajakRekan";
import DetailGaji from "./pages/DetailGaji/DetailGaji";
import UserProvider from "./Context/UserContext";
import Cookies from "js-cookie";
import GajiPeriodProvider from "./Context/GajiPeriodContext";
import PajakPeriodProvider from "./Context/PajakPeriodContext";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const ProtectedRoute = () => {
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserProvider>
      <GajiPeriodProvider>
        <PajakPeriodProvider>
          <Navbar />
          <Outlet />
        </PajakPeriodProvider>
      </GajiPeriodProvider>
    </UserProvider>
  );
};

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pendapatan" element={<Pendapatan />} />
        <Route path="/pengeluaran" element={<Pengeluaran />} />
        <Route path="/pajak-rekan" element={<PajakRekan />} />
        <Route path="/stok" element={<Stok />} />
        <Route path="/pajak-perusahaan" element={<PajakPerusahaan />} />
        <Route path="/gaji" element={<Gaji />} />
        <Route path="/daftar-akun" element={<DaftarAkun />} />
        <Route path="/detail-rekan/:id" element={<DetailPajakRekan />} />
        <Route path="/detail-gaji/:id" element={<DetailGaji />} />
      </Route>
    </Routes>
  );
}
