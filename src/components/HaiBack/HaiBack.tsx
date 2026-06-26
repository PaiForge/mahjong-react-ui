import type { FC } from "react";
import type { HaiBackProps } from "../../types";
import { cx, getHaiSizeClasses } from "../../utils";
import { BackImage } from "../../assets/tiles";
import { getColorFilterClasses, getRotatedImageStyle } from "./haiBackStyle";

/**
 * 牌の裏面コンポーネント
 *
 * FluffyStuff/riichi-mahjong-tiles のPNG画像を使用して
 * 麻雀の牌の裏面を描画します。
 */
export const HaiBack: FC<HaiBackProps> = ({
  size = "md",
  rotated = false,
  color = "red",
  className = "",
}) => {
  const { width, height } = getHaiSizeClasses(size, rotated);

  const containerClasses = cx(
    "inline-block",
    "relative",
    "overflow-hidden",
    "rounded",
    "shadow-hai-back",
    "box-border",
    width,
    height,
    className,
  );

  const imageClasses = cx(
    "block",
    rotated
      ? "absolute top-1/2 left-1/2 rotate-90 origin-center"
      : "w-full h-full object-cover",
    getColorFilterClasses(color),
  );

  // 回転時のみstyleで位置調整
  const imageStyle = rotated ? getRotatedImageStyle(size) : undefined;

  return (
    <div className={containerClasses}>
      <img
        src={BackImage}
        alt=""
        className={imageClasses}
        style={imageStyle}
        draggable={false}
      />
    </div>
  );
};
