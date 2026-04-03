import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 3800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
];

export default function IncomeExpenseChart() {
  return (
    <div className="h-full w-full">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
          <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} hide />
          <Tooltip 
            cursor={{fill: '#262626'}}
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '12px' }}
          />
          <Bar dataKey="income" fill="#2dd4bf" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}