import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

interface LineChartProps {
  data: number[]
  labels: string[]
  type?: 'duration' | 'percentage'
}

export function LineChartComponent({ data, labels, type = 'duration' }: LineChartProps) {
  const chartData = data.map((value, index) => ({
    value,
    label: labels[index],
  }))

  const formatValue = (value: number) => {
    if (type === 'duration') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return `${minutes}m ${seconds}s`
    }
    return `${value}%`
  }

  const formatYAxis = (value: number) => {
    if (type === 'duration') {
      return `${Math.floor(value / 60)}m`
    }
    return `${value}%`
  }

  const formatTooltip = (value: number) => {
    if (type === 'duration') {
      const minutes = Math.floor(value / 60)
      const seconds = value % 60
      return [`${minutes}m ${seconds}s`, "Duración"]
    }
    return [`${value}%`, "Porcentaje"]
  }

  return (
    <div className="h-[300px] w-full">
      <LineChart width={800} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="label"
          stroke="var(--light-gray)"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatYAxis}
          domain={type === 'duration' ? ["dataMin - 2", "dataMax + 2"] : [0, 100]}
          stroke="var(--light-gray)"
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--gray)",
            borderColor: "var(--light-gray)",
            color: "var(--white)",
          }}
          labelStyle={{ color: "var(--light-gray)", fontSize: 12 }}
          formatter={formatTooltip}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--accent)"
          strokeWidth={2}
          activeDot={{ r: 6, fill: "var(--accent)" }}
        />
      </LineChart>
    </div>
  )
}
