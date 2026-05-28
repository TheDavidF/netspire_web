import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import TecnicoDashboard from "./pages/TecnicoDashboard";
import Clientes from "./pages/admin/Clientes";
import CreateCliente from "./pages/admin/CreateCliente";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cliente"
          element={
            <ProtectedRoute roles={["CLIENTE"]}>
              <ClienteDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tecnico"
          element={
            <ProtectedRoute roles={["TECNICO"]}>
              <TecnicoDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/admin/clientes"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Clientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clientes/nuevo"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <CreateCliente />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
