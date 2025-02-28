export interface SignUpData {
    email: string
    password: string
    full_name: string | null
    username: string
    currency: string
    language: string
    timezone?: string | null
    monthly_budget?: number | null
  }