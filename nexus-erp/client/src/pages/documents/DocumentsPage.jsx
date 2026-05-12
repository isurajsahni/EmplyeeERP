import { useState } from 'react';

const folders = [
  { name: 'HR Policies', files: 12, size: '4.2 MB', icon: 'folder', color: 'text-primary' },
  { name: 'Project Assets', files: 84, size: '1.2 GB', icon: 'folder_shared', color: 'text-secondary' },
  { name: 'Financials 2024', files: 3, size: '1.1 MB', icon: 'folder', color: 'text-success' },
  { name: 'Legal Documents', files: 7, size: '800 KB', icon: 'folder', color: 'text-error' },
];

const files = [
  { name: 'Q3_Financial_Report.pdf', modified: 'Oct 12, 2024', size: '2.4 MB', tag: 'Finance', icon: 'picture_as_pdf', iconColor: 'text-error' },
  { name: 'Employee_Handbook_v2.docx', modified: 'Oct 10, 2024', size: '840 KB', tag: 'HR', icon: 'description', iconColor: 'text-primary' },
  { name: 'Q4_Budget_Proposal.xlsx', modified: 'Oct 8, 2024', size: '1.2 MB', tag: 'Finance', icon: 'table_chart', iconColor: 'text-success' },
  { name: 'Brand_Guidelines.pdf', modified: 'Oct 5, 2024', size: '5.6 MB', tag: 'Design', icon: 'picture_as_pdf', iconColor: 'text-error' },
];

export default function DocumentsPage() {
  const [view, setView] = useState('grid'); // grid, list

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">File Hub</h2>
          <p className="text-sm text-on-surface-variant mt-1">Centralized document management & intelligent search.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-container text-on-surface px-4 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant/50 hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">create_new_folder</span> New Folder
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">upload_file</span> Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-4 shadow-sm">
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-primary-container/20 text-primary font-bold text-[13px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">home</span> All Files
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">schedule</span> Recent
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">star</span> Starred
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">group</span> Shared with me
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">delete</span> Trash
              </button>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-4 shadow-sm">
            <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-3 px-1">Storage Usage</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span>4.2 GB used</span>
                <span className="text-on-surface-variant">10 GB total</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Folders */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold">Folders</h3>
              <div className="flex gap-1 border border-outline-variant/50 rounded-lg p-0.5 bg-surface-container-low">
                <button onClick={() => setView('grid')} className={`p-1 rounded ${view === 'grid' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface'}`}><span className="material-symbols-outlined text-[16px]">grid_view</span></button>
                <button onClick={() => setView('list')} className={`p-1 rounded ${view === 'list' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-outline hover:text-on-surface'}`}><span className="material-symbols-outlined text-[16px]">view_list</span></button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {folders.map((f, i) => (
                <div key={i} className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm hover:border-primary/50 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between h-24 group">
                  <div className="flex justify-between items-start">
                    <span className={`material-symbols-outlined text-[28px] ${f.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-outline hover:text-on-surface transition-opacity"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] truncate">{f.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium">{f.files} Files • {f.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low">
              <h3 className="text-sm font-bold ml-1">Recent Files</h3>
              <div className="flex items-center bg-surface-container-lowest rounded-lg px-3 py-1.5 border border-outline-variant/50 w-64">
                <span className="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
                <input type="text" placeholder="Search files..." className="bg-transparent border-none text-[13px] outline-none w-full" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-surface-container-lowest border-b border-outline-variant/50">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Modified</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tags</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {files.map((f, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                      <td className="px-4 py-3 font-semibold flex items-center gap-3">
                        <span className={`material-symbols-outlined text-[20px] ${f.iconColor}`}>{f.icon}</span>
                        <span className="group-hover:text-primary transition-colors">{f.name}</span>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium text-on-surface-variant">{f.modified}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-on-surface-variant">{f.size}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[10px] font-bold rounded">{f.tag}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">download</span></button>
                          <button className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">share</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
