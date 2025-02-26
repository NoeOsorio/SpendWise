"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  PieChartIcon,
  ClockIcon,
  TrendingUpIcon,
  BellIcon,
  TargetIcon,
} from "lucide-react"

const menuItems = [
  {
    title: "Balance General",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
    description: "Resumen de saldo, ingresos y gastos"
  },
  {
    title: "Categorías",
    href: "/dashboard/categories",
    icon: PieChartIcon,
    description: "Análisis de gastos por categoría"
  },
  {
    title: "Historial",
    href: "/dashboard/history",
    icon: ClockIcon,
    description: "Historial de transacciones"
  },
  {
    title: "Proyecciones",
    href: "/dashboard/forecast",
    icon: TrendingUpIcon,
    description: "Predicción de gastos con IA"
  },
  {
    title: "Analisis IA",
    href: "/dashboard/report",
    icon: BellIcon,
    description: "Notificaciones y recomendaciones"
  },
  {
    title: "Objetivos",
    href: "/dashboard/goals",
    icon: TargetIcon,
    description: "Metas de ahorro y progreso"
  },
  {
    title:"Compromisos Financieros",
    href: "/dashboard/commitments",
    icon: TargetIcon,
    description: "Metas de ahorro y progreso"
  }
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              pathname === item.href ? "bg-accent" : "transparent"
            )}
            title={item.description}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
} 