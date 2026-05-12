import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    API.get('/attendance/today').then(res => setAttendance(res.data.attendance)).catch(() => {});
  }, []);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">
            {isAdmin ? 'Admin Overview' : 'My Dashboard'}
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Welcome back, <span className="font-semibold text-primary">{user?.name?.split(' ')[0] || 'User'}</span>. {isAdmin ? "Here's the team's live status." : "Here's your focus for today."}
          </p>
        </div>
        {!isAdmin && (
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              Submit EOD
            </button>
          </div>
        )}
      </div>

      {isAdmin ? <AdminDashboard /> : <EmployeeDashboard attendance={attendance} />}

    </div>
  );
}

function EmployeeDashboard({ attendance }) {
  const tasks = [
    { title: 'Update internal dashboard UI', time: '10:00 AM', status: 'in_progress', priority: 'High' },
    { title: 'Review PR #421 for auth flow', time: '01:00 PM', status: 'todo', priority: 'Medium' },
    { title: 'Weekly sync with engineering', time: '03:30 PM', status: 'todo', priority: 'Low' }
  ];

  const handleAction = async (action) => {
    try {
      if (action === 'login') await API.post('/attendance/login');
      else if (action === 'logout') await API.post('/attendance/logout');
      else if (action === 'break_start') await API.post('/attendance/break/start');
      else if (action === 'break_end') await API.post('/attendance/break/end');
      window.location.reload(); // Quick refresh
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-8 space-y-6">
        {/* Daily Focus */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">target</span> Today's Focus
          </h3>
          <div className="space-y-3">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant bg-surface-container-low hover:border-primary transition-colors cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary" checked={t.status === 'done'} readOnly />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{t.time}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${t.priority === 'High' ? 'bg-error-container text-on-error-container' : t.priority === 'Medium' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm h-64 flex flex-col">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span> Weekly Productivity
          </h3>
          <div className="flex-1 flex items-end justify-between gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
              const h = [60, 80, 100, 40, 75][i];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-primary-container/40 rounded-t-lg relative group-hover:bg-primary/20 transition-colors" style={{ height: '100%' }}>
                    <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                  </div>
                  <span className="text-[10px] font-semibold text-on-surface-variant">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 space-y-6">
        {/* Live Attendance Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-4 flex justify-between items-center">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">schedule</span> Time Clock</span>
            {attendance?.isLoggedIn && <span className="flex items-center gap-1 text-[10px] text-success font-bold bg-success-container/30 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> Active</span>}
          </h3>
          <div className="text-center mb-6">
            <p className="text-3xl font-bold tracking-tight mb-1">{attendance?.workHours || '0.00'}<span className="text-base text-on-surface-variant font-medium">h</span></p>
            <p className="text-xs text-on-surface-variant">Logged today</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {!attendance?.isLoggedIn ? (
              <button onClick={() => handleAction('login')} className="col-span-2 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">Clock In</button>
            ) : (
              <>
                {!attendance.isOnBreak ? (
                  <button onClick={() => handleAction('break_start')} className="py-2 bg-surface-container-high text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant">Start Break</button>
                ) : (
                  <button onClick={() => handleAction('break_end')} className="py-2 bg-warning-container text-on-warning-container text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">End Break</button>
                )}
                <button onClick={() => handleAction('logout')} className="py-2 bg-error-container text-on-error-container text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">Clock Out</button>
              </>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-warning">campaign</span> Announcements
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-3">
              <p className="text-sm font-semibold mb-0.5">Q4 Planning Meeting</p>
              <p className="text-xs text-on-surface-variant">Today at 2:00 PM via Zoom</p>
            </div>
            <div className="border-l-2 border-outline-variant pl-3">
              <p className="text-sm font-semibold mb-0.5">New Office Policies</p>
              <p className="text-xs text-on-surface-variant">Please review the updated HR handbook.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const stats = [
    { label: 'Online Team', value: '12/15', icon: 'groups', color: 'text-success', bg: 'bg-success-container/20' },
    { label: 'Pending EODs', value: '3', icon: 'pending_actions', color: 'text-warning', bg: 'bg-warning-container/20' },
    { label: 'Open Tasks', value: '45', icon: 'assignment', color: 'text-primary', bg: 'bg-primary-container/20' },
    { label: 'Active Projects', value: '8', icon: 'account_tree', color: 'text-secondary', bg: 'bg-secondary-container/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
              </div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
            </div>
            <h3 className="text-2xl font-bold ml-1">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Activity Feed */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">pulse</span> Live Activity
          </h3>
          <div className="space-y-4">
            {['Sarah J. clocked in', 'Mike R. completed task "Auth flow"', 'Anna P. submitted EOD', 'Jordan K. started a break'].map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-outline-variant shrink-0" />
                <div>
                  <p className="text-sm">{log}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">{i * 15} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance Overview */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">donut_large</span> Task Completion Rate
          </h3>
          <div className="flex items-center justify-center h-40">
            {/* Placeholder for a chart */}
            <div className="relative w-32 h-32 rounded-full border-8 border-primary-container flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-r-transparent transform -rotate-45" />
              <div className="text-center">
                <p className="text-xl font-bold">78%</p>
                <p className="text-[10px] text-on-surface-variant uppercase">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
