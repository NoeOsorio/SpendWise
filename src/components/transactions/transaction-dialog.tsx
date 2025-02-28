"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/use-categories"
import { toast } from "sonner"
import { useTransactions } from "@/hooks/use-transactions"

interface TransactionDialogProps {
  type: 'income' | 'expense'
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function TransactionDialog({ type, open, onOpenChange, onSuccess }: TransactionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { categories, isLoading: loadingCategories } = useCategories()
  const { createTransaction } = useTransactions()
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.currentTarget
    
    try {
      if (!selectedCategory) {
        throw new Error('Debes seleccionar una categoría')
      }

      const formData = new FormData(form)
      await createTransaction({
        type,
        amount: Number(formData.get('amount')),
        description: formData.get('description') as string,
        category_id: selectedCategory
      })

      toast.success(
        type === 'income' 
          ? 'Ingreso registrado exitosamente' 
          : 'Gasto registrado exitosamente'
      )
      
      form.reset()
      setSelectedCategory("")
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al registrar la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  // Resetear el estado cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      setSelectedCategory("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'income' ? 'Registrar Ingreso' : 'Registrar Gasto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              placeholder={type === 'income' ? "Salario, Freelance, etc." : "Comida, Transporte, etc."}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
              disabled={loadingCategories}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(category => category.type === type)
                  .map((category) => (
                    <SelectItem 
                      key={category.id} 
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {!selectedCategory && (
              <p className="text-sm text-destructive">
                La categoría es requerida
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !selectedCategory}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 