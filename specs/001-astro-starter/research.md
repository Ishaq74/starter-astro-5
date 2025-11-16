# Research: Astro starter Boox multilang & auth

## Decisions & Rationale

### 1. Multilingue (i18n)

- **Decision**: Utiliser le système de contenu Astro + collections (via `content.config.ts`) et/ou des fichiers de traduction structurés par locale (ex. `src/content/i18n/{fr,en}.json` ou `.md`) avec un sélecteur de langue côté UI.
- **Rationale**: Reste aligné avec l’architecture Astro existante, permet de stocker du contenu éditorial dans les collections tout en gardant des clés simples pour la navigation et les libellés d’UI. Facile à étendre vers de nouvelles langues (FR-001, FR-007).
- **Alternatives considered**:
  - `astro-i18next` ou équivalents: puissants mais ajoutent une dépendance supplémentaire et une complexité qui dépasse les besoins du starter.
  - Routage par sous-domaine (`fr.boox`, `en.boox`): utile plus tard en multi-tenant, mais surdimensionné pour la V1.

### 2. Sélection et persistance de la langue

- **Decision**: Stocker la langue sélectionnée dans `localStorage` côté client et, pour les utilisateurs authentifiés, la refléter également dans le profil utilisateur en base.
- **Rationale**: Permet une expérience cohérente pour les anonymes (préférence conservée sur le même navigateur) et pour les authentifiés (préférence synchronisée côté serveur, utile si l’utilisateur se connecte depuis plusieurs appareils). Aligné avec la clarification de spec.
- **Alternatives considered**:
  - Cookies uniquement: possible mais moins ergonomique pour les composants client et nécessite plus de précautions RGPD.
  - Stockage serveur uniquement: ne couvre pas le cas des visiteurs non authentifiés.

### 3. Thème clair/sombre

- **Decision**: Utiliser un toggle de thème basé sur des classes CSS (par ex. `data-theme="light|dark"` sur `<html>` ou `<body>`) alimenté par les tokens de `src/styles`, avec persistance en `localStorage`.
- **Rationale**: Compatible avec l’architecture actuelle, simple à intégrer avec les tokens et le script `scripts/contrast-check.js`. Permet un basculement instantané sans rechargement de page.
- **Alternatives considered**:
  - Approches basées uniquement sur `prefers-color-scheme`: utiles comme valeur par défaut, mais ne suffisent pas pour un contrôle explicite par l’utilisateur.

### 4. Authentification Better Auth & organisation `boox`

- **Decision**: Utiliser la configuration `better-auth` existante dans `src/lib/auth` en la complétant si nécessaire pour faire de l’organisation `boox` la source de vérité pour le site (site identity) et pour lier les utilisateurs à une organisation.
- **Rationale**: Aligné avec la constitution (Core Principle IV). Permet à terme de gérer plusieurs organisations en ajoutant des lignes dans la table `organization` sans changer l’architecture.
- **Alternatives considered**:
  - Implémenter une auth maison (sessions custom, JWT): rejeté car contraire à la constitution et plus risqué.

### 5. Modèle d’organisation (tenant) & site identity

- **Decision**: Étendre/normaliser la table `organization` (via Drizzle) pour y inclure les champs nécessaires à la site identity (nom du site, logo, description, couleur principale, langue par défaut, domaines éventuels), et supprimer la dépendance à un simple fichier `const` pour ces informations.
- **Rationale**: Répond aux FR-005, FR-008, FR-010. Prépare le multi-tenant en faisant de `organization` la source de vérité. Reste dans le cadre de Drizzle et de la discipline de schéma.
- **Alternatives considered**:
  - Conserver un fichier `const` + seulement un lien symbolique vers une organisation: rejeté car duplique la source de vérité et complique l’extension multi-tenant.

### 6. Sélection de l’organisation active (tenant)

- **Decision**: Pour la V1 du starter, l’organisation active est toujours `boox` (identifiant fixe dans la table `organization`). L’API et les services seront toutefois conçus pour accepter une clé d’organisation, de manière à ce qu’un routage futur (par domaine ou sous-chemin) puisse sélectionner un autre tenant.
- **Rationale**: Respecte la clarification de spec tout en préparant le multi-tenant sans l’implémenter complètement.
- **Alternatives considered**:
  - Implémenter dès maintenant un routing multi-tenant complet (domaines, sous-chemins): jugé hors scope pour ce starter et alourdirait la configuration.

### 7. Gestion des préférences d’affichage (langue, thème)

- **Decision**: Exposer une petite couche de service (TS) pour lire/écrire les préférences dans `localStorage` et, côté serveur, dans le profil utilisateur via Drizzle. En cas de conflit, pour un utilisateur authentifié, la valeur serveur fait autorité après login; pour un anonyme, seule la valeur locale est utilisée.
- **Rationale**: Clarifie la source de vérité selon le type d’utilisateur, simplifie les composants UI qui n’ont qu’à appeler ces services.
- **Alternatives considered**:
  - Gérer les préférences directement dans chaque composant: rejeté pour éviter la duplication et les divergences.

### 8. Gestion des erreurs (auth & organisation)

- **Decision**: Centraliser les erreurs d’authentification (identifiants invalides, compte désactivé) et de configuration (organisation non trouvée) dans des helpers côté serveur qui renvoient soit des résultats typés, soit des codes d’erreur simples, traduits ensuite côté UI via les mécanismes i18n.
- **Rationale**: Répond à FR-009 et aux edge cases en évitant les fuites d’information sur l’existence des comptes. Facilite les tests.
- **Alternatives considered**:
  - Propager directement les messages d’erreur de la lib d’authentification: rejeté car potentiellement verbeux et peu contrôlé.

## Unknowns Resolved

Aucun champ marqué "NEEDS CLARIFICATION" ne subsiste dans la section Technical Context du plan. Les décisions ci‑dessus fixent les choix techniques pour : i18n, stockage des préférences, modèle d’organisation, sélection du tenant et gestion des erreurs.
