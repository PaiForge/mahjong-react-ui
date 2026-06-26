import {
  MentsuType,
  Tacha,
  type CompletedMentsu,
  type Furo,
} from "@pai-forge/riichi-mahjong";

/**
 * 副露の表示ルール（リーチ麻雀のドメイン知識）を表す純関数群。
 *
 * 描画(JSX)から切り離すことで、表示ルール単体でテスト・再利用できる。
 */

/** 横向きにする牌が存在しないことを表すインデックス */
export const NO_ROTATED_INDEX = -1;

/**
 * 鳴き元(Tacha)に応じて横向きにする牌のインデックスを返す。
 *
 * 上家（左）= 左端(0) / 対面 = 中央(1) / 下家（右）= 右端(末尾)。
 * 副露情報が無い場合は横向き牌なし({@link NO_ROTATED_INDEX})。
 */
export function getRotatedHaiIndex(
  furo: Furo | undefined,
  haiCount: number,
): number {
  if (furo === undefined) return NO_ROTATED_INDEX;

  switch (furo.from) {
    case Tacha.Kamicha:
      return 0;
    case Tacha.Toimen:
      return 1;
    case Tacha.Shimocha:
      return haiCount - 1;
    default:
      return NO_ROTATED_INDEX;
  }
}

/**
 * 暗槓かどうかを判定する。
 *
 * カンツ かつ 副露情報なし のときのみ暗槓。
 * 加槓・大明槓は明槓なので含めない。
 */
export function isAnkan(
  mentsu: CompletedMentsu,
  furo: Furo | undefined,
): boolean {
  return mentsu.type === MentsuType.Kantsu && furo === undefined;
}
