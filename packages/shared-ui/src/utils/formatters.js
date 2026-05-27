// F3: formatAmount redondea a 2 decimales — wallet-app/src/utils/format.js tiene una versión distinta que no redondea
export function formatAmount(amount, currency = 'ARS') {
  const rounded = Math.round(amount * 100) / 100;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatStatus(status) {
  const labels = {
    INITIATED: 'Iniciada',
    PROCESSING: 'En proceso',
    COMPLETED: 'Completada',
    FAILED: 'Fallida',
    REVERSED: 'Revertida',
    ACTIVE: 'Activa',
    SUSPENDED: 'Suspendida',
    CLOSED: 'Cerrada',
  };
  return labels[status] || status;
}
