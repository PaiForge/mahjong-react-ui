# Mahjong React UI

[![npm version](https://img.shields.io/npm/v/@pai-forge/mahjong-react-ui)](https://www.npmjs.com/package/@pai-forge/mahjong-react-ui)

麻雀（リーチ麻雀）のReact UIコンポーネントライブラリ。

## インストール

```bash
npm install @pai-forge/mahjong-react-ui
```

## 対応プラットフォーム

| 公開 API | Web（DOM） | React Native |
| --- | --- | --- |
| `Hai`、`TileImageProvider` と関連関数、ユーティリティ | ○ | ○ |
| `HaiBack`、`Furo`、`Tehai` | ○ | ×（web 専用） |

`Hai` は react-native の `Image` / `Pressable` / `View` で描くので、React Native
（Expo を含む）でそのまま使えます。Web では react-native-web、またはそれらを
`<img>` / `<div>` に写す利用側の shim で描きます。

`HaiBack` / `Furo` / `Tehai` は `<img>` / `<div>` と Tailwind のクラスで描く web 専用の
コンポーネントで、React Native では描けません。ネイティブで副露や裏面を並べる場合は、
`Hai` と `useTileImage("back")` / `toTileImageSource` を使って利用側で組み立ててください。

## 使い方

コンポーネントの使用例やバリエーションを確認するには、Storybookを参照するのが最も簡単です。

```bash
pnpm install
pnpm dev
# Storybookが起動し、すべてのコンポーネントを確認できます
```

### コード例

```tsx
import { Hai, HaiKind } from '@pai-forge/mahjong-react-ui';

function App() {
  // 牌はルートの TileImageProvider（次の節）の配下で描く
  return <Hai hai={HaiKind.ManZu1} size="md" />;
}
```

### 牌画像の参照先を決める（必須）

`Hai` / `HaiBack` は `TileImageProvider` の配下でだけ描けます（Provider が無いと
例外を投げます）。画像の参照先は利用側が `resolve` で決めます。

#### web: 静的ファイルとして配信する

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

#### React Native など、静的ファイルを配信できない環境: 同梱画像を使う

画像本体（base64 の data URI、35 枚で 2MB 超）は別エントリ
`@pai-forge/mahjong-react-ui/bundled-images` にあります。メインのエントリには
入っていないので、静的ファイルに切り替えた web アプリのバンドルは太りません。

```tsx
import { Hai, HaiKind, TileImageProvider } from '@pai-forge/mahjong-react-ui';
import { resolveBundledTileImage } from '@pai-forge/mahjong-react-ui/bundled-images';

function App() {
  return (
    <TileImageProvider resolve={resolveBundledTileImage}>
      <Hai hai={HaiKind.ManZu1} size="md" />
    </TileImageProvider>
  );
}
```

web でこれを使うと、牌を並べるページの HTML / JS に画像本体がそのまま入り、
ブラウザのキャッシュにも乗りません。web は静的ファイルの方を使ってください。

`resolve` の戻り値（`TileImageSource`）は文字列か `{ uri }` です。自分で描くときは、
web の `<img src>` には `toTileImageUri`、React Native の `Image` の `source` には
`toTileImageSource` を通してください。React Native の `Image` は文字列の `source` を
同梱画像の ID とみなして何も描かないためです。

## ドキュメント

- [アーキテクチャガイド](./docs/architecture.md)

## ライセンス

MIT
