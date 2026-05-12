import { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('Productivity');

  const reportTypes = ['Productivity', 'Attendance', 'Financials', 'Tasks'];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Reports & Analytics</h2>
          <p className="text-sm text-on-surface-variant mt-1">Generate and export insights across all modules.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-surface-container text-on-surface text-sm font-semibold border border-outline-variant/50 rounded-lg px-3 py-1.5 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">download</span> Export PDF
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-outline-variant/50 overflow-x-auto pb-1">
        {reportTypes.map((t) => (
          <button key={t} onClick={() => setReportType(t)} className={`text-sm font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap ${reportType === t ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>
            {t} Report
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-base font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">bar_chart</span> {reportType} Overview</h3>
            <div className="h-64 flex items-end justify-between gap-3 pb-2 border-b border-outline-variant/30">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = Math.floor(Math.random() * 70) + 30;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary-container/30 rounded-t-sm relative group-hover:bg-primary-container/50 transition-colors" style={{ height: '100%' }}>
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 ease-out" style={{ height: `${height}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 px-1 text-[10px] font-bold text-on-surface-variant uppercase">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Average Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">84%</span>
                  <span className="text-[11px] font-bold text-success flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.4%</span>
                </div>
              </div>
              <div className="h-px bg-outline-variant/50 w-full"></div>
              <div>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Submissions</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">1,204</span>
                  <span className="text-[11px] font-bold text-success flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-surface-container-low border border-outline-variant/60 text-on-surface text-sm font-bold rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">tune</span> Customize Report
          </button>
        </div>
      </div>
    </div>
  );
}
