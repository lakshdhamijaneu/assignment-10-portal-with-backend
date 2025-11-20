import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext);

  // 1. While loading the saved session, don't redirect yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // 2. After loading completes, if still no user → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. User exists → allow page render
  return <>{children}</>;
};

export default ProtectedRoute;
