import { ArrowRight, BarChart3, FileCheck2, Landmark, LockKeyhole, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

const principles = [
  {
    icon: LockKeyhole,
    title: "Privacidad estricta",
    text: "Se solicita ocultar RUT, correos, telefonos, direcciones, folios privados y datos de terceros antes de subir evidencia."
  },
  {
    icon: ShieldCheck,
    title: "Lenguaje responsable",
    text: "Los reportes describen hechos verificables y patrones observados, sin acusaciones personales ni imputaciones no probadas."
  },
  {
    icon: FileCheck2,
    title: "Trazabilidad",
    text: "Cada caso puede incluir programa, region, estado, puntaje, corte informado y mensajes recibidos para comparar consistencia."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-civic-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Transparencia civica independiente</p>
            <h1 className="text-4xl font-bold leading-tight text-civic-ink sm:text-5xl">
              Evidencia Resultados para casos Sercotec con puntajes repetidos o poco trazables.
            </h1>
            <p className="mt-5 text-lg leading-8 text-civic-muted">
              Reunimos reportes voluntarios de postulantes, especialmente cuando aparece el puntaje 96,489, estados poco claros o mensajes repetidos.
              El objetivo es ordenar antecedentes y facilitar revision publica responsable, no realizar imputaciones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/report">
                Reportar mi caso
                <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <ButtonLink href="/stats" tone="secondary">
                <BarChart3 aria-hidden="true" size={18} />
                Ver estadisticas
              </ButtonLink>
              <ButtonLink href="/resources" tone="quiet">
                <Landmark aria-hidden="true" size={18} />
                Recursos oficiales
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-civic-line bg-civic-panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-muted">Foco inicial</p>
            <div className="mt-6 rounded-md bg-white p-5 shadow-sm">
              <span className="text-sm text-civic-muted">Puntaje observado</span>
              <strong className="mt-2 block text-5xl font-bold text-civic-blue">96,489</strong>
              <p className="mt-4 text-sm leading-6 text-civic-muted">
                Este numero se usa como criterio de agrupacion inicial para detectar repeticiones, no como conclusion automatica sobre irregularidad.
              </p>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-white p-4">
                <dt className="text-civic-muted">Datos publicados</dt>
                <dd className="mt-1 font-semibold text-civic-ink">Anonimizados</dd>
              </div>
              <div className="rounded-md bg-white p-4">
                <dt className="text-civic-muted">Revision</dt>
                <dd className="mt-1 font-semibold text-civic-ink">Moderada</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardBody>
                  <Icon aria-hidden="true" className="text-civic-blue" size={24} />
                  <h2 className="mt-4 text-lg font-bold text-civic-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-civic-muted">{item.text}</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-civic-line pt-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-civic-ink">Consulta tambien las fuentes institucionales</h2>
            <p className="mt-1 text-sm leading-6 text-civic-muted">
              Revisa programas, postulaciones, oficinas, preguntas frecuentes y mecanismos de transparencia en Sercotec.
            </p>
          </div>
          <ButtonLink className="shrink-0" href="/resources" tone="secondary">
            Ver recursos
            <ArrowRight aria-hidden="true" size={16} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
