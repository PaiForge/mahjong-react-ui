import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HaiKind } from "@pai-forge/riichi-mahjong";
import type * as ReactNative from "react-native";

// react-native-web の Image は alt を <img> に載せない（アクセシビリティ用の
// <img alt=""> を別に描く）ため、ここでは Image を素の <img> に差し替えて
// 「Hai が Image に何を渡すか」だけを検証する。Web アプリ側の shim
// （react-native → <img>）はこの props をそのまま属性にする。
vi.mock("react-native", async (importOriginal) => {
  const actual = await importOriginal<typeof ReactNative>();
  return {
    ...actual,
    Image: ({
      source,
      alt,
    }: {
      readonly source: string | { readonly uri: string };
      readonly alt?: string;
    }) => (
      <img src={typeof source === "string" ? source : source.uri} alt={alt} />
    ),
  };
});

import { Hai } from "./Hai";

describe("Hai の alt", () => {
  it("既定で牌の名前になる", () => {
    render(<Hai hai={HaiKind.ManZu1} />);
    expect(screen.getByAltText("一萬")).toBeInTheDocument();
  });

  it("alt を渡せばそれを使う", () => {
    render(<Hai hai={HaiKind.Ton} alt="場風" />);
    expect(screen.getByAltText("場風")).toBeInTheDocument();
  });

  it("空文字を渡せば装飾扱い（読み上げない）にできる", () => {
    const { container } = render(<Hai hai={HaiKind.Ton} alt="" />);
    expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
  });
});
