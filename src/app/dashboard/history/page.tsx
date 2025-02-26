import { TransactionList } from "@/components/transactions/transaction-list"

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Historial de Transacciones</h1>
      <TransactionList showAll />
    </div>
  )
} 