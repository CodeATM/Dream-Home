"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { useAuth } from "@/lib/stores";
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

type Mode = "sign-in" | "sign-up" | "forgot-password";

const credentialsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[0-9]/, "Include at least one number"),
});

const emailOnlySchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().optional(),
});

function titleFor(mode: Mode) {
  switch (mode) {
    case "sign-in":
      return "Welcome back";
    case "sign-up":
      return "Create your account";
    default:
      return "Reset your password";
  }
}

export function AuthSplitLayout({
  mode,
  imageId,
  headline,
}: {
  mode: Mode;
  imageId: string;
  headline: string;
}) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-7xl items-stretch gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-12">
      <div className="flex items-center justify-center lg:bg-white/70 lg:p-12">
        <div className="w-full max-w-md">
          <AuthForm mode={mode} />
        </div>
      </div>
      <aside className="relative hidden min-h-[520px] overflow-hidden rounded-xl lg:block">
        <Image
          src={unsplash(imageId, 1000, 1200)}
          alt="Beautiful home"
          fill
          priority
          sizes="50vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="img-editorial object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <p className="absolute bottom-8 left-8 right-8 font-heading text-2xl leading-snug text-white">
          “{headline}”
        </p>
      </aside>
    </div>
  );
}

function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const signIn = useAuth((s) => s.signIn);
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const isSignIn = mode === "sign-in";
  const isSignUp = mode === "sign-up";
  const isForgot = mode === "forgot-password";

  const form = useForm({
    resolver: zodResolver(isForgot ? emailOnlySchema : credentialsSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "" },
  });

  const finish = async (values: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 900));
    if (isForgot) {
      setDone(true);
      return;
    }
    const fallbackName = values.email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    signIn({ name: (values.name || "").trim() || fallbackName, email: values.email });
    router.push("/dashboard");
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setPending(true);
    try {
      await finish(values as Record<string, string>);
    } finally {
      setPending(false);
    }
  });

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h1 className="masthead mt-4 text-2xl text-ink">
          Check your inbox
        </h1>
        <p className="mt-2 max-w-xs text-sm text-ink-dim">
          If an account exists for that address, a reset link is on its way.
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href="/sign-in">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="mb-6">
          <h1 className="masthead text-3xl text-ink">
            {titleFor(mode)}
          </h1>
          <p className="mt-2 text-sm text-ink-dim">
            {isSignIn && "Sign in to sync saved homes, searches and tours."}
            {isSignUp && "Save homes, get price-drop alerts and book tours faster."}
            {isForgot && "We'll email you a secure reset link."}
          </p>
        </div>

        {isSignUp && (
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl><Input placeholder="Jane Appleseed" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jane@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {!isForgot && (
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <span className="relative block">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-dim hover:text-ink"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </FormControl>
              <FormMessage />
              {isSignUp && (
                <p className="text-xs text-ink-dim">
                  8+ characters with at least one number.
                </p>
              )}
            </FormItem>
          )} />
        )}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSignIn ? "Sign in" : isSignUp ? "Create account" : "Send reset link"}
        </Button>

        {isSignIn && (
          <p className="text-center text-sm">
            <Link href="/forgot-password" className="font-medium text-accent-deep hover:text-accent">
              Forgot your password?
            </Link>
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wider text-ink-dim">
            or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {["Google", "Apple", "Facebook"].map((p) => (
            <Button
              key={p}
              type="button"
              variant="outline"
              onClick={() =>
                finish({
                  email: `demo.${p.toLowerCase()}@meridian.estate`,
                  name: `${p} Demo`,
                })
              }
            >
              {p}
            </Button>
          ))}
        </div>

        <p className="pt-2 text-center text-sm text-ink-dim">
          {isSignIn ? (
            <>
              New to Meridian?{" "}
              <Link href="/sign-up" className="font-semibold text-ink hover:text-accent-deep">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-ink hover:text-accent-deep">
                Sign in
              </Link>
            </>
          )}
        </p>
      </form>
    </Form>
  );
}
