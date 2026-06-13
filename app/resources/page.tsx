import type { Metadata } from "next";
import { ResourceDirectory } from "@/components/resources/resource-directory";

export const metadata: Metadata = {
  title: "Recursos oficiales",
  description: "Enlaces oficiales de Sercotec para programas, postulaciones, atencion y transparencia."
};

export default function ResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <ResourceDirectory />
    </section>
  );
}
