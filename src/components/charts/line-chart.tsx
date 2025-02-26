"use client"

import { ResponsiveLine } from "@nivo/line"

const data = [
  {
    id: "gastos",
    data: [
      { x: "1", y: 1500 },
      { x: "5", y: 2300 },
      { x: "10", y: 3100 },
      { x: "15", y: 4000 },
      { x: "20", y: 4800 },
      { x: "25", y: 5500 },
      { x: "30", y: 6200 },
    ]
  }
]

export function LineChart() {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Día del mes',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Gasto acumulado',
        legendOffset: -40,
        legendPosition: 'middle',
        format: value => `$${value}`
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enablePointLabel={true}
      pointLabel={e => `$${e.y}`}
      pointLabelYOffset={-12}
      enableArea={true}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: 'hsl(var(--foreground))'
            }
          },
          legend: {
            text: {
              fill: 'hsl(var(--foreground))'
            }
          }
        },
        grid: {
          line: {
            stroke: 'hsl(var(--muted))',
          }
        },
        tooltip: {
          container: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
          }
        }
      }}
    />
  )
} 