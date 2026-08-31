"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import type { Property } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { useTours, useAuth } from "@/lib/stores";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

function slotsForDate(date: Date): string[] {
  const seed = date.getDate() + date.getMonth() * 31;
  return TIME_SLOTS.filter((_, i) => (seed * (i + 3)) % 5 !== 0);
}

export function ScheduleTourDialog({
  property,
  open,
  onOpenChange,
}: {
  property: Property;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addTour = useTours((s) => s.addTour);
  const user = useAuth((s) => s.user);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [confirmed, setConfirmed] = useState<{ date: Date; time: string } | null>(null);

  const availableSlots = useMemo(
    () => (date ? slotsForDate(date) : []),
    [date]
  );

  const disabledDays = useMemo(() => {
    return [{ before: new Date() }];
  }, []);

  const submit = () => {
    if (!date || !time || !name.trim() || !email.includes("@")) return;
    addTour({
      propertySlug: property.slug,
      propertyTitle: property.title,
      propertyImage: unsplash(property.images[0], 400, 300),
      address: property.address,
      date: date.toISOString(),
      time,
      contactName: name.trim(),
      contactEmail: email.trim(),
    });
    setConfirmed({ date, time });
  };

  const reset = () => {
    setDate(undefined);
    setTime(null);
    setConfirmed(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!open) setTimeout(reset, 300);
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 pr-8">
            <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={unsplash(property.images[0], 128, 112)}
                alt={property.title}
                fill
                sizes="64px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="img-editorial object-cover"
              />
            </div>
            <div className="min-w-0">
              <DialogTitle>Schedule a Viewing</DialogTitle>
              <DialogDescription className="truncate">
                {property.address}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {confirmed ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </span>
            <h3 className="masthead mt-4 text-xl text-navy">
              Viewing confirmed!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink-dim">
              You&rsquo;re booked for{" "}
              <span className="font-semibold text-navy">
                {confirmed.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {confirmed.time}
              </span>
              . We&apos;ve sent the details to {email} — your agent will meet you at
              the property.
            </p>
            <Button variant="outline" className="mt-6 rounded-xl" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
            <div className="mx-auto sm:mx-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setTime(null);
                }}
                disabled={disabledDays}
                className="rounded-xl border border-ink/5 bg-white"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy">
                  <Clock className="h-4 w-4 text-ink-dim" /> Available times
                </p>
                {date ? (
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const available = availableSlots.includes(t);
                      return (
                        <button
                          key={t}
                          disabled={!available}
                          onClick={() => setTime(t)}
                          className={cn(
                            "rounded-xl border px-2 py-2 text-xs font-semibold transition",
                            !available &&
                              "cursor-not-allowed border-ink/5 bg-paper-deep/30 text-ink-dim/40 line-through",
                            available && time !== t && "border-ink/8 bg-white hover:border-accent/30",
                            available && time === t && "border-navy bg-navy text-paper"
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="rounded-xl bg-paper-deep/50 px-3 py-3 text-sm text-ink-dim">
                    Pick a date to see available times.
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <Button
                className="w-full rounded-xl"
                size="lg"
                disabled={!date || !time || !name.trim() || !email.includes("@")}
                onClick={submit}
              >
                <CalendarDays className="h-4 w-4" />
                Confirm Viewing{time ? ` · ${time}` : ""}
              </Button>
              <p className="text-xs text-ink-dim">
                Free &middot; No obligation &middot; Cancel anytime from your dashboard
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
