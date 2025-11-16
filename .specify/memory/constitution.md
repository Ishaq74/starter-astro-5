<!--
Sync Impact Report
- Version change: 1.0.1 → 1.1.0
- Modified principles:
	- I. Accessible Design-First → I. Accessible Design-First (clarified; token guidance moved)
- Added sections:
	- II. Design Tokens & Theming (NON-NEGOTIABLE)
- Removed sections: none
- Templates updated:
	- ✅ .specify/templates/plan-template.md (Constitution Check updated for tokens/theming)
	- ✅ .specify/templates/spec-template.md (requirements include design/theming constraints)
	- ✅ .specify/templates/tasks-template.md (add design system setup/check tasks)
- Deferred TODOs:
	- TODO(RATIFICATION_DATE): set actual project adoption date if different
-->

# Boox Project Constitution

## Core Principles

### I. Accessible Design-First (NON-NEGOTIABLE)

The UI MUST maintain at least WCAG AA contrast in both light and dark
themes. Accessibility verification (contrast, focus visibility, motion
reduction where applicable) is a hard gate.

Concretely:

- All color usages MUST achieve WCAG AA for text and interactive states
	in both light and dark themes.
- PRs that affect colors or contrast MUST include evidence of passing
	checks using `scripts/contrast-check.js` (or successor tooling).
- Any exception requires explicit justification and approval in the PR.

**Rationale**: Accessibility is non‑negotiable. Enforcing contrast
validation prevents regressions and upholds a coherent, inclusive UI.

### II. Design Tokens & Theming (NON-NEGOTIABLE)

A single global stylesheet `src/styles/global.css` is the source of
truth for all design tokens. Components MUST NOT hard‑code colors,
spacing, typography, or radii; they MUST consume tokens via `var(...)`.

Concretely:

- `src/styles/global.css` MUST define the semantic palette and scales:
  - Colors: `--color-primary`, `--color-secondary`, `--color-accent`,
    `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`,
    interactive state tokens (e.g., `--color-primary-hover`).
  - Typography: `--font-sans`, `--font-mono`, `--text-xs…--text-3xl`.
  - Spacing scale: `--space-1…--space-8` (or broader if needed).
  - Radii and shadows: `--radius-0…`, `--shadow-sm…`.
- Light/Dark theming MUST be implemented with token overrides, using
  `[data-theme="light"]` and `[data-theme="dark"]` scopes (preferred), or
  `@media (prefers-color-scheme: dark)` as a fallback. The theme switcher
  in `@components/templates/Header/ThemeSwitch.astro` MUST toggle
  `data-theme` on the root element.
- Default visual identity (primary/secondary/accent, background,
  text) MUST live in `:root` (light) and be mirrored for dark under the
  `[data-theme="dark"]` scope.
- Non-default or experimental styles MUST be scoped inside the
  component `<style>` block; global additions outside tokens are
  prohibited.
- Hard-coded color literals (e.g., `#fff`, `rgb(...)`) in components
  are prohibited; use tokens exclusively.
- Any new or changed token MUST be validated with
  `scripts/contrast-check.js` and included in the PR description with
  contrast evidence for relevant pairs.

Naming conventions:

- Prefer semantic tokens over raw color names (e.g., `--color-primary`
  instead of `--color-blue-500`).
- Implementation tokens (e.g., `--brand-primary-500`) MAY exist but
  MUST map to semantic tokens consumed by components.

**Rationale**: Centralizing tokens in one file guarantees consistency,
enables instant theming (light/dark), and supports maintainable,
auditable contrast compliance.

### III. Atomic UI & Reuse

UI composition MUST follow the atomic design hierarchy reflected in
`src/components`:

- **Atoms**: Basic, reusable elements (buttons, inputs, text blocks)
	live in `src/components/atoms`.
- **Molecules**: Small combinations of atoms (e.g., labeled input,
	card header) live in `src/components/molecules`.
- **Organisms**: Larger sections composed of molecules and atoms (e.g.,
	forms, galleries, timelines) live in `src/components/organisms`.
- **Templates**: Page-level layout sections live in
	`src/components/templates` and `src/layouts`.

Concretely:

- New UI SHOULD first attempt to reuse existing atoms/molecules before
	defining new ones.
- When introducing a new component, contributors MUST decide and
	document its atomic level and place the file in the corresponding
	directory.
- Layout concerns (grid, spacing, alignment) SHOULD be expressed using
	`Grid.astro`, `Grid2.astro`, or layout utilities from
	`src/layouts/BaseLayout.astro` where appropriate.

**Rationale**: A strict atomic structure keeps the Astro frontend
predictable, easier to theme, and reduces duplication.

### IV. Data & Schema Discipline (NON-NEGOTIABLE)

Persistent data and schema evolution are governed by Drizzle and the
database layer under `src/lib/database`.

Concretely:

- All tables and relations MUST be declared in Drizzle schema files
	under `src/lib/database/schema` (e.g., `services.ts`, `reservations.ts`).
- Database changes MUST be performed via Drizzle migrations as
	configured in `drizzle-dev.config.ts` and `drizzle-prod.config.ts` and
	executed using the scripts in `scripts/` (such as `migrate.ts` and
	`syncdb.ts`).
