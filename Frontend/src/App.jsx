import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CaptionPage from './pages/CaptionPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<CaptionPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>

        {/* Dynamic Background Mesh */}
        <div className="background-mesh">
          <div className="mesh-blob blob-1" />
          <div className="mesh-blob blob-2" />
        </div>
      </div>
    </Router>
  );
}

export default App;