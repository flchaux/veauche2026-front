import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Star,
  BarChart3,
  Lock,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ProBusiness</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#avantages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Avantages
            </a>
            <a href="#temoignages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Témoignages
            </a>
            <Button variant="default" size="sm">
              Nous contacter
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
                  <Award className="h-4 w-4" />
                  Solution de confiance depuis 2015
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Votre partenaire pour une{" "}
                <span className="text-primary">croissance durable</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous accompagnons les entreprises ambitieuses dans leur transformation digitale 
                avec des solutions éprouvées et un engagement sans faille pour votre réussite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base">
                  Démarrer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  Découvrir nos services
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support disponible</div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl transform -rotate-6" />
                <div className="relative bg-card border rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">Croissance +127%</div>
                        <div className="text-sm text-muted-foreground">Performance moyenne</div>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">Sécurité garantie</div>
                        <div className="text-sm text-muted-foreground">Certification ISO 27001</div>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">Équipe dédiée</div>
                        <div className="text-sm text-muted-foreground">Experts certifiés</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Des services adaptés à vos besoins
            </h2>
            <p className="text-lg text-muted-foreground">
              Nous proposons une gamme complète de solutions pour accompagner votre entreprise 
              à chaque étape de son développement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Analyse & Stratégie",
                description: "Optimisez vos performances avec des analyses approfondies et des stratégies sur mesure basées sur vos données.",
              },
              {
                icon: Shield,
                title: "Sécurité & Conformité",
                description: "Protégez vos actifs avec nos solutions de sécurité avancées et notre expertise en conformité réglementaire.",
              },
              {
                icon: Zap,
                title: "Transformation Digitale",
                description: "Accélérez votre transition numérique avec des technologies de pointe et un accompagnement personnalisé.",
              },
              {
                icon: Users,
                title: "Formation & Support",
                description: "Développez les compétences de vos équipes avec nos programmes de formation et notre support continu.",
              },
              {
                icon: Lock,
                title: "Gestion des Risques",
                description: "Anticipez et gérez les risques avec nos outils d'analyse prédictive et nos protocoles éprouvés.",
              },
              {
                icon: TrendingUp,
                title: "Optimisation Continue",
                description: "Améliorez constamment vos processus grâce à notre méthodologie d'optimisation et de suivi.",
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section id="avantages" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Pourquoi choisir <span className="text-primary">ProBusiness</span> ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Notre engagement envers l'excellence et notre approche centrée sur le client 
                font de nous le partenaire idéal pour votre croissance.
              </p>
              <div className="space-y-4">
                {[
                  "Expertise reconnue avec plus de 10 ans d'expérience",
                  "Solutions personnalisées adaptées à votre secteur",
                  "Support réactif disponible 24/7 pour votre tranquillité",
                  "Technologies de pointe pour des résultats optimaux",
                  "Tarification transparente sans frais cachés",
                  "Garantie de satisfaction avec engagement de résultats",
                ].map((avantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{avantage}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-4">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "10+", label: "Années d'expérience", color: "primary" },
                { number: "500+", label: "Projets réussis", color: "accent" },
                { number: "98%", label: "Clients satisfaits", color: "primary" },
                { number: "24/7", label: "Support disponible", color: "accent" },
              ].map((stat, index) => (
                <Card key={index} className="text-center p-8 border-2 hover:border-primary/50 transition-all">
                  <CardContent className="p-0 space-y-2">
                    <div className={`text-4xl font-bold ${stat.color === "primary" ? "text-primary" : "text-accent"}`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section id="temoignages" className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-muted-foreground">
              La confiance de nos clients est notre plus grande récompense.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                role: "Directrice Générale, TechCorp",
                content: "ProBusiness a transformé notre façon de travailler. Leur expertise et leur professionnalisme sont exceptionnels. Nous avons doublé notre productivité en 6 mois.",
                rating: 5,
              },
              {
                name: "Jean Martin",
                role: "CEO, InnovSolutions",
                content: "Un partenaire de confiance qui comprend vraiment nos besoins. L'équipe est réactive et les résultats sont au rendez-vous. Je recommande vivement leurs services.",
                rating: 5,
              },
              {
                name: "Sophie Laurent",
                role: "Responsable IT, GlobalTrade",
                content: "Grâce à ProBusiness, nous avons pu sécuriser notre infrastructure et optimiser nos processus. Leur accompagnement a été déterminant pour notre croissance.",
                rating: 5,
              },
            ].map((temoignage, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: temoignage.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{temoignage.content}"
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-semibold text-card-foreground">{temoignage.name}</div>
                    <div className="text-sm text-muted-foreground">{temoignage.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Rejoignez les centaines d'entreprises qui nous font confiance pour leur croissance. 
              Contactez-nous dès aujourd'hui pour une consultation gratuite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base">
                Demander une démo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                Parler à un expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">ProBusiness</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Votre partenaire de confiance pour une croissance durable et sécurisée.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Analyse & Stratégie</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sécurité</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Transformation Digitale</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Formation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Entreprise</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Équipe</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: contact@probusiness.fr</li>
                <li>Tél: +33 1 23 45 67 89</li>
                <li>Adresse: 123 Rue de la Tech</li>
                <li>75001 Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ProBusiness. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
