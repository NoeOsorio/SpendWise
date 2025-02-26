"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  LineChartIcon,
  GoalIcon,
  SettingsIcon,
  BellIcon,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: LineChartIcon,
  },
  {
    title: "Goals",
    href: "/dashboard/goals",
    icon: GoalIcon,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: BellIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
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
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
} 