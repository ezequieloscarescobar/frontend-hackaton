// F3: duplicado de shared-ui/src/utils/formatters.js — esta versión NO redondea a 2 decimales
// ambas coexisten y producen resultados distintos para el mismo monto (ej: 150000.567)
export function formatAmount(amount, currency = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-AR');
}
