import React from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, BarChart2, Sparkles, MessageSquare, Info } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Sparkles size={24} color="#a78bfa" />
        </div>
        <span className="logo-text">NeuralVision</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Camera size={20} />
          <span>Captioner</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BarChart2 size={20} />
          <span>Vison Stats</span>
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
