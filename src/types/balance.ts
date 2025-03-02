export interface BalanceMetrics {
  currentBalance: number
  income: number
  expenses: number
  previousBalance: number
  previousIncome: number
  previousExpenses: number
  percentages: {
    balance: number
    income: number
    expenses: number
  }
  lastUpdate: string
} 