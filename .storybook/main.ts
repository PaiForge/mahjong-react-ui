import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "riichi-mahjong": resolve(__dirname, "../../riichi-mahjong/dist"),
    };
    config.optimizeDeps = config.optimizeDeps ?? {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include ?? []),
      "riichi-mahjong",
    ];
    // SVGRプラグインを追加
    config.plugins = config.plugins ?? [];
    config.plugins.push(
      svgr({
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [{ name: "removeViewBox", active: false }],
          },
        },
      }),
    );
    return config;
  },
};

export default config;
