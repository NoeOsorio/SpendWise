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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

interface DebtFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    id?: string
    name: string
    totalAmount: number
    monthlyPayment: number
    interestRate: number
    startDate: Date
    endDate: Date
    category: "mortgage" | "car" | "personal" | "other"
  }
}

const categories = [
  { value: "mortgage", label: "Hipoteca" },
  { value: "car", label: "Vehículo" },
  { value: "personal", label: "Préstamo Personal" },
  { value: "other", label: "Otro" },
]

export function DebtForm({ open, onOpenChange, initialData }: DebtFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    totalAmount: initialData?.totalAmount ?? 0,
    monthlyPayment: initialData?.monthlyPayment ?? 0,
    interestRate: initialData?.interestRate ?? 0,
    startDate: initialData?.startDate ?? new Date(),
    endDate: initialData?.endDate ?? new Date(),
    category: initialData?.category ?? "personal",
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
            <DialogContent className="sm:max-w-[425px]">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <DialogHeader>
                  <DialogTitle>
                    {initialData ? "Editar Deuda" : "Nueva Deuda"}
                  </DialogTitle>
                  <DialogDescription>
                    Agrega o modifica una deuda a largo plazo
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre de la deuda</Label>
                      <Input
                        id="name"
                        placeholder="ej. Hipoteca Casa"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalAmount">Monto total</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="totalAmount"
                          type="number"
                          className="pl-7"
                          placeholder="0.00"
                          value={formData.totalAmount || ""}
                          onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyPayment">Pago mensual</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="monthlyPayment"
                          type="number"
                          className="pl-7"
                          placeholder="0.00"
                          value={formData.monthlyPayment || ""}
                          onChange={(e) => setFormData({ ...formData, monthlyPayment: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Tasa de interés anual (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        value={formData.interestRate || ""}
                        onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: "mortgage" | "car" | "personal" | "other") => 
                          setFormData({ ...formData, category: value })
                        }
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha inicio</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.startDate ? (
                                format(formData.startDate, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                              initialFocus
                              locale={es}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Fecha fin</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.endDate ? (
                                format(formData.endDate, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                              initialFocus
                              locale={es}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {initialData ? "Guardar Cambios" : "Crear Deuda"}
                    </Button>
                  </DialogFooter>
                </form>
              </motion.div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
} 