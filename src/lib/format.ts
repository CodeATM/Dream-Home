export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, "")}M`;
  }
  if (value >= 1000) {
    const k = Math.round(value / 1000);
    return `$${k}K`;
  }
  return `$${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString("en-US", opts ?? {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDays(days: number): string {
  if (days <= 0) return "Listed today";
  if (days === 1) return "Listed yesterday";
  if (days < 7) return `Listed ${days} days ago`;
  if (days < 14) return "Listed 1 week ago";
  if (days < 30) return `Listed ${Math.floor(days / 7)} weeks ago`;
  const months = Math.floor(days / 30);
  return `Listed ${months} ${months === 1 ? "month" : "months"} ago`;
}
