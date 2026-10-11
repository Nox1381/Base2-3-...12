import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
test('the standalone package has a valid executable script with no duplicate global declarations', () => {
  const html = readFileSync(new URL('../play.html', import.meta.url), 'utf8');
  const match = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].at(-1);
  assert.ok(match && match[1].length > 100000,'Bundled code must be present');
  assert.doesNotThrow(() => new vm.Script(match[1], {filename:'play.html inline script'}));
  assert.match(match[1],/createCargoArcade/);
  assert.match(match[1],/ADDITIONAL_MSX_CHALLENGES/);
});
