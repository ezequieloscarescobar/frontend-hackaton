import { useState } from 'react';
import { Button, Modal } from '@melipago/shared-ui';

// F11: URL hardcodeada — inoperable fuera de localhost
// S5: sin variable de entorno para la URL del servicio
// S6: sin feedback de timeout — si la acción tarda más de 10s, el operador no sabe si se ejecutó
export function AccountStatusControl({ account }) {
  const [showModal, setShowModal] = useState(false);
  const [targetStatus, setTargetStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const canSuspend = account.status === 'ACTIVE';
  const canActivate = account.status === 'SUSPENDED';

  async function handleConfirm() {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/accounts/' + account.id + '/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus }),
      });
      if (response.ok) {
        alert(`Estado actualizado a ${targetStatus}`);
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    } finally {
      setLoading(false);
    }
  }

  function openModal(status) {
    setTargetStatus(status);
    setShowModal(true);
  }

  return (
    <div className="card">
      <div className="card-title">Control de estado</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {canSuspend && (
          <Button variant="danger" onClick={() => openModal('SUSPENDED')}>
            Suspender cuenta
          </Button>
        )}
        {canActivate && (
          <Button variant="primary" onClick={() => openModal('ACTIVE')}>
            Reactivar cuenta
          </Button>
        )}
        {!canSuspend && !canActivate && (
          <p style={{ color: '#6c757d', fontSize: '14px' }}>No hay acciones disponibles para este estado.</p>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Cambiar estado a ${targetStatus}`}
      >
        <p style={{ marginBottom: '16px' }}>
          ¿Confirmás el cambio de estado de la cuenta <strong>{account.id}</strong> a <strong>{targetStatus}</strong>?
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={targetStatus === 'SUSPENDED' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Confirmar'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
