"use client"

import dynamic from 'next/dynamic'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency } from "@/lib/utils"

type TimeFilter = "1M" | "3M" | "6M"
type DisplayMode = "amount" | "percentage"

interface CategoryData {
  id: string
  label: string
  value: number
  percentage: number
  color: string
  transactions: Array<{
    id: string
    description: string
    amount: number
    date: string
  }>
}

const ResponsivePie = dynamic(() => import('@nivo/pie').then(mod => mod.ResponsivePie), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Cargando gráfica...</div>
})

export function ExpensePieChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1M")
  const [displayMode, setDisplayMode] = useState<DisplayMode>("amount")
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)

  // Simulación de datos
  const data: CategoryData[] = [
    {
      id: "alimentacion",
      label: "Alimentación",
      value: 3500,
      percentage: 25,
      color: "hsl(var(--chart-1))",
      transactions: [
        { id: "1", description: "Supermercado", amount: 1500, date: "2024-03-15" },
        { id: "2", description: "Restaurante", amount: 800, date: "2024-03-10" },
      ]
    },
    // ... más categorías
  ]

  const handleTimeFilterChange = (value: TimeFilter) => {
    setTimeFilter(value)
    // Aquí iría la lógica para actualizar los datos según el filtro
  }

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Gastos por Categoría</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">Este mes</SelectItem>
              <SelectItem value="3M">Últimos 3 meses</SelectItem>
              <SelectItem value="6M">Últimos 6 meses</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-md border">
            <Button
              variant={displayMode === "amount" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDisplayMode("amount")}
              className="rounded-r-none"
            >
              $
            </Button>
            <Button
              variant={displayMode === "percentage" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDisplayMode("percentage")}
              className="rounded-l-none"
            >
              %
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsivePie
            data={data}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="hsl(var(--foreground))"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="hsl(var(--background))"
            valueFormat={value => 
              displayMode === "amount" 
                ? formatCurrency(value)
                : `${((value / totalAmount) * 100).toFixed(1)}%`
            }
            onClick={(node) => setSelectedCategory(data.find(d => d.id === node.id) || null)}
            theme={{
              tooltip: {
                container: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '12px',
                },
              },
            }}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right'
              }
            ]}
          />
        </div>
      </CardContent>

      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedCategory?.color }} 
              />
              {selectedCategory?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total gastado:</span>
              <span className="font-medium">{formatCurrency(selectedCategory?.value || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Porcentaje del total:</span>
              <span className="font-medium">{selectedCategory?.percentage}%</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Transacciones</h4>
              <ScrollArea className="h-[200px]">
                {selectedCategory?.transactions.map(tx => (
                  <div 
                    key={tx.id} 
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                    <span>{formatCurrency(tx.amount)}</span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export { ExpensePieChart } 