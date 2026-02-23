import { useEffect, useState } from "react";
import { getMesures } from "@/lib/strapi";
import type { Mesure, PrioriteProgramme } from "../../../shared/strapiTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { submitVote, addCommentToVote, type VoteType } from "@/lib/voteApi";
import { hasVotedForMesure } from "@/lib/voteCookie";
import { toast } from "sonner";
import { getStrapiImageUrl } from "@/lib/strapi";
import MobileMenu from "@/components/MobileMenu";
import { Header } from "@/components/Header";

interface VoteState {
  voted: boolean;
  voteType?: VoteType;
  voteId?: number;
  showFeedback: boolean;
  feedback: string;
  animating: boolean;
}

interface PrioriteAvecMesures {
  priorite: PrioriteProgramme;
  mesures: Mesure[];
}

export default function Mesures() {
  const [mesures, setMesures] = useState<Mesure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // État des votes par mesure
  const [voteStates, setVoteStates] = useState<Record<number, VoteState>>({});
  
  // État du formulaire de contact
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  useEffect(() => {
    async function loadMesures() {
      try {
        const data = await getMesures();
        setMesures(data);
        
        // Initialiser l'état des votes
        const initialStates: Record<number, VoteState> = {};
        data.forEach(mesure => {
          initialStates[mesure.id] = {
            voted: hasVotedForMesure(mesure.id),
            showFeedback: false,
            feedback: "",
            animating: false
          };
        });
        setVoteStates(initialStates);
      } catch (err) {
        setError("Erreur lors du chargement des mesures");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMesures();
  }, []);

  const handleVote = async (mesureId: number, voteType: VoteType) => {
    const currentState = voteStates[mesureId];
    
    if (currentState?.voted) {
      toast.error("Vous avez déjà voté pour cette mesure");
      return;
    }

    // Animation
    setVoteStates(prev => ({
      ...prev,
      [mesureId]: { ...prev[mesureId], animating: true }
    }));

    // Attendre un peu pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = await submitVote(mesureId, voteType);

    if (result.success) {
      setVoteStates(prev => ({
        ...prev,
        [mesureId]: {
          ...prev[mesureId],
          voted: true,
          voteType,
          voteId: result.voteId,
          showFeedback: voteType === 'dislike',
          animating: false
        }
      }));

      if (voteType === 'like') {
        toast.success("Merci pour votre soutien !");
      }
    } else {
      setVoteStates(prev => ({
        ...prev,
        [mesureId]: { ...prev[mesureId], animating: false }
      }));
      toast.error(result.message || "Une erreur est survenue");
    }
  };

  const handleFeedbackSubmit = async (mesureId: number) => {
    const state = voteStates[mesureId];
    
    if (!state?.voteId || !state.feedback.trim()) {
      toast.error("Veuillez saisir un commentaire");
      return;
    }

    const result = await addCommentToVote(state.voteId, state.feedback);

    if (result.success) {
      toast.success("Merci pour votre retour ! Nous prenons en compte vos remarques.");
      setVoteStates(prev => ({
        ...prev,
        [mesureId]: {
          ...prev[mesureId],
          showFeedback: false,
          feedback: ""
        }
      }));
    } else {
      toast.error(result.message || "Une erreur est survenue");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmittingContact(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/email-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
            source: 'programme'
          }
        })
      });
      
      if (response.ok) {
        toast.success("Merci pour votre question ! Nous vous répondrons bientôt.");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Grouper les mesures par priorité
  const mesuresParPriorite: PrioriteAvecMesures[] = [];
  const prioritesMap = new Map<number, PrioriteAvecMesures>();

  mesures.forEach(mesure => {
    if (mesure.priorite_programme) {
      const prioriteId = mesure.priorite_programme.id;
      if (!prioritesMap.has(prioriteId)) {
        prioritesMap.set(prioriteId, {
          priorite: mesure.priorite_programme,
          mesures: []
        });
      }
      prioritesMap.get(prioriteId)!.mesures.push(mesure);
    }
  });

  // Convertir en tableau et trier par ordre
  mesuresParPriorite.push(...Array.from(prioritesMap.values()));
  mesuresParPriorite.sort((a, b) => (a.priorite.ordre || 0) - (b.priorite.ordre || 0));

  // Trier les mesures dans chaque priorité
  mesuresParPriorite.forEach(item => {
    item.mesures.sort((a, b) => (a.ordre || 0) - (b.ordre || 0));
  });

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
    <div className="min-h-screen flex flex-col">
      <MobileMenu currentPage="/mesures" />
      <Header currentPage="/mesures" />

      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Nos Mesures pour Veauche
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez l'ensemble de nos propositions concrètes, organisées par priorité.
              {mesuresParPriorite.length} priorités, {mesures.length} mesures pour transformer notre ville.
            </p>
          </div>
        </div>
      </section>

      {/* Mesures par Priorité */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="space-y-20">
            {mesuresParPriorite.map((item, index) => {
              const { priorite, mesures: mesuresDeLaPriorite } = item;
              
              return (
                <div key={priorite.id} className="space-y-8">
                  {/* En-tête de la priorité */}
                  <div className="space-y-6">
                    {/* Titre */}
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center capitalize">
                      {priorite.titre}
                    </h2>

                    {/* Intro dans un bloc coloré */}
                    {priorite.intro && (
                      <div className="max-w-3xl mx-auto">
                        <div className="bg-[#0D6EB2] border-2 border-[#DF9F14] rounded-lg p-8 shadow-lg">
                          <p className="text-lg text-white leading-relaxed text-center">
                            {priorite.intro}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Séparateur */}
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                  </div>

                  {/* Liste des mesures */}
                  <div className="max-w-5xl mx-auto space-y-6">
                    {mesuresDeLaPriorite.map((mesure) => {
                      const voteState = voteStates[mesure.id] || {
                        voted: false,
                        showFeedback: false,
                        feedback: "",
                        animating: false
                      };

                      // Vérifier si la priorité a des images
                      const hasImage = priorite.image && priorite.image.length > 0;
                      const imageUrl = hasImage ? getStrapiImageUrl(priorite.image[0].url) : null;

                      return (
                        <Card
                          key={mesure.id}
                          id={`mesure-${mesure.id}`}
                          className="border-2 hover:border-primary/30 transition-all duration-300 scroll-mt-24"
                        >
                          <CardContent className="p-6">
                            <div className="flex gap-6 items-start">
                              {/* Numéro de la mesure */}
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">
                                  {mesure.ordre}
                                </span>
                              </div>

                              {/* Contenu de la mesure */}
                              <div className="flex-1 space-y-4">
                                {/* Titre et image sur la même ligne */}
                                <div className="flex gap-4 items-center">
                                  <h3 className="text-lg font-semibold text-foreground flex-1">
                                    {mesure.titre}
                                  </h3>
                                  {imageUrl && (
                                    <img
                                      src={imageUrl}
                                      alt={priorite.titre}
                                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                  )}
                                </div>

                                {/* Détails */}
                                {mesure.details && (
                                  <p className="text-muted-foreground leading-relaxed">
                                    {mesure.details}
                                  </p>
                                )}

                                {/* Boutons de vote */}
                                {!voteState.voted && (
                                  <div className="flex items-center gap-3 pt-4 border-t">
                                    <span className="text-sm text-muted-foreground">
                                      Votre avis :
                                    </span>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleVote(mesure.id, 'like')}
                                        disabled={voteState.animating}
                                        className={`transition-all duration-300 hover:bg-green-50 hover:border-green-500 hover:text-green-600 ${
                                          voteState.animating && voteState.voteType === 'like'
                                            ? 'animate-bounce bg-green-50 border-green-500 text-green-600 scale-110'
                                            : ''
                                        }`}
                                      >
                                        <ThumbsUp className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleVote(mesure.id, 'dislike')}
                                        disabled={voteState.animating}
                                        className={`transition-all duration-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600 ${
                                          voteState.animating && voteState.voteType === 'dislike'
                                            ? 'animate-bounce bg-red-50 border-red-500 text-red-600 scale-110'
                                            : ''
                                        }`}
                                      >
                                        <ThumbsDown className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Message après vote positif */}
                                {voteState.voted && voteState.voteType === 'like' && (
                                  <div className="flex items-center gap-2 pt-4 border-t text-green-600">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="text-sm font-medium">
                                      Merci pour votre soutien !
                                    </span>
                                  </div>
                                )}

                                {/* Formulaire de feedback pour vote négatif */}
                                {voteState.showFeedback && (
                                  <div className="space-y-3 pt-4 border-t">
                                    <p className="text-sm text-muted-foreground">
                                      Pouvez-vous nous expliquer pourquoi cette mesure ne vous convient pas ?
                                    </p>
                                    <Textarea
                                      placeholder="Votre commentaire..."
                                      value={voteState.feedback}
                                      onChange={(e) =>
                                        setVoteStates(prev => ({
                                          ...prev,
                                          [mesure.id]: {
                                            ...prev[mesure.id],
                                            feedback: e.target.value
                                          }
                                        }))
                                      }
                                      className="min-h-[80px]"
                                    />
                                    <Button
                                      onClick={() => handleFeedbackSubmit(mesure.id)}
                                      size="sm"
                                    >
                                      Envoyer mon avis
                                    </Button>
                                  </div>
                                )}

                                {/* Message après feedback envoyé */}
                                {voteState.voted && voteState.voteType === 'dislike' && !voteState.showFeedback && (
                                  <div className="flex items-center gap-2 pt-4 border-t text-muted-foreground">
                                    <ThumbsDown className="h-4 w-4" />
                                    <span className="text-sm">
                                      Merci pour votre retour
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Donnez votre avis */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Vous avez une question ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Posez-nous vos questions sur notre programme ou sur notre vision pour Veauche.
              Nous vous répondrons personnellement.
            </p>
          </div>

          <Card className="bg-background text-foreground">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    Votre nom *
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    Votre email *
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Votre email nous permet de vous recontacter et de vous tenir informé de notre campagne.
                  </p>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                    Votre question *
                  </label>
                  <Textarea
                    id="contact-message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full"
                    placeholder="Quelle question souhaitez-vous poser à Florian Chaux et son équipe ?"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmittingContact}
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer ma question
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d'être recontacté par l'équipe "Veauche mérite mieux".
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-8 mt-auto">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Veauche mérite mieux - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}
