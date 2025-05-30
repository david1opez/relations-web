import { Call, CallDetails } from "@/types/CallItemTypes";
import styles from "./CallInsightsPopup.module.css";
import ActivityIndicator from "@/components/activityIndicator/ActivityIndicator";
import { parseDate, calcDuration } from "@/utils/dateUtils";

interface CallInsightsPopupProps {
  selectedCall: Call | null;
  callDetails: CallDetails | null;
  loading: boolean;
  onClose: () => void;
}

export default function CallInsightsPopup({
  selectedCall,
  callDetails,
  loading,
  onClose,
}: CallInsightsPopupProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.callDetailsContainer}>
          <div className={styles.leftContainer}>
            <div
              className={styles.thirdContainer}
              style={{ display: "flex", gap: "1.5rem" }}
            >
              <div className={styles.weirdContainer}>
                <div className={styles.sectionTitleContainer}>
                  <h3
                    className={styles.sectionTitle}
                    title="Información sobre la satisfacción"
                  >
                    Satisfacción:
                  </h3>
                  <svg
                    className={styles.infoIcon}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                      stroke="var(--blue)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 19V18C16.7911 18 17.5645 17.7654 18.2223 17.3259C18.8801 16.8864 19.3928 16.2616 19.6955 15.5307C19.9983 14.7998 20.0775 13.9956 19.9231 13.2196C19.7688 12.4437 19.3878 11.731 18.8284 11.1716C18.269 10.6122 17.5563 10.2312 16.7804 10.0769C16.0044 9.92252 15.2002 10.0017 14.4693 10.3045C13.7384 10.6072 13.1136 11.1199 12.6741 11.7777C12.2346 12.4355 12 13.2089 12 14"
                      stroke="var(--blue)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 24.5C16.8284 24.5 17.5 23.8284 17.5 23C17.5 22.1716 16.8284 21.5 16 21.5C15.1716 21.5 14.5 22.1716 14.5 23C14.5 23.8284 15.1716 24.5 16 24.5Z"
                      fill="var(--blue)"
                    />
                  </svg>
                </div>
                <div
                  className={styles.callDetailsContentContainer}
                  style={{
                    border: `2px solid ${
                      callDetails?.finalSatisfaction === "Negativa"
                        ? "var(--red)"
                        : callDetails?.finalSatisfaction === "Positiva"
                        ? "var(--green)"
                        : "var(--white)"
                    }`,
                  }}
                >
                  {!loading ? (
                    <div style={{ position: "relative", width: "100%" }}>
                      {callDetails?.finalSatisfaction === "Negativa" ? (
                        <svg
                          className={styles.satisfactionIcon}
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                            stroke="var(--red)"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M23 12L19 16"
                            stroke="var(--red)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23 16L19 12"
                            stroke="var(--red)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 12L9 16"
                            stroke="var(--red)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 16L9 12"
                            stroke="var(--red)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z"
                            fill="var(--red)"
                          />
                        </svg>
                      ) : callDetails?.finalSatisfaction === "Positiva" ? (
                        <svg
                          className={styles.satisfactionIcon}
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                            stroke="var(--green)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21.1973 18.9995C20.6701 19.9113 19.9124 20.6683 19.0001 21.1947C18.0879 21.721 17.0532 21.9981 16 21.9981C14.9468 21.9981 13.9122 21.721 12.9999 21.1947C12.0876 20.6684 11.3299 19.9114 10.8027 18.9996"
                            stroke="var(--green)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z"
                            fill="var(--green)"
                          />
                          <path
                            d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z"
                            fill="var(--green)"
                          />
                        </svg>
                      ) : (
                        <svg
                          className={styles.satisfactionIcon}
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                            stroke="var(--gray)"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M11 20H21"
                            stroke="var(--gray)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z"
                            fill="var(--gray)"
                          />
                          <path
                            d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z"
                            fill="var(--gray)"
                          />
                        </svg>
                      )}

                      <div className={styles.callDetailsContent}>
                        <p className={styles.label}>Sentimiento general:</p>
                        <p
                          className={styles.text}
                          style={{
                            color:
                              callDetails?.finalSatisfaction === "Negativa"
                                ? "var(--red)"
                                : callDetails?.finalSatisfaction === "Positiva"
                                ? "var(--green)"
                                : "var(--gray)",
                          }}
                        >
                          {callDetails?.ociAnalysis?.documentSentiment}
                        </p>
                      </div>
                      <div
                        className={styles.callDetailsContent}
                        style={{ width: "100%" }}
                      >
                        <p className={styles.label}>Estado emocional final:</p>
                        <p className={styles.text}>
                          {callDetails?.llmInsights?.estado_emocional_final}
                        </p>
                      </div>
                      <div className={styles.callDetailsContent}>
                        <p className={styles.label}>Se resolvió:</p>
                        <p className={styles.text}>
                          {callDetails?.llmInsights?.se_resolvio ? "Sí" : "No"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ActivityIndicator color="var(--blue)" />
                  )}
                </div>
              </div>

              <div className={styles.weirdContainer}>
                <div className={styles.sectionTitleContainer}>
                  <h3
                    className={styles.sectionTitle}
                    title="Información sobre Detalles"
                  >
                    Detalles:
                  </h3>
                  <svg
                    className={styles.infoIcon}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                      stroke="var(--blue)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 19V18C16.7911 18 17.5645 17.7654 18.2223 17.3259C18.8801 16.8864 19.3928 16.2616 19.6955 15.5307C19.9983 14.7998 20.0775 13.9956 19.9231 13.2196C19.7688 12.4437 19.3878 11.731 18.8284 11.1716C18.269 10.6122 17.5563 10.2312 16.7804 10.0769C16.0044 9.92252 15.2002 10.0017 14.4693 10.3045C13.7384 10.6072 13.1136 11.1199 12.6741 11.7777C12.2346 12.4355 12 13.2089 12 14"
                      stroke="var(--blue)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 24.5C16.8284 24.5 17.5 23.8284 17.5 23C17.5 22.1716 16.8284 21.5 16 21.5C15.1716 21.5 14.5 22.1716 14.5 23C14.5 23.8284 15.1716 24.5 16 24.5Z"
                      fill="var(--blue)"
                    />
                  </svg>
                </div>
                <div className={styles.callDetailsContentContainer}>
                  <div className={styles.callDetailsContent}>
                    <p className={styles.label}>Título:</p>
                    <p className={styles.text}>{selectedCall?.title}</p>
                  </div>
                  <div className={styles.callDetailsContent}>
                    <p className={styles.label}>Asistentes:</p>
                    <p className={styles.text}>
                      {selectedCall?.attendees?.join(", ")}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Fecha:</p>
                      <p className={styles.text}>
                        {parseDate(selectedCall?.startTime || 0)}
                      </p>
                    </div>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Duración:</p>
                      <p className={styles.text}>
                        {calcDuration(
                          selectedCall?.startTime || 0,
                          selectedCall?.endTime || 0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.thirdContainer}>
              <h3 className={styles.sectionTitle} title="Información sobre Resumen">
                Resumen:
              </h3>
              <div className={styles.callDetailsContentContainer}>
                {!loading ? (
                  <p className={styles.text} style={{ fontWeight: 300 }}>
                    {callDetails?.llmInsights?.resumen}
                  </p>
                ) : (
                  <ActivityIndicator color="var(--blue)" />
                )}
              </div>
            </div>

            <div className={styles.thirdContainer}>
              <h3
                className={styles.sectionTitle}
                title="Información sobre Palabras Clave"
              >
                Palabras clave:
              </h3>
              <div className={styles.callDetailsContentContainer}>
                {!loading ? (
                  callDetails?.ociAnalysis?.relevantAspects?.length ? (
                    callDetails.ociAnalysis.relevantAspects.map((aspect, i) => (
                      <div key={i} className={styles.aspectContainer}>
                        <p className={styles.aspectText}>{aspect.text}</p>
                        <p
                          className={styles.aspectSentiment}
                          style={{
                            border: `1px solid ${
                              aspect.sentiment === "Negative"
                                ? "var(--red)"
                                : aspect.sentiment === "Positive"
                                ? "var(--green)"
                                : "var(--gray)"
                            }`,
                            color:
                              aspect.sentiment === "Negative"
                                ? "var(--red)"
                                : aspect.sentiment === "Positive"
                                ? "var(--green)"
                                : "var(--gray)",
                          }}
                        >
                          {aspect.sentiment}
                          <span style={{ marginLeft: "0.3rem" }}>
                            {aspect.confidence
                              ? ` (${Math.round(aspect.confidence * 100)}%)`
                              : ""}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                  <p className={styles.text} style={{ fontStyle: "italic", color: "rgba(255, 255, 255, 0.7)" }}>
                    No se encontraron palabras clave para esta llamada.
                  </p>
                  )
                ) : (
                  <ActivityIndicator color="var(--blue)" />
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.thirdContainer}>
              <h3 className={styles.sectionTitle} title="Información sobre Resolución">
                Resolución:
              </h3>
              <div className={styles.callDetailsContentContainer}>
                {!loading ? (
                  <>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Motivo de la llamada:</p>
                      <p className={styles.text}>
                        {callDetails?.llmInsights?.motivo_llamada}
                      </p>
                    </div>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Resolución:</p>
                      <p className={styles.text}>
                        {callDetails?.llmInsights?.razon_resolucion}
                      </p>
                    </div>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Última frase:</p>
                      <p className={styles.text}>
                        &quot;{callDetails?.ociAnalysis?.lastSentence}&quot;
                      </p>
                    </div>
                  </>
                ) : (
                  <ActivityIndicator color="var(--blue)" />
                )}
              </div>
            </div>

            <div className={styles.fullContainer}>
              <h3
                className={styles.sectionTitle}
                title="Información sobre la Transcripción"
              >
                Transcripción:
              </h3>
              <div className={styles.callDetailsContentContainer}>
                <p className={styles.text} style={{ fontWeight: 300 }}>
                  {selectedCall?.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
