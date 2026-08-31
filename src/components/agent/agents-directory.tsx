"use client";

import { useMemo, useState } from "react";
import { agents } from "@/data/agents";
import { cities } from "@/data/cities";
import { AgentCard } from "@/components/agent/agent-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { UserX2 } from "lucide-react";

const specialties = Array.from(
  new Set(agents.flatMap((a) => a.specialties))
).sort();

export function AgentsDirectory() {
  const [city, setCity] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const results = useMemo(
    () =>
      agents.filter(
        (a) =>
          (city === "all" || a.citySlug === city) &&
          (specialty === "all" || a.specialties.includes(specialty)) &&
          a.rating >= minRating
      ),
    [city, specialty, minRating]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-3 rounded-none border border-border bg-white p-4 shadow-none">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-[190px]"><SelectValue placeholder="All markets" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All markets</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}, {c.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Any specialty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any specialty</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5 rounded-full bg-paper-dim p-1">
          {[0, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium transition " +
                (minRating === r ? "bg-ink text-white shadow-none" : "text-ink-soft hover:text-ink")
              }
            >
              {r === 0 ? "Any rating" : `${r.toFixed(1)}+ ★`}
            </button>
          ))}
        </div>

        <p className="ml-auto text-sm text-ink-dim">
          <span className="font-semibold text-ink">{results.length}</span>{" "}
          agents match
        </p>
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={<UserX2 className="h-6 w-6" />}
          title="No agents fit that combo"
          description="Try widening the rating threshold or picking another market — we'll grow into your city soon."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((a, i) => (
            <AgentCard key={a.id} agent={a} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
