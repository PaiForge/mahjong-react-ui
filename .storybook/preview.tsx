import type { Preview } from "@storybook/react";
import { resolveBundledTileImage } from "../src/bundled-images";
import { TileImageProvider } from "../src/components/TileImageProvider";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // 牌は TileImageProvider の外では描けないので、全ストーリーを同梱画像で包む。
  // 静的ファイルに切り替える例（Hai の WithStaticFiles）は自分の Provider で上書きする
  decorators: [
    (Story) => (
      <TileImageProvider resolve={resolveBundledTileImage}>
        <Story />
      </TileImageProvider>
    ),
  ],
};

export default preview;
