"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import type { Agent } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AgentCard({
  agent,
  priority = false,
}: {
  agent: Agent;
  priority?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="group overflow-hidden rounded-xl bg-white shadow-soft transition-shadow duration-500 ease-luxe hover:shadow-hard"
    >
      <Link href={`/agents/${agent.slug}`} className="block">
        <div className="relative aspect-[4/4.4] overflow-hidden">
          <Image
            src={unsplash(agent.photo, 600, 660)}
            alt={agent.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-eyebrow text-ink backdrop-blur">
            <Star className="h-3 w-3 fill-accent text-accent" strokeWidth={0} />
            {agent.rating.toFixed(1)}
          </span>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-heading text-xl text-white">{agent.name}</h3>
            <p className="mt-1 flex items-center gap-1 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/70">
              <MapPin className="h-3 w-3" strokeWidth={1.75} /> {agent.city} ·{" "}
              {agent.experienceYears} yrs
            </p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[13px] font-medium text-accent-deep">{agent.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            {agent.specialties.slice(0, 2).join(" · ")}
          </p>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-eyebrow text-ink-dim/70">
            {agent.salesCount} homes sold · {agent.reviewsCount} reviews
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
