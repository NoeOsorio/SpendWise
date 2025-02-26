"use client"

import { LineChart } from "@/components/charts/line-chart"

const forecastData = [
  { month: "Ene", amount: 12500 },
  { month: "Feb", amount: 13200 },
  { month: "Mar", amount: 12800 },
  { month: "Abr", amount: 13500 },
  { month: "May", amount: 13800 },
  { month: "Jun", amount: 14200 }
]

export default function ForecastPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Pronóstico</h1>
      
      <LineChart 
        title="Proyección de Gastos"
        description="Basado en tus patrones de gasto de los últimos 6 meses"
        data={forecastData}
      />
    </div>
  )
} 