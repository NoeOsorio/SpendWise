"use client"

import { BalanceOverview } from "./components/balance-overview/balance-overview"
import { ExpensePieChart } from "./components/expense-chart/expense-pie-chart"
import { TopExpenses } from "./components/expense-chart/top-expenses"
import { TransactionList } from "@/components/transactions/transaction-list"
import { AddTransactionSection } from "@/components/transactions/add-transaction-section"
import { useBalance } from "@/hooks/use-balance"
import { useTransactions } from "@/hooks/use-transactions"

export default function DashboardPage() {
  const { reloadBalance } = useBalance()
  const { loadTransactions } = useTransactions()

  const handleTransactionCreated = () => {
    reloadBalance()
    loadTransactions()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Administra tus ingresos y gastos de forma inteligente
        </p>
      </div>

      <BalanceOverview />
      
      <AddTransactionSection 
        onTransactionCreated={handleTransactionCreated}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ExpensePieChart />
          <TopExpenses />
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Transacciones Recientes</h2>
            <TransactionList />
          </section>
        </div>
      </div>
    </div>
  )
} 