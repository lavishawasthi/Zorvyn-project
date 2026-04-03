import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { UserPlus, ShieldCheck, Mail } from 'lucide-react';

const users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@finance.io', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@finance.io', role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Ishaan Singh', email: 'ishaan@finance.io', role: 'Viewer', status: 'Inactive' },
];

export default function UsersPage() {
  return (
    <Layout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold">Team Management</h2>
          <p className="text-gray-400">Control access levels and manage team invitations</p>
        </div>
        <Button><UserPlus size={18} /> Invite Member</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
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

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-md font-medium uppercase tracking-tighter ${
                  user.role === 'Admin' ? 'bg-primary/10 text-primary' : 
                  user.role === 'Analyst' ? 'bg-secondary/10 text-secondary' : 'bg-gray-700 text-gray-300'
                }`}>
                  {user.role}
                </span>
                <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold tracking-widest">{user.status}</p>
              </div>
              <Button variant="secondary" className="p-2 h-10 w-10"><ShieldCheck size={18} /></Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}