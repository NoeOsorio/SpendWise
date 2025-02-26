"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Switch } from "@/components/ui/switch"

interface FixedExpenseFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    id?: string
    name: string
    amount: number
    category: string
    frequency: "monthly" | "bimonthly" | "annual"
    dueDay: number
    autopay: boolean
  }
}

const categories = [
  { value: "housing", label: "Vivienda" },
  { value: "utilities", label: "Servicios" },
  { value: "insurance", label: "Seguros" },
  { value: "subscriptions", label: "Suscripciones" },
  { value: "education", label: "Educación" },
  { value: "other", label: "Otros" },
]

const frequencies = [
  { value: "monthly", label: "Mensual" },
  { value: "bimonthly", label: "Bimestral" },
  { value: "annual", label: "Anual" },
]

export function FixedExpenseForm({ open, onOpenChange, initialData }: FixedExpenseFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    amount: initialData?.amount ?? 0,
    category: initialData?.category ?? "",
    frequency: initialData?.frequency ?? "monthly",
    dueDay: initialData?.dueDay ?? 1,
    autopay: initialData?.autopay ?? false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar
    console.log(formData)
    onOpenChange(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {initialData ? "Editar Gasto Fijo" : "Nuevo Gasto Fijo"}
                  </DialogTitle>
                  <DialogDescription>
                    Agrega o modifica un gasto fijo mensual
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del gasto</Label>
                      <Input
                        id="name"
                        placeholder="ej. Netflix"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Monto</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          className="pl-7"
                          placeholder="0.00"
                          value={formData.amount || ""}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Frecuencia</Label>
                      <Select
                        value={formData.frequency}
                        onValueChange={(value: "monthly" | "bimonthly" | "annual") => 
                          setFormData({ ...formData, frequency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencies.map((frequency) => (
                            <SelectItem key={frequency.value} value={frequency.value}>
                              {frequency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDay">Día de vencimiento</Label>
                      <Input
                        id="dueDay"
                        type="number"
                        min={1}
                        max={31}
                        value={formData.dueDay}
                        onChange={(e) => setFormData({ ...formData, dueDay: Number(e.target.value) })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="autopay">Pago automático</Label>
                      <Switch
                        id="autopay"
                        checked={formData.autopay}
                        onCheckedChange={(checked) => setFormData({ ...formData, autopay: checked })}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {initialData ? "Guardar Cambios" : "Crear Gasto"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </motion.div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
} 