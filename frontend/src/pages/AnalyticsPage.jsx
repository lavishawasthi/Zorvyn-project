import Layout from '../components/layout/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
];

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Financial Analytics</h2>
        <p className="text-gray-400">Deep dive into your spending and revenue patterns</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Area Chart */}
        <div className="p-6 bg-surface border border-gray-800 rounded-2xl h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Income vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="income" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" stroke="#f87171" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface border border-gray-800 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {['Housing', 'Food', 'Cloud Services', 'Entertainment'].map((cat, i) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-gray-400">{cat}</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${80 - (i * 15)}%` }}></div>
                  </div>
                  <span className="font-mono text-sm">₹{5000 - (i * 1000)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-surface border border-gray-800 rounded-2xl flex flex-col justify-center items-center text-center">
            <p className="text-gray-400 mb-2">Savings Rate</p>
            <h4 className="text-5xl font-bold text-secondary">24.5%</h4>
            <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest">+2% from last month</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}