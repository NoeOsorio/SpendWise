"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface CategoryInsightProps {
  title: string
  category: string
  percentage: number
  trend?: "up" | "down" | "alert"
  description: string
}

function InsightCard({ title, category, percentage, trend, description }: CategoryInsightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-bold">{category}</p>
            {trend && (
              <div className={`rounded-full p-1 ${
                trend === "up" ? "bg-red-100 text-red-700" :
                trend === "down" ? "bg-emerald-100 text-emerald-700" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {trend === "up" ? <ArrowUpIcon className="h-4 w-4" /> :
                 trend === "down" ? <ArrowDownIcon className="h-4 w-4" /> :
                 <AlertTriangle className="h-4 w-4" />}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {percentage}%
            </span>
            <span className="text-sm text-muted-foreground">
              {description}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const CategoryInsights = {
  Card: InsightCard
} 