import type { FC } from "react";
import type { HaiProps } from "../../types";
import { getHaiSizePixels } from "../../utils";
import { getTileImage } from "../../assets/tiles";
import { Image, Pressable, StyleSheet, type ImageSourcePropType, type StyleProp, type ViewStyle } from "react-native";

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
  style,
}) => {
  const pixels = getHaiSizePixels(size);
  const width = rotated ? pixels.height : pixels.width;
  const height = rotated ? pixels.width : pixels.height;

  const tileImageSrc = getTileImage(hai);

  const handlePress = () => {
    onClick?.(hai);
  };

  const containerStyle = [
    styles.container,
    {
      width,
      height,
      opacity: dimmed ? 0.5 : 1,
      // 回転時はレイアウトボックスのはみ出しを許容
      // （視覚的な絵柄はコンテナ内に収まるが、レイアウトボックスは縦長のままのため）
      overflow: rotated ? 'visible' : 'hidden',
    },
    // Highlighted (Yellow ring)
    highlighted && {
      borderColor: '#FACC15', // yellow-400
      borderWidth: 2,
    },
    // Selected (Blue ring + lift)
    selected && {
      borderColor: '#3B82F6', // blue-500
      borderWidth: 2,
      transform: [{ translateY: -4 }],
    },
    style,
  ];

  // Inner dimensions for the image (accounting for padding/border roughly if needed, 
  // but usually simple contain is enough if container has padding)
  // Original had p-0.5 (2px).

  // Image style
  // 回転時は元の縦長サイズのまま回転（overflow: visible で表示）
  const imageStyle = [
    styles.image,
    rotated && {
      width: pixels.width - 6,
      height: pixels.height - 6,
      transform: [{ rotate: '90deg' }],
    },
  ];

  return (
    <Pressable
      onPress={onClick ? handlePress : undefined}
      style={containerStyle as StyleProp<ViewStyle>}
      // Accessibilty props
      accessibilityRole="button"
      accessibilityLabel={onClick ? "Mahjong Tile" : undefined}
    >
      <Image
        source={tileImageSrc as ImageSourcePropType}
        style={imageStyle}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',            // Web環境で flexbox を有効にする
    backgroundColor: '#f8f6f0', // hai-bg
    borderColor: '#c9c5b8',     // hai-border
    borderWidth: 1,
    borderRadius: 4,            // rounded
    overflow: 'hidden',
    padding: 2,                 // p-0.5
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow (shadow-hai)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
