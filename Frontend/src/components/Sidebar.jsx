import React from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, BarChart2, Sparkles, Home } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Sparkles size={24} color="hsl(var(--primary))" />
        </div>
        <span className="logo-text">NeuralVision</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/caption" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Camera size={20} />
          <span>Captioner</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BarChart2 size={20} />
          <span>Vision Stats</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="dot"></div>
          <span>API Connected</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
