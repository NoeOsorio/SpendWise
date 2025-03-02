import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/types'

interface BalanceMetrics {
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

export const balanceService = {
  async getBalanceOverview(userId: string): Promise<BalanceMetrics> {
    const supabase = createClient()
    
    // Obtener el primer y último día del mes actual
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59)

    // Obtener transacciones del mes actual
    const { data: currentData, error } = await supabase
      .from('transactions')
      .select('*, category:categories(*)')
      .eq('user_id', userId)
      .gte('created_at', firstDay.toISOString())
      .lte('created_at', lastDay.toISOString())

    if (error) throw error

    // Obtener transacciones del mes anterior
    const { data: previousData } = await supabase
      .from('transactions')
      .select('*, category:categories(*)')
      .eq('user_id', userId)
      .gte('created_at', new Date(currentYear, currentMonth - 1, 1).toISOString())
      .lte('created_at', new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString())

    const currentTotals = this.calculateTotals(currentData || [])
    const previousTotals = this.calculateTotals(previousData || [])

    const currentBalance = currentTotals.income - currentTotals.expenses
    const previousBalance = previousTotals.income - previousTotals.expenses

    return {
      currentBalance,
      income: currentTotals.income,
      expenses: currentTotals.expenses,
      previousBalance,
      previousIncome: previousTotals.income,
      previousExpenses: previousTotals.expenses,
      percentages: {
        balance: this.calculatePercentageChange(currentBalance, previousBalance),
        income: this.calculatePercentageChange(currentTotals.income, previousTotals.income),
        expenses: this.calculatePercentageChange(currentTotals.expenses, previousTotals.expenses)
      },
      lastUpdate: now.toISOString()
    }
  },

  calculateTotals(transactions: Transaction[]) {
    return transactions.reduce((acc, transaction) => ({
      income: acc.income + (transaction.type === 'income' ? transaction.amount : 0),
      expenses: acc.expenses + (transaction.type === 'expense' ? transaction.amount : 0)
    }), { income: 0, expenses: 0 })
  },

  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / Math.abs(previous)) * 100
  }
} 