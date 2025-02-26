"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const categories = ["Vivienda", "Alimentación", "Transporte"]

const data = {
  Vivienda: [
    { month: "Ene", amount: 7500 },
    { month: "Feb", amount: 7800 },
    { month: "Mar", amount: 8000 },
    { month: "Abr", amount: 7900 },
    { month: "May", amount: 8200 },
    { month: "Jun", amount: 8100 }
  ],
  Alimentación: [
    { month: "Ene", amount: 3200 },
    { month: "Feb", amount: 3500 },
    { month: "Mar", amount: 3300 },
    { month: "Abr", amount: 3800 },
    { month: "May", amount: 3600 },
    { month: "Jun", amount: 3400 }
  ],
  Transporte: [
    { month: "Ene", amount: 2000 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 2200 },
    { month: "Abr", amount: 1900 },
    { month: "May", amount: 2100 },
    { month: "Jun", amount: 2000 }
  ]
}

export function CategoryTrends() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  
  const monthlyData = data[selectedCategory as keyof typeof data]
  const average = monthlyData.reduce((sum, item) => sum + item.amount, 0) / monthlyData.length
  const maxAmount = Math.max(...monthlyData.map(d => d.amount))

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle>Evolución Mensual</CardTitle>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          Promedio mensual: {formatCurrency(average)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-2 h-[200px] items-end relative pt-4">
            {/* Línea promedio */}
            <div 
              className="absolute w-full border-t border-dashed border-muted-foreground/50"
              style={{ 
                bottom: `${(average / maxAmount) * 100}%`,
              }}
            />
            {monthlyData.map((data, i) => (
              <div key={data.month} className="relative h-full flex flex-col justify-end">
                <motion.div 
                  className={`w-full bg-primary transition-all ${
                    data.amount > average ? "opacity-100" : "opacity-50"
                  }`}
                  style={{ 
                    height: `${(data.amount / maxAmount) * 100}%`,
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px'
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                <div className="text-center text-sm mt-2">
                  <div className="font-medium">{data.month}</div>
                  <div className="text-muted-foreground">
                    {formatCurrency(data.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Las barras más oscuras indican gastos por encima del promedio
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 