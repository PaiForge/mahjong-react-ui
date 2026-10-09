import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { HaiKind } from "@pai-forge/riichi-mahjong";
import { TILE_IMAGE_FILE_NAMES } from "../../assets/tiles/file-names";
import { resolveBundledTileImage } from "../../bundled-images";
import { Hai } from "../Hai";
import { HaiBack } from "../HaiBack";
import {
  createTileImageResolver,
  TileImageProvider,
  toTileImageSource,
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

describe("toTileImageSource", () => {
  it("文字列は { uri } に包み、{ uri } はそのまま返す", () => {
    expect(toTileImageSource("/a.png")).toEqual({ uri: "/a.png" });
    const source = { uri: "/b.png" };
    expect(toTileImageSource(source)).toBe(source);
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

  it("同梱画像の resolver を渡せば同梱の画像を描く", () => {
    const { container } = render(
      <TileImageProvider resolve={resolveBundledTileImage}>
        <Hai hai={HaiKind.ManZu1} />
      </TileImageProvider>,
    );
    // ビルドでは data URI に埋め込まれるが、テスト（Vite 開発時）は
    // ファイルの URL として解決されるので、どちらでも同梱の Man1 であることを見る
    expect(container.querySelector("img")?.getAttribute("src")).toMatch(
      /Man1\.png$|^data:image\/png;base64,/,
    );
  });

  it("Provider が無ければ描けない（同梱画像へ黙って戻らない）", () => {
    // 戻ると、メインのエントリが画像本体を抱える構造に逆戻りする。
    // React が例外を console.error にも流すので、その出力は黙らせる
    const silence = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Hai hai={HaiKind.ManZu1} />)).toThrow(
      /TileImageProvider/,
    );
    silence.mockRestore();
  });
});
