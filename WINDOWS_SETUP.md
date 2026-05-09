# Windows + WSL環境構築手順（完全版）

このドキュメントでは、Windows環境でWSL2を導入し、このプロジェクトを動作させるまでの完全な手順を説明します。

## 目次

1. [WSL2のインストール](#1-wsl2のインストール)
2. [WSL2の確認とアップデート](#2-wsl2の確認とアップデート)
3. [Ubuntu（WSL）でのセットアップ](#3-ubuntuwslでのセットアップ)
4. [Node.jsとnpmのインストール](#4-nodejsとnpmのインストール)
5. [プロジェクトの準備](#5-プロジェクトの準備)
6. [プロジェクトのセットアップ](#6-プロジェクトのセットアップ)
7. [Prismaのセットアップ](#7-prismaのセットアップ)
8. [CSVファイルのインポート](#8-csvファイルのインポート)
9. [開発サーバーの起動](#9-開発サーバーの起動)
10. [補足情報](#補足情報)
11. [トラブルシューティング](#トラブルシューティング)

---

## 1. WSL2のインストール

**PowerShellを管理者権限で開く**

スタートメニューで「PowerShell」を検索 → 右クリック → 「管理者として実行」

```powershell
# WSLのインストール（最新版）
wsl --install

# PCを再起動
```

再起動後、Ubuntuが自動的にセットアップされます。
- ユーザー名とパスワードを設定してください（任意の名前でOK）

---

## 2. WSL2の確認とアップデート

再度PowerShellを開き、以下を実行して確認します。

```powershell
# WSLのバージョン確認
wsl --version

# インストール済みのディストリビューション確認
wsl -l -v

# バージョンが1の場合は2に変更
wsl --set-version Ubuntu 2
wsl --set-default-version 2
```

---

## 3. Ubuntu（WSL）でのセットアップ

Ubuntuターミナルを開きます（スタートメニューから「Ubuntu」を検索）。

```bash
# システムアップデート
sudo apt update && sudo apt upgrade -y

# 必要なパッケージのインストール
sudo apt install -y curl git build-essential
```

---

## 4. Node.jsとnpmのインストール

```bash
# nvm（Node Version Manager）のインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# nvmを有効化
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# .bashrcに反映
source ~/.bashrc

# Node.js LTS版をインストール
nvm install --lts
nvm use --lts

# バージョン確認
node -v
npm -v
```

---

## 5. プロジェクトの準備

### 5-1. Gitでクローンする場合

```bash
# SSHキーの生成（GitHubを使う場合）
ssh-keygen -t ed25519 -C "your_email@example.com"
# Enterを3回押す

# 公開鍵を表示してGitHubに登録
cat ~/.ssh/id_ed25519.pub
# 表示された内容をコピーしてGitHubのSettings > SSH keysに登録

# プロジェクトをクローン
git clone git@github.com:your-username/mametisiki.git
cd mametisiki/my-next-app
```

### 5-2. Windows側からファイルをコピーする場合

WSLからWindowsのファイルにアクセスできます。

```bash
# Windowsのファイルシステムは /mnt/c/ 配下にマウントされています
# 例: C:\Users\YourName\Desktop\mametisiki → /mnt/c/Users/YourName/Desktop/mametisiki

# プロジェクトをWSLのホームディレクトリにコピー
cp -r /mnt/c/Users/YourName/Desktop/mametisiki ~/
cd ~/mametisiki/my-next-app
```

---

## 6. プロジェクトのセットアップ

```bash
# 依存関係のインストール
npm install

# .envファイルの作成
cp .env.example .env
nano .env  # または vi .env
```

### .envファイルに以下を設定

```env
# DATABASE の設定（Supabaseから取得）
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres

# Supabase の設定
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

NEXT_PUBLIC_API_URL=http://localhost:3000
```

**エディタの保存方法:**
- nanoの場合: `Ctrl + X` → `Y` → `Enter`
- viの場合: `Esc` → `:wq` → `Enter`

---

## 7. Prismaのセットアップ

```bash
# Prismaクライアントの生成
npx prisma generate

# データベースマイグレーション（初回のみ）
npx prisma migrate deploy

# Prisma Studioでデータベース確認（オプション）
npm run db:studio
```

---

## 8. CSVファイルのインポート

CSVファイルを配置します。

```bash
# Windows側のCSVファイルをコピー（必要に応じて）
cp /mnt/c/Users/YourName/Desktop/提出情報.csv ~/mametisiki/

# プロジェクトディレクトリから実行
cd ~/mametisiki/my-next-app

# CSVインポートを実行（package.jsonのスクリプトを使用）
npm run import:csv ../提出情報.csv
```

または、直接コマンドで実行する場合:

```bash
node --import=tsx scripts/importCsv.ts ../提出情報.csv
```

**重要:** このスクリプトは既存データを全削除して新しくインポートします。

---

## 9. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev
```

ブラウザで以下にアクセス:
- `http://localhost:3000`

---

## 補足情報

### Windows側でVSCodeを使ってWSLを編集する

```bash
# WSL内でVSCodeを開く
code .
```

初回は「WSL」拡張機能のインストールが促されます。インストール後、VSCodeでWSL内のファイルを直接編集できます。

### WSLとWindowsのファイル共有

- **Windows → WSL**: `/mnt/c/Users/YourName/...`
- **WSL → Windows**: `\\wsl$\Ubuntu\home\username\...` （エクスプローラーのアドレスバーに入力）

### よく使うコマンド

```bash
# WSLの起動（PowerShellから）
wsl

# WSLのシャットダウン（PowerShellから）
wsl --shutdown

# 特定のディストリビューションを起動
wsl -d Ubuntu

# WSL内で現在のディレクトリをエクスプローラーで開く
explorer.exe .
```

### その他の便利なnpmスクリプト

```bash
# ビルド
npm run build

# 本番環境での起動
npm run start

# リント
npm run lint

# データベースシード
npm run db:seed

# Prisma Studio
npm run db:studio
```

---

## トラブルシューティング

### エラー: "EACCES: permission denied"

ファイルの所有権を変更します。

```bash
sudo chown -R $USER:$USER ~/mametisiki
```

### Node.jsのバージョンが合わない

```bash
# 特定のバージョンをインストール
nvm install 20  # または 18
nvm use 20

# プロジェクトのNode.jsバージョンを確認
node -v
```

### Prismaの接続エラー

- `.env`ファイルの`DATABASE_URL`と`DIRECT_URL`を確認
- Supabaseダッシュボードで接続文字列を再確認
- DATABASE_URLはPooling URL（ポート6543）を使用
- DIRECT_URLはDirect URL（ポート5432）を使用

### CSVインポートでSupabaseエラー

- `SUPABASE_SERVICE_ROLE_KEY`が正しく設定されているか確認
- Supabase Storageに`club-images`バケットが作成されているか確認
- バケットのポリシーでPublicアクセスが許可されているか確認

### WSLが起動しない

```powershell
# PowerShellで実行
wsl --update
wsl --shutdown
wsl
```

### ポートが既に使用されている

```bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# プロセスを終了（PIDは上記コマンドで確認）
kill -9 <PID>
```

---

## 参考リンク

- [WSL公式ドキュメント](https://docs.microsoft.com/ja-jp/windows/wsl/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Prisma公式ドキュメント](https://www.prisma.io/docs)
- [Supabase公式ドキュメント](https://supabase.com/docs)

---

## ライセンス

このプロジェクトのライセンスについては、リポジトリのLICENSEファイルを参照してください。
