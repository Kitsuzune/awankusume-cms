import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLayout from './layout/adminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import AppRootRoutes from './FormattedRoutes';
import ExpandedRoutes from './ExpandedRoutes';

function App() {
  
  return (
    <Router>
      <AppRootRoutes />
      <ExpandedRoutes />
    </Router>
  );
}

export default App;
