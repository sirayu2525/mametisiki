# mametisiki

## 大阪公立大学専用 豆知識サイト 要件定義書(適当)

1. 背景

大阪公立大学に関する豆知識をまとめた既存のTwitterアカウントの情報を、より見やすく、検索しやすい形で提供するため、Webサイトを構築する。

学生や新入生が大学生活をより豊かに、楽しく過ごせるような情報提供を目指す。

2. プロジェクト概要

プロジェクト名：大阪公立大学 豆知識サイト

3. サイト構成

トップページ新着記事 

いいねボタン

いいね！数によるトレンド記事

タグクラウド 

検索窓

広告掲載エリア

記事ページ記事タイトル 

記事本文 

投稿日時 

ハッシュタグ 

関連する豆知識へのリンク

シェアボタン (Twitter, Facebookなど)

タグ一覧 

各タグに紐づく記事一覧へのリンク 

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

CI/CD (GitHub Actions) を活用（自動デプロイを実現）
Nginx + Let’s Encrypt でSSL対応


Top（トレンドと新着を数件）、記事一覧（新着順と人気順、タグ検索機能）


## Memo

## Bun のインストール

macOS / Linux:
```
curl -fsSL https://bun.com/install | bash
```

Homebrew を使う場合:
```
brew install bun
```

Windows PowerShell:
```
powershell -c "irm bun.sh/install.ps1|iex"
```

インストール後、新しいターミナルを開いて確認する。
```
bun --version
```

`bun: command not found` になる場合は、`~/.bun/bin` に PATH が通っていない可能性がある。zsh の場合は `~/.zshrc` に以下を追加して、ターミナルを開き直す。
```
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

## ローカル開発
```
cd ~/mametisiki/my-next-app
bun install
bun dev
```

よく使うコマンド
```
bun run build
bun run lint
bun run start
```

Bun について
```
`bun dev` で `@next/swc-linux-x64-gnu/next-swc.linux-x64-gnu.node`
読み込み時の `Bus error` が出た場合は、
`rm -rf node_modules && bun install` を試す。
```

本番環境にSupabaseマイグレーションするとき、DIRECTURLじゃないとだめだった

```
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

```

### 1️⃣ 最新のコードを取得（Git を使っている場合）
```
git pull origin main  または `git pull origin master`
```
### 2️⃣ Next.js の依存関係を更新（変更があった場合のみ）
```
bun install  # 必要に応じて実行
```
### 3️⃣ Next.js を再ビルド
```
bun run build
```


### 4️⃣ PM2 で Next.js を再起動
```
pm2 restart next-app
```

`pm2 restart next-app` はそのままでよい。PM2 に登録済みのプロセスを再起動するだけなので、ビルドを `bun run build` に変えてもここは変わらない。



### Nginx の設定を有効化
```
sudo ln -s /etc/nginx/sites-available/next-app /etc/nginx/sites-enabled/
```

###  設定チェック
```

sudo nginx -t

sudo systemctl restart nginx

sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

sudo tail -n 100 /var/log/nginx/access.log
sudo tail -n 100 /var/log/nginx/error.log
```

## リスクマネージメント

１．リスク特定
DBの情報書き換え、VPS乗っ取り、DDos攻撃

２．リスク分析
DB書き換え：このサイトの根幹を揺るがすレベル。さらに部の信用にも関わる。発せ確率はURLを外に漏らさず、認証式にすれば低いと思うが、URLを知ってる人が全員入れる状態だと高くなる。
VPS乗っ取り：発生確率は極小。
DDos攻撃：UXに関わる。発生確率は誰かの悪意をもらわない限り大丈夫。

３．リスク評価

４．リスク対応
DB書き換え：管理の徹底。認証式にすることと抜けた部員を削除すること。
DDos攻撃：Cloudflareにデプロイで対応。



## 再起動法
```
:~/mametisiki/my-next-app
npm install(必要があれば)
pm2 stop next-app
npm run build
pm2 restart next-app
```

1行で実行する場合は、コマンドの間を `&&` でつなぐこと。
```
pm2 stop next-app && npm run build && pm2 restart next-app
```


## 疑問や今後の拡張性
APIをapiディレクトリに分ける必要はあるのか。例えば[id]のページとか。

        <a href="/posts/first-post">Link</a>で書き出されている

        Linkの中にaタグを入れる理由

        <Link href="">: クライアントサイドで遷移させるため
        <a>: SEO対策 aタグだとBotに理解してもらうため(hrefは不要)
とあるんだけどまじ？

TanStack Query (React Query)
これでArticleの最新情報を取得できるのでは？

https://zenn.dev/uhyo/articles/react-server-components-multi-stage
クソわかりやすいRSCの説明
状態管理を使うという意味(=ブラウザの処理を必要とする)でのユーザー操作。このユーザー操作が必要なコンポーネントがstage1
それ以外がstage0とする。
stage0はリクエスト時に変わるものもあれば、変わらずビルド時にキャッシュされているものもある。
SSR（サーバーサイドレンダリング）という用語の定義をもう一度思い出して欲しいのだが、
最初の初期表示のみサーバーで全ての描画を終え、そのあとは普通のSPAであった。
RSC以降のSSRはそのstage0,stage1（stage1は初期表示）をサーバー、stage1をクライアント側で行うということになったのだ。

一つの疑問の解消がこの記事でできた。この記事に「App Routerでは、ビルド時に「stage 0のコンポーネントを実際に実行してみて、リクエスト時の情報を取得しようとしたかどうか」を見て判断する」とある。私はハムバスの制作において、データフェッチの時にリロードしても更新されなかったのはリクエスト情報を必要としていないコンポーネントだったからなのか。

あれでも、「fetchを使用した場合はキャッシュ関連のオプションを見て判断されます。cache: 'no-cache'もrevalidateも指定されていなければ永遠にキャッシュ可能と見なされ、ビルド時に取得されたデータがずっと使用されます。これらのオプションが指定されていた場合はビルド時に取得したデータをずっと使うわけにはいきませんから、ランタイムに（リクエスト時に）stage 0の実行が必要であると判断されます。」ともあるぞ？

apiディレクトリに分ける意味あんまない気がする。apiディレクトリを作るとき、クライアントからアクセスしたい時だと思うから。普通にフェッチする関数（コンポーネント）を作ってどっかのファイルに置いておけばいい気がする。

import "server-only";をデータフェッチのコンポーネントに入れておく

並列にデータフェッチができているかの確認

