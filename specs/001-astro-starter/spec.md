# Feature Specification: Astro starter Boox multilang & auth

**Feature Branch**: `001-astro-starter`  
**Created**: 2025-11-15  
**Status**: Draft  
**Input**: User description: "Starter Astro complet multilangue, auth, organization/boox, multi-tenant prêt. Le starter Astro doit être prêt et complet incluant le multilangue, l'authentification, siteidentity devient l'organisation Better Auth appelée Boox au lieu du simple fichier const. On prépare ainsi un multi-tenant, mais pour l'instant c'est un site prêt à l'emploi multilangue, light/dark/auth complet et UI impeccable."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Découvrir le site Boox en multi-langue (Priority: P1)

Un visiteur arrive sur le site Boox et peut immédiatement consulter le contenu principal (page d'accueil, navigation, sections clés) dans sa langue préférée (par exemple français ou anglais), avec un thème clair ou sombre agréable, sans avoir besoin de créer un compte.

**Pourquoi cette priorité**: C'est la valeur de base du starter : un site vitrine prêt à l'emploi, multilingue, avec une UI soignée. Sans cette capacité, le reste (authentification, multi-tenant) n'a pas de valeur visible.

**Independent Test**: Ouvrir le site dans un navigateur, changer de langue et de thème, vérifier que tout le contenu principal et la navigation s'affichent correctement dans la langue choisie avec un rendu UI cohérent.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur la page d'accueil pour la première fois, **When** il choisit une langue dans le sélecteur, **Then** tout le contenu textuel principal s'affiche dans cette langue et le choix est retenu pour les pages suivantes.
2. **Given** un visiteur consulte le site, **When** il bascule le thème clair/sombre, **Then** l'ensemble du site (texte, composants, sections) s'adapte au thème choisi sans perte de lisibilité.

---

### User Story 2 - Se connecter et accéder à l'espace utilisateur (Priority: P2)

Un utilisateur peut créer un compte ou se connecter via le système d'authentification intégré (basé sur l'organisation "Boox" issue de Better Auth), puis accéder à une zone utilisateur (par exemple tableau de bord de réservations ou profil) qui reste cohérente avec la langue et le thème choisis.

**Pourquoi cette priorité**: L'authentification complète fait partie du coeur du starter pour des cas d'usage SaaS, réservations, espace membre, etc. Elle prépare aussi le futur multi‑tenant.

**Independent Test**: Créer un compte, confirmer la connexion, accéder à une page protégée, se déconnecter, puis vérifier les redirections et la persistance de la langue et du thème.

**Acceptance Scenarios**:

1. **Given** un visiteur n'est pas authentifié, **When** il tente d'accéder à une page protégée, **Then** il est redirigé vers la page de connexion avec un message clair dans la bonne langue.
2. **Given** un utilisateur s'authentifie avec des identifiants valides, **When** la connexion est réussie, **Then** il est redirigé vers son espace utilisateur et voit son nom ou email affiché dans le menu utilisateur.

---

### User Story 3 - Préparer un futur multi-tenant basé sur `organization` (Priority: P3)

Un développeur qui utilise le starter peut facilement comprendre et adapter la notion d'organisation au sens Better Auth : le site utilise une première organisation par défaut `boox` (ligne de la table `organization`), qui fournit le site identity (nom, logo, description). Plus tard, ce même mécanisme pourra servir plusieurs sites/tenants supplémentaires simplement en ajoutant d'autres organisations.

**Pourquoi cette priorité**: Le but est d'offrir un starter extensible vers du multi-tenant sans forcer cette complexité dès le départ, ce qui le rend plus pérenne pour des projets clients.

**Independent Test**: Examiner la configuration de la table `organization`, vérifier que l'organisation `boox` alimente bien le site identity (nom, logo, description), ajouter une organisation de test et constater que le code est déjà prêt à distinguer les organisations (même si une seule est réellement utilisée au départ).

**Acceptance Scenarios**:

1. **Given** le starter est installé avec l'organisation par défaut `boox` dans la table `organization`, **When** un développeur lit la configuration, **Then** il voit clairement que cette organisation fournit le site identity (nom du site, logo, description) affiché partout sur le site.

