import { Route, Routes } from "react-router-dom";
import Login from "../pages/CMS-Auth/Login";

export default function ExpandedRoutes() {
  return (
    <Routes>
      <Route path="/web/login" element={<Login />} />
    </Routes>
  );
}