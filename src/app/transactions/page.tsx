import { TransactionForm } from '@/components/transactions/transaction-form'
import { RecentTransactions } from '@/components/transactions/recent-transactions'

export default function TransactionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transacciones</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Nueva Transacción</h2>
          <TransactionForm />
        </div>
        <div>
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
} 