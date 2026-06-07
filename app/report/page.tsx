import type { Metadata } from "next";
import { ReportForm } from "@/components/report/report-form";

export const metadata: Metadata = {
  title: "Reportar caso"
};

export default function ReportPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <ReportForm />
    </section>
  );
}
