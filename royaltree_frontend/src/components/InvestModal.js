import React, { useState } from "react";
import Modal from "./Modal";
import AnimatedCounter from "./AnimatedCounter";
import GradientButton from "./GradientButton";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * InvestModal - Modal for simulating an investment with animated confirmation (dummy flow).
 * Shows an animated counter for invested amount and a mock transaction result state.
 * @param {boolean} open - Modal visibility
 * @param {function} onClose - Close callback
 * @param {object} asset - { title, image, ... }
 * @param {number} [mockDefaultAmount] - Default amount to show for dummy UX
 */
function InvestModal({ open, onClose, asset, mockDefaultAmount = 250 }) {
  // State: has submission/confirmation, animate invested counter only on confirm
  const [stage, setStage] = useState("form"); // form | confirming | success
  const [amount, setAmount] = useState(mockDefaultAmount);

  // Reset stage upon modal (re-)opening
  React.useEffect(() => {
    if (open) {
      setStage("form");
      setAmount(mockDefaultAmount);
    }
  }, [open, mockDefaultAmount]);

  const onConfirm = () => {
    setStage("confirming");
    setTimeout(() => setStage("success"), 1400);
  };

  // Inner modal content by stage
  return (
    <Modal open={open} onClose={onClose} maxWidth="385px">
      <AnimatePresence mode="wait" initial={false}>
        {stage === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.21 }}
          >
            <div style={{
              fontWeight: 800,
              fontSize: 20.9,
              color: "#FFD700",
              textAlign: "center",
              marginBottom: 11
            }}>
              Invest in <span style={{ color: "#00FFC2" }}>{asset?.title || "Asset"}</span>
            </div>
            <div style={{
              color: "#fff",
              fontSize: 15.6,
              opacity: 0.88,
              marginBottom: 14,
              textAlign: "center"
            }}>
              (Simulation only. Enter an amount to invest in this asset.)
            </div>
            <input
              type="number"
              placeholder="Amount (USD)"
              min="25"
              step="1"
              style={{
                width: "100%",
                padding: "13px 12px",
                fontSize: 16.3,
                color: "#FFD700",
                background: "rgba(0,255,194,0.08)",
                border: "1px solid #FFD70033",
                borderRadius: 8,
                marginBottom: 19,
                outline: "none"
              }}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              aria-label="Investment amount"
            />
            <GradientButton wide disabled={!amount || amount < 25}
              onClick={onConfirm}
            >
              <span style={{
                fontWeight: 700,
                fontSize: 17.5
              }}>
                Confirm Investment
              </span>
            </GradientButton>
            <div style={{
              textAlign: "center",
              fontSize: 12.7,
              marginTop: 15,
              color: "#bab9e3",
              fontStyle: "italic"
            }}>
              No payment is processed.<br />UX demo only.
            </div>
          </motion.div>
        )}
        {stage === "confirming" && (
          <motion.div
            key="confirming"
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.21 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ color: "#FFD700", fontWeight: 800, fontSize: 20, marginBottom: 11 }}>
              Processing Investment...
            </div>
            <div style={{ margin: "17px 0" }}>
              <AnimatedCounter
                value={amount}
                prefix="$"
                duration={1.3}
                color="#FFD700"
                style={{ fontSize: 41, fontWeight: 900 }}
              />
            </div>
            <div style={{
              marginTop: 7,
              color: "#bab9e3",
              fontSize: 13
            }}>
              Simulating smart contract confirmation.
            </div>
          </motion.div>
        )}
        {stage === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              color: "#00FFC2",
              fontWeight: 800,
              fontSize: 23,
              marginBottom: 7
            }}>
              Investment Confirmed!
            </div>
            <div style={{ margin: "16px 0 10px 0" }}>
              <AnimatedCounter
                value={amount}
                prefix="$"
                duration={0.9}
                color="#FFD700"
                style={{ fontSize: 36, fontWeight: 900 }}
              />
              <span style={{
                display: "block",
                marginTop: 4,
                color: "#FFD700",
                fontWeight: 700,
                fontSize: 16.4
              }}>
                invested in<br />
                <span style={{ color: "#00FFC2" }}>{asset?.title || "Asset"}</span>
              </span>
            </div>
            <GradientButton wide onClick={onClose}>
              Done
            </GradientButton>
            <div style={{
              marginTop: 14,
              fontSize: 12.3,
              color: "#bab9e3",
              fontStyle: "italic"
            }}>
              (Mock transaction, not a real investment.)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

InvestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.object,
  mockDefaultAmount: PropTypes.number
};

export default InvestModal;
