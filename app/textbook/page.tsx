import Link from "next/link";
import { textbookData } from "../../data/textbook";

export const metadata = {
  title: "ハンドボールの教科書 | Hand IQ Lab",
  description: "N高校ハンドボール部の基本セオリー",
};

export default function TextbookPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <span className="text-4xl">📚</span> ハンドボールの教科書
        </h1>
        <p className="text-slate-600 mt-3 leading-relaxed">
          チームの土台となる基本ルールから、攻撃・守備のセオリーを整理した教科書です。
          上から順番に読んでいくことで、全員のハンドIQと共通認識を高めることができます。
        </p>
      </div>

      <div className="space-y-12">
        {textbookData.map((category) => (
          <section key={category.id} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-primary inline-block pb-1">
                  {category.title}
                </h2>
              </div>
            </div>
            <p className="text-slate-600 mb-6 pl-11">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-11">
              {category.articles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/textbook/${article.slug}`}
                  className="block bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary mb-2 flex items-center gap-2">
                    <span className="text-blue-500 text-sm">●</span>
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
