// F10: copia casi idéntica a ops-dashboard/api/paymentClient.js — tres implementaciones ligeramente distintas de fetchWithAuth
const TRANSACTIONS = [
  { id: 'txn-001', senderId: 'acc-001', receiverId: 'acc-002', amount: 30000,  status: 'INITIATED',  createdAt: '2024-11-01T10:00:00Z', description: 'Pago de servicios' },
  { id: 'txn-002', senderId: 'acc-004', receiverId: 'acc-001', amount: 15000,  status: 'PROCESSING', createdAt: '2024-11-02T14:30:00Z', description: 'Transferencia' },
  { id: 'txn-003', senderId: 'acc-002', receiverId: 'acc-004', amount: 100000, status: 'COMPLETED',  createdAt: '2024-11-03T09:15:00Z', description: 'Compra online' },
  { id: 'txn-004', senderId: 'acc-001', receiverId: 'acc-004', amount: 60000,  status: 'FAILED',     createdAt: '2024-11-04T16:00:00Z', description: 'Pago rechazado' },
  { id: 'txn-005', senderId: 'acc-004', receiverId: 'acc-002', amount: 25000,  status: 'REVERSED',   createdAt: '2024-11-05T11:45:00Z', description: 'Devolución' },
];

let nextId = 6;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithAuth(url, options = {}) {
  await delay(800);
  return { ok: true, status: 200 };
}

// S4: el mock nunca simula errores — no hay forma de ver cómo se comporta la app ante un 503 sin modificar este cliente
export async function getPayments() {
  await delay(800);
  return [...TRANSACTIONS];
}

export async function getPaymentById(id) {
  await delay(800);
  const tx = TRANSACTIONS.find(t => t.id === id);
  if (!tx) throw new Error(`Transacción ${id} no encontrada`);
  return { ...tx };
}

export async function createPayment(payload) {
  await delay(800);
  const newTx = {
    id: `txn-00${nextId++}`,
    senderId: 'acc-001',
    receiverId: payload.receiverId,
    amount: payload.amount,
    status: 'INITIATED',
    createdAt: new Date().toISOString(),
    description: payload.description || 'Nuevo pago',
  };
  TRANSACTIONS.push(newTx);
  return { ...newTx };
}
