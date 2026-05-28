import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 border-r border-gray-800">

      <h2 className="text-3xl font-bold text-blue-400 mb-10">

        NetSpire

      </h2>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `p-3 rounded-lg ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/clientes"
          className={({ isActive }) =>
            `p-3 rounded-lg ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`
          }
        >
          Clientes
        </NavLink>

      </nav>

    </div>
  );

}

export default Sidebar;