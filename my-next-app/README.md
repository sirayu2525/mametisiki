# my-next-app

## Getting Started

このプロジェクトのローカル開発は Bun を使います。

```bash
bun install
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと確認できます。

## Useful Commands

```bash
bun run build
bun run start
bun run lint
bun run db:seed
bun run import:csv
```

## Notes

- `bun dev` で `@next/swc-linux-x64-gnu` 読み込み時の `Bus error` が出る場合は、`rm -rf node_modules` のあとに `bun install` をやり直す。
- `package-lock.json` は残っていても、ローカル開発では Bun を優先して使う。
