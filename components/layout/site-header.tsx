import Link from "next/link";
import { BarChart3, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const navItems = [
  { href: "/report", label: "Reportar" },
  { href: "/stats", label: "Estadisticas" },
  { href: "/methodology", label: "Metodologia" },
  { href: "/privacy", label: "Privacidad" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-civic-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link className="flex items-center gap-3 text-civic-ink" href="/">
          <span className="flex size-10 items-center justify-center rounded-md bg-civic-blue text-white">
            <FileText aria-hidden="true" size={20} />
          </span>
          <span>
            <span className="block text-base font-bold">Evidencia Resultados</span>
            <span className="block text-xs text-civic-muted">patron96489sercotec</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link className="rounded-md px-3 py-2 text-sm font-medium text-civic-muted hover:bg-civic-panel hover:text-civic-ink" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <ButtonLink className="hidden sm:inline-flex" href="/stats" tone="secondary">
            <BarChart3 aria-hidden="true" size={16} />
            Ver estadisticas
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
