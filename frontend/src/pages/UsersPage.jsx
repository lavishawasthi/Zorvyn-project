import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { UserPlus, ShieldCheck, Mail, History, ShieldAlert, BadgeCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, logsResponse] = await Promise.all([
        api.get('/users/all-users'),
        api.get('/audit')
      ]);
      setUsers(usersResponse.data.data);
      setAuditLogs(logsResponse.data.data);
    } catch (error) {
      console.error('Administrative access restricted');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch('/users/update-role', { userId, newRole });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Access Denied: Authorization Override Failed');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Security & Governance</h2>
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase opacity-80 mt-1">Hierarchical permission control and system audit</p>
        </div>
        <Button className="font-bold shadow-lg shadow-primary/10">
          <UserPlus size={18} /> <span className="uppercase">Authorize Entry</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={20} className="text-primary" />
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">Personnel Registry</h3>
          </div>
          
          {isLoading ? (
            <div className="py-20 text-center font-bold text-primary italic tracking-widest">Querying Identity Nexus...</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="p-6 bg-surface border border-gray-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between group hover:border-primary/30 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-gray-800 flex items-center justify-center text-primary font-black text-xl shadow-inner ring-1 ring-primary/10">
                    {(user.fullname || user.username)[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight group-hover:text-primary transition-colors mb-1">
                      {user.fullname || user.username}
                      {user._id === currentUser?._id && <span className="ms-2 text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full lowercase">self</span>}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <Mail size={12} className="text-gray-700" /> {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <select 
                      disabled={user._id === currentUser?._id}
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-background border border-gray-800 rounded-xl px-5 py-3 text-xs font-black text-white uppercase tracking-widest focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="Admin">🔐 ADMIN</option>
                      <option value="Analyst">📊 ANALYST</option>
                      <option value="Viewer">👁️ VIEWER</option>
                    </select>
                  </div>

                  <div className="h-10 w-px bg-gray-800 hidden sm:block"></div>
                  
                  <div className={`p-2 rounded-xl border transition-colors ${
                    user.role === 'Admin' ? 'border-primary/20 bg-primary/5 text-primary' : 'border-gray-800 text-gray-600'
                  }`}>
                    {user.role === 'Admin' ? <ShieldAlert size={20} /> : <BadgeCheck size={20} />}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <History size={20} className="text-secondary" />
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">Operational Pulse</h3>
          </div>
          
          <div className="bg-surface border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
            {isLoading ? (
               <div className="py-10 text-center font-bold text-secondary italic tracking-widest text-xs">Streaming Logs...</div>
            ) : auditLogs.length === 0 ? (
               <div className="py-10 text-center font-bold text-gray-700 uppercase tracking-widest text-xs">Silent History</div>
            ) : (
              auditLogs.map((log) => (
                <div key={log._id} className="pb-6 border-b border-gray-800/50 last:border-0 last:pb-0 group">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-xs font-black text-white uppercase tracking-tight group-hover:text-secondary transition-colors line-clamp-2">{log.details}</p>
                     <span className="text-[9px] font-black text-secondary border border-secondary/20 px-2 py-0.5 rounded bg-secondary/5 ms-2 shrink-0">{log.action}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-md bg-gray-900 border border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                          {log.user?.fullname?.[0] || 'U'}
                       </div>
                       <span className="text-[10px] font-bold text-gray-500 tracking-wide">{log.user?.fullname || 'Anonymous'}</span>
                    </div>
                    <span className="text-[9px] text-gray-700 font-mono font-bold">{new Date(log.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}