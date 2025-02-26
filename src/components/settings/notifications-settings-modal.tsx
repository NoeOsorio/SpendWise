"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface NotificationsSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsSettingsModal({ open, onOpenChange }: NotificationsSettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl">Preferencias de Notificaciones</DialogTitle>
          <DialogDescription className="text-base">
            Configura cómo y cuándo quieres recibir notificaciones.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-6">
          <div className="flex items-center justify-between space-x-10">
            <div className="space-y-2">
              <Label className="text-base font-medium">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones sobre tu actividad financiera.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between space-x-10">
            <div className="space-y-2">
              <Label className="text-base font-medium">Alertas de Gastos</Label>
              <p className="text-sm text-muted-foreground">
                Notificaciones cuando superes límites establecidos.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between space-x-10">
            <div className="space-y-2">
              <Label className="text-base font-medium">Resumen Semanal</Label>
              <p className="text-sm text-muted-foreground">
                Recibe un resumen de tus finanzas cada semana.
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 