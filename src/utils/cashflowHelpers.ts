import { EntityType } from '@/models/models'
import { ItemFrequency, TransactionType } from '../models/models'
import type { MonthProjection, RecurringItem, Transfer } from '../models/models'

export function getMonthLabel(monthOffset: number): string {
  const date = new Date()
  date.setMonth(date.getMonth() + monthOffset)
  return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

export function getOccurrencesInMonth(frequency: ItemFrequency): number {
  switch (frequency) {
    case ItemFrequency.Daily:
      return 30.44 // average days per month
    case ItemFrequency.Weekly:
      return 4.35 // average weeks per month
    case ItemFrequency.Monthly:
      return 1
    case ItemFrequency.Once:
      return 1
    default:
      return 0
  }
}

export function getItemAmountForMonth(
  frequency: ItemFrequency,
  amount: number,
  monthIndex: number,
): number {
  if (frequency === ItemFrequency.Once) {
    return monthIndex === 0 ? amount : 0
  }
  return amount * getOccurrencesInMonth(frequency)
}

type ProjectionTotals = {
  totalIncome: number
  totalExpenses: number
  totalTransfersIn: number
  totalTransfersOut: number
}

function calculateProjectionTotalsForMonth(
  items: RecurringItem[],
  transfers: Transfer[],
  monthIndex: number,
  entity?: EntityType,
): ProjectionTotals {
  let totalIncome = 0
  let totalExpenses = 0
  let totalTransfersIn = 0
  let totalTransfersOut = 0

  items.forEach((item) => {
    if (entity && item.entity !== entity) {
      return
    }

    const monthlyAmount = getItemAmountForMonth(item.frequency, item.amount, monthIndex)

    if (item.type === TransactionType.Income) {
      totalIncome += monthlyAmount
    } else {
      totalExpenses += monthlyAmount
    }
  })

  transfers.forEach((transfer) => {
    const monthlyAmount = getItemAmountForMonth(transfer.frequency, transfer.amount, monthIndex)

    if (!entity) {
      totalTransfersOut += monthlyAmount
      totalTransfersIn += monthlyAmount
      return
    }

    if (transfer.fromEntity === entity) {
      totalTransfersOut += monthlyAmount
    }

    if (transfer.toEntity === entity) {
      totalTransfersIn += monthlyAmount
    }
  })

  return {
    totalIncome,
    totalExpenses,
    totalTransfersIn,
    totalTransfersOut,
  }
}

export function buildMonthProjections(
  numberOfMonths: number,
  items: RecurringItem[],
  transfers: Transfer[],
  entity?: EntityType,
): MonthProjection[] {
  const projections: MonthProjection[] = []
  let cumulativeBalance = 0

  for (let month = 0; month < numberOfMonths; month++) {
    const { totalIncome, totalExpenses, totalTransfersIn, totalTransfersOut } =
      calculateProjectionTotalsForMonth(items, transfers, month, entity)

    const netCashflow = totalIncome + totalTransfersIn - totalExpenses - totalTransfersOut
    cumulativeBalance += netCashflow

    projections.push({
      month: month + 1,
      monthLabel: getMonthLabel(month),
      totalIncome,
      totalExpenses,
      totalTransfersIn,
      totalTransfersOut,
      netCashflow,
      cumulativeBalance,
    })
  }

  return projections
}
