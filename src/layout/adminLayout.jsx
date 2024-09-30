import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebarCollapse={toggleSidebarCollapse} />
      <div className="flex-1 flex flex-col">
        <header>
          <Header toggleSidebarCollapse={toggleSidebarCollapse} />
        </header>
        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
