import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, FileText, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Tract {
  id: string;
  title: string;
  description: string;
  url: string;
  filename: string;
}

const TRACTS: Tract[] = [
  {
    id: "equipe",
    title: "Notre équipe",
    description: "Présentation des membres de la liste Veauche mérite mieux",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/equipe_da673fcb.pdf",
    filename: "veauche-merite-mieux-equipe.pdf",
  },
  {
    id: "profession",
    title: "Profession de foi",
    description: "Notre engagement et nos valeurs pour Veauche",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/profession_8514fc85.pdf",
    filename: "veauche-merite-mieux-profession-de-foi.pdf",
  },
  {
    id: "programme",
    title: "Programme complet",
    description: "L'ensemble de nos mesures et propositions pour Veauche",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/programme_61830d78.pdf",
    filename: "veauche-merite-mieux-programme.pdf",
  },
];

export default function Tracts() {
  const [selectedTract, setSelectedTract] = useState<Tract | null>(null);

  const currentIndex = selectedTract
    ? TRACTS.findIndex((t) => t.id === selectedTract.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setSelectedTract(TRACTS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < TRACTS.length - 1)
      setSelectedTract(TRACTS[currentIndex + 1]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="py-12 bg-secondary/30 border-b">
        <div className="container">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Documents de campagne
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Nos dépliants
            </h1>
            <p className="text-muted-foreground text-lg">
              Retrouvez ici tous les documents distribués par notre équipe sur
              le terrain. Cliquez sur un dépliant pour le consulter ou le
              télécharger.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des tracts */}
      <section className="py-12 flex-1">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACTS.map((tract) => (
              <div
                key={tract.id}
                className="group border-2 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 bg-card cursor-pointer"
                onClick={() => setSelectedTract(tract)}
              >
                {/* Miniature PDF via iframe */}
                <div className="relative h-52 bg-muted overflow-hidden">
                  <iframe
                    src={`${tract.url}#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=75`}
                    className="w-full h-full pointer-events-none"
                    title={tract.title}
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-primary/5 transition-colors" />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                      Consulter
                    </div>
                  </div>
                </div>

                {/* Infos */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground truncate">
                        {tract.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                        {tract.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTract(tract);
                      }}
                    >
                      Consulter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={tract.url} download={tract.filename} target="_blank" rel="noreferrer">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Viewer plein écran */}
      {selectedTract && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          {/* Barre de contrôle */}
          <div className="flex items-center justify-between px-4 py-3 bg-background/95 border-b shrink-0">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">
                {selectedTract.title}
              </span>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                ({currentIndex + 1} / {TRACTS.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex === TRACTS.length - 1}
                className="hidden sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={selectedTract.url}
                  download={selectedTract.filename}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Télécharger</span>
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedTract(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Iframe PDF */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`${selectedTract.url}#toolbar=1&navpanes=0`}
              className="w-full h-full"
              title={selectedTract.title}
            />
          </div>

          {/* Navigation mobile */}
          <div className="flex sm:hidden items-center justify-between px-4 py-3 bg-background/95 border-t shrink-0">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === TRACTS.length - 1}
              className="flex-1 ml-2"
            >
              Suivant <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
