import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react"

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Alertas Inteligentes</h1>
      <div className="grid gap-4">
        <Card className="border-yellow-500/50">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <CardTitle>Gasto Inusual Detectado</CardTitle>
          </CardHeader>
          <CardContent>
            Tus gastos en Alimentación aumentaron un 20% este mes.
          </CardContent>
        </Card>

        <Card className="border-emerald-500/50">
          <CardHeader className="flex flex-row items-center gap-2">
            <TrendingDown className="h-5 w-5 text-emerald-500" />
            <CardTitle>Buen Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            Has reducido tus gastos en Entretenimiento un 15%.
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 