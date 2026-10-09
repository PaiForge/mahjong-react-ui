// メインのエントリ（dist/index.js / index.cjs）に画像本体（base64 の data URI）が
// 入っていないことを確かめる。画像は別エントリ（dist/bundled-images.*）だけが持つ。
// `pnpm build` の最後に走り、画像を参照するモジュールがメインのエントリへ
// 紛れ込んだ（= 利用側のバンドルが 2MB 超太る）時点でビルドを落とす。
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const DATA_URI = "data:image/";

const mustNotHave = ["index.js", "index.cjs"];
const mustHave = ["bundled-images.js", "bundled-images.cjs"];

for (const name of mustNotHave) {
  const source = readFileSync(join(dist, name), "utf8");
  if (source.includes(DATA_URI)) {
    console.error(
      `dist/${name} に画像の data URI が入っています。画像本体は bundled-images にだけ置いてください`,
    );
    process.exit(1);
  }
}

for (const name of mustHave) {
  const source = readFileSync(join(dist, name), "utf8");
  const count = source.split(DATA_URI).length - 1;
  if (count !== 35) {
    console.error(
      `dist/${name} の画像が ${count} 枚です（34 種 + 裏面 = 35 枚のはず）`,
    );
    process.exit(1);
  }
}

console.log(
  "dist/index.* に画像本体は無く、dist/bundled-images.* が 35 枚を持つ",
);
