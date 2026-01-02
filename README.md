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

## ドキュメント

- [アーキテクチャガイド](./docs/architecture.md)

## ライセンス

MIT
