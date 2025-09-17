import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function RequireAuth({ redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="container my-5">Checking authentication...</div>;
  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="container my-5">Checking authentication...</div>;
  return user ? children : <Navigate to={redirectTo} replace />;
}
