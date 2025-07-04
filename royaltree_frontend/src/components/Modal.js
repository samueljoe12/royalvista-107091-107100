import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * Modal - Animated glassmorphic modal. Closes on esc and background click.
 * @param {boolean} open Is the modal open
 * @param {Function} onClose Callback for closing the modal
 * @param {React.Component} children Modal content
 * @param {string} maxWidth CSS max-width for dialog
 */
function Modal({ open, onClose, children, maxWidth = "420px" }) {
  // Handle escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "rgba(16,22,30,0.62)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={onClose}
        >
          <motion.div
            className="modal-dialog-glass"
            initial={{ y: "-60px", opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 45, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 370, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(110deg,rgba(34,38,55,0.83),rgba(43,36,32,0.37))",
              boxShadow: "0 8px 40px #071B26cc, 0 1px 8px #FFD70044",
              borderRadius: 20,
              border: "1.5px solid rgba(0,255,194,0.22)",
              padding: "2.4rem 2rem 2rem 2rem",
              color: "#FFF",
              minWidth: "300px",
              maxWidth,
              width: "100%",
              position: "relative"
            }}
          >
            <button
              aria-label="Close Modal"
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                background: "rgba(44,44,64,0.23)",
                border: "none",
                color: "#fff",
                fontSize: 18,
                borderRadius: "50%",
                width: 36,
                height: 36,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={onClose}
            >×</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
};

export default Modal;
