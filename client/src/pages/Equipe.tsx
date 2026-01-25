import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { APP_LOGO } from "@/const";
import { getMembresEquipe, getStrapiImageUrl } from "@/lib/strapi";
import type { MembreEquipe } from "../../../shared/strapiTypes";

export default function Equipe() {
  const [membresData, setMembresData] = useState<MembreEquipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const membres = await getMembresEquipe();
        // Tri alphabétique par nom
        const membresTries = (membres || []).sort((a, b) => {
          const nomA = a.nom?.toLowerCase() || '';
          const nomB = b.nom?.toLowerCase() || '';
          return nomA.localeCompare(nomB, 'fr');
        });
        setMembresData(membresTries);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header avec navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-foreground">Veauche Mérite Mieux</span>
          </a>
          <nav className="flex gap-6">
            <a href="/#priorites" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Priorités
            </a>
            <a href="/#equipe" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Équipe
            </a>
            <a href="/#avis" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Donnez votre avis
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Notre Équipe
              </h1>
              <p className="text-lg text-muted-foreground">
                Une équipe de 30 Veauchois engagés, de tous les quartiers, unis par la même volonté : 
                redonner de l'air à notre ville. Des compétences variées, des générations différentes, 
                un seul objectif : l'intérêt général.
              </p>
            </div>
          </div>
        </section>

        {/* Trombinoscope */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {membresData.map((membre) => (
                <Card key={membre.id} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-6 space-y-4">
                    {/* Photo */}
                    <div className="relative rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={membre?.photo?.url ?
                          getStrapiImageUrl(membre?.photo?.url) :
                          "/portrait.png"
                        }
                        alt={membre?.nom}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Nom et fonction */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-foreground">{membre?.nom}</h3>
                      <p className="text-sm text-primary font-medium mt-1">{membre?.role}</p>
                    </div>
                    
                    {/* Citation */}
                    {membre?.citation && (
                      <div className="relative pt-4 border-t">
                        <Quote className="h-5 w-5 text-accent/30 absolute -top-2 left-1/2 -translate-x-1/2 bg-background px-2" />
                        <p className="text-sm text-muted-foreground italic text-center">
                          "{membre.citation}"
                        </p>
                      </div>
                    )}
                    
                    {/* Quartier (optionnel) */}
                    {membre?.quartier && (
                      <div className="text-center">
                        <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {membre.quartier}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Vous aussi, rejoignez-nous !
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Vous partagez nos valeurs et notre vision pour Veauche ? 
                Vous souhaitez vous engager à nos côtés ? Contactez-nous !
              </p>
              <a 
                href="/#avis" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Donnez votre avis
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Logo" className="h-8 w-auto" />
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold">Veauche Mérite Mieux</p>
                <p>Redonnons de l'air à notre ville</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>Veauche, Loire (42)</p>
              <p>Élections municipales 2026</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
