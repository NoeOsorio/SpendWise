"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AccountSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountSettingsModal({ open, onOpenChange }: AccountSettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl">Configuración de la Cuenta</DialogTitle>
          <DialogDescription className="text-base">
            Actualiza tu información personal y la configuración de tu cuenta.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-4">
            <Label htmlFor="name" className="text-base">Nombre</Label>
            <Input id="name" defaultValue="Usuario" className="h-11" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input id="email" defaultValue="usuario@email.com" type="email" className="h-11" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="lg">Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 