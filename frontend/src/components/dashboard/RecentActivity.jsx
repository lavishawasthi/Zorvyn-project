import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const activities = [
  { id: 1, title: 'Payment to Vercel', type: 'expense', amount: '₹1,500', date: '2 mins ago' },
  { id: 2, title: 'Salary Credit', type: 'income', amount: '₹85,000', date: '4 hours ago' },
  { id: 3, title: 'Netflix Subscription', type: 'expense', amount: '₹499', date: 'Yesterday' },
];

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Activity</h3>
      {activities.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${item.type === 'income' ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'}`}>
              {item.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </div>
          <p className={`text-sm font-bold ${item.type === 'income' ? 'text-secondary' : 'text-white'}`}>
            {item.type === 'income' ? '+' : '-'}{item.amount}
          </p>
        </div>
      ))}
    </div>
  );
}