import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { watches } from "@/lib/watches";
import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { Shield, Sparkles, Truck, Wrench, MapPin } from "lucide-react";

export const Route = createFileRoute("/watch/$id")({
  component: WatchDetail,
});

function WatchDetail() {
  const { id } = Route.useParams();
  const watch = watches.find((w) => w.id === id);
  const navigate = useNavigate();
  const { city, setSelectedWatch, setHasAccount } = useAppStore();
  const [duration, setDuration] = useState(6);
  const [deposit, setDeposit] = useState(500);

  if (!watch) return <div className="p-12 text-center">Montre introuvable</div>;
  const inZone = watch.city === city;

  const handleReserve = (account: boolean) => {
    setSelectedWatch(watch.id);
    setHasAccount(account);
    navigate({ to: account ? "/recap" : "/signup" });
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <Header />
      <div className="max-w-[1400px] mx-auto px-6 py-10 grid lg:grid-cols-[55%_45%] gap-12">
        <div>
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img src={watch.image} alt={`${watch.brand} ${watch.model}`} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3 mt-4">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-20 h-20 bg-secondary rounded border border-border overflow-hidden">
                <img src={watch.image} alt="" className="w-full h-full object-cover opacity-70" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-widest font-medium text-muted-foreground">{watch.brand}</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl uppercase mt-1 tracking-tight">{watch.model}</h1>
          <p className="text-sm text-muted-foreground mt-2">Réf. {watch.ref} — {watch.year}</p>
          <span className={`inline-block mt-3 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded ${watch.program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-primary text-primary-foreground"}`}>{watch.program}</span>

          <div className={`mt-6 p-4 rounded-lg flex items-center gap-2 ${inZone ? "bg-success text-success-foreground" : "bg-orange-50 text-orange-800"}`}>
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <p className="text-sm font-medium">
              {inZone ? `DISPONIBLE À ${city.toUpperCase()} — Retrait ou livraison 48H` : `DISPONIBLE À ${watch.city.toUpperCase()} — Livraison 48H`}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              ["Mouvement", "Automatique"],
              ["Réserve de marche", "70 heures"],
              ["Diamètre", "41mm"],
              ["Étanchéité", "300m"],
              ["Matière boîtier", "Acier inoxydable"],
              ["Bracelet", "Acier / Cuir"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display font-bold text-lg tracking-wider mb-4">CONFIGUREZ VOTRE ACCÈS</h2>
            <div className="bg-accent border-l-4 border-primary p-4 rounded text-sm">
              Changez de montre quand vous voulez — sans délai minimum, sans frais de changement. Livraison ou retrait en boutique.
            </div>

            <p className="text-xs font-bold tracking-widest mt-6 mb-3">DURÉE D'ENGAGEMENT</p>
            <div className="grid grid-cols-4 gap-2">
              {[{m:1,r:0},{m:4,r:5},{m:6,r:10},{m:12,r:15}].map(({m,r}) => (
                <button
                  key={m}
                  onClick={() => setDuration(m)}
                  className={`py-2.5 rounded-md text-xs font-bold transition ${duration === m ? "bg-foreground text-background" : "border border-border hover:border-foreground"}`}
                >
                  {m} MOIS
                  <div className="text-[10px] font-normal opacity-70">-{r}%</div>
                </button>
              ))}
            </div>

            <p className="text-xs font-bold tracking-widest mt-6 mb-3">ACOMPTE INITIAL (OPTIONNEL)</p>
            <input type="range" min={0} max={1500} step={50} value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full accent-primary" />
            <p className="text-sm mt-1">Acompte : <span className="font-bold">{deposit}€</span></p>
          </div>
        </div>
      </div>

      {/* Inclus */}
      <section className="bg-secondary border-y border-border mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [Shield, "Assurance complète vol & casse"],
            [Sparkles, "Entretien maître horloger"],
            [Wrench, "Polissage avant livraison"],
            [Truck, "Changement à la demande — 48H"],
          ].map(([Icon, label], i) => (
            <div key={i} className="flex items-start gap-3">
              <Icon className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-medium">{label as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky reserve bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-widest font-medium text-muted-foreground">MENSUALITÉ</p>
            <p className="font-display font-bold text-2xl">{watch.price}€ <span className="text-sm font-normal text-muted-foreground">/ mois</span></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleReserve(true)}
              className="bg-foreground text-background px-6 py-3 rounded-md text-sm font-bold tracking-wider hover:bg-foreground/90 transition"
            >
              RÉSERVER (J'AI UN COMPTE) →
            </button>
            <button
              onClick={() => handleReserve(false)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-bold tracking-wider hover:bg-primary/90 transition"
            >
              RÉSERVER (NOUVEAU) →
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-muted-foreground pb-2"><Link to="/" className="underline">← Retour au catalogue</Link></p>
      </div>
    </div>
  );
}
