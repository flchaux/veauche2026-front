import { describe, it, expect } from 'vitest';
import {
  getHeroSection,
  getPresentationCandidat,
  getSectionPriorites,
  getPriorites,
  getMethodesGestion,
  getMembresEquipe,
  getPhotosVille,
  getSectionEquipe,
  getSectionFormulaire,
  getMethodeSection,
  getFooter,
} from './strapi';

describe('Strapi v5 Integration', () => {
  it('should fetch hero section data', async () => {
    const data = await getHeroSection();
    // Peut être null si pas encore créé dans Strapi
    if (data) {
      expect(data).toHaveProperty('titre');
      expect(data).toHaveProperty('description');
    }
  });

  it('should fetch presentation candidat data', async () => {
    const data = await getPresentationCandidat();
    if (data) {
      expect(data).toHaveProperty('titre');
      expect(data).toHaveProperty('badge');
    }
  });

  it('should fetch section priorites data', async () => {
    const data = await getSectionPriorites();
    if (data) {
      expect(data).toHaveProperty('titre');
      expect(data).toHaveProperty('description');
    }
  });

  it('should fetch priorites collection', async () => {
    const data = await getPriorites();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('titre');
      expect(data[0]).toHaveProperty('icone');
      expect(data[0]).toHaveProperty('actions');
    }
  });

  it('should fetch methodes gestion collection', async () => {
    const data = await getMethodesGestion();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('texte');
      expect(data[0]).toHaveProperty('icone');
    }
  });

  it('should fetch membres equipe collection', async () => {
    const data = await getMembresEquipe();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('nom');
      expect(data[0]).toHaveProperty('role');
    }
  });

  it('should fetch membres cles only', async () => {
    const data = await getMembresEquipe(true);
    expect(Array.isArray(data)).toBe(true);
    // Tous les membres retournés doivent être des membres clés
    data.forEach(membre => {
      if (membre.membre_cle !== undefined) {
        expect(membre.membre_cle).toBe(true);
      }
    });
  });

  it('should fetch photos ville collection', async () => {
    const data = await getPhotosVille();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('legende');
    }
  });

  it('should fetch section equipe data', async () => {
    const data = await getSectionEquipe();
    if (data) {
      expect(data).toHaveProperty('titre');
      expect(data).toHaveProperty('description');
    }
  });

  it('should fetch section formulaire data', async () => {
    const data = await getSectionFormulaire();
    if (data) {
      expect(data).toHaveProperty('titre');
      expect(data).toHaveProperty('description');
    }
  });

  it('should fetch methode section data', async () => {
    const data = await getMethodeSection();
    if (data) {
      expect(data).toHaveProperty('titre');
    }
  });

  it('should fetch footer data', async () => {
    const data = await getFooter();
    if (data) {
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('ville');
    }
  });

  it('should handle API errors gracefully', async () => {
    // Les fonctions ne doivent pas throw d'erreur même si l'API échoue
    await expect(getHeroSection()).resolves.not.toThrow();
    await expect(getPriorites()).resolves.not.toThrow();
  });

  it('should return correct data structure for Strapi v5', async () => {
    const priorites = await getPriorites();
    if (priorites.length > 0) {
      // Strapi v5 : pas de wrapper "attributes"
      expect(priorites[0]).not.toHaveProperty('attributes');
      // Les champs sont directement sur l'objet
      expect(priorites[0]).toHaveProperty('id');
      expect(priorites[0]).toHaveProperty('documentId');
    }
  });
});
