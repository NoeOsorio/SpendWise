"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency } from "@/lib/utils"
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  SearchIcon, 
  CalendarIcon,
  FilterIcon,
  MoreVerticalIcon
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: Date
}

const timeFilters = [
  { label: "Hoy", value: "today" },
  { label: "7 días", value: "week" },
  { label: "Este mes", value: "month" },
]

export function TransactionList() {
  const [search, setSearch] = useState("")
  const [timeFilter, setTimeFilter] = useState("month")
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Depósito de nómina",
      amount: 15000,
      type: "income",
      category: "Ingresos",
      date: new Date(2024, 2, 15)
    },
    {
      id: "2",
      description: "Supermercado",
      amount: 1250.50,
      type: "expense",
      category: "Alimentación",
      date: new Date(2024, 2, 14)
    },
    // ... más transacciones
  ])

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(search.toLowerCase()) ||
    tx.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Historial de Transacciones</CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredTransactions.length} transacciones encontradas
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {timeFilters.map(filter => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setTimeFilter(filter.value)}
                  className="justify-between"
                >
                  {filter.label}
                  {timeFilter === filter.value && (
                    <ArrowUpIcon className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar transacción..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence initial={false}>
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex items-center justify-between p-4 rounded-lg mb-2 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "income" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30"
                  }`}>
                    {transaction.type === "income" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="rounded-sm">
                        {transaction.category}
                      </Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(transaction.date, "d MMM", { locale: es })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${
                    transaction.type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 