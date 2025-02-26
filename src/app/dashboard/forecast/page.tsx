import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/charts/line-chart"

export default function ForecastPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Proyecciones</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Predicción de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-8">
              Basado en tus patrones de gasto, así es como se ve tu mes:
            </p>
            <div className="h-[400px]">
              <LineChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 