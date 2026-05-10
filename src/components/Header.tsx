import { Link } from "@tanstack/react-router";
import { Heart, Search, User, MapPin } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Header() {
  const { program, city, favorites } = useAppStore();
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
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline-flex text-[10px] tracking-widest font-bold px-2.5 py-1 rounded ${program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-primary text-primary-foreground"}`}>
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
    <select
      value={city}
      onChange={(e) => setCity(e.target.value as any)}
      className="bg-transparent text-xs underline cursor-pointer outline-none"
    >
      {cities.map((c) => (
        <option key={c} value={c} className="text-foreground">Changer de ville · {c}</option>
      ))}
    </select>
  );
}
