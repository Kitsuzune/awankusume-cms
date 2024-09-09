import React from 'react';
import Sidebar from './sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-md flex items-center justify-between">
          <div className="text-lg font-semibold">Admin Panel</div>
          <div className="flex items-center space-x-4">
            {/* Add header items like profile, notifications, etc. */}
          </div>
        </header>
        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
