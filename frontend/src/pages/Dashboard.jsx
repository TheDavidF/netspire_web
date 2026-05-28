import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {

  logout();

  window.location.replace("/");

};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

      <p className="mb-2">Bienvenido:</p>

      <p className="mb-6 text-blue-400">{user?.nombre}</p>

      <p className="mb-6">
        Rol:
        <pre>{JSON.stringify(user, null, 2)}</pre> {user?.rol}
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
