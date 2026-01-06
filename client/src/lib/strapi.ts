import type {
  StrapiResponse,
  Priorite,
  MembreEquipe,
  MethodeGestion,
  PhotoVille,
  HeroSection,
  PresentationCandidat,
  SectionPriorites,
  SectionEquipe,
  SectionFormulaire,
  MethodeSection,
  Footer,
} from '../../../shared/strapiTypes';

// Variables d'environnement Vite (côté client)
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://veauche2026-strapi.onrender.com';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || 'b898956bd2e7bd8cfe2daa8b046188ef59bbdeca3d2e45ddef74de8dd9dde3c733946210951f48d606cdc5cc0a1cfc7cb86d86efce5dca679601c9a9de7c200521b0dff5644cdd6638f745cd91a4014f8e51c8d92ed515fa202b32ad7c9b2dd5b520d0e4c868ae77020c6163bfff7ce140adfb44a737065a00f1769bc142fcad';

async function fetchStrapi<T>(endpoint: string): Promise<T | null> {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Strapi API warning for ${endpoint}: ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Strapi API error for ${endpoint}:`, error);
    return null;
  }
}

// Collection Types (retournent des tableaux)
export async function getPriorites(): Promise<Priorite[]> {
  const response = await fetchStrapi<StrapiResponse<Priorite[]>>(
    "priorites?populate=*&sort=ordre:asc"
  );
  return response?.data || [];
}

export async function getMembresEquipe(membresCles?: boolean): Promise<MembreEquipe[]> {
  let endpoint = "membres-equipes?populate=*&sort=ordre:asc";
  if (membresCles !== undefined) {
    endpoint += `&filters[membre_cle][$eq]=${membresCles}`;
  }
  const response = await fetchStrapi<StrapiResponse<MembreEquipe[]>>(endpoint);
  return response?.data || [];
}

export async function getMethodesGestion(): Promise<MethodeGestion[]> {
  const response = await fetchStrapi<StrapiResponse<MethodeGestion[]>>(
    "methodes-gestions?populate=*&sort=ordre:asc"
  );
  return response?.data || [];
}

export async function getPhotosVille(): Promise<PhotoVille[]> {
  const response = await fetchStrapi<StrapiResponse<PhotoVille[]>>(
    "photos-villes?populate=*&sort=ordre:asc"
  );
  return response?.data || [];
}

// Single Types (retournent un objet unique)
export async function getHeroSection(): Promise<HeroSection | null> {
  const response = await fetchStrapi<StrapiResponse<HeroSection>>(
    "hero-section?populate=*"
  );
  return response?.data || null;
}

export async function getPresentationCandidat(): Promise<PresentationCandidat | null> {
  const response = await fetchStrapi<StrapiResponse<PresentationCandidat>>(
    "presentation-candidat?populate=*"
  );
  return response?.data || null;
}

export async function getSectionPriorites(): Promise<SectionPriorites | null> {
  const response = await fetchStrapi<StrapiResponse<SectionPriorites>>(
    "section-priorites?populate=*"
  );
  return response?.data || null;
}

export async function getSectionEquipe(): Promise<SectionEquipe | null> {
  const response = await fetchStrapi<StrapiResponse<SectionEquipe>>(
    "section-equipe?populate=*"
  );
  return response?.data || null;
}

export async function getSectionFormulaire(): Promise<SectionFormulaire | null> {
  const response = await fetchStrapi<StrapiResponse<SectionFormulaire>>(
    "section-formulaire?populate=*"
  );
  return response?.data || null;
}

export async function getMethodeSection(): Promise<MethodeSection | null> {
  const response = await fetchStrapi<StrapiResponse<MethodeSection>>(
    "methode-section?populate=*"
  );
  return response?.data || null;
}

export async function getFooter(): Promise<Footer | null> {
  const response = await fetchStrapi<StrapiResponse<Footer>>(
    "footer?populate=*"
  );
  return response?.data || null;
}

export async function getParametresSite(): Promise<{afficher_bloc_rag: boolean, equipe_complete_disponible: boolean} | null> {
  const response = await fetchStrapi<StrapiResponse<{afficher_bloc_rag: boolean, equipe_complete_disponible: boolean}>>(
    "parametres-site"
  );
  return response?.data || null;
}

// Helper pour obtenir l'URL complète d'une image Strapi
export function getStrapiImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${STRAPI_URL}${imageUrl}`;
}
