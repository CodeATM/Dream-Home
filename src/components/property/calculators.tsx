"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import type { Property } from "@/data/types";
import { mortgageBreakdown } from "@/lib/mortgage";
import { formatPrice } from "@/lib/format";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink-dim">{label}</span>
      <span className={strong ? "font-heading font-bold text-navy" : "font-medium text-navy"}>
        {value}
      </span>
    </div>
  );
}

export function MortgageCalculator({ property }: { property: Property }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.4);
  const [years, setYears] = useState("30");

  const b = useMemo(
    () =>
      mortgageBreakdown(
        property.price,
        downPct,
        rate,
        Number(years),
        property.taxAnnual,
        property.hoaMonthly
      ),
    [property.price, property.taxAnnual, property.hoaMonthly, downPct, rate, years]
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 border-b border-ink/6 pb-5">
        <p className="text-sm text-ink-dim">Estimated monthly</p>
        <p className="font-heading text-3xl font-bold text-navy">
          {formatPrice(Math.round(b.total))}
          <span className="text-base font-normal text-ink-dim">/mo</span>
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm font-medium">
            <label>Down payment</label>
            <span className="text-navy">
              {downPct}% &middot; {formatPrice(b.downPayment)}
            </span>
          </div>
          <Slider
            value={[downPct]}
            min={0}
            max={60}
            step={1}
            onValueChange={(v) => setDownPct(v[0])}
          />
        </div>

        <div className="space-y-2.5">
          <div className="flex justify-between text-sm font-medium">
            <label>Interest rate</label>
            <span className="text-navy">{rate.toFixed(2)}%</span>
          </div>
          <Slider
            value={[rate]}
            min={3}
            max={10}
            step={0.05}
            onValueChange={(v) => setRate(v[0])}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="text-sm font-medium">Loan term</label>
          <Select value={years} onValueChange={setYears}>
            <SelectTrigger className="w-[130px] bg-white rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 years</SelectItem>
              <SelectItem value="20">20 years</SelectItem>
              <SelectItem value="15">15 years</SelectItem>
              <SelectItem value="10">10 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl bg-paper-deep/50 p-4">
          <Row label="Principal & interest" value={`${formatPrice(Math.round(b.pi))}/mo`} />
          <Row label="Property taxes" value={`${formatPrice(Math.round(b.taxMonthly))}/mo`} />
          <Row label="Home insurance" value={`${formatPrice(Math.round(b.insuranceMonthly))}/mo`} />
          {b.hoaMonthly > 0 && (
            <Row label="HOA dues" value={`${formatPrice(b.hoaMonthly)}/mo`} />
          )}
          <Row
            label={`Loan amount (${years}-yr fixed)`}
            value={formatPrice(b.loanAmount)}
          />
          <div className="my-2 h-px bg-ink/8" />
          <Row label="Total monthly" value={`${formatPrice(Math.round(b.total))}`} strong />
        </div>

        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-dim">
          <Calculator className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Estimates only — actual payments vary by lender, credit profile and escrow setup.
        </p>
      </div>
    </div>
  );
}

export function RentCalculator({ property }: { property: Property }) {
  const [income, setIncome] = useState(90000);
  const monthlyRent = property.price;
  const share = ((monthlyRent * 12) / income) * 100;

  return (
    <div>
      <div className="border-b border-ink/6 pb-5">
        <p className="text-sm text-ink-dim">Monthly rent</p>
        <p className="font-heading text-3xl font-bold text-navy">
          {formatPrice(monthlyRent)}
          <span className="text-base font-normal text-ink-dim">/mo</span>
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm font-medium">
            <label>Household income</label>
            <span className="text-navy">{formatPrice(income)}/yr</span>
          </div>
          <Slider
            value={[income]}
            min={30000}
            max={400000}
            step={5000}
            onValueChange={(v) => setIncome(v[0])}
          />
        </div>

        <div className="rounded-xl bg-paper-deep/50 p-4">
          <Row label="Rent as % of income" value={`${share.toFixed(1)}%`} strong />
          <div className="my-2 h-px bg-ink/8" />
          <p className="text-sm leading-relaxed text-ink/70">
            {share <= 30 ? (
              <>
                Comfortably within the classic 30% guideline —{" "}
                <span className="font-semibold text-emerald-600">green light</span> for
                most budgets.
              </>
            ) : share <= 40 ? (
              <>
                A bit above the 30% guideline but common in high-demand cities.
                Budget carefully elsewhere.
              </>
            ) : (
              <>
                Above typical affordability thresholds — consider a roommate or
                negotiating terms.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
