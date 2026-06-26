import type { CSSProperties } from "react";
import type { HaiBackColor, HaiSize } from "../../types";
import { getHaiSizePixels } from "../../utils";

/**
 * 牌の裏面コンポーネントの表示計算（プレゼンテーション層）。
 *
 * 色フィルタの対応表と回転時の位置補正を描画から切り離す。
 */

/**
 * 裏面の色に応じたTailwindフィルタークラス
 *
 * Tailwindの静的検出のため完全なクラス名をリテラルで保持する。
 */
const COLOR_FILTER_CLASSES: Record<HaiBackColor, string> = {
  red: "",
  blue: "hue-rotate-[200deg] saturate-[1.2]",
  yellow: "hue-rotate-[60deg] saturate-[1.3] brightness-110",
};

/**
 * 色に応じたTailwindフィルタークラスを取得
 */
export function getColorFilterClasses(color: HaiBackColor): string {
  return COLOR_FILTER_CLASSES[color];
}

/**
 * 回転表示時の画像の位置補正スタイルを取得
 *
 * 縦長の画像を中央基準で90度回転させるため、元サイズの半分だけ
 * 負方向にマージンを取って位置を合わせる。
 */
export function getRotatedImageStyle(size: HaiSize): CSSProperties {
  const { width, height } = getHaiSizePixels(size);
  return {
    width,
    height,
    marginTop: -height / 2,
    marginLeft: -width / 2,
  };
}
