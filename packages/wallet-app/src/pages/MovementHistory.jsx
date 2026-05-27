import { useState, useEffect } from 'react';
import { StatusBadge } from '@melipago/shared-ui';
import { getMovements } from '../api/walletClient';
import { formatAmount, formatDate } from '../utils/format';
import { MovementRow } from '../components/MovementRow';

export function MovementHistory() {
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getMovements()
      .then(setMovements)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'ALL'
    ? movements
    : movements.filter(m => m.type === filter);

  if (loading) return <div className="loading">Cargando movimientos...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Historial de movimientos</h1>

      <div className="card">
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          {['ALL', 'CREDIT', 'DEBIT'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: filter === type ? '#009ee3' : 'white',
                color: filter === type ? 'white' : '#333',
                fontSize: '13px',
              }}
            >
              {type === 'ALL' ? 'Todos' : type === 'CREDIT' ? 'Créditos' : 'Débitos'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#6c757d' }}>No hay movimientos para este filtro.</p>
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
              {filtered.map(mov => (
                <MovementRow key={mov.id} movement={mov} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