2. **Given** une deuxième organisation de test est ajoutée dans la table `organization`, **When** un développeur souhaite préparer un second site, **Then** il peut s'appuyer sur cette structure pour brancher un futur routage ou une sélection de tenant sans refondre l'architecture.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- Que se passe-t-il si la langue détectée automatiquement par le navigateur n'est pas supportée par le site ? (comportement attendu : bascule vers une langue par défaut, par exemple français, avec possibilité de changer manuellement).
- Comment le site gère-t-il un utilisateur qui change de langue après s'être connecté ? (comportement attendu : UI de l'espace utilisateur immédiatement ajustée, sans déconnexion).
- Que se passe-t-il si le thème ou la langue sauvegardés en local ne sont plus valides (valeur inconnue) ? (comportement attendu : retour à des valeurs par défaut stables).
- Comment le système réagit-il en cas de tentative de connexion avec des identifiants invalides ou un compte désactivé ? (message d'erreur clair, pas de fuite d'information sur l'existence du compte).
- Que se passe-t-il si, dans le futur, plusieurs organisations sont configurées mais qu'aucune organisation ne correspond au domaine courant ? (comportement attendu : utiliser toujours l'organisation par défaut `boox` comme tenant de secours).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: Le système DOIT permettre d'afficher un site vitrine complet (pages publiques principales, navigation, footer, sections de contenu) en au moins deux langues (par ex. FR/EN), avec possibilité de passer de l'une à l'autre via un sélecteur.
- **FR-002**: Le système DOIT mémoriser les préférences de langue et de thème (clair/sombre) de l'utilisateur entre les pages et lors des visites suivantes, dans le respect des bonnes pratiques de confidentialité.
- **FR-003**: Le système DOIT offrir un mécanisme d'authentification complet (inscription, connexion, déconnexion, récupération de session) basé sur une organisation par défaut "Boox" dérivée de Better Auth, accessible depuis l'UI (bouton/menu utilisateur).
- **FR-004**: Le système DOIT protéger certaines pages (par exemple un tableau de bord utilisateur) qui ne sont accessibles qu'aux utilisateurs authentifiés, avec redirection appropriée si l'utilisateur n'est pas connecté.
-- **FR-005**: Le système DOIT exposer une structure de données d'organisation alignée sur la table `organization` de Better Auth (tenant) permettant de définir au moins : identifiant d'organisation, nom, identifiants Better Auth, paramètres de marque (logo, couleurs, métadonnées) et paramètres de site identity, et la référencer comme source de vérité plutôt qu'un simple fichier `const`.
- **FR-006**: Le système DOIT proposer une UI cohérente et "impeccable" pour les principaux composants (header, footer, cartes, formulaires, listes, navigation), en mode clair et sombre, sans glitch visuel majeur.
- **FR-007**: Le système DOIT permettre à un développeur d'ajouter facilement une nouvelle langue (par exemple espagnol) en suivant un modèle de configuration de contenu, sans modifier le code métier central.
-- **FR-008**: Le système DOIT permettre à un développeur de préparer un second tenant (nouvelle organisation) en s'appuyant sur la structure d'organisation existante, sans refonte de l'architecture.
-- **FR-009**: Le système DOIT gérer les erreurs d'authentification ou de chargement de configuration (organisation non trouvée, paramètres manquants) par des messages explicites côté utilisateur et des journaux exploitables côté développeur.
-- **FR-010**: Le système DOIT, en absence d'organisation spécifique correspondant au contexte de requête, utiliser l'organisation par défaut `boox` comme tenant de secours.

- **FR-011**: Le design system DOIT définir une échelle neutre de 12 niveaux (N0–N11) et des rôles sémantiques standard: primary, secondary, accent, success, warning, info, error, exposés via tokens CSS en HSL (triple HSL + variable dérivée), utilisables en thèmes clair/sombre.

### Key Entities *(include if feature involves data)*

