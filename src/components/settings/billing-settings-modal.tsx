"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BillingSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BillingSettingsModal({ open, onOpenChange }: BillingSettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl">Plan y Facturación</DialogTitle>
          <DialogDescription className="text-base">
            Administra tu suscripción y método de pago.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">Plan Actual: Gratuito</h3>
            <p className="text-base text-muted-foreground mt-2">
              Acceso a funciones básicas de seguimiento financiero.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Seguimiento de gastos básico
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Hasta 2 cuentas bancarias
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Reportes mensuales
              </li>
            </ul>
            <Button className="mt-6" size="lg">
              Actualizar a Pro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 