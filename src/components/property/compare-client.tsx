"use client";

import { useEffect, useState } from "react";
import { GitCompareArrows } from "lucide-react";
import { useCompare } from "@/lib/stores";
import { CompareTable } from "@/components/property/compare-table";
import { EmptyState } from "@/components/shared/empty-state";

export function CompareClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const compareIds = useCompare((s) => s.ids);

  if (!mounted) {
    return <div className="h-64 animate-pulse rounded-none bg-paper-dim" />;
  }

  if (compareIds.length === 0) {
    return (
      <EmptyState
        icon={<GitCompareArrows className="h-6 w-6" />}
        title="Nothing to compare yet"
        description="Tick “Compare” on any listing card to line homes up side by side — price per square foot, walkability, monthly cost and more."
        actionLabel="Browse listings"
      />
    );
  }

  return <CompareTable />;
}
