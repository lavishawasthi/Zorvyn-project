

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-800 text-gray-300',
    success: 'bg-secondary/10 text-secondary border border-secondary/20',
    warning: 'bg-primary/10 text-primary border border-primary/20',
    danger: 'bg-danger/10 text-danger border border-danger/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
}