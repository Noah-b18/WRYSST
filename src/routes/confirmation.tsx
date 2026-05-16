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
      <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>

        <h1 className="font-display font-bold text-4xl md:text-5xl uppercase mt-8 tracking-tight">
          C'est confirmé.
        </h1>
        <p className="text-muted-foreground mt-3">
          Votre {watch.brand} {watch.model} est prête à être récupérée.
        </p>

        <div className="border border-border rounded-lg p-6 mt-10 text-left">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground">
            <Truck className="w-4 h-4" strokeWidth={1.5} /> RÉCUPERATION
          </div>
          <p className="font-display font-bold text-lg mt-2 uppercase">À {city}</p>
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
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-md font-bold tracking-wider text-sm"
          >
            MON DASHBOARD
          </Link>
          <Link
            to="/"
            className="border border-border px-4 sm:px-6 py-3 rounded-md font-bold tracking-wider text-sm hover:border-foreground"
          >
            REVENIR AU CATALOGUE
          </Link>
        </div>
      </div>
    </div>
  );
}
