"use client"

import { BalanceCard } from "./balance-card"

export function BalanceOverview() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard
          title="Total Balance"
          amount={2450.00}
          percentage={20}
          type="balance"
        />
        <BalanceCard
          title="Monthly Income"
          amount={3500.00}
          percentage={15}
          type="income"
        />
        <BalanceCard
          title="Monthly Expenses"
          amount={1050.00}
          percentage={-5}
          type="expense"
        />
      </div>
    </section>
  )
} 