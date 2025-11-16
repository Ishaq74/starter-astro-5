# Implementation Tasks: Design System

**Feature Branch**: `001-design-system`
**Created**: 2025-11-16

## Task List

- [ ] Refactor all components in `src/components/` to use tokens from `global.css`
- [ ] Validate WCAG AA contrast for all color pairs in both themes
- [ ] Implement theme switching via `[data-theme]`
- [ ] Document all tokens and usage in `design-system-quickstart.md`
- [ ] Handle edge cases (missing/invalid tokens) with fallback logic
- [ ] Provide contrast validation evidence (e.g., output from `scripts/contrast-check.js`)
- [ ] Ensure constitution principles are applied to tokens and theming
- [ ] Créer une page `docs/theme.astro` avec le `BaseLayout` affichant tous les composants par défaut, chacun avec les styles primaire, secondaire, accent, et support light/dark.
