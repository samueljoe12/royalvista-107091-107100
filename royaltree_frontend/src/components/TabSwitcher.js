import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * TabSwitcher - Glassmorphic tab component with animated indicator.
 * @param {Array} tabs [{label, value}]
 * @param {string} active Value of current tab
 * @param {Function} onTabSelect Callback when tab changed
 */
function TabSwitcher({ tabs, active, onTabSelect }) {
  return (
    <AnimateSharedLayout>
      <div style={{
        display: "flex",
        gap: 16,
        padding: "7px 9px",
        background: "rgba(31,34,44,0.56)",
        borderRadius: 15,
        boxShadow: "0 2.5px 16px #00FFC218"
      }}>
        {tabs.map(tab => (
          <motion.button
            key={tab.value}
            onClick={() => active !== tab.value && onTabSelect(tab.value)}
            style={{
              color: active === tab.value ? "#FFD700" : "#EBFFFF",
              padding: "13px 23px",
              fontWeight: 600,
              background: "none",
              border: "none",
              borderRadius: 11,
              fontSize: 16,
              cursor: "pointer",
              position: "relative",
              transition: "color .18s"
            }}
          >
            {tab.label}
            {active === tab.value && (
              <motion.div
                layoutId="tab-underline"
                style={{
                  position: "absolute",
                  left: 6,
                  right: 6,
                  bottom: 5,
                  height: 3,
                  borderRadius: 3,
                  background: "linear-gradient(90deg,#FFD700,#00FFC2)",
                  boxShadow: "0 1px 8px #FFD70055"
                }}
                transition={{ type: "spring", stiffness: 480, damping: 28 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </AnimateSharedLayout>
  );
}

TabSwitcher.propTypes = {
  tabs: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default TabSwitcher;
