import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLogin() {
  const users = useSelector((user) => user.counter.value);

  return users ? <Navigate to="/" /> : <Outlet />;
}
