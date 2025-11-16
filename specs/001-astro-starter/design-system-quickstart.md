# Design System Quickstart

**Feature:** 001-astro-starter  
**Last Updated:** 2025-11-16

## Overview

This atomic design system uses a unified token architecture defined in `src/styles/global.css`. All spacing, colors, radius, elevation, and transitions are tokenized to ensure consistency, accessibility, and maintainability across **47 Astro components**.

---

## Token Categories

### 1. Colors (HSL Triple Pattern)

**Usage Pattern:**

```css
--color-*-hsl: H S L;              /* Raw HSL values */
--color-*: hsl(var(--color-*-hsl)); /* Computed token */
```

**Semantic Roles:**

```css
var(--color-background)  /* Page background */
var(--color-text)        /* Body text */
var(--color-surface)     /* Card/panel surfaces */
var(--color-border)      /* Borders and dividers */
var(--color-primary)     /* Primary brand color */
var(--color-secondary)   /* Secondary brand color */
var(--color-accent)      /* Accent highlights */
var(--color-muted)       /* Muted/disabled text */
var(--color-success)     /* Success states */
var(--color-warning)     /* Warning states */
var(--color-info)        /* Info states */
var(--color-error)       /* Error states */
```

**Interactive States:**

```css
var(--color-primary-hover)
var(--color-primary-active)
var(--color-accent-hover)
var(--color-accent-active)
```

**12-Step Neutral Scale:**

```css
var(--color-neutral-0)   /* Pure white (inverted to black in dark) */
var(--color-neutral-1)   /* Near white */
var(--color-neutral-5)   /* Mid gray */
var(--color-neutral-11)  /* Pure black (inverted to white in dark) */
```

**Translucent Overlays (Color-Mix Pattern):**

```css
/* Instead of rgba(0, 0, 0, 0.3), use: */
background: color-mix(in srgb, var(--color-shadow-base) 30%, transparent);

/* Common shadow base: */
var(--color-shadow-base)  /* Theme-aware shadow color */
```

**Example:**
```astro
<style>
  .card {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .card:hover {
    background: var(--color-primary-hover);
  }

  .overlay {
    background: color-mix(in srgb, var(--color-shadow-base) 50%, transparent);
  }
</style>
```

---

### 2. Spacing (8-Point Grid)

**Scale:**
```css
--space-0:  0         /* No spacing */
--space-1:  0.25rem   /* 4px */
--space-2:  0.5rem    /* 8px */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.5rem    /* 24px */
--space-6:  2rem      /* 32px */
--space-7:  2.5rem    /* 40px */
--space-8:  3rem      /* 48px */
--space-9:  3.5rem    /* 56px */
--space-10: 4rem      /* 64px */
```

**Usage Guidelines:**
- Use for `padding`, `margin`, `gap` properties
- Avoid raw `px` or `rem` values
- Prefer smaller increments (space-1 to space-5) for tight layouts
- Use larger increments (space-6 to space-10) for section spacing

**Example:**
```astro
<style>
  .container {
    padding: var(--space-5);        /* 24px */
    margin-bottom: var(--space-10); /* 64px */
    gap: var(--space-3);            /* 12px */
  }

  .button {
    padding: var(--space-3) var(--space-5); /* 12px 24px */
  }
</style>
```

---

### 3. Border Radius

**Scale:**
```css
--radius-0:      0         /* Sharp corners */
--radius-1:      0.125rem  /* 2px */
--radius-2:      0.25rem   /* 4px */
--radius-3:      0.5rem    /* 8px - default */
--radius-4:      0.75rem   /* 12px */
--radius-5:      1rem      /* 16px */
--radius-pill:   9999px    /* Fully rounded */
--radius-circle: 50%       /* Circular */
```

**Usage Guidelines:**
- `--radius-0`: Sharp edges (tables, strict layouts)
- `--radius-2` to `--radius-4`: Standard UI elements (buttons, cards, inputs)
- `--radius-pill`: Fully rounded buttons/badges
- `--radius-circle`: Avatars, icon containers

**Example:**
```astro
<style>
  .card {
    border-radius: var(--radius-3); /* 8px */
  }

  .button {
    border-radius: var(--radius-pill); /* Fully rounded */
  }

  .avatar {
    border-radius: var(--radius-circle); /* Circular */
  }
</style>
```

---

### 4. Elevation (Box Shadows)

**Scale:**
```css
--elevation-e0: none       /* No shadow */
--elevation-e1: ...        /* Subtle (1px depth) */
--elevation-e2: ...        /* Simple (2px depth) - default for images/cards */
--elevation-e3: ...        /* Interactive (4px depth) - hover states */
--elevation-e4: ...        /* Overlay (6px depth) - dropdowns/modals */
--elevation-e5: ...        /* Prominent (8px depth) - dialogs */
```

**Usage Guidelines:**
- `e0`: Flat elements (no depth)
- `e1-e2`: Static content (cards, images)
- `e3`: Interactive elements (buttons, links on hover)
- `e4-e5`: Overlays (dropdowns, modals, popovers)

