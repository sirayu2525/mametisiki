export default function CourseRegistrationPage() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">履修登録のやり方</h1>
  
        <p className="mb-4">
          履修登録をする前に時間割表を作りましょう。まだできていない人は
          <a href="#schedule" className="text-blue-500 underline">「時間割の作り方」</a>を先に見てください。
        </p>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">履修登録とは</h2>
          <p className="mb-2">
            大学の授業は事前登録制になっており、予め受けたい授業を選んで登録しておかないと受けられません。授業を受けるための登録が履修登録です。
          </p>
          <p>
            履修登録はUNIPAというサイトを使用して行いますが、まずは「時間割の作り方」を参考に下書きを作り、完成してからUNIPAで登録するのがおすすめです。
            <a href="#login" className="text-blue-500 underline">(UNIPAへのログイン方法はこちら)</a>
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">履修登録の手順</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>UNIPAにログインする</li>
            <li>画面上部に表示される「履修」メニューを選択し、「履修登録」をクリックする</li>
            <li>
              空白の時間割表が表示されるので、各時間に出てくる「追加」をクリックして科目を登録していきます。先ほど作った時間割表を見て写していきましょう。
              般教、初ゼミに関しては後回しにします。
            </li>
            <li>
              全ての科目を選び終えたら、「最終確認へ」をタップし、提出します。提出した後も何度でも更新できるので、できたらとりあえず提出しておきましょう。
            </li>
          </ol>
          <p className="mt-2">これで履修登録が完了します。</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">抽選希望登録について</h2>
          <p className="mb-2">
            般教や初ゼミは授業を受けられる人数が決まっており、抽選により授業を受けられるかが決まります。
            そのため抽選科目（般教や初年次ゼミナール）は通常の履修登録では受講できず、「抽選希望登録」をして抽選に受からないと受講できません。
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">抽選希望登録の手順</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>履修ボタンから「抽選希望登録」を選択します。</li>
            <li>抽選対象科目の一覧が表示されるので、第一希望、第二希望と順番に選びます。</li>
            <li>全ての希望を選び終えたら、確定ボタンを押します。</li>
          </ol>
          <p className="mt-2">これで抽選希望登録が完了します。</p>
          <p>抽選希望登録は意外と外れやすいので多めに登録しておきましょう。</p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">履修登録の修正</h2>
          <p className="mb-2">
            履修登録にミスがあったり、授業を受けてみてやっぱり変えたいと思った時は履修登録修正期間に修正できます。
          </p>
          <p>
            修正手順は通常の履修登録と同様で、「履修」のメニューから「履修登録」を選択し、変更を加えた後、提出ボタンを押すだけです。
            履修登録修正期間は授業が始まってから1週間後まで続くので、全ての授業を一度受けてから修正するかどうかを判断できます。ただし抽選科目(=般教や初ゼミ)は修正できません。
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">総合教養科目(般教)2次申請</h2>
          <p>
            抽選に運悪く外れまくってしまい、受けられる般教がほとんどない…という方向けに、足りない単位数を補うための「総合教養科目2次申請」があります。
            この申請方法は抽選希望登録と同じような登録制ですが、抽選ではなく先着方式になります。
            最初の抽選で定員割れした人気のない授業が2次申請に残るので、ここから般教を取る際は慎重に考えましょう。
          </p>
        </section>
  
        <section id="schedule" className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">時間割の見方</h2>
          <p className="mb-2">
            履修登録後はUNIPAのメニュー(左上の三本線から開ける)から「学生時間割表」を押すと自分の時間割を見られます。
            ただこれだと時間割を見る度にログインし直さないといけないので、時間割管理アプリを入れるのをおすすめします。
          </p>
          <p>
            (例えば <span className="text-blue-600 font-semibold">すごい時間割</span> など)時間割アプリに登録しておけばUNIPAにログインする必要がなく、色も変えて見やすくできるのでおすすめです。
          </p>
          {/* 画像を入れるならここに挿入 */}
          {/* <Image src="/images/schedule-app.png" alt="時間割アプリ" width={600} height={400} /> */}
        </section>
      </main>
    );
  }
  
