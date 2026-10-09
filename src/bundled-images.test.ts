import { describe, expect, it } from "vitest";
import {
  TILE_IMAGE_FILE_NAMES,
  type TileImageKind,
} from "./assets/tiles/file-names";
import { getBundledTileImage, resolveBundledTileImage } from "./bundled-images";

const ALL_KINDS = Object.keys(TILE_IMAGE_FILE_NAMES) as TileImageKind[];

describe("同梱画像エントリ", () => {
  it("34 種の牌と裏面の全部に画像がある", () => {
    expect(ALL_KINDS).toHaveLength(35);
    for (const kind of ALL_KINDS) {
      // ビルドでは data URI、テスト（Vite 開発時）はファイルの URL
      expect(getBundledTileImage(kind)).toMatch(
        /\.png$|^data:image\/png;base64,/,
      );
    }
  });

  it("resolver は getBundledTileImage と同じ参照先を返す", () => {
    for (const kind of ALL_KINDS) {
      expect(resolveBundledTileImage(kind)).toBe(getBundledTileImage(kind));
    }
  });

  it("ファイル名の表と画像の対応が同じ牌を指す（Shaa のような表記揺れ込み）", () => {
    for (const kind of ALL_KINDS) {
      const stem = TILE_IMAGE_FILE_NAMES[kind].replace(/\.png$/, "");
      // 開発時の URL はファイル名を含むので、表と画像のずれが分かる
      const image = getBundledTileImage(kind);
      if (!image.startsWith("data:")) expect(image).toContain(`/${stem}.png`);
    }
  });
});
