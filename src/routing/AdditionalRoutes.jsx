import { Route, Routes } from "react-router-dom";
import UserList from "../pages/Users/UserList";
export default function AdditionalRoutes() {
  return (
    <Routes>
      <Route path="/app/users/add" element={<UserList />} />
    </Routes>
  );
}