import { useEffect, useState } from "react";
import styles from "./Llamadas.module.css";

// COMPONENTS
import PageIndicator from "../../components/PageIndicator/PageIndicator";
import CallComponent from "@/components/CallComponent/CallComponent";
import ActivityIndicator from "@/components/ActivityIndicator/ActivityIndicator";

// UTILS
import { analyzeCall } from "@/app/CallAnalysisAPI";
import { calcDuration, parseDate } from "@/utils/dateUtils";

/*const calls = [
  {
    id: "1",
    title: "Llamada con Soporte - Facturación",
    startTime: 1743525221454,
    endTime: 1743525315578,
    attendees: ["Cliente", "Agente de Soporte"],
    transcript:
      "Llamé al servicio al cliente porque tenía problemas con mi factura del mes pasado. Me apareció un cobro duplicado y no sabía por qué. El agente fue amable y me explicó que podría tratarse de un error en el sistema. Después de revisar mi cuenta, me indicó que debía esperar hasta la siguiente facturación para que el ajuste se reflejara automáticamente. Sin embargo, cuando pregunté si había una manera de agilizar el proceso, me dijeron que no podían hacer nada. Insistí en que necesitaba el reembolso lo antes posible, pero me dijeron que debía esperar al menos 48 horas para una revisión adicional. Al final, me quedé sin una solución inmediata y con la preocupación de que el problema pudiera repetirse en el futuro.",
  },
  {
    id: "2",
    title: "Llamada con Ventas - Promoción",
    transcript:
      "Llamé para preguntar sobre una promoción que vi en un anuncio en línea. La oferta parecía interesante, ya que ofrecía un descuento del 50% en el primer mes del servicio. El representante de ventas me explicó que la promoción solo aplicaba para clientes nuevos y que, como ya tenía una cuenta con ellos, no podía acceder al descuento. Intenté negociar y pregunté si había algún otro beneficio que pudiera aprovechar, pero me dijeron que no. Aunque la persona que me atendió fue cortés, sentí que no había mucha flexibilidad en las políticas de la empresa. Finalmente, decidí no tomar la promoción porque no cumplía mis expectativas y el precio regular me parecía demasiado alto.",
  },
  {
    id: "3",
    title: "Llamada con Soporte Técnico - Internet lento",
    transcript:
      "Desde hace varios días, he notado que mi conexión a Internet es muy lenta, incluso para tareas básicas como abrir correos o navegar en páginas web. Llamé al soporte técnico y el agente realizó algunas pruebas de velocidad. Me pidió que desconectara mi router y lo volviera a encender, pero eso no mejoró la situación. Luego, revisaron el estado de la red en mi área y detectaron que había una sobrecarga de usuarios en la zona, lo que estaba afectando la velocidad de conexión. Me dijeron que podían escalar el problema al departamento técnico, pero que no me garantizaban una solución rápida. Además, mencionaron que si quería una mejor estabilidad, debía considerar cambiar a un plan más costoso con mayor velocidad. Aunque entendí el problema, me sentí frustrado porque no obtuve una solución inmediata.",
  },
  {
    id: "4",
    title: "Llamada con Atención al Cliente - Tarjeta bloqueada",
    transcript:
      "Intenté hacer una compra en línea y mi tarjeta fue rechazada sin motivo aparente. Llamé al banco y, tras un tiempo en espera, me informaron que la tarjeta había sido bloqueada por seguridad debido a una transacción sospechosa. Me pidieron que verificara algunos datos personales y confirmara si había intentado hacer esa compra. Tras validar mi identidad, me dijeron que la tarjeta estaba activa nuevamente y que debía esperar unos minutos antes de volver a intentarlo. Pregunté si había una manera de evitar este tipo de bloqueos en el futuro, y me sugirieron habilitar notificaciones en la app del banco para recibir alertas de posibles fraudes. Aunque agradecí la ayuda, el proceso fue tedioso y tardó más de lo esperado.",
  },
  {
    id: "5",
    title: "Llamada con Soporte - Problema con envío",
    transcript:
      "Hice un pedido hace más de dos semanas y todavía no me llega. Decidí llamar a la empresa de envíos para averiguar qué estaba pasando. Después de proporcionar mi número de seguimiento, me informaron que hubo un error en la dirección de entrega y que el paquete había sido devuelto al centro de distribución. Pregunté si podían corregir la dirección y enviarlo de nuevo, y me dijeron que sí, pero que eso tomaría otros cinco días hábiles. Me ofrecieron un pequeño descuento en mi próxima compra como compensación, pero aun así me sentí molesto porque necesitaba el producto con urgencia. Al final, acepté la reprogramación del envío, pero quedé con una mala impresión del servicio.",
  },
  {
    id: "6",
    title: "Llamada con Recursos Humanos - Información sobre vacante",
    transcript:
      "Vi una oferta de empleo en su sitio web y me interesó mucho la posición. Llamé a Recursos Humanos para solicitar más información sobre las responsabilidades del puesto y los requisitos. Me dijeron que aún estaban en proceso de selección y que recibiría un correo si mi perfil era compatible. Intenté obtener detalles sobre el salario y los beneficios adicionales, pero la persona que me atendió no tenía acceso a esa información y solo podía darme datos generales. También pregunté sobre el proceso de entrevista y me explicaron que consistía en varias etapas, incluyendo una prueba técnica y una entrevista con el gerente del área. Aunque fue útil hablar con ellos, me hubiera gustado recibir más información detallada antes de postularme.",
  },
  {
    id: "7",
    title: "Llamada con Finanzas - Error en cobro",
    transcript:
      "Revisé mi estado de cuenta y noté un cargo inesperado que no reconocía. Llamé al departamento de Finanzas para averiguar a qué correspondía. Me informaron que el cargo era por una suscripción que supuestamente había activado, pero de la cual no tenía conocimiento. Les pedí que revisaran el historial de pagos y me dijeron que, según su sistema, el cargo era legítimo y no podían reembolsarlo de inmediato. Abrí una disputa y me indicaron que la revisión tomaría hasta 10 días hábiles. Aunque me aseguraron que me mantendrían informado, sigo preocupado porque el monto es alto y necesito que se solucione lo antes posible.",
  },
  {
    id: "8",
    title: "Llamada con Soporte Técnico - Problema con software",
    transcript:
      "Desde la última actualización, el software que utilizamos en la empresa ha estado fallando constantemente. Llamé a soporte técnico y me pidieron que reinstalara la aplicación, pero el problema persistió. Después de varias pruebas, el técnico determinó que el error se debía a una incompatibilidad con una nueva versión del sistema operativo. Me dijeron que estaban trabajando en una solución, pero que no podían garantizar cuándo estaría disponible un parche. Mientras tanto, me ofrecieron una solución temporal que implicaba desactivar algunas funciones, lo cual no era ideal. Al final, agradecí la ayuda, pero no me quedé del todo satisfecho con la respuesta.",
  },
  {
    id: "9",
    title: "Llamada con Atención al Cliente - Cancelación de suscripción",
    transcript:
      "Quería cancelar mi suscripción porque encontré una alternativa más económica. Sin embargo, al intentar hacerlo desde la página web, no encontré la opción adecuada. Llamé a servicio al cliente y el agente intentó convencerme de quedarme ofreciéndome un descuento especial por tres meses. Aunque la oferta era tentadora, ya había tomado mi decisión. Después de insistir varias veces, el agente finalmente procesó la cancelación, pero el proceso tomó más tiempo del que esperaba. Al final, recibí un correo de confirmación, pero me pareció que la empresa hace el proceso innecesariamente difícil para que los usuarios se rindan y no cancelen.",
  },
  {
    id: "10",
    title: "Llamada con Servicio de Entrega - Pedido dañado",
    transcript:
      "Recibí mi paquete y, al abrirlo, noté que el producto estaba dañado. Inmediatamente llamé al servicio de entrega para reportar el problema. Me dijeron que debía tomar fotos del paquete y enviarlas por correo para iniciar un reclamo. Luego de revisar la evidencia, me ofrecieron dos opciones: recibir un reemplazo sin costo adicional o un reembolso completo. Opté por el reemplazo, pero me informaron que el nuevo envío tardaría al menos una semana. Aunque aprecié la solución, me preocupó que el empaque no protegiera bien el producto y que esto pudiera volver a ocurrir en el futuro.",
  },
];*/

