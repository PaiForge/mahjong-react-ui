import type { FC } from "react";
import type { HaiBackProps } from "../../types";
import { getHaiSizePixels } from "../../utils";
import { BackImage } from "../../assets/tiles";

/**
 * 牌の裏面コンポーネント
 *
 * FluffyStuff/riichi-mahjong-tiles のPNG画像を使用して
 * 麻雀の牌の裏面を描画します。
 */
export const HaiBack: FC<HaiBackProps> = ({
  size = "md",
  rotated = false,
  className = "",
}) => {
  const { width, height } = getHaiSizePixels(size);

  const containerWidth = rotated ? height : width;
  const containerHeight = rotated ? width : height;

  const containerClasses = ["inline-block", className]
    .filter(Boolean)
    .join(" ");

  // 裏面用スタイル（パディングなし、画像が全面を覆う）
  const tileStyle: React.CSSProperties = {
    width: containerWidth,
    height: containerHeight,
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  // 内側のサイズ
  const innerWidth = width;
  const innerHeight = height;

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
        objectFit: "cover" as const,
      };

  return (
    <div
      className={containerClasses}
      style={{ ...tileStyle, position: "relative" }}
    >
      <img src={BackImage} alt="" style={imageStyle} draggable={false} />
    </div>
  );
};
