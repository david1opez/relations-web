"use client"

import { useState } from "react"
import styles from "./admin.module.css"

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle"
import { Tabs } from "@/components/tabs/Tabs"
import { LineChartComponent } from "@/components/lineChart/LineChart"

const KPI_DATA = [
  {
    title: "Duración promedio de la llamada",
    value: "22m 36s",
    sub: "-1m 12s",
    subDesc: "Comparado con el mes anterior",
    negative: true,
  },
  {
    title: "Porcentaje de resolución de problemas",
    value: "87.5%",
    sub: "+2.3%",
    subDesc: "Comparado con el mes anterior",
    negative: false,
  },
  {
    title: "Porcentaje de satisfacción",
    value: "92.1%",
    sub: "+4.7%",
    subDesc: "Positiva: 92.1% | Negativa: 7.9%",
    negative: false,
  },
]

const TABS = ["Duración promedio", "Resolución de problemas", "Satisfacción"]

const CHART_DATA = [24.8, 24.2, 25.7, 23.9, 22.5, 21.2, 19.8, 20.7, 22.1, 20.3, 20.9, 21.4, 21.8, 21.7]
const CHART_LABELS = [
  "01/05",
  "02/05",
  "03/05",
  "04/05",
  "05/05",
  "06/05",
  "07/05",
  "08/05",
  "09/05",
  "10/05",
  "11/05",
  "12/05",
  "13/05",
  "14/05",
]

const RESOLUTION_DATA = [82, 83, 86, 85, 84, 87, 88, 86, 85, 87, 89, 90, 88, 87]
const SATISFACTION_DATA = [90, 88, 92, 91, 89, 93, 94, 92, 90, 91, 93, 95, 92, 91]

export default function Admin() {
  const [activeTab, setActiveTab] = useState(0)

  const getChartData = () => {
    switch (activeTab) {
      case 0:
        return CHART_DATA
      case 1:
        return RESOLUTION_DATA
      case 2:
        return SATISFACTION_DATA
      default:
        return CHART_DATA
    }
  }

  const getChartTitle = () => {
    switch (activeTab) {
      case 0:
        return "Tendencia de duración promedio de llamadas"
      case 1:
        return "Tendencia de resolución de problemas"
      case 2:
        return "Tendencia de satisfacción"
      default:
        return "Tendencia de duración promedio de llamadas"
    }
  }

  return (
    <div className="pageContainer">
      <PageTitle
        title="Admin"
        icon="activity"
        subpages={[]}
      />

      <div className={styles.kpiRow}>
        {KPI_DATA.map((kpi, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.cardTitle}>{kpi.title}</div>
            <div className={styles.cardValue}>{kpi.value}</div>
            <div className={kpi.negative ? `${styles.cardSub} ${styles.cardNegative}` : styles.cardSub}>{kpi.sub}</div>
            <p className={styles.cardDescription}>
              {kpi.subDesc}
            </p>
          </div>
        ))}
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.chartSection}>
        <LineChartComponent data={getChartData()} labels={CHART_LABELS} />
      </div>
    </div>
  )
}
