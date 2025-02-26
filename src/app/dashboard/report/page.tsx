"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
  SparklesIcon, 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  Clock, 
  ArrowRight, 
  Lock
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface FinancialReport {
  id: string
  date: Date
  score: number
  status: "generating" | "completed"
  summary: {
    monthlyIncome: number
    monthlyExpenses: number
    savingsRate: number
    debtToIncome: number
    emergencyFund: number
  }
  improvements: Array<{
    title: string
    description: string
    impact: "high" | "medium" | "low"
    category: string
  }>
  projections: Array<{
    month: string
    expected: number
    optimized: number
  }>
}

const MotionCard = motion(Card)

export default function ReportPage() {
  const [tokens] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reports] = useState<FinancialReport[]>([
    {
      id: "1",
      date: new Date(),
      score: 75,
      status: "completed",
      summary: {
        monthlyIncome: 45000,
        monthlyExpenses: 35000,
        savingsRate: 22,
        debtToIncome: 15,
        emergencyFund: 3.5
      },
      improvements: [
        {
          title: "Optimiza Gastos Discrecionales",
          description: "Reduce gastos en entretenimiento y comidas fuera en un 20% para aumentar tu ahorro mensual",
          impact: "high",
          category: "gastos"
        },
        {
          title: "Aumenta Fondo de Emergencia",
          description: "Incrementa tu fondo de emergencia a 6 meses de gastos para mayor seguridad financiera",
          impact: "medium",
          category: "ahorro"
        },
        {
          title: "Diversifica Ingresos",
          description: "Considera una fuente adicional de ingresos para mejorar tu estabilidad financiera",
          impact: "high",
          category: "ingresos"
        }
      ],
      projections: [
        { month: "Actual", expected: 35000, optimized: 35000 },
        { month: "Mes 1", expected: 36000, optimized: 32000 },
        { month: "Mes 2", expected: 36500, optimized: 30000 },
        { month: "Mes 3", expected: 37000, optimized: 29000 }
      ]
    }
  ])

  const generateReport = async () => {
    setIsGenerating(true)
    try {
      // Aquí iría la llamada a la API de IA
      await new Promise(resolve => setTimeout(resolve, 3000))
    } finally {
      setIsGenerating(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const scoreCircle = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        variants={item}
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Reporte Financiero IA</h1>
          <p className="text-muted-foreground">
            Análisis profundo y personalizado de tus finanzas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{tokens}</span> tokens disponibles
          </div>
          <Button 
            onClick={generateReport} 
            disabled={isGenerating || tokens === 0}
          >
            {isGenerating ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Generando reporte...
              </>
            ) : (
              <>
                <SparklesIcon className="mr-2 h-4 w-4" />
                Generar Nuevo Reporte
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {reports.map(report => (
        <motion.div 
          key={report.id} 
          className="grid gap-6"
          variants={container}
        >
          {/* Score y Resumen */}
          <div className="grid gap-6 md:grid-cols-2">
            <MotionCard variants={item}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Score de Salud Financiera
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <svg className="h-32 w-32 transform -rotate-90">
                      <motion.circle
                        className="text-muted stroke-current"
                        strokeWidth="12"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                      <motion.circle
                        className={`${
                          report.score >= 80 
                            ? "text-emerald-500" 
                            : report.score >= 60 
                            ? "text-yellow-500" 
                            : "text-destructive"
                        } stroke-current`}
                        strokeWidth="12"
                        strokeDasharray={`${report.score * 3.51} 351`}
                        strokeLinecap="round"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        variants={scoreCircle}
                      />
                    </svg>
                    <motion.div 
                      className="absolute flex flex-col items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-3xl font-bold">{report.score}</span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Ratio Ahorro</p>
                    <p className="font-medium">{report.summary.savingsRate}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Ratio Deuda</p>
                    <p className="font-medium">{report.summary.debtToIncome}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Fondo Emergencia</p>
                    <p className="font-medium">{report.summary.emergencyFund} meses</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Gastos vs Ingresos</p>
                    <p className="font-medium">
                      {((report.summary.monthlyExpenses / report.summary.monthlyIncome) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard variants={item}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Proyección a 3 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {report.projections.map((projection, index) => (
                    <div key={projection.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{projection.month}</span>
                        <span className="font-medium">
                          {formatCurrency(projection.optimized)}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ 
                            width: `${(projection.optimized / projection.expected) * 100}%`,
                            opacity: 1 - (index * 0.2)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Potencial ahorro de{' '}
                    <span className="font-medium text-emerald-500">
                      {formatCurrency(
                        report.projections[3].expected - report.projections[3].optimized
                      )}
                    </span>
                    {' '}mensuales
                  </p>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Áreas de Mejora */}
          <MotionCard variants={item}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Áreas de Mejora Prioritarias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="grid gap-4"
                variants={container}
              >
                {report.improvements.map((improvement, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-full ${
                      improvement.impact === "high"
                        ? "bg-destructive/20 text-destructive"
                        : improvement.impact === "medium"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-emerald-500/20 text-emerald-500"
                    }`}>
                      {improvement.impact === "high" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : improvement.impact === "medium" ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center gap-2">
                          {improvement.title}
                          <Badge variant="outline">
                            {improvement.category}
                          </Badge>
                        </h4>
                        <Badge variant={
                          improvement.impact === "high"
                            ? "destructive"
                            : improvement.impact === "medium"
                            ? "outline"
                            : "default"
                        }>
                          {improvement.impact === "high" 
                            ? "Alta Prioridad"
                            : improvement.impact === "medium"
                            ? "Media Prioridad"
                            : "Baja Prioridad"
                          }
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {improvement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </MotionCard>

          {/* Funciones Premium */}
          <MotionCard 
            className="bg-muted/50"
            variants={item}
            whileHover={{ scale: 1.01 }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Desbloquea Más Funciones</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtén reportes ilimitados y análisis más detallados con nuestra versión Premium
                  </p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Conoce Más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </MotionCard>
        </motion.div>
      ))}
    </motion.div>
  )
} 