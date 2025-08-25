"use client"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export interface PieChartData {
  label: string
  value: number
}

const COLORS = [
  '#A46A8F', // Mauve
  '#6AD1E3', // Cyan
  '#A13A2E', // Rust
  '#F6F1D5', // Cream
  '#F6A23A', // Orange
  '#233B54', // Navy
]

export function PieChartComponent({ data }: { data: PieChartData[] }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
