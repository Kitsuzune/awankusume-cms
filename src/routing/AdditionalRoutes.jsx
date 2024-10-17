import { Route, Routes } from "react-router-dom";
import UserList from "../pages/Users/UserList";
import AboutEdit from "../pages/ContentManagement/About/AboutEdit";
import ServiceEdit from "../pages/ContentManagement/Service/ServiceEdit/ServiceEdit";
import OurClientEdit from "../pages/ContentManagement/OurClient/OurClientEdit";
import PartnershipEdit from "../pages/ContentManagement/Partnership/PartnershipEdit";
import UserEdit from "../pages/Users/UserEdit";
import SettingProfile from "../pages/ProfileSettings/SettingProfile";
import PostEdit from "../pages/Post/PostEdit";
import FaqEdit from "../pages/Faq/FaqEdit";
import FormView from "../pages/Tracking/FormOrder/FormView";
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
      <Route path="/app/content/about/add" element={<AboutEdit />} />

      {/* // Content -> Service */}
      <Route path="/app/content/service/:id" element={<ServiceEdit />} />
      <Route path="/app/content/service/add" element={<ServiceEdit />} />

      {/* // Content -> Our Client */}
      <Route path="/app/content/our-client/:id" element={<OurClientEdit />} />
      <Route path="/app/content/our-client/add" element={<OurClientEdit />} />

      {/* // Content -> Partnership */}
      <Route path="/app/content/partnership/:id" element={<PartnershipEdit />} />
      <Route path="/app/content/partnership/add" element={<PartnershipEdit />} />

      {/* // Tracking -> Form Order */}
      <Route path="/app/tracking/form-order/:id" element={<FormView />} />

      {/* Faq */}
      <Route path="/app/faq/:id" element={<FaqEdit />} />
      <Route path="/app/faq/add" element={<FaqEdit />} />

      {/* // Post */}
      <Route path="/app/post/:id" element={<PostEdit />} />
      <Route path="/app/post/add" element={<PostEdit />} />
    </Routes>
  );
}