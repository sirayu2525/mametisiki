export default function CircleGuide() {
    return (
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">課外活動について</h1>
        <nav className="space-y-2">
          <h2 className="text-xl font-bold">目次</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><a href="#about" className="text-blue-600 underline">部活・サークルとは？</a></li>
            <li><a href="#difference" className="text-blue-600 underline">部活とサークルの違い</a></li>
            <li><a href="#how-to-choose" className="text-blue-600 underline">部活・サークルの選び方</a></li>
            <li><a href="#where-to-find" className="text-blue-600 underline">部活やサークルの情報はどこで得る？</a></li>
            <li><a href="#how-many" className="text-blue-600 underline">いくつ入る？</a></li>
            <li><a href="#how-to-join" className="text-blue-600 underline">おすすめの入り方</a></li>
          </ul>
        </nav>
  
        <section id="about">
          <h1 className="text-2xl font-bold">部活・サークルとは？</h1>
          <p>
            授業以外の時間に集まり、スポーツや芸術、ゲームやエンタメなど様々な活動をする団体です。ほとんどの団体に部室があり、高校までと比べて活動の自由度が高いです。部活とサークルをまとめて課外活動と呼びます。
          </p>
        </section>
  
        <section id="difference">
          <h2 className="text-xl font-semibold">部活とサークルの違い</h2>
          <p>
            部活とサークルは基本同じような扱いで明確に分類されているわけではないですが、傾向としては部活は他大学との大会や高い目標に向けてガチで取り組んでいくのに対し、サークルは気軽に誰でも楽しめるゆるめのところが多いです。そのため基本的には部活の方が参加の強制力が強く、部費や活動頻度も高いがサークルは自由参加の所が多く、部活と比べて部費も安いです。
          </p>
        </section>
  
        <section id="how-to-choose">
          <h2 className="text-xl font-semibold">部活・サークルの選び方</h2>
          <p>
            4.5月に「新歓」という部活・サークルの体験会、説明会のようなイベントが開催されます。新歓では部員と喋ったり実際に活動を体験したりしてその団体を知ることができます。例えば馬術部なら馬に乗ってキャンパス内を回ったり、ユースホステル部なら1日かけて奈良の山に登りに行ったり、劇団なら台本をもらってみんなで演技をしてみたり、ヨット部なら海に行ってヨットに乗ったり、スプラ部なら部員とスプラをやったり。他にもタコパやBBQなど活動体験以外でも様々なことが楽しめます。新歓は無料で行くことができ、大学の情報を得たり友達を作ったり食事を奢ってもらえたりすることもあるため基本的には行き得です。新歓に行かないと入れない団体もあるので、少しでも興味があればどんどん行きましょう！インスタやTwitter(X)で団体のアカウントを見れば新歓の日程や場所が書いてあります。6月以降になるとほとんど開催されないので行けるうちに行っておきましょう。
          </p>
        </section>
  
        <section id="where-to-find">
          <h2 className="text-xl font-semibold">部活やサークルの情報はどこで得る？</h2>
          <p>
            大学の部活・サークルは全てここに載っています。
            <a
              href="https://t.co/wwO4PvoWUz"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://t.co/wwO4PvoWUz
            </a>
            ここから各団体のSNSに飛ぶと新歓の情報などがたくさん出てくるのでそれで見ましょう。
            インスタやX(Twitter)で「大阪公立大学 サークル」や「春からハム大」などで検索するのもありです。
            他には新聞部が発行している新刊誌「レモンライス」や自治会誌、X(Twitter)でやっているノノノの#ハム大団体紹介も参考になりますよ。
          </p>
        </section>
  
        <section id="how-many">
          <h2 className="text-xl font-semibold">いくつ入る？</h2>
          <p>
            時間とお金と体力が許す限り、いくつ入ってもいいです。部活は忙しいので兼部はしにくいですが、サークルなら複数入っている人も多いです。スケジュールや金銭的に大丈夫ならいくらでも増やせます。
            ノノノの中の人は30個以上の新歓に行き、良いと思ったところにはとりあえず入って合わなければ後で辞めたらいいというスタンスで10個も入りました。それでも自由参加のところが多いため活動頻度は週1〜週2程度で、部費もほぼかかっていないです。
            Twitter(X)で取ったアンケートでは1個や2個の人が多かったです。
          </p>
        </section>
  
        <section id="how-to-join">
          <h2 className="text-xl font-semibold">おすすめの入り方</h2>
          <p>
            おすすめなのはまずメインで行きたい部活・サークルを決め、その上で部費や参加の強制がないところを自由枠として追加していくことです。部費も強制参加もない所は基本的には入り得なので気軽に入って大丈夫です。
            これなら主な所属先を固定した上で、他の活動にも行きたい時だけ行けるのでおすすめです。
            友達も作りやすいです。
          </p>
        </section>
      </div>
    );
  }
  