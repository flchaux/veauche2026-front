/**
 * Service API pour gérer les votes sur les mesures
 */

import { getVoterCookieId, markMesureAsVoted, hasVotedForMesure } from './voteCookie';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export type VoteType = 'like' | 'dislike';

export interface VoteResponse {
  success: boolean;
  voteId?: number;
  message?: string;
  alreadyVoted?: boolean;
}

/**
 * Récupère l'IP du visiteur via un service externe
 * Note: En production, il serait préférable de récupérer l'IP côté serveur
 */
async function getVisitorIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'IP:', error);
    // Fallback: utiliser une IP par défaut si le service est indisponible
    return 'unknown';
  }
}

/**
 * Soumet un vote pour une mesure
 */
export async function submitVote(
  mesureId: number,
  voteType: VoteType
): Promise<VoteResponse> {
  // Vérification côté client
  if (hasVotedForMesure(mesureId)) {
    return {
      success: false,
      message: 'Vous avez déjà voté pour cette mesure',
      alreadyVoted: true
    };
  }

  try {
    const cookieId = getVoterCookieId();
    const ipAddress = await getVisitorIP();

    const response = await fetch(`${STRAPI_URL}/api/votes-mesures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          mesure_id: mesureId,
          vote_type: voteType,
          ip_address: ipAddress,
          cookie_id: cookieId
        }
      })
    });

    if (response.status === 409 || response.status === 400) {
      // Conflit : l'utilisateur a déjà voté
      return {
        success: false,
        message: 'Vous avez déjà voté pour cette mesure',
        alreadyVoted: true
      };
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Marquer comme voté côté client
    markMesureAsVoted(mesureId);

    return {
      success: true,
      voteId: data.data.id,
      message: 'Vote enregistré avec succès'
    };
  } catch (error) {
    console.error('Erreur lors du vote:', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'enregistrement de votre vote'
    };
  }
}

/**
 * Ajoute un commentaire à un vote existant (pour les votes négatifs)
 */
export async function addCommentToVote(
  voteId: number,
  commentaire: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/votes-mesures/${voteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          commentaire
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return {
      success: true,
      message: 'Merci pour votre retour !'
    };
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    return {
      success: false,
      message: 'Une erreur est survenue'
    };
  }
}
