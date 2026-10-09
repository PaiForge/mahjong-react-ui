import { describe, expect, it, vi } from "vitest";
import { renderWithTileImages } from "../../test/render-with-tile-images";
import { HaiKind } from "@pai-forge/riichi-mahjong";
import type * as ReactNative from "react-native";
import { TileImageProvider } from "../TileImageProvider";

// React Native の Image は文字列の source を同梱画像の ID とみなし、見つからなければ
// 何も描かない（react-native-web や web の shim は文字列も受けるため、web では
// 表に出ない）。ここでは Image を差し替えて「Hai が Image に渡す source の形」を
// 検証し、ネイティブで牌が消える退行を防ぐ。
const receivedSources: unknown[] = [];

vi.mock("react-native", async (importOriginal) => {
  const actual = await importOriginal<typeof ReactNative>();
  return {
    ...actual,
    Image: ({ source }: { readonly source: unknown }) => {
      receivedSources.push(source);
      return <img />;
    },
  };
});

import { Hai } from "./Hai";

const lastSource = (): unknown => receivedSources.at(-1);

describe("Hai が Image に渡す source", () => {
  it("既定（同梱画像）でも { uri } の形で渡す", () => {
    renderWithTileImages(<Hai hai={HaiKind.ManZu1} />);
    expect(lastSource()).toEqual({ uri: expect.any(String) as string });
  });

  it("resolver が文字列を返しても { uri } に揃える", () => {
    renderWithTileImages(
      <TileImageProvider resolve={() => "/tiles/Man1.webp"}>
        <Hai hai={HaiKind.ManZu1} />
      </TileImageProvider>,
    );
    expect(lastSource()).toEqual({ uri: "/tiles/Man1.webp" });
  });

  it("resolver が { uri } を返せばそのまま渡す", () => {
    renderWithTileImages(
      <TileImageProvider
        resolve={() => ({ uri: "https://cdn.example.com/Man1.png" })}
      >
        <Hai hai={HaiKind.ManZu1} />
      </TileImageProvider>,
    );
    expect(lastSource()).toEqual({ uri: "https://cdn.example.com/Man1.png" });
  });
});
