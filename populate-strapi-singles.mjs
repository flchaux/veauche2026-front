// Node.js 18+ has native fetch

const STRAPI_URL = 'https://veauche2026-strapi.onrender.com';
const STRAPI_TOKEN = '9d267dbcb3f50aa0ee86a7c4754e02ba6ccbafc3ee18f2cf68a0ec889f6d49b48b22e5a52ee06a8d10a2a4acc7b044125e56332c086c93f498c7f1bcee0a10727327ba78b11da71e2eaf1639fa10972494318323e1cb9de6e81e18f24329b760fae38cbfd40566ba0cd2d7f5b562b2eb6d0514bab0e78cbdfdac65b2c080cac8';

async function updateSingleType(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error updating ${endpoint}:`, response.status, errorText);
      return null;
    }

    const result = await response.json();
    console.log(`✅ Updated ${endpoint}`);
    return result;
  } catch (error) {
    console.error(`Error with ${endpoint}:`, error.message);
    return null;
  }
}

async function populateSingleTypes() {
  console.log('🚀 Updating Strapi Single Types...\n');

  // 1. Hero Section
  console.log('📝 Updating Hero Section...');
  await updateSingleType('hero-section', {
    titre: 'Ensemble, redonnons de l\'air à Veauche',
    description: 'Les élections municipales de 2026 sont l\'occasion de choisir l\'avenir de notre ville. Nous voulons une Veauche plus respirable, plus solidaire, et mieux gérée. Votre avis compte.',
    texte_bouton: 'Donnez votre avis',
    publishedAt: new Date().toISOString(),
  });

  // 2. Presentation Candidat
  console.log('📝 Updating Presentation Candidat...');
  await updateSingleType('presentation-candidat', {
    badge: 'Candidat aux municipales 2026',
    titre: 'Un engagement pour Veauche',
    paragraphe_1: 'Je suis né à Montbrison il y a 34 ans, Forezien de souche. Ma vie est à Veauche : ma fille vient d\'entrer en maternelle, nous faisons du tennis, ma femme travaille à Badoit et a créé une association caritative sur la commune.',
    paragraphe_2: 'Je crois profondément que Veauche a un grand potentiel, mais qu\'elle doit se tourner vers l\'avenir et mettre en avant ses atouts : ses associations dynamiques, sa position stratégique entre agglomération et campagne, et son tissu industriel.',
    titre_equipe: 'Notre équipe',
    description_equipe: 'Nous avons constitué une liste représentative de tous les Veauchois : politiquement, socialement, en termes de générations et de quartiers. Une équipe complémentaire qui allie le dynamisme de la jeunesse à l\'expérience et la connaissance de notre ville.',
    publishedAt: new Date().toISOString(),
  });

  // 3. Section Priorites
  console.log('📝 Updating Section Priorites...');
  await updateSingleType('section-priorites', {
    titre: 'Nos 3 priorités pour Veauche',
    description: 'Un programme concret, réaliste et ambitieux pour redonner de l\'air à notre ville.',
    publishedAt: new Date().toISOString(),
  });

  // 4. Methode Section
  console.log('📝 Updating Methode Section...');
  await updateSingleType('methode-section', {
    titre: 'Notre méthode de gestion',
    publishedAt: new Date().toISOString(),
  });

  // 5. Section Equipe
  console.log('📝 Updating Section Equipe...');
  await updateSingleType('section-equipe', {
    titre: 'Une équipe engagée pour Veauche',
    description: 'Des Veauchois de tous horizons, unis par la même volonté : redonner de l\'air à notre ville.',
    texte_bouton_complet: 'Découvrir toute l\'équipe',
    publishedAt: new Date().toISOString(),
  });

  // 6. Section Formulaire
  console.log('📝 Updating Section Formulaire...');
  await updateSingleType('section-formulaire', {
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

  // 7. Footer
  console.log('📝 Updating Footer...');
  await updateSingleType('footer', {
    description: 'Redonnons de l\'air à notre ville',
    ville: 'Veauche, Loire (42)',
    annee_election: 'Élections municipales 2026',
    texte_contact: 'Nous contacter',
    publishedAt: new Date().toISOString(),
  });

  console.log('\n✨ Single Types update completed!');
}

populateSingleTypes().catch(console.error);
