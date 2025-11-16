# Implementation Plan: Astro starter Boox multilang & auth

**Branch**: `001-astro-starter` | **Date**: 2025-11-15 | **Spec**: `specs/001-astro-starter/spec.md`
**Input**: Feature specification from `/specs/001-astro-starter/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Créer un starter Astro complet pour Boox avec multilingue (FR/EN au minimum), thème clair/sombre, authentification complète basée sur Better Auth et une organisation par défaut `boox` jouant le rôle de site identity et préfigurant un futur multi-tenant. L’approche technique s’appuie sur Astro + Drizzle + PostgreSQL + Better Auth déjà configurés dans le repo, en structurant l’organisation et les préférences (langue, thème) dans le modèle de données et l’UI tout en respectant les principes d’accessibilité et d’atomic design existants.

## Technical Context

**Language/Version**: TypeScript (Astro) sur Node 20+  
**Primary Dependencies**: Astro, Drizzle ORM, PostgreSQL, `better-auth`, Nodemailer, Vitest, Playwright  
**Storage**: PostgreSQL via Drizzle ORM  
**Testing**: Vitest pour la logique, Playwright pour les flux UI bout-en-bout  
**Target Platform**: Hébergement web (Node.js) pour Astro, navigation desktop/mobile modernes  
**Project Type**: Web (frontend Astro avec backend intégré pour API/auth)  
**Performance Goals**: Temps de réponse serveur typique < 300ms p95 pour les pages standards; rendu initial de la home < 2s sur connexion raisonnable  
**Constraints**: Respect strict de la constitution (design tokens, WCAG AA, Drizzle pour toutes les données persistées, Better Auth pour l’authent); starter utilisable sur un seul tenant `boox` mais extensible vers multi-tenant; pas de secrets en dur  
**Scale/Scope**: Starter mono-tenant par défaut (organisation `boox`), dimensionné pour quelques milliers d’utilisateurs et plusieurs langues, avec possibilité d’ajouter ultérieurement d’autres organisations/tenants.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Core Principle I – Accessible Design-First**: Le plan respecte l’usage des tokens existants dans `src/styles` et des composants atomiques. Toute nouvelle couleur ou token devra passer par le script `scripts/contrast-check.js` avant adoption. Aucune exception prévue.
- **Core Principle II – Atomic UI & Reuse**: Le starter s’appuie sur la hiérarchie existante (`atoms`, `molecules`, `organisms`, `templates`, `layouts`). Les nouveaux composants (par ex. sélecteur de langue, menu utilisateur auth) seront placés au bon niveau et réutiliseront les atoms existants. Aucune exception prévue.
- **Core Principle III – Data & Schema Discipline (NON-NEGOTIABLE)**: Toute nouvelle table/champ (par ex. enrichissement de `organization`, préférences utilisateur persistées) sera ajoutée via Drizzle dans `src/lib/database/schema` et migrée via les scripts `scripts/migrate.ts` / `scripts/syncdb.ts`. Aucune écriture directe en SQL prévue. Aucune exception prévue.
- **Core Principle IV – Authentication, Security & SMTP**: L’authentification repose exclusivement sur `better-auth` et les helpers de `src/lib/auth`; les emails (par ex. vérification) restent gérés via `src/lib/smtp`. Aucun secret ne sera ajouté dans le code ou les seeds. Aucune exception prévue.
- **Core Principle V – Tests & Tooling**: Les flux critiques (auth, changement de langue, accès à une page protégée) devront être couverts par des tests Vitest et/ou Playwright, intégrés à `npm run test` / `npm run test:ci`. Aucune exception prévue.

**Gate Result (pre‑research)**: PASS – Le plan respecte la constitution existante, aucune dérogation n’est nécessaire à ce stade. Re‑évaluation prévue après la conception détaillée (data model + contrats API).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/
├── layouts/
├── lib/
│   ├── auth/
│   ├── database/
│   │   ├── schema/
│   │   └── data/
│   └── smtp/
├── pages/
└── styles/

tests/
├── unit/
├── integration/
└── e2e/
```

**Structure Decision**: Projet web Astro monorepo unique, avec les composants UI sous `src/components`, la logique d’authentification et de base de données sous `src/lib`, les layouts sous `src/layouts`, les styles/tokens sous `src/styles`, et une future batterie de tests structurée par type (`unit`, `integration`, `e2e`).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
