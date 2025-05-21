import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

interface LineChartProps {
  data: number[]
  labels: string[]
}

export function LineChartComponent({ data, labels }: LineChartProps) {
  const chartData = data.map((value, index) => ({
    value,
    label: labels[index],
  }))

  return (
    <div className="h-[300px] w-full">
      <LineChart width={800} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="label"
          stroke="var(--light-gray)"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => `${value}m`}
          domain={["dataMin - 2", "dataMax + 2"]}
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
          formatter={(value) => [`${value}m`, "Duración"]}
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
