"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

interface GoalFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    id?: string
    name: string
    targetAmount: number
    category: string
    deadline: Date
  }
}

const categories = [
  { value: "emergencias", label: "Fondo de Emergencia" },
  { value: "viajes", label: "Viajes" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "vehiculo", label: "Vehículo" },
  { value: "educacion", label: "Educación" },
  { value: "hogar", label: "Hogar" },
  { value: "inversion", label: "Inversión" },
  { value: "otros", label: "Otros" },
]

export function GoalForm({ open, onOpenChange, initialData }: GoalFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    targetAmount: initialData?.targetAmount ?? 0,
    category: initialData?.category ?? "",
    deadline: initialData?.deadline ?? new Date(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar
    console.log(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Objetivo" : "Nuevo Objetivo"}
          </DialogTitle>
          <DialogDescription>
            Define los detalles de tu objetivo de ahorro
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del objetivo</Label>
              <Input
                id="name"
                placeholder="ej. Viaje a Europa"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monto objetivo</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7"
                  placeholder="0.00"
                  value={formData.targetAmount || ""}
                  onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
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
              <Label>Fecha límite</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? (
                      format(formData.deadline, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={(date) => date && setFormData({ ...formData, deadline: date })}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Guardar Cambios" : "Crear Objetivo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 