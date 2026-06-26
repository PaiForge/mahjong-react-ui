/**
 * 牌のサイズバリアントごとの基準寸法(px)。
 *
 * ランタイムの描画(getHaiSizePixels)と Tailwind 設定(tailwind.config.js)が
 * 同じ値を参照するための単一の真実源(Single Source of Truth)。
 * 依存を持たせないため、ここでは型インポートを行わない。
 */
export const HAI_DIMENSIONS = {
  xs: { width: 24, height: 34 },
  sm: { width: 32, height: 45 },
  md: { width: 44, height: 62 },
  lg: { width: 56, height: 78 },
  xl: { width: 72, height: 101 },
} as const;
