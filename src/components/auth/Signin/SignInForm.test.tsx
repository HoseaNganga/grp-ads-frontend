import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "../Signin/SigninForm";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/authStore", () => ({
  useAuthStore: jest.fn(),
}));

describe("SignInForm", () => {
  const push = jest.fn();
  const login = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useAuthStore as jest.Mock).mockReturnValue({
      login,
      isLoading: false,
    });
  });

  it("renders input fields and button", () => {
    render(<SignInForm />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByText(/enter a valid email/i);
    await screen.findByText(/password must be at least 6 characters/i);
  });

  it("calls login and navigates on successful submit", async () => {
    login.mockResolvedValueOnce({}); 

    render(<SignInForm />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "Password123!",
      });
      expect(toast.success).toHaveBeenCalledWith("Login successful!");
      expect(push).toHaveBeenCalledWith("/home");
    });
  });

  it("shows error toast on login failure", async () => {
    login.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(<SignInForm />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
