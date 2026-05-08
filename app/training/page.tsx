import Link from "next/link";
import { trainingCategories } from "../../data/training";

export const metadata = {
  title: "自己管理ノート（練習メニュー） | NT Handball",
  description: "N高校ハンドボール部の自己成長とコンディショニングのためのノート",
};

export default function TrainingIndexPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <span className="text-4xl">📓</span> 練習メニュー・自己管理ノート
        </h1>
        <p className="text-slate-600 mt-3 leading-relaxed">
          毎日の練習だけでなく、自分の身体のケアやメンタルの整え方など、高校生アスリートとして自立して成長するための学習ノートです。今の自分に必要なテーマを選んで読んでみましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingCategories.map((category) => (
          <Link
            key={category.id}
            href={`/training/${category.id}`}
            className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl bg-slate-50 p-3 rounded-xl group-hover:bg-blue-50 transition-colors">
                {category.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-primary mb-2">
                  {category.title}
                </h2>
                <p className="text-slate-600 text-sm">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
