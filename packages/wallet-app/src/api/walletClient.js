const ACCOUNTS = [
  { id: 'acc-001', ownerId: 'user-001', status: 'ACTIVE', level: 'BASIC' },
  { id: 'acc-002', ownerId: 'user-002', status: 'ACTIVE', level: 'PREMIUM' },
];

const WALLETS = [
  { accountId: 'acc-001', availableBalance: 150000, retainedBalance: 0 },
  { accountId: 'acc-002', availableBalance: 800000, retainedBalance: 0 },
];

const MOVEMENTS = [
  { id: 'txn-001', type: 'DEBIT',  amount: 30000,  description: 'Pago a acc-002', status: 'COMPLETED', createdAt: '2024-11-01T10:00:00Z' },
  { id: 'txn-002', type: 'CREDIT', amount: 15000,  description: 'Cobro de acc-004', status: 'COMPLETED', createdAt: '2024-11-02T14:30:00Z' },
  { id: 'txn-003', type: 'DEBIT',  amount: 100000, description: 'Pago a acc-004', status: 'PROCESSING', createdAt: '2024-11-03T09:15:00Z' },
  { id: 'txn-004', type: 'CREDIT', amount: 60000,  description: 'Cobro de acc-004', status: 'FAILED',    createdAt: '2024-11-04T16:00:00Z' },
  { id: 'txn-005', type: 'CREDIT', amount: 25000,  description: 'Reversión de txn-005', status: 'REVERSED', createdAt: '2024-11-05T11:45:00Z' },
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// S4: el mock nunca simula errores — no hay forma de ver cómo se comporta la app ante un 503 sin modificar este cliente
export async function getWallet(accountId = 'acc-001') {
  await delay(500);
  const wallet = WALLETS.find(w => w.accountId === accountId);
  const account = ACCOUNTS.find(a => a.id === accountId);
  return { ...wallet, account };
}

export async function getMovements(accountId = 'acc-001') {
  await delay(500);
  return MOVEMENTS;
}
