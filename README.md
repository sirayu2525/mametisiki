# mametisiki

大阪公立大学専用 豆知識サイト 要件定義書

1. 背景

大阪公立大学に関する豆知識をまとめた既存のTwitterアカウントの情報を、より見やすく、検索しやすい形で提供するため、Webサイトを構築する。

学生や新入生が大学生活をより豊かに、楽しく過ごせるような情報提供を目指す。

2. プロジェクト概要

プロジェクト名：大阪公立大学 豆知識サイト

3. サイト構成

トップページ新着記事 o

いいねボタン

いいね！数によるトレンド記事

タグクラウド o

検索窓

広告掲載エリア o

記事ページ記事タイトル o

記事本文 o

投稿日時 o

ハッシュタグ o

関連する豆知識へのリンク

シェアボタン (Twitter, Facebookなど)

タグ一覧 o

各タグに紐づく記事一覧へのリンク o

タグ検索

お問い合わせページ



4. システム要件



データベース記事データ、タグ情報、いいね！情報などを格納するデータベースが必要。

検索機能記事タイトル、本文、ハッシュタグを対象とした全文検索機能を実装。

トレンド機能いいね！数を元に、トレンド記事を自動的に表示する機能。

集計期間の設定 (例：過去24時間、過去7日間、過去30日間)

タグ検索機能ハッシュタグをクリックすることで、該当するタグの記事一覧を表示する機能。

レスポンシブデザインPC、スマートフォン、タブレットなど、様々なデバイスに対応した表示。

（広告配信システムGoogle AdSenseなどの広告配信システムとの連携機能。）

Docker + Docker Compose で管理（環境を統一しデプロイを簡単にする）
CI/CD (GitHub Actions) を活用（自動デプロイを実現）
Nginx + Let’s Encrypt でSSL対応


npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Top（トレンドと新着を数件）、記事一覧（新着順と人気順、タグ検索機能）


## Memo

本番環境にSupabaseマイグレーションするとき、DIRECTURLじゃないとだめだった
ParamsがPromiseなの腹立つ

ssh username@VPS_IP_ADDRESS
sudo apt update
sudo apt install -y nodejs npm git
node -v
npm -v
git clone git@github.com:your-username/your-repository.git
cd your-repository
nano .env
npm install
npx prisma migrate deploy
npm run build
npm install -g pm2
pm2 start npm --name "next-app" -- start
pm2 save
pm2 startup
pm2 list
pm2 logs next-app


# 1️⃣ 最新のコードを取得（Git を使っている場合）
git pull origin main  # または `git pull origin master`

# 2️⃣ Next.js の依存関係を更新（変更があった場合のみ）
npm install  # 必要に応じて実行

# 3️⃣ Next.js を再ビルド
npm run build

# 4️⃣ PM2 で Next.js を再起動
pm2 restart next-app

sudo nano /etc/nginx/sites-available/next-app

server {
    listen 80;
    server_name 49.212.162.72;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Nginx の設定を有効化
sudo ln -s /etc/nginx/sites-available/next-app /etc/nginx/sites-enabled/
# ③ 設定チェック
sudo nginx -t

sudo systemctl restart nginx
