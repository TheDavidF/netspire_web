import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.usuario, response.data.token);

      const rol = response.data.usuario.rol;

      if (rol === "ADMIN") {
        navigate("/admin");
      } else if (rol === "CLIENTE") {
        navigate("/cliente");
      } else if (rol === "TECNICO") {
        navigate("/tecnico");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
