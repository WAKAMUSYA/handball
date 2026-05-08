export interface GlossaryTerm {
  term: string;
  reading: string;
  meaning: string;
  usage: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "広がる",
    reading: "ひろがる",
    meaning: "オフェンス時、コートの横幅を広く使って位置取ること。",
    usage: "「もっと広がってスペースを作ろう」"
  },
  {
    term: "寄せる",
    reading: "よせる",
    meaning: "ディフェンス時、ボールを持っているオフェンスに対して間合いを詰めること。またはオフェンスがディフェンスを引きつけること。",
    usage: "「しっかり寄せてパスコースを限定しよう」「しっかり寄せてからパスを出せ」"
  },
  {
    term: "ズレ",
    reading: "ずれ",
    meaning: "ディフェンスの陣形が崩れ、マークが遅れたり余ったりしている状態。",
    usage: "「ズレができたらそこを攻めろ」「ズレを直す声を出せ」"
  },
  {
    term: "間",
    reading: "あいだ",
    meaning: "ディフェンスとディフェンスの間のスペース。",
    usage: "「間を狙って走り込め」"
  },
  {
    term: "先に準備",
    reading: "さきにじゅんび",
    meaning: "ボールが来る前に、次のプレー（パス、シュート、ドリブル）を想定して体の向きや位置を整えておくこと。",
    usage: "「ボールをもらう前に、先に準備をしておこう」"
  },
  {
    term: "逆サイド",
    reading: "ぎゃくさいど",
    meaning: "現在ボールがある位置とは反対側のエリア。",
    usage: "「ディフェンスが寄ったら逆サイドへ展開しよう」"
  },
  {
    term: "前圧",
    reading: "まえあつ",
    meaning: "ディフェンスが前に出て、オフェンスにプレッシャーをかけること。",
    usage: "「前圧をかけて相手の自由を奪え」"
  },
  {
    term: "連動",
    reading: "れんどう",
    meaning: "複数のプレイヤーが意図を合わせて動くこと。",
    usage: "「隣と連動してマークを受け渡そう」"
  },
  {
    term: "カバー",
    reading: "かばー",
    meaning: "味方が抜かれたり、ミスをしたりした時に、他のプレイヤーが助けること。",
    usage: "「抜かれたらすぐにカバーに入れ」"
  },
  {
    term: "流れ",
    reading: "ながれ",
    meaning: "試合の主導権や勢いのこと。モメンタム。",
    usage: "「今は相手の流れだから、一本確実に返そう」"
  }
];
