import type { Metadata } from "next";
import { Playfair_Display, Lato, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meridian.example.com"),
  title: {
    default: "Meridian — Exceptional Spaces. Better Living.",
    template: "%s · Meridian",
  },
  description:
    "Discover thoughtfully managed residential and commercial properties in prime locations. Premium property management you can trust.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <AppShell
          fonts={`${playfair.variable} ${lato.variable} ${jetbrainsMono.variable}`}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
