"use client";
import Image from 'next/image';
import { useState } from 'react';


export default function TimetableGuide() {
    const [selectedDept, setSelectedDept] = useState<string | null>(null);

    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">時間割の作り方</h1>
        <h2 className="text-2xl font-semibold">目次</h2>
        <ul className="list-disc list-inside">
          <li>⓪時間割作りのポイント</li>
          <li>①白時間割を用意する</li>
          <li>②必修科目を入れる</li>
          <li>③選択科目を入れる</li>
          <li>④抽選科目を入れる</li>
        </ul>
  
        <section>
          <h2 className="text-2xl font-semibold">⓪時間割作りのポイント</h2>
          <h3 className="text-xl font-semibold">授業には抽選、選択、必修科目がある</h3>
          <p>大学では自分で受ける授業を選べます。授業には3種類あり、University Englishや情報リテラシーなどの必ず受ける必修科目、学部の専門科目などの好きに選べる選択科目、一般教養(=総合教養科目)などの抽選に当たれば受けられる抽選科目に分けられます。
          必修科目は学部学科ごとに設定されており、時間や内容を選ぶことはできません。(例えば商学部の情報リテラシーは水曜の2限と決まっています)なので基本的には必修科目を受け、残りの空いた時間に好きな授業を入れていく方針になります。</p>
  
          <h3 className="text-xl font-semibold">時間割例(商学部)</h3>
          <Image src='/images/sho.jpg' alt='商学部の時間割表' width={300} height={200} />
          <p>灰色が必修科目、オレンジが選択科目、水色が抽選科目です。授業は22単位取り、週13コマになりました。</p>
  
          <h4 className="text-lg font-semibold">シラバスを見よう</h4>
          <p>全ての授業の内容や評価基準、教材などの情報はシラバスを見れば書いてあります。授業を選ぶときはシラバスも読んで選びましょう。シラバスは大学のサイト(https://www.omu.ac.jp/campus-life/course/syllabus/)かUNIPAの「シラバス照会」から見られます。(UNIPAでは新入生は3/25以降に見られます)</p>
  
          <h4 className="text-lg font-semibold">シラバスの見方</h4>
          <p>シラバスを開くと最初に細かい情報がたくさん出てきますが、1番重要なのは下にスクロールすると出てくる「成績評価方法」です。ここを見ればその科目がテストやレポートをどんな割合で評価するのか、何回欠席したら単位がもらえなくなるのかが分かります。必ず確認しましょう。ここで落単までの欠席回数が4以下だったり、テスト100%なのに出席が必要になっていたりすると単位が取りにくいかもしれません。</p>
  
          <h3 className="text-xl font-semibold">クロバスを見よう</h3>
          <p>授業選びの時にはクロバス(https://docs.google.com/spreadsheets/d/1tBPRKw3MnphDgonM8SDXygN1MK3FfAvPd-hZPFPV45k/edit?usp=sharing)というサイトが役に立ちます。クロバスにはそれぞれの授業を受けた人の感想や、単位を取るのがどのくらい難しいのかなどの役立つ情報が載っています。
          主に般教を選ぶ際に役立ちます。</p>
  
          <h4 className="text-lg font-semibold">クロバスの見方</h4>
          <p>高い評価の授業ほど単位が取りやすいので、般教に関してはこだわりがなければA以上のものを中心に選ぶことをおすすめします。ただ人気の般教は抽選で外れる確率も高いので、評価が高い授業ばかりで埋めるのが正解とは限りません。評価が低くても自分が興味のある授業があればそれを優先するのもありだと思います。
          (クロバスはシラバスと違い、大学非公認のサイトです。落単には責任を負いません。)</p>
  
          <h4 className="text-lg font-semibold">遠隔授業を取ろう</h4>
          <p>授業の中には遠隔のものもあります。遠隔授業の大半は教員がネットに投稿した動画を見て課題/テストをやるだけというもので、好きな時間に見られて教室に行く必要もないためとても楽です。遠隔授業については授業時間に関わらず好きな時に受けられるため、1限や5限に入れても問題ないです。積極的に取りましょう。</p>
  
          <h4 className="text-lg font-semibold">単位数に注意しよう</h4>
          <p>授業には1つあたり1〜2個の「単位」というものが設定されています。1学期あたり25単位分までしか授業は受けられないので、越えないように気をつけましょう。授業を25単位分まで取ると大体週に13〜16コマぐらいになります。最初のうちは25単位ギリギリになるぐらいまで取るのがいいです。</p>
        </section>
        <section>
        <h2 className="text-2xl font-semibold">①白時間割を用意する</h2>
        <p>このhttps://www.omu.ac.jp/freshers/assets/shirojikanwari.pdf白時間割を印刷して書き込む準備をしましょう。印刷が無理なら画面に書き込むのもありですが、手書きの方がやりやすいです。</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">②必修科目(必ず受けないといけない科目)を入れる</h2>
        <p>1年前期にある必修は
        ・情報リテラシー
        ・健康スポーツ科学 概論/実習(ない学部もある)
        ・University English1A
        ・University English1B
        ・初修外国語(フランス語、ドイツ語、中国語、朝鮮語、ロシア語)
        ・学部の専門科目(ない学部もある)
        です。まずはこの授業の時間を表に書いていきましょう。
        この下の各学部のボタンを押すと1年前期の必修のみの時間割表が見られます。まずはその時間割表の全員必修の部分を白時間割に写しましょう。</p>

        <h3 className="text-xl font-semibold">表の見方・注意点</h3>
        <Image src='/images/sho.jpg' alt='商学部' width={300} height={200} />
        <p> 例えば商学部の場合、この中の灰色のものだけが全員が受ける必修です。他の色のものはとりあえず無視し、灰色だけを書き写してください。月曜5限はこの表では「中国語入門」になっていますが、写すときは自分が選んだ言語名に変えてください。どの言語でも授業時間は一緒なのでそのまま名前を変えるだけでいいです。</p>
        <button
            className="text-blue-600 underline"
            onClick={() => setSelectedDept("bun")}
        >
            文学部の時間割表を見る
        </button><br /><br />
        {selectedDept === "bun" && (
          <>
          <div className="mt-2">
            <Image src='/images/bun.jpg' alt='文学部の時間割表' width={300} height={200} />
          </div>
          <h4 className="text-lg font-semibold">文学部の先輩からのアドバイス</h4>
            <p>
            シラバスをちゃんと読む
            文学部要覧や国際基幹教育要覧をよく読む。最悪完全に理解するのはいいので、取り敢えず自分が絶対に取らないといけない授業を把握しておく。
            一般教養は割と抽選落ちる場合があるので、フル単にしたいなら多めに入れておく
            単位取りやすいかどうかは授業とか先生との相性もあるので、人の意見は信用しすぎない。
            紙に列が月〜金、行が1〜5限の表を作って、受けたい授業を取り敢えず時間被りありで書いて、そこから選ぶのが分かりやすくておすすめ。空きコマを埋めるのもしやすい
            履修申請した授業を中止するのは一般的に難しいので、いきなり冒険しすぎない方がいい。(一般教養に理系の授業とか、課題の多そうな授業をたくさん入れるなど)
            期間中は何回でも変更できるので、悩んでる場合でも一旦仮で入れといて、逐次変えるのが、履修登録できなかったなどの大きい事故が少ない
            </p><br />
          </>
        )}
        <button
        className="text-blue-600 underline"
        onClick={() => setSelectedDept("hou")}
        >
        法学部の時間割表を見る
        </button><br /><br />
        {selectedDept === "hou" && (
        <>
        <div className="mt-2">
            <p>
            月2　ue1b<br />
            月4　二外基礎<br />
            月5　健スポ概論<br />
            水1　情リテ<br />
            水2　ue1a<br />
            水5　二外応用<br />
            木4　二外基礎<br />
            （金2　法学入門）←必修ではないが絶対取った方が良いしほぼ全員取ってる授業、実質必修
            アドバイス<br />
            ・法学入門は絶対履修する<br />
            ・授業は23or24単位まで入れる<br />
            ・無料法律相談所は一旦入るべき（合わなかったら抜ける）<br />
            ・学部外の友達を作る（特に文学部か商学部）（後々他学部履修で役立つ）<br />
            ・法学入門は法的三段論法わかってればいける<br />
            ・必修絶対落とすな<br />
            ・サボり癖絶対つけるな<br />
            ・（まだ早いけど）法学入門の単位が取れても後期油断するな<br />
            ・二外はドイツ語、フランス語、中国語が2年以降の外国語演習（テスト100％じゃない科目）に使える<br />
              →どれでもいいなら、英語得意な人はドイツ語かフランス語、得意じゃない人は中国語が安定（※中国語の実習は隔年開講なので注意）
            </p>
        </div><br />
        </>
        )}
        <button
        className="text-blue-600 underline"
        onClick={() => setSelectedDept("kei")}
        >
        経済学部の時間割表を見る
        </button><br /><br />
        {selectedDept === "kei" && (
        <>
            <Image src='/images/kei.jpg' alt='経済学部の時間割表' width={300} height={200} />
            <p>日本/世界経済の論点は厳密には必修ではなく理論上取らなくても卒業はできるが普通は取る</p><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("sho")}>商学部の時間割表を見る</button><br /><br />
        {selectedDept === "sho" && (
        <>
            <div className="mt-2">
                <Image src="/images/sho.jpg" alt="商学部の時間割表" width={300} height={200} />
                <p>会計基礎論はとても難しいので頑張ってください。それ以外は楽商学部です。</p>
            </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("sci")}>理学部の時間割表を見る</button><br /><br />
        {selectedDept === "sci" && (
        <>    
          <div className="mt-2 space-y-4">
            <Image src="/images/buturi.jpg" alt="物理学科の時間割表" width={300} height={200} />
            <p>アドバイス<br />
              ・実験【水3〜5】の前には授業を持ってこない方が良い。(実験は予め教科書を熟読しなければ置いていかれるため)<br />
              ・就職する際の保険になる為、学部にもよるが教職課程に進む余裕があるなら進んだ方がいい<br />
              ・決める時の判断材料としては、所属学部の時間割が挙げられる。たとえば、理学部や工学部と言った必修の多い学部では教職課程を順調にとることが難しいため、オススメはしない。
            </p>
            <Image src="/images/kagaku.jpg" alt="化学科の時間割表" width={300} height={200} />
            <Image src="/images/seibutu.jpg" alt="生物学科の時間割表" width={300} height={200} />
            <p>
              ・履修登録意外とややこしいから、ガイダンスの時に誰かとLINEとか交換しておいて、ほんとにわからなない！ってなっても聞けるようにしといたら良いと思う！<br />
              ・意外と英語のクラスで友達と仲良くなるから(少人数だし)英語受けなくても単位認定される資格ある子も、前期は受けといたほうがいいかも！<br />
              ・moodleのダッシュボードは、認知度低いけど、課題の出し忘れ防止にとても良い
            </p>
            <Image src="/images/suugaku.jpg" alt="数学科" width={300} height={200} />
            <Image src="/images/seika.jpg" alt="生物化学科" width={300} height={200} />
            <p>般教と基礎教をめんどくさいからって理由で履修してないと来年もっとめんどくさくなるので、必修、専門科目が少ない一回生のうちにまだ興味があるもの、もしくはなんとかやりきれそうなものを取っとくといいかな、と思います。
               それと多分一回生が一番暇なので、適度に遊び呆けてほしいなと思います。
               それから言い忘れてたんですが、月2の生物化学への招待は必修みたいなものなので取っといた方がいいですね。
            </p>
            <Image src="/images/tikyuu.jpg" alt="地球学科" width={300} height={200} />
            <p> 青が必修、ピンクが教職科目（CAP外）です。
                土曜日の欄は集中講義です。地球学科は集中講義に必修が3科目（地質調査法1、測量及び地質調査法実習1、地球学野外実習）あるので忘れずに必ず登録しましょう。集中講義の扱いはややこしいので、4月初頭の新入生オリエンテーションに必ず参加し、学科の先生の説明を聞いてください。
                地質調査法1と測量及び地質調査法実習1は2科目セットで履修登録する同じ授業だと思ってください。月に1回ほど土曜日に関西圏の野外で実習を行います。
                地球学野外実習は夏休みに泊まりで行う2泊3日の実習です。
                私は教職の必修の関係で基礎教が多く、般教が少なくなっています。般教はもう少し取る方がいいです。私は第2外国語を週1コースにしましたが、週2コースにすることもできます。週2コースにすると、3年の進級時に必要な般教を1科目減らせます。自分の向き不向きに合わせて選んでください。学科の半分くらいが週2コースだったと思います。
                火曜日は全休（授業がない日）にすることができます。学科の1/3くらいの人は全休を作っていた印象です。（全休を作るなら他の曜日に詰め込むことになるので、テストなどは大変になります。自分の向き不向きに合わせて選んでください。）
                だいたいの人は1年前期は20〜25単位は履修していたと思います。
                地球学科は人数が極端に少ないのと、実習があるので、必然的に他学科よりも友達ができやすいです。オリエンテーションでLINEを交換し、友達と相談しながら履修を組んでいくのがいいと思います。
            </p>
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("kou")}>工学部の時間割表を見る</button><br /><br />
        {selectedDept === "kou" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/kentiku.jpg" alt="建築学科" width={300} height={200} />
            <p>アドバイスとしては造形実習は必須になってなかったら取らんでいいよー</p>
            <Image src="/images/kikai.jpg" alt="機械工学科" width={300} height={200} />
            <Image src="/images/densisu.jpg" alt="電気システム" width={300} height={200} />
            <Image src="/images/ouka.jpg" alt="応用化学科" width={300} height={200} />
            <Image src="/images/denbutu.jpg" alt="電子物理学科" width={300} height={200} />
            <p>月1の化学は結構キツい</p>
            <Image src="/images/jouhou.jpg" alt="情報工学科" width={300} height={200} />
            <Image src="/images/denden.jpg" alt="電気電子工学科" width={300} height={200} />
            <Image src="/images/baio.jpg" alt="化学バイオ工学科" width={300} height={200} />
            <p>一回前期が一番時間割的に般教入れやすいのでめっちゃ取った方がいいです！
            地学実験はとるとらないは好みかなって感じです！（単位数最終的に足りるので）</p>
            <Image src="/images/kaiyou.jpg" alt="海洋システム工学科" width={300} height={200} />
            <p>基礎力をがんばれ、あってるって思っても誰かと確認したほうがいい。期末はとれないから小テ課題でできたら9割最低8割はほしい。
            課題の締め切りがはやいからみんなでLINEで共有しながら乗り越える必要がある。</p>
            <Image src="/images/mate.jpg" alt="マテリアル工学科" width={300} height={200} />
            <p>1限が多くて大変かもだけど
            出席が大事な授業が多いからなるべく休まず出席すべき！</p>
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("nou")}>農学部の時間割表を見る</button><br /><br />
        {selectedDept === "nou" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/seiki.jpg" alt="生命機能科学科" width={300} height={200} />
            <Image src="/images/ryokuti.jpg" alt="緑地環境学科" width={300} height={200} />
            <Image src="/images/ousei.jpg" alt="応用生物学科" width={300} height={200} />
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("gensys")}>現代システム科学域の時間割表を見る</button><br /><br />
        {selectedDept === "gensys" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/gensisu.jpg" alt="現代システム科学域" width={300} height={200} />
          </div>
          <p>
            現代システム科学域　履修について<br />
            【参照】<br />
            要覧<br />
            https://www.omu.ac.jp/assets/css_handbook_2025_0303_1.pdf<br />
            時間割<br />
            https://www.omu.ac.jp/assets/css_timetable_2025_0307.pdf<br />
          </p>
          <p>
            基本的には１年前期は必修が多く、オリエンテーションで配られる時間割通りに履修を組めば問題ない。
            必修だけ入れると上のようになる。<br />
            〇数学については線形代数(金３)or数学リテラシー(月１)<br />
            線形代数…知識情報は必須(学単知情志望も)<br />
            数学リテラシー…数学が苦手な人向け<br />
            教育福祉・環境社会学類は前期だけ数学が必修である。前期だけの場合、線形代数のほうが簡単なように感じる。<br />
            〇知情(学単知情志望)は統計学基礎(火２)必修<br />
            〇学域単位入学が注意しておいてほうが良い点<br />
            ・線形代数は２クラス分かれ、自分で先生を選ぶことができるが川添先生の方が簡単であるためおすすめ<br />
            ・健康スポーツ実習は火２or火３で選べるため、基本的に自分が行きたい学類の方に行くのが良い。<br />
            火２…心理　火３…環社・教福　（火１…知識情報は履修不可）<br />
          </p><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("igaku")}>医学部の時間割表を見る</button><br /><br />
        {selectedDept === "igaku" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/igaku.jpg" alt="医学科" width={300} height={200} />
            <p>専門とか2外とかは1個でも落としたら留年するから気をつけるべき、とは言え一ヶ月くらい前からちゃんと勉強したら余裕だから安心してください。あと、ワクチンを計画的に打たないと2年生以降の実習に参加できないので留年します。これも注意しておいてください。</p>
            <Image src="/images/juui.jpg" alt="獣医学科" width={300} height={200} />
            <p>
              ・選択必修は後期に必修で統計学基礎2があるから1限しんどいけどほとんどの人が統計学基礎1取る<br />
              ・般教の抽選はほぼ希望通る(たぶん)と思って時間割考えていい<br />
              ・金曜全休作るべき<br />
              ・2限空いてたらみんなで食堂行ける
            </p>
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("kango")}>看護学部の時間割表を見る</button><br /><br />
        {selectedDept === "kango" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/kango.jpg" alt="看護学科" width={300} height={200} />
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("juui")}>獣医学部の時間割表を見る</button><br /><br />
        {selectedDept === "juui" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/juui.jpg" alt="獣医学科" width={300} height={200} />
          </div><br />
        </>
        )}

        <button className="text-blue-600 underline" onClick={() => setSelectedDept("seikatsu")}>生活科学部の時間割表を見る</button><br /><br />
        {selectedDept === "seikatsu" && (
        <>
          <div className="mt-2 space-y-4">
            <Image src="/images/kyojuu.jpg" alt="居住環境学科" width={300} height={200} />
            <p>
              大変な課題のときは時間が全く足りなくてしんどくなるけど、それが終わった後の達成感や周りからの評価は頑張って良かったと思える。課題は、早め早めに取りかかるのが吉。学科の友人はやっぱり建築やインテリアに興味があって、すごく刺激をもらいます！
            </p>
          </div><br />
        </>
        )}
      
        <button className="text-blue-600 underline" onClick={() => setSelectedDept("sonota")}>表がない学部学科の方、自力でやりたい方はこちらから</button><br /><br />
        {selectedDept === "sonota" && (
        <>
          <div className="mt-4 space-y-4">
            <p>
                まずはUNIPAにログイン(ログイン方法はこちら)し、下にスクロールして「学生Navi(情報共有サイト)」を押し、「授業・履修」→「大阪公立大学(学部・学域生)」→「国際基幹教育機構 時間割表」→杉本もしくは中百舌鳥の「授業時間割表(2025前期)→下にスクロールして添付ファイルのpdfを開きましょう。開けたら事前準備は完了です。
                <br />
                <a href="https://portal.omu.ac.jp/stu_information/Lists/jugyo/Attachments/66/las_timetable_2025s_pdf" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                授業時間割表(2025前期)
                </a>
            </p>
            <p>
                まず情報リテラシーから書いていきましょう。<br />
                6ページの表を見て自分の学部の授業を探してください。(例:商学部なら水曜2限)<br />
                <Image src="/images/jourite.jpg" alt="情報リテラシーの開講時間" width={300} height={200} />
                自分の学部の情リテが何曜日の何限にあるか分かったら紙に書きましょう。これで情リテは完了です。
            </p>
            <p>
                次にUE(=University English)を書いていきます。7〜9ページにある表を見て自分の学部の授業を探し、紙に書きましょう。1Aと1Bを両方受けないといけないので2つとも見つけて書きましょう。<br />
            </p>
            <p>
                この２つと同様にして、初修外国語(=第二外国語)と健康スポーツ科学も書いていきましょう。
            </p>
            <p>
                最後に学部の専門科目を書きます。<br />
                まず
                <a href="https://www.omu.ac.jp/campus-life/course/curriculum/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                https://www.omu.ac.jp/campus-life/course/curriculum/
                </a>
                から自分の学部の要覧を開きましょう。学部や学科ごとの専門科目の表を見て必修と書いてあるものを探しましょう。1年前期の必修科目の名前をメモし、次に
                <a href="https://www.omu.ac.jp/campus-life/course/academic-calendar/timetable-u/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                https://www.omu.ac.jp/campus-life/course/academic-calendar/timetable-u/
                </a>
                の時間割表から必修科目がどの時間にあるかを探しましょう。見つけたらその時間にその科目を書きましょう。<br />
                これで時間割の必修科目の部分は完了です。
            </p>
          </div><br />
        </>
        )}
      </section>


      <section>
        <h2 className="text-2xl font-semibold">③選択科目(自由に選べる科目)を入れる</h2>
        <p>学部の専門科目などの選択科目を入れていきましょう。
           https://www.omu.ac.jp/campus-life/course/curriculum/
           ここから自分の学部の要覧を開き、専門科目の配当年次が書かれた表を探してください。この中の1年前期に開講されているものの中から選んで入れていきます。例えば商学部ならこの画像の赤丸の科目です。この中からどれを受けたいかを決め、
           その後学部の時間割表(https://www.omu.ac.jp/campus-life/course/academic-calendar/timetable-u/)からどの時間に開講されるかをどの時間に開講されるかを確認して自分の時間割表に書いていきましょう。
        </p>
        <Image src='/images/sennmonn.jpg' alt='商学部' width={300} height={200} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold">④抽選科目を入れる</h2>
        <p>般教(=総合教養科目)や初ゼミなどの抽選科目は抽選により授業を受けられるかが決まります。(履修登録の際にも「抽選希望登録」をして抽選に受からないと受講できません。)受けたい順に希望順位を決めて抽選希望登録をしましょう。
        まずは初ゼミから登録していきます。
        初ゼミはhttps://www.omu.ac.jp/assets/las_handbook_2025_0305_1.pdf
        このサイトの杉本は28.29、中百舌鳥は30.31ページに載っています。この中から面白そうなものを選んで受けたい優先順位をつけていきましょう。先程入れた選択、抽選科目と時間が被らないように気をつけてください。
        初ゼミは基本的に難しいものはないので直感で選んでも大丈夫です。キャンパスが違うものは受けられないので注意してください。
        般教は
        (https://docs.google.com/spreadsheets/d/1tBPRKw3MnphDgonM8SDXygN1MK3FfAvPd-hZPFPV45k/htmlview)
        このクロバスというサイトから選んでいきましょう。
        クロバスでは授業を受けた人の感想や評価をもとに授業の楽単度がランク分けされています。評価は人によっても意見が別れるのであくまで参考程度にするのがいいですが、Cの授業に関しては余程のことがない限り取らないようにしましょう。
        評価が高い授業を取れれば楽に単位を取りやすいですが、人気の授業は抽選で外れやすいので確実に授業を受けたい人は少しはBのものも混ぜましょう。勿論一番大切なのは自分が学びたいことを学ぶことなので、評価が低くても興味のある分野であればそちらを優先した方がいいです。
        抽選希望の際には同じ時間に複数希望を出すことも可能なので、般教を選ぶ時は時間被りを気にしなくて大丈夫です。
        目安としては受けたい数の2倍ぐらい、抽選に出したい授業を決めておきましょう。当選希望数を自由に決められるので、多すぎて困ることはありません。
        </p>
      </section>
   </div>
    );
}

