"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface TopExpense {
  category: string
  amount: number
  percentage: number
  color: string
  trend: number // porcentaje de cambio vs mes anterior
}

const topExpenses: TopExpense[] = [
  {
    category: "Vivienda",
    amount: 8000,
    percentage: 48,
    color: "hsl(var(--chart-2))",
    trend: -5
  },
  {
    category: "Alimentación",
    amount: 3500,
    percentage: 21,
    color: "hsl(var(--chart-1))",
    trend: 10
  },
  {
    category: "Transporte",
    amount: 2000,
    percentage: 12,
    color: "hsl(var(--chart-3))",
    trend: 0
  },
]

 function TopExpenses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 3 Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topExpenses.map((expense, index) => (
            <motion.div
              key={expense.category}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: expense.color }} 
                  />
                  <span className="font-medium">{expense.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(expense.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    {expense.trend > 0 && '+'}
                    {expense.trend}% vs mes anterior
                  </p>
                </div>
              </div>
              <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{ backgroundColor: expense.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${expense.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { TopExpenses } 