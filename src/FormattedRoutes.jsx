import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { FaFire, FaList } from "react-icons/fa";
import { IoArchive, IoAttach, IoBasket, IoBicycle, IoCodeSlashSharp, IoDocumentText, IoLogOut } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoFlash } from "react-icons/io5";
import Post from "./pages/Post/Post";
import PengajuanOnGoing from "./pages/Pengajuan/OnGoing/PengajuanOnGoing";
import PengajuanCompleted from "./pages/Pengajuan/Completed/PengajuanCompleted";
import { CiBoxList } from "react-icons/ci";
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
        component: Post,
      },
    ],
    compnets: [
      {
        path: '/app/post',
        icon: <IoArchive className={iconClasses} />,
        name: 'Content',
        component: Post,
      },
    ]
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
            path: '/app/tracking/failed',
            icon: <MdOutlineSmsFailed className={iconClasses} />,
            name: 'Failed',
            component: TrackingFailed,
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
            path: '/app/tracking/form-order',
            icon: <GiTransform className={iconClasses} />,
            name: 'Form Order',
            component: FormOrder,
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
            path: '/app/points/ongoing',
            icon: <IoAttach className={iconClasses} />,
            name: 'OnGoing',
            component: PengajuanOnGoing,
          },
          {
            path: '/app/points/completed',
            icon: <IoBasket className={iconClasses} />,
            name: 'Completed',
            component: PengajuanCompleted,
          },
        ]
      },
      {
        path: '/app/commission-setting',
        icon: <IoFlash className={iconClasses} />,
        name: 'Commission Setting',
        component: Dashboard,
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
        component: Dashboard,
      }
    ],
  },
  // {
  //   path: '/app/users',
  //   icon: <IoPerson className={iconClasses} />,
  //   name: 'Users',
  //   component: Dashboard, // Add the corresponding component
  // },
];

export default function AppRootRoutes() {
  return (
    <Routes>

      <Route path="/web/login" element={<Login />} />


      {routes.map((route, index) => (
        route.group ? (
          route.components.map((subRoute, subIndex) => (
            subRoute.submenu ? (
              subRoute.submenu.map((nestedRoute, nestedIndex) => (
                <Route key={`${index}-${subIndex}-${nestedIndex}`} path={nestedRoute.path} element={<AdminLayout><nestedRoute.component /></AdminLayout>} />
              ))
            ) : (
              <Route key={`${index}-${subIndex}`} path={subRoute.path} element={<AdminLayout><subRoute.component /></AdminLayout>} />
            )
          ))
        ) : (
          <Route key={index} path={route.path} element={<AdminLayout><route.component /></AdminLayout>} />
        )
      ))}
    </Routes>
  );
}