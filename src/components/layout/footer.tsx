"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Properties",
    links: [
      { label: "Homes for sale", href: "/buy" },
      { label: "Rentals", href: "/rent" },
      { label: "Commercial", href: "/sell" },
      { label: "Saved homes", href: "/saved" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our agents", href: "/agents" },
      { label: "Neighborhood guides", href: "/neighborhoods" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Buyer's guide", href: "/resources" },
      { label: "Seller's guide", href: "/resources" },
      { label: "Market reports", href: "/resources" },
      { label: "Blog", href: "/resources" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-paper">
                Meridian
              </span>
              <span className="mt-1 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-paper/30">
                Exceptional Spaces. Better Living.
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-paper/45">
              Thoughtfully managed residential and commercial properties in
              prime locations. Property management you can trust.
            </p>

            <div className="mt-8 space-y-2 text-[13px] text-paper/55">
              <p>(800) 555-0199</p>
              <p>hello@meridian.estate</p>
              <p>1200 Congress Ave, Austin TX</p>
            </div>

            <div className="mt-8 flex gap-3">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <span
                  key={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[10px] font-medium uppercase tracking-wider text-paper/40 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/30">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-paper/55 transition-colors duration-300 hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/30">
              Stay informed
            </h3>
            <p className="mt-5 text-[13px] leading-relaxed text-paper/45">
              Market notes and new listings, monthly. Never noise.
            </p>
            {subscribed ? (
              <p className="mt-5 flex items-center gap-2 text-[13px] text-paper">
                <CheckCircle2 className="h-4 w-4 text-accent" /> You&rsquo;re on
                the list
              </p>
            ) : (
              <form
                className="mt-5 flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubscribed(true);
                }}
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-12 rounded-r-none border-white/10 bg-transparent text-paper placeholder:text-paper/25 focus-visible:border-accent focus-visible:ring-accent"
                />
                <Button
                  type="submit"
                  variant="accent"
                  className="h-12 shrink-0 rounded-l-none border-l-0 px-6 shadow-glow transition-shadow duration-300 hover:shadow-hard-accent"
                >
                  Join
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 text-[11px] tracking-wide text-paper/25 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Meridian Estates LLC</p>
          <p>Equal Housing Opportunity &middot; Privacy &middot; Terms</p>
        </div>
      </div>
    </footer>
  );
}
