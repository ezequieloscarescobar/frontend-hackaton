// F10: COPIA de payment-app/api/paymentClient.js — tres implementaciones ligeramente distintas de fetchWithAuth
// Esta versión tiene un delay de 300ms en lugar de 800ms y retorna el response con _embedded
const TRANSACTIONS = [
  { id: 'txn-001', senderId: 'acc-001', receiverId: 'acc-002', amount: 30000,  status: 'INITIATED',  createdAt: '2024-11-01T10:00:00Z' },
  { id: 'txn-002', senderId: 'acc-004', receiverId: 'acc-001', amount: 15000,  status: 'PROCESSING', createdAt: '2024-11-02T14:30:00Z' },
  { id: 'txn-003', senderId: 'acc-002', receiverId: 'acc-004', amount: 100000, status: 'COMPLETED',  createdAt: '2024-11-03T09:15:00Z' },
  { id: 'txn-004', senderId: 'acc-001', receiverId: 'acc-004', amount: 60000,  status: 'FAILED',     createdAt: '2024-11-04T16:00:00Z' },
  { id: 'txn-005', senderId: 'acc-004', receiverId: 'acc-002', amount: 25000,  status: 'REVERSED',   createdAt: '2024-11-05T11:45:00Z' },
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithAuth(url, options = {}) {
  await delay(300);
  return { ok: true, status: 200, data: { _embedded: { transactions: TRANSACTIONS } } };
}

// S4: el mock nunca simula errores
export async function getAllTransactions() {
  const response = await fetchWithAuth('/api/transactions');
  return response;
}

export async function getTransactionById(id) {
  await delay(300);
  return TRANSACTIONS.find(t => t.id === id) || null;
}
