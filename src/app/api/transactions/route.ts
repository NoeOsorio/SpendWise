import { transactionsService } from '@/services/transactions'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await transactionsService.getTransactions()
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const transaction = await transactionsService.subscribeToChanges(json)
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
} 