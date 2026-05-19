import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner label="Checking session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
