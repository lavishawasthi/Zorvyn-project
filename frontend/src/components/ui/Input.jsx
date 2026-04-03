export default function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-gray-500 mb-1.5 ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-surface border border-gray-800 rounded-xl py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-gray-600`}
        />
      </div>
    </div>
  );
}