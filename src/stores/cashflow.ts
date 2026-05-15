import { defineStore } from 'pinia'
import { EntityType } from '@/models/models'
import type {
  MonthProjection,
  NewRecurringItem,
  NewTransfer,
  RecurringItem,
  Transfer,
} from '../models/models'
import { buildMonthProjections } from '../utils/cashflowHelpers'

export const useCashflowStore = defineStore('cashflow', {
  state: () => ({
    items: [] as RecurringItem[],
    transfers: [] as Transfer[],
    numberOfMonths: 12,
  }),

  getters: {
    projectedCashflow(state): MonthProjection[] {
      return buildMonthProjections(state.numberOfMonths, state.items, state.transfers)
    },

    getEntityProjectedCashflow: (state) => {
      return (entity: EntityType): MonthProjection[] => {
        return buildMonthProjections(state.numberOfMonths, state.items, state.transfers, entity)
      }
    },
  },

  actions: {
    addItem(item: NewRecurringItem) {
      const newItem: RecurringItem = {
        id: crypto.randomUUID(),
        ...item,
      }
      this.items.push(newItem)
    },

    removeItem(id: string) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    addTransfer(transfer: NewTransfer) {
      const newTransfer: Transfer = {
        id: crypto.randomUUID(),
        ...transfer,
      }
      this.transfers.push(newTransfer)
    },

    removeTransfer(id: string) {
      const index = this.transfers.findIndex((t) => t.id === id)
      if (index !== -1) {
        this.transfers.splice(index, 1)
      }
    },

    setNumberOfMonths(n: number) {
      this.numberOfMonths = Math.max(1, Math.min(60, n))
    },
  },
})
