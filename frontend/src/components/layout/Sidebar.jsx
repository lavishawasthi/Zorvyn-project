import { LayoutDashboard, ReceiptText, BarChart3, Users, LogOut } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ReceiptText, label: 'Transactions', path: '/transactions' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'User Management', path: '/users', adminOnly: true },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-surface border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          FINANCE.IO
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <a key={item.label} href={item.path} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-primary hover:bg-gray-800/50 rounded-xl transition-all">
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 text-danger w-full hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}