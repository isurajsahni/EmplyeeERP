import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { value: 'super_admin', label: 'Super Admin', icon: 'security' },
  { value: 'admin', label: 'Admin/Manager', icon: 'manage_accounts' },
  { value: 'employee', label: 'Employee', icon: 'badge' },
  { value: 'hr', label: 'HR Staff', icon: 'diversity_3' },
  { value: 'billing', label: 'Billing Staff', icon: 'payments' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid lg:grid-cols-2 w-full max-w-6xl bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-outline-variant">
      {/* Branding Panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-6 relative bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80')` }}
      >
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-on-primary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            <h1 className="text-2xl font-bold tracking-tight">Nexus ERP</h1>
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">Intelligent Enterprise Management</h2>
          <p className="text-white/90">Secure access to global operations, real-time analytics, and workforce coordination within the Nexus ecosystem.</p>
        </div>
        <div className="relative z-10 flex gap-4">
          <div className="flex items-center gap-1 text-white/70">
            <span className="material-symbols-outlined text-sm">shield</span>
            <span className="text-xs font-semibold uppercase tracking-wider">AES-256 Encrypted</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-xs font-semibold uppercase tracking-wider">ISO 27001 Compliant</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center items-center p-6 md:p-16 bg-surface">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              <h1 className="text-2xl font-bold tracking-tight">Nexus ERP</h1>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-on-surface">Sign In</h3>
            <p className="text-sm text-on-surface-variant">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Corporate Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input
                  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" required
                  className="w-full h-10 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input
                  id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full h-10 pl-10 pr-10 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-base">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input id="remember" type="checkbox" className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-on-surface-variant select-none">Remember this device for 30 days</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary text-on-primary font-semibold rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>Authenticate</span>
                  <span className="material-symbols-outlined text-base">login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
