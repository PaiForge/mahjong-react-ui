import React from "react";
import { Image, Pressable, View, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native";
import type { HaiProps } from "../../types";
import { getTileImage } from "../../assets/tiles";
import { getHaiSizePixels } from "../../utils";
import { HAI_COLORS, HAI_SELECTED_LIFT } from "../../theme/colors";

/**
 * 牌コンポーネント (Native)
 */
export const Hai: React.FC<HaiProps> = ({
    hai,
    size = "md",
    rotated = false,
    highlighted = false,
    dimmed = false,
    selected = false,
    onClick,
    // className は Native では無視する
    style,
}) => {
    const tileImageSrc = getTileImage(hai);
    const { width, height } = getHaiSizePixels(size);

    const containerStyle: StyleProp<ViewStyle> = [
        styles.container,
        { width, height },
        rotated && {
            width: height,
            height: width,
        },
        highlighted && styles.highlighted,
        selected && styles.selected,
        dimmed && styles.dimmed,
        style,
    ];

    const imageStyle: StyleProp<ImageStyle> = [
        { width: "100%", height: "100%", backgroundColor: '#fff', borderRadius: 6 },
        rotated && {
            transform: [{ rotate: "90deg" }],
            width: height,
            height: width,
            position: "absolute",
            top: (width - height) / 2,
            left: (height - width) / 2,
        },
    ];

    const content = (
        <Image
            source={tileImageSrc as ImageSourcePropType}
            style={imageStyle}
            resizeMode="contain"
        />
    );

    if (onClick) {
        return (
            <Pressable onPress={() => { onClick(hai); }} style={containerStyle}>
                {content}
            </Pressable>
        );
    }

    return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 6,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: HAI_COLORS.border, // hai-border（web 実装と統一）
    },
    highlighted: {
        borderColor: HAI_COLORS.highlight, // yellow-400
        borderWidth: 2,
    },
    selected: {
        borderColor: HAI_COLORS.selected, // blue-500
        borderWidth: 2,
        transform: [{ translateY: HAI_SELECTED_LIFT }],
    },
    dimmed: {
        opacity: 0.5,
    },
});
