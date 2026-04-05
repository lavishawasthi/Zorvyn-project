import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { UserPlus, ShieldCheck, Mail, History, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@finance.io', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@finance.io', role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Ishaan Singh', email: 'ishaan@finance.io', role: 'Viewer', status: 'Inactive' },
];

const auditLogs = [
  { id: 1, user: 'Aarav Sharma', action: 'Updated Transaction #104', date: '2024-03-20 14:30' },
  { id: 2, user: 'Priya Patel', action: 'Generated Monthly Report', date: '2024-03-20 12:15' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    console.log(`User ${userId} role updated to: ${newRole}`);
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  return (
    <Layout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Team Management</h2>
          <p className="text-gray-400">Manage user permissions and account status</p>
        </div>
        <Button><UserPlus size={18} /> Invite Member</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Users</h3>
          {users.map((user) => (
            <div key={user.id} className="p-5 bg-surface border border-gray-800 rounded-2xl flex items-center justify-between group hover:border-gray-700 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-primary font-bold text-lg">
                  {user.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{user.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={12} /> {user.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select 
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                >
                  <option value="Admin">Admin</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Viewer">Viewer</option>
                </select>

                <button 
                  onClick={() => handleStatusToggle(user.id)}
                  className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border ${
                    user.status === 'Active' 
                    ? 'border-secondary/20 text-secondary bg-secondary/5' 
                    : 'border-gray-700 text-gray-500 bg-gray-800'
                  }`}
                >
                  {user.status}
                </button>
                
                <button className="p-2 text-gray-500 hover:text-danger transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <History size={18} className="text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Audit Log</h3>
          </div>
          <div className="bg-surface border border-gray-800 rounded-2xl p-4 space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                <p className="text-sm text-white font-medium">{log.action}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">{log.user}</span>
                  <span className="text-[10px] text-gray-600 font-mono">{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}