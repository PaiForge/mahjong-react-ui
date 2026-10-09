/**
 * 同梱の牌画像（base64 の data URI）
 * 同梱画像エントリ
 *
 * `@pai-forge/mahjong-react-ui/bundled-images` として公開する、メインのエントリとは
 * 別のエントリ。35 枚の画像本体（2MB 超）をここに隔離し、`Hai` や
 * `TileImageProvider` を import しただけではバンドルに入らないようにしている。
 *
 * 使うのは静的ファイルを配信する手段が無い環境（React Native 等）。web は
 * メインのエントリの `createTileImageResolver` で `assets/tiles/` の PNG を
 * 自分の公開ディレクトリから配信すること（data URI は HTML / JS に画像本体ごと
 * 埋め込まれ、ブラウザのキャッシュにも乗らない）。
 *
 * @example
 * ```tsx
 * import { TileImageProvider } from "@pai-forge/mahjong-react-ui";
 * import { resolveBundledTileImage } from "@pai-forge/mahjong-react-ui/bundled-images";
 *
 * <TileImageProvider resolve={resolveBundledTileImage}>
 *   <Hai hai={HaiKind.ManZu1} />
 * </TileImageProvider>
 * ```
 */
import { getBundledTileImage } from "./assets/tiles";
import type { TileImageKind } from "./assets/tiles/file-names";
import type { TileImageResolver } from "./components/TileImageProvider/TileImageProvider";

export { getBundledTileImage };
export type { TileImageKind };

/** 同梱画像（data URI）を返す resolver。`TileImageProvider` の `resolve` に渡す */
export const resolveBundledTileImage: TileImageResolver = (kind) =>
  getBundledTileImage(kind);
