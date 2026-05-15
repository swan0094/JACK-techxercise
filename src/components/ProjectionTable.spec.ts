import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProjectionTable from './ProjectionTable.vue'
import { useCashflowStore } from '@/stores/cashflow'

describe('ProjectionTable', () => {
  it('calls setNumberOfMonths when month input changes', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCashflowStore()
    const setMonthsSpy = vi.spyOn(store, 'setNumberOfMonths')

    const wrapper = mount(ProjectionTable, {
      global: {
        plugins: [pinia],
      },
    })

    const monthsInput = wrapper.find('#months')
    await monthsInput.setValue('18')
    await monthsInput.trigger('change')

    expect(setMonthsSpy).toHaveBeenCalledWith(18)
  })

  it('renders one row per projected month', () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(ProjectionTable, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(12)
  })
})
