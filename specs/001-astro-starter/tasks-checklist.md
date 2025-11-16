
# Design System AAA – Task Checklist

## Mapping tâches <-> exigences
| Tâche  | Exigence spec.md/plan.md | Critères d’acceptation |
|--------|-------------------------|------------------------|
| T004   | button-aaa              | WCAG AA, ratio ≥ 4.5:1, focus visible, aria-label, test manuel/automatisé |
| T005   | card-aaa                | Idem |
| T006   | input-aaa               | Idem + disabled state |
| T007   | link-aaa                | Idem + underline, aria-label |
| T008   | list-aaa                | Idem + marker visible |
| T009   | table-aaa               | Idem + header, aria-label |
| T010   | text-aaa                | Idem |
| T011   | wrapper-aaa             | Idem |
| T012   | section-aaa             | Idem |
| T013   | button-aaa-variants     | Idem, couleurs, border, shadow, états |
| T014   | card-aaa-variants       | Idem |
| T015   | input-aaa-variants      | Idem |
| T016   | link-aaa-variants       | Idem |
| T017   | list-aaa-variants       | Idem |
| T018   | table-aaa-variants      | Idem |
| T019   | text-aaa-variants       | Idem |
| T020   | wrapper-aaa-variants    | Idem |
| T021   | section-aaa-variants    | Idem |
| T022   | showcase-refactor       | Pas de style inline, classes uniquement |
| T023   | aaa-light-dark-verif    | Test visuel AAA light/dark |
| T024   | visual/manual-test      | Contraste, focus, accessibilité, états |

## Phase 2: Foundation – Layer CSS
- [ ] T003 Créer le layer @layer components dans src/styles/global.css
- [ ] T004 [P] Button: style AAA natif (padding, border, radius, shadow, typographie, focus, hover, active, disabled, accessibilité)
	- Critères: WCAG AA, ratio contraste ≥ 4.5:1, focus visible, aria-label, test manuel/automatisé
- [ ] T005 [P] Card: style AAA natif (padding, border, radius, shadow, typographie, focus, hover, accessibilité)
	- Critères: Idem
- [ ] T006 [P] Input: style AAA natif (padding, border, radius, shadow, typographie, focus, hover, active, disabled, accessibilité)
	- Critères: Idem + disabled state
- [ ] T007 [P] Link: style AAA natif (color, underline, focus, hover, active, accessibilité)
	- Critères: Idem + underline, aria-label
- [ ] T008 [P] List: style AAA natif (spacing, marker, focus, accessibilité)
	- Critères: Idem + marker visible
- [ ] T009 [P] Table: style AAA natif (border, spacing, header, focus, accessibilité)
	- Critères: Idem + header, aria-label
- [ ] T010 [P] Text: style AAA natif (typographie, color, spacing, accessibilité)
	- Critères: Idem
- [ ] T011 [P] Wrapper: style AAA natif (spacing, border, radius, shadow, accessibilité)
	- Critères: Idem
- [ ] T012 [P] Section: style AAA natif (spacing, border, radius, shadow, accessibilité)
	- Critères: Idem

## Phase 3: Variantes – Presets CSS
- [ ] T013 [P] Button: variantes .primary, .secondary, .accent (couleurs, border, shadow, états, accessibilité)
	- Critères: Idem, couleurs, border, shadow, états
- [ ] T014 [P] Card: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T015 [P] Input: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T016 [P] Link: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T017 [P] List: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T018 [P] Table: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T019 [P] Text: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T020 [P] Wrapper: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem
- [ ] T021 [P] Section: variantes .primary, .secondary, .accent (idem)
	- Critères: Idem

## Phase 4: Showcase minimal
- [ ] T022 Refactorer src/pages/docs/theme.astro pour n’utiliser que les composants natifs et les classes, sans style inline
	- Critères: Pas de style inline, classes uniquement
- [ ] T023 Vérifier le rendu AAA en light et dark mode dans src/pages/docs/theme.astro
	- Critères: Test visuel AAA light/dark
- [ ] T024 [P] Ajouter un test visuel/manuel pour chaque composant et variante (contraste, focus, accessibilité, états) dans src/pages/docs/theme.astro
	- Critères: Contraste, focus, accessibilité, états

- [ ] T025 Documentation et validation finale: mise à jour des checklists/requirements et documentation après implémentation
	- Critères: Tous les items validés, documentation à jour
