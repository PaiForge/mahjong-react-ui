/**
 * クラス名を結合するユーティリティ
 *
 * falsy な値（undefined・false・空文字など）を除外して
 * スペース区切りの className 文字列を生成する。
 */
export function cx(
  ...classes: readonly (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
