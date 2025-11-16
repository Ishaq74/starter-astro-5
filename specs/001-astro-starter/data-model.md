# Data Model: Astro starter Boox multilang & auth

## Entities

### 1. SiteIdentity

Représente l’identité du site Boox (SEO, branding, navigation, textos par défaut).

**Table**: `site_identity` (Drizzle schema dans `src/lib/database/schema/siteidentity.ts`)

**Champs**:

- `id` (integer, PK): identifiant numérique (seed initial avec `1`).
- `slug` (text, unique, non-null): identifiant logique du site (ex. `"boox"`).
- `title` (text, non-null): titre par défaut du site.
- `description` (text, non-null): description courte du site.
- `keywords` (text, non-null): mots-clés SEO.
- `author` (text, non-null): auteur/éditeur principal.
- `address` (text, non-null): adresse postale affichée.
- `email` (text, non-null): email de contact.
- `phone` (text, non-null): téléphone de contact.
- `googleMapsUrl` (text, nullable): lien Google Maps.
- `imageMapUrl` (text, nullable): image de carte.
- `defaultLang` (text, non-null): langue par défaut (ex. `"fr"`).
- `siteUrl` (text, non-null): URL de base du site.
- `defaultOgImage` (text, nullable): image OG par défaut.
- `defaultCanonicalUrl` (text, nullable): URL canonique par défaut.
- `logoUrl` (text, nullable): chemin du logo.
- `logoAlt` (text, nullable): texte alternatif du logo.
- `logoSizes` (jsonb, nullable): tailles de logo (breakpoints) sérialisées.
- `robotsContent` (text, nullable): directives robots (ex. `"index, follow"`).
- `themeColor` (text, nullable): couleur de thème principale.
- `ctaLabel` (text, nullable): libellé du bouton d’appel à l’action.
- `ctaUrl` (text, nullable): URL cible du CTA.
- `devName` (text, nullable): nom du développeur/agency.
- `devUrl` (text, nullable): URL du développeur/agency.
- `devEmail` (text, nullable): email du développeur/agency.
- `hostName` (text, nullable): nom de l’hébergeur.
- `hostAddress` (text, nullable): adresse de l’hébergeur.
- `hostUrl` (text, nullable): site de l’hébergeur.
- `hostContact` (text, nullable): contact de l’hébergeur.
- `mediatorName` (text, nullable): nom du médiateur.
- `mediatorAddress` (text, nullable): adresse du médiateur.
- `mediatorUrl` (text, nullable): site du médiateur.
- `mediatorContact` (text, nullable): contact du médiateur.
- `footerText` (text, nullable): texte du pied de page.
- `socialLinks` (jsonb, nullable): liste des liens sociaux.
- `navLinks` (jsonb, nullable): navigation principale.
- `navSecondaryLinks` (jsonb, nullable): navigation secondaire.
- `stats` (jsonb, nullable): statistiques affichées dans le site.
- `isDefault` (boolean, non-null, défaut `true`): indique le site identity par défaut.
- `createdAt` (timestamp, non-null, `defaultNow()`): date de création.
- `updatedAt` (timestamp, non-null, `defaultNow()`): date de mise à jour.

**Seed actuel** (`src/lib/database/data/siteidentity.data.ts`):

- Une entrée: `{ id: 1, slug: "boox", title: "Comment Cuire au AirFryer", …, isDefault: true }` correspondant au site Boox actuel.

**Validation rules**:

- `id`, `slug`, `title`, `description`, `keywords`, `author`, `address`, `email`, `phone`, `defaultLang`, `siteUrl` doivent être renseignés.
- `slug` unique.
- Les champs JSON (`logoSizes`, `socialLinks`, `navLinks`, `navSecondaryLinks`, `stats`) doivent contenir des objets/structures conformes aux attentes de l’UI.

### 2. User

Représente un utilisateur authentifié.

**Table**: `user` (Drizzle schema existant dans `src/lib/database/schema/auth-schema.ts`)

