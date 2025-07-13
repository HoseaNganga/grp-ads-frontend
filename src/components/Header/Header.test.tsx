/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */

import { render, screen } from "@testing-library/react";
import Header from "./Header";
import React, { ReactNode, ImgHTMLAttributes } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("./HeaderIcons", () => () => (
  <div data-testid="header-icons">Icons</div>
));

describe("Header", () => {
  it("renders logo image and text", () => {
    render(<Header />);

    const logo = screen.getByAltText("GrpAds Logo");
    expect(logo).toBeInTheDocument();

    expect(screen.getByText("GrpAds")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /GrpAds/i });
    expect(link).toHaveAttribute("href", "/welcome");
  });

  it("renders HeaderIcons component", () => {
    render(<Header />);
    expect(screen.getByTestId("header-icons")).toBeInTheDocument();
  });
});
