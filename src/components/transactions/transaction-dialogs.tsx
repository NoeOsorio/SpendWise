"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { transactionsService } from "@/services/transactions"
import { TransactionType } from "@/types/transaction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CalendarDays, MapPin, Tags, PlusCircle, MinusCircle } from "lucide-react"
import { useCategories } from "@/hooks/use-categories"
import { formatCurrency, parseCurrency } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface TransactionDialogsProps {
  dialog: 'income' | 'expense' | null
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function TransactionDialogs({ dialog, onOpenChange, onSuccess }: TransactionDialogsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    date: new Date(),
    location: '',
    notes: '',
    tags: '',
  })
  const { toast } = useToast()
  const { getCurrentUser } = useAuth()
  const { categories } = useCategories(dialog as TransactionType)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData(prev => ({
      ...prev,
      amount: value ? formatCurrency(Number(value) / 100) : ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!dialog) return

    setIsLoading(true)
    try {
      const user = await getCurrentUser()
      const amount = parseCurrency(formData.amount)

      await transactionsService.createTransaction({
        user_id: user.id,
        amount,
        type: dialog,
        category_id: formData.categoryId,
        description: formData.description,
        date: formData.date.toISOString(),
        location: formData.location || undefined,
        notes: formData.notes || undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined,
        is_recurring: false
      })

      toast({ title: "Transacción creada exitosamente" })
      handleClose()
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast({ 
        title: "Error al crear la transacción",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setFormData({
      amount: '',
      description: '',
      categoryId: '',
      date: new Date(),
      location: '',
      notes: '',
      tags: '',
    })
  }

  return (
    <Dialog open={!!dialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-xl",
              dialog === 'income' 
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10" 
                : "bg-rose-100 text-rose-600 dark:bg-rose-500/10"
            )}>
              {dialog === 'income' ? <PlusCircle className="h-5 w-5" /> : <MinusCircle className="h-5 w-5" />}
            </div>
            <span className="text-xl">
              {dialog === 'income' ? 'Nuevo Ingreso' : 'Nuevo Gasto'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Monto</label>
            <div className={cn(
              "relative rounded-lg border p-4 transition-colors focus-within:ring-1 focus-within:ring-ring",
              dialog === 'income' 
                ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/10" 
                : "bg-rose-50 border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/10"
            )}>
              <Input
                placeholder="$0.00"
                value={formData.amount}
                onChange={handleAmountChange}
                required
                className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Input
                placeholder="Descripción de la transacción"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select 
                value={formData.categoryId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/10 p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData(prev => ({ ...prev, date: date || new Date() }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ubicación (opcional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 bg-background"
                  placeholder="Agregar ubicación"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Etiquetas (opcional)</label>
              <div className="relative">
                <Tags className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9 bg-background"
                  placeholder="Separadas por comas"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notas (opcional)</label>
              <Textarea
                placeholder="Agregar notas adicionales"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-background resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "text-white",
                dialog === 'income' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-rose-600 hover:bg-rose-700'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 