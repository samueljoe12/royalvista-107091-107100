//
// Mock IP asset data with realistic sample content, used by dashboards & marketplace across the app.
//

// All images are public Unsplash sample URLs for demo purposes.
const mockAssets = [
  {
    id: 'asset-001',
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
    title: "Gold Soundtrack",
    subtitle: "Music / Song",
    owner: "Alice King",
    region: "California",
    country: "US",
    estRoyalty: 4.2,
    ownership: 0.37,
    badges: [
      { key: "ownership", text: "37% Owned", style: { background: "rgba(0,255,194,0.12)", color: "#00FFC2" } },
      { key: "est", text: "Est. 4.2%/yr", style: { background: "rgba(255,215,0,0.13)", color: "#FFD700" } }
    ],
    stats: {
      totalRoyalty: 18650.17,
      userOwnership: 0.37,
      userEarnings: 6904.56
    }
  },
  {
    id: 'asset-002',
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&w=600&q=80",
    title: "Arcane Art Piece",
    subtitle: "Visual Art",
    owner: "Carlos Wu",
    region: "Berlin",
    country: "DE",
    estRoyalty: 2.1,
    ownership: 0.20,
    badges: [
      { key: "ownership", text: "20% Owned", style: { background: "rgba(0,255,194,0.13)", color: "#00FFC2" } },
      { key: "est", text: "Est. 2.1%/yr", style: { background: "rgba(255,215,0,0.11)", color: "#FFD700" } }
    ],
    stats: {
      totalRoyalty: 10038.40,
      userOwnership: 0.20,
      userEarnings: 2010.12
    }
  },
  {
    id: 'asset-003',
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&w=600&q=80",
    title: "Futurist Novel",
    subtitle: "Literature",
    owner: "Morgan Lee",
    region: "Seoul",
    country: "KR",
    estRoyalty: 6.7,
    ownership: 0.12,
    badges: [
      { key: "ownership", text: "12% Owned", style: { background: "rgba(0,255,194,0.11)", color: "#00FFC2" } },
      { key: "est", text: "Est. 6.7%/yr", style: { background: "rgba(255,215,0,0.14)", color: "#FFD700" } }
    ],
    stats: {
      totalRoyalty: 7845.70,
      userOwnership: 0.12,
      userEarnings: 940.23
    }
  },
  {
    id: 'asset-004',
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=600&q=80",
    title: "Pop Single Rights",
    subtitle: "Music / Rights",
    owner: "Devon Green",
    region: "California",
    country: "US",
    estRoyalty: 3.1,
    ownership: 0.49,
    badges: [
      { key: "ownership", text: "49% Owned", style: { background: "rgba(0,255,194,0.13)", color: "#00FFC2" } },
      { key: "est", text: "Est. 3.1%/yr", style: { background: "rgba(255,215,0,0.11)", color: "#FFD700" } }
    ],
    stats: {
      totalRoyalty: 9121.90,
      userOwnership: 0.49,
      userEarnings: 3715.30
    }
  },
  {
    id: 'asset-005',
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&w=600&q=80",
    title: "Street Photography Collection",
    subtitle: "Photography",
    owner: "Eva Silver",
    region: "Berlin",
    country: "DE",
    estRoyalty: 2.9,
    ownership: 0.35,
    badges: [
      { key: "ownership", text: "35% Owned", style: { background: "rgba(0,255,194,0.11)", color: "#00FFC2" } },
      { key: "est", text: "Est. 2.9%/yr", style: { background: "rgba(255,215,0,0.12)", color: "#FFD700" } }
    ],
    stats: {
      totalRoyalty: 5431.32,
      userOwnership: 0.35,
      userEarnings: 834.78
    }
  }
];

// Exports
export default mockAssets;
