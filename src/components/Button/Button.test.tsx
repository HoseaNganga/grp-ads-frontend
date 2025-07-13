import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";
import React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "poor"
  | "default"
  | "white"
  | "outline";

type Size = "xs" | "xxs" | "sm" | "md" | "lg" | "xl" | "xl2";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.getByAltText("loading_Spinner")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-200 text-gray-500 cursor-not-allowed");
  });

  const variantTests: [Variant, string][] = [
    ["primary", "bg-blue-500 text-white hover:bg-blue-800"],
    ["secondary", "bg-gray-200 text-gray-500 hover:bg-gray-300"],
    ["danger", "bg-red-600 text-white hover:bg-red-700"],
    ["success", "bg-green-200 text-green-500"],
    ["poor", "bg-orange-200 text-orange-400"],
    ["default", "hover:bg-gray-200 text-gray-700"],
    ["white", "bg-white hover:bg-gray-100 text-gray-700 border-2"],
    ["outline", "hover:bg-gray-100 text-gray-700 border"],
  ];

  it.each(variantTests)(
    "applies %s variant classes correctly",
    (variant, expectedClasses) => {
      render(<Button variant={variant}>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClasses);
    }
  );

  const sizeTests: [Size, string][] = [
    ["xs", "px-2 py-2 text-sm w-20"],
    ["xxs", "px-0.5 py-1 text-[8px] w-10"],
    ["sm", "px-3 py-2.5 text-sm w-24"],
    ["md", "px-6 py-3.5 text-base w-32"],
    ["lg", "px-4 py-2 text-lg w-44 lg:w-52"],
    ["xl", "px-10 py-3 text-xl w-80 md:w-96"],
    ["xl2", "px-10 py-4 text-xl w-80 md:w-96"],
  ];

  it.each(sizeTests)(
    "applies %s size classes correctly",
    (size, expectedClasses) => {
      render(<Button size={size}>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClasses);
    }
  );

  it("applies custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<Button icon={<TestIcon />}>With Icon</Button>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it.each(["button", "submit", "reset"] as const)(
    "sets button type to %s",
    (type) => {
      render(<Button type={type}>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", type);
    }
  );

  it("is disabled when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-200 text-gray-500 cursor-not-allowed");
  });

  it("forwards ref to button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
