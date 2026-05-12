import { useState, useEffect } from 'react';
import API from '../../services/api';

const moods = [
  { value: 'great', emoji: '🤩', label: 'Great', color: 'text-success' },
  { value: 'good', emoji: '😊', label: 'Good', color: 'text-primary' },
  { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'text-on-surface' },
  { value: 'stressed', emoji: '😰', label: 'Stressed', color: 'text-warning' },
  { value: 'bad', emoji: '😞', label: 'Bad', color: 'text-error' },
];

export default function EODPage() {
  const [form, setForm] = useState({ tasksCompleted: '', tasksInProgress: '', blockers: '', plannedForTomorrow: '', mood: 'neutral', productivityScore: 7 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('/eod/my').then(res => setHistory(res.data.eods)).catch(() => {});
  }, [success]);

  const wordCount = form.tasksCompleted.split(/\s+/).filter(Boolean).length;
  const isDraftSaved = form.tasksCompleted.length > 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount < 20) return;
    setLoading(true);
    try {
      await API.post('/eod', form);
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in-up">
        <div className="w-24 h-24 rounded-full bg-success-container/30 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-success animate-ping opacity-20" />
          <span className="material-symbols-outlined text-success text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">EOD Submitted!</h2>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">Your daily report has been saved. Your attendance for today is finalized. Great job today!</p>
        <button onClick={() => { setSuccess(false); setForm({ tasksCompleted: '', tasksInProgress: '', blockers: '', plannedForTomorrow: '', mood: 'neutral', productivityScore: 7 }); }}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md active:scale-95">Return to Report</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
      {/* Left Col - Form */}
      <div className="lg:col-span-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">End of Day Report</h2>
          <p className="text-sm text-on-surface-variant mt-1">Reflect on your day. (Minimum 20 words for 'Completed Tasks' required for attendance).</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">task_alt</span> What did you complete today? <span className="text-error">*</span>
              </h3>
              {isDraftSaved && <span className="text-[10px] font-bold text-success flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">cloud_done</span> Draft Saved</span>}
            </div>
            <textarea value={form.tasksCompleted} onChange={(e) => setForm({ ...form, tasksCompleted: e.target.value })}
              placeholder="e.g., Deployed the new auth middleware to staging. Code reviewed 3 PRs..." rows={4} required
              className="w-full p-4 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm resize-none transition-all" />
            <div className="flex justify-between items-center mt-3">
              <div className={`h-1.5 flex-1 rounded-full mr-4 overflow-hidden ${wordCount >= 20 ? 'bg-success-container/50' : 'bg-surface-container-high'}`}>
                <div className={`h-full rounded-full transition-all duration-300 ${wordCount >= 20 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${Math.min((wordCount / 20) * 100, 100)}%` }} />
              </div>
              <span className={`text-[11px] font-bold ${wordCount >= 20 ? 'text-success' : 'text-warning'}`}>{wordCount}/20 words</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><span className="material-symbols-outlined text-warning text-[18px]">pending</span> Still in progress</h3>
              <textarea value={form.tasksInProgress} onChange={(e) => setForm({ ...form, tasksInProgress: e.target.value })} placeholder="What's carrying over?" rows={3} className="w-full p-3 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><span className="material-symbols-outlined text-error text-[18px]">block</span> Blockers</h3>
              <textarea value={form.blockers} onChange={(e) => setForm({ ...form, blockers: e.target.value })} placeholder="Any hurdles or dependencies?" rows={3} className="w-full p-3 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-error outline-none text-sm resize-none" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><span className="material-symbols-outlined text-primary text-[18px]">event_upcoming</span> Plan for Tomorrow</h3>
            <textarea value={form.plannedForTomorrow} onChange={(e) => setForm({ ...form, plannedForTomorrow: e.target.value })} placeholder="List 1-3 top priorities for tomorrow..." rows={2} className="w-full p-3 bg-surface-container-low border border-outline-variant/50 rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2"><span className="material-symbols-outlined text-primary">mood</span> Daily Reflection</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {moods.map(m => (
                <button key={m.value} type="button" onClick={() => setForm({ ...form, mood: m.value })}
                  className={`flex-1 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${form.mood === m.value ? 'border-primary bg-primary-container/10 scale-[1.02]' : 'border-outline-variant/30 hover:bg-surface-container-low hover:border-outline-variant'}`}>
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className={`text-[11px] font-bold ${form.mood === m.value ? m.color : 'text-on-surface-variant'}`}>{m.label}</span>
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-on-surface">Productivity Score</label>
                <span className="text-2xl font-bold text-primary">{form.productivityScore}<span className="text-sm text-on-surface-variant font-medium">/10</span></span>
              </div>
              <input type="range" min="1" max="10" value={form.productivityScore} onChange={(e) => setForm({ ...form, productivityScore: parseInt(e.target.value) })} className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>

          <button type="submit" disabled={loading || wordCount < 20} className="w-full h-12 bg-primary text-on-primary font-bold rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed">
            {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span> Finalize & Submit EOD</>}
          </button>
        </form>
      </div>

      {/* Right Col - History */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm sticky top-20 max-h-[calc(100vh-100px)] flex flex-col">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2 pb-3 border-b border-outline-variant/50">
            <span className="material-symbols-outlined text-primary">history_edu</span> My History
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {history.length === 0 ? (
              <p className="text-sm text-on-surface-variant text-center py-4">No submissions yet.</p>
            ) : history.slice(0, 5).map((eod, i) => (
              <div key={i} className="border border-outline-variant/50 rounded-lg p-3 bg-surface-container-low hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold">{new Date(eod.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{moods.find(m => m.value === eod.mood)?.emoji}</span>
                    <span className="text-[10px] font-bold bg-primary-container text-on-primary-container px-1.5 py-0.5 rounded">{eod.productivityScore}/10</span>
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">{eod.tasksCompleted}</p>
                <div className="mt-2 pt-2 border-t border-outline-variant/30 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${eod.status === 'reviewed' ? 'text-success' : 'text-warning'}`}>{eod.status}</span>
                  <span className="text-[10px] text-primary hover:underline font-semibold">View Full</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-surface-container text-on-surface text-xs font-bold rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant/50">View All Records</button>
        </div>
      </div>
    </div>
  );
}
