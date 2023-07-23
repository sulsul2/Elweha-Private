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

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Outlet />
    </>
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
      </Route>
    </Routes>
  );
}
