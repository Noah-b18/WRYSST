import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { programs, type City, type Program } from "@/lib/watches";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

const cities: { name: City; x: number; y: number }[] = [
  { name: "Paris", x: 250, y: 110 },
  { name: "Lyon", x: 310, y: 230 },
  { name: "Bordeaux", x: 170, y: 290 },
  { name: "Marseille", x: 320, y: 340 },
];

function Signup() {
  const navigate = useNavigate();
  const { setCity, setProgram, setHasAccount } = useAppStore();
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program>("LUXURY");

  const finish = () => {
    if (selectedCity) setCity(selectedCity);
    setProgram(selectedProgram);
    setHasAccount(true);
    navigate({ to: "/recap" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      {/* progress */}
      <div className="flex items-center gap-3 mb-12">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {step > n ? <Check className="w-4 h-4" /> : n}
            </div>
            {n < 3 && <div className={`w-12 h-0.5 ${step > n ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-[480px]">
        {step === 1 && (
          <div>
            <h1 className="font-display font-bold text-4xl uppercase">Créez votre compte</h1>
            <p className="text-sm text-muted-foreground mt-2">Accès réservé aux membres Wrysst.</p>
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5 mt-8">
              <div className="grid grid-cols-2 gap-3">
                <Field label="PRÉNOM"><input className="input" required /></Field>
                <Field label="NOM"><input className="input" required /></Field>
              </div>
              <Field label="DATE DE NAISSANCE">
                <div className="grid grid-cols-3 gap-2">
                  <select className="input"><option>Jour</option>{Array.from({length:31},(_,i)=><option key={i}>{i+1}</option>)}</select>
                  <select className="input"><option>Mois</option>{["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"].map(m=><option key={m}>{m}</option>)}</select>
                  <select className="input"><option>Année</option>{Array.from({length:60},(_,i)=><option key={i}>{2008-i}</option>)}</select>
                </div>
              </Field>
              <Field label="EMAIL"><input type="email" className="input" required /></Field>
              <Field label="TÉLÉPHONE">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <select className="input"><option>+33</option></select>
                  <input className="input" />
                </div>
              </Field>
              <Field label="MOT DE PASSE">
                <div className="relative">
                  <input type={showPwd?"text":"password"} className="input pr-10" required />
                  <button type="button" onClick={()=>setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </Field>
              <Field label="CONFIRMER MOT DE PASSE">
                <input type="password" className="input" required />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" required /> J'accepte les conditions d'utilisation
              </label>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-bold tracking-wider text-sm hover:bg-primary/90">CONTINUER →</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl uppercase">Où êtes-vous ?</h1>
            <p className="text-sm text-muted-foreground mt-2">Votre catalogue affichera en priorité les montres disponibles dans votre secteur.</p>
            <input
              placeholder="Entrez votre ville ou code postal..."
              className="input w-full mt-6 text-center"
              value={selectedCity ?? ""}
              onChange={(e) => setSelectedCity(e.target.value as City)}
            />
            <div className="mt-6 flex justify-center">
              <svg viewBox="0 0 500 450" className="w-full max-w-sm">
                {/* simplified France shape */}
                <path d="M150 80 Q220 60 290 80 Q360 100 380 180 Q400 260 360 340 Q320 400 240 410 Q160 400 110 340 Q80 260 100 180 Q120 100 150 80 Z"
                  fill="#0047FF" opacity="0.15" stroke="#0047FF" strokeWidth="1.5" />
                {cities.map((c) => {
                  const active = selectedCity === c.name;
                  return (
                    <g key={c.name} className="cursor-pointer" onClick={() => setSelectedCity(c.name)}>
                      <circle cx={c.x} cy={c.y} r={active ? 12 : 7} fill={active ? "#0047FF" : "#0A0A0A"} />
                      <text x={c.x} y={c.y - 16} textAnchor="middle" className="text-xs font-bold" fill={active ? "#0047FF" : "#0A0A0A"}>{c.name}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <button
              disabled={!selectedCity}
              onClick={() => setStep(3)}
              className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-md font-bold tracking-wider text-sm disabled:opacity-40 hover:bg-primary/90"
            >VALIDER MA VILLE →</button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-[920px] -mx-4">
            <div className="text-center px-4">
              <h1 className="font-display font-bold text-4xl uppercase">Votre niveau d'accès</h1>
              <p className="text-sm text-muted-foreground mt-2">Vous pourrez le modifier à tout moment.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-8 px-4">
              {programs.map((p) => {
                const active = selectedProgram === p.name;
                const isBlack = p.name === "BLACK EDITION";
                return (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProgram(p.name)}
                    className={`text-left p-6 rounded-lg border-2 transition ${active ? "border-primary" : "border-border hover:border-foreground"} ${isBlack && active ? "bg-black-edition text-black-edition-foreground border-black-edition" : ""}`}
                  >
                    <p className="text-[10px] tracking-widest font-bold opacity-70">PROGRAMME</p>
                    <p className="font-display font-bold text-xl mt-1">{p.name}</p>
                    <p className="text-xs mt-1 opacity-70">{p.tagline}</p>
                    <p className="font-display font-bold text-3xl mt-6">{p.price}€<span className="text-sm font-normal opacity-70"> / mois</span></p>
                    <p className="text-xs mt-4 opacity-70">{p.brands}</p>
                  </button>
                );
              })}
            </div>
            <div className="px-4 mt-8">
              <button onClick={finish} className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-bold tracking-wider text-sm hover:bg-primary/90">
                ACCÉDER À MON CATALOGUE →
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`.input{width:100%;border:1px solid var(--border);background:white;padding:0.7rem 0.9rem;border-radius:6px;font-size:0.9rem;outline:none;transition:border-color 0.2s}.input:focus{border-color:var(--primary);box-shadow:0 0 0 2px color-mix(in oklch, var(--primary) 20%, transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest font-bold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
