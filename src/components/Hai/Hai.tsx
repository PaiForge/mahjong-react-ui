import type { FC } from "react";
import type { HaiProps } from "../../types";
import { getHaiSizePixels } from "../../utils";
import { getTileImage } from "../../assets/tiles";

/**
 * 牌コンポーネント
 *
 * FluffyStuff/riichi-mahjong-tiles のPNG画像を使用して
 * 高品質な麻雀牌を描画します。
 */
export const Hai: FC<HaiProps> = ({
  hai,
  size = "md",
  rotated = false,
  highlighted = false,
  dimmed = false,
  selected = false,
  onClick,
  className = "",
}) => {
  const { width, height } = getHaiSizePixels(size);
  const tileImageSrc = getTileImage(hai);

  const handleClick = () => {
    onClick?.(hai);
  };

  const containerClasses = [
    "inline-block",
    "transition-all",
    "duration-150",
    onClick !== undefined ? "cursor-pointer hover:brightness-95" : "",
    highlighted ? "ring-2 ring-yellow-400" : "",
    selected ? "ring-2 ring-blue-500 -translate-y-1" : "",
    dimmed ? "opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerWidth = rotated ? height : width;
  const containerHeight = rotated ? width : height;

  // 牌の枠線スタイル
  const tileStyle: React.CSSProperties = {
    width: containerWidth,
    height: containerHeight,
    backgroundColor: "#f8f6f0",
    border: "1px solid #c9c5b8",
    borderRadius: "4px",
    boxShadow:
      "0 1px 2px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
    padding: "2px",
    boxSizing: "border-box",
  };

  // 内側のサイズ（padding 2px + border 1px の両側分を引く）
  const innerWidth = width - 6;
  const innerHeight = height - 6;

  // 画像のスタイル（回転時は元のサイズを維持してから回転）
  const imageStyle: React.CSSProperties = rotated
    ? {
        display: "block",
        width: innerWidth,
        height: innerHeight,
        transform: "rotate(90deg)",
        transformOrigin: "center center",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -innerHeight / 2,
        marginLeft: -innerWidth / 2,
      }
    : {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain" as const,
      };

  return (
    <div
      className={containerClasses}
      onClick={onClick !== undefined ? handleClick : undefined}
      role={onClick !== undefined ? "button" : undefined}
      tabIndex={onClick !== undefined ? 0 : undefined}
      onKeyDown={
        onClick !== undefined
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }
          : undefined
      }
      style={{ ...tileStyle, position: "relative", overflow: "hidden" }}
    >
      <img src={tileImageSrc} alt="" style={imageStyle} draggable={false} />
    </div>
  );
};
