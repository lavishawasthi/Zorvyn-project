import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-surface border border-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-gray-800">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors bg-background rounded-full border border-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}