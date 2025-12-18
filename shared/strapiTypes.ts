// Types pour Strapi v5 (structure sans attributes)

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Dans Strapi v5, les entités n'ont plus de wrapper "attributes"
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Collection Type: priorites
export interface Priorite extends StrapiEntity {
  titre: string;
  soustitre: string;
  icone: string;
  ordre: number;
  actions: string;
}

// Collection Type: membres_equipe
export interface MembreEquipe extends StrapiEntity {
  nom: string;
  role: string;
  biographie: string;
  quartier: string;
  citation?: string;
  photo?: StrapiImage | null;
  ordre: number;
  membre_cle: boolean;
}

// Collection Type: methodes_gestion
export interface MethodeGestion extends StrapiEntity {
  texte: string;
  icone: string;
  ordre: number;
}

// Collection Type: photos_ville
export interface PhotoVille extends StrapiEntity {
  legende: string;
  image?: StrapiImage | null;
  ordre: number;
}

// Single Type: hero_section
export interface HeroSection extends StrapiEntity {
  titre: string;
  description: string;
  texte_bouton: string;
  image_header?: StrapiImage | null;
}

// Single Type: presentation_candidat
export interface PresentationCandidat extends StrapiEntity {
  badge: string;
  titre: string;
  paragraphe_1: string;
  paragraphe_2: string;
  titre_equipe: string;
  description_equipe: string;
  photo_candidat?: StrapiImage | null;
}

// Single Type: section_priorites
export interface SectionPriorites extends StrapiEntity {
  titre: string;
  description: string;
}

// Single Type: section_equipe
export interface SectionEquipe extends StrapiEntity {
  titre: string;
  description: string;
  texte_bouton_complet: string;
}

// Single Type: section_formulaire
export interface SectionFormulaire extends StrapiEntity {
  titre: string;
  description: string;
  label_nom: string;
  label_email: string;
  label_avis: string;
  placeholder_avis: string;
  texte_bouton: string;
  message_confidentialite: string;
}

// Single Type: methode_section
export interface MethodeSection extends StrapiEntity {
  titre: string;
}

// Single Type: footer
export interface Footer extends StrapiEntity {
  description: string;
  ville: string;
  annee_election: string;
  texte_contact: string;
}
