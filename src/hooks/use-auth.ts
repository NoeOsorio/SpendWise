import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth'
import { toast } from 'sonner'
import { SignUpData } from '@/types/auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const getCurrentUser = async () => {
    const { data: { user } } = await authService.getCurrentUser()
    if (!user) throw new Error('No hay usuario autenticado')
    return user
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await authService.signIn(email, password)
      console.log(result)
      if (result.user) {
        toast.success('¡Bienvenido de nuevo!', {
          duration: 2000,
        })
        // Esperar un momento para que el usuario vea el mensaje
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.refresh() // Refrescar el estado de autenticación
        router.push('/dashboard')
      } else {
        toast.error('Credenciales inválidas')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error al iniciar sesión. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    try {
      setIsLoading(true)
      const result = await authService.signUp(data)
      
      if (result.user) {
        toast.success('¡Registro exitoso! Redirigiendo...', {
          duration: 2000,
        })
        // Esperar un momento para que el usuario vea el mensaje
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.refresh() // Refrescar el estado de autenticación
        router.push('/dashboard')
      } else {
        // En caso de que Supabase requiera verificación de email
        toast.success('¡Registro exitoso! Por favor verifica tu email para continuar.', {
          duration: 4000,
        })
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/auth/login')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error al registrarse. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      await authService.signOut()
      router.refresh() // Refrescar el estado de autenticación
      router.push('/auth/login')
      toast.success('Sesión cerrada')
    } catch (error) {
      toast.error('Error al cerrar sesión')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    isLoading
  }
} 