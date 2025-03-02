"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { TransactionInputProps } from "@/types/transaction"
import { Loader2 } from "lucide-react"
import { transactionsService } from "@/services/transactions"

export function TransactionInput({ 
  onCancel, 
  onPreview, 
  isConfirmMode, 
  isLoading,
  onConfirm 
}: TransactionInputProps) {
  const [description, setDescription] = useState('')
  const [processingAI, setProcessingAI] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (isConfirmMode && onConfirm) {
      onConfirm()
      return
    }

    setProcessingAI(true)
    try {
      const aiResponse = await transactionsService.parseTransactionText(description)
      onPreview(aiResponse)
    } catch (error) {
      console.error(error)
      toast({ 
        title: "Error al procesar el texto",
        variant: "destructive"
      })
    } finally {
      setProcessingAI(false)
    }
  }

  const loading = isLoading || processingAI

  return (
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
            placeholder="Describe tu transacción en lenguaje natural..."
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
            disabled={isConfirmMode}
          />

          {/* Loader con efecto glassmorphic */}
          {loading && (
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
          disabled={loading}
          className="border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10"
        >
          {isConfirmMode ? 'Editar' : 'Cancelar'}
        </Button>
        <Button
          type="submit"
          disabled={loading || (!isConfirmMode && !description.trim())}
          className="bg-primary/80 backdrop-blur-lg hover:bg-primary"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {processingAI ? 'Procesando...' : 'Guardando...'}
            </>
          ) : (
            isConfirmMode ? 'Confirmar Transacción' : 'Continuar'
          )}
        </Button>
      </div>
    </form>
  )
} 
