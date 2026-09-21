import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HaiKind } from "@pai-forge/riichi-mahjong";
import { TILE_IMAGE_FILE_NAMES } from "../../assets/tiles";
import { Hai } from "../Hai";
import { HaiBack } from "../HaiBack";
import {
  createTileImageResolver,
  TileImageProvider,
  toTileImageUri,
} from "./TileImageProvider";

describe("createTileImageResolver", () => {
  it("ベース URL と同梱ファイル名から参照先を組み立てる", () => {
    const resolve = createTileImageResolver({ baseUrl: "/tiles" });
    expect(resolve(HaiKind.ManZu1)).toBe("/tiles/Man1.png");
    expect(resolve(HaiKind.Sha)).toBe("/tiles/Shaa.png");
    expect(resolve("back")).toBe("/tiles/Back.png");
  });

  it("末尾のスラッシュは重ねない", () => {
    const resolve = createTileImageResolver({
      baseUrl: "https://cdn.example.com/t/",
    });
    expect(resolve(HaiKind.PinZu5)).toBe("https://cdn.example.com/t/Pin5.png");
  });

  it("拡張子を差し替えられる", () => {
    const resolve = createTileImageResolver({
      baseUrl: "/tiles",
      extension: ".webp",
    });
    expect(resolve(HaiKind.SouZu9)).toBe("/tiles/Sou9.webp");
  });

  it("すべての牌と裏面にファイル名がある", () => {
    expect(Object.keys(TILE_IMAGE_FILE_NAMES)).toHaveLength(35);
  });
});

describe("toTileImageUri", () => {
  it("文字列はそのまま、{ uri } は中身を返す", () => {
    expect(toTileImageUri("/a.png")).toBe("/a.png");
    expect(toTileImageUri({ uri: "/b.png" })).toBe("/b.png");
  });
});

describe("TileImageProvider", () => {
  it("配下の Hai は resolve が返した参照先を描く", () => {
    const { container } = render(
      <TileImageProvider
        resolve={createTileImageResolver({ baseUrl: "/tiles" })}
      >
        <Hai hai={HaiKind.ManZu1} />
      </TileImageProvider>,
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/tiles/Man1.png",
    );
  });

  it("配下の HaiBack も resolve に従う", () => {
    const { container } = render(
      <TileImageProvider
        resolve={createTileImageResolver({ baseUrl: "/tiles" })}
      >
        <HaiBack />
      </TileImageProvider>,
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/tiles/Back.png",
    );
  });

  it("Provider が無ければ同梱画像を描く", () => {
    const { container } = render(<Hai hai={HaiKind.ManZu1} />);
    // ビルドでは data URI に埋め込まれるが、テスト（Vite 開発時）は
    // ファイルの URL として解決されるので、どちらでも同梱の Man1 であることを見る
    expect(container.querySelector("img")?.getAttribute("src")).toMatch(
      /Man1\.png$|^data:image\/png;base64,/,
    );
  });
});
