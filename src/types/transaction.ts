export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id?: string
  user_id: string
  amount: number
type: TransactionType
  category_id: string | null
  description: string
  date: string
  location?: string | null
  notes?: string | null
  attachments?: string[] | null
  tags?: string[] | null
  is_recurring: boolean
  recurring_id?: string | null
  created_at?: string
  updated_at?: string | null
  category?: TransactionCategory | null
}

export interface TransactionCategory {
  id: string
  name: string
  type: TransactionType
}

export interface TransactionAIResponse {
  type: TransactionType
  amount: number
  category: string
  description: string
  date?: string
  location?: string | null
  notes?: string | null
  tags?: string[] | null
}

export interface TransactionInputProps {
  onSuccess?: () => void
  onCancel: () => void
}

export interface TransactionWithCategory {
  id: string
  user_id: string
  amount: number
  type: TransactionType
  category_id: number
  description: string
  created_at: string
  category: {
    id: number
    name: string
    type: TransactionType
  }
}

export interface TransactionDisplay {
  id: string
  amount: number
  type: TransactionType
  description: string
  categoryName: string
  created_at: string
}