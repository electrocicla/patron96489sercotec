import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/admin-panel";

export const metadata: Metadata = {
  title: "Admin"
};

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <AdminPanel />
    </section>
  );
}
