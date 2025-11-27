// Node.js 18+ has native fetch

const STRAPI_URL = 'https://veauche2026-strapi.onrender.com';
const STRAPI_TOKEN = '9d267dbcb3f50aa0ee86a7c4754e02ba6ccbafc3ee18f2cf68a0ec889f6d49b48b22e5a52ee06a8d10a2a4acc7b044125e56332c086c93f498c7f1bcee0a10727327ba78b11da71e2eaf1639fa10972494318323e1cb9de6e81e18f24329b760fae38cbfd40566ba0cd2d7f5b562b2eb6d0514bab0e78cbdfdac65b2c080cac8';

async function createOrUpdate(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error creating ${endpoint}:`, response.status, errorText);
      return null;
    }

    const result = await response.json();
    console.log(`✅ Created ${endpoint}`);
    return result;
  } catch (error) {
    console.error(`Error with ${endpoint}:`, error.message);
    return null;
  }
}

async function populateStrapi() {
  console.log('🚀 Starting Strapi population...\n');

  // 1. Hero Section
  console.log('📝 Creating Hero Section...');
  await createOrUpdate('hero-section', {
    titre: 'Ensemble, redonnons de l\'air à Veauche',
    description: 'Les élections municipales de 2026 sont l\'occasion de choisir l\'avenir de notre ville. Nous voulons une Veauche plus respirable, plus solidaire, et mieux gérée. Votre avis compte.',
    texte_bouton: 'Donnez votre avis',
    publishedAt: new Date().toISOString(),
  });

  // 2. Presentation Candidat
  console.log('📝 Creating Presentation Candidat...');
  await createOrUpdate('presentation-candidat', {
    badge: 'Candidat aux municipales 2026',
    titre: 'Un engagement pour Veauche',
    paragraphe_1: 'Je suis né à Montbrison il y a 34 ans, Forezien de souche. Ma vie est à Veauche : ma fille vient d\'entrer en maternelle, nous faisons du tennis, ma femme travaille à Badoit et a créé une association caritative sur la commune.',
    paragraphe_2: 'Je crois profondément que Veauche a un grand potentiel, mais qu\'elle doit se tourner vers l\'avenir et mettre en avant ses atouts : ses associations dynamiques, sa position stratégique entre agglomération et campagne, et son tissu industriel.',
    titre_equipe: 'Notre équipe',
    description_equipe: 'Nous avons constitué une liste représentative de tous les Veauchois : politiquement, socialement, en termes de générations et de quartiers. Une équipe complémentaire qui allie le dynamisme de la jeunesse à l\'expérience et la connaissance de notre ville.',
    publishedAt: new Date().toISOString(),
  });

  // 3. Section Priorites
  console.log('📝 Creating Section Priorites...');
  await createOrUpdate('section-priorite', {
    titre: 'Nos 3 priorités pour Veauche',
    description: 'Un programme concret, réaliste et ambitieux pour redonner de l\'air à notre ville.',
    publishedAt: new Date().toISOString(),
  });

  // 4. Priorites (Collection)
  console.log('📝 Creating Priorites...');
  
  await createOrUpdate('priorites', {
    titre: 'Une ville respirable et apaisée',
    soustitre: 'Cadre de vie, environnement, urbanisme maîtrisé',
    icone: 'Trees',
    ordre: 1,
    actions: 'Ramener de la verdure et protéger nos espaces\nApaiser la circulation et développer les mobilités douces\nRenforcer la sécurité et lutter contre les incivilités\nDévelopper le réseau de vidéoprotection',
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('priorites', {
    titre: 'Préserver nos biens communs',
    soustitre: 'Écoles, voiries, patrimoine, finances responsables',
    icone: 'School',
    ordre: 2,
    actions: 'Rénover nos écoles et bâtiments municipaux\nEmbellir et assurer la propreté de nos espaces publics\nOffrir des aires de jeux bien entretenues\nPrincipe : 1 euro dépensé = 1 euro utile',
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('priorites', {
    titre: 'Recréer du lien humain',
    soustitre: 'Solidarité, intergénérationnel, vie locale',
    icone: 'Users',
    ordre: 3,
    actions: 'Aider nos seniors et faciliter leur quotidien\nSoutenir et promouvoir le tissu associatif\nRenforcer les liens entre générations et quartiers\nRenforcer la démocratie citoyenne',
    publishedAt: new Date().toISOString(),
  });

  // 5. Methode Section
  console.log('📝 Creating Methode Section...');
  await createOrUpdate('methode-section', {
    titre: 'Notre méthode de gestion',
    publishedAt: new Date().toISOString(),
  });

  // 6. Methodes Gestion (Collection)
  console.log('📝 Creating Methodes Gestion...');
  
  await createOrUpdate('methodes-gestions', {
    texte: 'Suivi des projets en ligne et transparence totale',
    icone: 'Shield',
    ordre: 1,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('methodes-gestions', {
    texte: 'Principe : 1 euro dépensé = 1 euro utile',
    icone: 'Heart',
    ordre: 2,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('methodes-gestions', {
    texte: 'Maîtrise des taxes, optimisation des dépenses',
    icone: 'Building2',
    ordre: 3,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('methodes-gestions', {
    texte: 'Budget participatif et démocratie citoyenne',
    icone: 'Users',
    ordre: 4,
    publishedAt: new Date().toISOString(),
  });

  // 7. Section Equipe
  console.log('📝 Creating Section Equipe...');
  await createOrUpdate('section-equipe', {
    titre: 'Une équipe engagée pour Veauche',
    description: 'Des Veauchois de tous horizons, unis par la même volonté : redonner de l\'air à notre ville.',
    texte_bouton_complet: 'Découvrir toute l\'équipe',
    publishedAt: new Date().toISOString(),
  });

  // 8. Membres Equipe (Collection)
  console.log('📝 Creating Membres Equipe...');
  
  await createOrUpdate('membres-equipes', {
    nom: 'Dominique Bertrand',
    role: 'Première adjointe',
    biographie: 'Veauchoise depuis 25 ans, ancienne enseignante et présidente d\'association. Experte en éducation et vie associative, elle connaît parfaitement les besoins des familles et des écoles de notre commune.',
    quartier: 'Centre-ville',
    ordre: 1,
    membre_cle: true,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('membres-equipes', {
    nom: 'Magali Rousseau',
    role: 'Conseillère déléguée au cadre de vie',
    biographie: 'Architecte paysagiste de formation, Magali s\'investit depuis 10 ans pour la préservation des espaces verts à Veauche. Mère de trois enfants, elle milite pour une ville plus respirable et apaisée.',
    quartier: 'Quartier des Écoles',
    ordre: 2,
    membre_cle: true,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('membres-equipes', {
    nom: 'Philippe Moreau',
    role: 'Conseiller délégué aux finances',
    biographie: 'Expert-comptable et Veauchois de longue date, Philippe apporte son expertise en gestion financière. Il défend une gestion rigoureuse et transparente des deniers publics au service de l\'intérêt général.',
    quartier: 'Quartier de la Gare',
    ordre: 3,
    membre_cle: true,
    publishedAt: new Date().toISOString(),
  });

  // 9. Photos Ville (Collection)
  console.log('📝 Creating Photos Ville...');
  
  await createOrUpdate('photos-villes', {
    legende: 'Notre belle ville de Veauche',
    ordre: 1,
    publishedAt: new Date().toISOString(),
  });

  await createOrUpdate('photos-villes', {
    legende: 'Un cadre de vie à préserver',
    ordre: 2,
    publishedAt: new Date().toISOString(),
  });

  // 10. Section Formulaire
  console.log('📝 Creating Section Formulaire...');
  await createOrUpdate('section-formulaire', {
    titre: 'Votre avis compte',
    description: 'Nous voulons construire le programme avec vous, les Veauchois. Partagez-nous vos préoccupations, vos idées, vos attentes pour notre ville. Ensemble, faisons de Veauche une ville qui mérite mieux.',
    label_nom: 'Votre nom',
    label_email: 'Votre email',
    label_avis: 'Votre avis sur Veauche',
    placeholder_avis: 'Qu\'est-ce qui vous préoccupe à Veauche ? Quelles sont vos attentes pour notre ville ? Partagez vos idées...',
    texte_bouton: 'Envoyer mon avis',
    message_confidentialite: 'En soumettant ce formulaire, vous acceptez d\'être recontacté par l\'équipe "Veauche Mérite Mieux".',
    publishedAt: new Date().toISOString(),
  });

  // 11. Footer
  console.log('📝 Creating Footer...');
  await createOrUpdate('footer', {
    description: 'Redonnons de l\'air à notre ville',
    ville: 'Veauche, Loire (42)',
    annee_election: 'Élections municipales 2026',
    texte_contact: 'Nous contacter',
    publishedAt: new Date().toISOString(),
  });

  console.log('\n✨ Strapi population completed!');
}

populateStrapi().catch(console.error);
