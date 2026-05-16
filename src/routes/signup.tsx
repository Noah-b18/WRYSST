import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { programs, type City, type Program } from "@/lib/watches";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

const cities: { name: City; x: number; y: number }[] = [
  { name: "Paris", x: 240, y: 120 },
  { name: "Lyon", x: 350, y: 230 },
  { name: "Bordeaux", x: 130, y: 290 },
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
    <div className="flex min-h-screen flex-col items-center bg-white px-4 py-6 sm:py-10">
      {/* progress */}
      <div className="mb-8 flex max-w-full items-center gap-2 overflow-hidden sm:mb-12 sm:gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
            >
              {step > n ? <Check className="w-4 h-4" /> : n}
            </div>
            {n < 3 && (
              <div className={`h-0.5 w-8 sm:w-12 ${step > n ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-1 justify-center">
        {step === 1 && (
          <div className="w-full max-w-[480px]">
            <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Créez votre compte
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Accès réservé aux membres Wrysst.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-5 mt-8"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="PRÉNOM">
                  <input className="input" required />
                </Field>
                <Field label="NOM">
                  <input className="input" required />
                </Field>
              </div>
              <Field label="DATE DE NAISSANCE">
                <div className="grid grid-cols-3 gap-2">
                  <select className="input">
                    <option>Jour</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                  </select>
                  <select className="input">
                    <option>Mois</option>
                    {[
                      "Jan",
                      "Fév",
                      "Mar",
                      "Avr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Aoû",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Déc",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select className="input">
                    <option>Année</option>
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i}>{2008 - i}</option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field label="EMAIL">
                <input type="email" className="input" required />
              </Field>
              <Field label="TÉLÉPHONE">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <select className="input">
                    <option>+33</option>
                  </select>
                  <input className="input" />
                </div>
              </Field>
              <Field label="MOT DE PASSE">
                <div className="relative">
                  <input type={showPwd ? "text" : "password"} className="input pr-10" required />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
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
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-bold tracking-wider text-sm hover:bg-primary/90"
              >
                CONTINUER →
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="text-center max-w-[480px]">
            <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Où êtes-vous ?
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Votre catalogue affichera en priorité les montres disponibles dans votre secteur.
            </p>
            <input
              placeholder="Entrez votre ville ou code postal..."
              className="input w-full mt-6 text-center"
              value={selectedCity ?? ""}
              onChange={(e) => setSelectedCity(e.target.value as City)}
            />
            <div className="mt-6 flex justify-center">
              <svg viewBox="0 0 500 450" className="w-full max-w-sm">
                {/* Hexagone représentant la France */}
                <polygon
                  points="240,40 410,137.5 410,312.5 240,410 70,312.5 70,137.5"
                  fill="#0047FF"
                  opacity="0.15"
                  stroke="#0047FF"
                  strokeWidth="1.5"
                />

                {cities.map((c) => {
                  const active = selectedCity === c.name;
                  return (
                    <g
                      key={c.name}
                      className="cursor-pointer"
                      onClick={() => setSelectedCity(c.name)}
                    >
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={active ? 12 : 7}
                        fill={active ? "#0047FF" : "#0A0A0A"}
                      />
                      <text
                        x={c.x}
                        y={c.y - 16}
                        textAnchor="middle"
                        className="text-xs font-bold"
                        fill={active ? "#0047FF" : "#0A0A0A"}
                      >
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <button
              disabled={!selectedCity}
              onClick={() => setStep(3)}
              className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-md font-bold tracking-wider text-sm disabled:opacity-40 hover:bg-primary/90"
            >
              VALIDER MA VILLE →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-5xl">
            <div className="text-center px-4 sm:px-6">
              <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase">
                Votre niveau d'accès
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                Vous pourrez le modifier à tout moment.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mt-8 px-4 sm:px-6">
              {programs.map((p) => {
                const active = selectedProgram === p.name;
                const isBlack = p.name === "BLACK EDITION";
                return (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProgram(p.name)}
                    className={`relative flex min-h-[250px] flex-col rounded-lg border-2 p-5 text-left transition duration-200 ${
                      active
                        ? isBlack
                          ? "border-black-edition bg-black-edition text-white shadow-[0_18px_38px_rgba(0,0,0,0.22)]"
                          : "border-primary bg-white shadow-[0_18px_38px_rgba(0,71,255,0.14)]"
                        : "border-border bg-secondary/50 text-foreground hover:border-foreground/40 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border ${
                        active
                          ? isBlack
                            ? "border-white bg-white text-black-edition"
                            : "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-white"
                      }`}
                    >
                      {active && <Check className="h-4 w-4" />}
                    </div>

                    <div className="pr-10">
                      <div
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          isBlack ? "text-white/60" : "text-muted-foreground"
                        }`}
                      >
                        Programme
                      </div>
                      <div className="font-display mt-2 text-2xl font-bold uppercase leading-tight">
                        {p.name}
                      </div>
                      <div
                        className={`mt-2 text-sm ${isBlack ? "text-white/70" : "text-muted-foreground"}`}
                      >
                        {p.tagline}
                      </div>
                    </div>

                    <div
                      className={`mt-7 rounded-md border p-4 ${
                        isBlack ? "border-white/15 bg-white/8" : "border-border bg-white"
                      }`}
                    >
                      <div className="font-display text-4xl font-bold leading-none">
                        {p.price}€
                        <span
                          className={`ml-1 text-sm font-normal ${
                            isBlack ? "text-white/60" : "text-muted-foreground"
                          }`}
                        >
                          / mois
                        </span>
                      </div>
                    </div>

                    <div
                      className={`mt-auto pt-5 text-xs leading-relaxed ${
                        isBlack ? "text-white/68" : "text-muted-foreground"
                      }`}
                    >
                      {p.brands}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-4 sm:px-6 mt-8">
              <button
                onClick={finish}
                className="w-full rounded-md bg-primary py-3.5 text-sm font-bold tracking-wider text-primary-foreground shadow-[0_16px_36px_rgba(0,71,255,0.22)] transition hover:bg-primary/90"
              >
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
