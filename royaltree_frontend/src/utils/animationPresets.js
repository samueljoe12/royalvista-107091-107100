import { Variants } from "framer-motion";

/**
 * Centralized animation presets for Framer Motion across the Royaltree app.
 * Use these for page transitions, fade-ins, counters, hero animations, card hovers, etc.
 */

// PUBLIC_INTERFACE
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.55, 0, 0.26, 1] } },
  exit:    { opacity: 0, y: -26, scale: 0.96, transition: { duration: 0.38, ease: [0.48, 0.17, 0.26, 1] } }
};

// PUBLIC_INTERFACE
export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { delay, duration: 0.65, ease: [0.61, 0.17, 0.38, 0.97] }
  }),
};

// PUBLIC_INTERFACE
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { delay, duration: 0.6, ease: [0.41, 0.09, 0.32, 0.92] }
  }),
};

// PUBLIC_INTERFACE
export const growIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay, duration: 0.52, ease: [0.51, 0.11, 0.37, 0.93] }
  })
};

// PUBLIC_INTERFACE
export const cardHover = {
  hover: {
    scale: 1.064,
    boxShadow: "0 4px 36px #FFD70044, 0 1.5px 14px #00FFC277",
    filter: "drop-shadow(0 0 19px #FFD70080)",
    transition: { type: "spring", stiffness: 340, damping: 27 }
  }
};
