import { Routes, Route, NavLink } from 'react-router-dom';
import { WalletDashboard } from './pages/WalletDashboard';
import { MovementHistory } from './pages/MovementHistory';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">💳 Mi Billetera</NavLink>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/movements">Movimientos</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<WalletDashboard />} />
        <Route path="/movements" element={<MovementHistory />} />
      </Routes>
    </>
  );
}
