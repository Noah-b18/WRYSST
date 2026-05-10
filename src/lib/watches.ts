export type Program = "PREMIUM" | "LUXURY" | "BLACK EDITION";
export type City = "Paris" | "Lyon" | "Bordeaux" | "Marseille";

export interface Watch {
  id: string;
  brand: string;
  model: string;
  ref: string;
  year: number;
  city: City;
  program: Program;
  price: number;
  category: string;
  image: string;
}

export const watches: Watch[] = [
  // Paris
  { id: "1", brand: "ROLEX", model: "Submariner Date", ref: "126610LN", year: 2023, city: "Paris", program: "BLACK EDITION", price: 349, category: "PLONGÉE", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80" },
  { id: "2", brand: "OMEGA", model: "Speedmaster Moonwatch", ref: "310.30.42", year: 2022, city: "Paris", program: "LUXURY", price: 189, category: "CHRONO", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" },
  { id: "3", brand: "TAG HEUER", model: "Aquaracer 200m", ref: "WBP2110", year: 2023, city: "Paris", program: "PREMIUM", price: 129, category: "PLONGÉE", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80" },
  { id: "4", brand: "AUDEMARS PIGUET", model: "Royal Oak", ref: "15500ST", year: 2022, city: "Paris", program: "BLACK EDITION", price: 590, category: "ICONIQUE", image: "https://images.unsplash.com/photo-1639037687665-37a99427966a?w=800&q=80" },
  { id: "5", brand: "IWC", model: "Portugieser Automatic 40", ref: "IW358303", year: 2023, city: "Paris", program: "LUXURY", price: 229, category: "HABILLÉE", image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80" },
  { id: "6", brand: "TISSOT", model: "PRX Automatic", ref: "T137.407.11", year: 2023, city: "Paris", program: "PREMIUM", price: 89, category: "SPORT", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80" },
  // Lyon
  { id: "7", brand: "ROLEX", model: "Daytona", ref: "116500LN", year: 2023, city: "Lyon", program: "BLACK EDITION", price: 620, category: "CHRONO", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80" },
  { id: "8", brand: "BREITLING", model: "Navitimer B01 43", ref: "AB0138211B1P1", year: 2023, city: "Lyon", program: "LUXURY", price: 249, category: "ICONIQUE", image: "https://images.unsplash.com/photo-1606293459339-aa5d34a7b0e1?w=800&q=80" },
  { id: "9", brand: "OMEGA", model: "Seamaster 300m", ref: "210.30.42", year: 2023, city: "Lyon", program: "LUXURY", price: 199, category: "PLONGÉE", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80" },
  { id: "10", brand: "TISSOT", model: "Gentleman Powermatic 80", ref: "T127.407.11", year: 2023, city: "Lyon", program: "PREMIUM", price: 99, category: "HABILLÉE", image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80" },
  // Bordeaux
  { id: "11", brand: "PATEK PHILIPPE", model: "Calatrava", ref: "5196", year: 2022, city: "Bordeaux", program: "BLACK EDITION", price: 750, category: "HABILLÉE", image: "https://images.unsplash.com/photo-1623998021446-45cd9b269c95?w=800&q=80" },
  { id: "12", brand: "JAEGER-LECOULTRE", model: "Reverso Classic", ref: "Q3858520", year: 2023, city: "Bordeaux", program: "LUXURY", price: 279, category: "ICONIQUE", image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&q=80" },
  { id: "13", brand: "BREITLING", model: "Superocean Heritage", ref: "AB2010", year: 2022, city: "Bordeaux", program: "PREMIUM", price: 139, category: "PLONGÉE", image: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800&q=80" },
  // Marseille
  { id: "14", brand: "HUBLOT", model: "Big Bang Integral Titanium", ref: "451.NX.1140", year: 2023, city: "Marseille", program: "BLACK EDITION", price: 580, category: "SPORT", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80" },
  { id: "15", brand: "TAG HEUER", model: "Carrera Chronographe", ref: "CBN2A1B", year: 2023, city: "Marseille", program: "PREMIUM", price: 149, category: "CHRONO", image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=800&q=80" },
];

export const brands = ["TOUTES", "ROLEX", "AUDEMARS PIGUET", "PATEK PHILIPPE", "BREITLING", "IWC", "OMEGA", "TISSOT", "HUBLOT", "TAG HEUER", "JAEGER-LECOULTRE"];
export const categories = ["PLONGÉE", "HABILLÉE", "CHRONO", "ICONIQUE", "ÉDITION LIMITÉE", "VINTAGE", "SPORT"];

export const programs: { name: Program; price: number; tagline: string; brands: string }[] = [
  { name: "PREMIUM", price: 89, tagline: "Pour démarrer", brands: "Tissot, TAG Heuer, Breitling, Omega" },
  { name: "LUXURY", price: 300, tagline: "Le plus populaire", brands: "Rolex, IWC, Jaeger-LeCoultre, Omega" },
  { name: "BLACK EDITION", price: 850, tagline: "Accès illimité", brands: "Rolex Daytona, Audemars Piguet, Patek Philippe" },
];
