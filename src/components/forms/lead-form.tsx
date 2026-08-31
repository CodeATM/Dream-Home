"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[+\d][\d\s\-().]{6,}$/, "Enter a valid phone number"),
  address: z.string().min(8, "Enter the property address"),
  timeline: z.string().min(1),
  message: z.string().max(1000).optional(),
});

type LeadInput = z.infer<typeof leadSchema>;

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      timeline: "1-3 months",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white/[0.07] p-10 text-center backdrop-blur-sm">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 font-display text-xl font-semibold text-white">
          Request received!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-paper-deep">
          A top local agent will reach out within one business day with your
          refined valuation.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl bg-white p-6 shadow-hard"
      >
        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl><Input placeholder="Jane Appleseed" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="jane@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Property address</FormLabel>
              <FormControl><Input placeholder="1234 Willow Ave" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="timeline" render={({ field }) => (
          <FormItem>
            <FormLabel>When are you looking to sell?</FormLabel>
            <select
              {...field}
              className="h-10 w-full rounded-none border border-input bg-white px-3.5 text-sm shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-dim"
            >
              <option value="asap">ASAP</option>
              <option value="1-3 months">1–3 months</option>
              <option value="3-6 months">3–6 months</option>
              <option value="just-exploring">Just exploring</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />
        {!compact && (
          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem>
              <FormLabel>Anything we should know? (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Recent upgrades, tenant situation, timing constraints…" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}
        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            "Sending…"
          ) : (
            <>
              <Send className="h-4 w-4" /> Request my valuation call
            </>
          )}
        </Button>
        <p className="text-center text-xs text-ink-dim">
          No spam, ever. One agent, one conversation.
        </p>
      </form>
    </Form>
  );
}
