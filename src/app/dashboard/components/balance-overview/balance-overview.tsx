"use client"

import { BalanceCard } from "./balance-card"
import { Button } from "@/components/ui/button"
import { PlusIcon, MinusIcon } from "lucide-react"
import { useState } from "react"
import { QuickAddDialog } from "@/components/transactions/quick-add-dialog"

export function BalanceOverview() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense")

  const handleQuickAdd = (type: "income" | "expense") => {
    setTransactionType(type)
    setIsAddDialogOpen(true)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Resumen General</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-emerald-600 border-emerald-600/20 hover:bg-emerald-50"
            onClick={() => handleQuickAdd("income")}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Ingreso
          </Button>
          <Button 
            variant="outline"
            className="text-red-600 border-red-600/20 hover:bg-red-50"
            onClick={() => handleQuickAdd("expense")}
          >
            <MinusIcon className="mr-2 h-4 w-4" />
            Gasto
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard
          title="Balance Total"
          amount={24500.00}
          percentage={20}
          type="balance"
          previousAmount={20416.67}
          lastUpdate="Actualizado hace 5 minutos"
        />
        <BalanceCard
          title="Ingresos Mensuales"
          amount={35000.00}
          percentage={15}
          type="income"
          previousAmount={30434.78}
          lastUpdate="Último ingreso hace 2 días"
        />
        <BalanceCard
          title="Gastos Mensuales"
          amount={10500.00}
          percentage={-5}
          type="expense"
          previousAmount={11052.63}
          lastUpdate="Último gasto hace 3 horas"
        />
      </div>

      <QuickAddDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        type={transactionType}
      />
    </section>
  )
} 