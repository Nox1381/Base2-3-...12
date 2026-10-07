import test from 'node:test';
import assert from 'node:assert/strict';
import { toBase, parseBase, checkAnswer, makeBaseQuestion, makeEngineeringQuestion, makeDeck, eligibleQuestions } from '../docs/engine.js';
import { QUESTIONS, SOURCES } from '../docs/question-bank.js';

const settings = { category: 'bases', difficulty: '3', base: 'any', baseMode: 'mixed', fireScope: 'all' };
function seeded(seed = 42) { return () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2 ** 32; }; }

test('number-base boundaries, leading zeroes, and invalid digits', () => {
  assert.equal(toBase(11, 12), 'B'); assert.equal(toBase(12, 12), '10');
  assert.equal(toBase(121, 11), '100'); assert.equal(toBase(255, 2), '11111111');
  assert.equal(parseBase('0b1010', 2), 10); assert.equal(parseBase('00ab', 12), 131);
  assert.equal(parseBase('102', 2), null); assert.equal(parseBase('B', 11), null);
  assert.equal(parseBase('12abc', 10), null); assert.equal(parseBase('', 2), null);
  for (let base = 2; base <= 12; base++) for (const n of [0, 1, base - 1, base, base ** 2, 4095]) assert.equal(parseBase(toBase(n, base), base), n);
});

test('counting crosses base boundaries correctly', () => {
  // A fixed RNG makes starter base-2 sequence 1, 10, 11 -> 100.
  const q = makeBaseQuestion({ ...settings, difficulty: '1', base: '2', baseMode: 'count' }, () => 1 / 31);
  assert.equal(q.value, 4); assert.equal(q.answer, '100');
  assert.equal(checkAnswer(q, '0100'), true); assert.equal(checkAnswer(q, '4'), false);
  const rng = seeded();
  for (let base = 2; base <= 12; base++) for (const mode of ['count', 'convert', 'arithmetic']) {
    const generated = makeBaseQuestion({ ...settings, base: String(base), baseMode: mode }, rng);
    assert.equal(checkAnswer(generated, generated.answer), true);
  }
});

test('practical calculations: LED resistance, rounding, and bad input', () => {
  const led = makeEngineeringQuestion('electronics', 1, () => 0);
  assert.equal(led.unit, 'Ω'); assert.equal(led.value, 600);
  assert.equal(checkAnswer(led, '600'), true); assert.equal(checkAnswer(led, '611'), true);
  assert.equal(checkAnswer(led, '660'), false); assert.equal(checkAnswer(led, '600ohms'), false);
  const current = makeEngineeringQuestion('electrical', 1, () => 0);
  assert.equal(current.value, 1); assert.equal(current.unit, 'A');
  assert.equal(checkAnswer(current, '1,0'), true); assert.equal(checkAnswer(current, ''), false);
});

test('mixed rounds include every topic and avoid question duplicates', () => {
  const deck = makeDeck({ ...settings, category: 'mixed' }, 20, seeded());
  assert.equal(deck.length, 20);
  assert.deepEqual([...new Set(deck.map(q => q.category))].sort(), ['bases', 'electrical', 'electronics', 'fire']);
  assert.equal(new Set(deck.map(q => q.id)).size, 20);
  for (const q of deck) assert.equal(checkAnswer(q, q.type === 'choice' ? q.correctIndex : String(q.value === undefined ? q.answer : q.type === 'base' ? q.answer : q.value)), true);
});

test('fire question scopes, answer uniqueness, and source labels', () => {
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, QUESTIONS.length);
  for (const q of QUESTIONS) {
    assert.equal(new Set(q.options).size, 4);
    if (q.category === 'fire') { assert.ok(q.jurisdiction); assert.ok(SOURCES[q.source]); }
  }
  const us = eligibleQuestions('fire', { ...settings, fireScope: 'us' });
  const uk = eligibleQuestions('fire', { ...settings, fireScope: 'uk' });
  assert.ok(us.length > 8 && uk.length > 5);
  assert.ok(us.every(q => q.jurisdiction.startsWith('US')));
  assert.ok(uk.every(q => q.jurisdiction.startsWith('UK')));
  const deck = makeDeck({ ...settings, category: 'fire' }, 20, seeded());
  assert.equal(new Set(deck.map(q => q.id)).size, 20);
});
