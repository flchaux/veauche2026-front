import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, Sparkles } from "lucide-react";

interface RAGSource {
  collectionName: string;
  documentId: number;
  content: string;
  similarity: number;
}

interface RAGResponse {
  answer: string;
  sources: RAGSource[];
}

export default function RAGQuestion() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<RAGResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/rag/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          collectionName: 'mesure',
          topK: 5
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erreur API RAG:', res.status, errorText);
        throw new Error(`Erreur ${res.status}: ${errorText}`);
      }

      const data: RAGResponse = await res.json();
      setResponse(data);
      
      // Enregistrer la question/réponse dans Strapi
      try {
        // Récupérer l'IP de l'utilisateur
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        const saveResponse = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/rag-questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
          },
          body: JSON.stringify({
            data: {
              question: question,
              answer: data.answer,
              ip: ipData.ip
            }
          })
        });
        
        if (!saveResponse.ok) {
          const errorText = await saveResponse.text();
          console.error('Erreur enregistrement question:', saveResponse.status, errorText);
        } else {
          console.log('Question enregistrée avec succès');
        }
      } catch (logError) {
        // Erreur silencieuse pour ne pas perturber l'expérience utilisateur
        console.error('Erreur lors de l\'enregistrement de la question:', logError);
      }
    } catch (err) {
      console.error('Erreur RAG:', err);
      setError("Désolé, une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion("");
    setResponse(null);
    setError(null);
  };

  return (
        <Card className="shadow-xl border-2 border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <CardContent className="p-6 md:p-8">
            {!response ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Une question sur notre programme ?</h3>
                    <p className="text-sm text-muted-foreground">Posez votre question, notre assistant Veauchois vous répond</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ex: Quelles sont vos priorités pour l'environnement ?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-1 h-12 text-base"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isLoading || !question.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">Votre question</h3>
                      <p className="text-sm text-muted-foreground italic">"{question}"</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-3">Réponse :</h4>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {response.answer}
                  </p>
                </div>

                {response.sources && response.sources.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Sources : {response.sources.length} document{response.sources.length > 1 ? 's' : ''} consulté{response.sources.length > 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  Poser une autre question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
  );
}
