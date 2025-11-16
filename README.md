# Project Technical Structure

## Packages

- uvx & spec-kit: `uvx --from git+https://github.com/github/spec-kit.git specify init .`

### Framework & UI

- astro: `npm create astro@latest`
- astro font: `npm i astro-font`
- astro icon: `npm install astro-icon`
- iconify mdi, openmoji, circleflags: `npm install @iconify-json/mdi @iconify-json/openmoji @iconify-json/circle-flags`

### Database

- pg and drizzle (with dev and prod config): `npm install pg drizzle-orm drizzle-kit`

### Authentication

- better-auth: `npm install better-auth`
  - Plugins utilisés: admin, organization, username, email, verifemail
- nodemailer: `npm install nodemailer`
- dotenv: `npm install dotenv`

## Dev Dependencies

- @types/pg: `npm install -D @types/pg`
- @types/nodemailer: `npm install -D @types/nodemailer`
- @astrojs/check: `npm install -D @astrojs/check`
- typescript: `npm install -D typescript`
- tsx: `npm install -D tsx`

## Alias and Folder Structures

### @components

Full UI atomic design elements with perfectly homogenized tokens CSS and light dark contrast check.

```md
src/components/
├── atoms/
├── cards/
├── molecules/
├── navigations/
├── organisms/
├── templates/
├── FormattedDate.astro
├── Grid.astro
└── Grid2.astro
```

### @layouts

BaseLayout.astro

```md
src/layouts/
├── BaseLayout.astro
└── StickyImageSection.astro
```

### @styles

global.css

```md
src/styles/
└── global.css
```

### @database

(lib/database)
Drizzle config and folder schema and folder data for seeding.

```md
src/database/
├── data/
├── schema/
└── drizzle.ts
```

### @scripts

Some useful scripts for development.

### @smtp

(lib/smtp) for SMTP config.

```md
src/lib/
└── smtp/
```

## Testing

### Vitest

- **Installation**: `npm create vitest@latest`
- **Scripts**:
  - `npm run test`: Lancer les tests une fois.
  - `npm run test:ci`: Lancer les tests avec vérification de type pour l'intégration continue.

### Playwright

- **Installation**: `npm init playwright@latest`
