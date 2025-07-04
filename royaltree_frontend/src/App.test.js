import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders CreatorDashboard and InvestorDashboard routes without crashing", () => {
  // Test CreatorDashboard route
  render(
    <MemoryRouter initialEntries={["/creator"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Creator Dashboard/i)).toBeInTheDocument();

  // Test InvestorDashboard route
  render(
    <MemoryRouter initialEntries={["/investor"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Investor Dashboard/i)).toBeInTheDocument();
});
