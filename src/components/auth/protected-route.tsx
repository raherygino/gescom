import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import type { RoleCode } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: RoleCode[];
}

export function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role_code)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
