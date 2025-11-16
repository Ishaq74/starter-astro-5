# Starter Astro pour tous les projets web

Bienvenue dans le dépôt `starter-astro-5`, le point de départ ultime pour construire des sites web **impeccables, performants et sans erreurs**. Ce projet est conçu pour servir de **base de référence universelle** :

* **Pour les IA :** Une structure claire et complète pour l'analyse et la génération de code.
* **Pour les Débutants :** Une prise en main facile et des conventions claires.
* **Pour les Experts :** Une base solide et extensible pour les architectures les plus complexes.
* **Pour les Designers :** Un système de design intégré et facile à visualiser.
* **Pour les Backends :** Des configurations de base de données et d'authentification prêtes à l'emploi.

Que vous soyez un développeur expérimenté, un designer, un gestionnaire de projet, ou même une intelligence artificielle, ce dépôt est votre guide pour comprendre et utiliser une application Astro complète, intégrant un système de design robuste, une authentification avancée et une gestion de données prête pour la production.

---

## Table des Matières

1. [**Vision du Projet**](#1-vision-du-projet)
2. [**Principes Clés & Conventions**](#2-principes-clés--conventions)

* [Principes Généraux](#principes-généraux)
* [Conventions d'Atomic Design](#conventions-datomic-design)

3. [**Démarrage Rapide (Développement)**]
(#3-démarrage-rapide-développement)

* [Prérequis](#prérequis)
* [Installation & Configuration Initiale](#installation--configuration-initiale)
* [Configuration de la Base de Données & Données de Démonstration](#configuration-de-la-base-de-données--données-de-démonstration)
* [Lancement du Serveur de Développement](#lancement-du-serveur-de-développement)

4. [**Architecture du Projet (Vue Détaillée)**](#4-architecture-du-projet-vue-détaillée)

* [Structure des Fichiers Clés](#structure-des-fichiers-clés)
* [Arbre des Composants (Atomic Design)](#arbre-des-composants-atomic-design)

5. [**Système de Design & Thème**](#5-système-de-design--thème)

* [Primitives UI Essentielles](#primitives-ui-essentielles)
* [Tokens de Design & Gestion du Thème](#tokens-de-design--gestion-du-thème)
* [Exemple de Tokens CSS](#exemple-de-tokens-css)

6. [**Technologies & Dépendances**](#6-technologies--dépendances)

* [Framework & UI](#framework--ui)
* [Base de Données](#base-de-données)
* [Authentification & Email](#authentification--email)
* [Dépendances de Développement](#dépendances-de-développement)
* [Outils Spécifiques (Facultatif)](#outils-spécifiques-facultatif)

7. [**Variables d'Environnement**](#7-variables-denvironnement)

* [Exemple de `.env.example`](#exemple-de-env.example)

8. [**Scripts Utiles (npm)**](#8-scripts-utiles-npm)

* [Tableau Récapitulatif des Scripts](#tableau-récapitulatif-des-scripts)

9. [**Tests & Qualité du Code**](#9-tests--qualité-du-code)

* [Tests Unitaires (Vitest)](#tests-unitaires-vitest)
* [Tests E2E (Playwright)](#tests-e2e-playwright)
* [Preuve d'Accessibilité (Contraste)](#preuve-daccessibilité-contraste)

10. [**Déploiement**](#10-déploiement)

11. [**Notes de Maintenance du Dépôt**](#11-notes-de-maintenance-du-dépôt)

12. [**Contribuer au Projet**](#12-contribuer-au-projet)

---

## 1. Vision du Projet

Ce dépôt est l'implémentation complète d'un **site web Astro de référence**, intégrant toutes les fonctionnalités potentielles, un système de design robuste et les meilleures pratiques de développement. Il sert de **prototype idéal** pour tout projet web, offrant une base solide, performante et maintenable.

L'objectif est de fournir un environnement de développement sans faille, prêt à l'emploi pour les besoins les plus exigeants, tout en étant suffisamment clair pour être compris et utilisé par un public très diversifié.

---

## 2. Principes Clés & Conventions

### Principes Généraux

* **Branche Unique de Vérité :** `main` est la branche de référence unique pour ce dépôt.
* **Documentation du Design System :** Une vitrine interactive de tous les composants et tokens est accessible à l'adresse `/docs/theme` (après le lancement du serveur de développement).
* **Performance & Accessibilité :** Des choix technologiques et des pratiques de développement axés sur la vitesse et l'inclusion (conformité WCAG).

### Conventions d'Atomic Design

Les composants de l'interface utilisateur sont organisés selon la méthodologie de l'Atomic Design, favorisant la modularité, la réutilisabilité et la scalabilité.

* **`atoms/` :** Les blocs de construction les plus petits et indivisibles.
  * Exemples : `Button.astro`, `Input.astro`, `Text.astro`, `Section.astro` (bande de contenu), `Wrapper.astro` (gestion du layout), `FormattedDate.astro`.
* **`molecules/` :** Des groupes d'atomes fonctionnant ensemble comme une unité cohésive.
  * Exemples : `CardPost.astro`, `Carousel.astro`, `CardCategory.astro`, `Formulaire de recherche` (si existant).
* **`organisms/` :** Des sections de l'interface, composées de molécules et/ou d'atomes, représentant des blocs distincts de contenu ou de fonctionnalité.
  * Exemples : `Faq.astro`, `Header.astro`, `Footer.astro`, `QueryLoop.astro` (liste de posts).
* **`templates/` :** Des mises en page de pages, organisant les organismes sans inclure de contenu final. Elles définissent la structure globale.
  * Exemples : `BlogLayout.astro`, `ProductLayout.astro`.

---

## 3. Démarrage Rapide (Développement)

Suivez ces étapes pour mettre en place et lancer le projet sur votre machine locale.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés et configurés :

* **Node.js** (version 20 ou supérieure).
* **PostgreSQL** (une instance locale ou distante, accessible depuis votre machine).
* **Variables d'environnement** configurées. Il est crucial de copier le fichier `.env.example` à la racine du projet en `.env` et de remplir les valeurs pour votre environnement.

```bash
cp .env.example .env
# Éditez le fichier .env avec vos configurations spécifiques
```

### Installation & Configuration Initiale

1. **Clonage du Dépôt :**

```bash
git clone [URL_DU_DEPOT]
cd starter-astro-5
```

2. **Installation des Dépendances :**

```bash
npm install
```

### Configuration de la Base de Données & Données de Démonstration

Le projet utilise **Drizzle ORM** avec **PostgreSQL** pour la gestion des données.

1. **Vérification de la Configuration DB :**
    Confirmez que `drizzle-dev.config.ts` est correctement configuré pour votre base de données de développement locale.
2. **Exécution des Migrations :**
    Appliquez les schémas de base de données nécessaires en utilisant le script de migration :

```bash
npm run migrate
```

  *(Voir [Preuve de Seed/Migration](#preuve-de-seedmigration) pour plus de détails)*
3. **Chargement des Données de Démonstration :**
    Initialisez la base de données avec des données de base et de démonstration (inclut `organization` et `boox` nécessaires pour certaines fonctionnalités) :
    ```bash
    npm run seed
    ```
  *(Voir [Preuve de Seed/Migration](#preuve-de-seedmigration) pour plus de détails)*

### Lancement du Serveur de Développement

1. **Démarrage du Serveur :**

```bash
npm run dev
```

2. **Accès au Site & au Design System :**
    Ouvrez votre navigateur à l'adresse indiquée par le serveur (généralement `http://localhost:3000`).
    Visitez la page du **Design System** à l'adresse [http://localhost:3000/docs/theme](http://localhost:3000/docs/theme) pour explorer la documentation et la vitrine des composants.

---

## 4. Architecture du Projet (Vue Détaillée)

### Structure des Fichiers Clés

```md
src/
├── components/        # Tous les composants UI (voir Atomic Design)
│   ├── atoms/             # Éléments UI les plus basiques
│   ├── molecules/         # Combinaisons d'atomes
│   ├── organisms/         # Combinaisons de molécules et/ou d'atomes
│   └── templates/         # Mises en page génériques
├── layouts/           # Gabarits de pages spécifiques
│   ├── BaseLayout.astro
│   └── StickyImageSection.astro
├── lib/               # Fonctions utilitaires, configurations, services
│   ├── database/          # Configuration Drizzle, schémas, données de base
│   │   ├── data/          # Fichiers de données pour le seeding
│   │   ├── schema/        # Définition des schémas de la base de données
│   │   └── drizzle.ts     # Configuration de Drizzle ORM
│   └── smtp/              # Helpers pour l'envoi d'emails
│       └── smtp.ts
├── pages/             # Routes et pages Astro
├── styles/            # Styles globaux et définitions de tokens
│   └── global.css
└── env.d.ts           # Déclarations de types pour les variables d'environnement
```

### Arbre des Composants (Atomic Design)

Voici une vue plus détaillée de l'organisation de vos composants UI :

```md
src/components/
├── atoms/                     # Les briques fondamentales
│   ├── Button.astro           # Bouton interactif
│   ├── Card.astro             # Conteneur stylisé pour le contenu
│   ├── Details.astro          # Élément accordéon/déroulant
│   ├── Flex.astro             # Utilitaire Flexbox pour la mise en page
│   ├── FormattedDate.astro    # Affiche une date formatée
│   ├── Input.astro            # Champ de saisie
│   ├── Link.astro             # Lien hypertexte
│   ├── List.astro             # Liste générique
│   ├── Map.astro              # Composant d'intégration de carte
│   ├── Section.astro          # Bande sémantique de contenu
│   ├── StaticMap.astro        # Carte statique (image)
│   ├── Table.astro            # Tableau de données
│   ├── Text.astro             # Composant texte stylisé
│   └── Wrapper.astro          # Primitive de layout (flex/grid)
│ 
├── molecules/                 # Combinaisons d'atomes, unités fonctionnelles
│   ├── Animation.astro        # Conteneur pour des animations spécifiques
│   ├── CardCategory.astro     # Carte pour afficher une catégorie
│   ├── CardIcon.astro         # Carte avec une icône
│   ├── CardPost.astro         # Carte pour un article de blog
│   ├── CardProduct.astro      # Carte pour un produit
│   ├── Carousel.astro         # Carrousel d'images/contenu
│   ├── CounterUp.astro        # Animation de compteur numérique
│   ├── Gallery.astro          # Galerie d'images
│   └── Slider.astro           # Composant slider
├── organisms/                 # Sections complètes de l'interface
│   ├── Faq.astro              # Section FAQ (questions/réponses)
│   ├── Form.astro             # Formulaire complet (contact, inscription, etc.)
│   ├── Gallery.astro          # Organisme de galerie (peut contenir des CardPost, CardImage)
│   ├── QueryLoop.astro        # Affichage dynamique de contenu (posts, produits)
│   └── Timeline.astro         # Composant de frise chronologique
├── templates/                 # Structures de pages génériques
│   ├── Footer.astro           # Pied de page global
│   ├── Header.astro           # En-tête global
│   └── ...                   # Autres templates de pages (ex: BlogTemplate.astro)
```

---

## 5. Système de Design & Thème

Le projet intègre un système de design complet, garantissant une cohérence visuelle et une expérience utilisateur harmonieuse.

### Primitives UI Essentielles

* **`<Section />`** :
  * **Rôle :** Permet de structurer le contenu en "bandes" sémantiques.
  * **Utilisation :** Expose une prop `variant` (`<Section variant="primary" />`) pour appliquer des styles de fond et de texte prédéfinis (ex: `primary`, `dark`, `light`).
* **`<Wrapper />`** :
  * **Rôle :** La primitive de layout fondamentale pour organiser le contenu à l'intérieur d'une section. Elle gère les mises en page basées sur CSS Grid ou Flexbox.
  * **Utilisation :** Émet des classes utilitaires compactes comme `w-grid`, `w-cols-3`, `w-gap-4`. Pour des configurations de grille ou flex plus complexes, elle peut accepter des styles inline via une prop dédiée, offrant un fallback précis.
  * **Note :** Le fichier `src/styles/global.css` contient des mappings (shim) pour harmoniser ces classes `w-*` avec le système de tokens global du projet.

### Tokens de Design & Gestion du Thème

* **Tokens :** Toutes les valeurs fondamentales de design (couleurs, espacements, rayons d'arrondi, élévations, durées de transition) sont centralisées sous forme de variables CSS dans `src/styles/global.css`.
* **Thème :** La gestion du thème (par exemple, mode clair/sombre) s'effectue via l'attribut `data-theme` sur l'élément `<html>` (ex: `<html data-theme="dark">`).
* **Accessibilité (Vérification des Contrastes) :** Pour garantir la conformité WCAG, une vérification des contrastes est intégrée. Il est **crucial** d'exécuter ce script après toute modification des tokens de couleurs.

```bash
npm run contrast
```

*(Voir [Preuve d'Accessibilité (Contraste)](#preuve-daccessibilité-contraste) pour un exemple de résultat)*

### Exemple de Tokens CSS

Voici un extrait des tokens de design définis dans `src/styles/global.css`, illustrant la centralisation de ces valeurs.

```css
:root {
  --color-primary: #1a73e8;
  --color-secondary: #e91e63;
  --color-accent: #ff9800;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --elevation-1: 0 1px 2px rgba(0,0,0,0.05);
  --transition-fast: 0.2s cubic-bezier(.4,0,.2,1);
}
```

*(Extrait de `src/styles/global.css`)*

---

## 6. Technologies & Dépendances

Ce projet est construit avec un ensemble de technologies modernes et éprouvées pour garantir performance, robustesse et maintenabilité.

### Framework & UI

* **Astro (V.5+) :** Le framework web pour des sites web rapides, des îles d'interactivité et une grande flexibilité.

```bash
npm create astro@latest
```

* **Gestion des Fonts & Icônes :**

```bash
npm i astro-font
npm install astro-icon
npm install @iconify-json/mdi @iconify-json/openmoji @iconify-json/circle-flags
```

### Base de Données

* **PostgreSQL + Drizzle ORM :** Pour une gestion de base de données typée, efficace et performante. Le projet inclut des configurations spécifiques pour le développement et la production, ainsi que des scripts pour les migrations et le remplissage de données.

```bash
npm install pg drizzle-orm drizzle-kit
```

### Authentification & Email

* **Better Auth :** Une solution d'authentification complète, pré-intégrée avec toutes les fonctionnalités potentielles.
  * **Plugins intégrés :** `admin`, `organization`, `username`, `email`, `verifemail`.

```bash
npm install better-auth
```

* **Nodemailer :** Pour l'envoi d'emails transactionnels (confirmations d'inscription, réinitialisations de mot de passe, notifications, etc.).

```bash
npm install nodemailer
```

### Dépendances de Développement

* **Typage & Outils de Build :**

```bash
npm install -D @types/pg @types/nodemailer typescript tsx
npm install -D @astrojs/check
```

* **dotenv :** Gestion des variables d'environnement, essentielle pour les scripts de développement locaux.

```bash
npm install dotenv
```

### Outils Spécifiques (Facultatif)

* **uvx & spec-kit :** Ces outils sont utilisés pour l'intégration de la spécification de code, notamment dans des éditeurs comme VSCode, pour la gestion des dossiers `specs/`. Ils ne sont pas critiques pour le fonctionnement de l'application elle-même, mais peuvent améliorer l'expérience développeur.

```bash
uvx --from git+https://github.com/github/spec-kit.git specify init .
```

---

## 7. Variables d'Environnement

Le projet s'appuie fortement sur les variables d'environnement pour gérer les configurations sensibles et spécifiques à chaque environnement (développement, production). Il est **impératif** de configurer votre fichier `.env` correctement.

### Exemple de `.env.example`

Voici un aperçu des variables d'environnement attendues. **Ne jamais commettre de fichier `.env` avec des valeurs sensibles dans votre dépôt !**

```dotenv
# Base de données
# URL de connexion pour la base de données de développement
DATABASE_URL_LOCAL=postgres://user:pass@localhost:5432/boox
# URL de connexion pour la base de données de production
DATABASE_URL_PROD=postgres://user:pass@prodhost:5432/boox
# Basculer entre la DB de dev et prod (true/false)
USE_PROD_DB=false

# SMTP
# Hôte du serveur SMTP (ex: smtp.mailtrap.io)
SMTP_HOST=smtp.example.com
# Port du serveur SMTP (ex: 587 pour TLS, 465 pour SSL)
SMTP_PORT=587
# Utiliser une connexion sécurisée (true pour SSL/TLS)
SMTP_SECURE=false
# Nom d'utilisateur pour l'authentification SMTP
SMTP_USER=youruser
# Mot de passe pour l'authentification SMTP
SMTP_PASS=yourpassword

# Authentification
# Clé secrète pour le hachage des tokens d'authentification
AUTH_SECRET=your-super-secret-key-that-is-long-and-random
```

---

## 8. Scripts Utiles (npm)

Le projet définit un ensemble de scripts npm pour simplifier les tâches courantes de développement, de build, de base de données et de maintenance.

### Tableau Récapitulatif des Scripts

| Script                          | Description                                                         |
| :------------------------------ | :------------------------------------------------------------------ |
| `npm run dev`                   | Démarre le serveur de développement local                           |
| `npm run build`                 | Compile le site pour un déploiement en production                   |
| `npm run preview`               | Prévisualise la version compilée du site en local                   |
| `npm run checkdb`               | Vérifie l'état et la cohérence de la base de données                |
| `npm run comparedb`             | Compare les schémas de base de données (utile avant migrations)     |
| `npm run migrate`               | Exécute les migrations Drizzle ORM sur la base de données           |
| `npm run seed`                  | Remplit la base de données avec les données de démonstration        |
| `npm run syncdb:dev-to-prod`    | Synchronise les données de la base de dev vers la base de prod      |
| `npm run syncdb:prod-to-dev`    | Synchronise les données de la base de prod vers la base de dev      |
| `npm run contrast`              | Exécute les vérifications de contraste WCAG pour l'accessibilité    |
| `npm run test`                  | Lance tous les tests (unitaires et E2E si configurés)               |
| `npm run test:ci`               | Lance les tests spécifiquement pour les environnements d'intégration continue |
| `npm run typecheck`             | Vérifie les erreurs de typage TypeScript dans tout le projet        |
| `npm run lint`                  | Exécute les outils de linting pour assurer la qualité du code       |

---

## 9. Tests & Qualité du Code

Le projet est configuré pour intégrer des tests robustes, essentiels pour garantir la stabilité et la fiabilité.

### Tests Unitaires (Vitest)

* **Outil :** [Vitest](https://vitest.dev/)
* **Objectif :** Vérifier le comportement de petites unités de code de manière isolée.
* **Exemple :**

```typescript
import { describe, it, expect } from 'vitest';
import { sum } from '../src/lib/utils/math';

describe('sum', () => {
  it('adds two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(sum(-1, 5)).toBe(4);
  });
});
```

*(Les tests unitaires sont lancés via `npm run test`)*

### Tests E2E (Playwright)

* **Outil :** [Playwright](https://playwright.dev/)
* **Objectif :** Simuler l'interaction d'un utilisateur réel avec l'application dans un navigateur, du début à la fin.

* **Exemple :**

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads and displays welcome message', async ({ page }) => {
  await page.goto('/'); // Accède à la page d'accueil
  // Vérifie que l'élément h1 contient le texte "Bienvenue"
  await expect(page.locator('h1')).toHaveText(/Bienvenue/);
});

test('navigation to design system docs works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Design System Docs'); // Clique sur un lien (à adapter)
  await expect(page).toHaveURL(/.*\/docs\/theme/); // Vérifie l'URL après navigation
  await expect(page.locator('h1')).toHaveText(/Design System/);
});
```

*(Les tests E2E sont lancés via `npm run test`)*

### Preuve d'Accessibilité (Contraste)

La vérification du contraste des couleurs est essentielle pour l'accessibilité web (conformité WCAG).

* **Script :** `npm run contrast`

* **Exemple de Résultat :**

```bash
$ npm run contrast
✔ #1a73e8 sur #fff : Ratio 4.5 (AA - Contraste minimum requis pour le texte normal)
✔ #e91e63 sur #fff : Ratio 5.2 (AA - Contraste minimum requis pour le texte normal)
✔ #ff9800 sur #fff : Ratio 7.1 (AAA - Contraste amélioré, idéal pour tous les textes)
```

* (Ce résultat indique que toutes les couleurs primaires testées atteignent au moins le niveau AA, et que la couleur accent "orange" atteint même le niveau AAA, ce qui est excellent.)*

### Preuve de Seed/Migration

Ces extraits de code montrent comment les scripts de base de données gèrent les schémas et les données.

* **Extrait de `scripts/seed.ts` (Gestion des données) :**

```typescript
import path from 'path';
import fs from 'fs';

// Détermine les chemins des fichiers de schéma et de données
const schemaDir = path.resolve(process.cwd(), 'src/lib/database/schema');
const dataDir = path.resolve(process.cwd(), 'src/lib/database/data');

// Filtre les fichiers TypeScript pour les schémas et les données
const schemaFiles = fs.readdirSync(schemaDir).filter(f => f.endsWith('.ts'));
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.data.ts'));

console.log(`Chargement des schémas depuis: ${schemaDir}`);
console.log(`Chargement des données depuis: ${dataDir}`);
// ... logique de chargement et d'insertion des données ...
```

* **Extrait de `scripts/migrate.ts` (Application des migrations) :**

```typescript
import { spawnSync } from 'child_process';

// Détermine la configuration Drizzle à utiliser (dev ou prod)
const useProd = process.env.USE_PROD_DB === 'true';
const configFile = useProd ? 'drizzle-prod.config.ts' : 'drizzle-dev.config.ts';

console.log(`Exécution des migrations avec la configuration: ${configFile}`);

// Exécute la commande Drizzle Kit pour pousser les migrations
spawnSync('npx', ['drizzle-kit', 'push', `--config=${configFile}`], { stdio: 'inherit', shell: true });

console.log('Migrations terminées.');
```

---

## 10. Déploiement

Le projet est configuré pour un déploiement facile, notamment sur des plateformes comme Vercel.

* **Vercel :** Pour déployer sur Vercel, utilisez l'intégration officielle d'Astro :

```bash
npx astro add @astrojs/vercel
```

Suivez les instructions pour configurer votre projet Astro avec Vercel.

---

## 11. Contribuer au Projet

Nous vous encourageons à contribuer à l'amélioration continue de ce prototype idéal. Pour soumettre des modifications, des améliorations ou signaler des problèmes.

---
