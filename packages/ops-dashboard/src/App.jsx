import { Routes, Route, NavLink } from 'react-router-dom';
import { TransactionMonitor } from './pages/TransactionMonitor';
import { AccountManager } from './pages/AccountManager';
import { AccountDetail } from './pages/AccountDetail';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">⚙ Ops Dashboard</NavLink>
        <NavLink to="/" end>Transacciones</NavLink>
        <NavLink to="/accounts">Cuentas</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TransactionMonitor />} />
        <Route path="/accounts" element={<AccountManager />} />
        <Route path="/accounts/:id" element={<AccountDetail />} />
      </Routes>
    </>
  );
}
