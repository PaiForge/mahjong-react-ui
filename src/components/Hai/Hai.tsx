import type { FC } from "react";
import type { HaiProps } from "../../types";
import { getHaiSizeClasses, getHaiSizePixels } from "../../utils";
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
  const { width, height } = getHaiSizeClasses(size, rotated);
  const tileImageSrc = getTileImage(hai);

  const handleClick = () => {
    onClick?.(hai);
  };

  const containerClasses = [
    "inline-block",
    "relative",
    "overflow-hidden",
    "bg-hai-bg",
    "border",
    "border-hai-border",
    "rounded",
    "shadow-hai",
    "p-0.5",
    "box-border",
    "transition-all",
    "duration-150",
    width,
    height,
    onClick !== undefined ? "cursor-pointer hover:brightness-95" : "",
    highlighted ? "ring-2 ring-yellow-400" : "",
    selected ? "ring-2 ring-blue-500 -translate-y-1" : "",
    dimmed ? "opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 回転時の画像配置用にピクセル値が必要
  const pixels = getHaiSizePixels(size);
  const innerWidth = pixels.width - 6;
  const innerHeight = pixels.height - 6;

  const imageClasses = rotated
    ? "block absolute top-1/2 left-1/2 rotate-90 origin-center"
    : "block w-full h-full object-contain";

  // 回転時のみstyleで位置調整（Tailwindの任意値では計算値を使えないため）
  const imageStyle: React.CSSProperties | undefined = rotated
    ? {
        width: innerWidth,
        height: innerHeight,
        marginTop: -innerHeight / 2,
        marginLeft: -innerWidth / 2,
      }
    : undefined;

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
    >
      <img
        src={tileImageSrc}
        alt=""
        className={imageClasses}
        style={imageStyle}
        draggable={false}
      />
    </div>
  );
};
