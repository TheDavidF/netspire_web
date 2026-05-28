import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

function CreateCliente() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",

  });

  const [loading, setLoading] = useState(false);

  // MANEJAR INPUTS

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // ENVIAR FORMULARIO

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/clientes", formData);

      alert("Cliente creado exitosamente");

      navigate("/admin/clientes");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error al crear cliente"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">

        Nuevo Cliente

      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl max-w-2xl"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

        </div>

        <textarea
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full mt-6 p-3 rounded bg-gray-700 text-white"
          rows="4"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded"
        >

          {loading
            ? "Guardando..."
            : "Crear Cliente"}

        </button>

      </form>

    </DashboardLayout>
  );

}

export default CreateCliente;