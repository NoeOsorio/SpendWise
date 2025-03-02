import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect, useCallback } from 'react'
import { balanceService } from '@/services/balance'
import type { BalanceMetrics } from '@/types/balance'

export function useBalance() {
  const { getCurrentUser } = useAuth()
  const [balance, setBalance] = useState<BalanceMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBalance = useCallback(async () => {
    try {
      setIsLoading(true)
      const user = await getCurrentUser()
      const data = await balanceService.getBalanceOverview(user.id)
      setBalance(data)
    } catch (e) {
      setError('Error al cargar el balance')
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [getCurrentUser])

  // Solo cargar al montar el componente y cuando se llame manualmente
  useEffect(() => {
    loadBalance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Dependencia vacía para cargar solo al montar

  return { 
    balance, 
    isLoading, 
    error,
    reloadBalance: loadBalance // Función para recargar manualmente
  }
} 