export default function BudgetProgress({ category, spent, limit, color }) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{category}</span>
        <span className={`font-medium ${isOver ? 'text-danger' : 'text-white'}`}>
          ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: isOver ? '#f87171' : color 
          }}
        />
      </div>
    </div>
  );
}