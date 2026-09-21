// 同梱の牌画像（src/assets/tiles/*.png）を npm パッケージの assets/tiles/ へ写す。
// 利用側が `TileImageProvider` で静的ファイルとして配信するための原本。
// `pnpm build` の最後に走る（package.json の files に assets を含める）。
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src", "assets", "tiles");
const dest = join(root, "assets", "tiles");

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
const pngs = readdirSync(src).filter((name) => name.endsWith(".png"));
for (const name of pngs) cpSync(join(src, name), join(dest, name));
console.log(`copied ${pngs.length} tile images to assets/tiles/`);
