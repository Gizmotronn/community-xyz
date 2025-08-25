// Mimic transaction storage for dashboard
export type Transaction = {
  id: number
  type: 'Invest' | 'Distribute'
  group: string
  amount: number
  date: string
  info: string
}


const STORAGE_KEY = 'transactionsDemo'

function loadTransactions(): Transaction[] {
  if (typeof window !== 'undefined') {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch {
        return []
      }
    }
  }
  return [
    { id: 1, type: 'Invest', group: 'Lung Cancer', amount: 10000, date: '2025-08-01', info: 'User invested in Lung Cancer community' },
    { id: 2, type: 'Distribute', group: 'Diabetes', amount: 5000, date: '2025-08-05', info: 'Funds distributed to Diabetes community' },
  ]
}

function saveTransactions(txs: Transaction[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(txs))
  }
}

let transactions: Transaction[] = loadTransactions()

export function addTransaction(tx: Transaction) {
  transactions.push(tx)
  saveTransactions(transactions)
}

export function getTransactions() {
  return transactions
}
