import React, { useState } from "react";
import NavBar from "../components/NavBar";
import AssetCard from "../components/AssetCard";
import ChartMock, { defaultBreakdown } from "../components/ChartMock";
import GradientButton from "../components/GradientButton";
import Modal from "../components/Modal";
import AnimatedCounter from "../components/AnimatedCounter";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";
import mockAssets from "../data/mockAssets";
import MockAudioPlayer from "../components/MockAudioPlayer";

// PUBLIC_INTERFACE
/**
 * IPDetail - Detailed view for a single digital asset/IP.
 * Features:
 *  1. Asset preview (image/audio mock/with type check).
 *  2. Royalty Breakdown Chart using ChartMock and styled placeholder data.
 *  3. Animated Invest button that triggers a glassmorphic investment modal.
 * The design is modern, glassmorphic, uses Royaltree's colors and animations, fully responsive.
 *
 * Data: Uses mockAssets and ChartMock's placeholder breakdown.
 */
function IPDetail() {
  // Demo: Use first asset and branch logic by subtitle (music with "audio", else image).
  const asset = mockAssets[0] || {
    title: "Untitled Asset",
    subtitle: "",
    image: "",
    badges: [],
    owner: "Unknown",
    stats: { totalRoyalty: 0, userOwnership: 0, userEarnings: 0 }
  };
  const [showInvest, setShowInvest] = useState(false);

  // Use subtitle/type to mock image vs. audio preview.
  // If asset.subtitle includes "Music", show an audio mock, else show image.
  // For demo, if mockAssets[0], it's Music / Song, so show audio mock below image.
  const isAudio = typeof asset.subtitle === "string" && asset.subtitle.toLowerCase().includes("music");

  // Royalty breakdown, always ChartMock with demo data.
  const breakdown = defaultBreakdown;

  // NavBar links, consistent with the app.
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
            {/* ASSET PREVIEW (LEFT) */}
            <div style={{ maxWidth: 410, margin: "auto" }}>
              <AssetCard
                image={asset.image}
                title={asset.title}
                subtitle={asset.subtitle}
                owner={asset.owner}
                badges={asset.badges?.map(b => (
                  <span
                    key={b.key + "-detail"}
                    className="asset-subtitle"
                    style={{
                      background: b.style.background,
                      padding: "4px 10px",
                      borderRadius: "9px",
                      fontWeight: 700,
                      fontSize: 13,
                      color: b.style.color
                    }}
                  >
                    {b.text}
                  </span>
                ))}
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
                      value={asset.stats?.totalRoyalty || 0}
                      prefix="$"
                      decimals={2}
                      style={{ fontSize: 28 }}
                    />
                  </div>
                }
                onClick={null}
              />
              {/* Modern Mock Audio Player, only for music/audio assets */}
              {isAudio && (
                <div style={{ marginTop: 22, marginBottom: 1 }}>
                  <MockAudioPlayer
                    title={typeof asset.title === "string" ? asset.title : "Music Preview"}
                    autoPlay={false}
                  />
                </div>
              )}
            </div>
            {/* RIGHT: Royalty Chart, Ownership, Invest */}
            <div style={{ display: "flex", flexDirection: "column", gap: 29 }}>
              {/* Royalty Breakdown Section */}
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
              {/* Ownership and Earnings */}
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
                    value={(asset.stats?.userOwnership || 0) * 100}
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
                  My total earnings: <span style={{ color: "#FFD700", fontWeight: 700 }}>
                    ${asset.stats?.userEarnings?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "0.00"}
                  </span>
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
      {/* Invest Modal - glassmorphic, animated, mocks investment */}
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
            (Investment simulation only&mdash;no blockchain or payments. Enter an amount below.)
          </div>
          {/* Simple input form - disabled for mock */}
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
      {/* Responsive fallback: Single column on mobile/tablet handled via App.css */}
    </>
  );
}

export default IPDetail;
