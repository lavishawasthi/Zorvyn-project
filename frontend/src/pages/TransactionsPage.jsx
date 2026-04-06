import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Plus, Filter, Download, Trash2, Search, DollarSign, Calendar } from 'lucide-react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function TransactionsPage() {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', {
        ...formData,
        amount: Number(formData.amount)
      });
      setModalOpen(false);
      setFormData({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanent deletion of financial record? This action is irreversible.')) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.message || 'Authorization failure: Admin access required');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Ledger Registry</h2>
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase opacity-80 mt-1">Immutable record of all fiscal operations</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="secondary" className="flex-1 md:flex-none border border-gray-800 hover:bg-gray-800/50">
            <Download size={18} className="text-primary" /> <span className="font-bold">EXPORT</span>
          </Button>
          {(user?.role === 'Admin' || user?.role === 'Analyst') && (
            <Button onClick={() => setModalOpen(true)} className="flex-1 md:flex-none shadow-lg shadow-primary/20">
              <Plus size={18} /> <span className="font-bold">NEW ENTRY</span>
            </Button>
          )}
        </div>
      </div>

      <div className="bg-surface border border-gray-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <Table headers={['Timestamp', 'Operational Description', 'Classification', 'Authorization', 'Magnitude', 'Actions']}>
          {isLoading ? (
             <tr><td colSpan="6" className="py-20 text-center font-bold text-primary italic tracking-widest">Decrypting Local Registry...</td></tr>
          ) : transactions.length === 0 ? (
            <tr><td colSpan="6" className="py-20 text-center font-bold text-gray-600 uppercase tracking-widest">No structural data detected</td></tr>
          ) : (
            transactions.map((t) => (
              <tr key={t._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-all duration-200 group">
                <td className="px-8 py-5 text-sm font-mono text-gray-500 font-bold uppercase">{new Date(t.date).toLocaleDateString('en-GB')}</td>
                <td className="px-8 py-5 font-bold text-white tracking-tight">{t.description}</td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-background px-3 py-1.5 rounded-lg border border-gray-800">{t.category}</span>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={t.type === 'income' ? 'success' : 'warning'}>
                    {t.type === 'income' ? 'CREDIT' : 'DEBIT'}
                  </Badge>
                </td>
                <td className={`px-8 py-5 text-right font-black tracking-tighter text-lg ${t.type === 'income' ? 'text-primary' : 'text-white'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td className="px-8 py-5 text-right">
                  {user?.role === 'Admin' && (
                    <button 
                      onClick={() => handleDelete(t._id)}
                      className="p-3 text-gray-600 hover:text-danger hover:bg-danger/10 rounded-xl transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Fiscal Entry Initiation"
      >
        <form onSubmit={handleSubmit} className="p-2 space-y-6">
          <Input 
            label="Transaction Intelligence" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Operational purpose..." 
            icon={Search} 
            required
            className="font-bold"
          />
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Capital Magnitude" 
              name="amount"
              type="number" 
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00" 
              icon={DollarSign} 
              required
              className="font-bold"
            />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ms-1">Operation Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="bg-background border border-gray-800 rounded-xl px-4 h-[52px] text-white font-bold focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="expense">DEBIT (OUTFLOW)</option>
                <option value="income">CREDIT (INFLOW)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <Input 
              label="Taxonomy Category" 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g. INFRA, OPS" 
              required
              className="font-bold"
            />
            <Input 
              label="Event Timestamp" 
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              icon={Calendar} 
              required
              className="font-bold"
            />
          </div>
          <div className="flex gap-4 mt-10">
            <Button 
              type="button"
              variant="secondary" 
              className="flex-1 py-4 font-bold border border-gray-800" 
              onClick={() => setModalOpen(false)}
            >
              ABORT
            </Button>
            <Button type="submit" className="flex-1 py-4 font-bold shadow-lg shadow-primary/20">
              EXECUTE RECORD
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}