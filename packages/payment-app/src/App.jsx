import { Routes, Route, NavLink } from 'react-router-dom';
import { PaymentList } from './pages/PaymentList';
import { PaymentForm } from './pages/PaymentForm';
import { PaymentDetail } from './pages/PaymentDetail';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">💸 MeliPago</NavLink>
        <NavLink to="/" end>Mis pagos</NavLink>
        <NavLink to="/payments/new">Nuevo pago</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<PaymentList />} />
        <Route path="/payments/new" element={<PaymentForm />} />
        <Route path="/payments/:id" element={<PaymentDetail />} />
      </Routes>
    </>
  );
}
