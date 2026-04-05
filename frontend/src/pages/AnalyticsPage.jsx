import Layout from '../components/layout/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
];

const budgets = [
  { category: 'Housing', spent: 4000, limit: 5000, color: '#fbbf24' },
  { category: 'Food', spent: 3200, limit: 3000, color: '#f87171' },
  { category: 'Cloud Services', spent: 1500, limit: 2500, color: '#2dd4bf' },
  { category: 'Entertainment', spent: 800, limit: 1000, color: '#818cf8' },
];

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Financial Analytics</h2>
        <p className="text-gray-400">Deep dive into your spending and revenue patterns</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface border border-gray-800 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6">Category Budgets</h3>
            <div className="space-y-6">
              {budgets.map((item) => {
                const percentage = Math.min((item.spent / item.limit) * 100, 100);
                const isOver = item.spent > item.limit;
                
                return (
                  <div key={item.category}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">{item.category}</span>
                      <span className={isOver ? 'text-danger font-bold' : 'text-white'}>
                        ₹{item.spent.toLocaleString()} / ₹{item.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500" 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: isOver ? '#f87171' : item.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-6 bg-surface border border-gray-800 rounded-2xl flex flex-col justify-center items-center text-center">
            <p className="text-gray-400 mb-2">Savings Rate</p>
            <h4 className="text-5xl font-bold text-secondary">24.5%</h4>
            <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800 w-full">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-medium text-secondary">On Track to Yearly Goal</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}