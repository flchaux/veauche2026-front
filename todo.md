# Veauche Mérite Mieux - Landing Page TODO

## Préparation des assets
- [x] Copier les images dans le dossier public
- [x] Configurer le logo dans const.ts
- [x] Optimiser les images pour le web

## Configuration du thème
- [x] Extraire et configurer les couleurs du logo (#0D6EB2 bleu, #DF9F14 or)
- [x] Configurer les polices appropriées pour une campagne municipale
- [x] Adapter le thème aux couleurs de la campagne

## Sections de la landing page
- [x] Section Hero avec header image "Veauche Mérite Mieux"
- [x] Section présentation personnelle avec portrait
- [x] Section des 3 priorités (Ville respirable, Biens communs, Lien humain)
- [x] Section formulaire de collecte d'avis avec email (CTA principal)
- [x] Section équipe pour montrer le sérieux
- [x] Footer avec informations de contact

## Fonctionnalités
- [x] Formulaire de collecte d'avis avec validation email
- [x] Design responsive mobile/tablette/desktop
- [x] Intégration des photos de Veauche

## Tests et finalisation
- [x] Tester le formulaire
- [x] Vérifier la responsivité
- [x] Créer un checkpoint final

## Nouvelles fonctionnalités
- [x] Ajouter section présentation des membres clés de l'équipe (3 personnes)
- [ ] Créer page dédiée à toute l'équipe
- [x] Ajouter lien vers la page équipe complète
- [ ] Tester et créer nouveau checkpoint

## Intégration Strapi CMS
- [x] Upgrader le projet vers web-db-user
- [x] Configurer les variables d'environnement Strapi
- [x] Créer les types TypeScript pour les collections Strapi
- [x] Créer les services API pour récupérer les données
- [x] Adapter la page Home pour utiliser les données Strapi
- [x] Gérer les états de chargement et erreurs
- [x] Peupler Strapi avec les données de la campagne
- [x] Corriger les endpoints (section-priorites)
- [x] Tester l'intégration complète
- [x] Créer un checkpoint final

## Adaptation Strapi v5
- [x] Adapter les types TypeScript pour Strapi v5 (sans attributes)
- [x] Modifier le code d'accès aux données dans Home.tsx
- [x] Mettre à jour les tests vitest
- [x] Vérifier que tout fonctionne correctement

## Conversion en site statique
- [x] Créer un service Strapi côté client
- [x] Adapter Home.tsx pour utiliser useEffect au lieu de tRPC
- [x] Adapter les appels Strapi pour fonctionner côté client
- [x] Configurer les variables d'environnement Vite pour le token Strapi
- [x] Supprimer les dépendances serveur (useAuth, tRPC)
- [x] Tester le build statique

## GitHub et CI/CD
- [ ] Créer le repo GitHub veauche2026-front
- [ ] Pousser le code sur GitHub
- [ ] Configurer GitHub Actions pour build automatique
- [ ] Documenter le processus de déploiement sur Render

## Page Équipe
- [x] Créer le composant Equipe.tsx avec trombinoscope en grille
- [x] Ajouter la route /equipe dans App.tsx
- [x] Ajouter le lien dans la navigation (déjà présent)
- [x] Commit et push

## Modification Header
- [x] Copier header_background.jpg et logo_white.png dans public
- [x] Modifier le header avec background image et logo centré
- [x] Commit et push

## Correction routing et logo
- [x] Créer _redirects pour Netlify/Render
- [x] Créer vercel.json pour Vercel
- [x] Agrandir le logo header à 512px sur desktop
- [x] Commit et push

## Section équipe - Bientôt disponible
- [x] Remplacer le bouton par une section "Bientôt disponible"
- [x] Ajouter un formulaire de notification email
- [x] Créer la fonction d'envoi vers Strapi email_contact
- [x] Commit et push

## Ajustements logo et formulaire
- [x] Remonter le logo dans le header
- [x] Brancher le formulaire d'avis à Strapi email-contacts
- [x] Commit et push

## Ajustement style image candidat
- [x] Supprimer l'effet de double fond penché autour de l'image du candidat
- [x] Garder le fond naturel de l'image
- [x] Commit et push

## Correction formulaire contact équipe
- [x] Corriger l'erreur "Cannot read properties of null (reading 'reset')"
- [x] Permettre la réinitialisation du formulaire après envoi réussi
- [x] Tester le formulaire
- [x] Commit et push

## Système d'icônes dynamiques
- [x] Remplacer iconMap par import dynamique de lucide-react
- [x] Créer fonction getDynamicIcon
- [x] Mettre à jour Home.tsx pour utiliser les icônes dynamiques
- [x] Documenter les noms d'icônes pour Strapi
- [x] Commit et push

## Réorganisation menu navigation
- [x] Analyser l'ordre du contenu de la page
- [x] Réorganiser les liens du menu pour correspondre à l'ordre du contenu
- [x] Commit et push

## Corrections visuelles
- [x] Remettre le dégradé léger derrière la photo du candidat
- [x] Corriger "Veauche Mérite Mieux" en "Veauche mérite mieux" (sans majuscules)
- [x] Remplacer l'icône cassée par le favicon dans le header
- [x] Commit et push

## Corrections finales
- [x] Dégradé derrière photo candidat SANS rotation et SANS marge
- [x] Remettre icon.png dans le header (pas favicon.ico)
- [x] Ajouter icon.png dans le footer
- [x] Corriger "Veauche mérite mieux" dans le footer (sans maj)
- [x] Commit et push

## Intégration RAG (Questions/Réponses)
- [x] Créer le composant de question RAG avec formulaire
- [x] Implémenter l'appel API vers Strapi RAG
- [x] Afficher la réponse avec bouton de retour
- [x] Intégrer le composant dans Home.tsx après le hero
- [ ] Tester avec différentes questions
- [ ] Commit et push
## Alimentation Strapi avec mesures et thèmes du programme
- [x] Accéder au document Google Docs du programme
- [x] Extraire les mesures et thèmes
- [x] Créer les collections nécessaires dans Strapi
- [x] Insérer les données via l'API Strapi (9 thèmes + 26 mesures)
- [x] Tester le RAG avec les nouvelles données
- [x] Commit et push

## Personnalisation assistant RAG
- [x] Changer "notre assistant" en "notre assistant Veauchois"
- [x] Adapter les réponses pour parler du programme au lieu du "contexte" (fait côté Strapi)
- [x] Déplacer le bloc RAG à droite du hero
- [x] Commit et push

