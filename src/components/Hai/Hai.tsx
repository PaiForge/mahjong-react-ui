import type { FC } from "react";
import type { HaiProps } from "../../types";
import { getHaiSizePixels } from "../../utils";
import { getTileImage } from "../../assets/tiles";
import { View, Image, Pressable, StyleSheet, type ImageSourcePropType } from "react-native";

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
      style={containerStyle as any}
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
