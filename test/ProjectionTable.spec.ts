import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectionTable from '../src/components/ProjectionTable.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCashflowStore } from '../src/stores/cashflow'

describe('ProjectionTable', () => {
  it('renders projections for each month', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCashflowStore()
    store.items.push({
      id: 'item-1',
      name: 'Salary',
      amount: 1000,
      type: TransactionType.Income,
      frequency: ItemFrequency.Monthly,
      entity: EntityType.Sales,
    })
    const wrapper = mount(ProjectionTable, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.findAll('tbody tr').length).toBeGreaterThan(0)
  })

  it('shows correct net cashflow', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCashflowStore()
    store.items.push({
      id: 'item-1',
      name: 'Salary',
      amount: 1000,
      type: TransactionType.Income,
      frequency: ItemFrequency.Monthly,
      entity: EntityType.Sales,
    })
    const wrapper = mount(ProjectionTable, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.text()).toContain('Salary')
    expect(wrapper.text()).toContain('1000.00')
  })
})
