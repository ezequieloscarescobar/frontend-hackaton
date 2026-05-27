import { formatAmount } from '../utils/formatters';
import styles from './AmountDisplay.module.css';

export function AmountDisplay({ amount, currency = 'ARS', label, size = 'md' }) {
  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <span className={`${styles.amount} ${styles[size]}`}>
        {formatAmount(amount, currency)}
      </span>
    </div>
  );
}
