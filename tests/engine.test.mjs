import test from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES, toBase, parseBase, checkAnswer, makeBaseQuestion, makeEngineeringQuestion, makeDeck, eligibleQuestions } from '../docs/engine.js';
import { QUESTIONS, SOURCES } from '../docs/question-bank.js';
import { generalSegregation, class1Compatibility, GENERAL_MATRIX, COMPATIBILITY_GROUPS, makeCargoQuestion } from '../docs/cargo.js';
import { CHALLENGES, normalizeOutput } from '../docs/challenges.js';
import { spawnSync } from 'node:child_process';

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
  assert.deepEqual([...new Set(deck.map(q => q.category))].sort(), Object.keys(CATEGORIES).sort());
  assert.equal(new Set(deck.map(q => q.id)).size, 20);
  for (const q of deck) assert.equal(checkAnswer(q, q.type === 'choice' ? q.correctIndex : String(q.value === undefined ? q.answer : q.type === 'base' ? q.answer : q.value)), true);
});

test('IMDG lookup transcription is symmetric and key pairings match the official tables', () => {
  assert.equal(GENERAL_MATRIX.length, 17);
  for (let i = 0; i < 17; i++) {
    assert.equal(GENERAL_MATRIX[i].length, 17);
    for (let j = 0; j < 17; j++) assert.equal(GENERAL_MATRIX[i][j], GENERAL_MATRIX[j][i], `${i},${j}`);
  }
  assert.equal(generalSegregation('3', '5.1'), '2');
  assert.equal(generalSegregation('1.1', '3'), '4');
  assert.equal(generalSegregation('3', '9'), 'X');
  assert.equal(generalSegregation('1.1', '1.2'), '*');
  assert.deepEqual(class1Compatibility('B', 'D'), { status: 'forbidden', note: null });
  assert.deepEqual(class1Compatibility('D', 'D'), { status: 'permitted', note: 0 });
  assert.deepEqual(class1Compatibility('L', 'L'), { status: 'conditional', note: 2 });
  assert.deepEqual(class1Compatibility('N', 'N'), { status: 'conditional', note: 3 });
  assert.deepEqual(class1Compatibility('G', 'D'), { status: 'conditional', note: 1 });
  assert.equal(class1Compatibility('', 'D').status, 'unknown');
  for (const a of COMPATIBILITY_GROUPS) for (const b of COMPATIBILITY_GROUPS) assert.deepEqual(class1Compatibility(a, b), class1Compatibility(b, a));
});

test('all categories generate valid rounds; cargo focus and full explosive labels are preserved', () => {
  for (const category of Object.keys(CATEGORIES)) {
    const deck = makeDeck({ ...settings, category, cargoFocus: 'segregation' }, 10, seeded());
    assert.ok(deck.every(q => q.category === category));
    for (const q of deck) assert.equal(checkAnswer(q, q.type === 'choice' ? q.correctIndex : q.answer), true);
  }
  for (const focus of ['segregation', 'general', 'class1', 'all']) {
    const deck = makeDeck({...settings, category:'cargo', cargoFocus:focus}, 20, seeded());
    assert.ok(deck.every(q => q.source === 'imdg' && q.reference));
    if (['general','class1'].includes(focus)) assert.ok(deck.every(q => q.focus === focus));
  }
  const example = makeCargoQuestion({...settings, cargoFocus:'class1'}, () => 0);
  assert.match(example.prompt, /1\.1B and 1\.2D/);
  assert.match(example.options[0], /Not permitted/);
  assert.match(example.explanation, /separated from/);
});

test('Python output questions and coding solutions execute as described', () => {
  const examples = QUESTIONS.filter(q => q.category === 'python' && q.sampleOutput !== undefined).map(q => ({code:q.code, expected:q.sampleOutput, id:q.id}));
  examples.push(...CHALLENGES.python.map(q => ({code:q.solution, expected:q.expected, id:q.id})));
  for (const example of examples) {
    const run = spawnSync('python3', ['-c', example.code], {encoding:'utf8', timeout:3000});
    assert.equal(run.status, 0, example.id + ': ' + run.stderr);
    assert.equal(normalizeOutput(run.stdout), normalizeOutput(example.expected), example.id);
  }
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
