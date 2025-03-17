import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/authService";

export default function PrivateRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/signin" />;
}
