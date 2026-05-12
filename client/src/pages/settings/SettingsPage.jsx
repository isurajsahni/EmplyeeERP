import { useState } from 'react';

const tabs = [
  { id: 'Workspace', icon: 'domain' },
  { id: 'User Management', icon: 'manage_accounts' },
  { id: 'Roles & Permissions', icon: 'admin_panel_settings' },
  { id: 'Security', icon: 'security' },
  { id: 'Integrations', icon: 'extension' }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Workspace');

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">System Settings</h2>
        <p className="text-sm text-on-surface-variant mt-1">Manage your Nexus ERP workspace and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-2 shadow-sm space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activeTab === t.id ? 'bg-primary-container/30 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}>
                <span className="material-symbols-outlined text-[20px]" style={activeTab === t.id ? { fontVariationSettings: "'FILL' 1" } : undefined}>{t.icon}</span>
                {t.id}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'Workspace' && (
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-1">Workspace Details</h3>
                <p className="text-xs text-on-surface-variant">Update your company info and branding.</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Company Name</label>
                  <input type="text" defaultValue="Acme Corporation" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-[13px] font-medium transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Workspace URL</label>
                  <div className="flex rounded-lg overflow-hidden border border-outline-variant/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                    <span className="bg-surface-container-low px-3 py-2.5 text-on-surface-variant text-[13px] font-medium border-r border-outline-variant/50">https://</span>
                    <input type="text" defaultValue="acme" className="flex-1 bg-surface-container-lowest px-3 py-2.5 outline-none text-[13px] font-medium" />
                    <span className="bg-surface-container-low px-3 py-2.5 text-on-surface-variant text-[13px] font-medium border-l border-outline-variant/50">.nexus.app</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/30">
                <h4 className="text-[13px] font-bold mb-3">Company Logo</h4>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-surface-container-low border-2 border-dashed border-outline-variant/60 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary-container/10 transition-all group">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-3xl">add_photo_alternate</span>
                  </div>
                  <div>
                    <div className="flex gap-2 mb-1">
                      <button className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-[11px] font-bold border border-outline-variant/50 hover:bg-surface-variant transition-colors">Upload Image</button>
                      <button className="text-error px-3 py-1.5 rounded-lg text-[11px] font-bold hover:bg-error-container/30 transition-colors">Remove</button>
                    </div>
                    <p className="text-[10px] text-on-surface-variant font-medium">Recommended: 256x256px. PNG or JPG.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab !== 'Workspace' && (
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-10 shadow-sm text-center">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">construction</span>
              <h3 className="text-xl font-bold mb-2">{activeTab}</h3>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">This configuration module is currently being built. Check back soon for advanced settings and controls.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
