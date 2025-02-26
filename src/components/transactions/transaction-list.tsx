"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"

// We'll define this type properly later
type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: Date
}

export function TransactionList() {
  // Datos de ejemplo
  const transactions: Transaction[] = [
    {
      id: "1",
      description: "Salary deposit",
      amount: 3000,
      type: "income",
      category: "Salary",
      date: new Date()
    },
    {
      id: "2",
      description: "Grocery shopping",
      amount: 150.50,
      type: "expense",
      category: "Food",
      date: new Date()
    }
  ]

  return (
    <Card className="border-2 border-violet-500/20">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No transactions yet. Add one above!
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-900/10 dark:to-purple-900/10"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "income" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30"
                  }`}>
                    {transaction.type === "income" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className={`font-medium ${
                  transaction.type === "income" ? "text-emerald-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 