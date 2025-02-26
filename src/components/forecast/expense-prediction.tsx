"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { LineChart } from "@/components/charts/line-chart"
import { 
  TrendingUp, 
  TrendingDown, 
  SparklesIcon, 
  AlertTriangle,
  RefreshCwIcon
} from "lucide-react"
import { useState } from "react"

interface PredictionData {
  currentSpent: number
  predictedTotal: number
  lastMonthTotal: number
  trend: number
  dailyAverage: number
  daysLeft: number
  monthlyData: Array<{ month: string; amount: number }>
}

export function ExpensePrediction() {
  const [isLoading, setIsLoading] = useState(false)
  const [predictionData] = useState<PredictionData>({
    currentSpent: 12500,
    predictedTotal: 15800,
    lastMonthTotal: 14500,
    trend: 8.97,
    dailyAverage: 520,
    daysLeft: 12,
    monthlyData: [
      { month: "Ene", amount: 13200 },
      { month: "Feb", amount: 14100 },
      { month: "Mar", amount: 14500 },
      { month: "Abr", amount: 15800 }, // Predicción
    ]
  })

  const isOverSpending = predictionData.predictedTotal > predictionData.lastMonthTotal
  const difference = predictionData.predictedTotal - predictionData.lastMonthTotal
  const percentChange = (difference / predictionData.lastMonthTotal) * 100

  const updatePrediction = async () => {
    setIsLoading(true)
    try {
      // Aquí iría la llamada a la API de IA
      await new Promise(resolve => setTimeout(resolve, 1500))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Predicción de Gastos</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={updatePrediction}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
              Actualizando...
            </>
          ) : (
            <>
              <SparklesIcon className="mr-2 h-4 w-4" />
              Actualizar predicción
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Predicción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Gasto actual</span>
                <span className="font-medium">{formatCurrency(predictionData.currentSpent)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Predicción fin de mes</span>
                <span className="font-medium">{formatCurrency(predictionData.predictedTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Promedio diario</span>
                <span className="font-medium">{formatCurrency(predictionData.dailyAverage)}/día</span>
              </div>
            </div>

            <Alert variant={isOverSpending ? "destructive" : "default"}>
              <AlertDescription className="flex items-center gap-2">
                {isOverSpending ? (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    <span>
                      Podrías gastar {formatCurrency(Math.abs(difference))} más que el mes pasado
                      {predictionData.daysLeft > 0 && `. Te quedan ${predictionData.daysLeft} días para ajustar tus gastos.`}
                    </span>
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4" />
                    <span>
                      ¡Vas bien! Podrías ahorrar {formatCurrency(Math.abs(difference))} respecto al mes pasado
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>

            <div className="flex items-center gap-2 text-sm">
              <div className={`flex items-center gap-1 ${
                isOverSpending ? "text-destructive" : "text-emerald-500"
              }`}>
                {isOverSpending ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(percentChange).toFixed(1)}%</span>
              </div>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LineChart
            title="Tendencia de Gastos"
            description="Incluye predicción para este mes"
            data={predictionData.monthlyData}
          />
        </motion.div>
      </div>
    </div>
  )
} 