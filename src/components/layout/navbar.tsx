"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  LayoutDashboard,
  LogOut,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites, useAuth } from "@/lib/stores";
import { useUi } from "@/lib/ui-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Commercial" },
  { href: "/agents", label: "About Us" },
  { href: "/neighborhoods", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const favCount = useFavorites((s) => s.ids.length);
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const setSearchOpen = useUi((s) => s.setSearchOpen);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500 ease-luxe",
        scrolled
          ? "border-b border-ink/5 bg-paper/85 shadow-soft backdrop-blur-2xl"
          : "border-b border-transparent bg-paper/60 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-heading text-[22px] font-bold tracking-tight text-navy">
            Meridian
          </span>
          <span className="hidden h-px w-px bg-ink/15 sm:block" aria-hidden />
          <span className="label-mono hidden pt-0.5 sm:inline text-[10px]">Est. 2019</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-lg px-4 py-2 font-heading text-[13px] font-semibold tracking-wide transition-all duration-300",
                isActive(l.href)
                  ? "text-navy bg-navy/5"
                  : "text-ink/75 hover:text-navy hover:bg-navy/5"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="text-ink/60 hover:text-navy"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Saved homes"
              className="relative text-ink/60 hover:text-navy"
            >
              <Link href="/saved">
                <Heart
                  className={cn(
                    "h-[18px] w-[18px]",
                    favCount > 0 && "fill-accent text-accent"
                  )}
                  strokeWidth={1.75}
                />
                {favCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-semibold text-white">
                    {favCount}
                  </span>
                )}
              </Link>
            </Button>
          )}

          {!mounted ? (
            <div className="ml-2 h-9 w-20" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="ml-1 rounded-full ring-offset-2 transition-opacity hover:opacity-85 focus-visible:outline-none"
                  aria-label="Account menu"
                >
                  <Avatar className="h-9 w-9 border-2 border-ink/8">
                    <AvatarFallback className="bg-navy/5 font-heading text-xs font-semibold text-navy">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel className="font-heading text-base font-semibold">
                  {user.name}
                </DropdownMenuLabel>
                <p className="truncate px-2 pb-1.5 text-xs text-muted-foreground">
                  {user.email}
                </p>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/saved")}>
                  <Bookmark /> Saved homes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                >
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="ml-1.5 flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-ink/60 hover:text-navy">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">List a Property</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="lg:hidden text-ink/60 hover:text-navy">
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] rounded-l-2xl">
              <div className="mt-14 flex flex-col">
                {navLinks.map((l, i) => (
                  <SheetClose key={l.href} asChild>
                    <Link
                      href={l.href}
                      className={cn(
                        "flex items-baseline gap-4 border-b border-ink/6 py-4 font-heading text-xl font-semibold tracking-tight transition-colors",
                        isActive(l.href) ? "text-accent-deep" : "text-ink hover:text-ink/70"
                      )}
                    >
                      <span className="label-mono text-muted-foreground/50 text-[10px]">
                        0{i + 1}
                      </span>
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                {!user && (
                  <SheetClose asChild>
                    <Link
                      href="/sign-in"
                      className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-navy px-6 text-[13px] font-semibold tracking-wide text-paper transition-colors hover:bg-navy-mid"
                    >
                      Sign in
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
