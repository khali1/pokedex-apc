import { render, screen, fireEvent } from "@testing-library/react";
import TypeTag from "./TypeTag";
import { useRouter } from "next/navigation";

// Mock SVG imports
jest.mock("./typeIcons", () => ({
  typeIcons: {
    fire: () => "FireIcon",
    water: () => "WaterIcon",
    grass: () => "GrassIcon",
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("TypeTag", () => {
  it("renders type name and icon correctly", () => {
    render(<TypeTag type="fire" />);
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("FireIcon")).toBeInTheDocument();
  });

  it("navigates to browse with type filter when clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    render(<TypeTag type="water" />);
    fireEvent.click(screen.getByText("water"));

    expect(mockPush).toHaveBeenCalledWith("/browse/?type=water");
  });

  it("calls onXClick when provided instead of navigating", () => {
    const onXClick = jest.fn();
    render(<TypeTag type="grass" onXClick={onXClick} />);

    fireEvent.click(screen.getByText("grass"));

    expect(onXClick).toHaveBeenCalledWith("grass");
  });

  it("returns null when no type is provided", () => {
    const { container } = render(<TypeTag type="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
