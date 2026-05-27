const ACCOUNTS = [
  { id: 'acc-001', ownerId: 'user-001', status: 'ACTIVE',    level: 'BASIC'    },
  { id: 'acc-002', ownerId: 'user-002', status: 'ACTIVE',    level: 'PREMIUM'  },
  { id: 'acc-003', ownerId: 'user-003', status: 'SUSPENDED', level: 'BASIC'    },
  { id: 'acc-004', ownerId: 'user-004', status: 'ACTIVE',    level: 'VERIFIED' },
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAccounts() {
  await delay(300);
  return [...ACCOUNTS];
}

export async function getAccountById(id) {
  await delay(300);
  return ACCOUNTS.find(a => a.id === id) || null;
}

export async function updateAccountStatus(id, newStatus) {
  await delay(300);
  const account = ACCOUNTS.find(a => a.id === id);
  if (account) account.status = newStatus;
  return account;
}
