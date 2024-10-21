import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { FaComments, FaFire, FaList } from "react-icons/fa";
import { IoArchive, IoAttach, IoBasket, IoBicycle, IoCheckmarkCircleSharp, IoCheckmarkDoneCircle, IoCheckmarkDoneCircleSharp, IoCloseCircle, IoCodeSlashSharp, IoDocumentText, IoLogOut, IoPlayCircleOutline, IoTimerOutline, IoWatch } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoFlash } from "react-icons/io5";
import Post from "./pages/Post/Post";
import PengajuanOnGoing from "./pages/Pengajuan/OnGoing/PengajuanOnGoing";
import PengajuanCompleted from "./pages/Pengajuan/Completed/PengajuanCompleted";
import { CiBoxList, CiGrid2H } from "react-icons/ci";
import { SiDocsdotrs, SiReadthedocs } from "react-icons/si";
import { GiTransform } from "react-icons/gi";
import { MdIncompleteCircle, MdOutlineSmsFailed } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import FormOrder from "./pages/Tracking/FormOrder/FormOrder";
import TrackingCompleted from "./pages/Tracking/Completed/TrackingCompleted";
import TrackingOnGoing from "./pages/Tracking/OnGoing/TrackingOnGoing";
import TrackingFailed from "./pages/Tracking/Failed/TrackingFailed";
import ShareAuth from "./pages/ShareAuth/ShareAuth";
import AdminLayout from "./layout/adminLayout";
import Login from "./pages/CMS-Auth/Login";
import UserList from "./pages/Users/UserList";
import Content from "./pages/ContentManagement/Showcase/Showcase";
import { useLocation } from "react-router-dom";
import ExpandedRoutes from "./routing/ExpandedRoutes";
import AdditionalRoutes from "./routing/AdditionalRoutes";
import About from "./pages/ContentManagement/About/About";
import Service from "./pages/ContentManagement/Service/Service";
import OurClient from "./pages/ContentManagement/OurClient/OurClient";
import Partnership from "./pages/ContentManagement/Partnership/Partnership";
import { TfiCommentsSmiley, TfiHandOpen, TfiHome, TfiLayersAlt, TfiLayoutColumn2, TfiMoney, TfiUser } from "react-icons/tfi";
import NotFound from "./404";
import Article from "./pages/ContentManagement/Article/Article";
import Promo from "./pages/ContentManagement/Promo/Promo";
import Faq from "./pages/Faq/Faq";
import PengajuanFailed from "./pages/Pengajuan/Failed/PengajuanFailed";
import LogOut from "./pages/LogOut/LogOut";
import TrackingPending from "./pages/Tracking/Pending/TrackingPending";
import FaqNew from "./pages/Faq/FaqNew";
import PengajuanPending from "./pages/Pengajuan/Pending/PengajuanPending";
import ComissionSetting from "./pages/CommisionSetting/ComissionSetting";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

