"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Phone, Mail, Star } from "lucide-react";
import type { Agent, Property } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { ScheduleTourDialog } from "./schedule-tour-dialog";

export function TourSection({
  property,
  agent,
}: {
  property: Property;
  agent: Agent;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href={`/agents/${agent.slug}`} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-ink/5">
          <Image
            src={unsplash(agent.photo, 128, 128)}
            alt={agent.name}
            fill
            sizes="56px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="img-editorial object-cover"
          />
        </Link>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-heading text-base font-bold text-navy">
            {agent.name}
            <span className="flex items-center gap-0.5 font-sans text-xs font-semibold text-accent">
              <Star className="h-3 w-3 fill-accent text-accent" strokeWidth={0} />
              {agent.rating.toFixed(1)}
            </span>
          </p>
          <p className="text-[13px] text-ink-dim">{agent.title}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <Button className="w-full rounded-xl" size="lg" onClick={() => setOpen(true)}>
          <CalendarDays className="h-4 w-4" strokeWidth={1.75} /> Schedule a Viewing
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="outline" size="lg" asChild className="rounded-xl">
            <a href={`tel:${agent.phone}`}>
              <Phone className="h-4 w-4" strokeWidth={1.75} /> Call
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-xl">
            <a href={`mailto:${agent.email}`}>
              <Mail className="h-4 w-4" strokeWidth={1.75} /> Email
            </a>
          </Button>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-dim/60">
        Contact agent for more information
      </p>

      <ScheduleTourDialog property={property} open={open} onOpenChange={setOpen} />

      {/* Sticky mobile bar */}
      <MobileStickyBar onOpen={() => setOpen(true)} price={property.price} isRent={property.status === "for-rent"} />
    </>
  );
}

function MobileStickyBar({
  onOpen,
  price,
  isRent,
}: {
  onOpen: () => void;
  price: number;
  isRent: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-ink/5 bg-white/95 px-4 py-3.5 backdrop-blur-2xl sm:hidden">
      <div>
        <p className="font-heading text-lg font-bold leading-none text-navy">
          ${Math.round(price / 1000)}K{isRent ? "/mo" : ""}
        </p>
        <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-dim">
          Tours available 7 days
        </p>
      </div>
      <Button onClick={onOpen} className="rounded-xl">
        <CalendarDays className="h-4 w-4" strokeWidth={1.75} /> Schedule Viewing
      </Button>
    </div>
  );
}
