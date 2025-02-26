"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface QuickAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "income" | "expense"
}

interface TransactionPreview {
  amount: number
  category: string
  description: string
  date?: string
}

export function QuickAddDialog({ open, onOpenChange, type }: QuickAddDialogProps) {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [preview, setPreview] = useState<TransactionPreview | null>(null)

  const examples = type === "income" ? [
    "Recibí $15,000 de nómina",
    "Depósito de $5,000 por freelance",
    "Me pagaron $3,000 de Uber"
  ] : [
    "Gasté $500 en el super",
    "Pagué $3,500 de renta",
    "Uber a casa $120"
  ]

  const processInput = async () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    try {
      // Aquí irá la integración con OpenAI
      await new Promise(r => setTimeout(r, 1000)) // Simulación
      
      // Simulación de respuesta procesada
      setPreview({
        amount: 500,
        category: type === "income" ? "Nómina" : "Alimentación",
        description: "Compras en el supermercado",
        date: "Hoy"
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (preview) {
      // Aquí irá la lógica para guardar la transacción
      console.log("Guardando:", preview)
      onOpenChange(false)
      return
    }
    await processInput()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "income" ? (
              <>
                <ArrowUpIcon className="text-emerald-500" />
                Nuevo Ingreso
              </>
            ) : (
              <>
                <ArrowDownIcon className="text-red-500" />
                Nuevo Gasto
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Textarea
              placeholder={`Describe tu ${type === "income" ? "ingreso" : "gasto"} en lenguaje natural...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] text-lg"
              disabled={isProcessing || !!preview}
            />
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Ejemplos:</p>
              <ul className="space-y-1 list-disc list-inside">
                {examples.map((example, i) => (
                  <li key={i} className="cursor-pointer hover:text-foreground"
                      onClick={() => setInput(example)}>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">
                Procesando...
              </span>
            </div>
          )}

          {preview && (
            <Card className="p-4 space-y-3 bg-muted/50">
              <h3 className="font-medium">Vista Previa</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(preview.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoría:</span>
                  <span className="font-medium">{preview.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descripción:</span>
                  <span className="font-medium">{preview.description}</span>
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-2 justify-end">
            {preview ? (
              <>
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={() => {
                    setPreview(null)
                    setInput("")
                  }}
                >
                  Editar
                </Button>
                <Button type="submit">Confirmar</Button>
              </>
            ) : (
              <Button 
                type="submit" 
                disabled={!input.trim() || isProcessing}
              >
                Procesar
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 