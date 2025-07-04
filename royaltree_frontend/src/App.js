import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import useGeolocation from './hooks/useGeolocation';
import PageTransition from './components/PageTransition'; // For route animations
import './utils/animationPresets'; // ensures side effect import makes presets available

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
          <Route
            path="/"
            element={
              <PageTransition>
                <LandingPage geoData={geo} />
              </PageTransition>
            }
          />
          <Route
            path="/marketplace"
            element={
              <PageTransition>
                <Marketplace />
              </PageTransition>
            }
          />
          <Route
            path="/ip/:id"
            element={
              <PageTransition>
                <IPDetail />
              </PageTransition>
            }
          />
          {/* Add dedicated route for /ip-detail to support NavBar */}
          <Route
            path="/ip-detail"
            element={
              <PageTransition>
                <IPDetail />
              </PageTransition>
            }
          />
          <Route
            path="/creator"
            element={
              <PageTransition>
                <CreatorDashboard />
              </PageTransition>
            }
          />
          <Route
            path="/investor"
            element={
              <PageTransition>
                <InvestorDashboard />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
