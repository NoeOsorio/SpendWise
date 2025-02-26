"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ExpenseCategory {
  category: string
  amount: number
  percentage: number
  color: string
}

const topExpenses: ExpenseCategory[] = [
  {
    category: "Rent",
    amount: 800,
    percentage: 57,
    color: "hsl(var(--chart-2))"
  },
  {
    category: "Food",
    amount: 150,
    percentage: 11,
    color: "hsl(var(--chart-1))"
  },
  {
    category: "Utilities",
    amount: 200,
    percentage: 14,
    color: "hsl(var(--chart-4))"
  },
]

export function TopExpenses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topExpenses.map((expense, index) => (
            <motion.div
              key={expense.category}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="h-2 flex-1 rounded-full bg-muted"
                style={{ position: 'relative' }}
              >
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{ backgroundColor: expense.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${expense.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
              <div className="w-20 text-right">
                <p className="font-medium">{expense.category}</p>
                <p className="text-sm text-muted-foreground">${expense.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 