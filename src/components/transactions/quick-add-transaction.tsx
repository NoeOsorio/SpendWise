"use client"

import * as React from "react"
import { Plus, Loader2, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TransactionPreview {
  amount: number
  type: "expense" | "income"
  category: string
  description: string
}

export function QuickAddTransaction() {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [preview, setPreview] = React.useState<TransactionPreview | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const processTransaction = async (text: string) => {
    setIsProcessing(true)
    try {
      // Aquí irá la integración con OpenAI
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulación de respuesta
      setPreview({
        amount: 50,
        type: text.toLowerCase().includes('received') ? 'income' : 'expense',
        category: 'Food',
        description: 'Lunch at restaurant',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        processTransaction(input)
      }
    }
  }

  const handleConfirm = async () => {
    if (!preview) return
    // Aquí irá la lógica para guardar la transacción
    console.log("Saving transaction:", preview)
    setInput("")
    setPreview(null)
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Quick Add</span>
        <span className="inline-flex lg:hidden">Add</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                ref={inputRef}
                placeholder="Describe your transaction (e.g. 'Spent $50 on groceries')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isProcessing}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Press Enter to process the transaction
              </p>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {preview && (
              <div className="rounded-lg border bg-card p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Preview</h3>
                  <div className={cn(
                    "flex items-center font-medium",
                    preview.type === "income" ? "text-emerald-500" : "text-red-500"
                  )}>
                    {preview.type === "income" ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    ${preview.amount.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{preview.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="font-medium">{preview.description}</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleConfirm}
                >
                  Confirm Transaction
                </Button>
              </div>
            )}

            {!isProcessing && !preview && (
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">Examples:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Spent $25 on lunch at Subway</li>
                  <li>Received $1000 salary payment</li>
                  <li>Paid $800 for rent</li>
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 