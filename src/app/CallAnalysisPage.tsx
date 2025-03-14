import { BarChart3, CheckCircle2, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function CallAnalysisPage({ analysisData }) {
  if (!analysisData) {
    return (
      <p className="text-center text-gray-500">No hay análisis disponible.</p>
    );
  }

  const { ociAnalysis, llmInsights, finalSatisfaction } = analysisData;

  // Helper function to get color based on sentiment
  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "mixed":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Análisis de Llamada</h1>

      {/* Main Summary Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Resumen de la Llamada</CardTitle>
            <Badge
              variant="outline"
              className={
                finalSatisfaction === "Negativa"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              }
            >
              Satisfacción: {finalSatisfaction}
            </Badge>
          </div>
          <CardDescription>{llmInsights.resumen}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LLM Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Detalles de la Llamada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Motivo de la llamada
                </dt>
                <dd className="text-base">{llmInsights.motivo_llamada}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  ¿Se resolvió?
                </dt>
                <dd className="flex items-center gap-2">
                  {llmInsights.se_resolvio ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Sí</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>No</span>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Razón
                </dt>
                <dd className="text-base">{llmInsights.razon_resolucion}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Estado emocional final
                </dt>
                <dd className="text-base">
                  {llmInsights.estado_emocional_final}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Sentimientos</CardTitle>
            <CardDescription>
              Última frase:{" "}
              <span className="italic">"{ociAnalysis.lastSentence}"</span>
              <Badge
                className={`ml-2 ${getSentimentColor(
                  ociAnalysis.lastSentiment
                )}`}
              >
                {ociAnalysis.lastSentiment}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ociAnalysis.relevantAspects.length > 0 ? (
                ociAnalysis.relevantAspects.map((aspect, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {aspect.text}
                      </span>
                      <Badge className={getSentimentColor(aspect.sentiment)}>
                        {aspect.sentiment}
                      </Badge>
                    </div>
                    <Progress value={aspect.confidence * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      Confianza: {(aspect.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No se detectaron aspectos relevantes en la llamada.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
