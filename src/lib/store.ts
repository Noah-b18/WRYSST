import { create } from "zustand";
import type { City, Program } from "./watches";

interface AppState {
  city: City;
  program: Program;
  selectedBrand: string;
  hasAccount: boolean;
  selectedWatchId: string | null;
  favorites: string[];
  setCity: (c: City) => void;
  setProgram: (p: Program) => void;
  setSelectedBrand: (brand: string) => void;
  setHasAccount: (b: boolean) => void;
  setSelectedWatch: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  city: "Paris",
  program: "LUXURY",
  selectedBrand: "TOUTES",
  hasAccount: false,
  selectedWatchId: null,
  favorites: [],
  setCity: (city) => set({ city }),
  setProgram: (program) => set({ program }),
  setSelectedBrand: (selectedBrand) => set({ selectedBrand }),
  setHasAccount: (hasAccount) => set({ hasAccount }),
  setSelectedWatch: (selectedWatchId) => set({ selectedWatchId }),
  toggleFavorite: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((x) => x !== id)
        : [...s.favorites, id],
    })),
}));
