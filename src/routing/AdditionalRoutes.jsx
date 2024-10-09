import { Route, Routes } from "react-router-dom";
import UserList from "../pages/Users/UserList";
import AboutEdit from "../pages/ContentManagement/About/AboutEdit";
import ServiceEdit from "../pages/ContentManagement/Service/ServiceEdit/ServiceEdit";
import OurClientEdit from "../pages/ContentManagement/OurClient/OurClientEdit";
import PartnershipEdit from "../pages/ContentManagement/Partnership/PartnershipEdit";
import UserEdit from "../pages/Users/UserEdit";
export default function AdditionalRoutes() {
  return (
    <Routes>
      {/* // Users */}
      <Route path="/app/users/add" element={<UserEdit />} />
      <Route path="/app/users/:id" element={<UserEdit />} />
      
      {/* // Content -> About */}
      <Route path="/app/content/about/:id" element={<AboutEdit />} />

      {/* // Content -> Service */}
      <Route path="/app/content/service/:id" element={<ServiceEdit />} />

      {/* // Content -> Our Client */}
      <Route path="/app/content/our-client/:id" element={<OurClientEdit />} />

      {/* // Content -> Partnership */}
      <Route path="/app/content/partnership/:id" element={<PartnershipEdit />} />
    </Routes>
  );
}