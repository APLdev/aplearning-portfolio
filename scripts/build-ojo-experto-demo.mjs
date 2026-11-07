import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Reads the original only. All adaptations are written inside this workspace.
const source = String.raw`D:\Documentos\Gamification\ojo-experto-sst\scorm`;
const paths = ['index.html', 'contenido.js'].map(name => resolve(source, name));
const originals = paths.map(path => readFileSync(path, 'utf8'));
const hashes = originals.map(text => createHash('sha256').update(text).digest('hex'));
const context = { window: {} };
vm.runInNewContext(originals[1], context);
const course = JSON.parse(JSON.stringify(context.window.CURSO));
course.id = 'ojo-experto-sst-demo-oficina-v1';
course.antetitulo = 'APLearning · Demo interactiva de SST';
course.inmersiones = course.inmersiones.slice(0, 1);
assert.equal(course.inmersiones[0].consignas.length, 4);

let html = originals[0];
function replaceOnce(from, to) {
  assert.equal(html.split(from).length - 1, 1, `Expected one match: ${from.slice(0, 90)}`);
  html = html.replace(from, () => to);
}
replaceOnce('<title>Ojo Experto · SST</title>', '<title>Ojo Experto · Demo de Oficina segura | APLearning</title>');
replaceOnce('<script src="contenido.js"></script>', `<script>window.CURSO = ${JSON.stringify(course).replace(/</g, '\\u003c')};</script>`);
replaceOnce('let data = { v:1, d:[], snd:1, nt:0 };', 'let data = { v:1, d:[], snd:1, nt:1 };');
replaceOnce('function finalBlock(){', `function demoContact(){
  return \`<section class="qcard" style="margin-top:18px">
    <p class="qnum">DEMO COMPLETADA</p>
    <h2 style="margin-top:0">Lleva Ojo Experto a tu empresa</h2>
    <p class="lead">Probaste Oficina segura. Consulta por las inmersiones de Almacén y cargas y Emergencias, o conversemos sobre una adaptación a los riesgos y procedimientos de tu organización.</p>
    <div class="row demo-actions">
      <a class="btn primary" href="https://wa.me/51972801063?text=${encodeURIComponent('Hola Adrián, probé la demo de Ojo Experto y quiero consultar por el producto para mi empresa.')}" target="_blank" rel="noopener noreferrer">Consulta por este proyecto ↗</a>
      <button class="btn" data-act="demo-replay">Volver a jugar</button>
    </div>
  </section>\`;
}
function finalBlock(){`);
replaceOnce('CURSO COMPLETADO', 'RECORRIDO DE DEMOSTRACIÓN COMPLETADO');
replaceOnce('${allDone() ? finalBlock() : ""}', '${allDone() ? finalBlock() + demoContact() : ""}');
replaceOnce('<p class="lead">${esc(C.lema)}</p>', '<p class="lead">${esc(C.lema)}</p><p class="lead">Prueba Oficina segura: cuatro consignas, sin límite de tiempo por defecto. Puedes activar el reloj si quieres un reto adicional.</p>');
replaceOnce('No reconocemos «${esc(raw)}». Prueba con otras palabras o con otra respuesta.', 'Aún no reconocemos «${esc(raw)}». Puede ser una respuesta válida que no esté en nuestra lista. Prueba con una frase más breve o con otras palabras.');
replaceOnce('¡Completaste todas las inmersiones! Vuelve al inicio para repasar los hallazgos.', '¡Completaste Oficina segura! Esta es la inmersión incluida en la demo.');
replaceOnce('    <div class="row">\n      ${nextOpen ?', '    ${allDone() ? demoContact() : ""}\n    <div class="row">\n      ${nextOpen ?');
replaceOnce('    case "dive": startDive(i); break;', `    case "demo-replay": {
      stopTimer();
      try { localStorage.removeItem(LS_KEY); } catch(e){}
      data = { v:1, d:C.inmersiones.map(() => ({ r:[], f:0 })), snd:data.snd, nt:data.nt };
      S.celebrated = false;
      save();
      startDive(0);
      break;
    }
    case "dive": startDive(i); break;`);
replaceOnce('</style>', '.demo-actions{flex-wrap:wrap;margin-top:20px}.demo-actions a{display:inline-block;text-decoration:none;white-space:normal}\n</style>');

// Only this self-contained file is intended for sharing; omitted immersions
// are never embedded, fetched or hidden in the browser.
const destination = resolve('deliverables/ojo-experto-demo');
mkdirSync(destination, { recursive: true });
writeFileSync(resolve(destination, 'index.html'), html);
const siteAssets = resolve('public/demo-assets');
mkdirSync(siteAssets, { recursive: true });
const siteHtml = html.replace(/href="https:\/\/wa\.me\/[^"]+" target="_blank"/g, 'href="/?demo=ojo-experto#contacto" target="_top"').replace('Consulta por este proyecto ↗', 'Quiero algo así para mi equipo ↗');
writeFileSync(resolve(siteAssets, 'ojo-experto.html'), siteHtml);
for (const [i, path] of paths.entries()) {
  assert.equal(createHash('sha256').update(readFileSync(path, 'utf8')).digest('hex'), hashes[i], 'Original changed');
}
console.log(`Demo created: ${destination}/index.html. Original files unchanged.`);
