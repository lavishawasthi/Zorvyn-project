import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import UsersPage from './pages/UsersPage';
import RoleGuard from './components/auth/RoleGuard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        
        <Route 
          path="/analytics" 
          element={
            <RoleGuard allowedRoles={['Admin', 'Analyst']}>
              <AnalyticsPage />
            </RoleGuard>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <RoleGuard allowedRoles={['Admin']}>
              <UsersPage />
            </RoleGuard>
          } 
        />
      </Routes>
    </Router>
  );
}