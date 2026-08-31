import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Dashboard } from "@/components/shared/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your saved homes, searches, alerts and tours.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Dashboard" }]} />
      </div>
      <Dashboard />
    </div>
  );
}
