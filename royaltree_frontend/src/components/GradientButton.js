import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * GradientButton - Animated gradient glassmorphic button.
 * @param {string} children Button text or elements
 * @param {Function} onClick
 * @param {boolean} disabled
 * @param {boolean} wide If true, make button full width
 * @param {React.Component} icon Optional icon component
 * @param {string} type "button"|"submit"
 */
function GradientButton({ children, onClick, disabled, wide, icon, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.04, boxShadow: "0 0 14px #FFD70090" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      style={{
        background: "linear-gradient(90deg,#FFD700,#00FFC2 95%)",
        color: "#181828",
        fontWeight: 600,
        fontSize: 16,
        padding: wide ? "15px 0" : "13px 28px",
        border: "none",
        borderRadius: 11,
        boxShadow: "0 2px 16px rgba(255,222,130,.10)",
        opacity: disabled ? 0.65 : 1,
        width: wide ? "100%" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        position: "relative",
        transition: "all 0.22s"
      }}
    >
      {icon && (
        <span style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  wide: PropTypes.bool,
  icon: PropTypes.node,
  type: PropTypes.string,
};

export default GradientButton;
