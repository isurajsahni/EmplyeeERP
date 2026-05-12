import { useState } from 'react';

const priorityColors = {
  urgent: 'bg-error-container text-on-error-container border-error',
  high: 'bg-warning-container text-on-warning-container border-warning',
  medium: 'bg-primary-container text-on-primary-container border-primary',
  low: 'bg-surface-variant text-on-surface-variant border-outline-variant',
};

const statusColumns = [
  { key: 'todo', label: 'To Do', icon: 'radio_button_unchecked', color: 'text-outline' },
  { key: 'in_progress', label: 'In Progress', icon: 'pending', color: 'text-primary' },
  { key: 'review', label: 'In Review', icon: 'visibility', color: 'text-warning' },
  { key: 'done', label: 'Completed', icon: 'check_circle', color: 'text-success' },
];

export default function TasksPage() {
  const [view, setView] = useState('kanban'); // kanban, list, calendar
  const [tasks, setTasks] = useState([
    { _id: '1', title: 'Implement Auth Middleware', status: 'done', priority: 'high', project: 'Backend API', dueDate: '2024-10-30', assignee: 'Sarah J.' },
    { _id: '2', title: 'Design System Tokens in Tailwind v4', status: 'in_progress', priority: 'urgent', project: 'Frontend', dueDate: '2024-11-05', assignee: 'Mike R.' },
    { _id: '3', title: 'Database Schema for HR Module', status: 'review', priority: 'medium', project: 'Backend API', dueDate: '2024-11-06', assignee: 'Anna P.' },
    { _id: '4', title: 'Create EOD Submission API', status: 'todo', priority: 'low', project: 'Backend API', dueDate: '2024-11-10', assignee: 'Jordan K.' },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', project: '', dueDate: '' });

  // Drag and Drop State
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleCreateTask = (e) => {
    e.preventDefault();
    setTasks([{ ...newTask, _id: Date.now().toString(), status: 'todo', assignee: 'You' }, ...tasks]);
    setShowCreate(false);
    setNewTask({ title: '', priority: 'medium', project: '', dueDate: '' });
  };

  // Drag Handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to keep the original card visible while dragging
    setTimeout(() => {
      if (e.target) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    if (e.target) e.target.classList.remove('opacity-50');
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnKey) {
      setDragOverColumn(columnKey);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (!draggedTaskId) return;

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === draggedTaskId ? { ...task, status: targetStatus } : task
      )
    );
    setDraggedTaskId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in-up h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Tasks & Projects</h2>
          <div className="flex gap-4 mt-2 border-b border-outline-variant/50">
            {['kanban', 'list', 'calendar'].map(v => (
              <button key={v} onClick={() => setView(v)} className={`text-sm font-semibold pb-1.5 -mb-[1px] capitalize transition-colors ${view === v ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                {v} View
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-surface-container rounded-lg px-3 py-1.5 border border-outline-variant/50">
            <span className="material-symbols-outlined text-outline text-[16px] mr-2">filter_list</span>
            <span className="text-[12px] font-semibold text-on-surface-variant">Filter</span>
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span> New Task
          </button>
        </div>
      </div>

      {/* Create Task Inline */}
      {showCreate && (
        <form onSubmit={handleCreateTask} className="bg-surface-container-lowest border border-primary/50 rounded-xl p-4 shadow-md space-y-3 shrink-0 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} placeholder="What needs to be done?" required autoFocus className="col-span-1 md:col-span-2 h-9 px-3 bg-surface-container-low border border-outline-variant rounded-md focus:ring-1 focus:ring-primary outline-none text-sm" />
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="h-9 px-3 bg-surface-container-low border border-outline-variant rounded-md outline-none text-sm">
              <option value="low">Low Priority</option><option value="medium">Medium Priority</option><option value="high">High Priority</option><option value="urgent">Urgent</option>
            </select>
            <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="h-9 px-3 bg-surface-container-low border border-outline-variant rounded-md outline-none text-sm" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-1.5 text-[12px] font-bold text-on-surface-variant hover:bg-surface-container-high rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-1.5 text-[12px] font-bold bg-primary text-on-primary rounded-md shadow-sm">Save Task</button>
          </div>
        </form>
      )}

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex-1 overflow-x-auto pb-4 select-none">
          <div className="flex gap-4 h-full min-w-max">
            {statusColumns.map(col => (
              <div 
                key={col.key} 
                className={`w-[300px] flex flex-col bg-surface-container/30 rounded-xl border transition-colors duration-200 ${dragOverColumn === col.key ? 'border-primary bg-primary-container/10 ring-2 ring-primary/20' : 'border-outline-variant/30'}`}
                onDragOver={(e) => handleDragOver(e, col.key)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.key)}
              >
                <div className="p-3 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[16px] ${col.color}`}>{col.icon}</span>
                    <h3 className="text-[12px] font-bold uppercase tracking-wider">{col.label}</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-surface-container-highest px-1.5 py-0.5 rounded text-on-surface-variant">{tasks.filter(t => t.status === col.key).length}</span>
                </div>
                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                  {tasks.filter(t => t.status === col.key).map(task => (
                    <div 
                      key={task._id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, task._id)}
                      onDragEnd={handleDragEnd}
                      className="bg-surface-container-lowest border border-outline-variant/60 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing group relative z-10"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${priorityColors[task.priority]}`}>{task.priority}</span>
                        <button className="opacity-0 group-hover:opacity-100 text-outline hover:text-on-surface transition-opacity"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
                      </div>
                      <h4 className="text-sm font-semibold mb-2 leading-snug">{task.title}</h4>
                      {task.project && <span className="inline-block px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-semibold rounded mb-3">{task.project}</span>}
                      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">event</span>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container border border-background flex items-center justify-center text-[10px] font-bold" title={task.assignee}>
                          {task.assignee.charAt(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Drop Indicator placeholder when dragging over an empty column or end of column */}
                  {dragOverColumn === col.key && (
                    <div className="h-20 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 opacity-50 transition-all pointer-events-none" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-container-low sticky top-0 z-10 border-b border-outline-variant">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Task Name</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Project</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Assignee</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {tasks.map(task => (
                  <tr key={task._id} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">drag_indicator</span>
                      {task.title}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-surface-container px-2 py-0.5 rounded border border-outline-variant/50">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColumns.find(c => c.key === task.status)?.color.replace('text-', 'bg-')}`}></span>
                        {statusColumns.find(c => c.key === task.status)?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3"><span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${priorityColors[task.priority]}`}>{task.priority}</span></td>
                    <td className="px-4 py-3 text-[11px] text-on-surface-variant font-medium">{task.project || '—'}</td>
                    <td className="px-4 py-3 text-xs font-medium flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[9px] font-bold">{task.assignee.charAt(0)}</div>
                      {task.assignee}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-on-surface-variant font-medium">{task.dueDate || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calendar View (Placeholder) */}
      {view === 'calendar' && (
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex items-center justify-center">
          <div className="text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2">calendar_month</span>
            <p className="font-semibold text-sm">Calendar view coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
