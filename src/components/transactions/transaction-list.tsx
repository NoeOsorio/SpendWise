"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency } from "@/lib/utils"
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  SearchIcon, 
  EditIcon, 
  TrashIcon,
  CalendarIcon
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"

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
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([
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
    // ... más transacciones de ejemplo
  ])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastTransactionRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        setIsLoading(true)
        try {
          // Simular carga de más transacciones
          await new Promise(resolve => setTimeout(resolve, 1000))
          // Aquí iría la lógica real para cargar más transacciones
        } finally {
          setIsLoading(false)
        }
      }
    })
    
    if (node) observer.current.observe(node)
  }, [isLoading])

  const handleDelete = async (id: string) => {
    // Aquí iría la lógica para eliminar la transacción
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const handleEdit = (transaction: Transaction) => {
    // Aquí iría la lógica para editar la transacción
    console.log("Editar:", transaction)
  }

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(search.toLowerCase()) ||
    tx.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="relative">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle>Historial de Transacciones</CardTitle>
          <div className="flex gap-2">
            {timeFilters.map(filter => (
              <Button
                key={filter.value}
                variant={timeFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
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
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                ref={index === filteredTransactions.length - 1 ? lastTransactionRef : null}
                className="flex items-center justify-between p-4 rounded-lg mb-2 bg-gradient-to-r from-background to-muted hover:from-muted/50 hover:to-muted transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "income" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30"
                  }`}>
                    {transaction.type === "income" ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{transaction.category}</span>
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
                    transaction.type === "income" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(transaction)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 