import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-civic-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-5 px-3 py-6 text-xs leading-5 text-civic-muted sm:grid-cols-[1fr_auto] sm:px-6 sm:py-8 sm:text-sm">
        <p className="max-w-3xl">
          Evidencia Resultados recopila reportes voluntarios y evidencia anonimizables sobre resultados de postulacion. La plataforma no atribuye
          intenciones ni responsabilidades; organiza antecedentes para trazabilidad civica.
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-4">
          <Link className="hover:text-civic-blue" href="/terms" prefetch={false}>
            Terminos
          </Link>
          <Link className="hover:text-civic-blue" href="/privacy" prefetch={false}>
            Privacidad
          </Link>
          <Link className="hover:text-civic-blue" href="/resources" prefetch={false}>
            Recursos oficiales
          </Link>
          <Link className="hover:text-civic-blue" href="/methodology" prefetch={false}>
            Metodologia
          </Link>
          <Link className="hover:text-civic-blue" href="/admin" prefetch={false}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
