import React from 'react'
import { FaBars } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import { FaUser } from "react-icons/fa";

const Header = () => {
    return (
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

        <>
            <div className="navbar sticky top-0 bg-main z-10 shadow-md">


                {/* Menu toogle for mobile view or small screen */}
                <div className="drawer flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-main drawer-button">
                        <FaBars className="h-5 w-5" />
                    </label>
                </div>



                <div className="flex-none ">

                    {/* Notification icon */}
                    <button className="btn btn-ghost ml-4  btn-circle">
                        <div className="indicator">
                            <FaBell className="h-6 w-6 text-white" />
                            {/* {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null} */}
                        </div>
                    </button>


                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar text-white">
                            <FaUser className="h-6 w-6" />
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to={'/app/settings-profile'}>
                                    Profile Settings
                                </Link>
                            </li>
                            <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header