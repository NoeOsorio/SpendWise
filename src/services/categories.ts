import { createClient } from '@/lib/supabase/client'
import { TransactionCategory } from '@/types/transaction'

class CategoriesService {
  private static instance: CategoriesService
  private categories: TransactionCategory[] | null = null

  private constructor() {}

  static getInstance(): CategoriesService {
    if (!CategoriesService.instance) {
      CategoriesService.instance = new CategoriesService()
    }
    return CategoriesService.instance
  }

  private async loadCategories(): Promise<TransactionCategory[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    this.categories = data
    return data
  }

  async getCategories(type?: 'income' | 'expense'): Promise<TransactionCategory[]> {
    if (!this.categories) {
      await this.loadCategories()
    }

    const categories = this.categories || []
    return type ? categories.filter(c => c.type === type) : categories
  }

  async getCategoryByName(name: string): Promise<string | null> {
    const categories = await this.getCategories()
    const category = categories.find(c => 
      c.name.toLowerCase() === name.toLowerCase()
    )
    console.log(category)
    return category?.id || null
  }

  async refreshCategories(): Promise<TransactionCategory[]> {
    this.categories = null
    return this.getCategories()
  }
}

export const categoriesService = CategoriesService.getInstance() 