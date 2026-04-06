import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    count: 0
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get('/transactions/summary');
      setSummary(response.data.data);
    } catch (error) {
      console.error('Failed to fetch summary');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <header className="mb-10 animate-in fade-in slide-in-from-left duration-700">
        <h2 className="text-3xl font-black tracking-tight text-white mb-2 uppercase">Financial Overview</h2>
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase opacity-80">Real-time surveillance of your capital flow</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard title="Liquidity Balance" value={formatCurrency(summary.balance)} trend={100} icon={Wallet} color="primary" />
        <StatCard title="Cumulative Inflow" value={formatCurrency(summary.totalIncome)} trend={12} icon={TrendingUp} color="secondary" />
        <StatCard title="Cumulative Outflow" value={formatCurrency(summary.totalExpense)} trend={-5} icon={CreditCard} color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {user?.role !== 'Viewer' && (
          <>
            <div className="lg:col-span-2 p-8 bg-surface border border-gray-800 rounded-3xl h-[450px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Performance Analytics</h3>
              <IncomeExpenseChart />
            </div>

            <div className="p-8 bg-surface border border-gray-800 rounded-3xl h-[450px] shadow-2xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Allocation Audit</h3>
              <CategoryChart />
            </div>
          </>
        )}

        <div className="lg:col-span-3 p-8 bg-surface border border-gray-800 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Global Activity Registry</h3>
          </div>
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
}