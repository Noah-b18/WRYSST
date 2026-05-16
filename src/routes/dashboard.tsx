import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useAppStore } from "@/lib/store";
import { watches } from "@/lib/watches";
import { WatchCard } from "@/components/WatchCard";
import { Watch as WatchIcon, RefreshCw, Heart, Ticket, History, Settings } from "lucide-react";
import { useState } from "react";
import { storeAddresses } from "@/lib/storeAddresses";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { selectedWatchId, favorites, program, city } = useAppStore();
  const current = watches.find((w) => w.id === selectedWatchId) ?? watches[0];
  const favs = watches.filter((w) => favorites.includes(w.id));
  const [tab, setTab] = useState("current");
  const storeAddress =
    (storeAddresses as { [key: string]: string })[city.toLowerCase()] ||
    "Boutique partenaire proche de vous";

  const nav = [
    { id: "current", label: "MA MONTRE EN COURS", icon: WatchIcon },
    { id: "swap", label: "DEMANDER UN ÉCHANGE", icon: RefreshCw },
    { id: "fav", label: "MES FAVORIS", icon: Heart },
    { id: "prog", label: "MON PROGRAMME", icon: Ticket },
    { id: "hist", label: "HISTORIQUE", icon: History },
    { id: "set", label: "PARAMÈTRES", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="site-container grid gap-6 py-6 sm:py-10 lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="min-w-0">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-xs font-bold tracking-wider whitespace-nowrap transition ${tab === n.id ? "bg-foreground text-background" : "hover:bg-secondary"}`}
              >
                <n.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          {tab === "current" && (
            <div>
              <h1 className="font-display mb-6 text-2xl font-bold uppercase sm:text-3xl">
                Ma montre en cours
              </h1>
              <div className="grid gap-5 rounded-lg bg-secondary p-4 sm:p-6 md:grid-cols-[1fr_1.2fr] md:gap-8 lg:p-8">
                <img
                  src={current.image}
                  alt=""
                  className="rounded-lg aspect-square object-cover w-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] tracking-widest font-bold text-muted-foreground">
                    {current.brand}
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-bold uppercase sm:text-3xl">
                    {current.model}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Réf. {current.ref}</p>
                  <p className="text-sm mt-4">Depuis le 09/05/2026</p>
                  <button
                    className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-bold tracking-wider text-primary-foreground sm:w-auto sm:px-6"
                    onClick={() => setTab("swap")}
                  >
                    CHANGER DE MONTRE →
                  </button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Vous pouvez en changer quand vous voulez. Livraison ou retrait en boutique en
                    48H.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "swap" && (
            <div className="max-w-xl">
              <h1 className="font-display mb-6 text-2xl font-bold uppercase sm:text-3xl">
                Demander un échange
              </h1>
              <div className="space-y-4">
                {/* <label className="flex items-center gap-3 p-4 border border-border rounded-md cursor-pointer hover:border-foreground">
                  <input type="radio" name="swap" defaultChecked /> Recevoir la suivante (livraison
                  48H)
                </label> */}
                <p>La boutique la plus proche de vous : {storeAddress}</p>
                <textarea
                  placeholder="Préférences pour la prochaine montre ?"
                  className="w-full border border-border rounded-md p-3 text-sm h-24 outline-none focus:border-primary"
                />
                <button className="w-full rounded-md bg-primary px-4 py-3 text-sm font-bold tracking-wider text-primary-foreground sm:w-auto sm:px-6">
                  VALIDER MON ÉCHANGE →
                </button>
              </div>
            </div>
          )}

          {tab === "fav" && (
            <div>
              <h1 className="font-display mb-6 text-2xl font-bold uppercase sm:text-3xl">
                Mes favoris
              </h1>
              {favs.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Aucun favori.{" "}
                  <Link to="/" className="underline">
                    Explorer le catalogue
                  </Link>
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favs.map((w) => (
                    <WatchCard key={w.id} watch={w} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "prog" && (
            <div className="max-w-md">
              <h1 className="font-display mb-6 text-2xl font-bold uppercase sm:text-3xl">
                Mon programme
              </h1>
              <div
                className={`p-8 rounded-lg ${program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-secondary"}`}
              >
                <p className="text-[10px] tracking-widest font-bold opacity-70">PROGRAMME ACTIF</p>
                <p className="font-display font-bold text-3xl mt-1">{program}</p>
                <p className="mt-6 text-sm">
                  Mensualité : <span className="font-bold">{current.price}€ / mois</span>
                </p>
                <p className="text-sm mt-1">Prochain prélèvement : 09/06/2026</p>
                <button className="mt-6 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-xs font-bold tracking-wider">
                  CHANGER DE PROGRAMME
                </button>
              </div>
            </div>
          )}

          {(tab === "hist" || tab === "set") && (
            <div className="text-muted-foreground text-sm">Bientôt disponible.</div>
          )}
        </main>
      </div>
    </div>
  );
}
