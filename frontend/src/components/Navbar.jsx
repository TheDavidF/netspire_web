import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    window.location.href = "/";

  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center border-b border-gray-700">

      <div>
        <h1 className="text-2xl font-bold text-blue-400">
          NetSpire
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold">
            {user?.nombre}
          </p>

          <p className="text-sm text-gray-400">
            {user?.rol}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Salir
        </button>

      </div>

    </div>
  );

}

export default Navbar;