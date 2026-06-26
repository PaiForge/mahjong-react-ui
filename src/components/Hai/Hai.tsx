import type { FC } from "react";
import type { HaiProps, HaiSize } from "../../types";
import { getHaiSizePixels, getOrientedHaiSizePixels } from "../../utils";
import { HAI_COLORS, HAI_SELECTED_LIFT } from "../../theme/colors";
import { getTileImage } from "../../assets/tiles";
import { Image, Pressable, StyleSheet, type ImageSourcePropType, type StyleProp, type ViewStyle } from "react-native";

/** 状態(回転・ハイライト・選択・薄表示)に応じたコンテナスタイルを組み立てる */
const buildContainerStyle = (
  size: HaiSize,
  state: Pick<
    HaiProps,
    "rotated" | "highlighted" | "selected" | "dimmed" | "style"
  >,
): StyleProp<ViewStyle> => {
  const {
    rotated = false,
    highlighted = false,
    selected = false,
    dimmed = false,
    style,
  } = state;
  const { width, height } = getOrientedHaiSizePixels(size, rotated);

  return [
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
      borderColor: HAI_COLORS.highlight,
      borderWidth: 2,
    },
    // Selected (Blue ring + lift)
    selected && {
      borderColor: HAI_COLORS.selected,
      borderWidth: 2,
      transform: [{ translateY: HAI_SELECTED_LIFT }],
    },
    style,
  ];
};

/** 回転時は元の縦長サイズのまま90度回転させる（overflow: visible で表示） */
const buildImageStyle = (size: HaiSize, rotated: boolean) => {
  const pixels = getHaiSizePixels(size);
  return [
    styles.image,
    rotated && {
      width: pixels.width - 6,
      height: pixels.height - 6,
      transform: [{ rotate: '90deg' }],
    },
  ];
};

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
  const tileImageSrc = getTileImage(hai);

  const handlePress = () => {
    onClick?.(hai);
  };

  const containerStyle = buildContainerStyle(size, {
    rotated,
    highlighted,
    selected,
    dimmed,
    style,
  });

  const imageStyle = buildImageStyle(size, rotated);

  return (
    <Pressable
      onPress={onClick ? handlePress : undefined}
      style={containerStyle}
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
    display: 'flex',                       // Web環境で flexbox を有効にする
    backgroundColor: HAI_COLORS.background, // hai-bg
    borderColor: HAI_COLORS.border,         // hai-border
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
