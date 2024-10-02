import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/CMS-Auth/Login";

export default function ExpandedRoutes() {
  return (
    <Routes>
      <Route path="/web/login" element={<Login />} />
    </Routes>
  );
}