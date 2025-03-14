import { useState } from "react";
import styles from "./Llamadas.module.css";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
import CallAnalysisPage from "../CallAnalysisPage"; // Ajusta la ruta si es necesario
import { analyzeCall } from "@/app/CallAnalysisAPI";

export default function Llamadas() {
  const [subpages, setSubpages] = useState<string[]>([]);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulación de llamadas disponibles
  const calls = [
    {
      id: "1",
      title: "Llamada con Soporte - Facturación",
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
  ];

  // Manejar selección de llamada y análisis de sentimientos
  const handleSelectCall = async (transcript: string) => {
    setSelectedCall(transcript);
    setAnalysisData(null);
    setLoading(true);

    const data = await analyzeCall(transcript);

    setAnalysisData({ ...data, transcript }); // Agregar transcript al análisis
    setLoading(false);
  };

  return (
    <div className={`${styles.pageContainer} p-6`}>
      <PageIndicator
        icon="phone"
        title="Llamadas"
        subpages={subpages}
        onPageChange={setSubpages}
      />

      {/* Contenedor principal con padding adicional en los costados */}
      <div className="max-w-screen-xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calls.map((call) => (
            <div
              key={call.id}
              className="flex flex-col p-6 gap-4 bg-white shadow-md rounded-lg border border-gray-200 
  min-w-[320px] transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {call.title}
              </h3>

              <button
                className="bg-blue-600 text-white py-1 px-3 text-sm rounded-md hover:bg-blue-700 transition-all 
    mt-2 self-start" // Cambios aquí para alineación a la izquierda
                onClick={() => handleSelectCall(call.transcript)}
              >
                Analizar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <svg
            className="animate-spin h-5 w-5 text-blue-600 mr-3"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p className="text-gray-500">Analizando llamada...</p>
        </div>
      )}

      {/* Mostrar análisis si ya se obtuvo */}
      {analysisData && (
        <div className="block w-full mt-10">
          <CallAnalysisPage
            analysisData={analysisData}
            transcript={selectedCall}
          />
        </div>
      )}
    </div>
  );
}
