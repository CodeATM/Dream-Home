import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* — Premium Real Estate palette — */
        navy: {
          DEFAULT: "#0B1F33",
          deep: "#071521",
          mid: "#243B53",
        },
        ink: {
          DEFAULT: "#0B1F33",
          soft: "#132D46",
          mute: "#1A3550",
          dim: "#64748B",
        },
        paper: {
          DEFAULT: "#F8F7F3",
          dim: "#EDE9E0",
          deep: "#F3F1EC",
        },
        ivory: {
          DEFAULT: "#FCFCFA",
          warm: "#F8F7F3",
        },
        accent: {
          DEFAULT: "#C9A86A",
          hot: "#D8BE87",
          deep: "#B8964F",
        },
        gold: {
          DEFAULT: "#C9A86A",
          soft: "#D8BE87",
        },
        charcoal: {
          DEFAULT: "#1E293B",
          light: "#334155",
        },
        moss: {
          DEFAULT: "#071521",
          soft: "#0B1F33",
        },
        slate: {
          DEFAULT: "#243B53",
          light: "#3D5A80",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wide: "0.05em",
      },
      boxShadow: {
        none: "none",
        soft: "0 1px 3px rgba(11,31,51,0.04), 0 4px 12px rgba(11,31,51,0.06)",
        hard: "0 2px 4px rgba(11,31,51,0.06), 0 12px 40px -8px rgba(11,31,51,0.15)",
        "hard-accent":
          "0 2px 4px rgba(201,168,106,0.10), 0 16px 40px -12px rgba(201,168,106,0.28)",
        lift: "0 4px 8px rgba(11,31,51,0.06), 0 24px 56px -16px rgba(11,31,51,0.18)",
        premium: "0 1px 2px rgba(11,31,51,0.03), 0 8px 32px -8px rgba(11,31,51,0.12)",
        glow: "0 0 40px rgba(201,168,106,0.15)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wipe-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        marquee: "marquee 46s linear infinite",
        "marquee-fast": "marquee 32s linear infinite",
        "wipe-in": "wipe-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        blink: "blink 1.4s step-end infinite",
        "fade-up": "fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