**Champs existants**:

- `id` (text, PK).
- `name` (text, non-null).
- `email` (text, unique, non-null).
- `emailVerified` (boolean, non-null, défaut `false`).
- `image` (text, nullable).
- `createdAt` (timestamp, non-null, `defaultNow()`).
- `updatedAt` (timestamp, non-null, `defaultNow()` + `$onUpdate`).

**Champs complémentaires côté application (non Drizzle)**:

- Préférences de langue et de thème seront manipulées via le profil utilisateur logique (par exemple via Better Auth), ou ajoutées plus tard via une migration dédiée si nécessaire.

**Relationships**:

- N‑1 vers `organization` via `member` et `session.activeOrganizationId`.

**Validation rules**:

- `email` obligatoire et unique (déjà garanti par le schéma).

### 3. DisplayPreferences (vue logique)

Les préférences de langue et de thème ne nécessitent pas forcément une table dédiée; elles sont réparties entre stockage local et colonnes utilisateur.

**Côté client (localStorage)**:

- `locale` (string): code langue.
- `theme` (string): `light` | `dark` | `system`.

**Côté serveur (User fields)**:

- `preferredLocale`.
- `preferredTheme`.

**Règles de cohérence**:

- Si l’utilisateur est authentifié, lors du login on synchronise localStorage depuis le profil serveur (source de vérité) et on met à jour serveur en cas de changement côté client.
- Si l’utilisateur est anonyme, seule la valeur locale est utilisée.

### 4. Content & i18n

Pour le contenu statique multilingue (sections de la home, FAQ, etc.), on s’appuie sur les collections de contenu Astro.

**Collections Astro (exemples)**:

- `pages`: pages vitrines avec champs `slug`, `locale`, `title`, `body`, `seo`.
- `faq`: entrées de FAQ multilingues avec `question`, `answer`, `locale`, `category`.

**Champs clés**:

- `locale` (string): code langue.
- `slug` (string): identifiant de page.

**Relations logiques**:

- Une page fonctionnelle ("home", "pricing", etc.) est représentée par plusieurs documents, un par locale.

### 5. Auth Session (Better Auth)

La représentation exacte dépend de Better Auth; côté plan, nous considérons:

- **Session**: créée lors de la connexion, associée à un `userId` et éventuellement à un `organizationId`.
- Stockage et sécurité gérés par Better Auth + cookies sécurisés.

## State Transitions

### User lifecycle

1. **Inscription**:
   - Création d’un `User` avec `organizationId = 'boox'`, `active = true` (ou après vérification d’email), `preferredLocale` initialisé à la locale en cours, `preferredTheme` à partir du thème actuel ou de la valeur par défaut.
2. **Connexion**:
   - Création d’une session Better Auth; récupération de l’utilisateur associé.
   - Synchronisation des préférences d’affichage (serveur → client puis client → serveur si l’utilisateur modifie la langue ou le thème).
3. **Déconnexion**:
   - Destruction de la session côté Better Auth.
   - Les préférences en `localStorage` peuvent être maintenues (pour l’appareil) mais ne sont plus liées à un utilisateur.

### Organization lifecycle

1. **Création de l’organisation `boox` (seed)**:
   - Seed initial avec une ligne `organization` remplissant les champs de site identity.
2. **Ajout d’une organisation supplémentaire (futur multi-tenant)**:
   - Ajout d’une nouvelle ligne `organization` avec son propre `id`, `locales`, `domain`, etc.
   - Le code existant reste compatible, la sélection du tenant se fera plus tard via domaine/route.

## Edge Cases (Data)

- Si aucune organisation ne correspond au contexte de requête, utiliser `boox` comme tenant de secours.
- Si `preferredLocale` de l’utilisateur n’est plus supportée (supprimée des locales de l’organisation), revenir à `defaultLocale`.
- Si les valeurs de thème/langue en localStorage sont inconnues, revenir aux valeurs par défaut (`defaultLocale`, `light` ou `system`).

