import { TransactionDialog } from "@/components/transactions/transaction-dialog"

interface TransactionDialogsProps {
  dialog: 'income' | 'expense' | null
  onOpenChange: (dialog: 'income' | 'expense' | null) => void
  onSuccess: () => void
}

export function TransactionDialogs({ dialog, onOpenChange, onSuccess }: TransactionDialogsProps) {
  return (
    <>
      <TransactionDialog
        type="income"
        open={dialog === 'income'}
        onOpenChange={(open) => onOpenChange(open ? 'income' : null)}
        onSuccess={onSuccess}
      />
      <TransactionDialog
        type="expense"
        open={dialog === 'expense'}
        onOpenChange={(open) => onOpenChange(open ? 'expense' : null)}
        onSuccess={onSuccess}
      />
    </>
  )
} 