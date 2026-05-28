import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await api.get("/dashboard/stats");

        setStats(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, []);

  if (loading) {

    return (
      <DashboardLayout>

        <p>Cargando estadísticas...</p>

      </DashboardLayout>
    );

  }

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Panel Administrador
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gray-800 p-6 rounded-xl">

          <h2 className="text-gray-400 mb-2">
            Clientes
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            {stats.clientes}
          </p>

        </div>

        <div className="bg-gray-800 p-6 rounded-xl">

          <h2 className="text-gray-400 mb-2">
            Tickets Abiertos
          </h2>

          <p className="text-4xl font-bold text-yellow-400">
            {stats.ticketsAbiertos}
          </p>

        </div>

        <div className="bg-gray-800 p-6 rounded-xl">

          <h2 className="text-gray-400 mb-2">
            Pagos Pendientes
          </h2>

          <p className="text-4xl font-bold text-red-400">
            {stats.pagosPendientes}
          </p>

        </div>

        <div className="bg-gray-800 p-6 rounded-xl">

          <h2 className="text-gray-400 mb-2">
            Instalaciones Pendientes
          </h2>

          <p className="text-4xl font-bold text-green-400">
            {stats.instalacionesPendientes}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );

}

export default AdminDashboard;