import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import AssetCard from "../components/AssetCard";
import ChartMock, { defaultBreakdown } from "../components/ChartMock";
import GradientButton from "../components/GradientButton";
import AnimatedCounter from "../components/AnimatedCounter";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";
import mockAssets from "../data/mockAssets";
import MockAudioPlayer from "../components/MockAudioPlayer";
import InvestModal from "../components/InvestModal";

/**
 * PUBLIC_INTERFACE
 * IPDetail - Detailed view for a single digital asset/IP.
 * Reads assetId from :id route param, loads matching mock asset. Displays full detail.
 */
function IPDetail() {
  const { id } = useParams();
  // Find the asset in mockAssets with the id, fallback to the first asset
  const asset = mockAssets.find(a => a.id === id) || mockAssets[0] || {
    title: "Untitled Asset",
    subtitle: "",
    image: "",
    badges: [],
    owner: "Unknown",
    stats: { totalRoyalty: 0, userOwnership: 0, userEarnings: 0 }
  };
  const [showInvest, setShowInvest] = useState(false);

  const isAudio = typeof asset.subtitle === "string" && asset.subtitle.toLowerCase().includes("music");

  const breakdown = defaultBreakdown;

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
                onClick={() => {}} // Doesn't do anything on detail page
              />
              {/* Modern Mock Audio Player, only for music/audio assets */}
              {isAudio && (
                <div
                  style={{
                    marginTop: 24,
                    marginBottom: 6,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MockAudioPlayer
                    title={typeof asset.title === "string" ? asset.title : "Music Preview"}
                    autoPlay={false}
                  />
                  <div
                    style={{
                      marginLeft: 16,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      minWidth: 40,
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        color: "#FFD700",
                        fontWeight: 700,
                        fontSize: 14.5,
                        background: "rgba(255,215,0,0.09)",
                        borderRadius: 8,
                        padding: "5px 13px",
                        letterSpacing: 0.01,
                        boxShadow: "0 1px 7px #FFD70018",
                      }}
                    >
                      Music Preview
                    </span>
                    <span
                      style={{
                        color: "#bab9e3",
                        fontWeight: 500,
                        fontSize: 12.5,
                        opacity: 0.72,
                        marginTop: 1.5,
                        fontStyle: "italic",
                      }}
                    >
                      Player is a simulation only
                    </span>
                  </div>
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
      <InvestModal
        open={showInvest}
        onClose={() => setShowInvest(false)}
        asset={asset}
        mockDefaultAmount={250}
      />
      {/* Responsive fallback: Single column on mobile/tablet handled via App.css */}
    </>
  );
}

export default IPDetail;
