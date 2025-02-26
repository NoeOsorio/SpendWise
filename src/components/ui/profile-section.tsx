"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronUpIcon, StarIcon, UserIcon, CreditCardIcon, BellIcon, LogOutIcon } from "lucide-react"
import { AccountSettingsModal } from "@/components/settings/account-settings-modal"
import { NotificationsSettingsModal } from "@/components/settings/notifications-settings-modal"
import { BillingSettingsModal } from "@/components/settings/billing-settings-modal"

export function ProfileSection() {
  const [openModal, setOpenModal] = useState<"account" | "notifications" | "billing" | null>(null)

  return (
    <>
      <div className="mt-auto p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Usuario</p>
                <p className="text-xs text-muted-foreground">usuario@email.com</p>
              </div>
              <ChevronUpIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" alignOffset={-40} forceMount>
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenModal("billing")}>
              <StarIcon className="mr-2 h-4 w-4" />
              Actualizar a Pro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenModal("account")}>
              <UserIcon className="mr-2 h-4 w-4" />
              Cuenta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenModal("billing")}>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Facturación
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenModal("notifications")}>
              <BellIcon className="mr-2 h-4 w-4" />
              Notificaciones
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AccountSettingsModal 
        open={openModal === "account"} 
        onOpenChange={(open) => setOpenModal(open ? "account" : null)} 
      />
      <NotificationsSettingsModal 
        open={openModal === "notifications"} 
        onOpenChange={(open) => setOpenModal(open ? "notifications" : null)} 
      />
      <BillingSettingsModal 
        open={openModal === "billing"} 
        onOpenChange={(open) => setOpenModal(open ? "billing" : null)} 
      />
    </>
  )
} 