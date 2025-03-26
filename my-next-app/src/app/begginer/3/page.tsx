"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function AdmissionSchedulePage() {
  const [showOrientation, setShowOrientation] = useState(false);
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">合格後のスケジュール・各手続きの手順</h1>
        <ul className="list-disc list-inside space-y-1">
          <li>3/9〜3/15 入学手続き</li>
          <li>3/25〜3/31 情報サービス利用手続き</li>
          <li>4/2 オリエンテーション</li>
          <li>4/2〜4/5 履修登録</li>
          <li>4/3 入学式（大阪城ホール）</li>
          <li>〜4/4 TOEICの申し込み</li>
          <li>4/7 健康診断、学生証&通学証明書配布</li>
          <li>4/7〜（なるべく早く）電車の通学定期購入</li>
          <li>〜4/8 PCの設定</li>
          <li>4/8 授業開始</li>
          <li>4/12・13 ふたば祭</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">3/9〜3/15　入学手続きのやり方</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>大阪公立大学ポータルサイトでオンライン手続き＆入学料納付（30分〜1時間）</li>
          <li>以下の必要書類を簡易書留で郵送：
            <ul className="list-disc list-inside ml-6">
              <li>共通テスト受験票（原本）</li>
              <li>共通テスト受験票返送用封筒（返送先の住所、氏名、本学受験番号を記入し、490円分の切手を貼り付け提出）</li>
              <li>卒業証明書（前期の方は3/15、中後期の方は3/27の12:00が期限です。卒業証明書を入学手続書類郵送時に提出ができない場合は、2025年３月31日（月）までに入試課（杉本キャンパス）宛に郵送してください。）</li>
            </ul>
          </li>
        </ol>
        <Image src='/images/check.jpg' alt='手続きチェックリスト' width={300} height={200} />
        <p className="mt-2">これで手続き完了です。余裕があれば <a href="https://www.omu.ac.jp/freshers/general/" className="text-blue-600 underline">新入生ナビ</a> を確認しましょう。</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">生協・校友会・後援会・自治会について</h2>
        <p>基本的には全て入るのがおすすめです。</p>
        <h3 className="text-xl font-semibold mt-4">生協</h3>
        <p>出資金3万円が必要ですが、卒業時に全額返還されるため会費は実質500円のみ(システム利用料)。入らないと食堂やコンビニでの組合員価格が使えず値段が少し上がるので基本は入っておいた方がいいです。)</p>
        <p><a href="https://join.univcoop.or.jp/z-web/kanyu/omu" className="text-blue-600 underline">加入はこちら</a></p>
        <h3 className="text-xl font-semibold mt-4">校友会・後援会・自治会</h3>
        <p>入会費がかかるので個人単位では入るメリットが少ないですが、大学全体に向けて課外活動や学祭の支援を行っているので入らない人が増えると学祭や課外活動の規模が小さくなり全体の不利益になる可能性があります。なので皆のためにも基本は入っておきましょう。</p>
        <p><a href="https://fee.omu-zichikai.jp/join" className="text-blue-600 underline">加入はこちら</a></p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">任意保険について</h2>
        <p>任意保険(付帯学総)に加入するべきなのは主に
          <br />・運動部に入る人
          <br />・自転車通学をする人
          <br />・怪我の危険のあるバイト(飲食など)をする人
          <br />・普段から怪我や病気になることが多い人
          <br />などです。
          <br />全員加入の保険は大学関係が対象の保険で、授業中や課外活動中などが対象になりますが、任意保険に入ると大学以外でも補償の幅が広がります。しかし4年間入るとなると安くても4万弱、高いものだと10万円にもなるので、入る時はよく考えて入りましょう。元々家族で入っていた保険などと内容が被っていないかなども確認しておきましょう。
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">3/9〜3/15　情報サービス利用手続きのやり方</h2>
        <p>情報サービス利用手続きの期限は入学手続きを3/14までに行った人は3/25〜3/31、3/15以降に行った人は3/30〜3/31です。</p>

        <h3 className="text-xl font-semibold mt-4">◎3/31までに必要な手続き</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>学籍番号の確認</li>
          <li>利用開始手続きを完了</li>
          <li>OMUメールの受信ボックスを確認</li>
        </ol>

        <h3 className="text-xl font-semibold mt-4">◎初回授業(4/8)までに必要な準備</h3>
        <ul className="list-disc list-inside ml-6">
          <li>ウイルス対策の確認</li>
          <li>Office、Zoomアプリのインストール</li>
          <li>学内Wi-Fi（OMUNET Wi-Fi）に接続</li>
        </ul>

        <h4 className="text-lg font-semibold mt-4">①学籍番号の確認</h4>
        <p>学籍番号の確認には</p>
        <ol className="list-decimal list-inside ml-6">
          <li>受験番号</li>
          <li>受験時に登録した電話番号</li>
          <li>アクセスパスワード(<a href="https://sak-sak.net/portalapp/omu" className="text-blue-600 underline">https://sak-sak.net/portalapp/omu</a>＞トップ画面「学籍番号・OMUID確認」から確認可能)</li>
        </ol>
        <p>この3つが揃ったら学籍番号確認システムへアクセスしましょう。</p>
        <p>注意:学籍番号の確認は1回限りしかできません。必ずスクショを撮り、メモにも書いておきましょう。</p>
        <ol className="list-decimal list-inside ml-6">
          <li>学籍番号確認システムへアクセス(<a href="https://start.cii.omu.ac.jp/st-no/" className="text-blue-600 underline">リンク</a>)</li>
          <li>学籍番号を確認し、メモを取る</li>
        </ol>
        <p>これで学籍番号の確認は完了です。</p>

        <h4 className="text-lg font-semibold mt-4">②利用開始手続き</h4>
        <p>まずはこのサイトにアクセスしてください。<br />
        <a href="https://start.cii.omu.ac.jp/" className="text-blue-600 underline">https://start.cii.omu.ac.jp/</a></p>
        <p>右下の「次へ」を押し、先程確認したOMUIDと名前を入れて進みましょう。<br />
        パスワードの欄に生年月日を入力し、「確認」を押すとあなたのOMUIDと仮パスワードの部分が自動的に埋まります。<br />
        そしたら「次へ」を押し、仮パスワードをメモしてから「パスワード変更を始める」を押してください。(画像)<br />
        このような画面が出てくるのでOMUIDと、先程メモした仮パスワードを入れてログインしましょう。<br />
        パスワードの変更が必要と出てくるので「change」を押し、このような画面になるのでもう一度OMUIDと仮パスワードを入れてください。(画像)</p>
        <p>入力したら、その後の画面で「現在のパスワード」に先ほどの仮パスワードを入力し、新しいパスワードを考えて作りましょう。再発行用メールアドレスの欄には個人のメールアドレスを入れてください。<br />
        「変更」押すとメールで確認コードが届くので、入力して「次へ」を押しましょう。</p>
        <p>「パスワード変更が完了しました」と表示されたら変更は完了です。先ほどまでの利用開始手続きのサイトに戻り、「確認する」→「次へ」を押しましょう。「次へ」が押せるようになるまで5分ほどかかりますので、その間に<br />
        <a href="https://apps.apple.com/jp/app/google-authenticator/id388497605" className="text-blue-600 underline">Google Authenticator</a>をダウンロードしておきましょう。(画像)</p>
        <p>「二要素認証設定」の画面が出てきたら下にスクロールして「二要素認証設定を始める」を押してください。(画像)<br />
        この画面が出てきたらOMUIDと、先ほど設定したパスワードを入力して「送信」を押し、メールに届いた確認コードを入力して「コードを確認する」を押してください。(画像)<br />
        次に「セットアップキーを発行する」を押し、QRコードを表示しましょう。<br />
        表示できたら先ほどダウンロードしたGoogle Authenticatorを開いてください。Googleアカウントにログインするかどうかはどちらでもいいです。(画像)</p>
        <p>この画面が表示できたら右下の＋ボタンを押し、先ほど表示したQRコードを読み取りましょう。(読み取れない場合はアカウント名にOMUID、鍵にセットアップキーを入力して追加してください。)(画像)<br />
        この画面が出たらワンタイムパスワードの設定は完了です。<br />
        <a href="https://portal.omu.ac.jp/faq/Lists/faq/DispForm.aspx?ID=41&e=Ra65j2" className="text-blue-600 underline">https://portal.omu.ac.jp/faq/Lists/faq/DispForm.aspx?ID=41&e=Ra65j2</a><br />
        最後に、このサイトにログインすることができれば利用開始手続きは完了です。</p>

        <h4 className="text-lg font-semibold mt-4">③OMUメールの設定</h4>
        <p><a href="http://outlook.office365.com/" className="text-blue-600 underline">http://outlook.office365.com/</a> にアクセスし、(個人のOMUID)@st.omu.ac.jpと入力してください。(画像)</p>
        <p>その後ログイン画面が出るので、OMUIDとパスワード、ワンタイムパスワード(30秒ごとに切り替わるやつ、先程ダウンロードしたGoogle Authenticatorで確認)を入力して進めばOMUメールの設定は完了です。(画像)</p>
        <p>最後に下のボタンからOMUメールをお気に入り登録しておきましょう。</p>
        <p>これで3/31までに必要な情報サービス利用手続きは全て完了です。お疲れ様でした！(4/8までに必要な手続きもあります。時間があればそちらもやっておきましょう。)</p>
        <p className="mt-4">困ったときは<br />
        上記の各種手続きや今後の学生生活の情報サービスの利用で困ったことがあれば、下記リンクからサポートサービスをご利用ください。<br />
        <a href="https://www.omu.ac.jp/cii/help/" className="text-blue-600 underline">https://www.omu.ac.jp/cii/help/</a></p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4/2 オリエンテーション</h2>
        <p>オリエンテーションの場所や時間は学部ごとに違います。筆記用具を持っていきましょう。</p>
        <button
          className="mt-2 text-blue-600 underline"
          onClick={() => setShowOrientation(!showOrientation)}
        >
          オリエンテーションの時間と場所を表示する
        </button>
        {showOrientation && (
          <div className="mt-4 space-y-2">
            <p>杉本キャンパス</p>
            <p>文学部 (13:00〜15:40 1号館講堂)</p>
            <p>法学部 (13:00〜 法学部棟730教室)</p>
            <p>経済学部 (9:30〜11:30 学術情報センター10階大会議室)</p>
            <p>商学部 (9:00〜12:00 全額共通教育棟(=8号館)810教室、持ち物:ネット接続機器(スマホかタブレットかPC))</p>
            <p>理学部 (9:20〜 前半→階段教室 後半→数学科:8号館820教室 物理学科:821 化学科:822 生物学科:833 地球学科:834 生物化学科:835、持ち物: 合格通知書、黒の消せないボールペン、ネット接続機器)</p>
            <p>工学部 (9:30〜12:30 建築学科:工学部C棟508教室 都市学科:工学部A等大講義室 バイオ:工学部G棟中講義室 持ち物:黒ボールペン)</p>
            <p>生活科学部 (13:00〜16:00 前半→8号館813教室 後半→食栄養:813 居住環境:812 人間福祉:814 持ち物:黒ボールペン、PC)</p>
            <p>中百舌鳥キャンパス</p>
            <p>現シス (9:50〜12:30 知情:B1棟第1教室(終了後に新歓あり) 環社:B1棟東大教室 教福:第3教室 心理:第5教室(持ち物:昼食) 学単:第2教室)</p>
            <p>工学部 (9:30〜12:30 航空宇宙:A5棟205 海洋システム:A5棟204 機械工:A5棟大教室 電子物理:B3棟118 情報工:A5棟123 電気電子システム:A5棟202 応用化学:A5棟124 化学工:A5棟103 マテリアル工:A5棟104 持ち物:黒ボールペン)</p>
            <p>農学部 (13:00〜16:00 応用生物:B11棟第3講義室 生命機能:第4講義室 緑地環境:第5講義室 持ち物:筆記用具)</p>
            <p>獣医学部 (13:00〜16:00 B11棟 第2講義室 持ち物:筆記用具)</p>
            <p>阿倍野キャンパス</p>
            <p>医学部 (医学科:11:30〜14:00 医学部学舎6階 中講義室2 午前中は抗体検査あり リハ科:12:10〜15:30 看護学部学舎B棟3階講義室A 午前中は実習着採寸・抗体検査あり 持ち物: <a href="https://www.omu.ac.jp/freshers/assets/2025_igakuburihabiri_sinyuseinominasan_re20250305.pdf" className="text-blue-600 underline">参照</a>)</p>
            <p>看護学部 (9:45〜13:10 看護学部学舎B棟5階多目的ホール 持ち物: <a href="https://www.omu.ac.jp/freshers/assets/2025_igakuburihabiri_sinyuseinominasan_re20250305.pdf" className="text-blue-600 underline">参照</a>)</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4/3 入学式について</h2>
        <p>4月3日（木）14時00分－15時25分 大阪城ホール</p>
        <p>入学式には予約が必要です。このフォーム（<a href="https://www.omu.ac.jp/event/entry-03718.html" className="text-blue-600 underline">https://www.omu.ac.jp/event/entry-03718.html</a>）から同伴者2名までも含めて予約をしてください。（1回しか予約はできません）</p>
        <p>行く時には合格通知を持っていきましょう。</p>
        <p>入学式の時点ではまだ1人の人が多く、終わってからでも友達は作れるので一緒に行く人がいなくても全く心配ないです。前後で新歓なども一切ありません。入学式にはスーツで行く人がほとんどなのでまだ持っていない人は買っておきましょう。</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4/4まで TOEICの申し込み</h2>
        <p><a href="https://omucoop.jp/book/book_439.html" className="text-blue-600 underline">https://omucoop.jp/book/book_439.html</a></p>
        <p>ここからTOEICの申し込みをしましょう。1年後期からは英語の成績にも入るので基本的には申し込まないといけません。どうしても嫌なら受けないこともできなくはないですが、6〜10点を失うことになります。</p>
      </section>
    </main>
  );
}
