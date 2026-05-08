import { notFound } from "next/navigation";
import Link from "next/link";
import { trainingCategories, getTrainingCategoryById } from "../../../data/training";

export async function generateStaticParams() {
  return trainingCategories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = getTrainingCategoryById(category);
  if (!data) return { title: "Not Found" };
  
  return {
    title: `${data.title} | 練習メニュー`,
    description: data.description,
  };
}

export default async function TrainingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = getTrainingCategoryById(category);

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <nav className="mb-6">
        <Link href="/training" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition bg-blue-50 px-3 py-1.5 rounded-full">
          ← ノート一覧へ戻る
        </Link>
      </nav>

      <div className="mb-8 border-b pb-6 flex items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="text-4xl">{data.icon}</span> {data.title}
          </h1>
          <p className="text-slate-600 mt-2 text-sm md:text-base">
            {data.description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/training/${data.id}/${article.slug}`}
            className="block bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-slate-100 text-slate-500 font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-2">
                  {article.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
