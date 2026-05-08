import { trainingMenus } from "../../data/training";

export const metadata = {
  title: "練習メニュー | Hand IQ Lab",
  description: "N高校ハンドボール部の練習メニューと意図",
};

export default function TrainingPage() {
  const totalTime = trainingMenus.reduce((acc, curr) => acc + curr.timeMinutes, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8 border-b pb-4 flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="text-4xl">🏃‍♂️</span> 練習メニュー
          </h1>
          <p className="text-slate-600 mt-2">
            各メニューの目的と意識すべきポイントを確認し、練習の質を高めます。
          </p>
        </div>
        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-bold shadow-sm border border-blue-100">
          合計: 約 {totalTime} 分
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-4">
        {trainingMenus.map((menu, index) => (
          <div key={menu.id} className="relative pl-6 md:pl-8">
            <div className="absolute -left-[11px] top-1 bg-white border-2 border-primary w-5 h-5 rounded-full" />
            
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                <div>
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md mb-2">
                    {menu.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-800">
                    {menu.title}
                  </h2>
                </div>
                <div className="text-primary font-bold bg-blue-50 px-3 py-1 rounded-full text-sm shrink-0">
                  {menu.timeMinutes} min
                </div>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                {menu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
