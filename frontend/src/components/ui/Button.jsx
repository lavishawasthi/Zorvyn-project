import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, className, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-primary text-black hover:bg-amber-400',
    secondary: 'bg-surface border border-gray-700 text-white hover:bg-gray-800',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
  };

  return (
    <button 
      className={twMerge(
        'px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}