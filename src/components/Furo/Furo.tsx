import type { FC } from "react";
import type { HaiKindId } from "@pai-forge/riichi-mahjong";
import type { FuroProps } from "../../types";
import { cx } from "../../utils";
import { Hai } from "../Hai";
import { HaiBack } from "../HaiBack";
import { getRotatedHaiIndex, isAnkan } from "./furoLayout";

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
  const { hais } = mentsu;

  // 鳴き元に応じて横向きにする牌の位置を決定
  const rotatedIndex = getRotatedHaiIndex(furo, hais.length);

  const containerClasses = cx("inline-flex", "items-end", "gap-px", className);

  // 暗槓の表示（外側2枚が裏向き）
  if (isAnkan(mentsu, furo)) {
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
