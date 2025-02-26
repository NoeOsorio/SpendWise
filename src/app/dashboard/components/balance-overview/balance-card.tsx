"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BalanceCardProps {
  title: string
  amount: number
  percentage: number
  type: "income" | "expense" | "balance"
  previousAmount: number
  lastUpdate: string
}

export function BalanceCard({ 
  title, 
  amount, 
  percentage, 
  type,
  previousAmount,
  lastUpdate
}: BalanceCardProps) {
  const isPositive = percentage > 0
  const formattedAmount = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn(
              "relative overflow-hidden transition-colors hover:bg-muted/50 cursor-help",
              type === "balance" && "bg-primary/5",
              type === "income" && "bg-emerald-50 dark:bg-emerald-950/20",
              type === "expense" && "bg-red-50 dark:bg-red-950/20"
            )}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {isPositive ? (
                  <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formattedAmount}
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  isPositive ? "text-emerald-600" : "text-red-600"
                )}>
                  {isPositive ? "+" : ""}{percentage}% vs mes anterior
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {lastUpdate}
                </p>
              </CardContent>
              <div className={cn(
                "absolute inset-y-0 right-0 w-1",
                type === "balance" && "bg-primary",
                type === "income" && "bg-emerald-500",
                type === "expense" && "bg-red-500"
              )} />
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mes anterior: {new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
          }).format(previousAmount)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 