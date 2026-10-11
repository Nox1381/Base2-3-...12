import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const stripModule = source => source.replace(/^import .*;\s*$/gm, '').replace(/^export /gm, '');
const files = ['docs/index.html', 'docs/styles.css', 'docs/extra-questions.js', 'docs/cargo.js', 'docs/cargo-games-engine.js', 'docs/question-bank.js', 'docs/msx-questions.js', 'docs/engine.js', 'docs/msx-challenges.js', 'docs/challenges.js', 'docs/coding.js', 'docs/cargo-games.js', 'docs/app.js'];
const originals = await Promise.all(files.map(read));
const sources = originals.map(source => source.replace(/(\.\/[\w.-]+\.(?:js|css))\?v=[\w.-]+/g, '$1'));
const assetVersion = createHash('sha256').update(sources.join('\n')).digest('hex').slice(0, 12);
for (let i = 0; i < files.length; i++) {
  const versioned = sources[i].replace(/(\.\/[\w.-]+\.(?:js|css))(?=['"])/g, `$1?v=${assetVersion}`);
  if (versioned !== originals[i]) await writeFile(path.join(root, files[i]), versioned);
}
const [html, css, ...modules] = sources;
const combined = `<script type="module">\n${modules.map(stripModule).join('\n')}\n</script>`;
// Function replacements preserve literal $ characters in MSX string variables.
const standalone = html.replace('<link rel="stylesheet" href="./styles.css">', () => `<style>\n${css}\n</style>`).replace('  <script type="module" src="./app.js"></script>', '').replace('</body>', () => combined + '\n</body>').replace('href="./" aria-label="Radix home"', 'href="#" aria-label="Radix home"');
await writeFile(path.join(root, 'play.html'), standalone);
console.log(`Standalone game written (${standalone.length} characters); asset version ${assetVersion}.`);
