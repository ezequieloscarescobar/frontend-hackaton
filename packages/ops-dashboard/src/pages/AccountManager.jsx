import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@melipago/shared-ui';
import { getAccounts } from '../api/accountClient';

export function AccountManager() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = statusFilter === 'ALL'
    ? accounts
    : accounts.filter(a => a.status === statusFilter);

  if (loading) return <div className="loading">Cargando cuentas...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Gestión de cuentas</h1>

      <div className="card">
        <div className="filter-bar">
          {['ALL', 'ACTIVE', 'SUSPENDED'].map(s => (
            <button
              key={s}
              className={`filter-btn${statusFilter === s ? ' active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'ALL' ? 'Todas' : s === 'ACTIVE' ? 'Activas' : 'Suspendidas'}
            </button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Propietario</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Nivel</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Estado</th>
              <th style={{ padding: '8px 12px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(acc => (
              <tr key={acc.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{acc.id}</td>
                <td style={{ padding: '10px 12px', color: '#6c757d' }}>{acc.ownerId}</td>
                <td style={{ padding: '10px 12px' }}>{acc.level}</td>
                <td style={{ padding: '10px 12px' }}>
                  <StatusBadge status={acc.status} />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Link to={`/accounts/${acc.id}`} style={{ color: '#009ee3', fontSize: '13px' }}>
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
