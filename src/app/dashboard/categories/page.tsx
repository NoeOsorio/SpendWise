"use client"

import dynamic from 'next/dynamic'
import { CategoryInsights } from "../components/expense-chart/category-insights"

const ExpensePieChart = dynamic(
  () => import("../components/expense-chart/expense-pie-chart").then(mod => mod.ExpensePieChart),
  { ssr: false }
)

const TopExpenses = dynamic(
  () => import("../components/expense-chart/top-expenses").then(mod => mod.TopExpenses),
  { ssr: false }
)

const CategoryTrends = dynamic(
  () => import("../components/expense-chart/category-trends").then(mod => mod.CategoryTrends),
  { ssr: false }
)

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Análisis por Categorías</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CategoryInsights.Card
          title="Mayor Incremento"
          category="Alimentación"
          percentage={35}
          trend="up"
          description="vs mes anterior"
        />
        <CategoryInsights.Card
          title="Mayor Ahorro"
          category="Transporte"
          percentage={15}
          trend="down"
          description="vs mes anterior"
        />
        <CategoryInsights.Card
          title="Categoría Principal"
          category="Vivienda"
          percentage={45}
          description="del gasto total"
        />
        <CategoryInsights.Card
          title="Presupuesto Excedido"
          category="Entretenimiento"
          percentage={120}
          trend="alert"
          description="del límite mensual"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <ExpensePieChart />
        <div className="space-y-8">
          <TopExpenses />
          <CategoryTrends />
        </div>
      </div>
    </div>
  )
} 