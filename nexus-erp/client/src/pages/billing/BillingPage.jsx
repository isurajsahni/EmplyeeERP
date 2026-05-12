import { useState } from 'react';

const invoices = [
  { id: 'INV-2024-042', client: 'Acme Corp', project: 'Website Redesign', date: 'Oct 15, 2024', due: 'Oct 30, 2024', amount: '$12,500.00', status: 'Paid' },
  { id: 'INV-2024-043', client: 'Globex Inc', project: 'API Integration', date: 'Oct 18, 2024', due: 'Nov 02, 2024', amount: '$8,300.00', status: 'Pending' },
  { id: 'INV-2024-044', client: 'Stark Industries', project: 'Cloud Migration', date: 'Oct 20, 2024', due: 'Oct 20, 2024', amount: '$45,000.00', status: 'Overdue' },
  { id: 'INV-2024-045', client: 'Wayne Enterprises', project: 'Security Audit', date: 'Oct 22, 2024', due: 'Nov 06, 2024', amount: '$18,750.00', status: 'Draft' },
];

const statusStyle = {
  Paid: 'bg-success-container/30 text-success border-success/20',
  Pending: 'bg-warning-container/30 text-warning border-warning/20',
  Overdue: 'bg-error-container/30 text-error border-error/20',
  Draft: 'bg-surface-variant text-on-surface-variant border-outline-variant/30',
};

export default function BillingPage() {
  const [tab, setTab] = useState('invoices'); // invoices, clients, expenses

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Billing & Finance</h2>
          <div className="flex gap-4 mt-2 border-b border-outline-variant/50">
            {['invoices', 'quotes', 'clients', 'expenses'].map(v => (
              <button key={v} onClick={() => setTab(v)} className={`text-sm font-semibold pb-1.5 -mb-[1px] capitalize transition-colors ${tab === v ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-container text-on-surface px-4 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant/50 hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">receipt</span> Record Expense
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span> Create Invoice
          </button>
        </div>
      </div>

      {tab === 'invoices' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue (YTD)', value: '$842,500', icon: 'account_balance', color: 'text-success', bg: 'bg-success-container/20', trend: '+14% vs last year' },
              { label: 'Outstanding Invoices', value: '$53,300', icon: 'pending_actions', color: 'text-warning', bg: 'bg-warning-container/20', trend: '3 Overdue' },
              { label: 'Monthly Expenses', value: '$12,450', icon: 'credit_card', color: 'text-error', bg: 'bg-error-container/20', trend: 'Under budget' },
              { label: 'Active Clients', value: '28', icon: 'handshake', color: 'text-primary', bg: 'bg-primary-container/20', trend: '2 new this month' },
            ].map((s, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                    <span className={`material-symbols-outlined text-[18px] ${s.color}`}>{s.icon}</span>
                  </div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">{s.value}</h3>
                <p className="text-[11px] font-semibold text-on-surface-variant">{s.trend}</p>
              </div>
            ))}
          </div>

          {/* Invoices Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center bg-surface-container-lowest rounded-lg px-3 py-1.5 border border-outline-variant/50 w-64">
                <span className="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
                <input type="text" placeholder="Search invoices..." className="bg-transparent border-none text-sm outline-none w-full" />
              </div>
              <div className="flex gap-2">
                <select className="text-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 outline-none font-semibold text-on-surface-variant">
                  <option>All Status</option><option>Paid</option><option>Pending</option><option>Overdue</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-surface-container-lowest border-b border-outline-variant">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Invoice / Client</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Project</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Issue Date</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {invoices.map((inv, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                      <td className="px-4 py-3">
                        <p className="font-bold text-[13px] text-primary group-hover:underline">{inv.id}</p>
                        <p className="text-[11px] font-semibold text-on-surface-variant">{inv.client}</p>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium">{inv.project}</td>
                      <td className="px-4 py-3 text-[12px] text-on-surface-variant font-medium">{inv.date}</td>
                      <td className="px-4 py-3 text-[12px] text-on-surface-variant font-medium flex items-center gap-1.5 pt-4">
                        <span className={`material-symbols-outlined text-[14px] ${inv.status === 'Overdue' ? 'text-error' : ''}`}>event</span>
                        <span className={inv.status === 'Overdue' ? 'text-error font-bold' : ''}>{inv.due}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold tracking-tight">{inv.amount}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider border ${statusStyle[inv.status]}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <button className="p-1.5 rounded-md hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors" title="Download PDF"><span className="material-symbols-outlined text-[18px]">download</span></button>
                        <button className="p-1.5 rounded-md hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors" title="Send Reminder"><span className="material-symbols-outlined text-[18px]">mail</span></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab !== 'invoices' && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-outline mb-3">construction</span>
          <h3 className="text-lg font-bold capitalize">{tab} Module</h3>
          <p className="text-on-surface-variant text-sm mt-1">This section is currently under development.</p>
        </div>
      )}
    </div>
  );
}
