export interface TrainingMenu {
  id: string;
  category: string;
  title: string;
  description: string;
  timeMinutes: number;
}

export const trainingMenus: TrainingMenu[] = [
  {
    id: "theme",
    category: "今日のテーマ",
    title: "試合を想定したコミュニケーションと連動",
    description: "単なる技術練習ではなく、試合中を想定した声掛けや、隣のプレイヤーとの連動を意識して各メニューに取り組みます。",
    timeMinutes: 5
  },
  {
    id: "warmup",
    category: "ウォームアップ",
    title: "ダイナミックストレッチ＆パス回し",
    description: "体を温めると同時に、パスの精度とボールを受ける前の「先の準備」を意識します。",
    timeMinutes: 15
  },
  {
    id: "physical",
    category: "フィジカル",
    title: "フットワーク＆体幹トレーニング",
    description: "ディフェンス時の「寄せる」動きを想定した細かいステップと、コンタクトに負けない体幹を鍛えます。",
    timeMinutes: 20
  },
  {
    id: "tactics-1",
    category: "戦術練習",
    title: "3対2からの数的有利の活用",
    description: "意図的に作った数的有利（3対2）の状況から、確実にノーマークを作ってシュートまで持っていく判断の練習です。",
    timeMinutes: 30
  },
  {
    id: "tactics-2",
    category: "戦術練習",
    title: "6対6 実戦形式",
    description: "「ズレ」を作るオフェンスと、それを防ぐディフェンス。セットごとの「流れ」を意識しながら実戦形式で行います。",
    timeMinutes: 40
  },
  {
    id: "review",
    category: "振り返り",
    title: "クールダウン＆ミーティング",
    description: "今日のテーマがどれだけ達成できたか、チーム全体で意見を出し合い、共通認識をアップデートします。",
    timeMinutes: 10
  }
];
