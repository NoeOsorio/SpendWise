import { Database } from "./schema"

export type Transaction = Database['public']['Tables']['transactions']['Row']
export interface Category {
  id: string
  user_id: string
  name: string
  type: 'income' | 'expense'
  icon: string | null
  color: string | null
  is_default: boolean
  parent_category_id: string | null
  created_at: string
}