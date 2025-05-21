"use client"
import styles from "./Tabs.module.css"

interface TabsProps {
  tabs: string[]
  activeTab: number
  onTabChange: (index: number) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}
