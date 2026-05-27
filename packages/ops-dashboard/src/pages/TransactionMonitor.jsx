import { useState, useEffect } from 'react';
import { StatusBadge } from '@melipago/shared-ui';
import { getAllTransactions } from '../api/paymentClient';

// F9: acoplado directamente a response.data._embedded.transactions
// Si el contrato cambia (se elimina _embedded), el componente rompe silenciosamente
// S1: sin estado de error — cuando el backend no responde, la tabla simplemente no muestra datos
// S1: sin mensaje de error, sin indicador de "servicio no disponible", sin retry
export function TransactionMonitor() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    getAllTransactions()
      .then(response => {
        const txs = response.data._embedded.transactions;
        setTransactions(txs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = statusFilter === 'ALL'
    ? transactions
    : transactions.filter(t => t.status === statusFilter);

  const counts = {
    INITIATED: transactions.filter(t => t.status === 'INITIATED').length,
    PROCESSING: transactions.filter(t => t.status === 'PROCESSING').length,
    COMPLETED: transactions.filter(t => t.status === 'COMPLETED').length,
    FAILED: transactions.filter(t => t.status === 'FAILED').length,
    REVERSED: transactions.filter(t => t.status === 'REVERSED').length,
  };

  return (
    <div className="page">
      <h1 className="page-title">Monitor de transacciones</h1>

      <div className="stat-grid">
        {Object.entries(counts).map(([status, count]) => (
          <div className="stat-card" key={status}>
            <div className="stat-label">{status}</div>
            <div className="stat-value">{count}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          {['ALL', 'INITIATED', 'PROCESSING', 'COMPLETED', 'FAILED', 'REVERSED'].map(s => (
            <button
              key={s}
              className={`filter-btn${statusFilter === s ? ' active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'ALL' ? 'Todas' : s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Cargando transacciones...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Origen</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Destino</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', color: '#6c757d' }}>Monto</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{tx.id}</td>
                  <td style={{ padding: '10px 12px' }}>{tx.senderId}</td>
                  <td style={{ padding: '10px 12px' }}>{tx.receiverId}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>
                    ${(tx.amount / 100).toLocaleString('es-AR')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <StatusBadge status={tx.status} isOpsView={true} />
                  </td>
                  <td style={{ padding: '10px 12px', color: '#6c757d' }}>
                    {new Date(tx.createdAt).toLocaleDateString('es-AR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
