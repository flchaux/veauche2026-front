#!/usr/bin/env python3
"""
Script pour afficher la requête exacte envoyée à Strapi
"""

import requests
import json
import os

STRAPI_URL = os.getenv('VITE_STRAPI_URL', 'https://veauche-strapi.manus.space')
STRAPI_TOKEN = os.getenv('VITE_STRAPI_TOKEN', '')

headers = {
    'Authorization': f'Bearer {STRAPI_TOKEN}',
    'Content-Type': 'application/json'
}

# Exemple de données pour un thème
theme_data = {
    "titre": "redonner de l'air à notre ville",
    "intro": "Nous voulons que Veauche retrouve le charme et la qualité de vie qui ont fait la fierté de ses habitants. Une ville où l'on souhaite voir grandir ses enfants, avec des espaces verts accessibles, des constructions maîtrisées et des rues plus agréables. C'est en investissant dans notre cadre de vie que nous léguerons une commune plus agréable et plus saine aux générations futures."
}

payload = {'data': theme_data}

print("=" * 80)
print("URL:")
print(f"POST {STRAPI_URL}/api/themes")
print("\n" + "=" * 80)
print("Headers:")
print(json.dumps({
    'Authorization': f'Bearer {STRAPI_TOKEN[:20]}...',
    'Content-Type': 'application/json'
}, indent=2))
print("\n" + "=" * 80)
print("Body (JSON):")
print(json.dumps(payload, indent=2, ensure_ascii=False))
print("\n" + "=" * 80)

# Faire la requête
print("\nEnvoi de la requête...")
response = requests.post(
    f'{STRAPI_URL}/api/themes',
    headers=headers,
    json=payload
)

print(f"\nStatus Code: {response.status_code}")
print(f"Response Headers: {dict(response.headers)}")
print(f"\nResponse Body:")
print(json.dumps(response.json(), indent=2, ensure_ascii=False))
