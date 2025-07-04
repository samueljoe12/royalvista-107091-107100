import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import useGeolocation from './hooks/useGeolocation';

// Lazy imports for readability (can optimize with React.lazy later if needed)
import LandingPage from './pages/LandingPage';
import Marketplace from './pages/Marketplace';
import IPDetail from './pages/IPDetail';
import CreatorDashboard from './pages/CreatorDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import NotFound from './pages/NotFound';

/**
 * PUBLIC_INTERFACE
 * Main application layout with client-side routing.
 * Handles global theme, and defines all main user-facing routes.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const geo = useGeolocation();

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Build geo-aware right section for NavBar globally
  const geoRightSection = null; // Let NavBar handle greeting with geoData

  return (
    <Router>
      <div className="App">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <Routes>
          <Route path="/" element={
            <LandingPage geoData={geo} />
          } />
          <Route path="/marketplace" element={
            <Marketplace />
          } />
          <Route path="/ip/:id" element={
            <IPDetail />
          } />
          <Route path="/creator" element={
            <CreatorDashboard />
          } />
          <Route path="/investor" element={
            <InvestorDashboard />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
