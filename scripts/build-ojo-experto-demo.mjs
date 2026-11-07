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
// Editorial adaptations apply only to the commercial demo.
const labels = { comun: 'Otra perspectiva', agudo: 'Mirada ampliada', experto: 'Detalle por explorar', inspector: 'Perspectiva adicional' };
for (const [key, nombre] of Object.entries(labels)) course.niveles[key].nombre = nombre;
for (const band of course.bandas) {
  for (const [old, label] of Object.entries({ 'Buen ojo': labels.comun, 'Ojo agudo': labels.agudo, 'Ojo experto': labels.experto, 'Ojo de inspector': labels.inspector })) band.txt = band.txt.replace(old, label);
}
const prompts = course.inmersiones[0].consignas;
prompts[0].q = 'Menciona una condición o situación que pueda afectar la seguridad o el bienestar en una oficina.';
prompts[0].malas[0].msg = 'Describe qué condición del objeto o de su uso podría causar daño.';
prompts[2].hallazgo.txt = 'La actividad también invita a reconocer señales de cansancio mental, como releer una misma línea o perder la concentración.';

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
    <p class="lead">¿Cómo se vería con los escenarios de tu equipo? Conversemos sobre una versión adaptada a tu organización.</p>
    <div class="row demo-actions">
      <a class="btn primary" href="https://wa.me/51972801063?text=${encodeURIComponent('Hola Adrián, probé la demo de Ojo Experto y quiero consultar por el producto para mi empresa.')}" target="_blank" rel="noopener noreferrer">Consulta por este proyecto ↗</a>
      <button class="btn" data-act="demo-replay">Volver a jugar</button>
    </div>
  </section>\`;
}
function finalBlock(){`);
replaceOnce('CURSO COMPLETADO', 'DEMO COMPLETADA');
replaceOnce('${allDone() ? finalBlock() : ""}', '${allDone() ? finalBlock() + demoContact() : ""}');
replaceOnce('<p class="lead">${esc(C.lema)}</p>', '<p class="lead">${esc(C.lema)}</p><p class="lead">Demo interactiva de APLearning. Explora una muestra sobre seguridad en oficinas. Podemos adaptar el tema, los escenarios y la identidad visual a tu organización.</p><p class="lead">Prueba Oficina segura: cuatro consignas, sin límite de tiempo por defecto. Puedes activar el reloj si quieres un reto adicional.</p>');
replaceOnce('No reconocemos «${esc(raw)}». Prueba con otras palabras o con otra respuesta.', 'Esta demo no pudo relacionar tu respuesta con las opciones previstas. Prueba con una expresión más breve o con otras palabras.');
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
replaceOnce('Responde con tus palabras${data.nt ? "" : ` en <b>${C.segundos} segundos</b>`}.', 'Escribe una respuesta breve por reto. La demo reconoce un conjunto de respuestas previstas y algunas variantes.${data.nt ? "" : ` Tienes <b>${C.segundos} segundos</b> por reto.`}');
const pointsDetail = 'Los metros son puntos del juego: las categorías están definidas en el contenido, no calculadas con respuestas de participantes. La puntuación no mide la gravedad del peligro ni certifica competencia en SST. Una respuesta con menos metros puede referirse a un peligro grave.';
assert.equal(html.split(pointsDetail).length - 1, 2);
html = html.replaceAll(pointsDetail, 'Los metros representan puntos del juego, no la gravedad de los peligros ni una evaluación de competencia en SST.');
replaceOnce('Los valores de cada categoría son reglas de esta actividad para incentivar la exploración de distintas perspectivas.', 'Los valores de cada categoría son reglas de esta actividad para incentivar la exploración de distintas perspectivas. Las categorías están definidas en el contenido, no calculadas con respuestas de participantes. Una respuesta con menos metros puede referirse a un peligro grave.');
replaceOnce('Respuesta no reconocida. Intenta con otras palabras.', 'Esta demo no pudo relacionar tu respuesta con las opciones previstas. Prueba con una expresión más breve o con otras palabras.');
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
