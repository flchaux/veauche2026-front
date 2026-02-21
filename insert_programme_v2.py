#!/usr/bin/env python3
"""
Script pour insérer les thèmes et mesures dans Strapi via l'API
Version 2: Gestion de la relation Many-to-Many entre mesures et themes
"""

import requests
import os
import json

STRAPI_URL = os.getenv('VITE_STRAPI_URL', 'https://veauche-strapi.manus.space')
STRAPI_TOKEN = os.getenv('VITE_STRAPI_TOKEN', '')

headers = {
    'Authorization': f'Bearer {STRAPI_TOKEN}',
    'Content-Type': 'application/json'
}

# Supprimer les données existantes
print("Suppression des données existantes...")
try:
    # Récupérer toutes les mesures
    response = requests.get(f'{STRAPI_URL}/api/mesures?pagination[pageSize]=100', headers=headers)
    if response.ok:
        mesures = response.json().get('data', [])
        for mesure in mesures:
            requests.delete(f'{STRAPI_URL}/api/mesures/{mesure["id"]}', headers=headers)
        print(f"✓ {len(mesures)} mesures supprimées")
    
    # Récupérer tous les thèmes
    response = requests.get(f'{STRAPI_URL}/api/themes', headers=headers)
    if response.ok:
        themes = response.json().get('data', [])
        for theme in themes:
            requests.delete(f'{STRAPI_URL}/api/themes/{theme["id"]}', headers=headers)
        print(f"✓ {len(themes)} thèmes supprimés")
except Exception as e:
    print(f"Erreur lors de la suppression: {e}")

# Données des thèmes
themes_data = [
    {
        "titre": "redonner de l'air à notre ville",
        "intro": "Nous voulons que Veauche retrouve le charme et la qualité de vie qui ont fait la fierté de ses habitants. Une ville où l'on souhaite voir grandir ses enfants, avec des espaces verts accessibles, des constructions maîtrisées et des rues plus agréables. C'est en investissant dans notre cadre de vie que nous léguerons une commune plus agréable et plus saine aux générations futures."
    },
    {
        "titre": "une ville sereine et sécurisée",
        "intro": "La sérénité au quotidien est un droit pour chaque Veauchois. Notre vision est celle d'une ville où l'on peut se déplacer en toute tranquillité, de jour comme de nuit, à pied ou à vélo. Cela passe par une présence policière visible et dissuasive, des moyens modernes comme la vidéoprotection ou le dispositif \"Participation citoyenne\". La sécurité c'est avant tout la sérénité dans son propre quartier."
    },
    {
        "titre": "préserver nos biens communs",
        "intro": "Nos écoles, nos routes et nos bâtiments publics sont l'héritage de nos aînés et celui que nous laisserons à nos enfants. Notre priorité est une gestion sérieuse de ce patrimoine, en arrêtant de reporter les travaux indispensables. Nous investirons massivement dans la rénovation, notamment énergétique, pour offrir des infrastructures modernes, accessibles et durables."
    },
    {
        "titre": "solidarité et vie locale",
        "intro": "Nous voulons une ville qui prend soin de tous ses habitants, des plus jeunes aux plus âgés, et qui soutient ceux qui la font vivre. Notre vision est de recréer du lien en luttant contre l'isolement des seniors, en leur permettant de rester à Veauche, en soutenant notre tissu associatif et en favorisant le commerce local. La solidarité n'est pas une dépense, c'est un investissement dans le \"mieux vivre ensemble\"."
    },
    {
        "titre": "Finances, économie, gestion et transparence",
        "intro": "Une gestion municipale responsable repose sur la transparence et la participation citoyenne. Nous nous engageons à rendre des comptes régulièrement, à impliquer les habitants dans les grandes décisions et à optimiser chaque euro dépensé. Notre objectif est de maintenir une fiscalité stable tout en investissant massivement dans les infrastructures et services publics."
    }
]

