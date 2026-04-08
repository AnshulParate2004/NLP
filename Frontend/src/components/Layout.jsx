import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../App.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>

      {/* Global Dynamic Background Mesh */}
      <div className="background-mesh">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
      </div>
    </div>
  );
};

export default Layout;
