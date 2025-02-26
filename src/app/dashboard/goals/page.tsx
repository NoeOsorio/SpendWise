import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Objetivos de Ahorro</h1>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Fondo de Emergencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">$15,000 / $50,000</span>
              </div>
              <Progress value={30} className="h-2" />
              <p className="text-sm text-muted-foreground">
                ¡Vas bien! A este ritmo alcanzarás tu meta en 5 meses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 