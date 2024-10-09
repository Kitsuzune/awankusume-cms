import { Route, Routes } from "react-router-dom";
import Login from "../pages/CMS-Auth/Login";
import NotFound from "../404";

export default function ExpandedRoutes() {
  return (
    <Routes>
      <Route path="/web/login" element={<Login />} />



      {/* // 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}