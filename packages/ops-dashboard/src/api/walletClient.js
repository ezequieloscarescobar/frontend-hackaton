// F10: COPIA de wallet-app/api/walletClient.js — variante con delay de 300ms
const WALLETS = [
  { accountId: 'acc-001', availableBalance: 150000, retainedBalance: 0 },
  { accountId: 'acc-002', availableBalance: 800000, retainedBalance: 0 },
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithAuth(url, options = {}) {
  await delay(300);
  return { ok: true, status: 200 };
}

export async function getWalletByAccount(accountId) {
  await delay(300);
  return WALLETS.find(w => w.accountId === accountId) || null;
}
