import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useAuthStore } from '../store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <Layout>
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-400">Real-time overview of your financial health.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Balance" value="₹1,24,500" trend={12} icon={Wallet} color="primary" />
        <StatCard title="Monthly Income" value="₹85,000" trend={5} icon={TrendingUp} color="secondary" />
        <StatCard title="Monthly Expense" value="₹32,400" trend={-8} icon={CreditCard} color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {user?.role !== 'Viewer' && (
          <>
            <div className="lg:col-span-2 p-6 bg-surface border border-gray-800 rounded-3xl h-[400px]">
              <IncomeExpenseChart />
            </div>

            <div className="p-6 bg-surface border border-gray-800 rounded-3xl h-[400px]">
              <CategoryChart />
            </div>
          </>
        )}

        <div className={`${user?.role === 'Viewer' ? 'lg:col-span-3' : 'lg:col-span-3'} p-6 bg-surface border border-gray-800 rounded-3xl`}>
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
}