import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import useGeolocation from './hooks/useGeolocation';
import PageTransition from './components/PageTransition'; // For route animations
import NavBar from './components/NavBar'; // Always present NavBar at app-level
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

  // NavBar links, consistently passed everywhere
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  return (
    <Router>
      <div className="App">
        <NavBar
          brandName="Royaltree"
          links={navLinks}
          geoData={geo}
          rightSection={
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ marginLeft: 9 }}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          }
        />
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
          {/* Dedicated route for /ip-detail for NavBar */}
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
