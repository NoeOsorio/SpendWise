import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FinanzAI - Control de Gastos Inteligente",
  description: "Gestiona tus finanzas personales de manera inteligente con ayuda de IA",
  keywords: "finanzas personales, control de gastos, presupuesto, méxico, inteligencia artificial",
  openGraph: {
    title: "FinanzAI - Control de Gastos Inteligente",
    description: "Gestiona tus finanzas personales de manera inteligente con ayuda de IA",
    locale: "es-MX",
  },
  language: "es-MX",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
