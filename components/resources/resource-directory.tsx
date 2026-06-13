import { Building2, CircleHelp, ExternalLink, FileSearch, Landmark, Megaphone } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

const resourceGroups = [
  {
    title: "Programas y postulaciones",
    description: "Bases, convocatorias y canales oficiales para revisar oportunidades vigentes.",
    icon: Megaphone,
    links: [
      { label: "Portal de postulantes", href: "https://portal.sercotec.cl/" },
      { label: "Registro y datos de usuario", href: "https://misdatos.sercotec.cl/" },
      { label: "Capital Semilla Emprende", href: "https://www.sercotec.cl/programas/capital-semilla-emprende/" },
      { label: "Capital Abeja Emprende", href: "https://www.sercotec.cl/programas/capital-abeja-emprende/" },
      { label: "Postulaciones abiertas", href: "https://www.sercotec.cl/postulaciones-abiertas/" }
    ]
  },
  {
    title: "Orientacion y atencion",
    description: "Canales institucionales para consultas, oficinas regionales y preguntas frecuentes.",
    icon: CircleHelp,
    links: [
      { label: "Contacto Sercotec", href: "https://www.sercotec.cl/contacto/" },
      { label: "Oficinas regionales", href: "https://www.sercotec.cl/oficinas/" },
      { label: "Preguntas frecuentes", href: "https://www.sercotec.cl/preguntas-frecuentes/" }
    ]
  },
  {
    title: "Transparencia y participacion",
    description: "Informacion publica y mecanismos oficiales de participacion ciudadana.",
    icon: Landmark,
    links: [
      {
        label: "Acceso a informacion relevante",
        href: "https://sitios.sercotec.cl/participacion-ciudadana/acceso-a-la-informacion-relevante/"
      },
      { label: "Portal de Transparencia", href: "https://www.portaltransparencia.cl/" },
      { label: "Participacion ciudadana", href: "https://sitios.sercotec.cl/participacion-ciudadana/" }
    ]
  }
] as const;

export function ResourceDirectory() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-civic-teal">Fuentes institucionales</p>
        <h1 className="mt-2 text-3xl font-bold text-civic-ink">Recursos oficiales de Sercotec</h1>
        <p className="mt-3 text-base leading-7 text-civic-muted">
          Accesos directos para consultar programas, convocatorias, canales de atencion y mecanismos de transparencia. Estos enlaces complementan la
          revision de reportes y patrones observados en esta plataforma independiente.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {resourceGroups.map((group) => {
          const Icon = group.icon;
          return (
            <Card className="h-full" key={group.title}>
              <CardHeader>
                <Icon aria-hidden="true" className="text-civic-blue" size={24} />
                <h2 className="mt-3 text-lg font-bold text-civic-ink">{group.title}</h2>
                <p className="mt-2 text-sm leading-6 text-civic-muted">{group.description}</p>
              </CardHeader>
              <CardBody>
                <ul className="divide-y divide-civic-line">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className="flex min-h-14 items-center justify-between gap-3 py-3 text-sm font-semibold text-civic-blue hover:underline"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span>{link.label}</span>
                        <ExternalLink aria-hidden="true" className="shrink-0" size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="flex items-start gap-3 border-l-4 border-civic-teal bg-white px-5 py-4 text-sm leading-6 text-civic-muted">
        <Building2 aria-hidden="true" className="mt-0.5 shrink-0 text-civic-teal" size={20} />
        <p>
          Verifica siempre fechas, requisitos y versiones de bases directamente en los sitios oficiales. Los reportes reunidos aqui no reemplazan
          una respuesta institucional ni un procedimiento formal.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-civic-muted">
        <FileSearch aria-hidden="true" className="text-civic-blue" size={18} />
        <span>Los enlaces se abren en una pestana nueva.</span>
      </div>
    </div>
  );
}