- **Organisation (Tenant)**: Représente une ligne de la table `organization` de Better Auth (ici `boox` par défaut) avec des attributs tels que identifiant d'organisation, nom, identifiants Better Auth, paramètres de marque (logo, couleurs), paramètres de langue par défaut, description du site et éventuels domaines associés. Peut être étendue pour supporter plusieurs organisations (plusieurs sites) à partir de la même base.
- **Utilisateur**: Représente une personne qui se connecte au site. Attributs clés : identifiant unique, email, nom affiché, état actif/inactif, appartenance à une organisation.
- **Préférences d'affichage**: Regroupe les choix de langue et de thème (clair/sombre) d'un utilisateur (authentifié ou non), persistés de manière adaptée (localement et/ou côté serveur selon les besoins du projet).

### Non-Functional Requirements

- **NFR-001 (Accessibilité - Contraste)**: Le design system DOIT respecter WCAG AA pour le contraste: ratio ≥ 4.5:1 pour le texte normal et ≥ 3:1 pour le texte large, au minimum pour les paires suivantes en thèmes clair/sombre: `background/text`, `surface/text`, `primary/text`, `secondary/text`, `accent/text`, `success/text`, `warning/text`, `info/text`, `error/text`.
- **NFR-002 (Typographie - Stabilité)**: Ne PAS modifier les tailles de texte existantes (base, titres, corps). La mise en place des tokens ne doit pas changer la hiérarchie ou les valeurs typographiques actuelles.
- **NFR-003 (Espacement - Échelle de tokens)**: Utiliser une échelle 8‑points avec pas de 4px, exposée en tokens `rem` nommés `--space-0` à `--space-10`. Tous les espacements (margins, paddings, gaps) des composants doivent référencer ces tokens, sans valeurs hexadécimales ou pixels en dur.
- **NFR-004 (Élévation - Ombres)**: Définir 6 niveaux d'élévation `--elevation-e0` à `--elevation-e5` avec ombres composées (ex: petites diffusions + légère ambient) utilisant exclusivement des tokens (`--color-shadow`, éventuellement transparences via `color-mix`). Aucune ombre ad‑hoc rgba hors tokens.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Un nouvel utilisateur (non technique) peut comprendre et changer la langue du site, puis naviguer entre au moins trois pages publiques, en moins de 2 minutes, sans assistance.
- **SC-002**: Un utilisateur peut s'inscrire, se connecter, accéder à une page protégée, puis se déconnecter, en moins de 3 minutes, sans message d'erreur inattendu.
- **SC-003**: Lors de tests utilisateurs internes, au moins 90 % des testeurs jugent l'interface claire et agréable, aussi bien en thème clair qu'en thème sombre.
- **SC-004**: Un développeur découvrant le starter peut identifier en moins de 30 minutes comment : (1) ajouter une langue, (2) adapter l'organisation par défaut, (3) ajouter un futur tenant, en se basant uniquement sur la structure de configuration et la documentation.

## Clarifications

### Session 2025-11-15

- Q: Où doivent être persistées par défaut les préférences de langue et de thème d'un utilisateur authentifié ? → A: Stockées côté client + profil utilisateur serveur, avec le serveur comme source de vérité après login.
- Q: Comment l'organisation active doit-elle être sélectionnée dans la V1 du starter ? → A: Toujours sélectionner l'organisation `boox` comme tenant unique au runtime.
- Q: Quel doit être le flux par défaut en cas d'échec de connexion (identifiants invalides) ? → A: Rester sur la page de login, afficher un message d'erreur localisé et conserver les champs pertinents.
- Q: Quelle forme doit prendre la palette de tokens du design system (échelle neutre et rôles sémantiques) ? → A: Échelle neutre 12 niveaux (N0–N11) + rôles: primary, secondary, accent, success, warning, info, error.
- Q: Quel est le niveau de contraste cible du design system ? → A: WCAG AA: 4.5:1 pour texte normal, 3:1 pour texte large.
- Q: Doit-on modifier l'échelle typographique (tailles de texte) ? → A: Non, ne pas toucher aux tailles de texte existantes; conserver la typographie telle quelle.
- Q: Quelle échelle d'espacement utiliser pour les tokens ? → A: Échelle 8‑points, pas de 4px, tokens en rem, plage 0–10 (`--space-0..10`).
- Q: Quel système d'élévation/ombres adopter ? → A: 6 niveaux d'élévation (`e0`–`e5`) avec tokens d'ombres theme-aware basés sur `--color-shadow` et couches multiples standardisées.
