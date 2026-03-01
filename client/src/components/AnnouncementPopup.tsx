import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "announcement_reunion_mars_dismissed";

export default function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) {
      // Petit délai pour laisser la page se charger
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative bg-background rounded-2xl shadow-2xl border-2 border-primary/30 max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bandeau coloré en haut */}
        <div className="bg-[#0D6EB2] px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Événement à venir
            </span>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="px-6 py-6 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground leading-tight">
              Réunion publique
            </h2>
            <p className="text-primary font-semibold text-lg mt-1">
              Veauche mérite mieux
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-foreground">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Mardi 10 mars 2026 à 19h30</span>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">l'escale, Veauche</span>
            </div>

            <div className="flex items-start gap-3 text-foreground">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Mic className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground text-sm leading-relaxed">
                Sous la forme d'un entretien présenté par{" "}
                <span className="font-semibold text-foreground">Julien Robin</span>,
                comédien veauchois de talent
              </span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              className="flex-1 bg-[#DF9F14] hover:bg-[#DF9F14]/90 text-white font-semibold"
              onClick={handleClose}
            >
              J'y serai !
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