**Theme-Aware Shadows:**
All elevation tokens use `color-mix(in srgb, var(--color-shadow-base) X%, transparent)`, automatically adapting to light/dark themes.

**Example:**
```astro
<style>
  .card {
    box-shadow: var(--elevation-e2); /* Simple shadow */
  }

  .button:hover {
    box-shadow: var(--elevation-e3); /* Interactive shadow */
  }

  .dropdown {
    box-shadow: var(--elevation-e4); /* Overlay shadow */
  }
</style>
```

---

### 5. Border Widths

**Scale:**
```css
--border-width-0: 0     /* No border */
--border-width-1: 1px
--border-width-2: 2px   /* Default for focus outlines */
--border-width-3: 3px
--border-width-4: 4px
--border-width-5: 5px
```

**Example:**
```astro
<style>
  .card {
    border: var(--border-width-1) solid var(--color-border);
  }

  .input:focus {
    outline: var(--border-width-2) solid var(--color-primary);
  }
</style>
```

---

### 6. Transitions

**Token:**
```css
--transition-speed: 200ms
```

**Usage:**
```astro
<style>
  .element {
    transition: all var(--transition-speed) ease;
  }

  .button {
    transition: background var(--transition-speed) ease,
                transform var(--transition-speed) ease;
  }
</style>
```

---

## Theme Switching

### Mechanism
Themes are controlled via the `data-theme` attribute on the `<html>` element:

```html
<html data-theme="light">  <!-- Default -->
<html data-theme="dark">   <!-- Dark mode -->
```

### How It Works
1. **Light theme (default):** HSL triples defined in `:root`
2. **Dark theme:** HSL triples overridden in `html[data-theme="dark"]`
3. **Computed tokens:** `var(--color-*)` automatically resolve to correct theme values

### Toggle Implementation
```typescript
const toggle = () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};
```

---

## Atomic Design Conventions

### Component Hierarchy
```
atoms/        → Single-purpose primitives (Button, Input, Link, Card, Text)
molecules/    → Composed patterns (Carousel, Gallery, Slider)
organisms/    → Complex sections (Timeline, Form, QueryLoop)
templates/    → Layout structures (Header, Footer)
cards/        → Specialized card variants (PostCard, ValueCard)
navigations/  → Navigation components (NavItem)
```

### Token Scoping Rules
1. **Global tokens ONLY in `global.css`**
2. **Component styles scoped with `<style is:inline>` or `<style scoped>`**
3. **No inline styles with hard-coded values** (use props → tokens)
4. **Presets reference tokens, not literals**

---

## Accessibility Standards

### WCAG AA Compliance
All color pairs meet **4.5:1 contrast ratio** for normal text, **3:1 for large text**.

**Verified Pairs:**
- `background / text` → 14.24:1 ✅
- `surface / text` → 13.31:1 ✅
- `primary / text` → 16.00:1 ✅
- `accent / text` → 8.17:1 ✅

### Focus States
**Standard Pattern:**
```css
element:focus {
  outline: var(--border-width-2) solid var(--color-primary);
  outline-offset: var(--border-width-2);
}
```

**Do NOT use:**
- Hard-coded colors (`#2684ff`, `blue`, etc.)
- Invisible focus states (`outline: none` without replacement)

---

## Best Practices

### ✅ DO
```astro
<style>
  .element {
    padding: var(--space-5);
    border-radius: var(--radius-3);
    background: var(--color-surface);
    box-shadow: var(--elevation-e2);
    transition: all var(--transition-speed) ease;
  }
</style>
```

### ❌ DON'T
```astro
<style>
  .element {
    padding: 1.5rem;           /* Use var(--space-5) */
    border-radius: 8px;        /* Use var(--radius-3) */
    background: #ffffff;       /* Use var(--color-surface) */
    box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Use var(--elevation-e2) */
    transition: all 0.3s ease; /* Use var(--transition-speed) */
  }
</style>
```

---

## Adding New Components

1. **Choose atomic layer:** Atom, molecule, organism, or template?
2. **Use existing tokens:** Reference `global.css` for spacing, colors, radius, elevation
3. **Avoid literals:** No `#hex`, raw `px`, `rgba()`, or hard-coded durations
4. **Test themes:** Verify component in both light and dark modes
5. **Check contrast:** Run `npm run contrast` if introducing new color pairings

---

## Testing Commands

### Contrast Verification
```bash
npm run contrast
```

### Color Literal Scan
```powershell
grep -r "#[0-9a-fA-F]|rgba?\(|hsla?\(" src/components/
```

---


- **Constitution:** `.specify/memory/constitution.md` (Principle II)
- **Full Harmonization Report:** `specs/001-astro-starter/design-system-harmonization-report.md`
- **Component Specs:** `specs/001-astro-starter/spec.md`


## Quick Reference

| Elevation | `--elevation-e*` | `var(--elevation-e2)` |
| Transition | `--transition-speed` | `var(--transition-speed)` |

---
