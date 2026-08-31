import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-paper-deep", className)} />
  );
}

export function RouteSkeleton({
  hero = false,
  grid = 0,
  sidebar = false,
}: {
  hero?: boolean;
  grid?: number;
  sidebar?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {hero && (
        <div className="space-y-4">
          <Bar className="h-3.5 w-32" />
          <Bar className="h-14 w-2/3 max-w-xl" />
          <Bar className="h-4 w-1/2 max-w-md" />
        </div>
      )}
      {hero && grid > 0 && (
        <div className="mt-8 aspect-[16/9] animate-pulse rounded-xl bg-paper-deep" />
      )}
      {grid > 0 && !hero && (
        <div
          className={cn(
            "mt-8 grid gap-5 sm:grid-cols-2",
            sidebar && "lg:grid-cols-[280px_minmax(0,1fr)]",
            grid >= 3 && "lg:grid-cols-3"
          )}
        >
          {sidebar && (
            <div className="hidden space-y-6 rounded-xl border border-ink/5 bg-white p-5 shadow-soft lg:block">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Bar className="h-3 w-24" />
                  <Bar className="h-9 w-full" />
                </div>
              ))}
            </div>
          )}
          <div className={cn("grid gap-5", grid >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
            {[...Array(grid)].map((_, i) => (
              <div key={i} className="rounded-xl bg-white shadow-soft border border-ink/5">
                <div className="aspect-[4/3] animate-pulse bg-paper-dim rounded-t-xl" />
                <div className="space-y-3 p-5">
                  <Bar className="h-4 w-3/4" />
                  <Bar className="h-3 w-1/2" />
                  <div className="flex gap-4 pt-1">
                    <Bar className="h-3 w-12" />
                    <Bar className="h-3 w-12" />
                    <Bar className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
