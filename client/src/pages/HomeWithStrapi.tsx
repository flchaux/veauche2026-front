import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trees, 
  School, 
  Users, 
  Shield,
  Heart,
  Building2,
  MessageSquare,
  Mail,
  Send,
  UserCircle2,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    opinion: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.opinion) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi (à remplacer par une vraie API)
    setTimeout(() => {
      toast.success("Merci pour votre avis ! Nous vous recontacterons bientôt.");
      setFormData({ name: "", email: "", opinion: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Veauche Mérite Mieux" className="h-10 w-10" />
            <span className="text-lg font-bold text-foreground hidden sm:inline">Veauche Mérite Mieux</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#priorites" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Nos priorités
            </a>
            <a href="#qui-sommes-nous" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Qui sommes-nous
            </a>
            <a href="/equipe" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              L'équipe
            </a>
            <a href="#votre-avis" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Votre avis
            </a>
            <Button variant="default" size="sm" asChild>
              <a href="#votre-avis">Donnez votre avis</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section avec Header Image */}
      <section className="relative">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/112885793/AuSyanaWXmzgGrZP.png" 
            alt="Veauche Mérite Mieux - Redonnons de l'air à notre ville" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </div>
        <div className="container relative -mt-24 pb-12">
          <div className="max-w-3xl">
            <div className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 rounded-lg p-8 shadow-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ensemble, redonnons de l'air à Veauche
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Les élections municipales de 2026 sont l'occasion de choisir l'avenir de notre ville. 
                Nous voulons une Veauche plus respirable, plus solidaire, et mieux gérée. 
                <span className="font-semibold text-foreground"> Votre avis compte.</span>
              </p>
              <Button size="lg" className="text-base" asChild>
                <a href="#votre-avis">
                  Donnez votre avis
                  <MessageSquare className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Présentation Personnelle */}
      <section id="qui-sommes-nous" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  Candidat aux municipales 2026
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Un engagement pour Veauche
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je suis né à Montbrison il y a 34 ans, Forezien de souche. Ma vie est à Veauche : 
                ma fille vient d'entrer en maternelle, nous faisons du tennis, ma femme travaille à Badoit 
                et a créé une association caritative sur la commune.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je crois profondément que <span className="font-semibold text-foreground">Veauche a un grand potentiel</span>, 
                mais qu'elle doit se tourner vers l'avenir et mettre en avant ses atouts : ses associations dynamiques, 
                sa position stratégique entre agglomération et campagne, et son tissu industriel.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Notre équipe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nous avons constitué une liste représentative de tous les Veauchois : 
                  politiquement, socialement, en termes de générations et de quartiers. 
                  Une équipe complémentaire qui allie <span className="font-semibold text-foreground">le dynamisme 
                  de la jeunesse à l'expérience et la connaissance de notre ville</span>.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3" />
                <img 
                  src="/portrait.png" 
                  alt="Portrait du candidat" 
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des 3 Priorités */}
      <section id="priorites" className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Nos 3 priorités pour Veauche
            </h2>
            <p className="text-lg text-muted-foreground">
              Un programme concret, réaliste et ambitieux pour redonner de l'air à notre ville.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Priorité 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trees className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                    Une ville respirable et apaisée
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Cadre de vie, environnement, urbanisme maîtrisé
                  </p>
                </div>
                <ul className="space-y-3 text-card-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Ramener de la verdure et protéger nos espaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Apaiser la circulation et développer les mobilités douces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Renforcer la sécurité et lutter contre les incivilités</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Développer le réseau de vidéoprotection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Priorité 2 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <School className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                    Préserver nos biens communs
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Écoles, voiries, patrimoine, finances responsables
                  </p>
                </div>
                <ul className="space-y-3 text-card-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Rénover nos écoles et bâtiments municipaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Embellir et assurer la propreté de nos espaces publics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Offrir des aires de jeux bien entretenues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Principe : 1 euro dépensé = 1 euro utile</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Priorité 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                    Recréer du lien humain
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    Solidarité, intergénérationnel, vie locale
                  </p>
                </div>
                <ul className="space-y-3 text-card-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Aider nos seniors et faciliter leur quotidien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Soutenir et promouvoir le tissu associatif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Renforcer les liens entre générations et quartiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Renforcer la démocratie citoyenne</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Photos de Veauche */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/vue-veauche-1.jpg" 
                alt="Vue de Veauche" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Notre belle ville de Veauche</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/vue-veauche-2.jpg" 
                alt="Vue de Veauche" 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">Un cadre de vie à préserver</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Méthode */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Notre méthode de gestion</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Shield, text: "Suivi des projets en ligne et transparence totale" },
                { icon: Heart, text: "Principe : 1 euro dépensé = 1 euro utile" },
                { icon: Building2, text: "Maîtrise des taxes, optimisation des dépenses" },
                { icon: Users, text: "Budget participatif et démocratie citoyenne" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 bg-card p-4 rounded-lg border">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-card-foreground pt-2">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Une équipe engagée pour Veauche
            </h2>
            <p className="text-lg text-muted-foreground">
              Des Veauchois de tous horizons, unis par la même volonté : redonner de l'air à notre ville.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Dominique Bertrand",
                role: "Première adjointe",
                bio: "Veauchoise depuis 25 ans, ancienne enseignante et présidente d'association. Experte en éducation et vie associative, elle connaît parfaitement les besoins des familles et des écoles de notre commune.",
                quartier: "Centre-ville"
              },
              {
                name: "Magali Rousseau",
                role: "Conseillère déléguée au cadre de vie",
                bio: "Architecte paysagiste de formation, Magali s'investit depuis 10 ans pour la préservation des espaces verts à Veauche. Mère de trois enfants, elle milite pour une ville plus respirable et apaisée.",
                quartier: "Quartier des Écoles"
              },
              {
                name: "Philippe Moreau",
                role: "Conseiller délégué aux finances",
                bio: "Expert-comptable et Veauchois de longue date, Philippe apporte son expertise en gestion financière. Il défend une gestion rigoureuse et transparente des deniers publics au service de l'intérêt général.",
                quartier: "Quartier de la Gare"
              },
            ].map((member, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src="/portrait.png" 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <UserCircle2 className="h-4 w-4" />
                      <span>{member.quartier}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="/equipe">
                Découvrir toute l'équipe
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Formulaire - CTA Principal */}
      <section id="votre-avis" className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-foreground">
                Votre avis compte
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Nous voulons construire le programme avec vous, les Veauchois. 
                Partagez-nous vos préoccupations, vos idées, vos attentes pour notre ville. 
                <span className="font-semibold"> Ensemble, faisons de Veauche une ville qui mérite mieux.</span>
              </p>
            </div>

            <Card className="border-2 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-card-foreground">
                      Votre nom <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex: Marie Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-card-foreground">
                      Votre email <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@exemple.fr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="pl-10 text-base"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Votre email nous permet de vous recontacter et de vous tenir informé de notre campagne.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="opinion" className="text-sm font-semibold text-card-foreground">
                      Votre avis sur Veauche <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="opinion"
                      placeholder="Qu'est-ce qui vous préoccupe à Veauche ? Quelles sont vos attentes pour notre ville ? Partagez vos idées..."
                      value={formData.opinion}
                      onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
                      required
                      rows={6}
                      className="text-base resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Envoi en cours...</>
                    ) : (
                      <>
                        Envoyer mon avis
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez d'être recontacté par l'équipe "Veauche Mérite Mieux".
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Veauche Mérite Mieux" className="h-16" />
              </div>
              <p className="text-sm text-muted-foreground">
                Redonnons de l'air à notre ville
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#priorites" className="hover:text-foreground transition-colors">Nos priorités</a></li>
                <li><a href="#qui-sommes-nous" className="hover:text-foreground transition-colors">Qui sommes-nous</a></li>
                <li><a href="#votre-avis" className="hover:text-foreground transition-colors">Donnez votre avis</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Veauche, Loire (42)</li>
                <li>Élections municipales 2026</li>
                <li className="pt-2">
                  <a href="#votre-avis" className="text-primary hover:underline font-medium">
                    Nous contacter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024-2026 Veauche Mérite Mieux. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
