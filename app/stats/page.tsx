import type { Metadata } from "next";
import { StatsDashboard } from "@/components/stats/stats-dashboard";

export const metadata: Metadata = {
  title: "Estadisticas",
  description: "Indicadores agregados de reportes y patrones observados en antecedentes anonimizados."
};

export default function StatsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <StatsDashboard />
    </section>
  );
}
