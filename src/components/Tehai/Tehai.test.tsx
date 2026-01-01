import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HaiKind, MentsuType, FuroType, Tacha } from "@pai-forge/riichi-mahjong";
import { Tehai } from "./Tehai";

describe("Tehai", () => {
  it("should render closed hand tiles", () => {
    const { container } = render(
      <Tehai
        tehai={{
          closed: [
            HaiKind.ManZu1,
            HaiKind.ManZu2,
            HaiKind.ManZu3,
            HaiKind.PinZu4,
            HaiKind.PinZu5,
            HaiKind.PinZu6,
            HaiKind.SouZu7,
            HaiKind.SouZu8,
            HaiKind.SouZu9,
            HaiKind.Ton,
            HaiKind.Ton,
            HaiKind.Haku,
            HaiKind.Haku,
          ],
          exposed: [],
        }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(13);
  });

  it("should render tsumo tile separately", () => {
    const { container } = render(
      <Tehai
        tehai={{
          closed: [HaiKind.ManZu1, HaiKind.ManZu2, HaiKind.ManZu3],
          exposed: [],
        }}
        tsumo={HaiKind.Chun}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(4);
  });

  it("should render exposed melds", () => {
    const { container } = render(
      <Tehai
        tehai={{
          closed: [
            HaiKind.ManZu1,
            HaiKind.ManZu2,
            HaiKind.ManZu3,
            HaiKind.Haku,
            HaiKind.Haku,
          ],
          exposed: [
            {
              type: MentsuType.Koutsu,
              hais: [HaiKind.Chun, HaiKind.Chun, HaiKind.Chun],
              furo: { type: FuroType.Pon, from: Tacha.Kamicha },
            },
          ],
        }}
      />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(8); // 5 closed + 3 exposed
  });

  it("should handle tile clicks", () => {
    const handleClick = vi.fn();
    render(
      <Tehai
        tehai={{
          closed: [HaiKind.ManZu1, HaiKind.ManZu2],
          exposed: [],
        }}
        onHaiClick={handleClick}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const firstButton = buttons[0];
    if (firstButton !== undefined) {
      fireEvent.click(firstButton);
    }

    expect(handleClick).toHaveBeenCalledWith(HaiKind.ManZu1, 0);
  });

  it("should show selected tiles", () => {
    const { container } = render(
      <Tehai
        tehai={{
          closed: [HaiKind.ManZu1, HaiKind.ManZu2, HaiKind.ManZu3],
          exposed: [],
        }}
        selectedIndices={[0, 2]}
      />,
    );

    const wrappers = container.querySelectorAll(".ring-blue-500");
    expect(wrappers.length).toBe(2);
  });
});
