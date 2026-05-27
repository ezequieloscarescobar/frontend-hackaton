import { useState, useEffect } from 'react';
import { AmountDisplay, StatusBadge } from '@melipago/shared-ui';
import { getWallet, getMovements } from '../api/walletClient';
import { formatAmount, formatDate } from '../utils/format';
import { MovementRow } from '../components/MovementRow';

// F-WA1: mezcla fetching, transformación y presentación en un solo componente (~180 líneas)
// No hay custom hooks — todo el estado se maneja con useState directo en el componente página
// S3: la variable error existe pero nunca se renderiza — si el API falla, el componente muestra un div vacío
export function WalletDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getWallet(), getMovements()])
      .then(([walletData, movementsData]) => {
        setWallet(walletData);
        setMovements(movementsData);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // error existe en el estado pero nunca se renderiza: pantalla en blanco si el API falla
  return (
    <div className="page">
      <h1 className="page-title">Saldo disponible</h1>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Saldo disponible</div>
          {wallet && (
            <AmountDisplay
              amount={wallet.availableBalance}
              size="lg"
            />
          )}
        </div>
        <div className="card">
          <div className="card-title">Saldo retenido</div>
          {wallet && (
            <AmountDisplay
              amount={wallet.retainedBalance}
              size="lg"
            />
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: '16px' }}>Últimos movimientos</div>
        {movements.length === 0 ? (
          <p style={{ color: '#6c757d' }}>Sin movimientos registrados.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#6c757d' }}>Descripción</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#6c757d' }}>Tipo</th>
                <th style={{ textAlign: 'right', padding: '8px 0', color: '#6c757d' }}>Monto</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#6c757d' }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#6c757d' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {movements.slice(0, 5).map(mov => (
                <MovementRow key={mov.id} movement={mov} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {wallet?.account && (
        <div className="card">
          <div className="card-title">Información de cuenta</div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Cuenta</span>
              <div style={{ fontWeight: 600 }}>{wallet.account.id}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Nivel</span>
              <div style={{ fontWeight: 600 }}>{wallet.account.level}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>Estado</span>
              <div><StatusBadge status={wallet.account.status} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
