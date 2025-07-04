import React, { useState } from "react";
import AssetCard from "../components/AssetCard";
import NavBar from "../components/NavBar";
import TabSwitcher from "../components/TabSwitcher";
import GradientButton from "../components/GradientButton";
import useGeolocation from "../hooks/useGeolocation";
import mockAssets from "../data/mockAssets";

/**
 * Marketplace - Responsive grid of assets with dummy data, filtering & sorting mock controls.
 * Enhances UX: Region/country filtering is enabled when geolocation is available.
 */
function Marketplace() {
  // Load from mockAssets for all asset rendering
  const assets = mockAssets.map(asset => ({
    ...asset,
    badges: asset.badges.map(b => (
      <span
        key={b.key + "-" + asset.id}
        className="asset-subtitle"
        style={{
          background: b.style.background,
          padding: "4px 10px",
          borderRadius: "9px",
          fontWeight: 700,
          fontSize: 12,
          color: b.style.color
        }}
      >
        {b.text}
      </span>
    ))
  }));

  // Dummy filter state
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  // Region and country filter driven by geolocation
  const [regionFilter, setRegionFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const geo = useGeolocation();

  // Compute displayed assets applying all filters:
  const displayedAssets = assets
    .filter(asset =>
      (tab === "all" || (tab === "music" && asset.subtitle.includes("Music")) || (tab === "art" && asset.subtitle.includes("Art"))) &&
      asset.title.toLowerCase().includes(search.toLowerCase()) &&
      (countryFilter ? asset.country === countryFilter : true) &&
      (regionFilter ? (asset.region && asset.region === regionFilter) : true)
    );

  // NavBar links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creator", href: "/creator" },
    { label: "Investor", href: "/investor" }
  ];

  let regionFilterUI = null;
  if (geo && !geo.loading && !geo.error && (geo.city || geo.region || geo.country)) {
    regionFilterUI = (
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: 8 }}>
        <button
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: regionFilter ? "2px solid #FFD700" : "1.2px solid #FFD70044",
            fontSize: 14.2,
            fontWeight: 600,
            background: regionFilter ? "#FFD70022" : "rgba(31,34,44,0.51)",
            color: "#FFD700",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={() => setRegionFilter(regionFilter ? "" : geo.region)}
          title={geo.region ? "Assets in your region" : undefined}
        >
          {regionFilter ? "All Regions" : (geo.region || "My&nbsp;Region")}
        </button>
        <button
          style={{
            padding: "7px 12px",
            borderRadius: 8,
            border: countryFilter ? "2px solid #00FFC2" : "1.2px solid #00FFC244",
            fontSize: 14.2,
            fontWeight: 600,
            background: countryFilter ? "#00FFC215" : "rgba(31,44,44,0.13)",
            color: "#00FFC2",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={() => setCountryFilter(countryFilter ? "" : geo.country)}
          title={geo.country ? "Assets in your country" : undefined}
        >
          {countryFilter ? "All Countries" : (geo.country ? geo.country : "My&nbsp;Country")}
        </button>
      </div>
    );
  }

  return (
    <>
      <NavBar brandName="Royaltree" links={navLinks} geoData={geo} />
      <section className="kavia-container" style={{paddingTop:38,paddingBottom:9,minHeight:120}}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          marginBottom: 12
        }}>
          <h1 className="title" style={{
            margin: 0,
            fontSize: "2.1rem",
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: "0.01em"
          }}>
            Marketplace
          </h1>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 13,
            alignItems: "center"
          }}>
            <TabSwitcher
              tabs={[
                { label: "All", value: "all" },
                { label: "Music", value: "music" },
                { label: "Art", value: "art" }
              ]}
              active={tab}
              onTabSelect={setTab}
            />
            <select
              style={{
                background: "rgba(31,34,44,0.61)",
                color: "#FFD700",
                border: "1px solid #FFD70044",
                borderRadius: 9,
                fontWeight: 600,
                fontSize: 15,
                padding: "9px 15px",
                outline: "none",
                marginLeft: 9,
                transition: "all 0.19s"
              }}
              value={sort}
              aria-label="Sort assets"
              onChange={e => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="name">Name (A-Z)</option>
              <option value="owner">Owner</option>
            </select>
            <input
              type="search"
              placeholder="Search assets…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                marginLeft: 9,
                borderRadius: 8,
                border: "none",
                background: "rgba(32,30,54,0.30)",
                color: "#fff",
                padding: "10px 13px",
                fontSize: 15,
                outline: "none",
                minWidth: 110
              }}
            />
            {regionFilterUI}
            <GradientButton
              style={{marginLeft:9,minWidth:90}}
              disabled={true}
            >
              Filter
            </GradientButton>
          </div>
        </div>
        <div style={{
          color: "var(--text-secondary)",
          fontSize: 18,
          margin: "8px 0 22px 0",
          opacity: .82
        }}>
          Browse digital assets available for fractional ownership and simulated royalty sharing.
        </div>
        {/* Responsive asset grid */}
        <div className="asset-grid scroll-fade-in">
          {geo.loading
            ? <div style={{
                  fontSize: 19,
                  color: "#FFD700bb",
                  textAlign: "center",
                  width: "100%",
                  padding: "2em 0"
                }}>Loading region&#8230;</div>
            : displayedAssets.length === 0
              ? <div style={{
                  fontSize: 20,
                  color: "#00FFC2AA",
                  textAlign: "center",
                  width: "100%",
                  padding: "2em 0"
                }}>No assets found.</div>
              : displayedAssets.map((asset, i) => (
                  <AssetCard key={asset.title + "-" + i} {...asset} />
                ))
          }
        </div>
      </section>
    </>
  );
}

export default Marketplace;
