"use client"

import { ResponsivePie } from "@nivo/pie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpenseData {
  id: string
  label: string
  value: number
  color: string
}

const sampleData: ExpenseData[] = [
  { id: "food", label: "Food", value: 150, color: "hsl(var(--chart-1))" },
  { id: "rent", label: "Rent", value: 800, color: "hsl(var(--chart-2))" },
  { id: "transport", label: "Transport", value: 100, color: "hsl(var(--chart-3))" },
  { id: "utilities", label: "Utilities", value: 200, color: "hsl(var(--chart-4))" },
  { id: "others", label: "Others", value: 150, color: "hsl(var(--chart-5))" },
]

export function ExpensePieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsivePie
            data={sampleData}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
            }}
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="hsl(var(--foreground))"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="hsl(var(--background))"
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
    </Card>
  )
} 