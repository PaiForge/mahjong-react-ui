## 0.5.0 (2026-10-07)

### Fixed

- React Native で `Hai` の牌画像が描かれず白い枠だけになっていた不具合を修正した。
  `Hai` は `useTileImage` の戻り値（既定は data URI の文字列）をそのまま `Image` の
  `source` に渡していたが、React Native の `Image` は文字列の `source` を同梱画像の
  ID とみなして何も描かない（react-native-web と web の shim は文字列も受けるため
  web では出ていなかった）。`Image` に渡す直前に `{ uri }` へ揃えるようにした
- 押せない `Hai`（`onClick` 無し）は `Pressable` ではなく `View` で包むようにした。
  React Native では最も内側の `Pressable` がタッチを受け取るため、ボタンの中に
  置いた牌が親のタップを奪っていた

### Added

- `toTileImageSource`: `TileImageSource` を React Native の `Image` の `source` に
  渡せる `{ uri }` にする（web の `<img src>` 向けの `toTileImageUri` の対）。
  `resolve` の契約（文字列か `{ uri }`）は変わらない
- README に対応プラットフォームの表を追加。`HaiBack` / `Furo` / `Tehai` は
  `<img>` / `<div>` と Tailwind のクラスで描く web 専用であることを README と
  TSDoc に明記した

### Changed

- `@pai-forge/riichi-mahjong` を `^1.0.0` に更新した。`FuroProps.furo` 等が参照する
  `Furo` 型は 1.0.0 のもの（鳴いた牌 `nakiHai` が必須）になる。利用側も
  riichi-mahjong 1.0.0 系で使うこと
- 使われていなかった `Hai.native.tsx` を削除した（公開物には型定義しか入っておらず、
  実装は `Hai.tsx` に一本化されている）
- ロックファイルを `pnpm-lock.yaml` に一本化し、`package-lock.json` を削除した

## 0.4.0 (2026-09-21)

### Added

- `TileImageProvider` / `useTileImage` / `createTileImageResolver`: 牌画像の参照先を
  静的ファイルや CDN に差し替えられるようにした。既定（Provider なし）は従来どおり
  同梱の data URI を描く
- npm パッケージに牌画像の PNG（`assets/tiles/*.png`）を同梱し、
  `TILE_IMAGE_FILE_NAMES` で牌の種類とファイル名を対応付けた
- `Hai` に `alt` を追加。省略時は牌の名前（`getHaiName`、例: 一萬・東）
- `getHaiName`: 牌の名前を返すユーティリティ

### Changed

- 押せない `Hai`（`onClick` 無し）は `role="button"` を名乗らなくなった
- `getTileImage` を `getBundledTileImage` に改名（旧名は deprecated として残す）

## 0.2.0 (2026-01-14)

### Changed

- パッケージマネージャーを pnpm から npm に移行
- vitest を 4.x にアップグレード
- @pai-forge/riichi-mahjong を 0.3.1 にアップデート

## 0.1.0 (2026-01-11)

### Added

- 初回リリース
- Hai, Tehai, Furo コンポーネント
