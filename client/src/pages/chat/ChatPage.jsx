import { useState } from 'react';

const initialMessages = [
  { id: 1, user: 'Sarah Jenkins', avatar: 'S', text: 'Has anyone checked the new ERP designs? They look amazing.', time: '10:42 AM', color: 'bg-primary-container text-on-primary-container' },
  { id: 2, user: 'Mike Ross', avatar: 'M', text: 'Yes! Just reviewing the documentation now. Will integrate the components later today.', time: '10:45 AM', color: 'bg-secondary-container text-on-secondary-container' },
  { id: 3, user: 'Anna Parker', avatar: 'A', text: 'Hey @Mike Ross, make sure to include the new HR directory table in the build!', time: '11:00 AM', color: 'bg-tertiary-container text-on-tertiary-container', mention: true },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'You', avatar: 'Y', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), color: 'bg-surface-variant text-on-surface' }]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4 animate-fade-in-up">
      {/* Sidebar */}
      <div className="w-64 border border-outline-variant/50 rounded-xl bg-surface-container-lowest flex flex-col overflow-hidden shrink-0 hidden md:flex shadow-sm">
        <div className="p-4 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low">
          <h2 className="font-bold">Messages</h2>
          <button className="p-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors"><span className="material-symbols-outlined text-[16px]">edit_square</span></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 px-2">
              <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Channels</h3>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">add</span></button>
            </div>
            <div className="space-y-0.5">
              <button className="w-full text-left px-3 py-1.5 rounded-md bg-primary-container/20 text-primary font-bold text-[13px] flex items-center gap-2">
                <span className="text-on-surface-variant">#</span> general
              </button>
              <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2">
                <span className="text-outline">#</span> engineering
              </button>
              <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2">
                <span className="text-outline">#</span> announcements
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1 px-2">
              <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Direct Messages</h3>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">add</span></button>
            </div>
            <div className="space-y-0.5">
              {['Sarah Jenkins', 'Mike Ross', 'Jordan Kim'].map((name, i) => (
                <button key={name} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-surface-container-high text-on-surface-variant font-medium text-[13px] flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-success' : 'bg-outline-variant'}`}></div>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-low">
          <div>
            <h3 className="font-bold flex items-center gap-1.5"><span className="text-outline font-normal">#</span> general</h3>
            <p className="text-[11px] text-on-surface-variant font-medium">Company-wide announcements and discussions.</p>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">search</span></button>
            <button className="p-2 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">info</span></button>
          </div>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-surface-container-lowest">
          <div className="text-center py-4">
            <div className="inline-block px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Today</div>
          </div>
          {messages.map((m) => (
            <div key={m.id} className="flex gap-3 group">
              <div className={`w-9 h-9 rounded-md ${m.color} flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-background`}>{m.avatar}</div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-bold text-[13px]">{m.user}</span>
                  <span className="text-[10px] text-on-surface-variant font-semibold">{m.time}</span>
                </div>
                <p className={`text-[13px] leading-relaxed ${m.mention ? 'bg-warning-container/30 border border-warning/20 p-2 rounded-lg inline-block' : 'text-on-surface'}`}>
                  {m.text}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex gap-1">
                  <button className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">add_reaction</span></button>
                  <button className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">reply</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/50">
          <form onSubmit={handleSend} className="border border-outline-variant/60 rounded-xl bg-surface-container-low flex flex-col focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all shadow-sm">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message #general..." className="w-full bg-transparent border-none outline-none p-3 text-[13px]" />
            <div className="flex justify-between items-center p-2 bg-surface-container-lowest border-t border-outline-variant/30">
              <div className="flex gap-1">
                <button type="button" className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[18px]">add_circle</span></button>
                <button type="button" className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span></button>
                <button type="button" className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined text-[18px]">alternate_email</span></button>
              </div>
              <button type="submit" disabled={!input.trim()} className="p-1.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:bg-surface-container-high disabled:text-outline"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span></button>
            </div>
          </form>
          <p className="text-[10px] text-center text-on-surface-variant font-medium mt-2"><strong>Return</strong> to send, <strong>Shift + Return</strong> to add a new line.</p>
        </div>
      </div>
    </div>
  );
}
