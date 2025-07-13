import { render, screen, fireEvent } from "@testing-library/react";
import HeaderIcons from "./HeaderIcons";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/authStore", () => ({
  useAuthStore: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(max-width: 400px)",
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});

describe("HeaderIcons", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useAuthStore as jest.Mock).mockReturnValue({
      logout: mockLogout,
      user: { first_name: "John" },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders greeting and toggles menu", () => {
    render(<HeaderIcons />);

    const menuIcon = screen.getByTestId("menu-toggle");

    fireEvent.click(menuIcon);

    expect(screen.getByText(/Hello John/i)).toBeInTheDocument();

    const logoutButton = screen.getByRole("button");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });
});
