import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HaiKind } from "@pai-forge/riichi-mahjong";
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

  // react-native(-web) 実装では、状態はインラインスタイル（色・opacity・transform）で表現される
  it("should apply highlighted styling (yellow border)", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} highlighted />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.getAttribute("style")).toContain("rgb(250, 204, 21)");
  });

  it("should apply selected styling (blue border + lift)", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} selected />);
    const wrapper = container.firstChild as HTMLElement;
    const style = wrapper.getAttribute("style") ?? "";
    expect(style).toContain("rgb(59, 130, 246)");
    expect(style).toContain("translateY(-4px)");
  });

  it("should apply dimmed styling (opacity)", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} dimmed />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.getAttribute("style")).toContain("opacity: 0.5");
  });
});
