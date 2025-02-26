import { BalanceOverview } from "./components/balance-overview/balance-overview"
import { ExpensePieChart } from "./components/expense-chart/expense-pie-chart"
import { TopExpenses } from "./components/expense-chart/top-expenses"
import { TransactionInput } from "@/components/transactions/transaction-input"
import { TransactionList } from "@/components/transactions/transaction-list"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <BalanceOverview />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ExpensePieChart />
          <TopExpenses />
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Add Transaction</h2>
            <TransactionInput />
          </section>
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Recent Transactions</h2>
            <TransactionList />
          </section>
        </div>
      </div>
    </div>
  )
} 