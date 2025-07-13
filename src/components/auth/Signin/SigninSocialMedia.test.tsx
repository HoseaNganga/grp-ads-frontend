import { render, screen } from "@testing-library/react";
import SigninSocialMedia from "./SigninSocialMedia";
import "@testing-library/jest-dom";

describe("SigninSocialMedia", () => {
  it("renders prompt to sign up", () => {
    render(<SigninSocialMedia />);
    expect(screen.getByText(/Don't have an account yet/i)).toBeInTheDocument();
  });

  it("renders a sign-up link", () => {
    render(<SigninSocialMedia />);
    const link = screen.getByRole("link", { name: /Sign Up/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/auth/signup");
  });
});
