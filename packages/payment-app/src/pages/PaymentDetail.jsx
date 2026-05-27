import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StatusBadge, Button } from '@melipago/shared-ui';
import { getPaymentById } from '../api/paymentClient';
import { PaymentStatusActions } from '../components/PaymentStatusActions';

// F8: asume que transaction.sender está expandido — accede a transaction.sender.name
// pero el API devuelve solo senderId. Produce TypeError en runtime al renderizar.
export function PaymentDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentById(id)
      .then(setTransaction)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Cargando detalle...</div>;
  if (!transaction) return <div className="page"><p>Transacción no encontrada.</p></div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '16px' }}>
        <Link to="/" style={{ color: '#009ee3', fontSize: '14px' }}>← Volver a mis pagos</Link>
      </div>

      <h1 className="page-title">Detalle de pago</h1>

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>ID de transacción</div>
            <div style={{ fontWeight: 600 }}>{transaction.id}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Estado</div>
            <StatusBadge status={transaction.status} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Remitente</div>
            <div style={{ fontWeight: 600 }}>{transaction.sender.name}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Destinatario</div>
            <div style={{ fontWeight: 600 }}>{transaction.receiverId}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Monto</div>
            <div style={{ fontWeight: 700, fontSize: '20px' }}>
              ${(transaction.amount / 100).toLocaleString('es-AR')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Descripción</div>
            <div>{transaction.description || '—'}</div>
          </div>
        </div>
      </div>

      <PaymentStatusActions transaction={transaction} />
    </div>
  );
}
