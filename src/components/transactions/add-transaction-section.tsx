"use client"

import { TransactionInput } from "./transaction-input"
import { Card } from "@/components/ui/card"
import { Sparkles, Clock, MapPin, Tags, Coins, CalendarDays, LucideIcon, PlusCircle, MinusCircle } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { TransactionAIResponse } from "@/types/transaction"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { transactionsService } from "@/services/transactions"
import { categoriesService } from "@/services/categories"
import { useTransactions } from "@/hooks/use-transactions"
import { useBalance } from "@/hooks/use-balance"

interface AddTransactionSectionProps {
  onTransactionCreated?: () => void
}

export function AddTransactionSection({ onTransactionCreated }: AddTransactionSectionProps) {
  const [preview, setPreview] = useState<TransactionAIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { getCurrentUser } = useAuth()
  const { loadTransactions } = useTransactions()
  const { reloadBalance } = useBalance()

  const handleSuccess = () => {
    setPreview(null)
    loadTransactions()
    reloadBalance()
    onTransactionCreated?.()
  }

  const handleConfirm = async () => {
    if (!preview) return

    setIsLoading(true)
    try {
      const user = await getCurrentUser()
      const categoryId = await categoriesService.getCategoryByName(preview.category)

      await transactionsService.createTransaction({
        user_id: user.id,
        amount: preview.amount,
        type: preview.type,
        category_id: categoryId || '',
        description: preview.description,
        date: preview.date || new Date().toISOString(),
        location: preview.location || undefined,
        notes: preview.notes || undefined,
        tags: preview.tags || undefined,
        is_recurring: false
      })

      toast({ title: "Transacción creada exitosamente" })
      setPreview(null)
      onTransactionCreated?.()
    } catch (error) {
      console.error(error)
      toast({ 
        title: "Error al crear la transacción",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
      {/* Input Section */}
      <Card className="lg:col-span-3">
        <div className="p-8 border-b">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Agregar Transacción</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Describe tu transacción en lenguaje natural y deja que la IA haga el resto
          </p>
        </div>

        <div className="p-6">
          <TransactionInput 
            onSuccess={handleSuccess}
            onCancel={() => setPreview(null)}
            onPreview={setPreview}
            isConfirmMode={!!preview}
            isLoading={isLoading}
            onConfirm={handleConfirm}
          />
        </div>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className={`
                  rounded-xl border-2 p-6 space-y-6
                  ${preview.type === 'income' 
                    ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-950/10' 
                    : 'border-rose-200 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-950/10'
                  }
                `}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      preview.type === 'income' 
                        ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 text-emerald-600' 
                        : 'bg-gradient-to-br from-rose-500/20 to-rose-500/10 text-rose-600'
                    }`}>
                      {preview.type === 'income' ? <PlusCircle className="h-5 w-5" /> : <MinusCircle className="h-5 w-5" />}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {preview.type === 'income' ? 'Nuevo Ingreso' : 'Nuevo Gasto'}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/80 backdrop-blur-sm">
                    <span className="text-sm font-medium text-muted-foreground">Monto</span>
                    <span className={`text-3xl font-bold ${
                      preview.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {formatCurrency(preview.amount)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-background/80">
                        <Coins className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">Descripción</span>
                    </div>
                    <p className="text-sm p-3 rounded-lg bg-background/50">
                      {preview.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InfoCard
                      label="Categoría"
                      value={preview.category}
                      icon={Coins}
                    />
                    {preview.date && (
                      <InfoCard
                        label="Fecha"
                        value={format(new Date(preview.date), "d 'de' MMMM", { locale: es })}
                        icon={CalendarDays}
                      />
                    )}
                  </div>

                  {preview.location && (
                    <InfoCard
                      label="Ubicación"
                      value={preview.location}
                      icon={MapPin}
                    />
                  )}

                  {preview.tags && preview.tags.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tags className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Etiquetas</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {preview.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className={preview.type === 'income' 
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sparkles className="w-16 h-16 text-primary/40" />
                  </motion.div>
                </div>
                <div className="max-w-sm">
                  <h3 className="text-xl font-semibold mb-2">¡La IA está lista!</h3>
                  <p className="text-muted-foreground">
                    Escribe tu transacción arriba y déjame ayudarte a organizarla de la mejor manera
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Guide Section */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="relative">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Ejemplos
            </h3>
            <div className="mt-4 space-y-4">
              <ExampleCard
                icon={CalendarDays}
                title="Gasto del Día"
                example="Pagué 500 pesos en el supermercado"
                description="Perfecto para registrar gastos rápidos del día"
                features={["Monto", "Categoría", "Fecha actual"]}
              />
              
              <ExampleCard
                icon={Clock}
                title="Con Fecha Específica"
                example="Recibí 5000 de mi cliente por el proyecto web ayer"
                description="Especifica cuándo ocurrió la transacción"
                features={["Monto", "Fecha específica", "Categoría", "Etiquetas"]}
              />
              
              <ExampleCard
                icon={MapPin}
                title="Con Ubicación"
                example="Gasté 300 en café en Starbucks del centro"
                description="Agrega el lugar para mejor organización"
                features={["Monto", "Ubicación", "Categoría"]}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary/5 dark:bg-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Tags className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Tips para Mejores Resultados</h4>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">1</span>
              <span>Incluye el monto y una descripción clara</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">2</span>
              <span>Especifica la fecha si no es hoy (ej: &apos;ayer&apos;, &apos;el lunes&apos;)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">3</span>
              <span>Menciona el lugar para mejor organización</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function ExampleCard({ 
  icon: Icon,
  title, 
  example, 
  description,
  features 
}: {
  icon: LucideIcon
  title: string
  example: string
  description: string
  features: string[]
}) {
  return (
    <div className="rounded-lg border bg-card p-4 transition-all duration-300 hover:bg-accent/5 hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
          <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-sm italic text-primary">&apos;{example}&apos;</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {features.map(feature => (
              <span 
                key={feature}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, value, icon: Icon }: { 
  label: string
  value: string
  icon: LucideIcon 
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-background/80">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="p-3 rounded-lg bg-background/50">
        <span className="text-sm">{value}</span>
      </div>
    </div>
  )
} 