import { createClient } from '@/lib/supabase/client'
import { SignUpData } from '@/types/auth'

export const authService = {
  async signIn(email: string, password: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  async signUp({ email, password, full_name, username, currency, language = 'es', timezone }: SignUpData) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          username,
          currency,
          language,
          timezone
        }
      }
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const supabase = createClient()
    return await supabase.auth.getUser()
  }
} 