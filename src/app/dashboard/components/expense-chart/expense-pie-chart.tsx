"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SparklesIcon, RefreshCwIcon, BrainIcon, RocketIcon, LightbulbIcon, HeartCrackIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CategoryExpense {
  id: string
  label: string
  amount: number
  percentage: number
  previousAmount: number
}

export function ExpensePieChart() {
  const [timeFilter, setTimeFilter] = useState("1M")
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false)
  const [insight, setInsight] = useState<string | null>(null)

  const expenses: CategoryExpense[] = [
    {
      id: "alimentacion",
      label: "Alimentación",
      amount: 3500,
      previousAmount: 3000,
      percentage: 25,
    },
    {
      id: "vivienda",
      label: "Vivienda",
      amount: 8000,
      previousAmount: 8500,
      percentage: 45,
    },
    {
      id: "transporte",
      label: "Transporte",
      amount: 2000,
      previousAmount: 2100,
      percentage: 15,
    }
  ]

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const placeholderInsights = [
    {
      text: "Basado en tus patrones de gasto, tu categoría de alimentación muestra un incremento constante. Considera establecer límites mensuales y planificar comidas para optimizar este gasto.",
      icon: <BrainIcon className="h-4 w-4 text-primary" />
    },
    {
      text: "Excelente trabajo reduciendo los gastos de transporte. Has logrado una optimización del 5% respecto al mes anterior, manteniendo esta tendencia podrías ahorrar significativamente a largo plazo.",
      icon: <RocketIcon className="h-4 w-4 text-primary" />
    },
    {
      text: "Tu distribución de gastos en vivienda se mantiene estable y dentro del rango recomendado del 30-40% de tus ingresos. ¡Sigue así!",
      icon: <LightbulbIcon className="h-4 w-4 text-primary" />
    }
  ]

  const generateInsight = async () => {
    setIsGeneratingInsight(true)
    try {
      // Aquí irá la llamada a OpenAI
      await new Promise(resolve => setTimeout(resolve, 1500))
      // Por ahora usamos un placeholder aleatorio
      setInsight(placeholderInsights[Math.floor(Math.random() * placeholderInsights.length)].text)
    } finally {
      setIsGeneratingInsight(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Resumen de Gastos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {formatCurrency(totalAmount)}
          </p>
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1M">Este mes</SelectItem>
            <SelectItem value="3M">Últimos 3 meses</SelectItem>
            <SelectItem value="6M">Últimos 6 meses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {expenses.map((expense, index) => {
            const trend = ((expense.amount - expense.previousAmount) / expense.previousAmount) * 100
            const isIncreased = trend > 0
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-medium">{expense.label}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                      <span className="text-muted-foreground">de {formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    isIncreased ? "text-destructive" : "text-emerald-500"
                  }`}>
                    {isIncreased ? (
                      <>
                        <TrendingUp className="h-4 w-4" />
                        <span>Aumentó {Math.abs(trend).toFixed(1)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4" />
                        <span>Bajó {Math.abs(trend).toFixed(1)}%</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={expense.percentage} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {expense.percentage}% del total
                  </p>
                </div>
              </motion.div>
            )
          })}
          
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainIcon className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Análisis Inteligente</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={generateInsight}
                disabled={isGeneratingInsight}
              >
                {isGeneratingInsight ? (
                  <>
                    <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="mr-2 h-4 w-4" />
                    Generar insights
                  </>
                )}
              </Button>
            </div>

            {insight ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="default">
                  <AlertDescription className="flex items-center gap-2">
                    {placeholderInsights[0].icon}
                    {insight}
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border bg-card p-6 text-center relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="font-medium mb-2">¿Necesitas ayuda para entender tus gastos?</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Deja que nuestra IA analice tus patrones de gasto y te brinde insights personalizados.
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <HeartCrackIcon className="h-3 w-3" />
                    <span>Promete ser más fiel que tu ex a tu presupuesto</span>
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 