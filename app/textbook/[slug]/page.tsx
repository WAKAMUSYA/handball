import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, getNextArticle } from "../../../data/textbook";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  
  return {
    title: `${article.title} | ハンドボールの教科書`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const nextArticle = getNextArticle(slug);

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
      <nav className="mb-6">
        <Link href="/textbook" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition bg-blue-50 px-3 py-1.5 rounded-full">
          ← 教科書もくじへ戻る
        </Link>
      </nav>
      
      <article className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
        <header className="mb-8 border-b pb-6">
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

      {nextArticle && (
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 mb-3">次に読むおすすめ記事</h3>
          <Link 
            href={`/textbook/${nextArticle.slug}`}
            className="group flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-primary hover:shadow-md transition-all"
          >
            <div>
              <p className="text-xs text-blue-500 font-bold mb-1">NEXT</p>
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                {nextArticle.title}
              </h4>
            </div>
            <div className="text-slate-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1">
              →
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
