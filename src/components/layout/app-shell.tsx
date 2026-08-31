"use client";

import * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SplashLoader } from "./splash-loader";
import { SearchCommandBar } from "./search-command-bar";
import { ScrollToTop } from "./scroll-to-top";

export function AppShell({
  children,
  fonts,
}: {
  children: React.ReactNode;
  fonts: string;
}) {
  return (
    <div className={fonts}>
      <SplashLoader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SearchCommandBar />
      <ScrollToTop />
    </div>
  );
}
