import { notFound } from "next/navigation";
import Link from "next/link";
import { lectures } from "../../../data/hand-iq";

export async function generateStaticParams() {
  return lectures.map((lecture) => ({
    slug: lecture.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lecture = lectures.find((l) => l.slug === slug);
  if (!lecture) return { title: "Not Found" };
  
  return {
    title: `${lecture.title} | Hand IQ Lab`,
    description: lecture.description,
  };
}

export default async function LecturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lecture = lectures.find((l) => l.slug === slug);

  if (!lecture) {
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
      <Link href="/hand-iq" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium transition">
        ← 講座一覧に戻る
      </Link>
      
      <article className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
        <header className="mb-8 border-b pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
            {lecture.title}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            {lecture.description}
          </p>
        </header>
        
        <div className="prose prose-slate max-w-none prose-p:leading-loose">
          {formatContent(lecture.content)}
        </div>
      </article>

      {/* Navigation to next/prev could be added here later */}
    </div>
  );
}
