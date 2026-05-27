import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StatusBadge } from '@melipago/shared-ui';
import { getAccountById } from '../api/accountClient';
import { getWalletByAccount } from '../api/walletClient';
import { AccountStatusControl } from '../components/AccountStatusControl';

export function AccountDetail() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAccountById(id), getWalletByAccount(id)])
      .then(([accountData, walletData]) => {
        setAccount(accountData);
        setWallet(walletData);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Cargando cuenta...</div>;
  if (!account) return <div className="page"><p>Cuenta no encontrada.</p></div>;

  return (
    <div className="page">
      <div style={{ marginBottom: '16px' }}>
        <Link to="/accounts" style={{ color: '#009ee3', fontSize: '14px' }}>← Volver a cuentas</Link>
      </div>

      <h1 className="page-title">Detalle de cuenta</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div className="card">
          <div className="card-title">Información de cuenta</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>ID</div>
              <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>{account.id}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Propietario</div>
              <div style={{ fontWeight: 600 }}>{account.ownerId}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Nivel</div>
              <div style={{ fontWeight: 600 }}>{account.level}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>Estado</div>
              <StatusBadge status={account.status} />
            </div>
          </div>
        </div>

        {wallet && (
          <div className="card">
            <div className="card-title">Billetera</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>Saldo disponible</div>
                <div style={{ fontWeight: 700, fontSize: '24px' }}>
                  ${(wallet.availableBalance / 100).toLocaleString('es-AR')}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>Saldo retenido</div>
                <div style={{ fontWeight: 600 }}>
                  ${(wallet.retainedBalance / 100).toLocaleString('es-AR')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AccountStatusControl account={account} />
    </div>
  );
}
