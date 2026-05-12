import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Attendance', icon: 'fingerprint', path: '/attendance' },
  { label: 'EOD Report', icon: 'summarize', path: '/eod' },
  { label: 'Tasks', icon: 'assignment', path: '/tasks' },
  { label: 'HR Management', icon: 'group', path: '/hr' },
  { label: 'Billing', icon: 'payments', path: '/billing' },
  { label: 'Documents', icon: 'folder_open', path: '/documents' },
  { label: 'Reports', icon: 'bar_chart', path: '/reports' },
  { label: 'Chat', icon: 'chat', path: '/chat' },
];

const mobileNav = [
  { label: 'Home', icon: 'home', path: '/dashboard' },
  { label: 'Clock', icon: 'schedule', path: '/attendance' },
  { label: 'EOD', icon: 'history_edu', path: '/eod' },
  { label: 'Tasks', icon: 'task_alt', path: '/tasks' },
  { label: 'More', icon: 'menu', path: '/settings' },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('nexus_theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('nexus_theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[260px] z-50 flex flex-col bg-surface-container-low border-r border-outline-variant transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Brand */}
        <div className="p-5 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            <div>
              <h2 className="text-[17px] font-bold tracking-tight text-on-surface leading-tight">Nexus ERP</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">Remote Team OS</p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 mb-3 p-3 bg-surface-container rounded-xl border border-outline-variant/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate leading-tight">{user?.name || 'User'}</p>
              <p className="text-[11px] text-on-surface-variant capitalize truncate">{user?.role?.replace('_', ' ') || 'Employee'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-3 pt-2 pb-1.5">Workspace</p>
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-100 group ${isActive ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high active:scale-[0.98]'}`}>
              {({ isActive }) => (<>
                {isActive && <div className="absolute left-0 w-[3px] h-5 bg-primary rounded-r-full" />}
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-primary' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
                <span>{item.label}</span>
              </>)}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-outline-variant/50 space-y-0.5">
          <NavLink to="/settings" onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all ${isActive ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined text-[20px]">settings</span><span>Settings</span>
          </NavLink>
          <button onClick={() => setDark(!dark)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-on-surface-variant hover:bg-surface-container-high transition-all w-full text-left">
            <span className="material-symbols-outlined text-[20px]">{dark ? 'light_mode' : 'dark_mode'}</span>
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-on-surface-variant hover:bg-error-container/30 hover:text-error transition-all w-full text-left">
            <span className="material-symbols-outlined text-[20px]">logout</span><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[260px] min-h-screen flex flex-col">
        {/* Top Navigation */}
        <header className="flex justify-between items-center w-full px-5 h-14 sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg hover:bg-surface-container-high" onClick={() => setSidebarOpen(true)}>
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-1.5 border border-outline-variant/70 w-80">
              <span className="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
              <input type="text" placeholder="Search... (Cmd+K)" className="bg-transparent border-none text-[13px] focus:outline-none w-full placeholder:text-outline" />
              <kbd className="hidden xl:inline text-[10px] text-outline bg-surface-container-high px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NavLink to="/notifications" className="p-2 rounded-full hover:bg-surface-container-low transition-colors relative">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse-dot"></span>
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-5 md:p-6 max-w-[1400px] w-full mx-auto pb-20 md:pb-6">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 md:hidden bg-surface/95 backdrop-blur-md shadow-lg border-t border-outline-variant">
        {mobileNav.map(item => (
          <NavLink key={item.path} to={item.path}
            className={({ isActive }) => `flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${isActive ? 'text-primary scale-95' : 'text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-xl" style={undefined}>{item.icon}</span>
            <span className="text-[9px] font-semibold tracking-wide uppercase mt-0.5">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
