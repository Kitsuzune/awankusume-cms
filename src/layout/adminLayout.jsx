import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Loading from '../components/ui/Loading/Loading';

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebarCollapse={toggleSidebarCollapse} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0">
          <Header toggleSidebarCollapse={toggleSidebarCollapse} />
        </header>
        <main className="flex-1overflow-auto">
          {/* <div className={`${isLoading ? 'opacity-50' : ''} relative`}> */}
          <div className='relative'>
            <div className='bg-gray-100 p-6'>
              {children}
            </div>
            {/* <Loading isLoading={isLoading} /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
