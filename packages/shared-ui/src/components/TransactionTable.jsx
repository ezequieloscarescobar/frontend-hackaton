import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { formatAmount, formatDate } from '../utils/formatters';
import styles from './TransactionTable.module.css';

// F2: el componente mezcla presentación con data fetching; la URL está hardcodeada
// Las apps que necesitan otra URL no pueden reutilizar el componente sin modificarlo
export function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/payments')
      .then(r => r.json())
      .then(setTransactions);
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Monto</th>
          <th>Estado</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.id}>
            <td>{tx.id}</td>
            <td>{tx.senderId}</td>
            <td>{tx.receiverId}</td>
            <td>{formatAmount(tx.amount)}</td>
            <td><StatusBadge status={tx.status} /></td>
            <td>{tx.createdAt ? formatDate(tx.createdAt) : '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
