import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge, Button } from '@melipago/shared-ui';
import { getPayments } from '../api/paymentClient';

export function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPayments()
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Cargando pagos...</div>;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Mis pagos</h1>
        <Link to="/payments/new">
          <Button variant="primary">+ Nuevo pago</Button>
        </Link>
      </div>

      <div className="card">
        {payments.length === 0 ? (
          <p style={{ color: '#6c757d' }}>No tenés pagos registrados.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Descripción</th>
                <th style={{ textAlign: 'right', padding: '8px 12px', color: '#6c757d' }}>Monto</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d' }}>Estado</th>
                <th style={{ padding: '8px 12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 12px', color: '#6c757d', fontSize: '12px' }}>{p.id}</td>
                  <td style={{ padding: '10px 12px' }}>{p.description}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>
                    ${(p.amount / 100).toLocaleString('es-AR')}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <StatusBadge status={p.status} />
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Link to={`/payments/${p.id}`} style={{ color: '#009ee3', fontSize: '13px' }}>Ver detalle</Link>
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
