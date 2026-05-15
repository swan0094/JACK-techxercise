// Due to the nature of this project, I am simply keeping all types and models in this single file.
// In a larger project, I would likely split these into multiple files for better organisation.

export type RecurrenceType = 'daily' | 'weekly' | 'monthly'
export type TransactionType = 'income' | 'expense'
export type TransferFrequency = RecurrenceType | 'once'
export type EntityType = 'Sales' | 'Operations'

export type NewRecurringItem = Omit<RecurringItem, 'id'>
export type NewTransfer = Omit<Transfer, 'id'>

export const ENTITIES: EntityType[] = ['Sales', 'Operations']

export interface RecurringItem {
  id: string
  name: string
  amount: number
  frequency: RecurrenceType
  type: TransactionType
  entity: EntityType
}

export interface Transfer {
  id: string
  name: string
  amount: number
  frequency: TransferFrequency
  fromEntity: EntityType
  toEntity: EntityType
}

export interface MonthProjection {
  month: number
  monthLabel: string
  totalIncome: number
  totalExpenses: number
  totalTransfersIn: number
  totalTransfersOut: number
  netCashflow: number
  cumulativeBalance: number
}
