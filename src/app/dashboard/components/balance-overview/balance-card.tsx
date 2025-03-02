"use client"

import { ArrowDownIcon, ArrowUpIcon, CalendarIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from "@/components/ui/tooltip"

interface BalanceCardProps {
  title: string
  amount: number
  percentage: number
  type: 'balance' | 'income' | 'expense'
  previousAmount: number
  lastUpdate: string
}

export function BalanceCard({ title, amount, percentage, type, previousAmount, lastUpdate }: BalanceCardProps) {
  const formattedPercentage = percentage.toFixed(2)
  const isPositive = percentage > 0
  const date = new Date(lastUpdate)

  const getCardStyles = () => {
    switch (type) {
      case 'balance':
        return isPositive 
          ? 'border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-500/5' 
          : 'border-l-red-500 bg-red-50/30 dark:bg-red-500/5'
      case 'income':
        return 'border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-500/5'
      case 'expense':
        return 'border-l-red-500 bg-red-50/30 dark:bg-red-500/5'
    }
  }

  const getPercentageColor = () => {
    if (type === 'expense') {
      return isPositive ? 'text-red-600' : 'text-emerald-600'
    }
    return isPositive ? 'text-emerald-600' : 'text-red-600'
  }

  const getIconStyles = () => {
    if (type === 'balance') {
      return isPositive 
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
    return type === 'income'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }

  return (
    <div className={`
      rounded-lg border border-l-4 p-6 
      transition-all duration-300
      hover:scale-[1.02] hover:shadow-lg hover:shadow-muted/10
      cursor-default 
      ${getCardStyles()}
    `}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <div className={`
          rounded-full p-1.5
          transition-all duration-300
          group
          hover:scale-110
          hover:shadow-sm
          ${getIconStyles()}
        `}>
          {isPositive ? (
            <div className="relative">
              <ArrowUpIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px]" />
              <div className="absolute inset-0 animate-ping opacity-30">
                <ArrowUpIcon className="h-4 w-4" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[2px]" />
              <div className="absolute inset-0 animate-ping opacity-30">
                <ArrowDownIcon className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold tracking-tight">{formatCurrency(amount)}</h3>
        <div className="mt-2 flex items-center gap-2">
          <div className={`flex items-center text-xs font-medium ${getPercentageColor()}`}>
            {Math.abs(Number(formattedPercentage))}%
          </div>
          <span className="text-xs text-muted-foreground">vs mes anterior</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Mes anterior: {formatCurrency(previousAmount)}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
                <CalendarIcon className="h-3 w-3" />
                <span>{format(date, "d MMM", { locale: es })}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Última actualización</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
} 