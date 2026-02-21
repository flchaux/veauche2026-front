/**
 * Utilitaire pour gérer le cookie de vote unique par visiteur
 */

const VOTE_COOKIE_NAME = 'veauche_voter_id';
const COOKIE_EXPIRY_DAYS = 365;

/**
 * Génère un UUID v4 simple
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Récupère ou crée le cookie ID du votant
 */
export function getVoterCookieId(): string {
  // Chercher le cookie existant
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === VOTE_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }

  // Créer un nouveau cookie si n'existe pas
  const newId = generateUUID();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  document.cookie = `${VOTE_COOKIE_NAME}=${encodeURIComponent(newId)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  
  return newId;
}

/**
 * Stocke un vote dans le localStorage pour vérification côté client
 * (en plus de la vérification serveur)
 */
export function markMesureAsVoted(mesureId: number): void {
  const votedMesures = getVotedMesures();
  if (!votedMesures.includes(mesureId)) {
    votedMesures.push(mesureId);
    localStorage.setItem('voted_mesures', JSON.stringify(votedMesures));
  }
}

/**
 * Vérifie si une mesure a déjà été votée (vérification côté client)
 */
export function hasVotedForMesure(mesureId: number): boolean {
  const votedMesures = getVotedMesures();
  return votedMesures.includes(mesureId);
}

/**
 * Récupère la liste des mesures déjà votées
 */
function getVotedMesures(): number[] {
  try {
    const stored = localStorage.getItem('voted_mesures');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
