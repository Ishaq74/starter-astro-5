# Quickstart: Astro starter Boox multilang & auth

## Prerequisites

- Node.js 20+
- PostgreSQL instance accessible depuis la machine de développement
- Variables d’environnement pour la base de données, Better Auth et SMTP configurées (voir `env.d.ts` et `src/lib/smtp`)

## Installation

```bash
npm install
```

## Configuration de la base de données

1. Vérifiez la configuration Drizzle dans `drizzle-dev.config.ts`.
1. Exécutez les migrations:

```bash
npm run db:migrate
```

1. Seed de la base, incluant l’organisation `boox` et les données de démo:

```bash
npm run db:seed
```

## Lancer le starter

```bash
npm run dev
```

- Ouvrez le navigateur sur l’URL indiquée (par défaut `http://localhost:4321`).
- La page d’accueil Boox est disponible au moins en français et anglais.

## Fonctionnalités clés à tester

1. **Multilingue**
   - Utiliser le sélecteur de langue pour passer de FR à EN.
   - Vérifier que la navigation principale, les sections et le footer sont traduits.

2. **Thème clair/sombre**
   - Basculer le thème via le toggle de thème.
   - Vérifier la lisibilité et le contraste dans les deux thèmes.

3. **Authentification**
   - Créer un compte via la page d’inscription.
   - Se connecter, accéder à une page protégée (ex. tableau de bord), puis se déconnecter.

4. **Organisation `boox`**
   - Vérifier que le nom, le logo et la description du site proviennent de la table `organization`.
   - Consulter la ligne de seed `boox` pour comprendre comment ajouter un futur tenant.

## Étendre le starter

- **Ajouter une langue**: suivre le modèle de contenu existant (collections Astro, fichiers de traduction) et ajouter la nouvelle locale à la configuration.
- **Ajouter un tenant**: ajouter une ligne dans `organization` avec un nouvel `id` et ajuster les seeds; le routing multi-tenant pourra être branché ultérieurement.

---

## Design System Tokens

This starter includes a **fully tokenized atomic design system** with unified tokens for colors, spacing, radius, elevation, and transitions defined in `src/styles/global.css`.

### Quick Token Reference

| Category | Token | Example Usage |
|----------|-------|---------------|
| **Colors** | `--color-primary`, `--color-surface`, `--color-text`, `--color-border` | `background: var(--color-surface);` |
| **Spacing** | `--space-0` to `--space-10` (4px increments) | `padding: var(--space-5);` (24px) |
| **Radius** | `--radius-0` to `--radius-5`, `--radius-pill`, `--radius-circle` | `border-radius: var(--radius-3);` (8px) |
| **Elevation** | `--elevation-e0` to `--elevation-e5` | `box-shadow: var(--elevation-e2);` |
| **Transitions** | `--transition-speed` (200ms) | `transition: all var(--transition-speed) ease;` |

### Theme Switching
Themes are controlled via `data-theme` attribute on `<html>`:
```html
<html data-theme="light">  <!-- Default -->
<html data-theme="dark">   <!-- Dark mode -->
```

All color tokens automatically adapt to the active theme via HSL triple overrides.

### Usage Example
```astro
<style>
  .custom-card {
    padding: var(--space-5);
    background: var(--color-surface);
    border: var(--border-width-1) solid var(--color-border);
    border-radius: var(--radius-3);
    box-shadow: var(--elevation-e2);
    transition: box-shadow var(--transition-speed) ease;
  }

  .custom-card:hover {
    box-shadow: var(--elevation-e3);
  }
</style>
```

### Documentation
- **Full Token Guide:** `specs/001-astro-starter/design-system-quickstart.md` (coming soon)
- **Harmonization Report:** `specs/001-astro-starter/design-system-harmonization-report.md`
- **Contrast Verification:** Run `npm run contrast` to verify WCAG AA compliance
