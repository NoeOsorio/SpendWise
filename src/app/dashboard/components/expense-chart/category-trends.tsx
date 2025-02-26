"use client"

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

const ResponsiveLine = dynamic(() => import('@nivo/line').then(mod => mod.ResponsiveLine), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Cargando gráfica...</div>
})

const data = [
  {
    id: "Vivienda",
    data: [
      { x: "Ene", y: 7500 },
      { x: "Feb", y: 7800 },
      { x: "Mar", y: 8000 },
    ]
  },
  {
    id: "Alimentación",
    data: [
      { x: "Ene", y: 2800 },
      { x: "Feb", y: 3200 },
      { x: "Mar", y: 3500 },
    ]
  },
  {
    id: "Transporte",
    data: [
      { x: "Ene", y: 2500 },
      { x: "Feb", y: 2200 },
      { x: "Mar", y: 2000 },
    ]
  }
]

const colors = {
  Vivienda: "hsl(var(--chart-2))",
  Alimentación: "hsl(var(--chart-1))",
  Transporte: "hsl(var(--chart-3))"
}

export function CategoryTrends() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Tendencias por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 120, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ 
              type: 'linear',
              min: 0,
              max: 'auto',
              stacked: false,
              reverse: false
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: value => formatCurrency(value as number)
            }}
            colors={d => colors[d.id as keyof typeof colors]}
            pointSize={8}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={0}
            areaOpacity={0.15}
            useMesh={true}
            enableSlices="x"
            crosshairType="cross"
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
              }
            ]}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: 'hsl(var(--foreground))',
                    fontSize: 11
                  }
                }
              },
              grid: {
                line: {
                  stroke: 'hsl(var(--border))',
                  strokeWidth: 1,
                  strokeDasharray: '4 4'
                }
              },
              crosshair: {
                line: {
                  stroke: 'hsl(var(--foreground))',
                  strokeWidth: 1,
                  strokeOpacity: 0.35
                }
              },
              tooltip: {
                container: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '12px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { CategoryTrends } 