import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';
import api from '../../services/api';

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/transactions');
      setActivities(response.data.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to stream activity pulse');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) return <div className="text-center py-10 font-black text-primary animate-pulse tracking-widest text-[10px] uppercase italic">Synchronizing Global Ledger...</div>;

  if (activities.length === 0) return (
     <div className="text-center py-12 bg-background/30 rounded-2xl border border-gray-800 border-dashed">
        <Activity size={24} className="mx-auto mb-3 text-gray-700 opacity-50" />
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] italic">No active structural signals detected</p>
     </div>
  );

  return (
    <div className="space-y-4">
      {activities.map((item) => (
        <div key={item._id} className="flex items-center justify-between p-4 rounded-2xl bg-background/40 border border-gray-800 hover:border-primary/20 hover:bg-gray-800/40 transition-all duration-300 group">
          <div className="flex items-center gap-5">
            <div className={`p-3 rounded-xl border transition-all duration-500 ${
              item.type === 'income' 
              ? 'bg-secondary/5 border-secondary/10 text-secondary group-hover:bg-secondary/20 group-hover:scale-110' 
              : 'bg-danger/5 border-danger/10 text-danger group-hover:bg-danger/20 group-hover:scale-110'
            }`}>
              {item.type === 'income' ? <ArrowDownLeft size={18} strokeWidth={3} /> : <ArrowUpRight size={18} strokeWidth={3} />}
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">{item.description}</p>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest bg-gray-900 px-2 py-0.5 rounded border border-gray-800">{item.category}</span>
                 <p className="text-[10px] font-bold text-gray-600 font-mono italic">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
             <p className={`text-sm font-black tracking-tighter ${item.type === 'income' ? 'text-secondary' : 'text-white'}`}>
               {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
             </p>
             <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1">Confirmed</p>
          </div>
        </div>
      ))}
    </div>
  );
}