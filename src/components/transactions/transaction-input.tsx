"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Loader2 } from "lucide-react"

export function TransactionInput() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [preview, setPreview] = useState<{
    amount: number;
    type: "expense" | "income";
    category: string;
    description: string;
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsProcessing(true)
    try {
      // Aquí irá la integración con OpenAI para procesar el texto
      // Por ahora simulamos un delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Ejemplo de resultado procesado
      setPreview({
        amount: 50,
        type: "expense",
        category: "Food",
        description: "Lunch at restaurant"
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirm = () => {
    if (!preview) return
    // Aquí irá la lógica para guardar la transacción
    console.log("Saving transaction:", preview)
    setInput("")
    setPreview(null)
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe your transaction in natural language...
Examples:
- Spent $50 on groceries at Walmart
- Received $1000 salary payment
- Paid $800 for rent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] text-lg"
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isProcessing || !input.trim()}
              className="w-full sm:w-auto"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? "Processing..." : "Process Transaction"}
            </Button>
          </div>
        </form>

        {preview && (
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Transaction Preview</h3>
              <div className={`flex items-center ${
                preview.type === "income" ? "text-emerald-500" : "text-red-500"
              }`}>
                {preview.type === "income" ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                ${preview.amount}
              </div>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Category:</span> {preview.category}</p>
              <p><span className="font-medium">Description:</span> {preview.description}</p>
            </div>
            <Button onClick={handleConfirm} className="w-full">
              Confirm Transaction
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 