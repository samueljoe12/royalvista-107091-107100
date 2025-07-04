import React from "react";
import NavBar from "../components/NavBar";
import AssetCard from "../components/AssetCard";
import AnimatedCounter from "../components/AnimatedCounter";
import GradientButton from "../components/GradientButton";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";

// PUBLIC_INTERFACE
/**
 * CreatorDashboard - Displays the creator's uploaded IP assets and animated statistics.
 * Sections:
 * - Animated summary stats (earnings, % sold, num assets)
 * - Grid of asset cards (mock data)
 * - Uses glassmorphism, reusable AssetCard, AnimatedCounter, GradientButton
 */
function CreatorDashboard() {
  // Mock stats and asset data (dummy, static for now)
  const stats = {
    totalEarnings: 29857.31,
    soldPercent: 71.3,
    numAssets: 4,
  };

  // Dummy uploaded assets (could be shared with other pages for realism)
  const assets = [
    {
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
      title: "Gold Soundtrack",
      subtitle: "Music / Song",
      owner: "You",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.16)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:13}}>
          87% Sold
        </span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.13)',padding:'4px 9px',borderRadius:'9px',fontWeight:700,fontSize:12,color:'#FFD700'}}>
          $13,642.90 Earned
        </span>,
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=600&q=80",
      title: "Arcane Art Piece",
      subtitle: "Visual Art",
      owner: "You",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.13)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:13}}>
          65% Sold
        </span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.12)',padding:'4px 9px',borderRadius:'9px',fontWeight:700,fontSize:12,color:'#FFD700'}}>
          $5,981.12 Earned
        </span>,
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&w=600&q=80",
      title: "Futurist Novel",
      subtitle: "Literature",
      owner: "You",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.11)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:13}}>
          73% Sold
        </span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.11)',padding:'4px 9px',borderRadius:'9px',fontWeight:700,fontSize:12,color:'#FFD700'}}>
          $7,180.22 Earned
        </span>,
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=600&q=80",
      title: "Pop Single Rights",
      subtitle: "Music / Rights",
      owner: "You",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.14)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:13}}>
          60% Sold
        </span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.10)',padding:'4px 9px',borderRadius:'9px',fontWeight:700,fontSize:12,color:'#FFD700'}}>
          $3,053.07 Earned
        </span>,
      ]
    },
  ];

  // NavBar links (consistency across app)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  // Stats cards: config objects
  const statCards = [
    {
      label: "Total Earnings",
      value: stats.totalEarnings,
      prefix: "$",
      color: "#FFD700",
      decimals: 2,
      icon: "💰"
    },
    {
      label: "% Sold Across Assets",
      value: stats.soldPercent,
      suffix: "%",
      color: "#00FFC2",
      decimals: 1,
      icon: "📊"
    },
    {
      label: "Assets Uploaded",
      value: stats.numAssets,
      color: "#b0afff",
      decimals: 0,
      icon: "🖼️"
    },
  ];

  // Animation variants are now imported from animationPresets.js

  return (
    <>
      <NavBar brandName="Royaltree" links={navLinks} />
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
            marginBottom: 38,
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
            Uploaded Assets
          </div>
          <div className="asset-grid">
            {assets.length === 0 ? (
              <div style={{
                fontSize: 20,
                color: "#00FFC2AA",
                textAlign: "center",
                width: "100%",
                padding: "2em 0"
              }}>No assets uploaded yet.</div>
            ) : assets.map((asset, i) => (
              <AssetCard key={asset.title + "-" + i} {...asset} />
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
      {/* Responsive mobile adjustment */}
      {/* (App-wide responsive styles are now handled globally in App.css) */}
    </>
  );
}

export default CreatorDashboard;
