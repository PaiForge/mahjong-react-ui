# アーキテクチャガイド

このドキュメントでは、`mahjong-react-ui` のアーキテクチャ上の決定事項とディレクトリ構成について説明します。

## ディレクトリ構成

UIライブラリであるため、主にコンポーネント単位で整理されています。

```
src/
  components/       # UIコンポーネント
    [Component]/    # 各コンポーネントごとのディレクトリ
      index.ts      # コンポーネントの公開API
      [Component].tsx # コンポーネントの実装
      [Component].stories.tsx # Storybookストーリー
      [Component].test.tsx    # ユニットテスト
  types/            # 共有の型定義
  utils/            # 共有ユーティリティ関数
  assets/tiles/     # 牌画像（PNG）。index.ts が画像本体、file-names.ts が牌の種類 → ファイル名の表
  index.ts          # 全てのコンポーネントと型をエクスポートするメインエントリポイント
  bundled-images.ts # 同梱画像（data URI）だけを公開する別エントリ（`./bundled-images`）
assets/tiles/       # ビルドで src/assets/tiles の PNG を写した配布用（git 管理外）
```

## 設計原則

### 1. 関数コンポーネント (Functional Components)
すべてのコンポーネントは、必要に応じてHooksを使用するReact関数コンポーネント (FC) として記述されます。

### 2. Propsインターフェース
各コンポーネントは、共有の `types` ディレクトリ、またはコンポーネント固有の場合はローカルから、Propsインターフェース（例: `HaiProps`, `TehaiProps`）をエクスポートします。
- **接頭辞**: Propsには通常 `Props` という接尾辞が付きます。
- **読み取り専用**: 不変性を保証するために、`readonly` プロパティを推奨します。

### 3. スタイリング
- **`Hai` は react-native の部品で描く**: `Image` / `Pressable` / `View` と `StyleSheet` で
  描き、React Native と Web（react-native-web、または利用側の shim）の両方で動かします。
  テストは `react-native` を react-native-web に向けて jsdom で走らせています。
- **`HaiBack` / `Furo` / `Tehai` は web 専用**: `<img>` / `<div>` と Tailwind のクラスで描きます。
- **Tailwind CSS**: web 専用のコンポーネントのスタイリングにはTailwind CSSを使用します。
- **スコープされたスタイル**: 利用側のアプリケーションに影響を与えないよう、グローバルスタイルの使用は避けます。
- **テーマ設定**: 必要に応じて、CSS変数やTailwindの設定を通じて、ダークモードやカスタムテーマのサポートを目指します。

### 4. ロジックの分離
複雑なドメインロジック（シャンテン計算、役判定など）は `riichi-mahjong` ライブラリに委譲します。このUIパッケージは、**レンダリング** と **ユーザーインタラクション** にのみ焦点を当てます。

### 5. 牌画像の参照先
`Hai` / `HaiBack` は画像の参照先を `useTileImage` で引きます。参照先を決めるのは
利用側のルートに置く `TileImageProvider` の `resolve` で、Provider が無ければ
例外を投げます（同梱画像へのフォールバックは持ちません）。
参照先（`TileImageSource`）は文字列か `{ uri }` で、`<img src>` に渡すときは
`toTileImageUri`、React Native の `Image` に渡すときは `toTileImageSource` で形を揃えます
（React Native の `Image` は文字列の `source` を同梱画像の ID とみなし、何も描きません）。

画像本体は 2 つの形で配ります。

- `assets/tiles/*.png`（npm パッケージに同梱）。web はこれを自分の公開ディレクトリに
  置き、`createTileImageResolver` と `TILE_IMAGE_FILE_NAMES`（`src/assets/tiles/file-names.ts`）
  で参照先を組み立てる
- `@pai-forge/mahjong-react-ui/bundled-images`（`src/bundled-images.ts`）。Vite の
  ライブラリモードが PNG を base64 の data URI に埋め込んだもので、静的ファイルを
  配信できない React Native 向け

画像本体をメインのエントリから切り離しているのは、0.5.0 まで `useTileImage` が
同梱画像へフォールバックしていたために、メインのエントリが 35 枚の data URI
（2MB 超）を抱え、静的ファイルに切り替えた web アプリでも牌を描かないページまで
画像本体をバンドルに載せていたためです（バンドラの tree shaking では落ちない —
`Hai` → `useTileImage` → 画像の参照が静的に繋がっている）。`index.ts` 側の
モジュールが画像を参照しないことは `scripts/assert-no-inline-images.mjs` が
ビルドの最後に検査します。画像の取得方法（静的ファイル・CDN・縮小版）は
ライブラリが決めず、利用側の `resolve` に委ねます。

## 依存関係
- `riichi-mahjong`: コアロジックライブラリ（現在はローカル依存）。
- `react`, `react-dom`: ピア依存関係 (Peer Dependencies)。

## Storybook
コンポーネントの開発とドキュメント作成にはStorybookを使用します。常に最新の状態を保つため、ストーリーはコンポーネントと同じ場所に配置（Co-location）しています。
