import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatorDashboard from "./CreatorDashboard";
import mockAssets from "../data/mockAssets";

describe("CreatorDashboard", () => {
  test("renders tab switcher and can switch between 'All Assets' and 'Music'", () => {
    render(<CreatorDashboard />);
    expect(screen.getByText(/Creator Dashboard/i)).toBeInTheDocument();
    const allTab = screen.getByRole("button", { name: /All Assets/i });
    const musicTab = screen.getByRole("button", { name: /Music/i });
    expect(allTab).toBeInTheDocument();
    expect(musicTab).toBeInTheDocument();

    // Initially shows all assets
    mockAssets.forEach(asset => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
    });

    // Click Music tab, only music assets should display
    fireEvent.click(musicTab);
    // Only assets with "music" in subtitle
    const musicAssets = mockAssets.filter(a =>
      typeof a.subtitle === "string" && a.subtitle.toLowerCase().includes("music")
    );
    musicAssets.forEach(asset => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
    });
    // Non-music assets should not be visible
    mockAssets
      .filter(a => !a.subtitle.toLowerCase().includes("music"))
      .forEach(asset => {
        expect(screen.queryByText(asset.title)).not.toBeInTheDocument();
      });

    // Switch back to All Assets and see all again
    fireEvent.click(allTab);
    mockAssets.forEach(asset => {
      expect(screen.getByText(asset.title)).toBeInTheDocument();
    });
  });

  test("opens and closes asset detail modal when asset card is clicked", async () => {
    render(<CreatorDashboard />);
    const asset = mockAssets[0];
    // Click asset card by title
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
    await waitFor(() => {
      // Modal content is removed
      expect(screen.queryByText(asset.title)).not.toBeInTheDocument();
    });
  });

  test("opens music modal from detail modal for music asset", async () => {
    render(<CreatorDashboard />);
    const musicAsset = mockAssets.find(a =>
      typeof a.subtitle === "string" && a.subtitle.toLowerCase().includes("music")
    );
    // Open detail modal for music asset
    fireEvent.click(screen.getByText(musicAsset.title).closest("div.asset-card-glass"));
    await waitFor(() => screen.getByText("Preview Music"));

    // Open music modal by clicking "Preview Music" button
    fireEvent.click(screen.getByRole("button", { name: /Preview Music/i }));
    await waitFor(() =>
      expect(screen.getByText(/Demo Track|Music preview|Gold Soundtrack/)).toBeInTheDocument()
    );

    // Close music modal by clicking "Close" button
    const closeBtn = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeBtn);
    await waitFor(() =>
      expect(screen.queryByText(/Demo Track|Music preview|Gold Soundtrack/)).not.toBeInTheDocument()
    );
  });
});
