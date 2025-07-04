import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InvestorDashboard from "./InvestorDashboard";
import mockAssets from "../data/mockAssets";
import mockTransactions from "../data/mockTransactions";

describe("InvestorDashboard", () => {
  test("renders and switches between tabs 'My Assets' and 'Transactions'", () => {
    render(<InvestorDashboard />);
    const assetsTab = screen.getByRole("button", { name: /My Assets/i });
    const txTab = screen.getByRole("button", { name: /Transactions/i });

    expect(assetsTab).toBeInTheDocument();
    expect(txTab).toBeInTheDocument();

    // Default is "My Assets" tab with owned assets
    mockAssets.slice(0, 3).forEach(asset => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
    });

    // Switch to transactions tab
    fireEvent.click(txTab);
    mockTransactions.forEach(tx => {
      expect(screen.getByText(tx.asset)).toBeInTheDocument();
    });

    // Assets should not display
    mockAssets.forEach(asset => {
      expect(screen.queryByText(asset.title)).not.toBeInTheDocument();
    });

    // Switch back to assets
    fireEvent.click(assetsTab);
    mockAssets.slice(0, 3).forEach(asset => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
    });
  });

  test("opens and closes asset detail modal from asset card", async () => {
    render(<InvestorDashboard />);
    const asset = mockAssets[0];
    // Click asset card
    const assetCard = screen.getByText(asset.title).closest("div.asset-card-glass");
    expect(assetCard).toBeInTheDocument();

    fireEvent.click(assetCard);
    await waitFor(() => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
      expect(screen.getByText(/View Details/i)).toBeInTheDocument();
    });

    // Close modal by clicking the close button
    const closeBtn = screen.getByRole("button", { name: /Close Modal/i });
    fireEvent.click(closeBtn);
    await waitFor(() =>
      expect(screen.queryByText(asset.title)).not.toBeInTheDocument()
    );
  });

  test("opens and closes music preview modal from detail modal for music asset", async () => {
    render(<InvestorDashboard />);
    const musicAsset = mockAssets.find(
      a => typeof a.subtitle === "string" && a.subtitle.toLowerCase().includes("music")
    );
    fireEvent.click(screen.getByText(musicAsset.title).closest("div.asset-card-glass"));
    await waitFor(() => screen.getByText("Preview Music"));

    // Open music modal by clicking "Preview Music" button
    fireEvent.click(screen.getByRole("button", { name: /Preview Music/i }));
    await waitFor(() =>
      expect(screen.getByText(/Demo Track|Music preview|Gold Soundtrack/)).toBeInTheDocument()
    );

    // Close it (button label is "Close")
    const closeBtn = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeBtn);
    await waitFor(() =>
      expect(screen.queryByText(/Demo Track|Music preview|Gold Soundtrack/)).not.toBeInTheDocument()
    );
  });

  test("opens and closes InvestModal when 'Invest More' button is clicked", async () => {
    render(<InvestorDashboard />);
    // Find the first "Invest More" button
    const investBtn = screen.getAllByRole("button", { name: /Invest More/i })[0];
    fireEvent.click(investBtn);
    await waitFor(() => {
      expect(screen.getByText(/Invest in/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Investment amount/i)).toBeInTheDocument();
    });

    // Close the modal (Done button appears after "investment", but close X should always be there)
    const closeModalBtn = screen.getByRole("button", { name: /Close Modal/i });
    fireEvent.click(closeModalBtn);
    await waitFor(() =>
      expect(screen.queryByText(/Invest in/i)).not.toBeInTheDocument()
    );
  });
});
