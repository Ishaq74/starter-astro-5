/**
 * Contrast checker for token pairs ensuring WCAG AA ≥ 4.5:1.
 * Reads src/styles/global.css and validates semantic color pairs.
 * Run: pnpm contrast
 */
import fs from 'fs';
import path from 'path';

const file = path.resolve('src/styles/global.css');
const css = fs.readFileSync(file, 'utf8');

// Extract block content for :root and html[data-theme="dark"]
function getBlock(selector) {
  const start = css.indexOf(selector);
  if (start === -1) return '';
  const open = css.indexOf('{', start);
  if (open === -1) return '';
  let i = open + 1, depth = 1;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(open + 1, i - 1);
}

function parseVars(blockCss) {
  const varRegex = /--([a-z0-9-]+):\s*(\d+\s+\d+%\s+\d+%)/gi;
  const map = {};
  let m;
  while ((m = varRegex.exec(blockCss))) {
    map[m[1]] = m[2];
  }
  return map;
}

// Parse only -hsl variables like --color-background-hsl: 210 10% 98%
function parseHslTriples(blockCss) {
  const varRegex = /--([a-z0-9-]+-hsl):\s*([0-9.]+\s+[0-9.]+%\s+[0-9.]+%)/gi;
  const map = {};
  let m;
  while ((m = varRegex.exec(blockCss))) {
    const name = m[1].replace(/-hsl$/, '');
    map[name] = m[2];
  }
  return map;
}

const sets = [
  { name: 'root', vars: parseHslTriples(getBlock(':root')) },
  { name: 'dark', vars: parseHslTriples(getBlock('html[data-theme="dark"]')) },
].filter(s => Object.keys(s.vars).length > 0);

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}
function luminance([r, g, b]) {
  const toLinear = c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [toLinear(r), toLinear(g), toLinear(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrast(hslA, hslB) {
  const [h1,s1,l1] = hslA.split(/\s+/).map(v=>parseFloat(v));
  const [h2,s2,l2] = hslB.split(/\s+/).map(v=>parseFloat(v));
  const lum1 = luminance(hslToRgb(h1,s1,l1));
  const lum2 = luminance(hslToRgb(h2,s2,l2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  // CRITICAL: Core surfaces must have readable text
  ['color-background', 'color-text'],
  ['color-surface', 'color-text'],
  
  // Feedback colors as backgrounds with appropriate text
  ['color-success', 'color-surface'],    // Success badge: colored bg + light text
  ['color-warning', 'color-text'],       // Warning banner: yellow bg + dark text  
  ['color-info', 'color-surface'],       // Info panel: blue bg + light text
  ['color-error', 'color-surface'],      // Error alert: red bg + light text
  
  // Neutral scale: light backgrounds must support dark text
  ['color-neutral-0', 'color-text'],     // White bg → dark text
  ['color-neutral-1', 'color-text'],     // Near-white → dark text
  ['color-neutral-2', 'color-text'],     // Light gray → dark text
  ['color-neutral-3', 'color-text'],     // Soft gray → dark text
  
  // Neutral scale: dark text colors must be readable on light surfaces
  ['color-surface', 'color-muted'],      // Muted text on surface
  ['color-surface', 'color-neutral-7'],  // Mid-dark text on surface
  ['color-surface', 'color-neutral-10'], // Dark text on surface
  ['color-background', 'color-neutral-10'], // Dark text on background
];

let failures = 0;
for (const set of sets) {
  console.log(`\nTheme: ${set.name}`);
  for (const [bg, fg] of pairs) {
    if (!(set.vars[bg] && set.vars[fg])) {
      console.log(`  ${bg} / ${fg} => SKIPPED (missing HSL triple)`);
      continue;
    }
    const ratio = contrast(set.vars[bg], set.vars[fg]);
    const pass = ratio >= 4.5;
    if (!pass) failures++;
    console.log(`  ${bg} / ${fg} => ${ratio.toFixed(2)} ${pass ? 'PASS' : 'FAIL'}`);
  }
}

if (failures) {
  console.error(`\nContrast check FAILED for ${failures} pair(s) across themes. Adjust tokens in tokens.css.`);
  process.exit(1);
}
console.log('\nAll themes: contrast pairs pass WCAG AA (≥4.5:1).');
