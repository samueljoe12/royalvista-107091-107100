import React from "react";
import NavBar from "../components/NavBar";
import AssetCard from "../components/AssetCard";
import AnimatedCounter from "../components/AnimatedCounter";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationPresets";

// PUBLIC_INTERFACE
/**
 * InvestorDashboard - Displays user's owned assets, animated stats for projected returns,
 * and a mocked transaction history. Uses AssetCard, AnimatedCounter, and glassmorphic styling.
 */
function InvestorDashboard() {
  // Mock owned asset data (static example)
  const ownedAssets = [
    {
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
      title: "Gold Soundtrack",
      subtitle: "Music / Song",
      owner: "Alice King",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{
          background: 'rgba(0,255,194,0.13)',
          padding: '4px 10px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 13
        }}>
          37% Owned
        </span>,
        <span key="badge2" style={{
          background: 'rgba(255,215,0,0.10)',
          padding: '4px 9px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 12,
          color: '#FFD700'
        }}>
          Est. 4.2%/yr
        </span>,
      ],
      footer: (
        <div>
          <div style={{
            color: "#FFD700",
            fontWeight: 600,
            fontSize: 15.5,
            letterSpacing: 0.01
          }}>
            Projected Returns
          </div>
          <AnimatedCounter
            value={2984.21}
            prefix="$"
            decimals={2}
            color="#FFD700"
            style={{ fontSize: 21, marginTop: 2 }}
          />
        </div>
      )
    },
    {
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=600&q=80",
      title: "Arcane Art Piece",
      subtitle: "Visual Art",
      owner: "Carlos Wu",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{
          background: 'rgba(0,255,194,0.09)',
          padding: '4px 10px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 13
        }}>
          20% Owned
        </span>,
        <span key="badge2" style={{
          background: 'rgba(255,215,0,0.11)',
          padding: '4px 9px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 12,
          color: '#FFD700'
        }}>
          Est. 2.1%/yr
        </span>,
      ],
      footer: (
        <div>
          <div style={{
            color: "#FFD700",
            fontWeight: 600,
            fontSize: 15.5,
            letterSpacing: 0.01
          }}>
            Projected Returns
          </div>
          <AnimatedCounter
            value={784.12}
            prefix="$"
            decimals={2}
            color="#FFD700"
            style={{ fontSize: 21, marginTop: 2 }}
          />
        </div>
      )
    },
    {
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&w=600&q=80",
      title: "Futurist Novel",
      subtitle: "Literature",
      owner: "Morgan Lee",
      badges: [
        <span key="badge1" className="asset-subtitle" style={{
          background: 'rgba(0,255,194,0.17)',
          padding: '4px 10px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 13
        }}>
          12% Owned
        </span>,
        <span key="badge2" style={{
          background: 'rgba(255,215,0,0.09)',
          padding: '4px 9px',
          borderRadius: '9px',
          fontWeight: 700,
          fontSize: 12,
          color: '#FFD700'
        }}>
          Est. 6.7%/yr
        </span>,
      ],
      footer: (
        <div>
          <div style={{
            color: "#FFD700",
            fontWeight: 600,
            fontSize: 15.5,
            letterSpacing: 0.01
          }}>
            Projected Returns
          </div>
          <AnimatedCounter
            value={332.86}
            prefix="$"
            decimals={2}
            color="#FFD700"
            style={{ fontSize: 21, marginTop: 2 }}
          />
        </div>
      )
    },
  ];

  // Mock transaction history (simple static)
  const transactions = [
    {
      date: "2024-05-04",
      type: "Purchase",
      asset: "Gold Soundtrack",
      amount: 2100,
      details: "37% ownership",
      color: "#FFD700"
    },
    {
      date: "2024-04-18",
      type: "Royalty",
      asset: "Gold Soundtrack",
      amount: 122.40,
      details: "Q1 Royalty Payout",
      color: "#00FFC2"
    },
    {
      date: "2024-04-10",
      type: "Purchase",
      asset: "Futurist Novel",
      amount: 140,
      details: "12% ownership",
      color: "#FFD700"
    },
    {
      date: "2024-03-29",
      type: "Royalty",
      asset: "Arcane Art Piece",
      amount: 31.18,
      details: "Quarterly Payout",
      color: "#00FFC2"
    }
  ];

  // Overall animated stats
  const totalInvested = 2100 + 140;
  const estAnnualReturn = 1127.5;
  const assetsCount = ownedAssets.length;

  // NavBar links reused for consistency
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  return (
    <>
      <NavBar brandName="Royaltree" links={navLinks} />
      <section className="kavia-container" style={{ paddingTop: 36, paddingBottom: 12, minHeight: 180 }}>
        <motion.h1
          className="title"
          style={{
            marginBottom: 4,
            fontSize: "2.2rem",
            fontWeight: 900,
            textAlign: "left"
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Investor Dashboard
        </motion.h1>
        <motion.div
          style={{
            fontSize: 18,
            color: "var(--text-secondary)",
            margin: "2px 0 17px 0",
            maxWidth: 590,
            textAlign: "left"
          }}
          initial={{ opacity: 0, y: 11 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.10 }}
        >
          Track your digital IP assets, see last transactions, and monitor simulated projected returns.
        </motion.div>
        {/* Stat Cards */}
        <motion.div
          style={{
            display: "flex",
            gap: 25,
            flexWrap: "wrap",
            justifyContent: "start",
            marginBottom: 34,
            marginTop: 7
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeInUp}
            custom={0.06}
            initial="hidden"
            animate="visible"
            style={{
              minWidth: 190,
              borderRadius: 17,
              background: "linear-gradient(115deg,#181828b0 77%,#FFD70018)",
              boxShadow: "0 2px 18px #FFD70011, 0 1.5px 8px #00FFC214",
              border: "1.15px solid #FFD70070",
              padding: "21px 24px 19px 21px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 7
            }}
          >
            <span style={{
              fontSize: 17,
              color: "#FFD700",
              fontWeight: 700,
              marginBottom: 2
            }}>
              💸 Total Invested
            </span>
            <AnimatedCounter
              value={totalInvested}
              prefix="$"
              decimals={2}
              color="#FFD700"
              style={{ fontSize: 27, fontWeight: 810, margin: "2px 0" }}
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            custom={0.14}
            initial="hidden"
            animate="visible"
            style={{
              minWidth: 190,
              borderRadius: 17,
              background: "linear-gradient(117deg,#1d1f28b0 77%,#00FFC219)",
              boxShadow: "0 2px 18px #FFD70009, 0 1.5px 8px #00FFC220",
              border: "1.19px solid #00FFC299",
              padding: "21px 24px 19px 21px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 7
            }}
          >
            <span style={{
              fontSize: 17,
              color: "#00FFC2",
              fontWeight: 700,
              marginBottom: 2
            }}>
              📈 Est. Yearly Returns
            </span>
            <AnimatedCounter
              value={estAnnualReturn}
              prefix="$"
              decimals={2}
              color="#00FFC2"
              style={{ fontSize: 27, fontWeight: 810, margin: "2px 0" }}
            />
          </motion.div>
          <motion.div
            variants={fadeInUp}
            custom={0.18}
            initial="hidden"
            animate="visible"
            style={{
              minWidth: 150,
              borderRadius: 17,
              background: "linear-gradient(118deg,#171720b7 77%,#FFD70012)",
              boxShadow: "0 2px 18px #FFD70015, 0 1.5px 8px #00FFC211",
              border: "1.14px solid #b0afff44",
              padding: "21px 20px 19px 17px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 7
            }}
          >
            <span style={{
              fontSize: 17,
              color: "#b0afff",
              fontWeight: 700,
              marginBottom: 2
            }}>
              🎨 # Assets
            </span>
            <AnimatedCounter
              value={assetsCount}
              decimals={0}
              color="#b0afff"
              style={{ fontSize: 27, fontWeight: 810, margin: "2px 0" }}
            />
          </motion.div>
        </motion.div>
        {/* Owned Assets Section */}
        <motion.div
          className="scroll-fade-in"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          <div
            style={{
              fontWeight: 750,
              fontSize: 19,
              color: "#FFD700",
              margin: "0 0 12px 3px",
              textAlign: "left"
            }}
          >
            Owned Assets
          </div>
          <div className="asset-grid">
            {ownedAssets.length === 0 ? (
              <div style={{
                fontSize: 20,
                color: "#00FFC2AA",
                textAlign: "center",
                width: "100%",
                padding: "2em 0"
              }}>No owned assets yet.</div>
            ) : ownedAssets.map((asset, i) => (
              <AssetCard key={asset.title + "-" + i} {...asset} />
            ))}
          </div>
        </motion.div>
        {/* Transaction History */}
        <motion.div
          className="scroll-fade-in"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.36}
          style={{
            marginTop: 38,
            background: "linear-gradient(113deg,#181828a7 35%,#FFD70007 100%)",
            borderRadius: 19,
            boxShadow: "0 2px 28px #FFD70009, 0 1.5px 6px #00FFC220",
            padding: "23px 12px 16px 12px",
            overflowX: "auto"
          }}
        >
          <div style={{
            fontWeight: 700,
            fontSize: 17,
            color: "#FFD700",
            margin: "0 0 11px 0",
            textAlign: "left"
          }}>Transaction History</div>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#fff",
            fontSize: 15.1,
            minWidth: 320
          }}>
            <thead>
              <tr style={{ borderBottom: "1.1px solid #FFD70022" }}>
                <th style={{ textAlign: "left", paddingBottom: 8, color: "#FFD70099", fontWeight: 600 }}>Date</th>
                <th style={{ textAlign: "left", paddingBottom: 8, color: "#FFD70099", fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: "left", paddingBottom: 8, color: "#FFD70099", fontWeight: 600 }}>Asset</th>
                <th style={{ textAlign: "right", paddingBottom: 8, color: "#FFD70099", fontWeight: 600 }}>Amount</th>
                <th style={{ textAlign: "left", paddingBottom: 8, color: "#FFD70099", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} style={{
                  background: i % 2 === 0 ? "rgba(32,32,64,0.13)" : "transparent"
                }}>
                  <td style={{ padding: "6px 0", color: "#bab9e3" }}>{tx.date}</td>
                  <td style={{ padding: "6px 0", color: tx.color, fontWeight: 700 }}>{tx.type}</td>
                  <td style={{ padding: "6px 0" }}>{tx.asset}</td>
                  <td style={{ padding: "6px 0", color: "#FFD700", textAlign: "right" }}>{tx.type === "Purchase" ? <>-${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</> : <>+${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</>}</td>
                  <td style={{ padding: "6px 0", color: "#b0afff" }}>{tx.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div style={{
              marginTop: 14,
              textAlign: "center",
              color: "#00FFC2CC",
              fontSize: 16
            }}>No transactions yet.</div>
          )}
        </motion.div>
      </section>
      {/* Responsive adjustment for mobile/tablet */}
      <style>
        {`
          @media (max-width: 950px) {
            .asset-grid {
              grid-template-columns: 1fr !important;
              gap: 18px 2vw !important;
              padding: 0 5vw 18px 5vw !important;
            }
            .kavia-container {
              padding: 13px !important;
            }
          }
          @media (max-width: 650px) {
            .asset-grid {
              padding: 0 2vw 10px 2vw !important;
              gap: 12px !important;
            }
            .kavia-container {
              padding: 9px !important;
            }
            table {
              font-size: 14px !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default InvestorDashboard;
