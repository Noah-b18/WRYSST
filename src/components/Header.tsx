import { Link } from "@tanstack/react-router";
import { Heart, Search, User, MapPin, ChevronDown, Menu } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { brands } from "@/lib/watches";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

export function Header() {
  const { program, city, favorites, selectedBrand, setSelectedBrand } = useAppStore();
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="site-container h-16 flex min-w-0 items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          <Link
            to="/"
            className="font-display shrink-0 font-bold text-lg tracking-[0.15em] sm:text-xl"
          >
            WRYSST
          </Link>
          <div className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <Search
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                placeholder="Rechercher une montre..."
                className="w-full h-10 rounded-full bg-secondary pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-sm hover:bg-secondary">
                    {selectedBrand}
                    <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[160px]">
                    {brands.map((b) => (
                      <DropdownMenuItem key={b} onClick={() => setSelectedBrand(b)}>
                        {b}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <span
              className={`hidden shrink-0 sm:inline-flex text-[10px] tracking-widest font-bold px-2.75 py-1.75 rounded ${program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-primary text-primary-foreground"}`}
            >
              {program}
            </span>
            <Link
              to="/dashboard"
              className="relative shrink-0 rounded-full p-2 hover:bg-secondary"
              aria-label="Favoris"
            >
              <Heart className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard"
              className="shrink-0 rounded-full p-2 hover:bg-secondary"
              aria-label="Compte"
            >
              <User className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            </Link>
            {/* Mobile menu trigger */}
            <div className="ml-1 shrink-0 md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="shrink-0 rounded-full p-2 hover:bg-secondary">
                    <Menu className="h-5 w-5 shrink-0" />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <div className="flex items-center justify-between w-full">
                      <DrawerTitle>Menu</DrawerTitle>
                      <DrawerClose asChild>
                        <button className="shrink-0 rounded-full p-2 hover:bg-secondary">
                          Fermer
                        </button>
                      </DrawerClose>
                    </div>
                    <DrawerDescription>Navigation et recherche</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="relative">
                        <Search
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          strokeWidth={1.5}
                        />
                        <input
                          placeholder="Rechercher une montre..."
                          className="w-full h-10 rounded-full bg-secondary pl-10 pr-4 text-sm outline-none"
                        />
                      </div>
                    </div>
                    <nav className="flex flex-col gap-3">
                      <Link to="/" className="font-medium">
                        Accueil
                      </Link>
                      <Link to="/dashboard" className="font-medium">
                        Mon compte
                      </Link>
                      <Link to="/signup" className="font-medium">
                        S'inscrire
                      </Link>
                    </nav>
                  </div>
                  <DrawerFooter>
                    <div className="text-sm text-muted-foreground">© 2026 WRYSST</div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="site-container flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span className="text-xs leading-snug sm:text-sm">
              {city} — montres disponibles dans votre ville
            </span>
          </div>
          <CityChanger />
        </div>
      </div>
    </>
  );
}

function CityChanger() {
  const { city, setCity } = useAppStore();
  const cities: ("Paris" | "Lyon" | "Bordeaux" | "Marseille")[] = [
    "Paris",
    "Lyon",
    "Bordeaux",
    "Marseille",
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.25 text-sm text-black hover:text-foreground">
        {city}
        <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px]">
        {cities.map((c) => (
          <DropdownMenuItem key={c} onClick={() => setCity(c)}>
            {c}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
