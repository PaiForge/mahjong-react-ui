import type { FC } from "react";
import type { HaiKindId, CompletedMentsu } from "@pai-forge/riichi-mahjong";
import type { TehaiProps } from "../../types";
import { cx } from "../../utils";
import { Hai } from "../Hai";
import { Furo } from "../Furo";

/**
 * 手牌コンポーネント
 *
 * 純手牌（閉じた牌）と副露（開いた面子）を表示します。
 * ツモ牌がある場合は少し離して表示します。
 */
export const Tehai: FC<TehaiProps> = ({
  tehai,
  tsumo,
  size = "md",
  onHaiClick,
  selectedIndices = [],
  className = "",
}) => {
  const { closed, exposed } = tehai;

  const containerClasses = cx("inline-flex", "items-end", "gap-2", className);

  const closedHandClasses = "inline-flex items-end gap-px";
  const tsumoClasses = "inline-flex items-end ml-2";
  const exposedClasses = "inline-flex items-end gap-2 ml-4";

  // onClick は任意プロパティ(exactOptionalPropertyTypes)のため、
  // ハンドラ未指定時は onClick 自体を渡さない形のpropsを返す。
  const haiClickProps = (
    hai: HaiKindId,
    index: number,
  ): { onClick?: () => void } => {
    if (onHaiClick === undefined) return {};
    return {
      onClick: () => {
        onHaiClick(hai, index);
      },
    };
  };

  return (
    <div className={containerClasses}>
      {/* 純手牌（閉じた牌） */}
      <div className={closedHandClasses}>
        {closed.map((hai: HaiKindId, index: number) => (
          <Hai
            key={index}
            hai={hai}
            size={size}
            selected={selectedIndices.includes(index)}
            {...haiClickProps(hai, index)}
          />
        ))}
      </div>

      {/* ツモ牌（分離表示） */}
      {tsumo !== undefined && (
        <div className={tsumoClasses}>
          <Hai hai={tsumo} size={size} {...haiClickProps(tsumo, closed.length)} />
        </div>
      )}

      {/* 副露（開いた面子） */}
      {exposed.length > 0 && (
        <div className={exposedClasses}>
          {exposed.map((mentsu: CompletedMentsu, index: number) => {
            const props =
              mentsu.furo !== undefined
                ? { mentsu, furo: mentsu.furo, size }
                : { mentsu, size };
            return <Furo key={index} {...props} />;
          })}
        </div>
      )}
    </div>
  );
};
