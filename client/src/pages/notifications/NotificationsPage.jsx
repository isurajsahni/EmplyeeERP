export default function NotificationsPage() {
  const notifications = [
    { title: 'Urgent: Q4 Audit Review Required', body: 'Sarah Jenkins requested your review on the Q4 Infrastructure Audit report. Due by 5:00 PM.', time: 'Just now', type: 'urgent', icon: 'assignment_late', color: 'text-error', bg: 'bg-error-container/20' },
    { title: 'Mentioned in "Frontend Redesign"', body: '@Jordan Can you verify the Tailwind configuration for the new typography scale?', time: '2 hours ago', type: 'mention', icon: 'alternate_email', color: 'text-primary', bg: 'bg-primary-container/20' },
    { title: 'Payroll Processed for October', body: 'Your salary for October 2024 has been credited to your account.', time: '5 hours ago', type: 'system', icon: 'payments', color: 'text-success', bg: 'bg-success-container/20' },
    { title: 'Database Backup Completed', body: 'Weekly scheduled database backup to AWS S3 has been successfully completed.', time: 'Yesterday', type: 'system', icon: 'cloud_sync', color: 'text-secondary', bg: 'bg-secondary-container/20' },
    { title: 'Team Meeting Reminder', body: 'Sprint planning meeting at 3:00 PM in Conference Room A.', time: 'Yesterday', type: 'reminder', icon: 'event', color: 'text-warning', bg: 'bg-warning-container/20' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Inbox & Notifications</h2>
          <p className="text-sm text-on-surface-variant mt-1">Stay updated with tasks, mentions, and system alerts.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-container text-on-surface px-4 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant/50 hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">done_all</span> Mark all read
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-outline-variant/50 pb-1">
        {['All (5)', 'Mentions', 'Tasks', 'System'].map((tab, i) => (
          <button key={tab} className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${i === 0 ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`rounded-xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow relative bg-surface-container-lowest border ${n.type === 'urgent' ? 'border-error/30 ring-1 ring-error/20' : 'border-outline-variant/50'}`}>
            {n.type === 'urgent' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-error rounded-l-xl"></div>}
            {n.type === 'mention' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>}
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}>
              <span className={`material-symbols-outlined text-[20px] ${n.color}`}>{n.icon}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-[14px] ${n.type === 'urgent' ? 'text-error' : 'text-on-surface'}`}>{n.title}</h4>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{n.time}</span>
              </div>
              <p className="text-[13px] text-on-surface-variant mb-3 leading-relaxed">{n.body}</p>
              
              {(n.type === 'urgent' || n.type === 'mention') && (
                <div className="flex gap-2">
                  <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-[11px] font-bold hover:opacity-90 transition-opacity shadow-sm">View Details</button>
                  <button className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-[11px] font-bold border border-outline-variant/50 hover:bg-surface-variant transition-colors">Mark Done</button>
                </div>
              )}
            </div>
            
            <button className="p-1 rounded-md text-outline hover:text-on-surface opacity-0 hover:opacity-100 transition-opacity absolute top-3 right-3"><span className="material-symbols-outlined text-[18px]">close</span></button>
          </div>
        ))}
      </div>
    </div>
  );
}
