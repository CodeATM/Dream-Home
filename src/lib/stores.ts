"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthUser {
  name: string;
  email: string;
}

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((i) => i !== id)
            : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "dh-favorites", storage: createJSONStorage(() => localStorage) }
  )
);

const COMPARE_MAX = 4;

interface CompareState {
  ids: string[];
  toggle: (id: string) => boolean; // returns true if added
  remove: (id: string) => void;
  clear: () => void;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const { ids } = get();
        if (ids.includes(id)) {
          set({ ids: ids.filter((i) => i !== id) });
          return false;
        }
        if (ids.length >= COMPARE_MAX) return false;
        set({ ids: [...ids, id] });
        return true;
      },
      remove: (id) =>
        set((s) => ({ ids: s.ids.filter((i) => i !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: "dh-compare", storage: createJSONStorage(() => localStorage) }
  )
);

interface AuthState {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: "dh-auth", storage: createJSONStorage(() => localStorage) }
  )
);

export interface SavedSearch {
  id: string;
  label: string;
  mode: "buy" | "rent";
  query: Record<string, unknown>;
  matchCount: number;
  newCount: number;
  createdAt: string;
}

interface SearchesState {
  recent: string[];
  saved: SavedSearch[];
  pushRecent: (q: string) => void;
  saveSearch: (s: Omit<SavedSearch, "id" | "createdAt" | "newCount">) => void;
  removeSaved: (id: string) => void;
  renameSaved: (id: string, label: string) => void;
}

export const useSearches = create<SearchesState>()(
  persist(
    (set) => ({
      recent: [],
      saved: [],
      pushRecent: (q) =>
        set((s) => ({
          recent: [q, ...s.recent.filter((r) => r !== q)].slice(0, 6),
        })),
      saveSearch: (s) =>
        set((st) => ({
          saved: [
            {
              ...s,
              id: crypto.randomUUID(),
              newCount: Math.max(2, Math.round(s.matchCount * 0.08)),
              createdAt: new Date().toISOString(),
            },
            ...st.saved.filter(
              (x) =>
                !(
                  x.mode === s.mode &&
                  JSON.stringify(x.query) === JSON.stringify(s.query)
                )
            ),
          ],
        })),
      removeSaved: (id) =>
        set((s) => ({ saved: s.saved.filter((x) => x.id !== id) })),
      renameSaved: (id, label) =>
        set((s) => ({
          saved: s.saved.map((x) => (x.id === id ? { ...x, label } : x)),
        })),
    }),
    { name: "dh-searches", storage: createJSONStorage(() => localStorage) }
  )
);

export type TourStatus = "upcoming" | "past";

export interface TourBooking {
  id: string;
  propertySlug: string;
  propertyTitle: string;
  propertyImage: string;
  address: string;
  date: string; // ISO date
  time: string;
  contactName: string;
  contactEmail: string;
}

interface ToursState {
  tours: TourBooking[];
  addTour: (t: Omit<TourBooking, "id">) => void;
  cancelTour: (id: string) => void;
}

export const useTours = create<ToursState>()(
  persist(
    (set) => ({
      tours: [],
      addTour: (t) =>
        set((s) => ({
          tours: [{ ...t, id: crypto.randomUUID() }, ...s.tours],
        })),
      cancelTour: (id) =>
        set((s) => ({ tours: s.tours.filter((t) => t.id !== id) })),
    }),
    { name: "dh-tours", storage: createJSONStorage(() => localStorage) }
  )
);
