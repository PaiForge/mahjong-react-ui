import { HAI_DIMENSIONS } from "./src/theme/haiDimensions";

// 牌サイズのTailwindユーティリティを単一の真実源(HAI_DIMENSIONS)から生成する。
// 回転時は幅と高さを入れ替える。
const haiWidth = {};
const haiHeight = {};
for (const [size, { width, height }] of Object.entries(HAI_DIMENSIONS)) {
  haiWidth[`hai-${size}`] = `${width}px`;
  haiHeight[`hai-${size}`] = `${height}px`;
  haiWidth[`hai-${size}-rotated`] = `${height}px`;
  haiHeight[`hai-${size}-rotated`] = `${width}px`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hai: {
          bg: "#f8f6f0",
          border: "#c9c5b8",
          shadow: "rgba(0, 0, 0, 0.1)",
          manzu: "#8B4513",
          pinzu: "#DC143C",
          souzu: "#228B22",
          jihai: "#1a1a1a",
          selected: "#2563EB",
          highlighted: "#FEF3C7",
        },
      },
      width: haiWidth,
      height: haiHeight,
      spacing: {
        "hai-gap": "2px",
        "furo-gap": "8px",
      },
      boxShadow: {
        hai: "0 1px 2px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        "hai-back": "0 1px 2px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
