import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodologia"
};

export default function MethodologyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-civic-ink">Metodologia</h1>
      <div className="mt-6 space-y-5 text-base leading-7 text-civic-muted">
        <p>
          La plataforma clasifica reportes por programa, region, estado informado, puntaje normalizado, corte comunicado y tipo de evidencia. El
          puntaje 96,489 se marca como patron de observacion cuando aparece en el campo de puntaje.
        </p>
        <p>
          Los totales publicos dependen de reportes moderados y datos anonimizados. Los registros no publicados pueden mantenerse en revision o
          rechazarse por privacidad, duplicacion o falta de informacion minima.
        </p>
        <p>
          El analisis busca consistencia documental y comparacion agregada. No reemplaza procedimientos formales de reclamo, auditoria ni acceso a la
          informacion publica.
        </p>
      </div>
    </section>
  );
}
