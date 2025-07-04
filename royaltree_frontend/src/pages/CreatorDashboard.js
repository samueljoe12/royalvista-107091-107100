import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssetCard from "../components/AssetCard";
import AnimatedCounter from "../components/AnimatedCounter";
import GradientButton from "../components/GradientButton";
import Modal from "../components/Modal";
import TabSwitcher from "../components/TabSwitcher";
import MockAudioPlayer from "../components/MockAudioPlayer";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";
import mockAssets from "../data/mockAssets";

/**
 * CreatorDashboard - Displays the creator's uploaded IP assets and animated statistics.
 * Sections:
 * - Tabbed interface: "All Assets", "Music", future: "Stats/Analytics"
 * - Animated summary stats (earnings, % sold, num assets)
 * - Grid of asset cards built from dummy/mock data module (with music tab only music assets)
 * - Detail Modal: asset drill down (with mock music player for music assets)
 * - Uses glassmorphism, reusable AssetCard, AnimatedCounter, GradientButton
 */

function CreatorDashboard() {
  const navigate = useNavigate();
  // Tabbed view state and modal/asset management
  const [activeTab, setActiveTab] = useState("all");
  const [showDetail, setShowDetail] = useState(false);
  const [detailAsset, setDetailAsset] = useState(null);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [musicAsset, setMusicAsset] = useState(null);
  
  // --- Asset view generation, with dynamic badges, for robust tab switching ---
  // Show "all" or "music" in the current tab
  const rawAssets = mockAssets.map(asset => ({
    ...asset,
    owner: "You",
    badges: [
      <span key={"sold-" + asset.id} className="asset-subtitle" style={{
        background: (asset.badges?.[0]?.style?.background) || "rgba(0,255,194,0.13)",
        color: (asset.badges?.[0]?.style?.color) || "#00FFC2",
        padding: "4px 10px",
        borderRadius: "9px",
        fontWeight: 700,
        fontSize: 13
      }}>
        {Math.round((asset.ownership ?? 0) * 100)}% Sold
      </span>,
      <span key={"earned-" + asset.id}
        style={{
          background: "rgba(255,215,0,0.13)",
          color: "#FFD700",
          padding: "4px 9px",
          borderRadius: "9px",
          fontWeight: 700,
          fontSize: 12
        }}>
        ${asset.stats?.userEarnings?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "0.00"}
        {" "}Earned
      </span>
    ]
  }));

  const assets = rawAssets;
  const assetsMusic = rawAssets.filter(a => typeof a.subtitle === "string" && a.subtitle.toLowerCase().includes("music"));

  // Responsive tab filter: only update metrics & grid content that matches tab
  let filteredAssets = activeTab === "music" ? assetsMusic : assets;

  // --- Metrics: dynamically recalc based on tabbed content only ---
  const totalEarnings = filteredAssets.reduce((sum, asset) => sum + (asset.stats?.userEarnings || 0), 0);
  const soldPercent = filteredAssets.length
    ? filteredAssets.reduce((sum, a) => sum + (a.ownership ?? 0), 0) / filteredAssets.length * 100
    : 0;
  const numAssets = filteredAssets.length;

  // NavBar links (consistency across app)
  // const navLinks = [
  //   { label: "Home", href: "/" },
  //   { label: "Marketplace", href: "/marketplace" },
  //   { label: "Creator", href: "/creator" },
  //   { label: "Investor", href: "/investor" }
  // ];

  // Stats cards: config objects
  const statCards = [
    {
      label: "Total Earnings",
      value: totalEarnings,
      prefix: "$",
      color: "#FFD700",
      decimals: 2,
      icon: "💰"
    },
    {
      label: "% Sold Across Assets",
      value: soldPercent,
      suffix: "%",
      color: "#00FFC2",
      decimals: 1,
      icon: "📊"
    },
    {
      label: "Assets Uploaded",
      value: numAssets,
      color: "#b0afff",
      decimals: 0,
      icon: "🖼️"
    },
  ];

  // Tab options
  const tabOptions = [
    { label: "All Assets", value: "all" },
    { label: "Music", value: "music" },
  ];

  // Render detail modal
  const renderDetailModal = () => (
    <Modal
      open={showDetail}
      onClose={() => { setShowDetail(false); setDetailAsset(null); }}
      maxWidth="480px"
    >
      {detailAsset && (
        <div>
          <h2 style={{ color: "#FFD700", marginBottom: 7 }}>
            {detailAsset.title}
          </h2>
          <img src={detailAsset.image} alt={detailAsset.title} style={{
            width: "85%",
            borderRadius: 14,
            objectFit: "cover",
            maxHeight: 180,
            marginBottom: 13,
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }} />
          <div style={{
            color: "#00FFC2",
            fontWeight: 600,
            fontSize: 15.2,
            marginBottom: 6
          }}>
            {detailAsset.subtitle}
          </div>
          <div style={{ color: "#bab9e3", marginBottom: 6 }}>by {detailAsset.owner}</div>
          <div style={{ marginBottom: 11 }}>
            {detailAsset.badges}
          </div>
          {/* If music type, show mock 'Play Music' button */}
          {typeof detailAsset.subtitle === "string" && detailAsset.subtitle.toLowerCase().includes("music") && (
            <GradientButton
              wide
              style={{marginBottom: 7}}
              icon={<span style={{fontSize:19}}>🎵</span>}
              onClick={() => { setShowMusicModal(true); setMusicAsset(detailAsset); }}
            >Preview Music</GradientButton>
          )}
          <GradientButton
            wide
            style={{ marginTop: 2 }}
            onClick={() => {
              setShowDetail(false);
              setTimeout(() => navigate(`/ip/${detailAsset.id}`), 120);
            }}
          >
            View Details
          </GradientButton>
        </div>
      )}
    </Modal>
  );

  // Music Preview Modal
  const renderMusicModal = () => (
    <Modal
      open={showMusicModal}
      onClose={() => setShowMusicModal(false)}
      maxWidth="355px"
    >
      {musicAsset && (
        <div>
          <MockAudioPlayer
            title={typeof musicAsset.title === "string" ? musicAsset.title : "Music preview"}
            autoPlay={false}
          />
          <GradientButton wide style={{marginTop: 15}} onClick={() => setShowMusicModal(false)}>Close</GradientButton>
        </div>
      )}
    </Modal>
  );

  return (
    <>
      <section className="kavia-container" style={{paddingTop:35,paddingBottom:7,minHeight:160}}>
        <motion.h1 
          className="title"
          style={{
            marginBottom: 2,
            fontSize: "2.34rem",
            fontWeight: 900,
            textAlign: "left"
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Creator Dashboard
        </motion.h1>
        <motion.div
          style={{
            fontSize: 19,
            color: "var(--text-secondary)",
            margin: "2px 0 17px 0",
            maxWidth: 600,
            textAlign: "left"
          }}
          initial={{ opacity: 0, y: 17 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Track your royalty assets, % sold, and revenue. Upload more to grow your portfolio!
        </motion.div>
        {/* Stat Cards Row */}
        <motion.div
          style={{
            display: "flex",
            gap: 31,
            flexWrap: "wrap",
            justifyContent: "start",
            marginBottom: 35,
            marginTop: 9
          }}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              variants={fadeInUp}
              custom={0.09 + i*0.08}
              initial="hidden"
              animate="visible"
              style={{
                minWidth: 205,
                borderRadius: 17,
                background: "linear-gradient(115deg,#181828b0 77%,#FFD70018)",
                boxShadow: "0 2px 18px #FFD70011, 0 1.5px 8px #00FFC214",
                border: i===0 
                  ? "1.2px solid #FFD70055"
                  : (i===1 ? "1.2px solid #00FFC299" : "1.2px solid #b0afff44"),
                padding: "21px 24px 19px 21px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
                marginTop: 0
              }}
            >
              <span style={{
                fontSize: 19,
                color: card.color,
                fontWeight: 700,
                marginBottom: 3
              }}>
                {card.icon} {card.label}
              </span>
              <AnimatedCounter
                value={card.value}
                prefix={card.prefix}
                suffix={card.suffix}
                color={card.color}
                decimals={card.decimals}
                style={{fontSize:34, fontWeight:810, margin:"2px 0"}}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Tabs for asset types (all/music etc) */}
        <div style={{ marginBottom: 14, marginTop: 5 }}>
          <TabSwitcher
            tabs={tabOptions}
            active={activeTab}
            onTabSelect={setActiveTab}
          />
        </div>
        {/* Assets Uploaded Section */}
        <motion.div
          className="scroll-fade-in"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.26}
        >
          <div
            style={{
              fontWeight: 750,
              fontSize: 19,
              color: "#FFD700",
              margin: "0 0 13px 3px",
              textAlign: "left"
            }}
          >
            {activeTab === "music" ? "My Music Assets" : "Uploaded Assets"}
          </div>
          <div className="asset-grid">
            {filteredAssets.length === 0 ? (
              <div style={{
                fontSize: 20,
                color: "#00FFC2AA",
                textAlign: "center",
                width: "100%",
                padding: "2em 0"
              }}>No assets uploaded yet.</div>
            ) : filteredAssets.map((asset, i) => (
              <AssetCard
                key={asset.title + "-" + i}
                {...asset}
                // Modal view for asset details
                onClick={() => { setDetailAsset(asset); setShowDetail(true); }}
              />
            ))}
          </div>
        </motion.div>
        <motion.div
          style={{ marginTop: 36, textAlign: "right", width: "100%" }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.20 }}
        >
          <GradientButton
            onClick={() => window.location.href = "/marketplace"}
            icon={<span style={{fontSize:18}}>＋</span>}
          >
            Upload New Asset (Coming Soon)
          </GradientButton>
        </motion.div>
      </section>

      {/* Asset detail modal */}
      {renderDetailModal()}

      {/* Subview modal for music preview, if any */}
      {renderMusicModal()}
    </>
  );
}

export default CreatorDashboard;
