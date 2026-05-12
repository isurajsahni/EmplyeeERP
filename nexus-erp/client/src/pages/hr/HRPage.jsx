import { useState } from 'react';

const employees = [
  { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Engineering Lead', dept: 'Engineering', status: 'Active', email: 'sarah@nexus.com', joinDate: '2022-03-15', location: 'New York, Remote' },
  { id: 'EMP-002', name: 'Mike Ross', role: 'Product Designer', dept: 'Design', status: 'Active', email: 'mike@nexus.com', joinDate: '2023-01-10', location: 'London, Remote' },
  { id: 'EMP-003', name: 'Anna Parker', role: 'HR Manager', dept: 'Human Resources', status: 'On Leave', email: 'anna@nexus.com', joinDate: '2021-11-05', location: 'Toronto, Remote' },
  { id: 'EMP-004', name: 'Jordan Kim', role: 'Full Stack Developer', dept: 'Engineering', status: 'Active', email: 'jordan@nexus.com', joinDate: '2023-08-20', location: 'Seoul, Remote' },
  { id: 'EMP-005', name: 'Lisa Thompson', role: 'Finance Analyst', dept: 'Finance', status: 'Onboarding', email: 'lisa@nexus.com', joinDate: '2024-10-28', location: 'Sydney, Remote' },
];

export default function HRPage() {
  const [tab, setTab] = useState('directory'); // directory, leaves, onboarding

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">HR & Team</h2>
          <div className="flex gap-4 mt-2 border-b border-outline-variant/50">
            {['directory', 'leaves', 'onboarding'].map(v => (
              <button key={v} onClick={() => setTab(v)} className={`text-sm font-semibold pb-1.5 -mb-[1px] capitalize transition-colors ${tab === v ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                {v.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-container text-on-surface px-4 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant/50 hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">publish</span> Export
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">person_add</span> Invite Member
          </button>
        </div>
      </div>

      {tab === 'directory' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Headcount', value: '15', icon: 'groups', color: 'text-primary', bg: 'bg-primary-container/20' },
              { label: 'Remote Locations', value: '8', icon: 'public', color: 'text-secondary', bg: 'bg-secondary-container/20' },
              { label: 'On Leave', value: '1', icon: 'event_busy', color: 'text-warning', bg: 'bg-warning-container/20' },
              { label: 'Open Roles', value: '3', icon: 'work_history', color: 'text-success', bg: 'bg-success-container/20' },
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

          {/* Directory Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center bg-surface-container-lowest rounded-lg px-3 py-1.5 border border-outline-variant/50 w-64">
                <span className="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
                <input type="text" placeholder="Search team..." className="bg-transparent border-none text-sm outline-none w-full" />
              </div>
              <div className="flex gap-2">
                <select className="text-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 outline-none font-semibold text-on-surface-variant">
                  <option>All Departments</option><option>Engineering</option><option>Design</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-surface-container-lowest border-b border-outline-variant">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Employee</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Role & Dept</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {employees.map((emp, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[11px] font-bold shrink-0 border border-background shadow-sm">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">{emp.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{emp.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[13px]">{emp.role}</p>
                        <p className="text-[11px] text-on-surface-variant">{emp.dept}</p>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium text-on-surface-variant flex items-center gap-1.5 pt-4">
                        <span className="material-symbols-outlined text-[14px]">location_on</span> {emp.location}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          emp.status === 'Active' ? 'bg-success-container/30 text-success border border-success/20' : 
                          emp.status === 'Onboarding' ? 'bg-primary-container/30 text-primary border border-primary/20' : 
                          'bg-warning-container/30 text-warning border border-warning/20'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 rounded-md hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'leaves' && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-outline mb-3">event_busy</span>
          <h3 className="text-lg font-bold">Leave Management</h3>
          <p className="text-on-surface-variant text-sm mt-1">Review and approve employee leave requests here.</p>
        </div>
      )}

      {tab === 'onboarding' && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-outline mb-3">how_to_reg</span>
          <h3 className="text-lg font-bold">Onboarding Workflows</h3>
          <p className="text-on-surface-variant text-sm mt-1">Track new hire progress and document collection.</p>
        </div>
      )}
    </div>
  );
}
