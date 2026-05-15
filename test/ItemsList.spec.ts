import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ItemsList from '../src/components/ItemsList.vue'
import { useCashflowStore } from '../src/stores/cashflow'

describe('ItemsList', () => {
  it('shows empty state when there are no items', () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(ItemsList, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('No recurring transactions added yet')
  })

  it('renders rows and calls remove action on delete', async () => {
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

    const removeSpy = vi.spyOn(store, 'removeItem')

    const wrapper = mount(ItemsList, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    await wrapper.find('button').trigger('click')
    expect(removeSpy).toHaveBeenCalledWith('item-1')
  })
})
