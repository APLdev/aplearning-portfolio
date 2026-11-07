import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

// Reuse the actual character and hoist from the independent public demo.
// This script never opens or modifies the original course.
const game = readFileSync('public/demo-assets/ojo-experto.html', 'utf8');
const character = game.match(/<svg viewBox="0 0 24 30" shape-rendering="crispEdges">([\s\S]*?)<\/svg>/)?.[1];
const hoist = game.match(/<svg class="headframe"[^>]*>([\s\S]*?)<\/svg>/)?.[1];
assert(character && hoist, 'Expected original character and hoist artwork');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <title>Ojo Experto: el inspector desciende para ampliar su mirada</title>
  <defs>
    <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#111b30"/><stop offset=".55" stop-color="#45405a"/><stop offset="1" stop-color="#d98b4e"/></linearGradient>
    <linearGradient id="earth" x2="0" y2="1"><stop stop-color="#5c4330"/><stop offset=".6" stop-color="#2a2330"/><stop offset="1" stop-color="#101723"/></linearGradient>
    <linearGradient id="shade"><stop stop-color="#101723"/><stop offset=".48" stop-color="#101723"/><stop offset=".75" stop-color="#101723" stop-opacity=".28"/><stop offset="1" stop-color="#101723" stop-opacity="0"/></linearGradient>
    <radialGradient id="beam" cx=".5" cy="0" r=".8"><stop stop-color="#ffecaa" stop-opacity=".32"/><stop offset="1" stop-color="#ffecaa" stop-opacity="0"/></radialGradient>
    <pattern id="stripes" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="28" fill="#ffc72c"/><rect x="14" width="14" height="28" fill="#101723"/></pattern>
    <pattern id="earth-lines" width="70" height="54" patternUnits="userSpaceOnUse"><path d="M0 52h70" stroke="#06080c" stroke-opacity=".2" stroke-width="3"/><circle cx="18" cy="22" r="2" fill="#fff" fill-opacity=".05"/></pattern>
  </defs>
  <path fill="#101723" d="M0 0h1280v720H0z"/>
  <path fill="url(#sky)" d="M580 0h700v324H580z"/>
  <circle cx="812" cy="217" r="37" fill="#ffcf7a" opacity=".85"/>
  <path fill="#1a2234" d="M580 320V255h55v-55h45v55h32v-78h52v78h22v-36h49v101h32V206h27v-30h14v30h46v114h75v-70h70v-40h20v40h60v70h30v-86h24v-65h18v65h34v86h40v-65h30v65z"/>
  <rect x="580" y="320" width="700" height="400" fill="url(#earth)"/>
  <rect x="580" y="320" width="700" height="400" fill="url(#earth-lines)"/>
  <path d="M580 320h700" stroke="#6c717c" stroke-width="12"/>
  <path d="M912 328v392h240V328" fill="#07090e" stroke="#4b3522" stroke-width="10"/>
  <path d="M920 430h224M920 535h224M920 640h224" stroke="#5b4127" stroke-width="10"/>
  <rect x="830" y="308" width="78" height="13" fill="url(#stripes)"/>
  <rect x="1156" y="308" width="100" height="13" fill="url(#stripes)"/>
  <g transform="translate(913 110) scale(1.4)" fill="none" stroke="#3a465c" stroke-width="6" stroke-linecap="square">${hoist}</g>
  <path d="M1032 143v233" stroke="#c9d1dc" stroke-width="3" opacity=".8"/>
  <ellipse cx="1032" cy="617" rx="130" ry="150" fill="url(#beam)"/>
  <g transform="translate(936 376) scale(8)" shape-rendering="crispEdges">${character}</g>
  <path fill="url(#shade)" d="M0 0h1280v720H0z"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <rect x="64" y="82" width="8" height="24" rx="2" fill="#ffc72c"/>
    <text x="90" y="101" fill="#c4cdd9" font-size="20" font-weight="700" letter-spacing="3">OFICINA SEGURA</text>
    <text x="60" y="273" fill="#ffc72c" font-size="116" font-weight="900" letter-spacing="2">OJO</text>
    <text x="60" y="375" fill="#ffc72c" font-size="100" font-weight="900" letter-spacing="1">EXPERTO</text>
    <text x="66" y="440" fill="#e9eef7" font-size="30">Mira más allá de lo evidente.</text>
    <path d="M66 490h64" stroke="#ffc72c" stroke-width="4"/>
    <text x="66" y="543" fill="#a8b6c9" font-size="21">Responde. Descubre. Profundiza.</text>
    <rect x="64" y="603" width="260" height="47" rx="23" fill="#ffc72c" fill-opacity=".1" stroke="#ffc72c" stroke-opacity=".35"/>
    <text x="194" y="633" fill="#ffc72c" font-size="17" font-weight="700" letter-spacing="2" text-anchor="middle">DEMO INTERACTIVA</text>
  </g>
  <path d="M0 708h1280v12H0z" fill="url(#stripes)"/>
</svg>`;
mkdirSync('public/demo-assets', { recursive: true });
writeFileSync('public/demo-assets/ojo-experto-cover.svg', svg);
console.log('Created cover using the real demo character and hoist.');
