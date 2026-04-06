import Layout from '../components/layout/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Q1', income: 45000, expense: 28000 },
  { name: 'Q2', income: 38000, expense: 32000 },
  { name: 'Q3', income: 52000, expense: 21000 },
  { name: 'Q4', income: 64000, expense: 29000 },
];

const budgets = [
  { category: 'INFRASTRUCTURE', spent: 18000, limit: 15000, color: '#00f3ff' },
  { category: 'OPERATIONS', spent: 12000, limit: 20000, color: '#38bdf8' },
  { category: 'PERSONNEL', spent: 45000, limit: 40000, color: '#f43f5e' },
  { category: 'MARKETING', spent: 5000, limit: 10000, color: '#a855f7' },
];

export default function AnalyticsPage() {
  return (
    <Layout>
      <header className="mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Predictive Analytics</h2>
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase opacity-80 mt-1">Deep-layer fiscal intelligence and trend mapping</p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        <div className="p-8 bg-surface border border-gray-800 rounded-3xl h-[450px] shadow-2xl relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-full blur-[100px] pointer-events-none"></div>
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Yield vs Expenditure Coefficient</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dy={15} />
              <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Area type="step" dataKey="income" stroke="#00f3ff" fillOpacity={1} fill="url(#colorPrimary)" strokeWidth={4} />
              <Area type="step" dataKey="expense" stroke="#f43f5e" fill="transparent" strokeWidth={3} strokeDasharray="6 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 bg-surface border border-gray-800 rounded-3xl shadow-2xl">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Departmental Allocation Audit</h3>
            <div className="space-y-8">
              {budgets.map((item) => {
                const percentage = Math.min((item.spent / item.limit) * 100, 100);
                const isOver = item.spent > item.limit;
                
                return (
                  <div key={item.category}>
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">{item.category}</span>
                      <span className={`text-[10px] font-black tracking-widest uppercase ${isOver ? 'text-danger animate-pulse' : 'text-primary'}`}>
                        {item.spent.toLocaleString()} / {item.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 bg-background border border-gray-800 rounded-full overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: isOver ? '#f43f5e' : '#00f3ff',
                          boxShadow: `0 0 15px ${isOver ? '#f43f5e' : '#00f3ff'}33`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-8 bg-surface border border-gray-800 rounded-3xl flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
             <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Capital Retention Velocity</p>
            <h4 className="text-7xl font-black text-primary tracking-tighter hover:scale-110 transition-transform cursor-default">31.8%</h4>
            <div className="mt-10 p-5 bg-background border border-gray-800 rounded-2xl w-full">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Nexus Status</p>
              <p className="text-xs font-black text-secondary tracking-widest uppercase">OPTIMAL OPERATIONAL FLOW</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}