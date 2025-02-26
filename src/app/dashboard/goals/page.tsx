"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { 
  Target, Trophy, Sparkles, Plus, Edit2, Trash2,
  TrendingUp, Bell, CheckCircle2, Clock, Star
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { GoalForm } from "@/components/goals/goal-form"

interface SavingGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  category: string
  status: "active" | "completed" | "at_risk"
  createdAt: Date
}

export default function GoalsPage() {
  const [goals] = useState<SavingGoal[]>([
    {
      id: "1",
      name: "Fondo de Emergencia",
      targetAmount: 50000,
      currentAmount: 35000,
      deadline: new Date(2024, 11, 31),
      category: "Emergencias",
      status: "active",
      createdAt: new Date(2024, 0, 1)
    },
    {
      id: "2",
      name: "Viaje a Europa",
      targetAmount: 80000,
      currentAmount: 20000,
      deadline: new Date(2024, 8, 30),
      category: "Viajes",
      status: "at_risk",
      createdAt: new Date(2024, 1, 15)
    },
    {
      id: "3",
      name: "MacBook Pro",
      targetAmount: 35000,
      currentAmount: 35000,
      deadline: new Date(2024, 5, 30),
      category: "Tecnología",
      status: "completed",
      createdAt: new Date(2024, 2, 1)
    }
  ])
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<SavingGoal | undefined>()

  const handleEdit = (goal: SavingGoal) => {
    setEditingGoal(goal)
    setShowGoalForm(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Objetivos de Ahorro</h1>
          <p className="text-muted-foreground">
            Define y alcanza tus metas financieras
          </p>
        </div>
        <Button onClick={() => setShowGoalForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Objetivo
        </Button>
      </div>

      {/* Resumen de Progreso */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Objetivos Activos</p>
                <p className="text-2xl font-bold">
                  {goals.filter(g => g.status === "active").length}
                </p>
              </div>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Ahorrado</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(goals.reduce((sum, g) => sum + g.currentAmount, 0))}
                </p>
              </div>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Meta Total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(goals.reduce((sum, g) => sum + g.targetAmount, 0))}
                </p>
              </div>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completados</p>
                <p className="text-2xl font-bold">
                  {goals.filter(g => g.status === "completed").length}
                </p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Objetivos Mejorada */}
      <div className="grid gap-6">
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          const isAtRisk = goal.status === "at_risk"
          
          return (
            <Card key={goal.id} className={`${goal.status === "completed" ? "bg-muted" : ""}`}>
              <CardContent className="pt-6">
                {/* Estado General del Objetivo */}
                <div className={`flex items-center gap-4 p-4 rounded-lg border mb-6 ${
                  goal.status === "completed"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : isAtRisk
                    ? "bg-destructive/10 border-destructive/20"
                    : "bg-primary/10 border-primary/20"
                }`}>
                  <div className={`p-3 rounded-full ${
                    goal.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-500"
                      : isAtRisk
                      ? "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {goal.status === "completed" ? (
                      <Trophy className="h-6 w-6" />
                    ) : isAtRisk ? (
                      <Bell className="h-6 w-6" />
                    ) : (
                      <Target className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        {goal.name}
                        <Badge variant={
                          goal.status === "completed" ? "default" :
                          isAtRisk ? "destructive" : "outline"
                        }>
                          {goal.status === "completed" ? "Completado" :
                           isAtRisk ? "En riesgo" : "En progreso"}
                        </Badge>
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(goal)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {goal.category} • Creado el {goal.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Progreso y Métricas */}
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="grid gap-1">
                        <span className="text-2xl font-bold">
                          {formatCurrency(goal.currentAmount)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          de {formatCurrency(goal.targetAmount)}
                        </span>
                      </div>
                      <div className="grid gap-1 text-right">
                        <span className="text-2xl font-bold">
                          {progress.toFixed(1)}%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          completado
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            goal.status === "completed"
                              ? "bg-emerald-500"
                              : isAtRisk
                              ? "bg-destructive"
                              : "bg-primary"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {goal.status !== "completed" && (
                    <>
                      {/* Métricas Clave */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Tiempo Restante</span>
                          </div>
                          <p className="text-2xl font-bold">{daysLeft}</p>
                          <p className="text-sm text-muted-foreground">días</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Ahorro Necesario</span>
                          </div>
                          <p className="text-2xl font-bold">
                            {formatCurrency((goal.targetAmount - goal.currentAmount) / daysLeft)}
                          </p>
                          <p className="text-sm text-muted-foreground">por día</p>
                        </div>
                      </div>

                      {/* Sugerencias y Tips */}
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Plan de Acción Sugerido
                        </h4>
                        <div className="grid gap-3">
                          {[
                            {
                              title: "Ahorro Semanal Recomendado",
                              description: `Establece una transferencia automática de ${formatCurrency((goal.targetAmount - goal.currentAmount) / (daysLeft / 7))} cada semana`,
                              icon: <Clock className="h-4 w-4" />
                            },
                            {
                              title: "Reduce Gastos No Esenciales",
                              description: "Identifica y minimiza gastos en entretenimiento y compras discrecionales",
                              icon: <TrendingUp className="h-4 w-4" />
                            },
                            {
                              title: "Aumenta Tus Ingresos",
                              description: "Considera oportunidades de ingreso adicional para acelerar tu meta",
                              icon: <Trophy className="h-4 w-4" />
                            }
                          ].map((action, index) => (
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
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal de Formulario */}
      <GoalForm
        open={showGoalForm}
        onOpenChange={(open) => {
          setShowGoalForm(open)
          if (!open) setEditingGoal(undefined)
        }}
        initialData={editingGoal}
      />
    </div>
  )
} 