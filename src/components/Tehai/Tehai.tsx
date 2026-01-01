import type { FC } from "react";
import type { HaiKindId, CompletedMentsu } from "@pai-forge/riichi-mahjong";
import type { TehaiProps } from "../../types";
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

  const containerClasses = ["inline-flex", "items-end", "gap-2", className]
    .filter(Boolean)
    .join(" ");

  const closedHandClasses = "inline-flex items-end gap-px";
  const tsumoClasses = "inline-flex items-end ml-2";
  const exposedClasses = "inline-flex items-end gap-2 ml-4";

  const createClickHandler = (hai: HaiKindId, index: number) => {
    if (onHaiClick === undefined) return undefined;
    return () => {
      onHaiClick(hai, index);
    };
  };

  return (
    <div className={containerClasses}>
      {/* 純手牌（閉じた牌） */}
      <div className={closedHandClasses}>
        {closed.map((hai: HaiKindId, index: number) => {
          const clickHandler = createClickHandler(hai, index);
          return (
            <Hai
              key={index}
              hai={hai}
              size={size}
              selected={selectedIndices.includes(index)}
              {...(clickHandler !== undefined ? { onClick: clickHandler } : {})}
            />
          );
        })}
      </div>

      {/* ツモ牌（分離表示） */}
      {tsumo !== undefined && (
        <div className={tsumoClasses}>
          {(() => {
            const clickHandler = createClickHandler(tsumo, closed.length);
            return (
              <Hai
                hai={tsumo}
                size={size}
                {...(clickHandler !== undefined
                  ? { onClick: clickHandler }
                  : {})}
              />
            );
          })()}
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
