import type { HaiSize } from "../types";

/**
 * 牌の表示サイズに関するユーティリティ（プレゼンテーション層）。
 *
 * サイズバリアントを Tailwind クラス／ピクセル値へ変換する。
 * 牌のドメイン知識には依存しない。
 */

/**
 * サイズに対応するTailwindクラス
 *
 * Tailwindのパージはクラス名をリテラルとして静的に検出するため、
 * テンプレート文字列での動的生成は行わず、完全なクラス名を保持する。
 */
const HAI_SIZE_CLASSES: Record<HaiSize, { width: string; height: string }> = {
  xs: { width: "w-hai-xs", height: "h-hai-xs" },
  sm: { width: "w-hai-sm", height: "h-hai-sm" },
  md: { width: "w-hai-md", height: "h-hai-md" },
  lg: { width: "w-hai-lg", height: "h-hai-lg" },
  xl: { width: "w-hai-xl", height: "h-hai-xl" },
};

const HAI_SIZE_CLASSES_ROTATED: Record<
  HaiSize,
  { width: string; height: string }
> = {
  xs: { width: "w-hai-xs-rotated", height: "h-hai-xs-rotated" },
  sm: { width: "w-hai-sm-rotated", height: "h-hai-sm-rotated" },
  md: { width: "w-hai-md-rotated", height: "h-hai-md-rotated" },
  lg: { width: "w-hai-lg-rotated", height: "h-hai-lg-rotated" },
  xl: { width: "w-hai-xl-rotated", height: "h-hai-xl-rotated" },
};

/**
 * サイズに対応するTailwindクラスを取得
 */
export function getHaiSizeClasses(
  size: HaiSize,
  rotated = false,
): {
  width: string;
  height: string;
} {
  return (rotated ? HAI_SIZE_CLASSES_ROTATED : HAI_SIZE_CLASSES)[size];
}

/**
 * サイズに対応するピクセル値を取得
 */
export function getHaiSizePixels(size: HaiSize): {
  width: number;
  height: number;
} {
  switch (size) {
    case "xs":
      return { width: 24, height: 34 };
    case "sm":
      return { width: 32, height: 45 };
    case "md":
      return { width: 44, height: 62 };
    case "lg":
      return { width: 56, height: 78 };
    case "xl":
      return { width: 72, height: 101 };
  }
}
