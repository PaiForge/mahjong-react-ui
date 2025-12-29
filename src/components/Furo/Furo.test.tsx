import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HaiKind, MentsuType, FuroType, Tacha } from "riichi-mahjong";
import { Furo } from "./Furo";

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

  it("should render a daiminkan from shimocha", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Kantsu,
          hais: [HaiKind.Haku, HaiKind.Haku, HaiKind.Haku, HaiKind.Haku],
        }}
        furo={{ type: FuroType.Daiminkan, from: Tacha.Shimocha }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(4);
  });

  it("should render an ankan with back tiles", () => {
    const { container } = render(
      <Furo
        mentsu={{
          type: MentsuType.Kantsu,
          hais: [HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu, HaiKind.Hatsu],
        }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(4);
  });
});
