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
} from '../shared/strapiTypes';

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error("STRAPI_URL and STRAPI_API_TOKEN must be defined in environment variables");
}

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

// Helper pour obtenir l'URL complète d'une image Strapi
export function getStrapiImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${STRAPI_URL}${imageUrl}`;
}
