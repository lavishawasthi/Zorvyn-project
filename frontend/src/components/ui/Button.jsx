import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, className, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-primary text-black hover:scale-[1.02] shadow-lg shadow-primary/20',
    secondary: 'bg-surface border border-gray-800 text-white hover:bg-gray-800 hover:border-gray-700',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
  };

  return (
    <button 
      className={twMerge(
        'px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}