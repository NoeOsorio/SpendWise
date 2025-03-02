"use client"

import { useState } from "react"
import { useBalance } from "@/hooks/use-balance"
import { BalanceCard } from "./balance-card"
import { BalanceHeader } from "./balance-header"
import { BalanceOverviewSkeleton } from "./balance-overview-skeleton"
import { TransactionDialogs } from "@/components/transactions/transaction-dialogs"
export function BalanceOverview() {
  const { balance, isLoading, reloadBalance } = useBalance()
  const [dialog, setDialog] = useState<'income' | 'expense' | null>(null)

  if (isLoading || !balance) {
    return <BalanceOverviewSkeleton />
  }
  return (
    <section className="space-y-6">
      <BalanceHeader 
        onAddIncome={() => setDialog('income')} 
        onAddExpense={() => setDialog('expense')} 
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard
          title="Balance Total"
          amount={balance.currentBalance}
          percentage={balance.percentages.balance}
          type="balance"
          previousAmount={balance.previousBalance}
          lastUpdate={balance.lastUpdate}
        />
        <BalanceCard
          title="Ingresos Mensuales"
          amount={balance.income}
          percentage={balance.percentages.income}
          type="income"
          previousAmount={balance.previousIncome}
          lastUpdate={balance.lastUpdate}
        />
        <BalanceCard
          title="Gastos Mensuales"
          amount={balance.expenses}
          percentage={balance.percentages.expenses}
          type="expense"
          previousAmount={balance.previousExpenses}
          lastUpdate={balance.lastUpdate}
        />
      </div>

      <TransactionDialogs
        dialog={dialog}
        onOpenChange={(open) => setDialog(open ? dialog : null)}
        onSuccess={reloadBalance}
      />
    </section>
  )
} 