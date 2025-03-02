import { Button } from "@/components/ui/button"
import { PlusIcon, MinusIcon } from "lucide-react"

interface BalanceHeaderProps {
  onAddIncome: () => void
  onAddExpense: () => void
}

export function BalanceHeader({ onAddIncome, onAddExpense }: BalanceHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Resumen General</h2>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="
            text-emerald-600 
            border-emerald-600/20 
            bg-emerald-50/50
            hover:bg-emerald-100
            hover:text-emerald-700
            dark:bg-emerald-950/10
            dark:hover:bg-emerald-950/20
            dark:border-emerald-400/20
            dark:text-emerald-400
            dark:hover:text-emerald-300
            transition-colors
          "
          onClick={onAddIncome}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Ingreso
        </Button>
        <Button 
          variant="outline"
          className="
            text-red-600 
            border-red-600/20 
            bg-red-50/50
            hover:bg-red-100
            hover:text-red-700
            dark:bg-red-950/10
            dark:hover:bg-red-950/20
            dark:border-red-400/20
            dark:text-red-400
            dark:hover:text-red-300
            transition-colors
          "
          onClick={onAddExpense}
        >
          <MinusIcon className="mr-2 h-4 w-4" />
          Gasto
        </Button>
      </div>
    </div>
  )
} 