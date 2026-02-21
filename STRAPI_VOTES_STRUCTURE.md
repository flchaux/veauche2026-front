# Structure de la collection Strapi : votes-mesures

## Nom de la collection
**votes-mesures** (API ID: `votes-mesures`)

## Champs de la collection

| Nom du champ | Type | Description | Options |
|--------------|------|-------------|---------|
| `mesure_id` | Number (integer) | ID de la mesure votée | Required, Unique avec ip/cookie |
| `vote_type` | Enumeration | Type de vote : "like" ou "dislike" | Required, Values: ["like", "dislike"] |
| `ip_address` | Text (short) | Adresse IP du visiteur | Required |
| `cookie_id` | Text (short) | ID unique du cookie du visiteur | Required |
| `commentaire` | Text (long) | Commentaire optionnel (pour les dislikes) | Optional |
| `createdAt` | DateTime | Date de création du vote | Auto-generated |
| `updatedAt` | DateTime | Date de mise à jour du vote | Auto-generated |

## Configuration des permissions

### Public (non authentifié)
- **Create (POST)** : Autorisé pour permettre aux visiteurs de voter
- **Find (GET)** : Refusé (on ne montre pas les compteurs)
- **FindOne (GET)** : Refusé
- **Update (PUT)** : Autorisé uniquement pour ajouter un commentaire à un vote existant
- **Delete (DELETE)** : Refusé

## Logique de validation

### Côté client (avant envoi)
1. Générer un `cookie_id` unique si n'existe pas (UUID v4)
2. Stocker le `cookie_id` dans un cookie permanent
3. Récupérer l'IP du visiteur côté serveur

### Côté Strapi (à configurer)
1. Vérifier qu'il n'existe pas déjà un vote avec la même combinaison `mesure_id` + `ip_address`
2. Vérifier qu'il n'existe pas déjà un vote avec la même combinaison `mesure_id` + `cookie_id`
3. Si un vote existe déjà, retourner une erreur 409 (Conflict)

## Flux de vote

### Vote positif (pouce vert)
```
1. Utilisateur clique sur pouce vert
2. Animation sur le pouce
3. POST /api/votes-mesures
   {
     mesure_id: 123,
     vote_type: "like",
     ip_address: "192.168.1.1",
     cookie_id: "uuid-xxx-xxx"
   }
4. Si succès : pouce reste vert
5. Si erreur 409 : message "Vous avez déjà voté"
```

### Vote négatif (pouce rouge)
```
1. Utilisateur clique sur pouce rouge
2. Animation sur le pouce
3. POST /api/votes-mesures
   {
     mesure_id: 123,
     vote_type: "dislike",
     ip_address: "192.168.1.1",
     cookie_id: "uuid-xxx-xxx"
   }
4. Si succès : 
   - Afficher champ texte "Pourquoi ?"
   - Utilisateur saisit commentaire
   - PUT /api/votes-mesures/:id
     {
       commentaire: "Texte du visiteur"
     }
   - Message de remerciement
5. Si erreur 409 : message "Vous avez déjà voté"
```

## Index recommandés

Pour optimiser les performances, créer des index composites sur :
- `mesure_id` + `ip_address`
- `mesure_id` + `cookie_id`

## Notes techniques

- Le `cookie_id` est stocké côté client avec une durée de vie de 1 an
- L'IP est récupérée côté serveur pour éviter la manipulation
- Les votes ne peuvent pas être modifiés une fois créés (sauf ajout de commentaire)
- Les compteurs ne sont pas affichés publiquement pour éviter les biais
