import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { WatchCard } from "@/components/WatchCard";
import { watches, brands, categories } from "@/lib/watches";
import { useAppStore } from "@/lib/store";
import { Grid3x3 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Catalogue,
});

function Catalogue() {
  const { city, selectedBrand, setSelectedBrand } = useAppStore();
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState("dispo");

  const filtered = useMemo(() => {
    let list = [...watches];
    if (selectedBrand !== "TOUTES") list = list.filter((w) => w.brand === selectedBrand);
    if (category) list = list.filter((w) => w.category === category);
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [selectedBrand, category, sort]);

  const inZone = filtered.filter((w) => w.city === city);
  const outZone = filtered.filter((w) => w.city !== city);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Categories ribbon */}
      <div className="border-b border-border bg-white">
        <div className="site-container py-4 flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setCategory(null)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg ${!category ? "bg-foreground text-background" : "hover:bg-secondary"}`}
          >
            <Grid3x3 className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-[10px] tracking-wider font-bold">TOUT</span>
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === category ? null : c)}
              className={`shrink-0 px-4 py-2 rounded-full border text-xs tracking-widest font-bold transition ${category === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Brand pills */}
      <div className="border-b border-border">
        <div className="site-container py-4 flex items-center gap-2 overflow-x-auto">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition ${selectedBrand === b ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {b}
            </button>
          ))}
          {/* <div className="ml-auto shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs font-medium border border-border rounded-full px-4 py-1.5 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="dispo">Disponibles d'abord</option>
              <option value="asc">Prix ↑</option>
              <option value="desc">Prix ↓</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* Grid */}
      <main className="site-container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inZone.map((w) => (
            <WatchCard key={w.id} watch={w} />
          ))}
        </div>

        {outZone.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl tracking-wider mb-6">
              ÉGALEMENT DISPONIBLE — AUTRES VILLES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {outZone.map((w) => (
                <WatchCard key={w.id} watch={w} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="site-container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-display font-bold tracking-[0.15em] mb-4">WRYSST</p>
          <p className="text-muted-foreground text-xs">
            Changez quand vous voulez.
            <br />
            L'accès, pas la propriété.
          </p>
        </div>
        <div>
          <p className="font-bold text-xs tracking-widest mb-3">TYPES</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>Plongée</li>
            <li>Habillée</li>
            <li>Chrono</li>
            <li>Iconique</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-xs tracking-widest mb-3">PROGRAMMES</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>Premium</li>
            <li>Luxury</li>
            <li>Black Edition</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-xs tracking-widest mb-3">CONTACT</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>hello@wrysst.com</li>
            <li>+33 1 23 45 67 89</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 WRYSST. Tous droits réservés.
      </div>
    </footer>
  );
}
