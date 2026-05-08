import { glossary } from "../../data/glossary";

export const metadata = {
  title: "チーム用語集 | Hand IQ Lab",
  description: "N高校ハンドボール部のチーム用語と共通言語",
};

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <span className="text-4xl">📖</span> チーム用語集
        </h1>
        <p className="text-slate-600 mt-2">
          練習や試合で飛び交う言葉の定義を統一し、コミュニケーションのズレをなくします。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {glossary.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="flex flex-col mb-3">
              <span className="text-xs text-slate-400 font-medium">{item.reading}</span>
              <h2 className="text-xl font-bold text-slate-800 text-primary">{item.term}</h2>
            </div>
            <p className="text-slate-700 text-sm mb-4 leading-relaxed">
              {item.meaning}
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
              <span className="font-bold text-slate-500 mr-2">例:</span>
              {item.usage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
