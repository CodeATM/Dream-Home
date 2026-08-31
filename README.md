# Meridian — Now App

A premium real estate / property management web application built with **Next.js 16** (App Router), **React 19**, **TypeScript** and **Tailwind CSS**.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, RSC, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v3
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Leaflet](https://leafletjs.com/) + `react-leaflet` — maps
- [Zustand](https://zustand-demo.pmnd.rs/) — client state (favorites, compare, saved searches, auth)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — forms & validation
- [Radix UI](https://www.radix-ui.com/) primitives, [cmdk](https://github.com/pacocoursey/cmdk), [Swiper](https://swiperjs.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + `gray-matter` — content (guides/articles)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start the development server       |
| `npm run build`    | Production build                    |
| `npm run start`    | Serve the production build         |
| `npm run lint`     | Run ESLint                         |

## Features

- Buy / Rent search with advanced filtering, sorting, saving and pagination
- Property detail pages with gallery, mortgage/rent calculators and tour scheduling
- Interactive Leaflet maps with clustered pins
- Compare properties, saved homes, and saved search management
- Agent directory and neighborhood guides with per-city pages
- Resources / articles powered by local MDX content
- Dashboard, contact forms, and a full sign-in / sign-up flow

## Project Structure

```
src/
├── app/            # Routes (App Router)
├── components/
│   ├── ui/         # Shadcn-style primitives
│   ├── property/   # Cards, listing browser, calculators
│   ├── map/        # Leaflet map panels
│   ├── forms/      # Auth, contact, lead, valuation
│   └── layout/     # Navbar, footer, app shell
├── data/           # Properties, agents, cities, testimonials
├── content/        # MDX resources
└── lib/            # Utilities, stores, formatting
```

## Deployment

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new).

> Images are served from `images.unsplash.com` and require that hostname to be
> allowed in the `next.config.js` `images.remotePatterns` for any deployment.
