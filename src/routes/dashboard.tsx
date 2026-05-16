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
      <div className="site-container py-10 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-xs font-bold tracking-wider whitespace-nowrap transition ${tab === n.id ? "bg-foreground text-background" : "hover:bg-secondary"}`}
              >
                <n.icon className="w-4 h-4" strokeWidth={1.5} />
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        <main>
          {tab === "current" && (
            <div>
              <h1 className="font-display font-bold text-3xl uppercase mb-6">Ma montre en cours</h1>
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 bg-secondary rounded-lg p-8">
                <img
                  src={current.image}
                  alt=""
                  className="rounded-lg aspect-square object-cover w-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] tracking-widest font-bold text-muted-foreground">
                    {current.brand}
                  </p>
                  <h2 className="font-display font-bold text-3xl uppercase mt-1">
                    {current.model}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Réf. {current.ref}</p>
                  <p className="text-sm mt-4">Depuis le 09/05/2026</p>
                  <button
                    className="mt-6 bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-md font-bold tracking-wider text-sm self-start"
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
              <h1 className="font-display font-bold text-3xl uppercase mb-6">
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
                <button className="bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-md font-bold tracking-wider text-sm">
                  VALIDER MON ÉCHANGE →
                </button>
              </div>
            </div>
          )}

          {tab === "fav" && (
            <div>
              <h1 className="font-display font-bold text-3xl uppercase mb-6">Mes favoris</h1>
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
              <h1 className="font-display font-bold text-3xl uppercase mb-6">Mon programme</h1>
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
