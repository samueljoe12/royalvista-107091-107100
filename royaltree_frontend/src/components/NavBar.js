import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * NavBar - Futuristic glassmorphism navigation bar.
 * @param {Array} links Array of link objects: [{ label: string, href: string }]
 * @param {string} logoSrc Path or URL of logo image
 * @param {string} brandName Brand or app name for the left section
 * @param {React.Component} rightSection Optional right content (e.g. profile, theme toggle)
 */
function NavBar({ links = [], logoSrc, brandName, rightSection }) {
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
      </div>
      {rightSection && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >{rightSection}</motion.div>
      )}
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
