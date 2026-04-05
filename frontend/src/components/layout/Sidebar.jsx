import { LayoutDashboard, ReceiptText, BarChart3, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['Admin', 'Analyst', 'Viewer'] },
    { icon: ReceiptText, label: 'Transactions', path: '/transactions', roles: ['Admin', 'Analyst', 'Viewer'] },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['Admin', 'Analyst'] },
    { icon: Users, label: 'Users', path: '/users', roles: ['Admin'] },
  ];

  return (
    <aside className="w-64 h-screen bg-surface border-r border-gray-800 flex flex-col sticky top-0">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black">F</div>
          FINANCE.IO
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          if (!item.roles.includes(user?.role)) return null;
          
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-primary">
            {user?.name?.[0]}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}