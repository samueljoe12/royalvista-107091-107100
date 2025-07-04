import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import NavBar from "../components/NavBar";
import GradientButton from "../components/GradientButton";
import AssetCard from "../components/AssetCard";

// PUBLIC_INTERFACE
/**
 * LandingPage - Modern animated Royaltree hero section.
 * Features animated gradient heading, intro text, CTA buttons, and mock animated AssetCards.
 */
function LandingPage() {
  // Dummy asset card data for animated grid
  const assetMocks = [
    {
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
      title: "Gold Soundtrack",
      subtitle: "Music / Song",
      owner: "Alice King",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.12)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:12}}>37% Owned</span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.13)',padding:'4px 9px',borderRadius:'9px',fontWeight:700, fontSize:11, color:'#FFD700'}}>Est. 4.2%/yr</span>
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=600&q=80",
      title: "Arcane Art Piece",
      subtitle: "Visual Art",
      owner: "Carlos Wu",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.13)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:12}}>20% Owned</span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.11)',padding:'4px 9px',borderRadius:'9px',fontWeight:700, fontSize:11, color:'#FFD700'}}>Est. 2.1%/yr</span>
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&w=600&q=80",
      title: "Futurist Novel",
      subtitle: "Literature",
      owner: "Morgan Lee",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.11)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:12}}>12% Owned</span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.14)',padding:'4px 9px',borderRadius:'9px',fontWeight:700, fontSize:11, color:'#FFD700'}}>Est. 6.7%/yr</span>
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=600&q=80",
      title: "Pop Single Rights",
      subtitle: "Music / Rights",
      owner: "Devon Green",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{background:'rgba(0,255,194,0.13)',padding:'4px 10px',borderRadius:'9px',fontWeight:700,fontSize:12}}>49% Owned</span>,
        <span key="badge2" style={{background:'rgba(255,215,0,0.11)',padding:'4px 9px',borderRadius:'9px',fontWeight:700, fontSize:11, color:'#FFD700'}}>Est. 3.1%/yr</span>
      ]
    }
  ];

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.94, ease: [0.48,0.24,0.23,1], staggerChildren: 0.11 } }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 34, scale:0.93 },
    visible: { opacity: 1, y: 0, scale:1, transition: { duration: 0.84, delay: 0.09, ease: [0.66,0.13,0.35,0.99] } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 17 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.63, delay: 0.16 } }
  };

  const btnVariants = {
    hidden: { opacity: 0, y: 17, scale: 0.93 },
    visible: i => ({
      opacity: 1, y: 0, scale: 1, transition: { duration: 0.44 + i*0.11, delay: 0.21 + i*0.08 }
    })
  };

  const assetGridVariants = {
    hidden: { opacity: 0, y: 44, scale:0.97 },
    visible: { opacity: 1, y: 0, scale:1, transition: { duration: 0.86, delay: 0.18 } }
  };

  // Section animation hooks
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // NavBar links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  return (
    <>
      <NavBar brandName="Royaltree" links={navLinks} />
      {/* Animated Hero Section */}
      <section className="kavia-container" style={{paddingTop:36,paddingBottom:7}}>
        <motion.div
          className="hero-gradient-bg"
          variants={heroVariants}
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
            variants={headingVariants}
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
            variants={textVariants}
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
          >
            <motion.div custom={0} variants={btnVariants}>
              <GradientButton
                onClick={() => window.location.href = "/marketplace"}
                wide
              >
                Explore Marketplace
              </GradientButton>
            </motion.div>
            <motion.div custom={1} variants={btnVariants}>
              <GradientButton
                onClick={() => window.location.href = "/creator"}
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
          variants={assetGridVariants}
          initial="hidden"
          animate={controls}
        >
          {assetMocks.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 37, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.25 + i*0.13, duration: 0.77 }}
              style={{display:"flex"}}
            >
              <AssetCard {...asset} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default LandingPage;
