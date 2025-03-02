"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { TransactionInputProps, TransactionAIResponse } from "@/types/transaction"
import { Loader2, CalendarIcon, MapPinIcon, PlusCircle, MinusCircle, Banknote, Tag } from "lucide-react"
import { transactionsService } from "@/services/transactions"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { categoriesService } from "@/services/categories"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

export function TransactionInput({ onSuccess, onCancel }: Omit<TransactionInputProps, 'type'>) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [aiResponse, setAiResponse] = useState<TransactionAIResponse | null>(null)
  const { toast } = useToast()
  const { getCurrentUser } = useAuth()
  const [description, setDescription] = useState('')

  // Ahora el tipo viene de la respuesta de la IA
  const isIncome = aiResponse?.type === 'income'
  const Icon = isIncome ? PlusCircle : MinusCircle
  const title = isIncome ? 'Nuevo Ingreso' : 'Nuevo Gasto'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const aiResponse = await transactionsService.parseTransactionText(description)
      setAiResponse(aiResponse)
      setShowPreview(true)
    } catch (error) {
      console.error(error)
      toast({ 
        title: "Error al procesar el texto",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!aiResponse) return

    setIsLoading(true)
    try {
      const user = await getCurrentUser()
      const categoryId = await categoriesService.getCategoryByName(aiResponse.category)

      await transactionsService.createTransaction({
        user_id: user.id,
        amount: aiResponse.amount,
        type: aiResponse.type,
        category_id: categoryId || '',
        description: aiResponse.description,
        date: aiResponse.date || new Date().toISOString(),
        location: aiResponse.location || undefined,
        notes: aiResponse.notes || undefined,
        tags: aiResponse.tags || undefined,
        is_recurring: false
      })

      toast({ title: "Transacción creada exitosamente" })
      
      // Asegurarnos de que onSuccess es una función antes de llamarla
      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast({ 
        title: "Error al crear la transacción",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      setShowPreview(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          {/* Contenedor principal con efecto glassmorphic */}
          <div className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-white/20
            bg-white/5
            backdrop-blur-xl
            shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.1)]
            transition-all
            duration-300
            hover:shadow-lg
            hover:shadow-black/5
            hover:border-white/30
          ">
            {/* Efecto de brillo */}
            <div className="
              absolute
              inset-0
              bg-gradient-to-br
              from-white/10
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            " />

            {/* Textarea con fondo transparente */}
            <Textarea
              placeholder="Describe tu transacción en lenguaje natural...
              Ejemplo: 'Pagué 500 pesos en el restaurante La Terraza ayer'"
              className="
                min-h-[150px]
                bg-transparent
                border-none
                text-lg
                placeholder:text-muted-foreground/50
                focus-visible:ring-0
                focus-visible:ring-offset-0
                resize-none
                p-6
                relative
                z-10
              "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Loader con efecto glassmorphic */}
            {isLoading && (
              <div className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-background/20
                backdrop-blur-sm
                z-20
              ">
                <div className="
                  rounded-full
                  p-4
                  bg-white/10
                  backdrop-blur-md
                  shadow-xl
                ">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botones con estilo consistente */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="
              border-white/20
              bg-white/5
              backdrop-blur-lg
              hover:bg-white/10
              transition-colors
            "
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !description.trim()}
            className="
              bg-primary/80
              backdrop-blur-lg
              hover:bg-primary
              transition-colors
              disabled:opacity-50
              disabled:hover:bg-primary/80
            "
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </form>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className={`text-2xl flex items-center gap-3 ${
              isIncome ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              <div className={`p-3 rounded-full ${
                isIncome 
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' 
                  : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
              }`}>
                <Icon className="h-6 w-6" strokeWidth={2.5} />
              </div>
              {title}
            </DialogTitle>
          </DialogHeader>

          {aiResponse && (
            <div className="space-y-6 py-4">
              <div className={`p-6 rounded-xl border-2 ${
                isIncome
                  ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-950/10'
                  : 'border-rose-200 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-950/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className={`h-5 w-5 ${
                      isIncome ? 'text-emerald-600' : 'text-rose-600'
                    }`} />
                    <span className="font-medium">Monto</span>
                  </div>
                  <span className={`text-3xl font-bold ${
                    isIncome ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {formatCurrency(aiResponse.amount)}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="font-medium">Categoría</span>
                  <div className={`p-3 rounded-lg border-2 ${
                    isIncome
                      ? 'border-emerald-200/50 bg-emerald-50/30 hover:bg-emerald-50/50'
                      : 'border-rose-200/50 bg-rose-50/30 hover:bg-rose-50/50'
                  } transition-colors`}>
                    {aiResponse.category}
                  </div>
                </div>

                {aiResponse.date && (
                  <div className="space-y-2">
                    <span className="font-medium">Fecha</span>
                    <div className="flex items-center gap-2 p-3 rounded-lg border">
                      <CalendarIcon className={`h-4 w-4 ${
                        isIncome ? 'text-emerald-600' : 'text-rose-600'
                      }`} />
                      <span>{format(new Date(aiResponse.date), "d 'de' MMMM", { locale: es })}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="font-medium">Descripción</span>
                <div className="p-3 rounded-lg border bg-muted/5 hover:bg-muted/10 transition-colors">
                  {aiResponse.description}
                </div>
              </div>

              {aiResponse.location && (
                <div className="space-y-2">
                  <span className="font-medium">Ubicación</span>
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/5">
                    <MapPinIcon className={`h-4 w-4 ${
                      isIncome ? 'text-emerald-600' : 'text-rose-600'
                    }`} />
                    <span>{aiResponse.location}</span>
                  </div>
                </div>
              )}

              {aiResponse.tags && aiResponse.tags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className={`h-4 w-4 ${
                      isIncome ? 'text-emerald-600' : 'text-rose-600'
                    }`} />
                    <span className="font-medium">Etiquetas</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        className={`
                          px-3 py-1 rounded-full font-medium
                          ${isIncome
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          }
                          transition-colors cursor-default
                        `}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Editar
            </Button>
            <Button 
              onClick={handleConfirm}
              className={`relative overflow-hidden ${
                isIncome 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Confirmar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 
