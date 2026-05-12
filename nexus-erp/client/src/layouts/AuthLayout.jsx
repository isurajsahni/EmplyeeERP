import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6">
      <Outlet />
      <footer className="fixed bottom-4 text-center w-full px-6">
        <p className="text-xs font-semibold text-outline uppercase tracking-widest">
          © 2024 Nexus Enterprise Resource Planning • System v4.2.0
        </p>
      </footer>
    </div>
  );
}
