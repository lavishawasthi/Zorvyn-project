import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Rent', value: 4500, color: '#fbbf24' },
  { name: 'Food', value: 3000, color: '#2dd4bf' },
  { name: 'Tech', value: 2000, color: '#818cf8' },
  { name: 'Other', value: 1000, color: '#f87171' },
];

export default function CategoryChart() {
  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Spending by Category</h3>
      <div className="flex-1 flex items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 ml-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}