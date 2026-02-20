import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  getPriorites,
  getMembresEquipe,
  getMethodesGestion,
  getPhotosVille,
  getHeroSection,
  getPresentationCandidat,
  getSectionPriorites,
  getSectionEquipe,
  getMethodeSection,
  getFooter,
  getStrapiImageUrl,
  getParametresSite
} from "@/lib/strapi";
import type {
  Priorite,
  MembreEquipe,
  MethodeGestion,
  PhotoVille,
  HeroSection,
  PresentationCandidat,
  SectionPriorites,
  SectionEquipe,
  MethodeSection,
  Footer,
} from "../../../shared/strapiTypes";
import * as LucideIcons from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import RAGQuestion from "@/components/RAGQuestion";

// Fonction pour obtenir dynamiquement une icône Lucide par son nom
const getDynamicIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName];
  // Retourne l'icône demandée ou HelpCircle par défaut si non trouvée
  return Icon || LucideIcons.HelpCircle;
};

// Composants d'icônes utilisés directement (non dynamiques)
const { MessageSquare, Mail, Send, UserCircle2, ArrowRight, Loader2 } = LucideIcons;

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    opinion: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États pour les données Strapi
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [presentationData, setPresentationData] = useState<PresentationCandidat | null>(null);
  const [sectionPrioritesData, setSectionPrioritesData] = useState<SectionPriorites | null>(null);
  const [prioritesData, setPrioritesData] = useState<Priorite[]>([]);
  const [methodeSectionData, setMethodeSectionData] = useState<MethodeSection | null>(null);
  const [methodesData, setMethodesData] = useState<MethodeGestion[]>([]);
  const [sectionEquipeData, setSectionEquipeData] = useState<SectionEquipe | null>(null);
  const [membresData, setMembresData] = useState<MembreEquipe[]>([]);
  const [photosData, setPhotosData] = useState<PhotoVille[]>([]);
  const [footerData, setFooterData] = useState<Footer | null>(null);
  const [parametresSite, setParametresSite] = useState<{afficher_bloc_rag: boolean, equipe_complete_disponible: boolean} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement des données Strapi au montage du composant
  useEffect(() => {
    async function loadData() {
      try {
        const [
          hero,
          presentation,
          sectionPriorites,
          priorites,
          methodeSection,
          methodes,
          sectionEquipe,
          membres,
          photos,
          footer,
          parametres
        ] = await Promise.all([
          getHeroSection(),
          getPresentationCandidat(),
          getSectionPriorites(),
          getPriorites(),
          getMethodeSection(),
          getMethodesGestion(),
          getSectionEquipe(),
          getMembresEquipe(true), // Membres clés uniquement
          getPhotosVille(),
          getFooter(),
          getParametresSite()
        ]);

        setHeroData(hero);
        setPresentationData(presentation);
        setSectionPrioritesData(sectionPriorites);
        setPrioritesData(priorites);
        setMethodeSectionData(methodeSection);
        setMethodesData(methodes);
        setSectionEquipeData(sectionEquipe);
        setMembresData(membres);
        setPhotosData(photos);
        setFooterData(footer);
        setParametresSite(parametres);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.opinion) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/email-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            message: formData.opinion,
            source: 'question'
          }
        })
      });
      
      if (response.ok) {
        toast.success("Merci pour votre question ! Nous vous répondrons bientôt.");
        setFormData({ name: "", email: "", opinion: "" });
      } else {
        toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Afficher un loader pendant le chargement initial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Veauche mérite mieux" className="h-10 w-10" />
            <span className="text-lg font-bold text-foreground hidden sm:inline">Veauche mérite mieux</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#qui-sommes-nous" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Qui sommes-nous
            </a>
            <a href="#priorites" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Nos priorités
            </a>
            <a href="#equipe" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              L'équipe
            </a>
          </nav>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="#vos-questions">Posez une question</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section avec Header Image */}
        <section className="relative">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            {/* Background image */}
            <img 
              src="/header_background.jpg"
              alt="Veauche" 
              className="w-full h-full object-cover"
            />
            {/* Logo centré par-dessus */}
            <div className="absolute inset-0 flex items-start pt-12 md:pt-16 justify-center">
              <img 
                src="/logo_white.png" 
                alt="Veauche Mérite Mieux" 
                className="w-auto h-32 md:w-[512px] md:h-auto object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          </div>
          <div className="container relative -mt-24 pb-12">
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              {/* Bloc Hero à gauche */}
              <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-2">
                <CardContent className="p-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    {heroData?.titre || "Ensemble, redonnons de l'air à Veauche"}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    {heroData?.description || "Les élections municipales de 2026 sont l'occasion de choisir l'avenir de notre ville. Nous voulons une Veauche plus respirable, plus solidaire, et mieux gérée. Vos questions comptent."}
                  </p>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <a href="#vos-questions">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      {heroData?.texte_bouton || "Posez une question"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Bloc RAG à droite - conditionné par Strapi */}
              {parametresSite?.afficher_bloc_rag && (
                <div className="lg:sticky lg:top-20">
                  <RAGQuestion />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section Présentation */}
        <section id="qui-sommes-nous" className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {presentationData?.badge || "Candidat aux municipales 2026"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {presentationData?.titre || "Un engagement pour Veauche"}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {presentationData?.paragraphe_1 || "Je suis né à Montbrison il y a 34 ans, Forezien de souche. Ma vie est à Veauche : ma fille vient d'entrer en maternelle, nous faisons du tennis, ma femme travaille à Badoit et a créé une association caritative sur la commune."}
                  </p>
                  <p>
                    {presentationData?.paragraphe_2 || "Je crois profondément que Veauche a un grand potentiel, mais qu'elle doit se tourner vers l'avenir et mettre en avant ses atouts : ses associations dynamiques, sa position stratégique entre agglomération et campagne, et son tissu industriel."}
                  </p>
                </div>
                <div className="pt-6 border-t">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {presentationData?.titre_equipe || "Notre équipe"}
                  </h3>
                  <p className="text-muted-foreground">
                    {presentationData?.description_equipe || "Nous avons constitué une liste représentative de tous les Veauchois : politiquement, socialement, en termes de générations et de quartiers. Une équipe complémentaire qui allie le dynamisme de la jeunesse à l'expérience et la connaissance de notre ville."}
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
                  <img 
                    src={presentationData?.photo_candidat?.url ?
                      getStrapiImageUrl(presentationData?.photo_candidat?.url) :
                      "/portrait.png"
                    }
                    alt="Portrait du candidat" 
                    className="relative rounded-2xl shadow-2xl w-full max-h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Priorités */}
        <section id="priorites" className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {sectionPrioritesData?.titre || "Nos 3 priorités pour Veauche"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {sectionPrioritesData?.description || "Un programme concret, réaliste et ambitieux pour redonner de l'air à notre ville."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {prioritesData.map((priorite) => {
                const IconComponent = getDynamicIcon(priorite?.icone || "Trees");
                return (
                  <Card key={priorite.id} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8 space-y-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{priorite?.titre}</h3>
                      <p className="text-sm text-accent font-medium">{priorite?.soustitre}</p>
                      <ul className="space-y-2">
                        {(priorite?.actions || "").split('\n').filter(Boolean).map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Photos de Veauche */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {photosData.slice(0, 2).map((photo) => (
                <div key={photo.id} className="relative rounded-lg overflow-hidden shadow-lg group">
                  <img 
                    src={photo?.image?.url ?
                      getStrapiImageUrl(photo?.image?.url) :
                      "/vue-veauche-1.jpg"
                    }
                    alt={photo?.legende} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{photo?.legende}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Méthode de Gestion */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {methodeSectionData?.titre || "Notre méthode de gestion"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {methodesData.map((methode) => {
                const IconComponent = getDynamicIcon(methode?.icone || "Shield");
                return (
                  <div key={methode.id} className="flex items-start gap-4 p-6 bg-background rounded-lg border-2 hover:border-primary/50 transition-all">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      {IconComponent && <IconComponent className="h-6 w-6 text-accent" />}
                    </div>
                    <p className="text-foreground font-medium">{methode?.texte}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section Équipe */}
        <section id="equipe" className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {sectionEquipeData?.titre || "Une équipe engagée pour Veauche"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {sectionEquipeData?.description || "Des Veauchois de tous horizons, unis par la même volonté : redonner de l'air à notre ville."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {membresData.map((membre) => (
                <Card key={membre.id} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative  rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <img 
                        src={membre?.photo?.url ?
                          getStrapiImageUrl(membre?.photo?.url) :
                          "/portrait.png"
                        }
                        alt={membre?.nom}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{membre?.nom}</h3>
                      <p className="text-sm text-primary font-medium">{membre?.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{membre?.biographie}</p>
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <UserCircle2 className="h-4 w-4" />
                      <span>{membre?.quartier}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Bloc Équipe complète ou Bientôt disponible - conditionnée par Strapi */}
              {parametresSite?.equipe_complete_disponible ? (
                // Bouton vers la liste complète
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex items-center justify-center">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <h3 className="text-xl font-bold text-foreground mb-4 text-center">Découvrez toute l'équipe</h3>
                    <p className="text-sm text-muted-foreground mb-6 text-center">30 colistiers engagés pour Veauche</p>
                    <Link href="/equipe">
                      <Button size="lg" className="gap-2">
                        Voir l'équipe complète
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                // Formulaire "Bientôt disponible"
                <Card className="border-2 bg-muted/50">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-xl font-semibold mb-2">Bientôt disponible</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pour être averti de la mise en ligne de l'équipe complète, laissez votre email
                    </p>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const formData = new FormData(form);
                        const email = formData.get('email') as string;
                        
                        try {
                          const response = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/email-contacts`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
                            },
                            body: JSON.stringify({
                              data: {
                                email: email,
                                source: 'equipe_notification'
                              }
                            })
                          });
                          
                          if (response.ok) {
                            alert('✅ Merci ! Vous serez averti de la mise en ligne de l\'équipe.');
                            form.reset();
                          } else {
                            alert('❌ Une erreur est survenue. Veuillez réessayer.');
                          }
                        } catch (error) {
                          console.error('Erreur:', error);
                          alert('❌ Une erreur est survenue. Veuillez réessayer.');
                        }
                      }}
                      className="flex flex-col gap-2"
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="votre@email.fr"
                        required
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm"
                      />
                      <Button type="submit" size="sm" className="w-full">
                        M'avertir
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Section Formulaire */}
        <section id="vos-questions" className="py-20 bg-primary text-primary-foreground">
          <div className="container max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Posez vos questions
              </h2>
              <p className="text-lg opacity-90">
                Vous avez une question sur notre programme, nos propositions ou notre vision pour Veauche ? Nous sommes à votre écoute. Posez-nous vos questions, nous vous répondrons avec plaisir.
              </p>
            </div>

            <Card className="bg-background text-foreground">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Votre nom *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Votre email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Votre email nous permet de vous recontacter et de vous tenir informé de notre campagne.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="opinion" className="block text-sm font-medium mb-2">
                      Votre question *
                    </label>
                    <Textarea
                      id="opinion"
                      value={formData.opinion}
                      onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/icon.png" alt="Veauche mérite mieux" className="h-12 w-12" />
                <span className="text-lg font-bold text-foreground">Veauche mérite mieux</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {footerData?.description || "Redonnons de l'air à notre ville"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#priorites" className="text-muted-foreground hover:text-foreground transition-colors">Nos priorités</a></li>
                <li><a href="#qui-sommes-nous" className="text-muted-foreground hover:text-foreground transition-colors">Qui sommes-nous</a></li>
                <li><a href="#equipe" className="text-muted-foreground hover:text-foreground transition-colors">L'équipe</a></li>
                <li><a href="#vos-questions" className="text-muted-foreground hover:text-foreground transition-colors">Vos questions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{footerData?.ville || "Veauche, Loire (42)"}</li>
                <li>{footerData?.annee_election || "Élections municipales 2026"}</li>
                <li className="pt-2">
                  <a href="#vos-questions" className="text-primary hover:underline">
                    {footerData?.texte_contact || "Nous contacter"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Veauche mérite mieux. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
