import type { FC } from "react";
import type { HaiBackProps, HaiBackColor } from "../../types";
import { cx, getHaiSizeClasses, getHaiSizePixels } from "../../utils";
import { BackImage } from "../../assets/tiles";

/**
 * 色に応じたTailwindフィルタークラスを取得
 */
const getColorFilterClasses = (color: HaiBackColor): string => {
  switch (color) {
    case "blue":
      return "hue-rotate-[200deg] saturate-[1.2]";
    case "yellow":
      return "hue-rotate-[60deg] saturate-[1.3] brightness-110";
    case "red":
    default:
      return "";
  }
};

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
  const pixels = getHaiSizePixels(size);

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

  const colorFilterClasses = getColorFilterClasses(color);

  const imageClasses = rotated
    ? `block absolute top-1/2 left-1/2 rotate-90 origin-center ${colorFilterClasses}`
    : `block w-full h-full object-cover ${colorFilterClasses}`;

  // 回転時のみstyleで位置調整
  const imageStyle: React.CSSProperties | undefined = rotated
    ? {
        width: pixels.width,
        height: pixels.height,
        marginTop: -pixels.height / 2,
        marginLeft: -pixels.width / 2,
      }
    : undefined;

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
