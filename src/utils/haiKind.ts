import { HaiKind, HaiType, type HaiKindId } from "@pai-forge/riichi-mahjong";

/**
 * 牌のドメイン知識（牌種の分類・数値化・名称）に関するユーティリティ。
 *
 * リーチ麻雀のドメイン概念を扱い、UI都合（サイズ・スタイル）には依存しない。
 */

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
