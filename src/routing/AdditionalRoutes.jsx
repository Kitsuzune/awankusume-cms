import { Route, Routes } from "react-router-dom";
import UserList from "../pages/Users/UserList";
import AboutEdit from "../pages/ContentManagement/About/AboutEdit";
import ServiceEdit from "../pages/ContentManagement/Service/ServiceEdit/ServiceEdit";
import OurClientEdit from "../pages/ContentManagement/OurClient/OurClientEdit";
import PartnershipEdit from "../pages/ContentManagement/Partnership/PartnershipEdit";
import UserEdit from "../pages/Users/UserEdit";
import SettingProfile from "../pages/ProfileSettings/SettingProfile";
export default function AdditionalRoutes() {
  return (
    <Routes>
      {/* // Users */}
      <Route path="/app/users/add" element={<UserEdit />} />
      <Route path="/app/users/:id" element={<UserEdit />} />

      {/* // Profile Settings */}
      <Route path="/app/settings-profile" element={<SettingProfile />} />

      {/* // Content -> About */}
      <Route path="/app/content/about/:id" element={<AboutEdit />} />

      {/* // Content -> Service */}
      <Route path="/app/content/service/:id" element={<ServiceEdit />} />

      {/* // Content -> Our Client */}
      <Route path="/app/content/our-client/:id" element={<OurClientEdit />} />
      <Route path="/app/content/our-client/add" element={<OurClientEdit />} />

      {/* // Content -> Partnership */}
      <Route path="/app/content/partnership/:id" element={<PartnershipEdit />} />
    </Routes>
  );
}