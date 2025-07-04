import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * AssetCard - Card for digital asset/IP. Shows image, title, subtitle, stat badges, supports hover glow and glassmorphism.
 * @param {string} image URL/path for the asset image
 * @param {string} title
 * @param {string} subtitle
 * @param {string} owner Owner/creator
 * @param {React.Component[]} badges Array of badge components (such as "x% owned")
 * @param {React.Component} footer Custom footer (royalty, price, cta button)
 * @param {Function} onClick
 */
function AssetCard({ image, title, subtitle, owner, badges = [], footer, onClick }) {
  return (
    <motion.div
      className="asset-card-glass"
      onClick={onClick}
      whileHover={onClick ? {
        scale: 1.064,
        boxShadow: "0 4px 36px #FFD70044, 0 1.5px 14px #00FFC277",
        filter: "drop-shadow(0 0 19px #FFD70080)"
      } : {}}
      style={{
        minWidth: 240,
        maxWidth: 340,
        margin: "auto",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      {image &&
        <div style={{ height: 185, background: "#1A1A24", overflow: "hidden" }}>
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      }
      <div style={{ padding: "18px 18px 12px 18px" }}>
        <div style={{display: "flex", alignItems: "center", gap: 14}}>
          <div>
            <h3 style={{
              color: "#FFD700",
              fontWeight: 700,
              margin: 0,
              fontSize: 20,
              letterSpacing: 0.04
            }}>{title}</h3>
            <div style={{
              color: "#00FFC2",
              fontSize: 13,
              marginTop: 2,
              opacity: 0.76
            }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {badges}
        </div>
        <div style={{
          color: "#E0E0E0",
          fontSize: 13,
          marginTop: 11,
          fontWeight: 400,
          opacity: 0.76
        }}>by {owner}</div>
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </div>
    </motion.div>
  );
}

AssetCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  owner: PropTypes.string,
  badges: PropTypes.array,
  footer: PropTypes.node,
  onClick: PropTypes.func,
};

export default AssetCard;
