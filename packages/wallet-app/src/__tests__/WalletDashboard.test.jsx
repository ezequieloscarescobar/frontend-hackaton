import { render, screen } from '@testing-library/react';
import { WalletDashboard } from '../pages/WalletDashboard';

// T1/T-WA: test problemático — solo verifica que aparece el label, no el valor real del saldo
// No valida comportamiento ante error ni el monto correcto
describe('WalletDashboard', () => {
  it('muestra el título de saldo disponible', async () => {
    render(<WalletDashboard />);
    const headings = await screen.findAllByText('Saldo disponible');
    expect(headings.length).toBeGreaterThan(0);
  });
});
