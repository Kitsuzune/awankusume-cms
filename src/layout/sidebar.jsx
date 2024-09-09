import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../Routes';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Sidebar = () => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({});

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleExpand = (index) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        const newExpandedMenus = {};
        routes.forEach((route, index) => {
          if (route.group) {
            route.components.forEach((subRoute, subIndex) => {
              if (subRoute.submenu) {
                subRoute.submenu.forEach((nestedRoute) => {
                  if (isActive(nestedRoute.path)) {
                    newExpandedMenus[`${index}-${subIndex}`] = true;
                  }
                });
              } else if (isActive(subRoute.path)) {
                newExpandedMenus[`${index}-${subIndex}`] = true;
              }
            });
          } else if (isActive(route.path)) {
            newExpandedMenus[index] = true;
          }
        });
        setExpandedMenus(newExpandedMenus);
      }, [location.pathname]);

    return (
        <div className="h-screen bg-white w-64 pt-10 px-3 shadow-lg border-r border-gray-200">
            <div className="text-xl font-semibold mb-8 text-center">
                AWAN KUSUMA
            </div>
            <ul className="space-y-2">
                {routes.map((route, index) => (
                    route.group ? (
                        <div key={index}>
                            <div className="text-gray-500 uppercase text-xs mb-2">{route.group}</div>
                            {route.components.map((subRoute, subIndex) => (
                                <li key={subIndex} className="relative">
                                    {subRoute.submenu ? (
                                        <div>
                                            <div
                                                className="flex py-2 pl-4 items-center text-gray-600 cursor-pointer"
                                                onClick={() => toggleExpand(`${index}-${subIndex}`)}
                                            >
                                                {subRoute.icon}
                                                <span className="ml-4">{subRoute.name}</span>
                                                {expandedMenus[`${index}-${subIndex}`] ? (
                                                    <IoChevronUp className="ml-auto" />
                                                ) : (
                                                    <IoChevronDown className="ml-auto" />
                                                )}
                                            </div>

                                            <ul
                                                className={`ml-8 mt-2 space-y-1 overflow-hidden transition-max-height duration-300 ease-in-out 
                                                    ${expandedMenus[`${index}-${subIndex}`] ? 'max-h-screen' : 'max-h-0'}`}
                                            >
                                                {subRoute.submenu.map((nestedRoute, nestedIndex) => (
                                                    <li key={nestedIndex} className="relative">
                                                        <Link
                                                            to={nestedRoute.path}
                                                            className={`flex py-2 pl-4 rounded-lg items-center ${isActive(nestedRoute.path) ? 'bg-main text-white' : 'text-gray-600 hover:text-black hover:bg-blue-100 transition-all duration-300'}`}
                                                        >
                                                            {React.cloneElement(nestedRoute.icon, { className: `text-[18px] ${isActive(nestedRoute.path) ? 'text-white' : ''}` })}
                                                            <span className="ml-4">{nestedRoute.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            to={subRoute.path}
                                            className={`flex py-2 pl-4 rounded-lg items-center my-2 ${isActive(subRoute.path) ? 'bg-main text-white' : 'text-gray-600 hover:text-black hover:bg-blue-100 transition-all duration-300'}`}
                                        >
                                            {isActive(subRoute.path) && <div className='absolute w-6 h-11 -left-7 bg-blue-400 rounded-lg' />}
                                            {React.cloneElement(subRoute.icon, { className: `text-[18px] ${isActive(subRoute.path) ? 'text-white' : ''}` })}
                                            <span className="ml-4">{subRoute.name}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </div>
                    ) : (
                        <li key={index}>
                            <div>
                                <Link
                                    to={route.path}
                                    className={`flex py-2 pl-4 rounded-lg items-center ${isActive(route.path) ? 'bg-main text-white' : 'text-gray-600 hover:text-black hover:bg-blue-100 transition-all duration-300'}`}
                                >
                                    {isActive(route.path) && <div className='absolute w-6 h-11 -left-4 bg-blue-400 rounded-lg' />}
                                    {React.cloneElement(route.icon, { className: `text-[18px] ${isActive(route.path) ? 'text-white' : ''}` })}
                                    <span className="ml-4">{route.name}</span>
                                </Link>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
