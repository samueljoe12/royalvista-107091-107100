import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Shared default royalty breakdown chart data for dummy use
 */
export const defaultBreakdown = [
  { label: "Artist", value: 52, color: "#FFD700" },
  { label: "Label", value: 24, color: "#00FFC2" },
  { label: "Management", value: 11, color: "#62C1FF" },
  { label: "Royalty Fund", value: 13, color: "#FF5B94" }
];

// Dummy slices/colors for a royalty breakdown chart for backward compatibility
const defaultSlices = defaultBreakdown;

// PUBLIC_INTERFACE
/**
 * ChartMock - Circular royalty breakdown pseudo-chart (not interactive/real).
 * @param {Array} slices Array of {label, value, color}
 * @param {string} title Chart title
 * @param {string} size px
 */
function ChartMock({ slices = defaultSlices, title, size = 170 }) {
  // Naive pie rendering
  const total = slices.reduce((acc, s) => acc + s.value, 0);
  let angle = 0;
  const arcs = slices.map((s, i) => {
    const a0 = angle;
    const a1 = angle + (s.value / total) * 360;
    angle = a1;
    return { ...s, a0, a1 };
  });

  function describeArc(cx, cy, r, a0, a1) {
    const rad = (deg) => (deg * Math.PI) / 180;
    const x0 = cx + r * Math.cos(rad(a0 - 90));
    const y0 = cy + r * Math.sin(rad(a0 - 90));
    const x1 = cx + r * Math.cos(rad(a1 - 90));
    const y1 = cy + r * Math.sin(rad(a1 - 90));
    const large = a1 - a0 > 180 ? 1 : 0;
    return [
      `M ${cx} ${cy}`,
      `L ${x0} ${y0}`,
      `A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`,
      "Z"
    ].join(" ");
  }

  return (
    <motion.div
      className="chart-mock-glass"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "linear-gradient(140deg,rgba(30,38,71,0.56),rgba(0,255,194,0.09))",
        borderRadius: 18,
        padding: "1.5rem",
        backdropFilter: "blur(5px)",
        width: size + 44,
        boxShadow: "0 2px 16px #FFD70018, 0 1px 8px #00FFC230"
      }}
    >
      {title && <div style={{ color: "#FFD700", fontWeight: 700, marginBottom: 16, fontSize: 17 }}>{title}</div>}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs.map((arc, i) => (
          <motion.path
            key={arc.label}
            d={describeArc(size / 2, size / 2, size / 2 - 8, arc.a0, arc.a1)}
            fill={arc.color}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{
              opacity: 0.8,
              scale: [0.86, 1],
              transition: { delay: 0.21 + i * 0.07 }
            }}
            style={{
              filter: "drop-shadow(0 0 14px rgba(255,255,255,.26))"
            }}
          />
        ))}
      </svg>
      <div style={{ marginTop: 12 }}>
        {slices.map(s => (
          <div key={s.label} style={{ color: s.color, fontWeight: 500, fontSize: 14.4 }}>
            ● <span style={{ color: "#fff" }}>{s.label}</span>: {s.value}%
          </div>
        ))}
      </div>
    </motion.div>
  );
}

ChartMock.propTypes = {
  slices: PropTypes.array,
  title: PropTypes.string,
  size: PropTypes.number,
};

export default ChartMock;
