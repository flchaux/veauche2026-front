#!/usr/bin/env python3
"""Script pour supprimer toutes les mesures et priorités de Strapi"""

import requests
import os
import time

STRAPI_URL = os.getenv('VITE_STRAPI_URL', 'https://veauche-strapi.manus.space')
STRAPI_TOKEN = os.getenv('VITE_STRAPI_TOKEN', '')

headers = {
    'Authorization': f'Bearer {STRAPI_TOKEN}',
    'Content-Type': 'application/json'
}

print("=== Nettoyage de Strapi ===\n")

# Supprimer toutes les mesures
print("Suppression des mesures...")
try:
    response = requests.get(f'{STRAPI_URL}/api/mesures?pagination[pageSize]=200', headers=headers, timeout=30)
    if response.ok:
        mesures = response.json().get('data', [])
        print(f"Trouvé {len(mesures)} mesures")
        for i, mesure in enumerate(mesures, 1):
            try:
                del_response = requests.delete(f'{STRAPI_URL}/api/mesures/{mesure["id"]}', headers=headers, timeout=10)
                if del_response.ok:
                    print(f"  ✓ {i}/{len(mesures)} supprimée")
                else:
                    print(f"  ✗ {i}/{len(mesures)} erreur {del_response.status_code}")
                time.sleep(0.1)
            except Exception as e:
                print(f"  ✗ {i}/{len(mesures)} exception: {e}")
    else:
        print(f"Erreur lors de la récupération: {response.status_code}")
except Exception as e:
    print(f"Erreur: {e}")

print()

# Supprimer toutes les priorités
print("Suppression des priorités programme...")
try:
    response = requests.get(f'{STRAPI_URL}/api/priorites-programme?pagination[pageSize]=200', headers=headers, timeout=30)
    if response.ok:
        priorites = response.json().get('data', [])
        print(f"Trouvé {len(priorites)} priorités")
        for i, priorite in enumerate(priorites, 1):
            try:
                del_response = requests.delete(f'{STRAPI_URL}/api/priorites-programme/{priorite["id"]}', headers=headers, timeout=10)
                if del_response.ok:
                    print(f"  ✓ {i}/{len(priorites)} supprimée")
                else:
                    print(f"  ✗ {i}/{len(priorites)} erreur {del_response.status_code}")
                time.sleep(0.1)
            except Exception as e:
                print(f"  ✗ {i}/{len(priorites)} exception: {e}")
    else:
        print(f"Erreur lors de la récupération: {response.status_code}")
except Exception as e:
    print(f"Erreur: {e}")

print("\n=== Nettoyage terminé ===")
