import type {
  EntityType,
  MonthProjection,
  RecurrenceType,
  RecurringItem,
  Transfer,
  TransferFrequency,
} from '../models/models'

export function getMonthLabel(monthOffset: number): string {
  const date = new Date()
  date.setMonth(date.getMonth() + monthOffset)
  return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

export function getOccurrencesInMonth(frequency: RecurrenceType): number {
  switch (frequency) {
    case 'daily':
      return 30.44 // average days per month
    case 'weekly':
      return 4.35 // average weeks per month
    case 'monthly':
      return 1
    default:
      return 0
  }
}

function getTransferAmountForMonth(
  frequency: TransferFrequency,
  amount: number,
  monthIndex: number,
): number {
  if (frequency === 'once') {
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

    const monthlyAmount = item.amount * getOccurrencesInMonth(item.frequency)

    if (item.type === 'income') {
      totalIncome += monthlyAmount
    } else {
      totalExpenses += monthlyAmount
    }
  })

  transfers.forEach((transfer) => {
    const monthlyAmount = getTransferAmountForMonth(transfer.frequency, transfer.amount, monthIndex)

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
