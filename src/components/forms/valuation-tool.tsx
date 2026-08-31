"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const valuationSchema = z.object({
  address: z.string().min(8, "Enter a full street address"),
  zip: z.string().regex(/^\d{5}$/, "5-digit ZIP code"),
  beds: z.string().min(1),
  sqft: z
    .string()
    .regex(/^\d{3,5}$/, "Enter square footage (e.g. 1600)"),
  condition: z.string().min(1),
});

type ValuationInput = z.infer<typeof valuationSchema>;

function estimate(data: ValuationInput): { low: number; high: number; mid: number } {
  const sqft = Number(data.sqft);
  const base = 210 + sqft * 1.35;
  const bedBoost = Number(data.beds) * 12000;
  const conditionMult =
    data.condition === "excellent" ? 1.14 : data.condition === "good" ? 1.02 : 0.92;
  const zipFactor = 1 + (Number(data.zip.slice(0, 2)) % 9) * 0.06;
  const mid = Math.round((base + bedBoost) * conditionMult * zipFactor);
  return { low: Math.round((mid * 0.94) / 1000) * 1000, high: Math.round((mid * 1.07) / 1000) * 1000, mid };
}

export function ValuationTool() {
  const [result, setResult] = useState<{ low: number; high: number; mid: number; addr: string } | null>(null);
  const form = useForm<ValuationInput>({
    resolver: zodResolver(valuationSchema),
    mode: "onBlur",
    defaultValues: { address: "", zip: "", beds: "3", sqft: "1600", condition: "good" },
  });

  const onSubmit = async (data: ValuationInput) => {
    await new Promise((r) => setTimeout(r, 900));
    setResult({ ...estimate(data), addr: data.address });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-xl border border-ink/5 bg-white p-6 shadow-none"
          id="valuation"
        >
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input placeholder="1234 Willow Avenue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="zip" render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP code</FormLabel>
                <FormControl>
                  <Input placeholder="78704" maxLength={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="beds" render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((b) => (
                      <SelectItem key={b} value={String(b)}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="sqft" render={({ field }) => (
              <FormItem>
                <FormLabel>Square feet</FormLabel>
                <FormControl>
                  <Input type="number" inputMode="numeric" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="condition" render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent — recently renovated</SelectItem>
                    <SelectItem value="good">Good — move-in ready</SelectItem>
                    <SelectItem value="dated">Dated — some work needed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Crunching comps…" : "Estimate my home's value"}
          </Button>
        </form>
      </Form>

      {/* Result card */}
      <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-ink to-ink p-6 shadow-hard">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={result.mid}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Estimate ready for {result.addr.split(",")[0]}
              </p>
              <motion.p
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", bounce: 0.4 }}
                className="mt-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl"
              >
                ${Math.round(result.mid / 1000)}K
              </motion.p>
              <p className="mt-2 text-sm text-paper-deep">
                Likely sale range{" "}
                <span className="font-semibold text-white">
                  ${Math.round(result.low / 1000)}K – ${Math.round(result.high / 1000)}K
                </span>
              </p>
              <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-paper-deep/80">
                Based on recent comparable sales, your home's specs and current
                market velocity. A local agent can refine this with interior
                details.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Home className="h-7 w-7 text-accent-hot" />
              </span>
              <p className="mt-4 max-w-xs font-display text-xl font-medium text-white">
                Your instant estimate appears here
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-paper-deep">
                <Sparkles className="h-3.5 w-3.5 text-accent-hot" /> Powered by live comparable sales
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
