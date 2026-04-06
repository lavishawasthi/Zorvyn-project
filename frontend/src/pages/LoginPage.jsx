import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Finance.io</h1>
          <p className="text-gray-400 font-medium tracking-wide">Secure access to your dashboard</p>
        </div>

        {error && <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-xl mb-6 text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ms-1">Username or Email</label>
            <input name="username" type="text" required value={formData.username} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="admin" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ms-1">Password Credentials</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/10">Sign In Now</Button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account? <Link to="/register" className="text-primary hover:text-primary/80 font-bold transition-colors">Register</Link>
        </p>
      </div>
    </div>
  );
}