# Veauche 2026 - Site de Campagne

Site de campagne municipale pour "Veauche Mérite Mieux" - Élections municipales 2026.

## 🚀 Technologies

- **React 19** + **TypeScript**
- **Vite** pour le build
- **Tailwind CSS 4** pour le styling
- **shadcn/ui** pour les composants
- **Strapi CMS** pour la gestion du contenu

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build pour la production
pnpm build
```

## 🔧 Configuration

Le site nécessite deux variables d'environnement pour se connecter à Strapi :

- `VITE_STRAPI_URL` : URL de l'instance Strapi
- `VITE_STRAPI_TOKEN` : Token API Strapi (read-only)

### Configuration locale

Créez un fichier `.env` à la racine du projet :

```env
VITE_STRAPI_URL=https://veauche2026-strapi.onrender.com
VITE_STRAPI_TOKEN=votre_token_ici
```

### Configuration GitHub Actions

Les secrets doivent être configurés dans les paramètres du repo GitHub :
1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Ajoutez les secrets suivants :
   - `VITE_STRAPI_URL`
   - `VITE_STRAPI_TOKEN`

## 📁 Structure du build

Après le build (`pnpm run build`), les fichiers statiques se trouvent dans :

```
dist/public/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── [autres assets publics]
```

## 🌐 Déploiement sur Render

### Option 1 : Site statique (recommandé pour ce projet)

1. Créez un nouveau **Static Site** sur [Render](https://render.com)
2. Connectez votre repo GitHub `veauche2026-front`
3. Configurez les paramètres :
   - **Build Command** : `pnpm install && pnpm run build`
   - **Publish Directory** : `dist/public`
4. Ajoutez les variables d'environnement :
   - `VITE_STRAPI_URL`
   - `VITE_STRAPI_TOKEN`
5. Déployez !

### Option 2 : Déploiement manuel

1. Buildez le projet localement : `pnpm run build`
2. Le dossier `dist/public` contient tous les fichiers statiques
3. Uploadez ce dossier sur n'importe quel hébergement statique (Netlify, Vercel, GitHub Pages, etc.)

## 🔄 CI/CD

Le repo est configuré avec GitHub Actions pour :
- ✅ Builder le site à chaque commit
- ✅ Uploader les artifacts de build
- ✅ (Optionnel) Déployer automatiquement sur GitHub Pages

## 📝 Gestion du contenu

Tout le contenu du site est gérable via l'interface Strapi :
- Textes des sections
- Images
- Priorités de la campagne
- Membres de l'équipe
- Formulaire de contact

## 🛠️ Scripts disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm preview      # Prévisualiser le build
pnpm lint         # Linter le code
pnpm test         # Lancer les tests
```

## 📄 Licence

© 2025 Veauche Mérite Mieux. Tous droits réservés.
