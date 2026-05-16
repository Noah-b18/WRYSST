import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { watches } from "@/lib/watches";

export const Route = createFileRoute("/recap")({
  component: Recap,
});

function Recap() {
  const navigate = useNavigate();
  const { selectedWatchId, city, program } = useAppStore();
  const watch = watches.find((w) => w.id === selectedWatchId) ?? watches[0];

  return (
    <div className="min-h-screen bg-secondary py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight">
          Votre résumé Wrysst
        </h1>
        <p className="text-sm text-muted-foreground mt-2">Vérifiez avant de confirmer.</p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-border mt-8 p-8">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <img src={watch.image} alt="" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="text-[10px] tracking-widest font-bold text-muted-foreground">
              {watch.brand}
            </p>
            <p className="font-display font-bold text-lg uppercase">{watch.model}</p>
            <p className="text-xs text-muted-foreground">Réf. {watch.ref}</p>
          </div>
        </div>

        <Row k="N° CONTRAT" v={`WR-2026-${Math.random().toString(36).slice(2, 8).toUpperCase()}`} />
        <Row k="VILLE" v={`${city} — Retrait en magasin 48H`} />
        <Row k="PROGRAMME" v={program} highlight={program === "BLACK EDITION"} />
        <Row k="DURÉE FACTURÉE" v="6 mois" />
        <Row k="FRAIS D'ACTIVATION" v="49€" />
        <Row k="1ÈRE MENSUALITÉ" v={`${watch.price}€ / MOIS`} bold />
        {/* <Row k="CAUTION" v="1500€ (sécurisée, remboursée au retour)" /> */}

        <div className="relative bg-secondary rounded-lg p-4 mt-6 text-xs text-muted-foreground">
          Votre accès Wrysst inclut l'assurance complète vol et casse, l'entretien par un maître
          horloger agréé, le polissage avant chaque livraison, et la flexibilité totale de changer
          de montre à la demande.
          <img src="src/assets/images/axa.svg" alt="AXA" className="absolute right-4 top-full-translate-y-1/2 w-9 h-9" />
        </div>

        <button
          onClick={() => navigate({ to: "/confirmation" })}
          className="w-full mt-8 bg-primary text-primary-foreground py-4 rounded-md font-bold tracking-wider text-sm hover:bg-primary/90"
        >
          CONFIRMER MA RÉSERVATION →
        </button>
        <Link
          to="/watch/$id"
          params={{ id: watch.id }}
          className="block text-center mt-4 text-xs text-muted-foreground hover:underline"
        >
          ← Modifier ma sélection
        </Link>
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  bold,
  highlight,
}: {
  k: string;
  v: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-xs tracking-widest font-bold text-muted-foreground">{k}</span>
      <span
        className={`text-sm ${bold ? "font-bold text-base" : ""} ${highlight ? "bg-black-edition text-black-edition-foreground px-2 py-0.5 rounded text-[10px] font-bold tracking-widest" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}
