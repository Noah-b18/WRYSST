import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { watches } from "@/lib/watches";
import { Header } from "@/components/Header";
import { Truck, Check } from "lucide-react";
import { motion } from "framer-motion";
import { storeAddresses } from "@/lib/storeAddresses";

export const Route = createFileRoute("/confirmation")({
  component: Confirmation,
});

function Confirmation() {
  const { selectedWatchId, city } = useAppStore();
  const watch = watches.find((w) => w.id === selectedWatchId) ?? watches[0];

  const storeAddress =
    (storeAddresses as { [key: string]: string })[city.toLowerCase()] ||
    "Boutique partenaire proche de vous";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 sm:py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>

        <h1 className="font-display mt-8 text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
          C'est confirmé.
        </h1>
        <p className="text-muted-foreground mt-3">
          Votre {watch.brand} {watch.model} est prête à être récupérée.
        </p>

        <div className="mt-10 rounded-lg border border-border p-4 text-left sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground">
            <Truck className="w-4 h-4" strokeWidth={1.5} /> RÉCUPERATION
          </div>
          <p className="font-display mt-2 text-lg font-bold uppercase">À {city}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Vous pouvez récupérer la montre dans une boutique partenaire.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Adresse de la boutique : {storeAddress}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            to="/dashboard"
            className="rounded-md bg-primary px-4 py-3 text-sm font-bold tracking-wider text-primary-foreground sm:px-6"
          >
            MON DASHBOARD
          </Link>
          <Link
            to="/"
            className="rounded-md border border-border px-4 py-3 text-sm font-bold tracking-wider hover:border-foreground sm:px-6"
          >
            REVENIR AU CATALOGUE
          </Link>
        </div>
      </div>
    </div>
  );
}
