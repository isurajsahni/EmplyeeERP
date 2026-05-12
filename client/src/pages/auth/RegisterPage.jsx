import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { value: 'employee', label: 'Employee', icon: 'badge' },
  { value: 'admin', label: 'Admin/Manager', icon: 'manage_accounts' },
  { value: 'hr', label: 'HR Staff', icon: 'diversity_3' },
  { value: 'billing', label: 'Billing Staff', icon: 'payments' },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'employee' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-md bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-outline-variant">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            <h1 className="text-2xl font-bold tracking-tight">Nexus ERP</h1>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-on-surface">Create Account</h3>
          <p className="text-sm text-on-surface-variant">Set up your Nexus workspace credentials</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
              className="w-full h-10 px-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Corporate Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required
              className="w-full h-10 px-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••" required minLength={6}
                className="w-full h-10 px-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Confirm</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••" required
                className="w-full h-10 px-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Access Role</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <label key={r.value} className={`relative flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${form.role === r.value ? 'bg-secondary-container border-primary' : 'border-outline-variant hover:bg-surface-container-high'}`}>
                  <input type="radio" name="role" value={r.value} checked={form.role === r.value} onChange={handleChange} className="sr-only" />
                  <span className={`material-symbols-outlined mb-1 ${form.role === r.value ? 'text-primary' : 'text-on-surface-variant'}`}>{r.icon}</span>
                  <span className={`text-[10px] font-semibold text-center ${form.role === r.value ? 'text-primary' : 'text-on-surface-variant'}`}>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full h-11 bg-primary text-on-primary font-semibold rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-on-surface-variant">
            Already registered? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
