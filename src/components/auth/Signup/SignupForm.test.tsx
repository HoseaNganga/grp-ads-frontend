import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "./SignupForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    signup: jest.fn(),
    isLoading: false,
  }),
}));

describe("SignupForm", () => {
  it("renders step 1 fields and handles 'Next' interaction", async () => {
    const setStep = jest.fn();

    render(<SignupForm step={1} setStep={setStep} />);

    await userEvent.type(screen.getByPlaceholderText("First Name"), "Jane");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "jane@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "StrongPassword123"
    );

    const interestRadio = screen.getByLabelText("Music");
    await userEvent.click(interestRadio);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Next/i })).toBeEnabled();
    });

    await userEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(setStep).toHaveBeenCalledWith(2);
  });
});
