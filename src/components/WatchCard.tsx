import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Watch } from "@/lib/watches";

export function WatchCard({ watch }: { watch: Watch }) {
  const { city, favorites, toggleFavorite } = useAppStore();
  const inZone = watch.city === city;
  const isFav = favorites.includes(watch.id);

  return (
    <Link
      to="/watch/$id"
      params={{ id: watch.id }}
      className="group block bg-white rounded-lg overflow-hidden border border-border hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-200"
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.model}`}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${!inZone ? "grayscale-[30%]" : ""}`}
        />
        {!inZone && <div className="absolute inset-0 bg-[#CCCCCC]/55" />}
        <div className="absolute top-3 left-3">
          {inZone ? (
            <span className="inline-flex items-center gap-1 bg-white text-[10px] font-bold tracking-wider px-2 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> DISPONIBLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white text-[10px] font-medium italic tracking-wide px-2 py-1 rounded text-muted-foreground">
              <MapPin className="w-3 h-3" strokeWidth={1.5} /> DISPO À {watch.city.toUpperCase()}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className={`text-[9px] font-bold tracking-widest px-2 py-1 rounded ${watch.program === "BLACK EDITION" ? "bg-black-edition text-black-edition-foreground" : "bg-primary text-primary-foreground"}`}>
            {watch.program}
          </span>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggleFavorite(watch.id); }}
            className="bg-white/90 backdrop-blur p-1.5 rounded-full"
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-primary text-primary" : ""}`} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] tracking-widest font-medium text-muted-foreground">{watch.brand}</p>
        <h3 className="font-display font-bold text-sm uppercase mt-0.5 truncate">{watch.model}</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Réf. {watch.ref} — {watch.year}</p>
        <p className="text-primary font-bold text-sm mt-2">À PARTIR DE {watch.price}€ / MOIS</p>
      </div>
    </Link>
  );
}
