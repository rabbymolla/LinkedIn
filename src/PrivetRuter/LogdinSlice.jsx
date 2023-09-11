import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Login";

export default function Logdin() {
  const users = useSelector((user) => user.counter.value);
  return users ? <Outlet /> : <Login />;
}
