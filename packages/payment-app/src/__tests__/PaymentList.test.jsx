import { render, screen } from '@testing-library/react';
import { PaymentList } from '../pages/PaymentList';

// T4/T-PA: test problemático — llama render sin BrowserRouter ni mock de fetch
// Pasa en local si la app está corriendo, pero falla en CI donde no hay servidor
describe('PaymentList', () => {
  it('renderiza sin crashear', () => {
    render(<PaymentList />);
    expect(screen.getByText('Cargando pagos...')).toBeInTheDocument();
  });
});
