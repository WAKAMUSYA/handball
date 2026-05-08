import { notFound } from "next/navigation";
import Link from "next/link";
import { trainingCategories, getTrainingArticle, getTrainingCategoryById } from "../../../../data/training";

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  
  trainingCategories.forEach((category) => {
    category.articles.forEach((article) => {
      params.push({ category: category.id, slug: article.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = getTrainingArticle(category, slug);
  if (!article) return { title: "Not Found" };
  
  return {
    title: `${article.title} | 練習メニュー`,
    description: article.description,
  };
}

export default async function TrainingArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const article = getTrainingArticle(category, slug);
  const categoryData = getTrainingCategoryById(category);

  if (!article || !categoryData) {
    notFound();
  }

  // Basic markdown-like replacement for \n to <br> and **text** to <strong>text</strong>
  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Process bold markers
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-4 text-slate-700 leading-relaxed">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <nav className="mb-6 flex gap-2 items-center text-sm font-medium">
        <Link href="/training" className="text-slate-500 hover:text-blue-600 transition">
          練習メニュー
        </Link>
        <span className="text-slate-300">/</span>
        <Link href={`/training/${category}`} className="text-slate-500 hover:text-blue-600 transition">
          {categoryData.title}
        </Link>
      </nav>
      
      <article className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
        <header className="mb-8 border-b pb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-white bg-primary px-2 py-1 rounded">
              {categoryData.title}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
            {article.title}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            {article.description}
          </p>
        </header>
        
        <div className="prose prose-slate max-w-none prose-p:leading-loose prose-strong:text-slate-900">
          {formatContent(article.content)}
        </div>
      </article>

      <div className="mt-8">
        <Link 
          href={`/training/${category}`}
          className="inline-flex justify-center w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3 px-6 rounded-xl border border-slate-200 transition-colors"
        >
          {categoryData.title} の一覧に戻る
        </Link>
      </div>
    </div>
  );
}
