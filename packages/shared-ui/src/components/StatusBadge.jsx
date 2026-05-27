import styles from './StatusBadge.module.css';

// F1: lógica específica de ops-dashboard metida en la librería compartida mediante el prop isOpsView
export function StatusBadge({ status, isOpsView }) {
  if (isOpsView) {
    return <span style={{ color: 'red', fontWeight: 'bold' }}>{status}</span>;
  }
  return <span className={`${styles.badge} ${styles[status?.toLowerCase()]}`}>{status}</span>;
}
