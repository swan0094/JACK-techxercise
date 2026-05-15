import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TransfersList from './TransfersList.vue'
import { useCashflowStore } from '@/stores/cashflow'

describe('TransfersList', () => {
  it('shows empty state when there are no transfers', () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(TransfersList, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('No transfers added yet')
  })

  it('renders rows and calls remove action on delete', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCashflowStore()

    store.transfers.push({
      id: 'transfer-1',
      name: 'Ops transfer',
      amount: 200,
      frequency: 'monthly',
      fromEntity: 'Sales',
      toEntity: 'Operations',
    })

    const removeSpy = vi.spyOn(store, 'removeTransfer')

    const wrapper = mount(TransfersList, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    await wrapper.find('button').trigger('click')
    expect(removeSpy).toHaveBeenCalledWith('transfer-1')
  })
})
