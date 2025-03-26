import Image from 'next/image';

export default function CampusMap() {
    return (
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">キャンパスマップ</h1>
  
        <section id="sugimoto">
          <h2 className="text-xl font-semibold">杉本キャンパス</h2>
          <div>
            <Image src="/images/campus.jpg" alt="キャンパスマップ" width={300} height={200} />
          </div>
  
          <h3 className="text-lg font-semibold">16 8号館(=全学共通棟)</h3>
          <Image src="/images/8gou.jpg" alt="8号館" width={300} height={200} />
          <p>
            1年生が授業を受ける建物です。教室名が8○○の教室は全てこの建物にあり、2文字目を見れば階数がわかります。(810なら1階、83Aなら3階)
            18番の階段教室(≒基礎教育実験棟)とも繋がっています。
          </p>
  
          <h3 className="text-lg font-semibold">11 学術情報総合センター(学情、図書館)</h3>
          <Image src="/images/gakujou.jpg" alt="図書館" width={300} height={200} />
          <p>
            250万冊の本がある10階建ての図書館です。喋れる自習室のラーニングコモンズ(5階)や眺めの良い屋上庭園、洋食レストラン(1階)や横になって休憩できる部屋(3.4階)など様々なものがあります。空きコマに来て友達と課題をするのにおすすめです。
          </p>
  
          <h3 className="text-lg font-semibold">19&20 食堂</h3>
          <Image src="/images/shokudou.jpg" alt="食堂" width={300} height={200}/>
          <p>
            キャンパス内に2つあり、合計約600席もある大きな食堂です。週ごとにメニューが変わり、期間限定フェアもよく開催されます。昼休みはとても混むのでできれば空きコマを使って行きましょう。
          </p>
  
          <h3 className="text-lg font-semibold">21学内コンビニ</h3>
          <Image src="/images/konbini.jpg" alt="学内コンビニ" width={300} height={200} className="w-full max-w-xl my-2" />
          <p>
            品揃えが豊富な2階建てのコンビニです。パンやお弁当やお菓子はもちろん、文房具や白衣なんかも売っています。2階は本屋になっており、参考書や教科書が沢山あります。
          </p>
  
          <h3 className="text-lg font-semibold">26 学生サポートセンター</h3>
          <Image src="/images/gakusapo.jpg" alt="学生サポートセンター" width={300} height={200} className="w-full max-w-xl my-2" />
          <p>
            なんでも相談窓口や様々な手続きの受付があります。困り事があったらここで聞くといいです。
          </p>
  
          <h3 className="text-lg font-semibold">1の右下 猫の家</h3>
          <Image src="/images/neko.jpg" alt="猫の家" width={300} height={200} className="w-full max-w-xl my-2" />
          <p>
            大学で飼われている猫が3匹います。とても可愛いので空きコマがあれば会いに行ってみましょう。
          </p>
        </section>
  
        <section id="access">
          <h2 className="text-xl font-semibold">杉本町駅から8号館までの行き方</h2>
          <p>
            地図の青い線を通るのが8号館までの一般的な行き方、緑の線が近道です。近道なら徒歩5分ぐらい、普通の道なら8分ぐらいで着きます。あびこ駅からは15分ぐらいです。
          </p>
          <h3 className="text-lg font-semibold">一般的な行き方</h3>
          <div className="my-4">
            <video controls className="w-full max-w-3xl">
              <source src="/sugimoto.mp4" type="video/mp4" />
              お使いのブラウザは video タグに対応していません。
            </video>
          </div>
        </section>
      </div>
    );
  }
  