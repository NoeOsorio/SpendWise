import { createClient } from '@/lib/supabase/client'
import { TransactionDisplay, TransactionWithCategory, TransactionAIResponse } from '@/types/transaction'
import { categoriesService } from '@/services/categories'

export const transactionsService = {
  async getTransactions(): Promise<TransactionDisplay[]> {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No hay usuario autenticado')

    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        category:categories(id, name, type)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map((tx: TransactionWithCategory) => ({
      id: tx.id,
      amount: tx.amount,
      type: tx.type,
      description: tx.description || '',
      categoryName: tx.category?.name || 'Sin categoría',
      created_at: tx.created_at
    }))
  },

  subscribeToChanges(callback: () => void) {
    const supabase = createClient()
    
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${supabase.auth.getUser().then(({ data }) => data.user?.id)}`
        },
        callback
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },

  async createTransaction(data: {
    type: 'income' | 'expense'
    amount: number
    description: string
    category_id: string
    user_id: string,
    date?: string
    location?: string
    notes?: string
    attachments?: string[]
    tags?: string[]
    is_recurring: boolean
    recurring_id?: string
    created_at?: string
  }) {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('transactions')
      .insert({
        ...data,
        created_at: new Date().toISOString(),
      })

    if (error) throw error
  },

  async parseTransactionText(text: string): Promise<TransactionAIResponse> {
    const response = await fetch('/api/ai/parse-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    })

    if (!response.ok) {
      throw new Error('Error al procesar el texto')
    }

    return response.json()
  },

  async getCategoryByName(name: string): Promise<string | null> {
    return categoriesService.getCategoryByName(name)
  }
} 