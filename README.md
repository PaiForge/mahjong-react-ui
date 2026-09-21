# Mahjong React UI

[![npm version](https://img.shields.io/npm/v/@pai-forge/mahjong-react-ui)](https://www.npmjs.com/package/@pai-forge/mahjong-react-ui)

麻雀（リーチ麻雀）のReact UIコンポーネントライブラリ。

## インストール

```bash
npm install @pai-forge/mahjong-react-ui
```

## 使い方

コンポーネントの使用例やバリエーションを確認するには、Storybookを参照するのが最も簡単です。

```bash
npm run dev
# Storybookが起動し、すべてのコンポーネントを確認できます
```

### コード例

```tsx
import { Hai, HaiKind } from '@pai-forge/mahjong-react-ui';

function App() {
  return <Hai hai={HaiKind.ManZu1} size="md" />;
}
```

### 牌画像を静的ファイルとして配信する

既定では `Hai` / `HaiBack` はパッケージに同梱した画像（base64 の data URI）を描きます。
data URI は HTML / JS に画像本体ごと埋め込まれるため、牌を多く並べるページでは転送量が
大きくなり、ブラウザのキャッシュにも乗りません。牌を多く描くアプリは
`TileImageProvider` で参照先を静的ファイルに切り替えてください。

1. パッケージ同梱の PNG（`node_modules/@pai-forge/mahjong-react-ui/assets/tiles/*.png`、
   600×800）を自分の公開ディレクトリへ置く。表示サイズに合わせて縮小・WebP 化してよい
2. アプリのルートを `TileImageProvider` で囲む

```tsx
import {
  Hai,
  HaiKind,
  TileImageProvider,
  createTileImageResolver,
} from '@pai-forge/mahjong-react-ui';

// /tiles/Man1.webp のように配信している場合
const resolveTileImage = createTileImageResolver({
  baseUrl: '/tiles',
  extension: '.webp',
});

function App() {
  return (
    <TileImageProvider resolve={resolveTileImage}>
      <Hai hai={HaiKind.ManZu1} size="md" />
    </TileImageProvider>
  );
}
```

ファイル名は `TILE_IMAGE_FILE_NAMES` が持ちます（裏面は `"back"`）。`resolve` は
牌の種類を受け取って参照先を返す関数なので、CDN やサイズ別の出し分けも自由です。
`Hai` の `alt` は省略時に牌の名前（`getHaiName`、例: 一萬・東）になります。

## ドキュメント

- [アーキテクチャガイド](./docs/architecture.md)

## ライセンス

MIT