export const routes = [
  {
    path: '/app/dashboard',
    icon: <FaFire className={iconClasses} />,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    group: 'Landing Page',
    components: [
      {
        path: '/app/content',
        icon: <FaList className={iconClasses} />,
        name: 'Content',
        submenu: [
          {
            path: '/app/content/showcase',
            icon: <TfiLayoutColumn2 className={iconClasses} />,
            name: 'Showcase',
            component: Content,
          },
          {
            path: '/app/content/about',
            icon: <TfiHome className={iconClasses} />,
            name: 'About',
            component: About,
          },
          {
            path: '/app/content/service',
            icon: <TfiLayersAlt className={iconClasses} />,
            name: 'Service',
            component: Service,
          },
          {
            path: '/app/content/our-client',
            icon: <TfiUser className={iconClasses} />,
            name: 'Our Client',
            component: OurClient,
          },
          {
            path: '/app/content/partnership',
            icon: <TfiCommentsSmiley className={iconClasses} />,
            name: 'Partnership',
            component: Partnership,
          },
          {
            path: '/app/content/article',
            icon: <TfiHandOpen className={iconClasses} />,
            name: 'Article',
            component: Article,
          },
          {
            path: '/app/content/promo',
            icon: <TfiMoney className={iconClasses} />,
            name: 'Promo',
            component: Promo,
          }
        ]
      },
      {
        path: '/app/faq',
        icon: <FaComments className={iconClasses} />,
        name: 'FAQ',
        component: FaqNew,
      }
    ],
  },
  {
    group: 'Legalitas',
    components: [
      {
        path: '/app/tracking',
        icon: <IoDocument className={iconClasses} />,
        name: 'Tracking',
        submenu: [
          {
            path: '/app/tracking/form-order',
            icon: <GiTransform className={iconClasses} />,
            name: 'Form Order',
            component: FormOrder,
          },
          {
            path: '/app/tracking/pending',
            icon: <IoTimerOutline className={iconClasses} />,
            name: 'Pending',
            component: TrackingPending,
          },
          {
            path: '/app/tracking/on-going',
            icon: <GrInProgress className={iconClasses} />,
            name: 'OnGoing',
            component: TrackingOnGoing,
          },
          {
            path: '/app/tracking/completed',
            icon: <MdIncompleteCircle className={iconClasses} />,
            name: 'Completed',
            component: TrackingCompleted,
          },
          {
            path: '/app/tracking/failed',
            icon: <MdOutlineSmsFailed className={iconClasses} />,
            name: 'Failed',
            component: TrackingFailed,
          }
        ]
      },
      {
        path: '/app/share-auth',
        icon: <SiReadthedocs className={iconClasses} />,
        name: 'Share Auth',
        component: ShareAuth,
      },
    ],
  },
  {
    group: 'Blog',
    components: [
      {
        path: '/app/post',
        icon: <IoCodeSlashSharp className={iconClasses} />,
        name: 'Posts',
        component: Post,
      },
    ],
  },
  {
    group: 'Commission',
    components: [
      {
        name: 'Pengajuan',
        icon: <SiDocsdotrs className={iconClasses} />,
        submenu: [
          {
            path: '/app/points/pending',
            icon: <GrInProgress className={iconClasses} />,
            name: 'Pending',
            component: PengajuanPending,
          },
          {
            path: '/app/points/ongoing',
            icon: <IoPlayCircleOutline className={iconClasses} />,
            name: 'OnGoing',
            component: PengajuanOnGoing,
          },
          {
            path: '/app/points/completed',
            icon: <IoCheckmarkCircleSharp className={iconClasses} />,
            name: 'Completed',
            component: PengajuanCompleted,
          },
          {
            path: '/app/points/failed',
            icon: <IoCloseCircle className={iconClasses} />,
            name: 'Rejected',
            component: PengajuanFailed,
          },
        ]
      },
      {
        path: '/app/commission-setting',
        icon: <IoFlash className={iconClasses} />,
        name: 'Commission Setting',
        component: ComissionSetting,
      },
    ],
  },
  {
    group: 'Account',
    components: [
      {
        path: '/app/users',
        icon: <IoPerson className={iconClasses} />,
        name: 'Users',
        component: UserList,
      },
      {
        path: '/app/logout',
        icon: <IoLogOut className={iconClasses} />,
        name: 'Logout',
        component: LogOut,
      }
    ],
  },
];

export default function AppRootRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/app');

  return (
    isAdminRoute ? (
      <AdminLayout>
        <AdditionalRoutes />
        <Routes>
          {routes.map((route, index) => (
            route.group ? (
              route.components.map((subRoute, subIndex) => (
                subRoute.submenu ? (
                  subRoute.submenu.map((nestedRoute, nestedIndex) => (
                    <Route key={`${index}-${subIndex}-${nestedIndex}`} path={nestedRoute.path} element={<nestedRoute.component />} />
                  ))
                ) : (
                  <Route key={`${index}-${subIndex}`} path={subRoute.path} element={<subRoute.component />} />
                )
              ))
            ) : (
              <Route key={index} path={route.path} element={<route.component />} />
            )
          ))}
        </Routes>
      </AdminLayout>
    ) : (
      
      <ExpandedRoutes />

    )
  );
}