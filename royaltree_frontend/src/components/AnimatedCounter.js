import React from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * AnimatedCounter - Animated number counter with neon styling.
 * @param {number} value Final value to animate to
 * @param {number} duration Duration of animation in seconds
 * @param {string} prefix String before number (e.g. "$")
 * @param {string} suffix String after number (e.g. "%")
 * @param {string} color Text neon color
 * @param {number} decimals Number of decimal places
 * @param {object} style Additional CSS styles
 */
function AnimatedCounter({ value, duration = 1.6, prefix = "", suffix = "", color = '#FFD700', decimals = 0, style = {} }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 140, damping: 19 });
  const display = useTransform(spring, latest =>
    `${prefix}${Number(latest).toFixed(decimals)}${suffix}`
  );

  React.useEffect(() => {
    motionVal.set(0); // Reset for repeat anim
    const timeout = setTimeout(() => motionVal.set(value), 90);
    return () => clearTimeout(timeout);
  }, [value, motionVal]);

  React.useEffect(() => {
    const controls = spring.set(value);
    return () => controls && controls.stop && controls.stop();
  }, [value, spring]);

  return (
    <motion.span
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 32,
        fontWeight: 800,
        color: color,
        textShadow: `0 0 6px ${color}, 0 1px 20px #222d`,
        ...style
      }}
    >
      {display}
    </motion.span>
  );
}

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  color: PropTypes.string,
  decimals: PropTypes.number,
  style: PropTypes.object,
};

export default AnimatedCounter;
