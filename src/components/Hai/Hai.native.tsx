import React from "react";
import { Image, Pressable, View, StyleSheet, StyleProp, ViewStyle, ImageStyle } from "react-native";
import type { HaiProps } from "../../types";
import { getTileImage } from "../../assets/tiles";
import { getHaiSizePixels } from "../../utils";

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
    className, // Ignored in Native
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
            source={tileImageSrc as any}
            style={imageStyle}
            resizeMode="contain"
        />
    );

    if (onClick) {
        return (
            <Pressable onPress={() => onClick(hai)} style={containerStyle}>
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
        // simple shadow simulation
        borderWidth: 1,
        borderColor: "red", // DEBUG: Changed to red to verify update
    },
    highlighted: {
        borderColor: "#fbbf24", // yellow-400
        borderWidth: 2,
    },
    selected: {
        borderColor: "#3b82f6", // blue-500
        borderWidth: 2,
        transform: [{ translateY: -4 }],
    },
    dimmed: {
        opacity: 0.5,
    },
});
