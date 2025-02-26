"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { 
  TrendingUp, SparklesIcon, AlertTriangle,
  RefreshCwIcon, CalendarIcon, PiggyBankIcon, BarChart3Icon,
   Target, Wallet, History
} from "lucide-react"
import { useState } from "react"
  
interface PredictionData {
  currentSpent: number
  predictedTotal: number
  lastMonthTotal: number
  dailyAverage: number
  daysLeft: number
  monthlyBudget: number
}

export default function ForecastPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [predictionData] = useState<PredictionData>({
    currentSpent: 12500,
    predictedTotal: 15800,
    lastMonthTotal: 14500,
    dailyAverage: 520,
    daysLeft: 12,
    monthlyBudget: 15000
  })

  const isOverSpending = predictionData.predictedTotal > predictionData.lastMonthTotal
  const difference = predictionData.predictedTotal - predictionData.lastMonthTotal
  //const percentChange = (difference / predictionData.lastMonthTotal) * 100

  // Calculamos el porcentaje de gasto vs presupuesto
  const spendingPercentage = (predictionData.predictedTotal / predictionData.monthlyBudget) * 100
  const isOverBudget = spendingPercentage > 100

  const updatePrediction = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Pronóstico Mensual</h1>
          <p className="text-muted-foreground">
            Análisis predictivo basado en tus patrones de gasto
          </p>
        </div>
        <Button
          variant="outline"
          onClick={updatePrediction}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
              Actualizando predicción...
            </>
          ) : (
            <>
              <SparklesIcon className="mr-2 h-4 w-4" />
              Actualizar predicción
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Sección 1: Resumen Rápido */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Gasto Actual</p>
                  <p className="text-2xl font-bold">{formatCurrency(predictionData.currentSpent)}</p>
                  <p className="text-xs text-muted-foreground">Hasta hoy</p>
                </div>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Predicción Final</p>
                  <p className="text-2xl font-bold">{formatCurrency(predictionData.predictedTotal)}</p>
                  <p className="text-xs text-muted-foreground">Proyección a fin de mes</p>
                </div>
                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Presupuesto Mensual</p>
                  <p className="text-2xl font-bold">{formatCurrency(predictionData.monthlyBudget)}</p>
                  <p className="text-xs text-muted-foreground">Meta establecida</p>
                </div>
                <PiggyBankIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección 2: Análisis de Tendencias */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle>Análisis de Tendencias</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Progreso del Presupuesto */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Progreso del Presupuesto
                </h3>
                <div className={`px-2 py-1 rounded-md text-xs ${
                  isOverBudget 
                    ? "bg-destructive/10 text-destructive" 
                    : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {isOverBudget ? "Excedido" : "Dentro del límite"}
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="grid gap-1">
                      <span className="text-muted-foreground">Gasto Actual</span>
                      <span className="font-semibold">{formatCurrency(predictionData.currentSpent)}</span>
                    </div>
                    <div className="grid gap-1 text-right">
                      <span className="text-muted-foreground">Predicción</span>
                      <span className="font-semibold">{formatCurrency(predictionData.predictedTotal)}</span>
                    </div>
                    <div className="grid gap-1 text-right">
                      <span className="text-muted-foreground">Presupuesto</span>
                      <span className="font-semibold">{formatCurrency(predictionData.monthlyBudget)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden relative">
                      {/* Barra de gasto actual */}
                      <div 
                        className="h-full bg-primary absolute left-0 top-0 rounded-l-full"
                        style={{ width: `${(predictionData.currentSpent / predictionData.monthlyBudget) * 100}%` }}
                      />
                      {/* Barra de predicción */}
                      <div 
                        className={`h-full absolute top-0 opacity-40 ${isOverBudget ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ 
                          left: `${(predictionData.currentSpent / predictionData.monthlyBudget) * 100}%`,
                          width: `${((predictionData.predictedTotal - predictionData.currentSpent) / predictionData.monthlyBudget) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                      {isOverBudget && <span>{spendingPercentage.toFixed(1)}%</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Análisis Diario */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Análisis Diario
                </h3>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Promedio actual</span>
                      <span className="font-semibold">{formatCurrency(predictionData.dailyAverage)}/día</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Límite recomendado</span>
                      <span className="font-semibold">
                        {formatCurrency((predictionData.monthlyBudget - predictionData.currentSpent) / predictionData.daysLeft)}/día
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${predictionData.dailyAverage > (predictionData.monthlyBudget / 30) ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ 
                          width: `${(predictionData.dailyAverage / (predictionData.monthlyBudget / 30)) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Días restantes</span>
                      <span className="text-2xl font-bold">{predictionData.daysLeft}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isOverBudget 
                        ? "Días para ajustar el presupuesto"
                        : "Días para mantener el ritmo actual"
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Proyección de Ahorro
                </h3>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Ahorro proyectado</span>
                      <span className={`font-semibold ${isOverBudget ? 'text-destructive' : 'text-emerald-500'}`}>
                        {formatCurrency(Math.abs(predictionData.monthlyBudget - predictionData.predictedTotal))}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isOverBudget 
                        ? "Exceso sobre el presupuesto"
                        : "Potencial ahorro al final del mes"
                      }
                    </p>
                  </div>

                  <Alert>
                    <AlertDescription>
                      {isOverBudget ? (
                        <>
                          Necesitas reducir tus gastos en{' '}
                          <span className="font-medium">
                            {formatCurrency((predictionData.predictedTotal - predictionData.monthlyBudget) / predictionData.daysLeft)}
                          </span>
                          {' '}por día para ajustarte al presupuesto.
                        </>
                      ) : (
                        <>
                          Mantén un gasto máximo de{' '}
                          <span className="font-medium">
                            {formatCurrency((predictionData.monthlyBudget - predictionData.currentSpent) / predictionData.daysLeft)}
                          </span>
                          {' '}por día para cumplir tu meta.
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 3: Recomendaciones */}
        <Card className="dark:bg-muted/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              <CardTitle>Recomendaciones Personalizadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Estado General */}
              <div className={`flex items-center gap-4 p-4 rounded-lg border ${
                isOverSpending 
                  ? "bg-destructive/10 border-destructive/20 dark:bg-destructive/20" 
                  : "bg-emerald-500/10 border-emerald-500/20 dark:bg-emerald-500/20"
              }`}>
                <div className={`p-3 rounded-full ${
                  isOverSpending 
                    ? "bg-destructive/20 text-destructive dark:bg-destructive/30" 
                    : "bg-emerald-500/20 text-emerald-500 dark:bg-emerald-500/30"
                }`}>
                  {isOverSpending ? (
                    <AlertTriangle className="h-6 w-6" />
                  ) : (
                    <SparklesIcon className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {isOverSpending ? "Alerta de Sobregasto" : "¡Excelente Gestión!"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isOverSpending 
                      ? `Proyección de sobregasto: ${formatCurrency(Math.abs(difference))} más que el mes anterior`
                      : `Potencial ahorro: ${formatCurrency(Math.abs(difference))} respecto al mes anterior`
                    }
                  </p>
                </div>
              </div>

              {/* Acciones Recomendadas */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {isOverSpending ? "Acciones Correctivas" : "Oportunidades de Mejora"}
                </h3>
                <div className="grid gap-3">
                  {(isOverSpending ? [
                    {
                      title: "Revisa Gastos No Esenciales",
                      description: "Identifica y reduce gastos que no sean prioritarios",
                      icon: <Wallet className="h-4 w-4" />
                    },
                    {
                      title: "Establece Límites Diarios",
                      description: `Limita tus gastos a ${formatCurrency((predictionData.monthlyBudget - predictionData.currentSpent) / predictionData.daysLeft)} por día`,
                      icon: <CalendarIcon className="h-4 w-4" />
                    },
                    {
                      title: "Prioriza Gastos",
                      description: "Enfócate en las categorías más importantes",
                      icon: <BarChart3Icon className="h-4 w-4" />
                    },
                    {
                      title: "Aplaza Compras Grandes",
                      description: "Considera posponer compras no urgentes",
                      icon: <History className="h-4 w-4" />
                    }
                  ] : [
                    {
                      title: "Aumenta tu Fondo de Emergencia",
                      description: "Aprovecha para fortalecer tus reservas",
                      icon: <PiggyBankIcon className="h-4 w-4" />
                    },
                    {
                      title: "Explora Inversiones",
                      description: "Considera opciones para hacer crecer tu dinero",
                      icon: <TrendingUp className="h-4 w-4" />
                    },
                    {
                      title: "Mantén el Seguimiento",
                      description: "Continúa registrando tus gastos detalladamente",
                      icon: <BarChart3Icon className="h-4 w-4" />
                    },
                    {
                      title: "Establece Nuevas Metas",
                      description: "Define objetivos más ambiciosos de ahorro",
                      icon: <Target className="h-4 w-4" />
                    }
                  ]).map((action, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-muted">
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiempo Restante */}
              {isOverSpending && predictionData.daysLeft > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    Tienes {predictionData.daysLeft} días para implementar estos cambios
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 