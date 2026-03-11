import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video";
  url: string;
  filename?: string;
}

const DOCUMENTS: Document[] = [
  {
    id: "equipe",
    title: "Notre équipe",
    description: "Présentation des membres de la liste Veauche mérite mieux",
    type: "pdf",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/equipe_da673fcb.pdf",
    filename: "veauche-merite-mieux-equipe.pdf",
  },
  {
    id: "profession",
    title: "Profession de foi",
    description: "Notre engagement et nos valeurs pour Veauche",
    type: "pdf",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/profession_8514fc85.pdf",
    filename: "veauche-merite-mieux-profession-de-foi.pdf",
  },
  {
    id: "programme",
    title: "Programme complet",
    description: "L'ensemble de nos mesures et propositions pour Veauche",
    type: "pdf",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/programme_61830d78.pdf",
    filename: "veauche-merite-mieux-programme.pdf",
  },
  {
    id: "bulletin",
    title: "Bulletin de vote",
    description: "Le bulletin officiel de la liste Veauche mérite mieux",
    type: "pdf",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/112885793/g6JrkeezNXgbHadPyGByc2/Bulletin_aed27e86.pdf",
    filename: "veauche-merite-mieux-bulletin-de-vote.pdf",
  },
  {
    id: "video-dailymotion",
    title: "Notre passage dans les médias",
    description: "Regardez notre interview diffusée sur Dailymotion",
    type: "video",
    url: "https://www.dailymotion.com/video/xa11msi",
  },
];

export default function Tracts() {
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
              Nos documents
            </h1>
            <p className="text-muted-foreground text-lg">
              Retrouvez ici tous les documents et médias produits par notre équipe.
            </p>
          </div>
        </div>
      </section>

      {/* Liste des documents */}
      <section className="py-12 flex-1">
        <div className="container max-w-2xl">
          <div className="space-y-4">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 border-2 rounded-xl bg-card hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  {doc.type === "video" ? (
                    <Video className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">{doc.description}</p>
                </div>
                {doc.type === "pdf" ? (
                  <Button asChild size="sm" className="shrink-0">
                    <a href={doc.url} download={doc.filename} target="_blank" rel="noreferrer">
                      <Download className="h-4 w-4 mr-1.5" />
                      Télécharger
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="sm" variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-white">
                    <a href={doc.url} target="_blank" rel="noreferrer">
                      <Video className="h-4 w-4 mr-1.5" />
                      Regarder
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
