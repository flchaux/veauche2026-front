import { useEffect, useState } from "react";
import { getMesures } from "@/lib/strapi";
import type { Mesure } from "../../../shared/strapiTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Mesures() {
  const [mesures, setMesures] = useState<Mesure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMesures() {
      try {
        const data = await getMesures();
        setMesures(data);
      } catch (err) {
        setError("Erreur lors du chargement des mesures");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMesures();
  }, []);

  // Grouper les mesures par thème
  const mesuresParTheme = mesures.reduce((acc, mesure) => {
    const themeName = mesure.theme?.nom || "Autres";
    if (!acc[themeName]) {
      acc[themeName] = [];
    }
    acc[themeName].push(mesure);
    return acc;
  }, {} as Record<string, Mesure[]>);

  // Obtenir les thèmes dans l'ordre
  const themes = Object.keys(mesuresParTheme).sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des mesures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Veauche mérite mieux" className="h-10 w-10" />
            <span className="text-lg font-bold text-foreground hidden sm:inline">
              Veauche mérite mieux
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Accueil
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Nos Mesures pour Veauche
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez l'ensemble de nos propositions concrètes, organisées par thème.
              {themes.length} thèmes, {mesures.length} mesures pour transformer notre ville.
            </p>
          </div>
        </div>
      </section>

      {/* Mesures par Thème */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="space-y-16">
            {themes.map((theme, index) => {
              const mesuresDuTheme = mesuresParTheme[theme];
              
              return (
                <div key={theme} className="space-y-8">
                  {/* Titre du thème */}
                  <div className="text-center">
                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                      Thème {index + 1}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {theme}
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                  </div>

                  {/* Grille des mesures */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {mesuresDuTheme.map((mesure, mesureIndex) => (
                      <Card
                        key={mesure.id}
                        className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-bold text-lg">
                                {mesureIndex + 1}
                              </span>
                            </div>
                            <CardTitle className="text-xl leading-tight">
                              {mesure.titre}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {mesure.details}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 py-12 mt-auto">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2026 Veauche mérite mieux - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
