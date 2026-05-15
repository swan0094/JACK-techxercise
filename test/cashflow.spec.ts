import { describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCashflowStore } from '../src/stores/cashflow'

describe('cashflow store', () => {
  it('adds and removes items', () => {
    setActivePinia(createPinia())
    const store = useCashflowStore()
    store.addItem({
      name: 'Salary',
      amount: 1000,
      type: TransactionType.Income,
      frequency: ItemFrequency.Monthly,
      entity: EntityType.Sales,
    })
    expect(store.items).toHaveLength(1)
    store.removeItem(store.items[0].id)
    expect(store.items).toHaveLength(0)
  })

  it('adds and removes transfers', () => {
    setActivePinia(createPinia())
    const store = useCashflowStore()
    store.addTransfer({
      name: 'Move',
      amount: 500,
      frequency: ItemFrequency.Monthly,
      fromEntity: EntityType.Sales,
      toEntity: EntityType.Operations,
    })
    expect(store.transfers).toHaveLength(1)
    store.removeTransfer(store.transfers[0].id)
    expect(store.transfers).toHaveLength(0)
  })

  it('sets number of months', () => {
    setActivePinia(createPinia())
    const store = useCashflowStore()
    store.setNumberOfMonths(24)
    expect(store.numberOfMonths).toBe(24)
    store.setNumberOfMonths(0)
    expect(store.numberOfMonths).toBe(1)
    store.setNumberOfMonths(100)
    expect(store.numberOfMonths).toBe(60)
  })
})
