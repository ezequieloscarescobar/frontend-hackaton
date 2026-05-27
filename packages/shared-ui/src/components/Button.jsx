import styles from './Button.module.css';

export function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
