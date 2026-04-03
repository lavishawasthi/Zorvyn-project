export default function StatCard({ title, value, trend, icon: Icon, color = 'primary' }) {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    danger: 'text-danger',
  };

  return (
    <div className="p-6 bg-surface border border-gray-800 rounded-2xl hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-gray-800/50 ${colors[color]}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}