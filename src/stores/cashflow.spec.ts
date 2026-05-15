import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCashflowStore } from './cashflow'

describe('cashflow store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
      '11111111-1111-1111-1111-111111111111',
    )
  })

  it('adds and removes recurring items', () => {
    const store = useCashflowStore()

    store.addItem({
      name: 'Salary',
      amount: 1000,
      type: 'income',
      frequency: 'monthly',
      entity: 'Sales',
    })

    expect(store.items).toHaveLength(1)
    expect(store.items[0]?.id).toBe('11111111-1111-1111-1111-111111111111')

    store.removeItem('11111111-1111-1111-1111-111111111111')
    expect(store.items).toHaveLength(0)
  })

  it('clamps projection month range', () => {
    const store = useCashflowStore()

    store.setNumberOfMonths(0)
    expect(store.numberOfMonths).toBe(1)

    store.setNumberOfMonths(999)
    expect(store.numberOfMonths).toBe(60)
  })

  it('applies once-off transfers in month 1 only', () => {
    const store = useCashflowStore()
    store.setNumberOfMonths(2)

    store.addTransfer({
      name: 'One-off adjustment',
      amount: 500,
      frequency: 'once',
      fromEntity: 'Sales',
      toEntity: 'Operations',
    })

    const salesProjection = store.getEntityProjectedCashflow('Sales')

    expect(salesProjection).toHaveLength(2)
    expect(salesProjection[0]?.totalTransfersOut).toBe(500)
    expect(salesProjection[1]?.totalTransfersOut).toBe(0)
  })
})
