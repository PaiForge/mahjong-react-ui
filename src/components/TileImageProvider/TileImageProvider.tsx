import { createContext, useContext, type FC, type ReactNode } from "react";
import {
  TILE_IMAGE_FILE_NAMES,
  type TileImageKind,
} from "../../assets/tiles/file-names";

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
 * 牌画像の参照先を決める Provider
 *
 * `Hai` / `HaiBack` を描くアプリは、ルートを必ずこれで囲む。配下の牌はすべて
 * `resolve` が返す参照先を描く。
 *
 * - web: パッケージ同梱の PNG（`assets/tiles/`）を自分の公開ディレクトリへ置き
 *   （必要なら縮小・WebP 化して）、`createTileImageResolver` で参照先を組み立てる
 * - React Native: `@pai-forge/mahjong-react-ui/bundled-images` の
 *   `resolveBundledTileImage`（base64 の data URI）を渡す
 *
 * 画像本体はメインのエントリに含めない。以前は Provider が無いときに同梱画像へ
 * フォールバックしていたが、そのためにメインのエントリが 35 枚の data URI
 * （2MB 超）を抱え、静的ファイルに切り替えたアプリでも牌を描かないページまで
 * 画像本体をバンドルに載せていた。
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
 * `TileImageProvider` の配下で呼ぶこと。Provider が無ければ例外を投げる
 * （同梱画像へのフォールバックは持たない。理由は {@link TileImageProvider}）。
 */
export function useTileImage(kind: TileImageKind): TileImageSource {
  const resolve = useContext(TileImageContext);
  if (resolve === undefined) {
    throw new Error(
      "TileImageProvider が見つかりません。牌を描くアプリのルートを " +
        "<TileImageProvider resolve={...}> で囲んでください。resolve には " +
        "createTileImageResolver({ baseUrl })（静的ファイル）か、" +
        "@pai-forge/mahjong-react-ui/bundled-images の resolveBundledTileImage" +
        "（同梱画像）を渡します。",
    );
  }
  return resolve(kind);
}

/** `TileImageSource` を Web の `<img src>` に渡せる文字列にする */
export function toTileImageUri(source: TileImageSource): string {
  return typeof source === "string" ? source : source.uri;
}

/**
 * `TileImageSource` を React Native の `Image` の `source` に渡せる `{ uri }` にする
 *
 * React Native の `Image` は文字列の `source` を同梱画像の ID とみなして探し、
 * 見つからなければ何も描かない（web の `<img>` や react-native-web は文字列も
 * 受け付けるため、web では表に出ない）。`Image` に渡す直前は必ずこれを通すこと。
 */
export function toTileImageSource(source: TileImageSource): {
  readonly uri: string;
} {
  return typeof source === "string" ? { uri: source } : source;
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