# Mesures par thème (index du thème commence à 0)
mesures_data = [
    # Thème 1: redonner de l'air à notre ville
    [
        "Développer une vision de l'urbanisme sur 15 ans en limitant les constructions excessives.",
        "Rouvrir et rénover les deux parcs pour enfants actuellement fermés, rue du Stade et Marcel Pagnol.",
        "Repenser les plannings d'entretien des voiries et installer de nouvelles poubelles pour une propreté irréprochable.",
        "Assurer un entretien rigoureux des espaces publics en privilégiant des végétaux adaptés à la sécheresse et en installant des systèmes de récupération d'eau de pluie.",
        "Mettre en valeur le sentier qui permet l'accès aux bords de Loire et rejoindre Bouthéon depuis Veauche.",
        "Rétablir des décorations de Noël pour redonner un esprit festif à notre ville durant les fêtes de fin d'année.",
        "Planter 1 000 arbres d'ici 2028 et créer un jardin pédagogique dans chaque école.",
        "Réaménager les différents squares, notamment lotissement des Primevères et des Volons.",
        "Installer de nouveaux racks à vélos dans les lieux stratégiques pour encourager les mobilités douces."
    ],
    # Thème 2: une ville sereine et sécurisée
    [
        "Renforcer les effectifs de police municipale jusqu'à 6 agents pour élargir les horaires de patrouille, notamment le soir et le week-end.",
        "Assurer la présence quotidienne d'un agent aux abords des écoles.",
        "Renforcer le réseau de vidéoprotection ciblé sur les zones sensibles (écoles, gymnases, parcs…) et utiliser des caméras mobiles contre les dépôts sauvages.",
        "Installer un éclairage public LED avec détecteurs de présence sur dix zones prioritaires.",
        "Élaborer un plan de circulation global intégrant le stationnement et la création de pistes cyclables sécurisées pour relier les différents lieux stratégiques de la ville.",
        "Relancer le dispositif \"Participation citoyenne\" pour renforcer la coopération entre les habitants, la police municipale et la gendarmerie.",
        "Créer une cellule anti-arnaques, en partenariat avec le CCAS et la gendarmerie, et organiser des ateliers de cyber-prévention.",
        "Mettre en place un numéro d'appel unique ainsi qu'une application mobile citoyenne pour signaler rapidement les incivilités et les problèmes de propreté.",
        "Installer des abris de bus supplémentaires."
    ],
    # Thème 3: préserver nos biens communs
    [
        "Rénover et/ou reconstruire nos écoles maternelles et élémentaires et nos restaurants scolaires afin de garantir sécurité et confort.",
        "Rénover en profondeur les voiries : rue Max de Saint Genest, avenue d'Andrézieux, et avenue Henri Planchet, en priorité.",
        "Augmenter la capacité d'accueil du Pôle Enfance Jeunesse (PEJ) et adapter les horaires aux besoins des familles. Garantir la priorité d'inscription aux Veauchois.",
        "Restructurer les trottoirs afin de sécuriser les piétons et les cyclistes.",
        "Assurer l'accès des personnes à mobilité réduite à 100% des bâtiments publics d'ici la fin du mandat, en commençant par la médiathèque.",
        "Lutter davantage contre les bâtiments laissés à l'abandon, notamment Avenue Irénée Laurent, et accompagner les propriétaires dans la réhabilitation de l'ancien.",
        "Reconstituer des réserves foncières pour anticiper les besoins futurs de la commune en matière d'équipements publics.",
        "Installer des ombrières photovoltaïques sur les parkings et les bâtiments municipaux pour produire une énergie locale et renouvelable."
    ],
    # Thème 4: solidarité et vie locale
    [
        "Rétablir l'événement festif de fin d'année pour les seniors et renforcer les actions du CCAS contre l'isolement (appels réguliers, visites).",
        "Offrir la gratuité de la médiathèque pour tous les Veauchois.",
        "Promouvoir les actions du CCAS dont la navette électrique qui dessert les services de santé, les marchés et les évènements associatifs.",
        "Maintenir les subventions aux associations.",
        "Réinstaurer la fête du Verre pour mettre en valeur l'histoire et le patrimoine veauchois.",
        "Mettre à disposition des associations une plateforme de réservation des salles en ligne en temps réel.",
        "Instaurer la gratuité des salles municipales une fois par an pour les événements caritatifs.",
        "Créer un point de contact unique en mairie et sur le site web à destination des commerçants et artisans.",
        "Promouvoir nos entreprises locales grâce aux canaux de communication de la ville dont le site web.",
        "Créer un espace de coworking municipal pour soutenir les travailleurs indépendants et les petites entreprises."
    ],
    # Thème 5: Finances, économie, gestion et transparence
    [
        "Organiser des référendums tout au long du mandat sur des projets impactant la vie des Veauchois : devenir des halles, emplacement du cimetière etc.",
        "Présenter un rapport financier annuel accessible et compréhensible par tous, expliquant les choix budgétaires et leur impact sur la ville.",
        "Faire entendre la voix de Veauche dans les décisions intercommunales afin de soutenir l'emploi et l'activité locale.",
        "Organiser des permanences hebdomadaires des élus pour maintenir un dialogue direct avec les habitants.",
        "Mettre en place une page internet dédiée au suivi des projets et travaux de la ville.",
        "Diffuser en direct tous les conseils municipaux sur internet et les rendre disponibles en rediffusion pour une transparence totale.",
        "Utiliser le magazine 'Au fil de Veauche' pour faire enfin toute la transparence sur les projets municipaux.",
        "Optimiser les dépenses de fonctionnement de la mairie et rechercher systématiquement des subventions pour financer nos projets d'investissement."
    ]
]

# Créer les thèmes et mesures
theme_ids = []
print("\nCréation des thèmes...")
for i, theme_data in enumerate(themes_data):
    try:
        response = requests.post(
            f'{STRAPI_URL}/api/themes',
            headers=headers,
            json={'data': theme_data}
        )
        if response.ok:
            theme_id = response.json()['data']['id']
            theme_ids.append(theme_id)
            print(f"✓ Thème {i+1} créé: {theme_data['titre']} (ID: {theme_id})")
        else:
            print(f"✗ Erreur thème {i+1}: {response.status_code} - {response.text}")
            theme_ids.append(None)
    except Exception as e:
        print(f"✗ Exception thème {i+1}: {e}")
        theme_ids.append(None)

# Créer les mesures avec relation Many-to-Many
print("\nCréation des mesures...")
total_mesures = 0
for theme_index, mesures_list in enumerate(mesures_data):
    theme_id = theme_ids[theme_index]
    if theme_id is None:
        print(f"✗ Thème {theme_index+1} non créé, mesures ignorées")
        continue
    
    for ordre, mesure_titre in enumerate(mesures_list, 1):
        try:
            # Pour une relation Many-to-Many, on passe un tableau d'IDs
            mesure_data = {
                'titre': mesure_titre,
                'ordre': ordre,
                'theme': [theme_id]  # Tableau d'IDs pour Many-to-Many
            }
            response = requests.post(
                f'{STRAPI_URL}/api/mesures',
                headers=headers,
                json={'data': mesure_data}
            )
            if response.ok:
                total_mesures += 1
                print(f"✓ Mesure {total_mesures}: {mesure_titre[:60]}...")
            else:
                print(f"✗ Erreur mesure: {response.status_code} - {response.text[:200]}")
        except Exception as e:
            print(f"✗ Exception mesure: {e}")

print(f"\n✅ Terminé: {len([t for t in theme_ids if t])} thèmes et {total_mesures} mesures créés")
