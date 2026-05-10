import { create } from "zustand";
import type { City, Program } from "./watches";

interface AppState {
  city: City;
  program: Program;
  hasAccount: boolean;
  selectedWatchId: string | null;
  favorites: string[];
  setCity: (c: City) => void;
  setProgram: (p: Program) => void;
  setHasAccount: (b: boolean) => void;
  setSelectedWatch: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  city: "Paris",
  program: "LUXURY",
  hasAccount: false,
  selectedWatchId: null,
  favorites: [],
  setCity: (city) => set({ city }),
  setProgram: (program) => set({ program }),
  setHasAccount: (hasAccount) => set({ hasAccount }),
  setSelectedWatch: (selectedWatchId) => set({ selectedWatchId }),
  toggleFavorite: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((x) => x !== id)
        : [...s.favorites, id],
    })),
}));
