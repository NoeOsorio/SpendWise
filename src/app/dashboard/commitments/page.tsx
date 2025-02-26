"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import {
  PlusIcon,
  HomeIcon,
  CarIcon,
  CreditCardIcon,
  CoinsIcon,
  WifiIcon,
  TrendingDownIcon,
  PieChartIcon
} from "lucide-react"
import { FixedExpenseForm } from "@/components/commitments/fixed-expense-form"
import { DebtForm } from "@/components/commitments/debt-form"

interface FixedExpense {
  id: string
  name: string
  amount: number
  category: string
  frequency: "monthly" | "bimonthly" | "annual"
  dueDay: number
  autopay: boolean
}

interface LongTermDebt {
  id: string
  name: string
  totalAmount: number
  remainingAmount: number
  monthlyPayment: number
  interestRate: number
  startDate: Date
  endDate: Date
  category: "mortgage" | "car" | "personal" | "other"
}

const MotionCard = motion(Card)

export default function CommitmentsPage() {
  const [fixedExpenses] = useState<FixedExpense[]>([
    {
      id: "1",
      name: "Renta",
      amount: 12000,
      category: "housing",
      frequency: "monthly",
      dueDay: 1,
      autopay: true
    },
    {
      id: "2",
      name: "Internet",
      amount: 599,
      category: "utilities",
      frequency: "monthly",
      dueDay: 15,
      autopay: false
    },
    // ... más gastos fijos
  ])

  const [longTermDebts] = useState<LongTermDebt[]>([
    {
      id: "1",
      name: "Hipoteca",
      totalAmount: 2000000,
      remainingAmount: 1800000,
      monthlyPayment: 15000,
      interestRate: 9.5,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2043, 0, 1),
      category: "mortgage"
    },
    // ... más deudas
  ])

  const [showFixedExpenseForm, setShowFixedExpenseForm] = useState(false)
  const [showDebtForm, setShowDebtForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<FixedExpense>()
  const [editingDebt, setEditingDebt] = useState<LongTermDebt>()

  const handleEditExpense = (expense: FixedExpense) => {
    setEditingExpense(expense)
    setShowFixedExpenseForm(true)
  }

  const handleEditDebt = (debt: LongTermDebt) => {
    setEditingDebt(debt)
    setShowDebtForm(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Compromisos Financieros
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus gastos fijos y deudas a largo plazo
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setShowFixedExpenseForm(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Nuevo Gasto Fijo
          </Button>
          <Button onClick={() => setShowDebtForm(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Nueva Deuda
          </Button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid gap-6 md:grid-cols-4">
        <MotionCard>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gastos Fijos Mensuales</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0)
                  )}
                </p>
              </div>
              <CoinsIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Deudas</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    longTermDebts.reduce((sum, debt) => sum + debt.remainingAmount, 0)
                  )}
                </p>
              </div>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pagos Mensuales Deuda</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    longTermDebts.reduce((sum, debt) => sum + debt.monthlyPayment, 0)
                  )}
                </p>
              </div>
              <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ratio Deuda/Ingreso</p>
                <p className="text-2xl font-bold">32%</p>
              </div>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </MotionCard>
      </div>

      {/* Gastos Fijos */}
      <MotionCard>
        <CardHeader>
          <CardTitle>Gastos Fijos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fixedExpenses.map(expense => (
              <motion.div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                whileHover={{ scale: 1.01 }}
                onClick={() => handleEditExpense(expense)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    {expense.category === "housing" ? (
                      <HomeIcon className="h-4 w-4" />
                    ) : expense.category === "utilities" ? (
                      <WifiIcon className="h-4 w-4" />
                    ) : (
                      <CoinsIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{expense.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Vence el día {expense.dueDay}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={expense.autopay ? "default" : "outline"}>
                    {expense.autopay ? "Automático" : "Manual"}
                  </Badge>
                  <p className="font-medium">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>

      {/* Deudas a Largo Plazo */}
      <MotionCard>
        <CardHeader>
          <CardTitle>Deudas a Largo Plazo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {longTermDebts.map(debt => (
              <motion.div
                key={debt.id}
                className="space-y-4 p-4 rounded-lg border"
                whileHover={{ scale: 1.01 }}
                onClick={() => handleEditDebt(debt)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {debt.category === "mortgage" ? (
                        <HomeIcon className="h-4 w-4" />
                      ) : debt.category === "car" ? (
                        <CarIcon className="h-4 w-4" />
                      ) : (
                        <CreditCardIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{debt.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {debt.interestRate}% interés
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(debt.remainingAmount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(debt.monthlyPayment)}/mes
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {Math.round(((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100)}% pagado
                    </span>
                    <span>
                      {Math.ceil((debt.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} meses restantes
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </MotionCard>

      {/* Formularios */}
      <FixedExpenseForm
        open={showFixedExpenseForm}
        onOpenChange={(open) => {
          setShowFixedExpenseForm(open)
          if (!open) setEditingExpense(undefined)
        }}
        initialData={editingExpense}
      />

      <DebtForm
        open={showDebtForm}
        onOpenChange={(open) => {
          setShowDebtForm(open)
          if (!open) setEditingDebt(undefined)
        }}
        initialData={editingDebt}
      />
    </div>
  )
} 