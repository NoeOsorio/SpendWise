export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          email: string | null
          avatar_url: string | null
          currency: string
          language: string
          timezone: string | null
          subscription_tier: 'free' | 'pro' | 'premium' | 'admin'
          monthly_budget: number | null
          total_points: number
          streak_days: number
          is_admin: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          currency?: string
          language?: string
          timezone?: string | null
          subscription_tier?: 'free' | 'pro' | 'premium' | 'admin'
          monthly_budget?: number | null
          total_points?: number
          streak_days?: number
          is_admin?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          currency?: string
          language?: string
          timezone?: string | null
          subscription_tier?: 'free' | 'pro' | 'premium' | 'admin'
          monthly_budget?: number | null
          total_points?: number
          streak_days?: number
          is_admin?: boolean
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          icon: string | null
          color: string | null
          is_default: boolean
          parent_category_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          icon?: string | null
          color?: string | null
          is_default?: boolean
          parent_category_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          icon?: string | null
          color?: string | null
          is_default?: boolean
          parent_category_id?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'income' | 'expense' | 'transfer'
          category_id: string
          description: string | null
          date: string
          location: string | null
          notes: string | null
          attachments: string[] | null
          tags: string[] | null
          is_recurring: boolean
          recurring_id: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'income' | 'expense' | 'transfer'
          category_id: string
          description?: string | null
          date?: string
          location?: string | null
          notes?: string | null
          attachments?: string[] | null
          tags?: string[] | null
          is_recurring?: boolean
          recurring_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          type?: 'income' | 'expense' | 'transfer'
          category_id?: string
          description?: string | null
          date?: string
          location?: string | null
          notes?: string | null
          attachments?: string[] | null
          tags?: string[] | null
          is_recurring?: boolean
          recurring_id?: string | null
          updated_at?: string | null
        }
      }
      fixed_expenses: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          category_id: string
          frequency: 'one_time' | 'daily' | 'weekly' | 'monthly' | 'yearly'
          due_date: string | null
          reminder_days: number | null
          auto_pay: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          category_id: string
          frequency: 'one_time' | 'daily' | 'weekly' | 'monthly' | 'yearly'
          due_date?: string | null
          reminder_days?: number | null
          auto_pay?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string
          amount?: number
          category_id?: string
          frequency?: 'one_time' | 'daily' | 'weekly' | 'monthly' | 'yearly'
          due_date?: string | null
          reminder_days?: number | null
          auto_pay?: boolean
          updated_at?: string | null
        }
      }
      debts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'credit_card' | 'loan' | 'mortgage' | 'personal'
          total_amount: number
          remaining_amount: number
          interest_rate: number | null
          minimum_payment: number | null
          due_date: string | null
          start_date: string | null
          end_date: string | null
          creditor: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'credit_card' | 'loan' | 'mortgage' | 'personal'
          total_amount: number
          remaining_amount: number
          interest_rate?: number | null
          minimum_payment?: number | null
          due_date?: string | null
          start_date?: string | null
          end_date?: string | null
          creditor?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string
          type?: 'credit_card' | 'loan' | 'mortgage' | 'personal'
          total_amount?: number
          remaining_amount?: number
          interest_rate?: number | null
          minimum_payment?: number | null
          due_date?: string | null
          start_date?: string | null
          end_date?: string | null
          creditor?: string | null
          notes?: string | null
          updated_at?: string | null
        }
      }
      financial_goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          start_date: string
          target_date: string | null
          category_id: string
          status: 'active' | 'completed' | 'failed' | 'paused'
          priority: number | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount: number
          current_amount?: number
          start_date: string
          target_date?: string | null
          category_id: string
          status?: 'active' | 'completed' | 'failed' | 'paused'
          priority?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string
          target_amount?: number
          current_amount?: number
          target_date?: string | null
          category_id?: string
          status?: 'active' | 'completed' | 'failed' | 'paused'
          priority?: number | null
          notes?: string | null
          updated_at?: string | null
        }
      }
      ai_insights: {
        Row: {
          id: string
          user_id: string
          type: string
          content: Json
          date: string
          is_read: boolean
          relevance_score: number | null
          applied: boolean
          feedback: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          content: Json
          date?: string
          is_read?: boolean
          relevance_score?: number | null
          applied?: boolean
          feedback?: string | null
        }
        Update: {
          type?: string
          content?: Json
          is_read?: boolean
          relevance_score?: number | null
          applied?: boolean
          feedback?: string | null
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          points: number
          conditions: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          points?: number
          conditions?: Json | null
          created_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          icon?: string | null
          points?: number
          conditions?: Json | null
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          earned_at?: string
        }
      }
      savings: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number | null
          current_amount: number
          interest_rate: number | null
          type: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount?: number | null
          current_amount?: number
          interest_rate?: number | null
          type?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          name?: string
          target_amount?: number | null
          current_amount?: number
          interest_rate?: number | null
          type?: string | null
          notes?: string | null
          updated_at?: string | null
        }
      }
      financial_reports: {
        Row: {
          id: string
          user_id: string
          type: string
          period_start: string | null
          period_end: string | null
          data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          period_start?: string | null
          period_end?: string | null
          data?: Json | null
          created_at?: string
        }
        Update: {
          type?: string
          period_start?: string | null
          period_end?: string | null
          data?: Json | null
        }
      }
      user_settings: {
        Row: {
          user_id: string
          notification_preferences: Json | null
          privacy_settings: Json | null
          display_preferences: Json | null
          ai_preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          user_id: string
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          display_preferences?: Json | null
          ai_preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          display_preferences?: Json | null
          ai_preferences?: Json | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      has_achievement: {
        Args: {
          p_user_id: string
          p_achievement_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      transaction_type: 'income' | 'expense' | 'transfer'
      frequency: 'one_time' | 'daily' | 'weekly' | 'monthly' | 'yearly'
      goal_status: 'active' | 'completed' | 'failed' | 'paused'
      debt_type: 'credit_card' | 'loan' | 'mortgage' | 'personal'
      subscription_tier: 'free' | 'pro' | 'premium' | 'admin'
    }
  }
} 