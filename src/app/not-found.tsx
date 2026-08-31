import Link from "next/link";
import { SearchTriggerButton } from "@/components/layout/search-command-bar";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-accent-deep">
        Error 404 — Off market
      </p>
      <p
        aria-hidden
        className="masthead mt-6 select-none text-[26vw] leading-none text-paper-dim sm:text-[10rem]"
      >
        404
      </p>
      <h1 className="masthead -mt-2 text-3xl text-ink sm:-mt-6 sm:text-4xl">
        This address isn&rsquo;t on the market.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-dim">
        The page you&rsquo;re looking for moved, sold, or never existed. Try a
        search — or head back to the listings everyone is browsing.
      </p>

      <div className="mt-9 w-full max-w-sm">
        <SearchTriggerButton className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/12 bg-white px-5 py-3 text-sm text-ink-dim shadow-soft transition-all duration-300 hover:border-accent/40 hover:text-ink" />
      </div>

      <Link
        href="/buy"
        className="mt-4 inline-flex h-11 items-center rounded-xl border border-transparent px-6 text-[13px] font-medium tracking-wide text-accent-deep underline-offset-4 transition-colors hover:underline"
      >
        Back to listings →
      </Link>
    </div>
  );
}
