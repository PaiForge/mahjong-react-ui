import { HaiKind, HaiType, type HaiKindId } from "@pai-forge/riichi-mahjong";
import type { HaiSize } from "../types";

/**
 * 牌種IDから牌種タイプを取得する
 */
export function kindIdToHaiType(kind: HaiKindId): HaiType {
  if (kind >= HaiKind.ManZu1 && kind <= HaiKind.ManZu9) {
    return HaiType.Manzu;
  }
  if (kind >= HaiKind.PinZu1 && kind <= HaiKind.PinZu9) {
    return HaiType.Pinzu;
  }
  if (kind >= HaiKind.SouZu1 && kind <= HaiKind.SouZu9) {
    return HaiType.Souzu;
  }
  return HaiType.Jihai;
}

/** 数牌の牌種ごとの開始ID（1の牌のHaiKindId） */
const SUUHAI_START_KIND: Partial<Record<HaiType, HaiKindId>> = {
  [HaiType.Manzu]: HaiKind.ManZu1,
  [HaiType.Pinzu]: HaiKind.PinZu1,
  [HaiType.Souzu]: HaiKind.SouZu1,
};

/**
 * 牌種IDから数値(1-9)を取得する
 * 字牌の場合は undefined を返す
 */
export function haiKindToNumber(kind: HaiKindId): number | undefined {
  const start = SUUHAI_START_KIND[kindIdToHaiType(kind)];
  if (start === undefined) return undefined;
  return kind - start + 1;
}

/**
 * 字牌の名前を取得する
 */
export function getJihaiName(kind: HaiKindId): string | undefined {
  switch (kind) {
    case HaiKind.Ton:
      return "東";
    case HaiKind.Nan:
      return "南";
    case HaiKind.Sha:
      return "西";
    case HaiKind.Pei:
      return "北";
    case HaiKind.Haku:
      return "白";
    case HaiKind.Hatsu:
      return "發";
    case HaiKind.Chun:
      return "中";
    default:
      return undefined;
  }
}

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
