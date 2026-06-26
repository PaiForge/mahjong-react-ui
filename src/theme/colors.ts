/**
 * 牌コンポーネントで共有する色定数
 *
 * Web版(Hai.tsx)とNative版(Hai.native.tsx)で同じ値を使うため一元化する。
 * Tailwindのカラーパレットと対応させ、両実装間の不整合を防ぐ。
 */
export const HAI_COLORS = {
  /** 牌の背景色 (hai-bg) */
  background: "#f8f6f0",
  /** 牌の枠線色 (hai-border) */
  border: "#c9c5b8",
  /** ハイライト時の枠線色 (Tailwind yellow-400) */
  highlight: "#facc15",
  /** 選択時の枠線色 (Tailwind blue-500) */
  selected: "#3b82f6",
} as const;

/** 選択時に牌を持ち上げる量(px) */
export const HAI_SELECTED_LIFT = -4;
