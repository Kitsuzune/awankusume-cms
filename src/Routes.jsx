import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { FaBell } from "react-icons/fa";
import { IoArchive, IoAttach, IoBasket, IoBicycle, IoCodeSlashSharp, IoDocumentText, IoLogOut } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { IoTabletPortrait } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoAlertCircle } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoFlash } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { IoCash } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { IoKey } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import Tracking from "./pages/Tracking/Tracking";
import Post from "./pages/Post/Post";
import PengajuanOnGoing from "./pages/Pengajuan/OnGoing/PengajuanOnGoing";
import PengajuanCompleted from "./pages/Pengajuan/OnGoing/PengajuanCompleted";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

export const routes = [
  {
    path: '/app/dashboard',
    icon: <IoGrid className={iconClasses} />,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    group: 'Content',
    components: [
      {
        path: '/app/content',
        icon: <IoDocumentText className={iconClasses} />,
        name: 'Thumbnail',
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
        component: Tracking,
      },
      {
        path: '/app/share-auth',
        icon: <IoDocumentText className={iconClasses} />,
        name: 'Share Auth',
        component: Dashboard,
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
    group: 'Points',
    components: [
      {
        path: '/app/points',
        icon: <IoFlash className={iconClasses} />,
        name: 'Points',
        component: Dashboard,
      },
      {
        name: 'Pengajuan',
        icon: <IoBicycle className={iconClasses} />,
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
      }
    ],
  },
  {
    group: 'Account',
    components: [
      {
        path: '/app/users',
        icon: <IoPerson className={iconClasses} />,
        name: 'Users',
        component: Dashboard,
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
  );
}