import React, { useState } from "react";
import NavBar from "../components/NavBar";
import AssetCard from "../components/AssetCard";
import ChartMock from "../components/ChartMock";
import GradientButton from "../components/GradientButton";
import Modal from "../components/Modal";
import AnimatedCounter from "../components/AnimatedCounter";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";

// PUBLIC_INTERFACE
/**
 * IPDetail - Detailed view for a single digital asset/IP.
 * Features:
 * - Asset preview with image, title, subtitle, badges and ownership info.
 * - Mocked Royalty Breakdown Chart (ChartMock).
 * - Animated Invest button that pops up animated Modal.
 * - Usage of Royaltree's glassmorphic/gradient style and reusable components.
 * - Fully responsive, scroll-animated, premium feel.
 */
function IPDetail() {
  // Mock asset data (should match cards from Marketplace)
  const asset = {
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
    title: "Gold Soundtrack",
    subtitle: "Music / Song",
    owner: "Alice King",
    badges: [
      <span key="badge1" className="asset-subtitle" style={{
        background: 'rgba(0,255,194,0.12)', padding: '4px 10px', borderRadius: '9px',
        fontWeight: 700, fontSize: 13
      }}>37% Owned</span>,
      <span key="badge2" style={{
        background: 'rgba(255,215,0,0.13)', padding: '4px 9px', borderRadius: '9px',
        fontWeight: 700, fontSize: 12, color: '#FFD700'
      }}>Est. 4.2%/yr</span>,
    ],
    stats: {
      totalRoyalty: 18650.17,
      userOwnership: 0.37,
      userEarnings: 6904.56,
    }
  };

  // Modal state for Invest CTA.
  const [showInvest, setShowInvest] = useState(false);

  // Chart mock data
  const breakdown = [
    { label: "Artist", value: 52, color: "#FFD700" },
    { label: "Label", value: 24, color: "#00FFC2" },
    { label: "Management", value: 11, color: "#62C1FF" },
    { label: "Royalty Fund", value: 13, color: "#FF5B94" }
  ];

  // NavBar links (reuse main app ones)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  return (
    <>
      <NavBar brandName="Royaltree" links={navLinks} />
      <section className="kavia-container" style={{ maxWidth: 970, paddingTop: 40, minHeight: 380 }}>
        <motion.div
          className="scroll-fade-in"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 44,
              alignItems: "flex-start",
              background: "linear-gradient(112deg,#181828b7 65%,#00ffc20a)",
              borderRadius: 26,
              boxShadow: "0 2px 30px #FFD70018, 0 1.5px 13px #00FFC215",
              padding: "44px 24px 34px 24px",
              position: "relative"
            }}
          >
            {/* Asset Preview (left) */}
            <div style={{ maxWidth: 410, margin: "auto" }}>
              <AssetCard
                image={asset.image}
                title={asset.title}
                subtitle={asset.subtitle}
                owner={asset.owner}
                badges={asset.badges}
                footer={
                  <div style={{ marginTop: 8 }}>
                    <div style={{
                      color: "#FFD700",
                      fontWeight: 600,
                      fontSize: 15.8,
                      letterSpacing: 0.01
                    }}>
                      Total Earned Royalties
                    </div>
                    <AnimatedCounter
                      value={asset.stats.totalRoyalty}
                      prefix="$"
                      decimals={2}
                      style={{ fontSize: 28 }}
                    />
                  </div>
                }
                onClick={null}
              />
            </div>
            {/* Asset Details and Action (right) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 29 }}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0.16}
                style={{
                  background: "rgba(0,255,194,0.07)",
                  borderRadius: 15,
                  padding: "26px 22px 17px 22px",
                  boxShadow: "0 2px 12px #FFD70010, 0 2px 10px #00FFC220"
                }}
              >
                <h2 style={{
                  color: "#FFD700", fontWeight: 800, fontSize: 29,
                  margin: 0, letterSpacing: 0.01
                }}>
                  Royalty Breakdown
                </h2>
                <div style={{
                  color: "#B4FEEF",
                  opacity: 0.85,
                  fontWeight: 500,
                  fontSize: 17,
                  marginBottom: 12
                }}>
                  How revenues are distributed for this IP asset
                </div>
                <ChartMock slices={breakdown} size={153} title={null} />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0.34}
                style={{
                  background: "rgba(36,42,64,0.14)",
                  border: "1.1px solid #FFD70033",
                  borderRadius: 13,
                  padding: "18px 18px 11px 18px",
                  boxShadow: "0 1.5px 13px #FFD70018, 0 1px 8px #00FFC220"
                }}
              >
                <div style={{
                  fontWeight: 700,
                  color: "#FFD700",
                  fontSize: 16
                }}>
                  My Ownership
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginTop: 8,
                  marginBottom: 8
                }}>
                  <AnimatedCounter
                    value={asset.stats.userOwnership * 100}
                    suffix="%"
                    decimals={2}
                    color="#00FFC2"
                    style={{
                      fontSize: 25,
                      fontWeight: 700
                    }}
                  />
                  <span style={{
                    color: "#FFD700",
                    fontWeight: 600,
                    fontSize: 18,
                    marginLeft: 5
                  }}>
                    of this asset
                  </span>
                </div>
                <div style={{
                  color: "#ebffee", fontWeight: 500,
                  fontSize: 14, margin: "8px 0"
                }}>
                  My total earnings: <span style={{ color: "#FFD700", fontWeight: 700 }}>${asset.stats.userEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </motion.div>
              {/* Animated Invest Button */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0.44}
                style={{
                  marginTop: 8,
                  textAlign: "center"
                }}
              >
                <GradientButton
                  wide
                  onClick={() => setShowInvest(true)}
                  icon={
                    <span style={{
                      fontSize: 23,
                      filter: "drop-shadow(0 0 7px #FFD70050)"
                    }}>💸</span>
                  }
                >
                  <span style={{
                    fontWeight: 700,
                    letterSpacing: 0.01
                  }}>
                    Invest in this Asset
                  </span>
                </GradientButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Invest modal (animated, glass, reuses Modal component) */}
      <Modal open={showInvest} onClose={() => setShowInvest(false)} maxWidth="390px">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{
            fontWeight: 800,
            fontSize: 21,
            color: "#FFD700",
            textAlign: "center",
            marginBottom: 11
          }}>
            Invest in <span style={{ color: "#00FFC2" }}>{asset.title}</span>
          </div>
          <div style={{
            color: "#fff",
            fontSize: 16,
            opacity: 0.89,
            marginBottom: 14,
            textAlign: "center"
          }}>
            (Investment simulation only. No blockchain or payments. Enter an amount below.)
          </div>
          {/* Simple input form - not functional, mock only */}
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
            disabled
            value=""
            aria-label="Investment amount (mocked)"
          />
          <GradientButton
            wide
            disabled={true}
            onClick={() => null}
          >
            <span style={{
              fontWeight: 700,
              fontSize: 17.5
            }}>
              Confirm Investment (Soon)
            </span>
          </GradientButton>
          <div style={{
            textAlign: "center",
            fontSize: 12.9,
            marginTop: 17,
            color: "#bab9e3",
            fontStyle: "italic"
          }}>
            Live investment and payments coming soon.<br />Contact Royaltree to join early testing!
          </div>
        </motion.div>
      </Modal>
      {/* Responsive fallback: Single column on mobile */}
      <style>
        {`
          @media (max-width: 850px) {
            .kavia-container > .scroll-fade-in {
              display: block !important;
              padding: 26px 7px 20px 7px !important;
              border-radius: 16px !important;
            }
            .kavia-container > .scroll-fade-in > div {
              margin: 0 auto !important;
              max-width: 99vw !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default IPDetail;
