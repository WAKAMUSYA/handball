import Link from "next/link";
import { lectures } from "../../data/hand-iq";

export const metadata = {
  title: "ハンドIQ講座 | Hand IQ Lab",
  description: "N高校ハンドボール部のためのハンドIQ講座一覧",
};

export default function HandIQPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <span className="text-4xl">🧠</span> ハンドIQ講座
        </h1>
        <p className="text-slate-600 mt-2">
          良い選手が見ているポイントや、チームの共通認識となる基本理論を学びます。
        </p>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture, index) => (
          <Link
            key={lecture.slug}
            href={`/hand-iq/${lecture.slug}`}
            className="block bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 text-blue-600 font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {lecture.title}
                </h2>
                <p className="text-slate-600 text-sm line-clamp-2">
                  {lecture.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
