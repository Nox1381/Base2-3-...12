import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const stripModule = source => source.replace(/^import .*;\s*$/gm, '').replace(/^export /gm, '');
const [html, css, bank, engine, app] = await Promise.all(['docs/index.html', 'docs/styles.css', 'docs/question-bank.js', 'docs/engine.js', 'docs/app.js'].map(read));
const combined = `<script type="module">\n${[bank, engine, app].map(stripModule).join('\n')}\n</script>`;
const standalone = html.replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${css}\n</style>`).replace('  <script type="module" src="./app.js"></script>', '').replace('</body>', combined + '\n</body>').replace('href="./" aria-label="Radix home"', 'href="#" aria-label="Radix home"');
await writeFile(path.join(root, 'play.html'), standalone);
console.log(`Standalone game written (${standalone.length} characters).`);
