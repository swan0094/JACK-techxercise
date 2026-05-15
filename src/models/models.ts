// Due to the nature of this project, I am simply keeping all types and models in this single file.
// In a larger project, I would likely split these into multiple files for better organisation.

export enum ItemFrequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Once = 'once',
}

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
  Transefer = 'transfer',
}

export enum EntityType {
  Sales = 'Sales',
  Operations = 'Operations',
}
export const ENTITIES: EntityType[] = [EntityType.Sales, EntityType.Operations]

export interface RecurringItem {
  id: string
  name: string
  amount: number
  frequency: ItemFrequency
  type: TransactionType
  entity: EntityType
}
export type NewRecurringItem = Omit<RecurringItem, 'id'>

export interface Transfer {
  id: string
  name: string
  amount: number
  frequency: ItemFrequency
  fromEntity: EntityType
  toEntity: EntityType
}
export type NewTransfer = Omit<Transfer, 'id'>

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
