"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"
import { 
  TrendingUp, 
  TrendingDown, 
  Medal, 
  Trophy, 
  Award,
  SparklesIcon,
  BrainIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"

interface TopExpense {
  category: string
  amount: number
  percentage: number
  trend: number
  rank: 1 | 2 | 3
}

const rankIcons = {
  1: { icon: Trophy, className: "text-yellow-500" },
  2: { icon: Medal, className: "text-gray-400" },
  3: { icon: Award, className: "text-amber-600" }
}

const topExpenses: TopExpense[] = [
  {
    category: "Vivienda",
    amount: 8000,
    percentage: 48,
    trend: -5,
    rank: 1
  },
  {
    category: "Alimentación",
    amount: 3500,
    percentage: 21,
    trend: 10,
    rank: 2
  },
  {
    category: "Transporte",
    amount: 2000,
    percentage: 12,
    trend: 0,
    rank: 3
  },
]

export function TopExpenses() {
  const [showInsight, setShowInsight] = useState(false)

  const totalAmount = topExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const highestTrend = Math.max(...topExpenses.map(exp => exp.trend))
  const lowestTrend = Math.min(...topExpenses.map(exp => exp.trend))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Top 3 Categorías</CardTitle>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(totalAmount)} en gastos principales
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInsight(!showInsight)}
        >
          <BrainIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {showInsight && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert>
                <AlertDescription className="text-sm">
                  <SparklesIcon className="h-4 w-4 inline mr-2" />
                  {highestTrend > 0 
                    ? `La categoría ${topExpenses.find(e => e.trend === highestTrend)?.category} muestra el mayor incremento.`
                    : `La categoría ${topExpenses.find(e => e.trend === lowestTrend)?.category} presenta el mejor ahorro.`
                  }
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {topExpenses.map((expense, index) => {
            const RankIcon = rankIcons[expense.rank].icon
            return (
              <motion.div
                key={expense.category}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${rankIcons[expense.rank].className}`}>
                      <RankIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{expense.category}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                        <span className="text-muted-foreground">{expense.percentage}% del total</span>
                      </div>
                    </div>
                  </div>
                  {expense.trend !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${
                      expense.trend > 0 ? "text-destructive" : "text-emerald-500"
                    }`}>
                      {expense.trend > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4" />
                          <span>+{expense.trend}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4" />
                          <span>{expense.trend}%</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${rankIcons[expense.rank].className}/20`}
                    initial={{ width: 0 }}
                    animate={{ width: `${expense.percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 