//
// Mock transactions for display in dashboards or detail views.
//

const mockTransactions = [
  {
    id: 'tx-001',
    date: "2024-05-04",
    type: "Purchase",
    asset: "Gold Soundtrack",
    assetId: "asset-001",
    amount: 2100,
    details: "37% ownership",
    color: "#FFD700"
  },
  {
    id: 'tx-002',
    date: "2024-04-18",
    type: "Royalty",
    asset: "Gold Soundtrack",
    assetId: "asset-001",
    amount: 122.40,
    details: "Q1 Royalty Payout",
    color: "#00FFC2"
  },
  {
    id: 'tx-003',
    date: "2024-04-10",
    type: "Purchase",
    asset: "Futurist Novel",
    assetId: "asset-003",
    amount: 140,
    details: "12% ownership",
    color: "#FFD700"
  },
  {
    id: 'tx-004',
    date: "2024-03-29",
    type: "Royalty",
    asset: "Arcane Art Piece",
    assetId: "asset-002",
    amount: 31.18,
    details: "Quarterly Payout",
    color: "#00FFC2"
  }
];

export default mockTransactions;
