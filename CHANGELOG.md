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
