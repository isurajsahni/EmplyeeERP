import { useState, useEffect } from 'react';
import API from '../../services/api';

const statusColors = {
  present: 'bg-primary text-on-primary',
  absent: 'bg-error-container text-on-error-container',
  late: 'bg-warning-container text-on-warning-container',
  leave: 'bg-surface-container-high text-on-surface-variant',
  wfh: 'bg-secondary-container text-on-secondary-container',
  half_day: 'bg-tertiary-container text-on-tertiary-container',
  holiday: 'bg-primary-fixed text-on-primary-fixed',
};

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const [myRes, todayRes] = await Promise.all([
        API.get('/attendance/my'),
        API.get('/attendance/today')
      ]);
      setRecords(myRes.data.attendance);
      setTodayRecord(todayRes.data.attendance);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleAction = async (action) => {
    try {
      if (action === 'login') await API.post('/attendance/login');
      else if (action === 'logout') await API.post('/attendance/logout');
      else if (action === 'break_start') await API.post('/attendance/break/start');
      else if (action === 'break_end') await API.post('/attendance/break/end');
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || 'Error executing action');
    }
  };

  const stats = {
    present: records.filter(r => r.status === 'present').length,
    late: records.filter(r => r.isLate).length,
    leave: records.filter(r => r.status === 'leave').length,
    score: records.length > 0 ? Math.round(records.reduce((sum, r) => sum + (r.attendanceScore || 0), 0) / records.length) : 0,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Attendance Tracking</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage your daily clock-ins, breaks, and leaves.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-variant transition-colors border border-outline-variant/50">
            <span className="material-symbols-outlined text-[18px]">event_available</span> Apply Leave
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Days Present', value: stats.present, icon: 'check_circle', color: 'text-success', bg: 'bg-success-container/20' },
          { label: 'Late Arrivals', value: stats.late, icon: 'schedule', color: 'text-warning', bg: 'bg-warning-container/20' },
          { label: 'Leaves Taken', value: stats.leave, icon: 'event_busy', color: 'text-secondary', bg: 'bg-secondary-container/20' },
          { label: 'Attendance Score', value: `${stats.score}%`, icon: 'donut_large', color: 'text-primary', bg: 'bg-primary-container/20' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.bg}`}>
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              <h3 className="text-xl font-bold leading-tight mt-0.5">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Action Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">timer</span> Current Status
            </h3>
            <div className="text-center py-4">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Hours Today</p>
              <p className="text-4xl font-bold tracking-tight text-primary">
                {todayRecord?.workHours || '0.00'} <span className="text-base text-on-surface-variant font-medium">h</span>
              </p>
            </div>
            {todayRecord?.loginTime && (
              <div className="flex justify-between items-center text-xs font-medium text-on-surface-variant mt-2 px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/50">
                <div className="flex flex-col"><span>Clock In</span><span className="text-on-surface font-semibold">{new Date(todayRecord.loginTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                {todayRecord?.logoutTime && <div className="flex flex-col text-right"><span>Clock Out</span><span className="text-on-surface font-semibold">{new Date(todayRecord.logoutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-6">
            {!todayRecord?.isLoggedIn ? (
              <button onClick={() => handleAction('login')} className="col-span-2 py-3 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:opacity-90 shadow-md transition-all active:scale-95">Clock In</button>
            ) : (
              <>
                {!todayRecord.isOnBreak ? (
                  <button onClick={() => handleAction('break_start')} className="py-2 bg-surface-container-high text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant">Start Break</button>
                ) : (
                  <button onClick={() => handleAction('break_end')} className="py-2 bg-warning-container text-on-warning-container text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">End Break</button>
                )}
                <button onClick={() => handleAction('logout')} className="py-2 bg-error-container text-on-error-container text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">Clock Out</button>
              </>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-base font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span> Recent Logs
            </h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Clock In</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Clock Out</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {records.length === 0 ? (
                  <tr><td colSpan="5" className="p-6 text-center text-on-surface-variant">No attendance records found.</td></tr>
                ) : records.map((r, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{new Date(r.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${statusColors[r.status] || statusColors.absent} uppercase tracking-wider`}>{r.status}</span>
                      {r.isLate && <span className="ml-2 text-[10px] text-error font-semibold">({r.lateMinutes}m late)</span>}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{r.loginTime ? new Date(r.loginTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '—'}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{r.logoutTime ? new Date(r.logoutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '—'}</td>
                    <td className="px-4 py-3 text-right font-semibold">{r.workHours ? `${r.workHours}h` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
