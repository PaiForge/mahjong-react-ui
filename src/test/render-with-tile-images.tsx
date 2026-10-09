import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { FC, ReactElement, ReactNode } from "react";
import { resolveBundledTileImage } from "../bundled-images";
import { TileImageProvider } from "../components/TileImageProvider";

/** 同梱画像を描く `TileImageProvider` で包むラッパー */
export const BundledTileImages: FC<{ readonly children: ReactNode }> = ({
  children,
}) => (
  <TileImageProvider resolve={resolveBundledTileImage}>
    {children}
  </TileImageProvider>
);

/**
 * 牌を描くコンポーネントをテストで描く
 *
 * `Hai` / `HaiBack` は `TileImageProvider` の外では描けない（例外を投げる）ので、
 * 同梱画像の Provider で包んで描く。Provider 自体の振る舞いを見るテストだけが
 * 素の `render` を使う。
 */
export function renderWithTileImages(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult {
  return render(ui, { ...options, wrapper: BundledTileImages });
}
