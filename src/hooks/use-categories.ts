import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Category } from '@/types'

export function useCategories() {
  const [categories, setCategories] = useState<Array<Category>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) {
        setError(error.message)
      } else {
        setCategories(data || [])
      }
      setIsLoading(false)
    }

    loadCategories()
  }, [])

  return { categories, isLoading, error }
} 