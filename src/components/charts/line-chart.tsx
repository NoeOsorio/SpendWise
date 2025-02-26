"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"

interface DataPoint {
  month: string
  amount: number
}

interface LineChartProps {
  title: string
  data: DataPoint[]
  description?: string
}

export function LineChart({ title, data, description }: LineChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount))
  const minAmount = Math.min(...data.map(d => d.amount))
  const range = maxAmount - minAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[200px] relative">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border-t border-border/50"
              />
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute -left-2 inset-y-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="-translate-x-2">
                {formatCurrency(maxAmount - (i * (range / 4)))}
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="pl-12 flex items-end gap-2 h-full">
            {data.map((point, i) => (
              <div
                key={point.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <motion.div
                  className="w-full bg-primary/20 rounded-t-sm relative group"
                  style={{
                    height: `${((point.amount - minAmount) / range) * 100}%`
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${((point.amount - minAmount) / range) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatCurrency(point.amount)}
                  </div>
                  {/* Data point */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
                </motion.div>
                <span className="text-xs text-muted-foreground">
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 