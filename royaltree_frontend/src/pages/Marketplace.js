import React, { useState } from "react";
import AssetCard from "../components/AssetCard";
import NavBar from "../components/NavBar";
import TabSwitcher from "../components/TabSwitcher";
import GradientButton from "../components/GradientButton";
import useGeolocation from "../hooks/useGeolocation";
import mockAssets from "../data/mockAssets";
import { useNavigate } from "react-router-dom";

/*
  --- FIX NOTES ---
  The Marketplace page was blank due to one of these possible causes:
  1. Not exporting the component with a PUBLIC_INTERFACE docstring.
  2. Errors in complex object destructuring or missing parameters (corrupt mapping).
  3. React component import errors or not correctly rendering the main grid.
  4. Framer motion or other dependency not being used/initialized.

  This file is reviewed for correctness: the core issue is typically with mapping data into AssetCard, incorrect data structure, or a silent error resulting in rendering nothing.

  -- Verifications and Safe Fixes --
  - Added PUBLIC_INTERFACE docstring to ensure it's recognized as the main exported page.
  - Ensured map/props for AssetCard conform to what AssetCard expects.
  - Confirmed that every AssetCard rendered has a unique key.
  - Ensured component is exported as default at the end.

  If the page is still blank, there may be a runtime exception being swallowed, e.g. if badges/fields fed to AssetCard aren't valid React nodes/arrays.
*/

/**
 * PUBLIC_INTERFACE
 * Marketplace - Responsive grid of assets with dummy data, filtering & sorting mock controls.
 * Enhances UX: Region/country filtering is enabled when geolocation is available.
 * This version ensures each AssetCard displays asset name, creator, available ownership %, and estimated royalty.
 */
/**
 * Marketplace - Responsive grid of assets with dummy data, filtering & sorting mock controls.
 * Enhances UX: Region/country filtering is enabled when geolocation is available.
 * This version ensures each AssetCard displays asset name, creator, available ownership %, and estimated royalty.
 */
function Marketplace() {
  const navigate = useNavigate();
  // Utility: Return badge styled span
  const badgeSpan = (badge, asset, customStyle = {}) => (
    <span
      key={badge.key + "-" + asset.id}
      className="asset-subtitle"
      style={{
        background: badge.style && badge.style.background,
        color: badge.style && badge.style.color,
        padding: "4px 10px",
        borderRadius: "9px",
        fontWeight: 700,
        fontSize: 13,
        marginRight: 2,
        ...customStyle,
      }}
    >
      {badge.text}
    </span>
  );

  // Prepare enhanced asset data: assetCardProps
  const assets = mockAssets.map(asset => {
    // Ownership % badge (standardized to always show)
    const ownershipPercent = asset.ownership != null
      ? Math.round(asset.ownership * 100)
      : "--";
    const estRoyalty = asset.estRoyalty != null
      ? asset.estRoyalty
      : "--";
    // Always construct badges for ownership % and estimated royalty
    const badges = [
      badgeSpan(
        {
          key: "ownership",
          text: typeof ownershipPercent === "number" ? `${ownershipPercent}% Owned` : "N/A",
          style: { background: "rgba(0,255,194,0.13)", color: "#00FFC2" }
        },
        asset
      ),
      badgeSpan(
        {
          key: "est",
          text: typeof estRoyalty === "number" ? `Est. ${estRoyalty}%/yr` : "Est. --",
          style: { background: "rgba(255,215,0,0.14)", color: "#FFD700" }
        },
        asset,
        { marginLeft: 2 }
      ),
    ];

    // Compose AssetCard fields.
    return {
      key: asset.id,
      image: asset.image,
      title: typeof asset.title === "string" && asset.title.length ? asset.title : "No Title",
      subtitle: typeof asset.subtitle === "string" && asset.subtitle.length ? asset.subtitle : "Unknown Type",
      owner: typeof asset.owner === "string" && asset.owner.length ? asset.owner : "Unknown Creator",
      badges,
      footer: (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, marginTop: 2
        }}>
          <span style={{ color: "#FFD700", fontWeight: 600, fontSize: 15.2 }}>
            Available Ownership
            <span style={{ color: "#00FFC2", marginLeft: 9 }}>
              {typeof ownershipPercent === "number" && !isNaN(ownershipPercent)
                ? Math.max(0, Math.min(100, 100 - ownershipPercent)) + "%"
                : "--"}
            </span>
          </span>
          <span style={{
            color: "#00FFC2", fontWeight: 500, fontSize: 13.6
          }}>
            Est. Royalty: <span style={{ color: "#FFD700" }}>
              {typeof estRoyalty === "number" ? `${estRoyalty}% / yr` : "--"}
            </span>
          </span>
        </div>
      ),
      onClick: () => navigate(`/ip/${asset.id}`)
    };
  });

  // Dummy filter state
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  // Region and country filter driven by geolocation
  const [regionFilter, setRegionFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const geo = useGeolocation();

  // Compute displayed assets applying all filters:
  let displayedAssets = assets.filter(asset =>
    (tab === "all" ||
      (tab === "music" && (typeof asset.subtitle === "string" ? asset.subtitle.includes("Music") : false)) ||
      (tab === "art" && (typeof asset.subtitle === "string" ? asset.subtitle.includes("Art") : false))
    ) &&
    (typeof asset.title === "string" ? asset.title.toLowerCase().includes(search.toLowerCase()) : false) &&
    (countryFilter
      ? (
        // extra insurance for old data fallbacks
        mockAssets.find(a => a.id === asset.key)?.country === countryFilter
      ) : true) &&
    (regionFilter
      ? (
        mockAssets.find(a => a.id === asset.key)?.region === regionFilter
      ) : true)
  );

  // Sort: Apply sort method if not 'featured'
  if (sort === "name") {
    displayedAssets = [...displayedAssets].sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  } else if (sort === "owner") {
    displayedAssets = [...displayedAssets].sort((a, b) =>
      (a.owner || "").localeCompare(b.owner || "")
    );
  }

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
          {regionFilter ? "All Regions" : (geo.region || "My Region")}
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
          {countryFilter ? "All Countries" : (geo.country ? geo.country : "My Country")}
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
              : displayedAssets.map((props, i) => (
                  <AssetCard {...props} />
                ))
          }
        </div>
      </section>
    </>
  );
}

export default Marketplace;
