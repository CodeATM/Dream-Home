import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { SinglePinMapPanel } from "@/components/map/properties-map";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about buying, selling or renting? We reply fast.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>
      <div className="max-w-2xl">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <h1 className="masthead mt-3 text-4xl text-navy sm:text-5xl">
          Talk to a human
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-dim">
          No phone trees, no chatbots pretending to be people. Real answers from
          the team.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ContactForm />

        <aside className="space-y-4">
          <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-soft">
            <h3 className="font-heading text-lg font-bold text-navy">Support</h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href="tel:+18005550199" className="font-medium text-navy underline-offset-4 hover:underline">(800) 555-0199</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href="mailto:hello@meridian.estate" className="break-all font-medium text-navy underline-offset-4 hover:underline">hello@meridian.estate</a>
              </li>
              <li className="flex items-center gap-3 text-ink-dim">
                <Clock className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} /> Mon–Sat · 8am–7pm CT
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-ink/5 shadow-soft">
            <SinglePinMapPanel lat={30.2672} lng={-97.7431} label="HQ" />
            <div className="border-t border-ink/5 bg-white p-5">
              <p className="font-heading text-base font-bold text-navy">Meridian HQ</p>
              <p className="mt-1 text-[13px] text-ink-dim">
                1200 Congress Ave, Suite 400, Austin, TX 78701
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
