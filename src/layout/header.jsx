import React, { useState } from 'react'
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebarCollapse }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="navbar sticky top-0 bg-main z-10 shadow-md flex justify-between items-center p-4">

                {/* Menu toggle for mobile view or small screen */}
                <div className="flex-1">
                    <button className="text-white" onClick={toggleSidebarCollapse}>
                        <FaBars className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex items-center space-x-4">

                    {/* Notification icon */}
                    <button className="relative text-white">
                        <FaBell className="h-6 w-6" />
                        {/* {noOfNotifications > 0 ? <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">{noOfNotifications}</span> : null} */}
                    </button>

                    {/* Profile icon, opening menu on click */}
                    <div className="relative">
                        <button className="text-white" onClick={toggleDropdown}>
                            <FaUser className="h-6 w-6" />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to={'/app/settings-profile'}>
                                        Profile Settings
                                    </Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link to={'/app/settings-billing'}>Bill History</Link>
                                </li>
                                <div className="border-t my-2"></div>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a>Logout</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header