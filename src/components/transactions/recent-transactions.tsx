"use client"

import { useTransactions } from '@/hooks/use-transactions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from '@/lib/utils'

export function RecentTransactions() {
  const { transactions, isLoading, error } = useTransactions()

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
        <CardDescription>Tus últimos movimientos financieros</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.categoryName}</p>
              </div>
              <p className={transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}>
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 