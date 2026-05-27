import { Button, Modal } from '@melipago/shared-ui';
import { useState } from 'react';

export function PaymentStatusActions({ transaction }) {
  const [showModal, setShowModal] = useState(false);

  const canCancel = ['INITIATED', 'PROCESSING'].includes(transaction.status);

  if (!canCancel) {
    return (
      <div className="card" style={{ color: '#6c757d', fontSize: '14px' }}>
        Esta transacción no tiene acciones disponibles.
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Acciones disponibles</h3>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Cancelar pago
      </Button>

      {/* F5: Modal de shared-ui no usa portal — en payment-app queda detrás del header fijo */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Cancelar pago"
      >
        <p style={{ marginBottom: '16px' }}>
          ¿Estás seguro de que querés cancelar este pago? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={() => alert('Cancelación enviada: ' + transaction.id)}>
            Confirmar cancelación
          </Button>
        </div>
      </Modal>
    </div>
  );
}
