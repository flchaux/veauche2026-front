# Guide des icônes Lucide pour Strapi

## Système d'icônes dynamiques

Le site utilise maintenant un système d'icônes dynamiques qui permet d'accéder à **tous les icônes de Lucide React** (1000+) simplement en saisissant leur nom dans Strapi.

## Comment utiliser

Dans vos collections Strapi, saisissez simplement le nom exact de l'icône Lucide (respectez la casse : PascalCase).

### Exemples d'icônes disponibles

#### Icônes actuellement utilisées sur le site

**Section Priorités :**
- `Trees` - Arbre (environnement, nature)
- `School` - École (éducation)
- `Users` - Utilisateurs (communauté, équipe)

**Section Méthodes de gestion :**
- `Shield` - Bouclier (protection, sécurité)
- `Heart` - Cœur (solidarité, engagement)
- `Building2` - Bâtiment (infrastructure)

#### Autres icônes recommandées pour une campagne municipale

**Environnement & Cadre de vie :**
- `Leaf` - Feuille
- `Flower2` - Fleur
- `Sprout` - Pousse
- `Wind` - Vent
- `Droplets` - Gouttes d'eau
- `Sun` - Soleil
- `CloudRain` - Pluie
- `Recycle` - Recyclage

**Infrastructure & Services :**
- `Building` - Bâtiment simple
- `Home` - Maison
- `Hospital` - Hôpital
- `Library` - Bibliothèque
- `Store` - Magasin
- `Bus` - Bus
- `Bike` - Vélo
- `Car` - Voiture
- `Train` - Train
- `Landmark` - Monument

**Sécurité & Protection :**
- `ShieldCheck` - Bouclier avec coche
- `Lock` - Cadenas
- `Eye` - Œil (surveillance)
- `AlertTriangle` - Triangle d'alerte

**Solidarité & Social :**
- `HeartHandshake` - Cœur avec poignée de main
- `HandHeart` - Main avec cœur
- `Users2` - Groupe d'utilisateurs
- `UserCheck` - Utilisateur validé
- `Baby` - Bébé (petite enfance)

**Économie & Finances :**
- `Coins` - Pièces
- `Wallet` - Portefeuille
- `TrendingUp` - Tendance à la hausse
- `PiggyBank` - Tirelire
- `Calculator` - Calculatrice

**Communication & Démocratie :**
- `MessageCircle` - Bulle de message
- `MessageSquare` - Message carré
- `Vote` - Vote
- `Megaphone` - Mégaphone
- `Bell` - Cloche (notifications)
- `Mail` - Email

**Sport & Loisirs :**
- `Dumbbell` - Haltère
- `Trophy` - Trophée
- `Target` - Cible
- `Music` - Musique
- `Palette` - Palette (art)

**Technologie & Innovation :**
- `Lightbulb` - Ampoule (idée)
- `Rocket` - Fusée (innovation)
- `Zap` - Éclair (énergie)
- `Wifi` - Wifi

## Comment trouver d'autres icônes

Consultez la liste complète sur : https://lucide.dev/icons/

**Important :** Utilisez le nom exact tel qu'il apparaît sur le site (PascalCase), par exemple :
- ✅ `TreePine` (correct)
- ❌ `tree-pine` (incorrect)
- ❌ `treepine` (incorrect)

## Icône par défaut

Si le nom saisi dans Strapi n'existe pas, l'icône `HelpCircle` (point d'interrogation) s'affichera automatiquement.

## Collections concernées

### Collection `priorite`
Champ : `icone` (type: Text)
- Priorité 1 : `Trees`
- Priorité 2 : `School`
- Priorité 3 : `Users`

### Collection `methode-gestion`
Champ : `icone` (type: Text)
- Méthode 1 : `Shield`
- Méthode 2 : `Heart`
- Méthode 3 : `Building2`
- Méthode 4 : `Users`

## Mise à jour dans Strapi

Pour changer une icône :
1. Connectez-vous à Strapi
2. Allez dans la collection concernée (`priorite` ou `methode-gestion`)
3. Modifiez le champ `icone` avec le nouveau nom
4. Sauvegardez
5. L'icône sera automatiquement mise à jour sur le site

**Aucune modification de code n'est nécessaire !**
