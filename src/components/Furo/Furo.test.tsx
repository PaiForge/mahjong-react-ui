import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HaiKind, MentsuType, FuroType, Tacha } from "@pai-forge/riichi-mahjong";
import { Furo } from "./Furo";
import { BackImage } from "../../assets/tiles";

/** 描画された牌のうち裏向き（HaiBack）の枚数を数える */
const countBackTiles = (container: HTMLElement): number =>
  Array.from(container.querySelectorAll("img")).filter(
    (img) => img.getAttribute("src") === BackImage,
  ).length;

describe("Furo", () => {
  it("should render a chi from kamicha", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Shuntsu,
          hais: [HaiKind.ManZu1, HaiKind.ManZu2, HaiKind.ManZu3],
        }}
        furo={{ type: FuroType.Chi, from: Tacha.Kamicha }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(3);
  });

  it("should render a pon from toimen", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Koutsu,
          hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
        }}
        furo={{ type: FuroType.Pon, from: Tacha.Toimen }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(3);
  });

  it("should render a daiminkan from shimocha as an open meld (no back tiles)", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Kantsu,
          hais: [HaiKind.Haku, HaiKind.Haku, HaiKind.Haku, HaiKind.Haku],
        }}
        furo={{ type: FuroType.Daiminkan, from: Tacha.Shimocha }}
      />,
    );
    expect(container.querySelectorAll("img").length).toBe(4);
    expect(countBackTiles(container)).toBe(0);
  });

  it("should render a kakan as an open meld (no back tiles)", () => {
    // 加槓は明槓（16符）。暗槓と誤って裏向きで描画してはならない（回帰テスト）
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Kantsu,
          hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
        }}
        furo={{ type: FuroType.Kakan, from: Tacha.Toimen }}
      />,
    );
    expect(container.querySelectorAll("img").length).toBe(4);
    expect(countBackTiles(container)).toBe(0);
  });

  it("should render an ankan with two back tiles", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Kantsu,
          hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
        }}
      />,
    );
    expect(container.querySelectorAll("img").length).toBe(4);
    expect(countBackTiles(container)).toBe(2);
  });
});
