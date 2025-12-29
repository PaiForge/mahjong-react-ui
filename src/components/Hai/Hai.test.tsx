import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HaiKind } from "riichi-mahjong";
import { Hai } from "./Hai";

describe("Hai", () => {
  it("should render a manzu tile", () => {
    render(<Hai hai={HaiKind.ManZu1} />);
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("should render a pinzu tile", () => {
    render(<Hai hai={HaiKind.PinZu5} />);
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("should render a souzu tile", () => {
    render(<Hai hai={HaiKind.SouZu9} />);
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("should render a jihai tile", () => {
    render(<Hai hai={HaiKind.Chun} />);
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(<Hai hai={HaiKind.ManZu1} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(HaiKind.ManZu1);
  });

  it("should apply highlighted class", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} highlighted />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("ring-yellow-400");
  });

  it("should apply selected class", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} selected />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("ring-blue-500");
  });

  it("should apply dimmed class", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} dimmed />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("opacity-50");
  });
});
