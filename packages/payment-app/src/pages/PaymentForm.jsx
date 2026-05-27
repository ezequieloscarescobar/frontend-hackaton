import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@melipago/shared-ui';
import { createPayment } from '../api/paymentClient';

// F6: no valida el monto antes del submit — acepta texto libre, negativos y cero
// F7: doble submit no protegido — el botón no se deshabilita durante loading
// S2: sin feedback de timeout ni retry — el usuario no sabe si el pago se procesó si tarda más de lo esperado
// S3: sin propagación de correlationId en los requests salientes
export function PaymentForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    receiverId: '',
    amount: '',
    description: '',
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payment = await createPayment({
        receiverId: form.receiverId,
        amount: form.amount,
        description: form.description,
      });
      navigate(`/payments/${payment.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Nuevo pago</h1>

      <div className="card" style={{ maxWidth: '480px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="receiverId">Cuenta destinataria</label>
            <select
              id="receiverId"
              name="receiverId"
              value={form.receiverId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná una cuenta</option>
              <option value="acc-002">acc-002 (usuario-002)</option>
              <option value="acc-004">acc-004 (usuario-004)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Monto</label>
            <input
              id="amount"
              name="amount"
              type="text"
              placeholder="Ej: 50000"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción (opcional)</label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Motivo del pago"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" variant="primary">
            {loading ? 'Procesando...' : 'Pagar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
