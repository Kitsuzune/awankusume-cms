import React, { useState } from 'react'
import { FaBars, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

const Header = ({ toggleSidebarCollapse }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to={'/app/settings-profile'}>
                    Profile Settings
                </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to={'/app/settings-billing'}>Bill History</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <Link to={'/app/logout'}>Logout</Link>
            </Menu.Item>
        </Menu>
    );

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
                    {/* <button className="relative text-white">
                        <FaBell className="h-6 w-6" />
                    </button> */}

                    {/* Profile icon, opening menu on click */}
                    <div className="relative mr-5">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <button className="text-white flex items-center gap-2" onClick={e => e.preventDefault()}>
                                <FaUserCircle className="h-6 w-6" />
                                <div className="text-white flex gap-1">
                                    User 1
                                    <FaChevronDown className="text-white text-[12px]" />
                                </div>
                            </button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
