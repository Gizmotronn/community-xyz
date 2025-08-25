// This is a simple offchain contract storage for demo purposes
export type ContractEvent = {
  id: number
  type: 'Invest' | 'Distribute'
  user: string
  community?: string
  amount: number
  date: string
}


const STORAGE_KEY = 'contractEventsDemo'

function loadEvents(): ContractEvent[] {
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
    { id: 1, type: 'Invest', user: '0x123...', amount: 10000, date: '2025-08-01' },
    { id: 2, type: 'Distribute', user: '0xadmin...', community: 'Lung Cancer', amount: 5000, date: '2025-08-05' },
  ]
}

function saveEvents(events: ContractEvent[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }
}

let contractEvents: ContractEvent[] = loadEvents()

export function addContractEvent(event: ContractEvent) {
  contractEvents.push(event)
  saveEvents(contractEvents)
}

export function getContractEvents() {
  return contractEvents
}
