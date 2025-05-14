// src/components/CallComponent/CallComponent.tsx
import { useState } from "react";
import styles from "./CallComponent.module.css";
import { calcDuration, parseDate } from "@/utils/dateUtils";
import AssignProjectPopup from "./AssignProjectPopup";

interface Call {
  id: string;
  title: string;
  startDate: number;
  endDate: number;
  transcript: string;
  attendees: string[];
}

interface CallComponentProps {
  call: Call;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CallComponent({ call, onClick, onDelete }: CallComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAssignProjectOpen, setIsAssignProjectOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    setIsMenuOpen(false);

    switch (action) {
      case "view":
        onClick(call.id);
        break;
      case "assign":
        setIsAssignProjectOpen(true);
        break;
      case "delete":
        onDelete?.(call.id);
        break;
    }
  };

  return (
    <>
      <div className={styles.callCard}>
        <svg
          className={styles.phoneIcon}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.0667 22.56V26.56C29.0683 26.9313 28.9891 27.298 28.8341 27.6351C28.6791 27.9722 28.4519 28.2726 28.1695 28.5162C27.887 28.7598 27.5558 28.9411 27.1977 29.0477C26.8396 29.1543 26.4627 29.1837 26.0934 29.1333C22.2175 28.6602 18.5137 27.2851 15.2534 25.1067C12.2123 23.1114 9.64275 20.5418 7.64736 17.5007C5.46137 14.2256 4.08611 10.5046 3.62002 6.61333C3.56973 6.24562 3.59886 5.87036 3.70475 5.51375C3.81064 5.15714 3.99079 4.82725 4.23305 4.54563C4.47531 4.264 4.77424 4.03711 5.10997 3.88181C5.44571 3.72651 5.81124 3.64646 6.18202 3.64666H10.182C10.8273 3.64021 11.4524 3.85875 11.9452 4.26523C12.438 4.67171 12.7633 5.23755 12.8667 5.86666C13.0711 7.18749 13.4454 8.47549 13.9814 9.70666C14.1811 10.1757 14.2298 10.6939 14.1213 11.1924C14.0128 11.6909 13.7516 12.1466 13.3734 12.5067L11.6534 14.2267C13.5012 17.3506 16.0494 19.8988 19.1734 21.7467L20.8934 20.0267C21.2535 19.6484 21.7092 19.3872 22.2077 19.2787C22.7062 19.1702 23.2243 19.219 23.6934 19.4187C24.9246 19.9547 26.2126 20.329 27.5334 20.5333C28.1722 20.6379 28.7463 20.9694 29.1556 21.472C29.5649 21.9745 29.7802 22.6116 29.7667 23.2667L29.0667 22.56Z"
            stroke="#B4E1F8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className={styles.callContent}>
          <div className={styles.callSummary}>
            <h3 className={styles.callTitle}>{call.title}</h3>
            <p className={styles.callAttendees}>
              Asistentes: {call.attendees.join(", ")}
            </p>
          </div>

          <div className={styles.callMeta}>
            <span>{parseDate(call.startDate)}</span>
            <span>{calcDuration(call.startDate, call.endDate)}</span>
          </div>
        </div>

        <div className={styles.menuContainer}>
          <button className={styles.menuButton} onClick={handleMenuClick}>
            <svg
              className={styles.menuIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99999C10.8334 9.53976 10.4603 9.16666 10 9.16666C9.53978 9.16666 9.16669 9.53976 9.16669 9.99999C9.16669 10.4602 9.53978 10.8333 10 10.8333Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 4.99999C10.4603 4.99999 10.8334 4.62689 10.8334 4.16666C10.8334 3.70642 10.4603 3.33333 10 3.33333C9.53978 3.33333 9.16669 3.70642 9.16669 4.16666C9.16669 4.62689 9.53978 4.99999 10 4.99999Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8333C10.8334 15.3731 10.4603 15 10 15C9.53978 15 9.16669 15.3731 9.16669 15.8333C9.16669 16.2936 9.53978 16.6667 10 16.6667Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className={styles.menu}>
              <div
                className={styles.menuItem}
                onClick={(e) => handleMenuItemClick(e, "view")}
              >
                Ver transcripción
              </div>
              <div
                className={styles.menuItem}
                onClick={(e) => handleMenuItemClick(e, "assign")}
              >
                Asignar a proyecto
              </div>
              <div
                className={styles.menuItem}
                onClick={(e) => handleMenuItemClick(e, "delete")}
              >
                Eliminar
              </div>
            </div>
          )}
        </div>
      </div>

      <AssignProjectPopup
        isOpen={isAssignProjectOpen}
        onClose={() => setIsAssignProjectOpen(false)}
        title={call.title}
        attendees={call.attendees}
        date={parseDate(call.startDate)}
        duration={calcDuration(call.startDate, call.endDate)}
      />
    </>
  );
}