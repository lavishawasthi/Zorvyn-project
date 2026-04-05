import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Plus, Filter, Search, DollarSign, Download } from 'lucide-react';
import { useState } from 'react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export default function TransactionsPage() {
  const { user } = useAuthStore();
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  const transactions = [
    { id: 1, date: '2024-03-20', desc: 'Amazon Web Services', category: 'Infrastructure', amount: -450.00, status: 'Completed' },
    { id: 2, date: '2024-03-19', desc: 'Client Retainer - Acme Corp', category: 'Income', amount: 2500.00, status: 'Completed' },
    { id: 3, date: '2024-03-18', desc: 'Starbucks Coffee', category: 'Food', amount: -15.50, status: 'Pending' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to Backend:", formData);
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Transactions</h2>
          <p className="text-gray-400">Detailed history of all financial activities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => console.log("Exporting...")}>
            <Download size={18} /> Export
          </Button>
          <Button variant="secondary">
            <Filter size={18} /> Filter
          </Button>
          {user?.role === 'Admin' && (
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={18} /> New Transaction
            </Button>
          )}
        </div>
      </div>

      <Table headers={['Date', 'Description', 'Category', 'Status', 'Amount']}>
        {transactions.map((t) => (
          <tr key={t.id} className="hover:bg-gray-800/20 transition-colors">
            <td className="px-6 py-4 text-sm text-gray-400">{t.date}</td>
            <td className="px-6 py-4 font-medium text-white">{t.desc}</td>
            <td className="px-6 py-4">
              <span className="text-xs text-gray-500">{t.category}</span>
            </td>
            <td className="px-6 py-4">
              <Badge variant={t.status === 'Completed' ? 'success' : 'warning'}>
                {t.status}
              </Badge>
            </td>
            <td className={`px-6 py-4 text-right font-bold ${t.amount > 0 ? 'text-secondary' : 'text-white'}`}>
              {t.amount > 0 ? '+' : ''}
              {t.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </td>
          </tr>
        ))}
      </Table>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Add New Transaction"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Description" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What was this for?" 
            icon={Search} 
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Amount" 
              name="amount"
              type="number" 
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00" 
              icon={DollarSign} 
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="bg-gray-900 border border-gray-800 rounded-xl px-4 h-[42px] text-white focus:outline-none focus:border-primary"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <Input 
            label="Category" 
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g. Food, Infrastructure" 
            required
          />
          <div className="flex gap-3 mt-6">
            <Button 
              type="button"
              variant="secondary" 
              className="flex-1" 
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Record
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}