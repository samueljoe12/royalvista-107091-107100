import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
/**
 * NavBar - Futuristic glassmorphism navigation bar.
 * @param {Array} links Array of link objects: [{ label: string, href: string }]
 * @param {string} logoSrc Path or URL of logo image
 * @param {string} brandName Brand or app name for the left section
 * @param {React.Component} rightSection Optional right content (e.g. profile, theme toggle)
 * @param {object} geoData Optional: { city, country, region, ip, loading, error }
 *
 * If rightSection is not provided but geoData is, renders geolocation greeting in right corner.
 */
function NavBar({ links = [], logoSrc, brandName, rightSection, geoData }) {
  // Custom greeting if geoData, else rightSection
  let geoSection = null;
  if (geoData) {
    if (geoData.loading) {
      geoSection = <span style={{
        fontSize: 15, color: "#bab9e3", fontWeight: 500, opacity: 0.82
      }}>Locating…</span>;
    } else if (geoData.error) {
      geoSection = <span style={{
        fontSize: 15, color: "#bab9e3", fontWeight: 500, opacity: 0.78
      }}>Hi&nbsp;there!</span>;
    } else if (geoData.city || geoData.country) {
      geoSection = (
        <span style={{ fontSize: 15, color: "#FFD700", fontWeight: 600, background: "rgba(0,255,194,0.09)", borderRadius: 8, padding: "7px 13px", boxShadow: "0 1px 7px #FFD70022" }}>
          {geoData.city ? `Hi, ${geoData.city}! ` : "Welcome!"}
          {geoData.ip && <span style={{ color: "#bab9e3", fontWeight: 500, marginLeft: 8 }}>({geoData.ip}</span>}
          {geoData.country && <span style={{ color: "#00FFC2", fontWeight: 800 }}>{geoData.country}</span>}
          {geoData.ip && <span style={{ color: "#bab9e3" }}>)</span>}
        </span>
      );
    }
  }

  return (
    <nav
      className="navbar-glass"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 66,
        padding: "0 2rem"
      }}
    >
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        {logoSrc && <img src={logoSrc} alt="logo" style={{ height: 40 }} />}
        <span style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: 22,
          background: "linear-gradient(90deg,#FFD700,#00FFC2)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent"
        }}>{brandName}</span>
      </motion.div>
      <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {links.map(({ label, href }) => (
          <motion.a
            key={href}
            href={href}
            whileHover={{
              scale: 1.13,
              color: "#FFD700",
              textShadow: "0 0 8px #FFD700AA"
            }}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 17,
              letterSpacing: "0.02em",
              padding: "6px 10px",
              borderRadius: 7,
              transition: "background 0.2s",
              position: "relative"
            }}
          >
            {label}
          </motion.a>
        ))}
        {/* IP Detail working nav link */}
        <NavLink
          to="/ip-detail"
          className={({ isActive }) => 
            isActive 
              ? "active"
              : undefined
          }
          style={({ isActive }) => ({
            color: isActive ? "#FFD700" : "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "17px",
            letterSpacing: "0.02em",
            padding: "6px 13px",
            borderRadius: 7,
            background: isActive
              ? "linear-gradient(90deg,#FFD70022,#00FFC210)"
              : "linear-gradient(90deg,#FFD70012 18%,#00FFC210 81%)",
            border: isActive
              ? "1.6px solid #FFD700AA"
              : "1.3px solid #FFD70044",
            boxShadow: isActive
              ? "0 0 13px #FFD70055"
              : undefined,
            transition: "all 0.18s",
            marginLeft: 2,
            userSelect: "none",
            display: "inline-block",
            textShadow: isActive
              ? "0 0 8px #FFD700AA"
              : "0 0 5px #FFD70022"
          })}
        >
          IP Detail
        </NavLink>
      </div>
      {rightSection
        ? (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >{rightSection}</motion.div>
        )
        : (geoSection &&
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >{geoSection}</motion.div>
        )
      }
    </nav>
  );
}

NavBar.propTypes = {
  links: PropTypes.array,
  logoSrc: PropTypes.string,
  brandName: PropTypes.string,
  rightSection: PropTypes.node
};

export default NavBar;
