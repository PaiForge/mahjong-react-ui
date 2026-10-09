import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // SVGをReactコンポーネントに変換する際のオプション
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx", "src/test/**"],
    }),
  ],
  build: {
    lib: {
      // 画像本体（base64 の data URI、2MB 超）は bundled-images にだけ入れる。
      // index から画像のモジュールを参照しないことは scripts/assert-no-inline-images.mjs が
      // ビルドの最後に検査する
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "bundled-images": resolve(__dirname, "src/bundled-images.ts"),
      },
      name: "MahjongReactUI",
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@pai-forge/riichi-mahjong", "react-native"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@pai-forge/riichi-mahjong": "RiichiMahjong",
          "react-native": "ReactNative",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