- Seed data MUST live under `src/lib/database/data` and be applied via
	scripts like `scripts/seed.ts`; ad-hoc SQL inserts in production or
	test environments are prohibited.
- Direct SQL queries outside the Drizzle context SHOULD be avoided; if
	absolutely necessary, they MUST be justified in the plan and reviewed
	as an exception.

**Rationale**: Centralized schema and data management is critical for
reliability across environments and for safe evolution of the
PostgreSQL database.

### V. Authentication, Security & SMTP

Authentication and outbound email follow a single, controlled path.

Concretely:

- User authentication MUST be implemented using `better-auth` and the
	helpers in `src/lib/auth` (both client and server)
	with the configured plugins (admin, organization, username, email,
	verification email).
- Email delivery MUST use the Nodemailer SMTP configuration under
	`src/lib/smtp`, with all credentials and connection details supplied
	via environment variables loaded (for example) through `dotenv`.
- Secrets (API keys, passwords, tokens) MUST NEVER be committed to the
	repository, including in seed data, fixtures, or tests; they MUST be
	provided via environment variables or secret management.
- Any feature touching authentication, authorization, or email MUST
	document its security considerations in the feature spec and be
	covered by tests where feasible.

**Rationale**: A single, well-governed auth and email path reduces
security risk, surprises in behavior, and configuration drift between
environments.

### VI. Tests & Tooling Aligned With Stack

Testing and tooling MUST reflect and exercise the actual stack in use.

Concretely:

- Non-trivial features (anything beyond copy or minor styling changes)
	MUST include automated tests.
- Logic and data transformations SHOULD be covered by Vitest tests
	(e.g., `npm run test`), and UI flows impacting users SHOULD be
	covered by Playwright scenarios.
- Where database behavior is involved, tests SHOULD use Drizzle-backed
	helpers and, where practical, run against a disposable database
	instance configured similarly to production.
- The CI command `npm run test:ci` MUST remain green before merging to
	main; failing tests are a hard gate.

**Rationale**: Standardizing on Vitest, Playwright, and Drizzle-based
testing makes changes verifiable and supports continuous integration.

## Architecture & Stack Constraints

The project’s core stack is:

- Astro for the application framework and routing.
- PostgreSQL as the primary database.
- Drizzle ORM for schema and migrations.
- `better-auth` for authentication.
- Nodemailer via `src/lib/smtp` for email.

Concretely:

- Introducing an alternative primary framework (for example, replacing
	Astro for the main UI), a different main database, or another core
	authentication system is considered a **MAJOR** constitutional change
	and MUST go through the governance process.
- Shared layout, theme, and typography MUST live in `src/layouts` and
	`src/styles`; any new global styling mechanism MUST be discussed in a
	spec and plan.
- Shared infrastructure concerns (auth, database, SMTP, configuration
	helpers) MUST be placed under `src/lib` rather than scattered across
	feature directories.

## Workflow & Quality Gates

Feature delivery is governed by the Spec-Kit workflow and this
constitution.

Concretely:

- All new feature work MUST start from a feature specification in
  `/specs/[###-feature-name]/spec.md`, created via `/speckit.specify`.
- Implementation planning MUST be captured in
  `/specs/[###-feature-name]/plan.md` via `/speckit.plan`.
- Task breakdown MUST be captured in
  `/specs/[###-feature-name]/tasks.md` via `/speckit.tasks` before large
  implementation efforts.
- The "Constitution Check" section in each `plan.md` MUST explicitly
  answer whether the feature:
  - Respects Core Principles I–VI.
  - Uses the established stack (Astro, Drizzle, better-auth,
    Nodemailer, Vitest, Playwright).
  - Complies with Principle II (Design Tokens & Theming): tokens in
    `src/styles/global.css`, no hard-coded colors, and maintained AA
    contrast in both themes.
  - Introduces any exceptions or risks, which MUST be justified and
    approved.
- `/speckit.analyze` SHOULD be run before complex implementations to
  validate that `spec.md`, `plan.md`, and `tasks.md` align and comply
  with this constitution.
- Pull requests MUST reference the relevant spec and plan in their
  description and state whether the "Constitution Check" has passed or
  list any exception requests.

## Governance

This constitution supersedes informal practices, documentation, and
historic patterns for decisions in scope (stack, architecture, testing,
and workflow).

Amendments MUST:

- Be proposed in a pull request that edits this file.
- Clearly describe the change, motivation, and migration impact.
- Update the version number according to the rules below.
- Update affected templates under `.specify/templates` if they reference
  constitution-driven gates or workflows.

Semantic versioning rules for this constitution:

- **MAJOR**: Backward-incompatible changes to principles or governance
  (for example, changing the primary framework away from Astro,
  replacing Drizzle, or discarding the Spec-Kit workflow).
- **MINOR**: Adding new principles, adding new required sections, or
  materially tightening existing guidance.
- **PATCH**: Clarifications, wording improvements, and typos that do
  not change behavior.

Compliance with this constitution MUST be checked at the "Constitution
Check" step of `/speckit.plan` and during `/speckit.analyze` runs.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): initial
constitution adoption date to be set by maintainer | **Last Amended**:
2025-11-15
