import { createContext, useContext, type FC, type ReactNode } from "react";
import {
  getBundledTileImage,
  TILE_IMAGE_FILE_NAMES,
  type TileImageKind,
} from "../../assets/tiles";

/**
 * 牌画像の参照先
 *
 * Web では `<img src>` に渡せる文字列、React Native では `Image` の
 * `{ uri }` 形式。どちらの実装も両方を受け取れる。
 */
export type TileImageSource = string | { readonly uri: string };

/** 牌の種類から画像の参照先を決める関数 */
export type TileImageResolver = (kind: TileImageKind) => TileImageSource;

const TileImageContext = createContext<TileImageResolver | undefined>(
  undefined,
);

export interface TileImageProviderProps {
  readonly resolve: TileImageResolver;
  readonly children: ReactNode;
}

/**
 * 牌画像の参照先を差し替える Provider
 *
 * 既定では `Hai` / `HaiBack` はパッケージに同梱した画像（base64 の data URI）を
 * 描く。data URI は描画した HTML / JS に画像本体ごと埋め込まれるため、牌を多く
 * 並べるページでは転送量が大きくなり、ブラウザのキャッシュにも乗らない。
 * この Provider で囲むと、配下の牌はすべて `resolve` が返す参照先
 * （静的ファイルや CDN の URL）を描く。
 *
 * パッケージは同じ画像を `assets/tiles/` に PNG ファイルとして同梱している。
 * 利用側はそれを自分の公開ディレクトリへ置き（必要なら縮小・WebP 化して）、
 * `createTileImageResolver` で参照先を組み立てるのが基本の使い方。
 *
 * @example
 * ```tsx
 * <TileImageProvider resolve={createTileImageResolver({ baseUrl: "/tiles" })}>
 *   <Hai hai={HaiKind.ManZu1} />
 * </TileImageProvider>
 * ```
 */
export const TileImageProvider: FC<TileImageProviderProps> = ({
  resolve,
  children,
}) => (
  <TileImageContext.Provider value={resolve}>
    {children}
  </TileImageContext.Provider>
);

/**
 * 牌の種類に対応する画像の参照先を返す
 *
 * `TileImageProvider` の配下ならその `resolve`、無ければ同梱画像。
 */
export function useTileImage(kind: TileImageKind): TileImageSource {
  const resolve = useContext(TileImageContext);
  return resolve ? resolve(kind) : getBundledTileImage(kind);
}

/** `TileImageSource` を Web の `<img src>` に渡せる文字列にする */
export function toTileImageUri(source: TileImageSource): string {
  return typeof source === "string" ? source : source.uri;
}

export interface CreateTileImageResolverOptions {
  /** 画像を置いた場所（例: `"/tiles"`、`"https://cdn.example.com/tiles"`）。末尾の `/` は不要 */
  readonly baseUrl: string;
  /**
   * 拡張子を差し替える（例: `".webp"`）。省略時は同梱ファイルと同じ `.png`。
   * 利用側が縮小・変換した画像を配信するときに使う
   */
  readonly extension?: string;
}

/**
 * 「ベース URL + 同梱ファイル名」で参照先を組み立てる resolver を作る
 *
 * ファイル名は {@link TILE_IMAGE_FILE_NAMES} に従う。同梱の PNG をそのまま
 * 置くなら `extension` は不要で、WebP 等に変換して置くなら拡張子だけ差し替える。
 */
export function createTileImageResolver({
  baseUrl,
  extension = ".png",
}: CreateTileImageResolverOptions): TileImageResolver {
  const base = baseUrl.replace(/\/+$/, "");
  return (kind) => {
    const fileName = TILE_IMAGE_FILE_NAMES[kind].replace(/\.png$/, extension);
    return `${base}/${fileName}`;
  };
}
