import { Metadata } from "next"
import { ThemeToggle } from "@/components/theme-toggle"
import { SideNav } from "@/components/ui/side-nav"
import { QuickAddTransaction } from "@/components/transactions/quick-add-transaction"

export const metadata: Metadata = {
  title: "Dashboard - FinanzAI",
  description: "Gestiona tus finanzas personales de manera inteligente",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <h1 className="text-2xl font-bold tracking-tight">FinanzAI</h1>
          <div className="flex items-center gap-4">
            <QuickAddTransaction />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block fixed w-64 h-[calc(100vh-4rem)] border-r">
          <div className="flex h-full flex-col gap-4 p-4">
            <SideNav />
          </div>
        </aside>
        <main className="flex-1 lg:pl-64">
          <div className="container px-4 py-8 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 