import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const EmployeeRoute = ({ children }: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.type !== "employee") {
    return <Navigate to="/admin/create-job" replace />;
  }

  return children;
};

export default EmployeeRoute;
