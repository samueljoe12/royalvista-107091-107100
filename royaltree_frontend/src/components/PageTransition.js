import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransitionVariants } from "../utils/animationPresets";

/**
 * PUBLIC_INTERFACE
 * PageTransition - Wraps content and applies global page enter/exit transition.
 * Use this at the routing level for seamless cross-page animation.
 *
 * @param {React.ReactNode} children
 * @param {string} [className]
 */
function PageTransition({ children, className = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "page"}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
