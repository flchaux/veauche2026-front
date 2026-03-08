import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

// Configurer le worker PDF.js via CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

function TractThumbnail({ tract, onClick }: { tract: Tract; onClick: () => void }) {
  return (
    <div
      className="group border-2 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 bg-card cursor-pointer"
      onClick={onClick}
    >
      {/* Miniature PDF */}
      <div className="relative h-52 bg-muted flex items-center justify-center overflow-hidden">
        <Document
          file={tract.url}
          loading={
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <FileText className="h-10 w-10" />
              <span className="text-xs">Aperçu indisponible</span>
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={240}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
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
            <h3 className="font-semibold text-card-foreground truncate">{tract.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{tract.description}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1 text-xs" onClick={(e) => { e.stopPropagation(); onClick(); }}>
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
  );
}

function PDFViewer({ tract, onClose, onPrev, onNext, hasPrev, hasNext }: {
  tract: Tract;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col">
      {/* Barre de contrôle */}
      <div className="flex items-center justify-between px-4 py-3 bg-background/95 border-b shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-5 w-5 text-primary shrink-0" />
          <span className="font-semibold text-foreground truncate">{tract.title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Navigation entre tracts */}
          <Button size="sm" variant="outline" onClick={onPrev} disabled={!hasPrev} className="hidden sm:flex">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={onNext} disabled={!hasNext} className="hidden sm:flex">
            <ChevronRight className="h-4 w-4" />
          </Button>
          {/* Zoom */}
          <Button size="sm" variant="outline" onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setScale((s) => Math.min(3, s + 0.2))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          {/* Pages */}
          {numPages > 0 && (
            <span className="text-xs text-muted-foreground hidden sm:inline whitespace-nowrap">
              {pageNumber} / {numPages}
            </span>
          )}
          {/* Télécharger */}
          <Button size="sm" variant="outline" asChild>
            <a href={tract.url} download={tract.filename} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Télécharger</span>
            </a>
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenu PDF scrollable */}
      <div className="flex-1 overflow-auto flex justify-center bg-zinc-800 p-4">
        <Document
          file={tract.url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-64 text-white">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 text-white gap-3">
              <FileText className="h-12 w-12 opacity-50" />
              <p>Impossible de charger le document</p>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="mb-4">
              <Page
                pageNumber={i + 1}
                scale={scale}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onRenderSuccess={() => { if (i === 0) setPageNumber(1); }}
              />
            </div>
          ))}
        </Document>
      </div>

      {/* Navigation mobile */}
      <div className="flex sm:hidden items-center justify-between px-4 py-3 bg-background/95 border-t shrink-0">
        <Button variant="outline" onClick={onPrev} disabled={!hasPrev} className="flex-1 mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
        </Button>
        <Button variant="outline" onClick={onNext} disabled={!hasNext} className="flex-1 ml-2">
          Suivant <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default function Tracts() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedTract = selectedIndex !== null ? TRACTS[selectedIndex] : null;

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
              Retrouvez ici tous les documents distribués par notre équipe sur le terrain.
              Cliquez sur un dépliant pour le consulter ou le télécharger.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des tracts */}
      <section className="py-12 flex-1">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACTS.map((tract, index) => (
              <TractThumbnail
                key={tract.id}
                tract={tract}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Viewer plein écran */}
      {selectedTract !== null && selectedIndex !== null && (
        <PDFViewer
          tract={selectedTract}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setSelectedIndex((i) => (i !== null && i < TRACTS.length - 1 ? i + 1 : i))}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < TRACTS.length - 1}
        />
      )}
    </div>
  );
}
