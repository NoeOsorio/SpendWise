import { useState, useEffect } from 'react'
import { transactionsService, TransactionDisplay } from '@/services/transactions'
import { useAuth } from '@/hooks/use-auth'

interface UseTransactionsReturn {
  transactions: TransactionDisplay[]
  isLoading: boolean
  error: string | null
  loadTransactions: () => Promise<void>
  createTransaction: (data: {
    type: 'income' | 'expense'
    amount: number
    description: string
    category_id: string
  }) => Promise<void>
}

export function useTransactions(): UseTransactionsReturn {
  const { getCurrentUser } = useAuth()
  const [transactions, setTransactions] = useState<TransactionDisplay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTransactions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await transactionsService.getTransactions()
      setTransactions(data)
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error al cargar las transacciones'
      setError(errorMessage)
      console.error('Error al cargar transacciones:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const createTransaction = async (data: {
    type: 'income' | 'expense'
    amount: number
    description: string
    category_id: string
  }) => {
    try {
      const user = await getCurrentUser()
      await transactionsService.createTransaction({
        ...data,
        user_id: user.id
      })
      await loadTransactions()
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error al crear la transacción'
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    loadTransactions()
    return transactionsService.subscribeToChanges(loadTransactions)
  }, [])

  return {
    transactions,
    isLoading,
    error,
    loadTransactions,
    createTransaction
  }
} 