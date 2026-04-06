import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Create Account</h1>
          <p className="text-gray-400 font-medium">Join the professional finance network</p>
        </div>

        {error && <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-xl mb-6 text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ms-1">Full Name</label>
            <input name="fullname" type="text" required value={formData.fullname} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ms-1">Username</label>
            <input name="username" type="text" required value={formData.username} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="johndoe123" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ms-1">Email Address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="john@company.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ms-1">Access Password</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all placeholder:text-gray-700" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/20">Register Now</Button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
