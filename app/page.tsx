import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8 animate-fade-in">
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
          Hand IQ Lab
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-700">
          N高校ハンドボール部の共通認識を高める学習サイト
        </p>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
          このサイトは、練習で使う言葉、戦術、立ち位置、判断基準を整理し、チーム全体のハンドIQを上げるための場所です。
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <Link href="/handball-board" className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary mb-2 flex items-center gap-2">
            <span className="text-2xl">📋</span> 戦術ボード
          </h2>
          <p className="text-slate-600 text-sm">
            フォーメーションや動き方を図解で確認できる戦術ボードです。
          </p>
        </Link>

        {/* Card 2 */}
        <Link href="/hand-iq" className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary mb-2 flex items-center gap-2">
            <span className="text-2xl">🧠</span> ハンドIQ講座
          </h2>
          <p className="text-slate-600 text-sm">
            良い選手が見ているポイントや、スペースの考え方などの基本理論を学びます。
          </p>
        </Link>

        {/* Card 3 */}
        <Link href="/glossary" className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary mb-2 flex items-center gap-2">
            <span className="text-2xl">📖</span> チーム用語集
          </h2>
          <p className="text-slate-600 text-sm">
            「ズレ」「間」「前圧」など、練習で飛び交う言葉の定義を統一します。
          </p>
        </Link>

        {/* Card 4 */}
        <Link href="/training" className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary mb-2 flex items-center gap-2">
            <span className="text-2xl">🏃‍♂️</span> 練習メニュー
          </h2>
          <p className="text-slate-600 text-sm">
            日々の練習の意図や、各メニューで意識すべきポイントを確認します。
          </p>
        </Link>
      </div>
    </div>
  );
}
