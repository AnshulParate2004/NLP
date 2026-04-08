import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CaptionPage from './pages/CaptionPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="caption" element={<CaptionPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;