import { useEffect, useState } from "react";

import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");

        setClientes(response.data.clientes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Cargando clientes...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      

      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Gestión de Clientes</h1>

          <Link
            to="/admin/clientes/nuevo"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Nuevo Cliente
          </Link>
        </div>
        <table className="w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left">Nombre</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Teléfono</th>

              <th className="p-4 text-left">Plan</th>

              <th className="p-4 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t border-gray-700">
                <td className="p-4">{cliente.Usuario?.nombre}</td>

                <td className="p-4">{cliente.Usuario?.email}</td>

                <td className="p-4">{cliente.telefono}</td>

                <td className="p-4">{cliente.Plan?.nombre}</td>

                <td className="p-4">
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                    {cliente.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Clientes;
