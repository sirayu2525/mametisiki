export default function NewStudentGuide() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">新入生が迷いやすいことについての解説・アドバイス</h1>
  

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">授業の教室はどこ？</h2>
          <p>
            UNIPAを開き、上の日付を授業日に合わせると表示されます。
            <br />教室名が8から始まるものは全て8号館(=全学共通教育棟)にあります。
          </p>
          {/* 画像: UNIPAの使い方×2枚 */}
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">遠隔(オンライン)授業はどうやって受ける？</h2>
          <p>
            授業時間になるとmoodleに動画が投稿されるので、スマホやパソコンで好きなタイミングで視聴可能です。
            <br />学内なら学情や2号館（白い建物）の空き教室で視聴するのもおすすめです。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">友達はどうやって作る？</h2>
          <p>
            授業や新歓で出会った人に話しかけてみましょう。
            <br />SNS（インスタやX）で大学用アカウントを作って繋がるのもおすすめです。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">テストの対策はどうする？</h2>
          <p>
            テストの1〜2週間前に範囲が発表されるので、それに従って勉強を始めましょう。
            <br />プリントやmoodle資料を取っておくと役に立ちます。過去問を先輩からもらうのもアリです。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">学校を休むときはどうする？</h2>
          <p>
            体調不良の時は早めに教員にメールまたはmoodleのメッセージで連絡しましょう。
            <br />連絡すれば欠席扱いにならないこともあります。個人的な用事なら連絡は不要です。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">階段教室(杉本キャンパス)はどこにある？</h2>
          <p>
            8号館の横にある基礎教育実験棟1階、左に曲がったところにあります。
          </p>
          {/* 画像: 階段教室 */}
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">杉本町かあびこかどっちがいい？(杉本キャンパス)</h2>
          <p>
            通学重視なら杉本町駅、生活の利便性や遊びを重視するならあびこ駅がおすすめです。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">生協のミールシステムは買わない方がいい</h2>
          <p>
            割引率が低く、使い切れない場合が多いためおすすめしません。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">生協電子マネーに入れる金額は多くても1〜2万円でいい</h2>
          <p>
            5万円は勧められますが、そんなに使わないことが多いです。少額チャージで十分です。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">教科書は全て新品で買う必要はない</h2>
          <p>
            初回授業で必要か確認してから購入を判断しましょう。
            <br />中古で買ったり、先輩からもらうのもおすすめです。
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">サークルを装った宗教団体に注意しよう</h2>
          <p>
            非公認サークルに参加する場合は注意を。<br />
            <a
              href="https://www.omu.ac.jp/campus-life/activities/list/index.html"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              学生団体一覧
            </a>
            に載っていない団体は特に気をつけましょう。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">新歓にはなるべく沢山行こう</h2>
          <p>
            新歓は大学生活のスタートに最適な出会いの場です。気になる団体はどんどん行ってみましょう。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">積極的に大学生活を楽しもう</h2>
          <p>
            自由度が高いからこそ、自分から行動することが大事です。授業やサークル、新歓など積極的に関わりましょう！
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mt-4">便利機能や特典を活用しよう</h2>
          <p>
            課題管理ツールや過去問、AIツールなど様々な特典が活用できます。
            <br />このサイトの「まめちしき一覧」から #お得情報 や #お役立ち をぜひチェック！
          </p>
        </section>
  
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">SNSを活用しよう</h2>
            <p>
            X（Twitter）を中心に大学関連アカウントをフォローしましょう。
            <br />
            <strong>フォロー推奨アカウント：</strong>
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
            <li><strong>ノノノ🍥ハム大まめちしき (@omuichinen)</strong>：役立つ情報・雑学・まめちしき！</li>
            <li><strong>とあるハム大生達の独り言 (@welcome_omu)</strong>：質問箱で大学の悩みに回答！</li>
            <li><strong>大阪公立大学お役立ち (@job_ichidai)</strong>：イベント情報の要点まとめ！</li>
            <li><strong>ハム大飯まとめ (@omu_foodmatome)</strong>：大学周辺のおすすめランチ紹介！</li>
            </ul>
            <p className="mt-2">
            新しく大学用アカウントを作るときは <span className="text-pink-600 font-bold">#春からハム大</span> を付けて繋がろう！
            </p>
        </section>
      </main>
    );
  }
  