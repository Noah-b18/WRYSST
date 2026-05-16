import { Link } from "@tanstack/react-router";
import { Heart, Search, User, MapPin, ChevronDown } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { brands } from "@/lib/watches";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { program, city, favorites, selectedBrand, setSelectedBrand } = useAppStore();
  const [valeur, setValeur] = useState("");
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="font-display font-bold text-xl tracking-[0.15em]">WRYSST</Link>
          <div className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                placeholder="Rechercher une montre..."
                className="w-full h-10 rounded-full bg-secondary pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm bg-white rounded-full px-2.5 py-1.5 hover:border-boder">
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
          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline-flex text-[10px] tracking-widest font-bold px-2.75 py-1.75 rounded ${program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-primary text-primary-foreground"}`}>
              {program}
            </span>
            <Link to="/dashboard" className="relative p-2 hover:bg-secondary rounded-full">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </Link>
            <Link to="/dashboard" className="p-2 hover:bg-secondary rounded-full">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <span>{city} — montres disponibles dans votre ville</span>
          </div>
          <CityChanger />
        </div>
      </div>
    </>
  );
}

function CityChanger() {
  const { city, setCity } = useAppStore();
  const cities: ("Paris" | "Lyon" | "Bordeaux" | "Marseille")[] = ["Paris", "Lyon", "Bordeaux", "Marseille"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-black bg-white rounded-full px-3 py-1.25 hover:text-foreground">
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

