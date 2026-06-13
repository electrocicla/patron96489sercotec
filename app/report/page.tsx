import type { Metadata } from "next";
import { ReportForm } from "@/components/report/report-form";

export const metadata: Metadata = {
  title: "Reportar caso"
};

export default function ReportPage() {
  return (
    <section className="mx-auto max-w-4xl px-2 py-4 min-[360px]:px-3 sm:px-6 sm:py-10">
      <ReportForm />
    </section>
  );
}
