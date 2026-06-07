import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos"
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-civic-ink">Terminos de uso</h1>
      <div className="mt-6 space-y-5 text-base leading-7 text-civic-muted">
        <p>
          Los reportes deben corresponder a experiencias propias o evidencia que la persona remitente tenga derecho a compartir. No se aceptan
          acusaciones personales, insultos, datos sensibles de terceros ni documentos no anonimizados.
        </p>
        <p>
          Evidencia Resultados organiza antecedentes para transparencia civica. La aparicion de patrones, incluyendo el puntaje 96,489, no constituye
          por si misma una conclusion sobre conducta indebida.
        </p>
        <p>La administracion puede moderar, rechazar o no publicar reportes que incumplan estos criterios.</p>
      </div>
    </section>
  );
}
