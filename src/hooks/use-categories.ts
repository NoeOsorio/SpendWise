"use client"

import { useEffect, useState } from "react"
import { TransactionCategory, TransactionType } from "@/types/transaction"
import { categoriesService } from "@/services/categories"

export function useCategories(type?: TransactionType) {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!type) return

    const loadCategories = async () => {
      try {
        const data = await categoriesService.getCategories(type)
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [type])

  return { categories, isLoading }
} 