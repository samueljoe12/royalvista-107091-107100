import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * Loader - Animated glassmorphic ring loader.
 * @param {string} color Gradient color(s)
 * @param {number} size px
 */
function Loader({ color = "conic-gradient(from 0deg, #FFD700 0deg, #00FFC2 340deg, #FFD700 360deg)", size = 46 }) {
  return (
    <motion.div
      aria-label="Loading"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 0.9 }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        maskImage: "radial-gradient(circle 70% at 50% 50%, #000 98%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "radial-gradient(circle 70% at 50% 50%, #000 98%, rgba(0,0,0,0) 100%)",
        filter: "drop-shadow(0 0 16px #ffd70066)",
        margin: "auto"
      }}
    />
  );
}

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Loader;
