"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  topic: z.string().min(1, "Pick a topic"),
  message: z.string().min(20, "Tell us a little more (20+ characters)"),
});
type ContactInput = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-none border border-border bg-white p-10 text-center shadow-none">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Message sent!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          We reply within one business day — usually much faster. Talk soon.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-none border border-border bg-white p-6 shadow-none" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
        </div>
        <FormField control={form.control} name="topic" render={({ field }) => (
          <FormItem>
            <FormLabel>What's this about?</FormLabel>
            <select
              {...field}
              className="h-10 w-full rounded-none border border-input bg-white px-3.5 text-sm shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-dim"
            >
              <option value="">Choose a topic…</option>
              <option>Buying a home</option>
              <option>Selling my home</option>
              <option>Renting</option>
              <option>Working with Meridian (careers)</option>
              <option>Something else</option>
            </select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea rows={5} placeholder="How can we help?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending…" : (<><Send className="h-4 w-4" /> Send message</>)}
        </Button>
      </form>
    </Form>
  );
}
