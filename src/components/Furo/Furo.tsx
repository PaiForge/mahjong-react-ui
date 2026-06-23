import type { FC } from "react";
import { MentsuType, Tacha, type HaiKindId } from "@pai-forge/riichi-mahjong";
import type { FuroProps } from "../../types";
import { Hai } from "../Hai";
import { HaiBack } from "../HaiBack";

/**
 * 副露コンポーネント
 *
 * チー・ポン・カンなどの鳴いた面子を表示します。
 * 鳴き元の方向によって横向きの牌の位置が変わります。
 */
export const Furo: FC<FuroProps> = ({
  mentsu,
  furo,
  size = "md",
  className = "",
}) => {
  const { type, hais } = mentsu;

  // 鳴き元に応じて横向き牌の位置を決定
  const getRotatedIndex = (): number => {
    if (furo === undefined) return -1;

    switch (furo.from) {
      case Tacha.Kamicha: // 上家（左）- 左端が横向き
        return 0;
      case Tacha.Toimen: // 対面 - 中央が横向き
        return 1;
      case Tacha.Shimocha: // 下家（右）- 右端が横向き
        return hais.length - 1;
      default:
        return -1;
    }
  };

  const rotatedIndex = getRotatedIndex();

  // 暗槓の場合（副露されていないカンツのみ。加槓・大明槓は明槓なので含めない）
  const isAnkan = type === MentsuType.Kantsu && furo === undefined;

  const containerClasses = ["inline-flex", "items-end", "gap-px", className]
    .filter(Boolean)
    .join(" ");

  // 暗槓の表示（外側2枚が裏向き）
  if (isAnkan) {
    return (
      <div className={containerClasses}>
        <HaiBack size={size} />
        <Hai hai={hais[1]} size={size} />
        <Hai hai={hais[2]} size={size} />
        <HaiBack size={size} />
      </div>
    );
  }

  // 通常の副露の表示
  return (
    <div className={containerClasses}>
      {hais.map((hai: HaiKindId, index: number) => (
        <Hai
          key={index}
          hai={hai}
          size={size}
          rotated={index === rotatedIndex}
        />
      ))}
    </div>
  );
};
