import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLayout from './layout/adminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import AppRootRoutes from './Routes';

function App() {
  return (
    <Router>
      <AdminLayout>
        <AppRootRoutes />
      </AdminLayout>
    </Router>
  );
}

export default App;
