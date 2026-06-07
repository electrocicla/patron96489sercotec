import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-civic-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-civic-muted sm:grid-cols-[1fr_auto] sm:px-6">
        <p>
          Evidencia Resultados recopila reportes voluntarios y evidencia anonimizables sobre resultados de postulacion. La plataforma no atribuye
          intenciones ni responsabilidades; organiza antecedentes para trazabilidad civica.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-civic-blue" href="/terms">
            Terminos
          </Link>
          <Link className="hover:text-civic-blue" href="/privacy">
            Privacidad
          </Link>
          <Link className="hover:text-civic-blue" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
