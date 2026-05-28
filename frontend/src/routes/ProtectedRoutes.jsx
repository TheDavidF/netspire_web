import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {

  const {
    user,
    token,
  } = useAuth();

  // NO AUTENTICADO

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // ROL NO PERMITIDO

  if (
    roles &&
    !roles.includes(user.rol)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;