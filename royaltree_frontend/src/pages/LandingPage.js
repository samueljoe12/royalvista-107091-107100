import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import GradientButton from "../components/GradientButton";
import AssetCard from "../components/AssetCard";
import mockAssets from "../data/mockAssets";
import {
  fadeInUp,
  fadeIn,
  growIn
} from "../utils/animationPresets";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * LandingPage - Modern animated Royaltree hero section.
 * Features animated gradient heading, intro text, CTA buttons, and mock animated AssetCards.
 */
function LandingPage({ geoData }) {
  const navigate = useNavigate();

  // Modal/playback state for mock audio feedback
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [lastPlayed, setLastPlayed] = React.useState(null);

  // Use the first four mockAssets as showcase in the landing page grid
  const assetMocks = mockAssets.slice(0, 4).map((asset, idx) => ({
    image: asset.image,
    title: asset.title,
    subtitle: asset.subtitle,
    owner: asset.owner,
    badges: asset.badges?.map((b, i) =>
      <span
        key={`badge-${b.key}-${asset.id}`}
        className="asset-subtitle"
        style={{
          background: b.style?.background, color: b.style?.color,
          padding: '4px 10px', borderRadius: '9px',
          fontWeight: 700, fontSize: 12, marginRight: 3
        }}
      >{b.text}</span>
    ),
    onClick: () => navigate(`/ip/${asset.id}`),
    audioDemo: typeof asset.subtitle === "string" && asset.subtitle.toLowerCase().includes("music"),
    onAudioDemoClick: typeof asset.subtitle === "string" && asset.subtitle.toLowerCase().includes("music")
      ? (() => {
          setAudioPlaying(true);
          setLastPlayed(asset.title);
          setTimeout(() => setAudioPlaying(false), 1000);
        })
      : undefined,
  }));

  // Section animation hooks
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <>
      {/* Hero Section */}
      <section className="kavia-container" style={{paddingTop:36,paddingBottom:7}}>
        <motion.div
          className="hero-gradient-bg"
          variants={growIn}
          initial="hidden"
          animate={controls}
          ref={ref}
          style={{
            maxWidth: 770,
            margin: "0 auto 22px auto",
            boxShadow: "0 2px 36px #FFD70024,0 1px 7px #00FFC248"
          }}
        >
          <motion.h1
            className="hero-title"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.09}
            style={{
              background: "linear-gradient(105deg, #FFD700 16%, #00FFC2 70%, #fff 110%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 900,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "2.7rem",
              lineHeight: "1.19",
              marginBottom: 18,
              textShadow: "0 0 14px #FFD70033"
            }}
          >
            Powering the <span style={{whiteSpace:"nowrap"}}>Future of IP</span> Ownership
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="subtitle"
            style={{
              fontSize: 20,
              color: "var(--text-secondary)",
              maxWidth: 590,
              margin: "0 auto 22px auto",
              textShadow: "0 1px 12px #FFD70018"
            }}
          >
            Royaltree lets you co-own music, books, and creative works. Fractionalize, invest, and track earnings as creative assets generate royalties in a futuristic, animated marketplace experience.
          </motion.div>
          {/* CTA Buttons */}
          <motion.div
            style={{
              display: "flex",
              gap: 22,
              justifyContent: "center",
              marginTop: 18,
              flexWrap: "wrap"
            }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.19}
          >
            <motion.div variants={growIn} custom={0.26} initial="hidden" animate="visible">
              <GradientButton
                onClick={() => navigate("/marketplace")}
                wide
              >
                Explore Marketplace
              </GradientButton>
            </motion.div>
            <motion.div variants={growIn} custom={0.32} initial="hidden" animate="visible">
              <GradientButton
                onClick={() => navigate("/creator")}
                wide
                icon={<span style={{fontSize:19}}>★</span>}
              >
                Become a Creator
              </GradientButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      {/* Animated Asset Cards Grid */}
      <section>
        <motion.div
          className="asset-grid"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.15}
        >
          {assetMocks.map((asset, i) => (
            <motion.div
              key={asset.title}
              variants={growIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.22 + i*0.13}
              style={{display:"flex"}}
            >
              <AssetCard
                {...asset}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Mock audio playback notification */}
        {audioPlaying && (
          <div
            style={{
              position: "fixed",
              bottom: 33,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #FFD700ea, #00FFC2c7)",
              color: "#191937",
              borderRadius: 12,
              boxShadow: "0 4px 32px #FFD70033",
              fontWeight: 700,
              fontSize: 17,
              padding: "13px 27px",
              zIndex: 3001,
              opacity: 1,
              animation: "fadein-up .5s both"
            }}
            aria-live="polite"
          >
            Mock audio: Playing "{lastPlayed}"...
          </div>
        )}
      </section>
    </>
  );
}

export default LandingPage;
