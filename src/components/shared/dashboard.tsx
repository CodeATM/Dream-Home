"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Heart,
  Bookmark,
  Bell,
  CalendarDays,
  Trash2,
  Pencil,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Clock3,
} from "lucide-react";
import type { NotificationItem } from "@/data/types";
import { seedNotifications } from "@/data/notifications";
import {
  useFavorites,
  useSearches,
  useTours,
  useAuth,
  type TourBooking,
} from "@/lib/stores";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "searches", label: "Saved Searches" },
  { value: "alerts", label: "Alerts" },
  { value: "tours", label: "My Tours" },
  { value: "settings", label: "Account Settings" },
];

function StatCard({
  href,
  icon,
  value,
  label,
  accent = false,
}: {
  href: string;
  icon: React.ReactNode;
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-xl border border-ink/5 bg-white p-6 shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-0.5 hover:shadow-hard",
        accent ? "border-transparent bg-moss text-paper" : "border-ink/5 bg-white"
      )}
    >
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accent ? "bg-white/10 text-accent" : "bg-paper-deep text-accent-deep")}>
        {icon}
      </span>
      <p className={cn("mt-4 font-heading text-4xl tracking-tight", accent ? "text-paper" : "text-ink")}>
        {value}
      </p>
      <p className={cn("mt-1 flex items-center gap-1 text-sm", accent ? "text-paper/60" : "text-ink-dim")}>
        {label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

function OverviewPanel({
  favCount,
  searchCount,
  upcomingCount,
  unreadCount,
  tours,
}: {
  favCount: number;
  searchCount: number;
  upcomingCount: number;
  unreadCount: number;
  tours: TourBooking[];
}) {
  const notifications = seedNotifications.slice(0, 2);
  const items = [
    ...notifications.map((n) => ({
      id: n.id,
      icon:
        n.kind === "price-drop" ? (
          <TrendingDown className="h-4 w-4 text-emerald-500" />
        ) : (
          <Sparkles className="h-4 w-4 text-accent" />
        ),
      title: n.title,
      body: n.body,
      time: n.time,
      slug: n.propertySlug ?? "",
    })),
    ...tours.slice(0, 2).map((t) => ({
      id: t.id,
      icon: <CalendarDays className="h-4 w-4 text-ink-dim" />,
      title: `Tour booked — ${formatDate(t.date)} at ${t.time}`,
      body: `${t.propertyTitle}`,
      time: "",
      slug: t.propertySlug,
    })),
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard href="/saved" accent icon={<Heart className="h-5 w-5" />} value={favCount} label="Saved homes" />
      <StatCard href="/dashboard" icon={<Bookmark className="h-5 w-5" />} value={searchCount} label="Saved searches" />
      <StatCard href="/dashboard" icon={<CalendarDays className="h-5 w-5" />} value={upcomingCount} label="Upcoming tours" />
      <StatCard href="/dashboard" icon={<Bell className="h-5 w-5" />} value={unreadCount} label="Unread alerts" />

      <div className="sm:col-span-2 lg:col-span-4">
        <h3 className="mb-4 font-display text-xl font-semibold text-ink">Recent activity</h3>
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink/10 p-6 text-center text-sm text-ink-dim">
              Nothing yet — save a home or book a tour to get things moving.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 rounded-xl border border-ink/5 bg-white p-4 shadow-soft"
              >
                <span className="mt-0.5">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  {item.slug ? (
                    <Link href={`/listings/${item.slug}`} className="text-sm font-semibold text-ink hover:text-accent-deep">
                      {item.title}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                  )}
                  <p className="truncate text-sm text-ink-dim">{item.body}</p>
                </div>
                {item.time && (
                  <span className="ml-auto shrink-0 text-xs text-ink-dim">{item.time}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SearchesPanel() {
  const saved = useSearches((s) => s.saved);
  const removeSaved = useSearches((s) => s.removeSaved);
  const renameSaved = useSearches((s) => s.renameSaved);
  const router = useRouter();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  return (
    <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-ink">Saved searches</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href="/buy">New search</Link>
        </Button>
      </div>
      {saved.length === 0 ? (
        <EmptyState
          className="border-0 bg-paper py-10"
          icon={<Bookmark className="h-6 w-6" />}
          title="No saved searches"
          description="Set filters on any listings page and hit “Save search” — we'll flag new matches here."
          actionLabel="Browse homes"
          actionHref="/buy"
        />
      ) : (
        <ul className="divide-y divide-ink/8">
          {saved.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-3 py-4">
              {renamingId === s.id ? (
                <>
                  <Input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        renameSaved(s.id, renameValue || s.label);
                        setRenamingId(null);
                      }
                    }}
                    className="max-w-xs"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      renameSaved(s.id, renameValue || s.label);
                      setRenamingId(null);
                    }}
                  >
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setRenamingId(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate font-medium text-ink">
                      {s.label}
                      {s.newCount > 0 && (
                        <Badge variant="accent" className="shrink-0">
                          {s.newCount} new match{s.newCount > 1 ? "es" : ""}
                        </Badge>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-dim">
                      {s.mode === "buy" ? "Buying" : "Renting"} · ~{s.matchCount} results · saved{" "}
                      {formatDate(s.createdAt)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => router.push(`/${s.mode}`)}
                  >
                    View results
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Rename search"
                    onClick={() => {
                      setRenamingId(s.id);
                      setRenameValue(s.label);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete search"
                    onClick={() => removeSaved(s.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AlertsPanel() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  useEffect(() => setNotifications(seedNotifications), []);

  return (
    <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
      <h3 className="mb-4 font-display text-xl font-semibold text-ink">Notifications</h3>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex items-start gap-3.5 rounded-xl border p-4 transition",
              n.read ? "border-ink/5 bg-white" : "border-accent/40 bg-paper-deep/70"
            )}
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              {n.kind === "price-drop" ? (
                <TrendingDown className="h-4 w-4 text-emerald-500" />
              ) : n.kind === "new-match" ? (
                <Sparkles className="h-4 w-4 text-accent" />
              ) : (
                <CalendarDays className="h-4 w-4 text-ink-dim" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                {n.title}
                {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </p>
              <p className="mt-0.5 text-sm text-ink-dim">{n.body}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="text-xs text-ink-dim">{n.time}</span>
              {!n.read && (
                <button
                  onClick={() =>
                    setNotifications((list) =>
                      list.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                    )
                  }
                  className="text-xs font-medium text-accent-deep hover:text-accent"
                >
                  Mark read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToursPanel() {
  const tours = useTours((s) => s.tours);
  const cancelTour = useTours((s) => s.cancelTour);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const sorted = [...tours].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return {
      upcoming: sorted.filter((t) => new Date(t.date) >= now),
      past: sorted.filter((t) => new Date(t.date) < now).reverse(),
    };
  }, [tours]);

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
        <h3 className="mb-4 font-display text-xl font-semibold text-ink">Upcoming tours</h3>
        {upcoming.length === 0 ? (
          <EmptyState
            className="border-0 bg-paper py-10"
            icon={<CalendarDays className="h-6 w-6" />}
            title="No tours scheduled"
            description="Find a home you like and grab a time slot — agents confirm instantly."
            actionLabel="Find a home"
            actionHref="/buy"
          />
        ) : (
          <ul className="space-y-4">
            {upcoming.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-ink/5 p-4">
                <Image
                  src={t.propertyImage}
                  alt={t.propertyTitle}
                  width={96}
                  height={72}
                  unoptimized
                  className="h-[72px] w-24 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/listings/${t.propertySlug}`}
                    className="truncate font-semibold text-ink hover:text-accent-deep"
                  >
                    {t.propertyTitle}
                  </Link>
                  <p className="truncate text-sm text-ink-dim">{t.address}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> Confirmed ·{" "}
                    {formatDate(t.date, { weekday: "short", month: "short", day: "numeric" })} at {t.time}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => cancelTour(t.id)}>
                  Cancel tour
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 && (
        <section className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
          <h3 className="mb-4 font-display text-xl font-semibold text-ink">Past tours</h3>
          <ul className="space-y-3 opacity-80">
            {past.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-paper-deep p-3.5 text-sm">
                <Clock3 className="h-4 w-4 text-ink-dim" />
                <span className="font-medium text-ink">{formatDate(t.date)}</span>
                <Link href={`/listings/${t.propertySlug}`} className="truncate underline-offset-2 hover:underline">
                  {t.propertyTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

const profileSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^[+\d][\d\s\-().]{6,}$/, "Enter a valid phone"),
});
type ProfileInput = z.infer<typeof profileSchema>;

function SettingsPanel() {
  const user = useAuth((s) => s.user);
  const updateUser = useAuth((s) => s.signIn);
  const signOut = useAuth((s) => s.signOut);
  const router = useRouter();
  const [prefs, setPrefs] = useState({
    newListings: true,
    priceDrops: true,
    tourReminders: true,
    newsletter: false,
  });
  const [savedMsg, setSavedMsg] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "(555) 010-2288",
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    await new Promise((r) => setTimeout(r, 500));
    updateUser({ name: data.name, email: data.email });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-ink/5 bg-white p-6 shadow-none">
          <h3 className="font-display text-xl font-semibold text-ink">Profile</h3>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex items-center gap-3 pt-1">
            <Button type="submit">Save changes</Button>
            {savedMsg && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Updated
              </span>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-6">
        <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
          <h3 className="font-display text-xl font-semibold text-ink">Contact preferences</h3>
          <ul className="mt-4 space-y-3">
            {([
              ["newListings", "New listing matches"],
              ["priceDrops", "Price drop alerts"],
              ["tourReminders", "Tour reminders"],
              ["newsletter", "Monthly market newsletter"],
            ] as const).map(([key, label]) => (
              <li key={key} className="flex items-center justify-between rounded-xl bg-paper-deep px-4 py-3">
                <span className="text-sm text-ink-soft">{label}</span>
                <button
                  role="switch"
                  aria-checked={prefs[key]}
                  aria-label={label}
                  onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    prefs[key] ? "bg-ink" : "bg-paper-deep"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      prefs[key] ? "translate-x-[22px]" : "translate-x-0.5"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-none">
          <h3 className="font-display text-lg font-semibold text-ink">Session</h3>
          <p className="mt-2 text-sm text-ink-dim">
            This demo runs fully client-side — sign out clears your session.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("overview");
  useEffect(() => setMounted(true), []);
  const user = useAuth((s) => s.user);
  const favCount = useFavorites((s) => s.ids.length);
  const searchCount = useSearches((s) => s.saved.length);
  const tours = useTours((s) => s.tours);
  const upcomingCount = tours.filter((t) => new Date(t.date) >= new Date()).length;

  if (!mounted) {
    return <div className="h-[480px] animate-pulse rounded-xl bg-paper-dim" />;
  }

  const displayName = user?.name?.trim() || "Guest Explorer";

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-base">
            {displayName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="masthead text-2xl text-ink">
            Welcome back, {displayName.split(" ")[0]}
          </h2>
          <p className="mt-0.5 text-sm text-ink-dim">
            Your saved homes, searches and tours — all in one place.
          </p>
        </div>
      </div>

      {/* Mobile tab select */}
      <div className="mb-4 sm:hidden">
        <Select value={tab} onValueChange={setTab}>
          <SelectTrigger><SelectValue placeholder="Dashboard section" /></SelectTrigger>
          <SelectContent>
            {TABS.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="hidden h-auto justify-start sm:inline-flex">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <OverviewPanel
            favCount={favCount}
            searchCount={searchCount}
            upcomingCount={upcomingCount}
            unreadCount={2}
            tours={tours}
          />
        </TabsContent>
        <TabsContent value="searches"><SearchesPanel /></TabsContent>
        <TabsContent value="alerts"><AlertsPanel /></TabsContent>
        <TabsContent value="tours"><ToursPanel /></TabsContent>
        <TabsContent value="settings"><SettingsPanel /></TabsContent>
      </Tabs>
    </div>
  );
}
