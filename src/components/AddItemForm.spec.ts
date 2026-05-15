import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AddItemForm from './AddItemForm.vue'
import { useCashflowStore } from '@/stores/cashflow'

describe('AddItemForm', () => {
  it('disables frequency and submits once for one-off transfer', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCashflowStore()
    const addTransferSpy = vi.spyOn(store, 'addTransfer')

    const wrapper = mount(AddItemForm, {
      global: {
        plugins: [pinia],
      },
    })

    await wrapper.find('input[value="transfer"]').setValue(true)
    await wrapper.find('#name').setValue('One-off transfer')
    await wrapper.find('#amount').setValue('250')
    await wrapper.find('input[type="checkbox"]').setValue(true)

    const frequencySelect = wrapper.find('#frequency')
    expect((frequencySelect.element as HTMLSelectElement).disabled).toBe(true)

    await wrapper.find('form').trigger('submit.prevent')

    expect(addTransferSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'One-off transfer',
        amount: 250,
        frequency: 'once',
      }),
    )
  })
})
