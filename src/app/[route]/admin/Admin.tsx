"use client"

import { useState, useEffect } from "react"
import styles from "./admin.module.css"

// COMPONENTS
import PageTitle from "@/components/pageTitle/PageTitle"
import { Tabs } from "@/components/tabs/Tabs"
import { LineChartComponent } from "@/components/lineChart/LineChart"
import Dropdown from "@/components/dropdown/Dropdown"

// UTILS
import { getCallHistory, CallHistoryResponse, getProjectUsers, ProjectUser } from "@/utils/CallAnalysisAPI"

const TABS = ["Duración promedio", "Resolución de problemas", "Satisfacción"]
const INTERVAL_OPTIONS = ['Diario', 'Semanal', 'Mensual']
const ALL_USERS_OPTION = { userID: 0, name: "Todos los usuarios", projectRole: "" }

const INTERVAL_MAP = {
  'Diario': 'daily',
  'Semanal': 'weekly',
  'Mensual': 'monthly'
} as const

type IntervalType = typeof INTERVAL_MAP[keyof typeof INTERVAL_MAP]

export default function Admin() {
  const [activeTab, setActiveTab] = useState(0)
  const [callHistory, setCallHistory] = useState<CallHistoryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>('daily')
  const [users, setUsers] = useState<ProjectUser[]>([ALL_USERS_OPTION])
  const [selectedUser, setSelectedUser] = useState<number>(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const projectUsers = await getProjectUsers(3)
        setUsers([ALL_USERS_OPTION, ...projectUsers])
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getCallHistory(3, selectedInterval, selectedUser || undefined)
        setCallHistory(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de llamadas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedInterval, selectedUser])

  const getKpiData = () => {
    if (!callHistory || callHistory.intervals.length === 0) return []

    const lastIndex = callHistory.intervals.length - 1
    const previousIndex = lastIndex - 1

    // If we only have one interval, we can't calculate differences
    const hasPreviousData = previousIndex >= 0

    const currentDuration = callHistory.averageDurations[lastIndex]
    const previousDuration = hasPreviousData ? callHistory.averageDurations[previousIndex] : currentDuration
    const durationDiff = hasPreviousData ? currentDuration - previousDuration : 0

    const currentResolution = callHistory.resolvedPercentages[lastIndex]
    const previousResolution = hasPreviousData ? callHistory.resolvedPercentages[previousIndex] : currentResolution
    const resolutionDiff = hasPreviousData ? currentResolution - previousResolution : 0

    const currentSatisfaction = callHistory.positiveSentimentPercentages[lastIndex]
    const previousSatisfaction = hasPreviousData ? callHistory.positiveSentimentPercentages[previousIndex] : currentSatisfaction
    const satisfactionDiff = hasPreviousData ? currentSatisfaction - previousSatisfaction : 0

    const formatDuration = (seconds: number) => {
      if (seconds === 0) return '0s'
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
    }

    return [
      {
        title: "Duración promedio de la llamada",
        value: formatDuration(currentDuration),
        sub: hasPreviousData ? `${durationDiff > 0 ? '+' : ''}${formatDuration(Math.abs(durationDiff))}` : 'Sin datos previos',
        subDesc: hasPreviousData ? "Comparado con el período anterior" : "No hay datos para comparar",
        negative: durationDiff > 0,
      },
      {
        title: "Porcentaje de resolución de problemas",
        value: `${currentResolution}%`,
        sub: hasPreviousData ? `${resolutionDiff > 0 ? '+' : ''}${resolutionDiff.toFixed(1)}%` : 'Sin datos previos',
        subDesc: hasPreviousData ? "Comparado con el período anterior" : "No hay datos para comparar",
        negative: resolutionDiff < 0,
      },
      {
        title: "Porcentaje de satisfacción",
        value: `${currentSatisfaction}%`,
        sub: hasPreviousData ? `${satisfactionDiff > 0 ? '+' : ''}${satisfactionDiff.toFixed(1)}%` : 'Sin datos previos',
        subDesc: `Positiva: ${currentSatisfaction}% | Negativa: ${(100 - currentSatisfaction).toFixed(1)}%`,
        negative: satisfactionDiff < 0,
      },
    ]
  }

  const getChartData = () => {
    if (!callHistory) return []

    switch (activeTab) {
      case 0:
        return callHistory.averageDurations
      case 1:
        return callHistory.resolvedPercentages
      case 2:
        return callHistory.positiveSentimentPercentages
      default:
        return callHistory.averageDurations
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

  const getChartType = () => {
    switch (activeTab) {
      case 0:
        return 'duration'
      case 1:
      case 2:
        return 'percentage'
      default:
        return 'duration'
    }
  }

  return (
    <div className="pageContainer">
      <div className={styles.headerRow}>
        <PageTitle
          title="Admin"
          icon="activity"
          subpages={[]}
        />
        <div className={styles.filters}>
          <div className={styles.intervalSelector}>
            <Dropdown
              options={INTERVAL_OPTIONS}
              value={Object.entries(INTERVAL_MAP).find(([_, value]) => value === selectedInterval)?.[0] || 'Diario'}
              onChange={(value: string) => setSelectedInterval(INTERVAL_MAP[value as keyof typeof INTERVAL_MAP])}
            />
          </div>
          <div className={styles.userSelector}>
            <Dropdown
              options={users.map(user => user.name)}
              value={users.find(user => user.userID === selectedUser)?.name || ALL_USERS_OPTION.name}
              onChange={(value: string) => {
                const user = users.find(u => u.name === value)
                setSelectedUser(user?.userID || 0)
              }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingMessage}>Cargando datos...</div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <>
          <div className={styles.kpiRow}>
            {getKpiData().map((kpi, idx) => (
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
            <LineChartComponent 
              data={getChartData()} 
              labels={callHistory?.intervals || []}
              type={getChartType()}
            />
          </div>
        </>
      )}
    </div>
  )
}
