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

## Enregistrement des questions RAG
- [x] Modifier le composant RAG pour enregistrer question, answer et ip dans Strapi
- [x] Créer la collection rag-question si nécessaire (vérifier dans Strapi)
- [x] Tester l'enregistrement
- [x] Commit et push

## Reconstruction mesures et thèmes depuis nouveau document
- [x] Rechercher et télécharger "2 PROGRAMME MUNICIPAL 2026" depuis Drive
- [x] Extraire les mesures et thèmes du document
- [x] Supprimer les anciennes mesures et thèmes dans Strapi
- [x] Créer les nouvelles mesures et thèmes dans Strapi
- [x] Tester le RAG avec les nouvelles données (ré-indexé par l'utilisateur)
- [x] Commit et push

## Contrôles d'affichage depuis Strapi
- [x] Créer collection/champ pour contrôler l'affichage du bloc RAG
- [x] Créer collection/champ pour contrôler le mode équipe (formulaire vs bouton)
- [x] Modifier Home.tsx pour utiliser ces paramètres
- [x] Créer la collection parametres-site dans Strapi (utilisateur)
- [x] Tester les deux modes
- [x] Commit et push

## Lien bouton équipe complète
- [x] Ajouter le lien vers /equipe sur le bouton "Voir l'équipe complète"
- [x] Commit et push

## Repositionnement du bloc "Bientôt disponible"
- [x] Analyser la structure actuelle de la section équipe
- [x] Déplacer le bloc "Bientôt disponible" dans la grille avec les membres
- [x] Vérifier le rendu visuel
- [x] Commit (push via checkpoint)

## Balises meta Open Graph pour Facebook
- [x] Copier l'image header.png dans le dossier public
- [x] Ajouter les balises meta Open Graph dans index.html
- [x] Tester et commit les modifications

## Correction URL Open Graph
- [x] Modifier les URLs de veauche2026.fr vers veauchemeritemieux.fr dans index.html
- [ ] Commit et push vers GitHub

## Ajout "Veauche au coeur" dans les balises meta
- [x] Modifier les balises meta pour inclure "Veauche au coeur"
- [x] Tester les modifications
- [x] Commit et push vers GitHub

## Correction placement "Veauche au coeur"
- [x] Retirer "Veauche au coeur" des descriptions visibles (og:description, twitter:description, meta description)
- [x] Garder "Veauche au coeur" uniquement dans meta keywords
- [ ] Commit et push vers GitHub

## Configuration de la langue en français
- [x] Vérifier la configuration actuelle de la langue dans index.html
- [x] Corriger l'attribut lang de "en" vers "fr"
- [x] Ajouter les balises nécessaires pour indiquer le français
- [x] Commit et push vers GitHub

## Correction pagination équipe
- [x] Analyser le code de récupération des membres dans Equipe.tsx
- [x] Modifier la requête Strapi pour désactiver la pagination (pagination[pageSize]=100)
- [x] Tester que tous les membres s'affichent (30 membres au total)
- [ ] Commit et push vers GitHub

## Ajout de mots-clés supplémentaires
- [x] Ajouter "Florian Chaux", "liste veauche", "veauche ensemble", "veauche territoire d'avenir" dans meta keywords
- [x] Commit et push vers GitHub

## Création de la page Mesures
- [x] Analyser la structure des données Strapi pour les mesures
- [x] Créer la fonction de récupération des mesures dans strapi.ts
- [x] Créer la page Mesures.tsx avec l'affichage par priorité (5 priorités × 10 mesures)
- [x] Ajouter la route /mesures dans App.tsx (sans menu pour l'instant)
- [x] Tester l'affichage des mesures (page fonctionnelle, en attente de données Strapi)
- [x] Commit et push vers GitHub

## Correction structure Mesures
- [x] Corriger le type Mesure dans strapiTypes.ts (details au lieu de description, theme relation)
- [x] Modifier la page Mesures.tsx pour utiliser theme.nom au lieu de priorite
- [x] Tester l'affichage (page fonctionnelle, en attente de données Strapi)
- [x] Commit et push vers GitHub

## Ajout titre et intro au Theme
- [x] Corriger le type Theme dans strapiTypes.ts (ajouter titre et intro)
- [x] Modifier Mesures.tsx pour afficher theme.titre et theme.intro
- [x] Commit et push vers GitHub

## Remplacement "avis" par "poser une question"
- [x] Lire le PDF programme pour comprendre le contexte
- [x] Identifier tous les endroits mentionnant 'avis' sur le site (45 occurrences dans 4 fichiers)
- [x] Remplacer dans Home.tsx (fichier principal)
- [x] Mettre à jour le type SectionFormulaire dans strapiTypes.ts
- [x] Remplacer dans Equipe.tsx
- [x] Tester les modifications (vérification visuelle OK)
- [x] Commit et push vers GitHub

## Ajustements formulaire questions
- [x] Supprimer le lien "Vos questions" du menu de navigation dans Home.tsx
- [x] Supprimer le lien "Posez une question" du menu de navigation dans Equipe.tsx
- [x] Modifier l'intro du formulaire dans Home.tsx pour l'adapter au contexte "poser une question"
- [x] Tester les modifications (vérification visuelle OK)
- [x] Commit et push vers GitHub

## Remplacement contenu formulaire par statique
- [x] Identifier les appels Strapi pour le formulaire dans Home.tsx
- [x] Supprimer les appels à getSectionFormulaire()
- [x] Remplacer par du contenu statique
- [x] Tester les modifications (vérification visuelle OK)
- [x] Commit et push vers GitHub

## Amélioration style header et menu
- [x] Enlever les gradients sur le header background
- [x] Ajouter des effets hover élégants sur les liens du menu (underline animation + scale + color)
- [x] Tester les modifications (vérification visuelle OK)
- [x] Commit et push vers GitHub

## Correction complète des gradients header
- [x] Identifier tous les gradients restants dans le header (CSS, inline styles)
- [x] Supprimer tous les gradients dans Home.tsx et Equipe.tsx
- [x] Tester les modifications (vérification visuelle OK)
- [x] Commit et push vers GitHub


## Modification du texte CTA dans la page Equipe
- [x] Remplacer "Vous aussi, rejoignez-nous !" par "Vous avez une question à notre équipe ?"
- [x] Vérifier visuellement le changement
- [x] Commit et push vers GitHub

## Système de vote pour les mesures
- [ ] Définir la structure de la collection Strapi "votes-mesures" (mesure_id, vote_type, ip, cookie_id, commentaire, createdAt)
- [ ] Créer l'API de vote côté client avec validation cookie et IP
- [ ] Implémenter l'UI de vote avec pouces vert/rouge dans Mesures.tsx
- [ ] Ajouter les animations sur les pouces cliqués
- [ ] Ajouter le formulaire de feedback pour les votes négatifs
- [ ] Tester le système de vote complet
- [ ] Commit et créer un checkpoint

## Insertion des thèmes et mesures dans Strapi
- [ ] Exécuter le SQL pour insérer les 5 thèmes et 44 mesures
- [ ] Vérifier que les données sont bien insérées dans Strapi
- [ ] Tester la page /mesures avec les nouvelles données

## Adaptation du script d'insertion pour nouvelle structure Strapi
- [ ] Créer le script avec priorite_programme (oneToOne) au lieu de theme (manyToMany)
- [ ] Exécuter le script pour insérer les 5 priorités et 44 mesures
- [ ] Vérifier l'affichage sur /mesures

## Refonte page Mesures avec nouvelle structure
- [ ] Adapter les types TypeScript pour priorite_programme (oneToOne)
- [ ] Refondre Mesures.tsx : titre priorité + intro dans bloc séparé + liste mesures avec images
- [ ] Tester l'affichage sur /mesures
- [ ] Commit et checkpoint

## Adaptation et test du système de vote
- [ ] Adapter voteApi.ts pour utiliser vote_ype au lieu de vote_type
- [ ] Vérifier l'intégration dans Mesures.tsx
- [ ] Tester les votes (like/dislike) avec animations
- [ ] Tester le formulaire de feedback pour les votes négatifs
- [ ] Vérifier la validation par cookie et IP

## Correction du système de vote pour Strapi 5
- [x] Corriger voteApi.ts pour utiliser les relations Strapi 5 (connect au lieu de mesure_id)
- [x] Tester le vote positif et négatif
- [ ] Vérifier l'envoi du commentaire (erreur 404 - permissions à vérifier)

## Stylisation des priorités dans page Mesures
- [x] Supprimer la numérotation "Priorité 1, 2, 3..."
- [x] Styliser l'intro avec couleurs de la charte (blanc sur bleu avec bordure jaune)
- [x] Tester le rendu visuel
- [ ] Commit et push

## Ajout du lien "Notre programme" dans le menu principal
- [x] Modifier le menu dans Home.tsx
- [x] Modifier le menu dans Equipe.tsx
- [x] Tester la navigation
- [ ] Commit et push

## Ajout du bouton "Voir le programme complet" sous les priorités
- [x] Localiser la section des priorités dans Home.tsx
- [x] Ajouter le bouton sous la liste des priorités
- [x] Tester le bouton
- [ ] Commit et push

## Page d'administration des votes
- [x] Créer la page VotesAdmin.tsx
- [x] Ajouter la route dans App.tsx (accessible uniquement par URL)
- [x] Statistiques de votes par mesure (likes, dislikes, % positif)
- [x] Statistiques de votes groupés par IP
- [x] Tester la page d'administration
- [ ] Commit et push

## Ajout du formulaire "Donnez votre avis" en fin de page /mesures
- [x] Récupérer le formulaire existant de Home.tsx
- [x] Ajouter le formulaire à la fin de Mesures.tsx (titre "Vous avez une question ?")
- [x] Tester le formulaire (affichage OK, envoi vers Strapi email-contacts)
- [ ] Commit et push

## Ancres sur les mesures et liens RAG
- [x] Ajouter des ancres HTML (id) sur chaque mesure dans Mesures.tsx (format: mesure-{id})
- [x] Ajouter scroll-mt-24 pour compenser le header fixe
- [ ] Modifier le backend Strapi RAG pour générer des liens (fait par l'utilisateur)
- [ ] Commit et push

### Affichage HTML formaté des réponses RAG
- [x] Modifier le composant RAG pour afficher la réponse comme HTML
- [x] Utiliser dangerouslySetInnerHTML pour le rendu
- [x] Ajouter les classes prose pour le formatage
- [x] Tester l'affichage avec des liens (fonctionne, liens cliquables)
- [ ] Commit et push

## Menu hamburger mobile depuis la droite
- [ ] Créer le composant MobileMenu avec animation slide-in
- [ ] Ajouter l'overlay semi-transparent
- [ ] Intégrer dans toutes les pages (Home, Equipe, Mesures)
- [ ] Tester sur mobile (ouverture, fermeture, navigation)
- [ ] Commit et push

## Bouton programme sous RAG (mobile uniquement)
- [x] Ajouter un bouton "Voir le programme complet" sous le bloc RAG
- [x] Visible uniquement sur mobile (md:hidden)
- [x] Tester sur mobile
- [x] Commit et push

## Modification bouton menu mobile
- [x] Remplacer "Posez une question" par "Programme" dans le menu mobile
- [x] Modifier le lien pour pointer vers /mesures
- [x] Tester sur mobile
- [ ] Créer checkpoint

## Uniformisation du menu de navigation
- [x] Analyser les différences de menu entre Home.tsx, Equipe.tsx et Mesures.tsx
- [x] Créer un composant Header réutilisable avec le menu complet
- [x] Intégrer le composant Header dans toutes les pages
- [x] Tester la navigation sur toutes les pages
- [ ] Créer checkpoint

## Réduction taille police des mesures
- [x] Réduire la taille de police des titres de mesures
- [ ] Tester l'affichage sur desktop et mobile
- [ ] Push sur GitHub