// TYPES
type CallDetails = {
  finalSatisfaction: string;
  llmInsights: {
    estado_emocional_final: string;
    motivo_llamada: string;
    razon_resolucion: string;
    resumen: string;
    se_resolvio: boolean;
  };
  ociAnalysis: {
    documentSentiment: string;
    lastSentence: string;
    lastSentiment: string;
    relevantAspects: Array<{
      text: string;
      sentiment: string;
      confidence: number;
    }>;
  };
};

type Call = {
  callID: string;
  title: string;
  startTime: number;
  endTime: number;
  summary: string;
  attendees?: string[];
}


export default function Llamadas() {
  const [loading, setLoading] = useState<boolean>(true);

  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call|null>(null);
  const [callDetails, setCallDetails] = useState<CallDetails|null>(null);
  const [subpages, setSubpages] = useState<string[]>([]);

  const handleSelectCall = async (id: string) => {
    setLoading(true);

    let callFound = calls.find((call) => call.callID === id);
    try {
      const response = await fetch(`https://relations-data-api.vercel.app/call/details?callID=${id}`);
      callFound = await response.json();
    } catch (error) {
      console.error("Error fetching call details:", error);
    }

    setSelectedCall(callFound as Call);

    setSubpages([callFound?.title || "Llamada"]);

    const data: CallDetails = await analyzeCall(callFound?.summary || "");

    if (data) setCallDetails(data);
    else console.error("Error fetching call details");

    setLoading(false);
  };

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://relations-data-api.vercel.app/call/calls?projectID=1"); 
      const data: Call[] = await response.json();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(subpages.length === 0) {
      fetchCalls();
      setCallDetails(null);
      setSelectedCall(null);
      setLoading(false);
    }
  }, [subpages]);

  return (
    <div className={styles.pageContainer}>
      <PageIndicator
        title="Llamadas"
        icon="phone"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      {
        subpages.length === 0 ? (
          <div className={styles.contentContainer}>
            <div className={styles.callsContainer}>
              {calls.map((call, index) => (
                <CallComponent
                  key={index}
                  onClick={handleSelectCall}
                  call={call as { callID: string; title: string; attendees: string[]; startTime: number; endTime: number; }}
                />
              ))}
            </div>
          </div> 
        ) : (
          <div className={styles.callDetailsContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.thirdContainer} style={{display: "flex", gap: "1.5rem"}}>
                <div className={styles.weirdContainer}>
                  <div className={styles.sectionTitleContainer}>
                    <h3 className={styles.sectionTitle} title="Información sobre la satisfacción">
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
                      <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="var(--blue)" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                      <path d="M16 19V18C16.7911 18 17.5645 17.7654 18.2223 17.3259C18.8801 16.8864 19.3928 16.2616 19.6955 15.5307C19.9983 14.7998 20.0775 13.9956 19.9231 13.2196C19.7688 12.4437 19.3878 11.731 18.8284 11.1716C18.269 10.6122 17.5563 10.2312 16.7804 10.0769C16.0044 9.92252 15.2002 10.0017 14.4693 10.3045C13.7384 10.6072 13.1136 11.1199 12.6741 11.7777C12.2346 12.4355 12 13.2089 12 14" stroke="var(--blue)" strokeWidth="3" stroke-linecap="round" strokeLinejoin="round"/>
                      <path d="M16 24.5C16.8284 24.5 17.5 23.8284 17.5 23C17.5 22.1716 16.8284 21.5 16 21.5C15.1716 21.5 14.5 22.1716 14.5 23C14.5 23.8284 15.1716 24.5 16 24.5Z" fill="var(--blue)"/>
                    </svg>
                  </div>
                  <div
                    className={styles.callDetailsContentContainer}
                    style={{
                      border: `2px solid ${callDetails?.finalSatisfaction === "Negativa" ? "var(--red)" : callDetails?.finalSatisfaction === "Positiva" ? "var(--green)" : "var(--white)"}`,
                    }}
                  >
                    {
                      !loading ? (
                        <div style={{position: "relative", width: "100%"}}>
                          {
                            callDetails?.finalSatisfaction === "Negativa" ? (
                              <svg className={styles.satisfactionIcon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="var(--red)" strokeWidth="1.5" stroke-miterlimit="10"/>
                                <path d="M23 12L19 16" stroke="var(--red)" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M23 16L19 12" stroke="var(--red)" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M13 12L9 16" stroke="var(--red)" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M13 16L9 12" stroke="var(--red)" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="var(--red)"/>
                              </svg>
                            ) : callDetails?.finalSatisfaction === "Positiva" ? (
                              <svg className={styles.satisfactionIcon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="var(--green)" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M21.1973 18.9995C20.6701 19.9113 19.9124 20.6683 19.0001 21.1947C18.0879 21.721 17.0532 21.9981 16 21.9981C14.9468 21.9981 13.9122 21.721 12.9999 21.1947C12.0876 20.6684 11.3299 19.9114 10.8027 18.9996" stroke="var(--green)" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z" fill="var(--green)"/>
                                <path d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z" fill="var(--green)"/>
                              </svg>
                            ) : (
                              <svg className={styles.satisfactionIcon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="var(--gray)" strokeWidth="2" stroke-miterlimit="10"/>
                                <path d="M11 20H21" stroke="var(--gray)" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                                <path d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z" fill="var(--gray)"/>
                                <path d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z" fill="var(--gray)"/>
                              </svg>
                            )
                          }

                          <div className={styles.callDetailsContent}>
                            <p className={styles.label}>Sentimiento general:</p>
                            <p
                              className={styles.text}
                              style={{
                                color: callDetails?.finalSatisfaction === "Negativa" ? "var(--red)" : callDetails?.finalSatisfaction === "Positiva" ? "var(--green)" : "var(--gray)",
                              }}
                            >
                                {callDetails?.ociAnalysis?.documentSentiment}
                            </p>
                          </div>
                          <div className={styles.callDetailsContent} style={{width: "100%"}}>
                            <p className={styles.label}>Estado emocional final:</p>
                            <p className={styles.text}>{callDetails?.llmInsights?.estado_emocional_final}</p>
                          </div>
                          <div className={styles.callDetailsContent}>
                            <p className={styles.label}>Se resolvió:</p>
                            <p className={styles.text}>{callDetails?.llmInsights?.se_resolvio ? "Sí" : "No"}</p>
                          </div>
                        </div>
                      ) : (
                        <ActivityIndicator color="var(--blue)"/>
                      )
                    }
                  </div>
                </div>
                <div className={styles.weirdContainer}>
                  <div className={styles.sectionTitleContainer}>
                    <h3 className={styles.sectionTitle} title="Información sobre Detalles">Detalles:</h3>
                    <svg
                      className={styles.infoIcon}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="var(--blue)" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
                      <path d="M16 19V18C16.7911 18 17.5645 17.7654 18.2223 17.3259C18.8801 16.8864 19.3928 16.2616 19.6955 15.5307C19.9983 14.7998 20.0775 13.9956 19.9231 13.2196C19.7688 12.4437 19.3878 11.731 18.8284 11.1716C18.269 10.6122 17.5563 10.2312 16.7804 10.0769C16.0044 9.92252 15.2002 10.0017 14.4693 10.3045C13.7384 10.6072 13.1136 11.1199 12.6741 11.7777C12.2346 12.4355 12 13.2089 12 14" stroke="var(--blue)" strokeWidth="3" stroke-linecap="round" strokeLinejoin="round"/>
                      <path d="M16 24.5C16.8284 24.5 17.5 23.8284 17.5 23C17.5 22.1716 16.8284 21.5 16 21.5C15.1716 21.5 14.5 22.1716 14.5 23C14.5 23.8284 15.1716 24.5 16 24.5Z" fill="var(--blue)"/>
                    </svg>
                  </div>
                  <div className={styles.callDetailsContentContainer}>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Título:</p>
                      <p className={styles.text}>{selectedCall?.title}</p>
                    </div>
                    <div className={styles.callDetailsContent}>
                      <p className={styles.label}>Asistentes:</p>
                      <p className={styles.text}>{selectedCall?.attendees?.join(", ")}</p>
                    </div>
                    <div style={{display: "flex", gap: "2rem"}}>
                      <div className={styles.callDetailsContent}>
                        <p className={styles.label}>Fecha:</p>
                        <p className={styles.text}>{parseDate(selectedCall?.startTime || 0)}</p>
                      </div>
                      <div className={styles.callDetailsContent}>
                        <p className={styles.label}>Duración:</p>
                        <p className={styles.text}>{calcDuration(selectedCall?.startTime || 0, selectedCall?.endTime || 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.thirdContainer}>
                <h3 className={styles.sectionTitle} title="Información sobre Resumen">Resumen:</h3>
                <div className={styles.callDetailsContentContainer}>
                  {
                    !loading ? (
                      <p className={styles.text} style={{fontWeight: 300}}>{callDetails?.llmInsights?.resumen}</p>
                    ) : (
                      <ActivityIndicator color="var(--blue)" />
                    )
                  }
                  
                </div>
              </div>
              <div className={styles.thirdContainer}>
                <h3 className={styles.sectionTitle} title="Información sobre Palabras Clave">Palabras clave:</h3>
                <div className={styles.callDetailsContentContainer}>
                  {
                    !loading ? callDetails?.ociAnalysis?.relevantAspects.map((aspect, index) => (
                      <div key={index} className={styles.aspectContainer}>
                        <p className={styles.aspectText}>{aspect.text}</p>
                        <p
                          className={styles.aspectSentiment}
                          style={{
                            border: `1px solid ${aspect.sentiment === "Negative" ? "var(--red)" : aspect.sentiment === "Positive" ? "var(--green)" : "var(--gray)"}`,
                            color: aspect.sentiment === "Negative" ? "var(--red)" : aspect.sentiment === "Positive" ? "var(--green)" : "var(--gray)",
                          }}
                        >
                          {aspect.sentiment}
                          <span style={{marginLeft: "0.3rem"}}>
                            {aspect.confidence ? ` (${Math.round(aspect.confidence * 100)}%)` : "" }
                          </span>
                        </p>
                      </div>
                    )) : (
                      <ActivityIndicator color="var(--blue)" />
                    )
                  }
                </div>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.thirdContainer}>
                <h3 className={styles.sectionTitle} title="Información sobre Resolución">Resolución:</h3>
                <div className={styles.callDetailsContentContainer}>
                  {
                    !loading ? (
                      <div>
                        <div className={styles.callDetailsContent}>
                          <p className={styles.label}>Motivo de la llamada:</p>
                          <p className={styles.text}>{callDetails?.llmInsights?.motivo_llamada}</p>
                        </div>
                        <div className={styles.callDetailsContent}>
                          <p className={styles.label}>Resolución:</p>
                          <p className={styles.text}>{callDetails?.llmInsights?.razon_resolucion}</p>
                        </div>
                        <div className={styles.callDetailsContent}>
                          <p className={styles.label}>Última frase:</p>
                          <p className={styles.text}>&quot;{callDetails?.ociAnalysis?.lastSentence}&quot;</p>
                        </div>
                      </div>
                    ) : (
                      <ActivityIndicator color="var(--blue)" />
                    )
                  }
                </div>
              </div>
              <div className={styles.fullContainer}>
                <h3 className={styles.sectionTitle} title="Información sobre la Transcripción">Transcripción:</h3>
                <div className={styles.callDetailsContentContainer}>
                  <p className={styles.text} style={{fontWeight: 300}}>{selectedCall?.summary}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}
