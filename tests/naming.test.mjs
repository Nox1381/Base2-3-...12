import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_QUESTIONS } from '../docs/naming-questions.js';
import { makeNamingGeneratedQuestion } from '../docs/naming-generated.js';
import { CATEGORIES, CATEGORY_GROUPS, eligibleQuestions, makeDeck, checkAnswer } from '../docs/engine.js';
import { SOURCES, QUESTIONS } from '../docs/question-bank.js';

function rng(seed) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
const focuses = ['systems', 'inn', 'brand', 'bio', 'rules'];

test('pharmaceutical naming is the thirteenth selectable, source-grounded category', () => {
  assert.equal(Object.keys(CATEGORIES).length, 13);
  assert.ok(CATEGORY_GROUPS.science);
  assert.equal(CATEGORIES.naming.group, 'science');
  assert.ok(NAMING_QUESTIONS.length >= 85);
  assert.ok(QUESTIONS.includes(NAMING_QUESTIONS[0]));
  assert.equal(new Set(NAMING_QUESTIONS.map(q => q.id)).size, NAMING_QUESTIONS.length);
  for (const q of NAMING_QUESTIONS) {
    assert.equal(q.category, 'naming', q.id);
    assert.ok(focuses.includes(q.focus), q.id);
    assert.ok([1,2,3].includes(q.level), q.id);
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options).size, 4, q.id);
    assert.ok(q.explanation.length >= 45, q.id);
    assert.ok(q.jurisdiction, q.id);
    assert.ok(SOURCES[q.source]?.url?.startsWith('https://'), q.id);
    assert.ok(!/\b(?:paracetamol|amoxicillin|atorvastatin|ibuprofen|panadol)\b/i.test(q.prompt), q.id);
  }
});

test('all naming focuses produce complete nonrepeating rounds at all difficulty levels', () => {
  for (const focus of ['all', ...focuses]) {
    for (const difficulty of ['1', '2', '3']) {
      const settings = {category: 'naming', difficulty, namingFocus: focus, length: '20'};
      const pool = eligibleQuestions('naming', settings);
      assert.ok(pool.length >= 3, focus + difficulty);
      assert.ok(pool.every(q => Number(q.level) <= Number(difficulty)), focus + difficulty);
      assert.ok(pool.every(q => focus === 'all' || q.focus === focus), focus + difficulty);
      const deck = makeDeck(settings, 20, rng(113 + Number(difficulty) * 31 + focuses.indexOf(focus) * 17));
      assert.equal(deck.length, 20, focus + difficulty);
      assert.equal(new Set(deck.map(q => q.id)).size, deck.length, focus + difficulty);
      assert.ok(deck.every(q => q.category === 'naming' && q.level <= Number(difficulty)), focus + difficulty);
      assert.ok(deck.every(q => focus === 'all' || q.focus === focus), focus + difficulty);
      assert.ok(deck.every(q => checkAnswer(q, q.correctIndex)), focus + difficulty);
    }
  }
});
test('procedural naming exercises stay fictional and answerable', () => {
  for (const focus of focuses) for (const difficulty of ['1', '2','3']) {
    const rnd = rng(13 + focuses.indexOf(focus) * 27 + Number(difficulty));
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      const q = makeNamingGeneratedQuestion({namingFocus: focus,difficulty}, rnd);
      assert.equal(q.category, 'naming');
      assert.equal(q.focus, focus);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.id && !ids.has(q.id));
      ids.add(q.id);
      assert.ok(q.prompt && q.explanation && q.jurisdiction && SOURCES[q.source]);
    }
  }
});
test('mixed-topic rounds include the new category while retaining all 13 subjects', () => {
  const settings = { category: 'mixed', difficulty: '3', namingFocus: 'brand', cargoFocus: 'segregation', fireScope: 'all', base: 'any', baseMode: 'mixed' };
  const deck = makeDeck(settings, 20, rng(247));
  assert.equal(deck.length, 20);
  assert.deepEqual([...new Set(deck.map(q => q.category))].sort(), Object.keys(CATEGORIES).sort());
  assert.equal(new Set(deck.map(q => q.id)).size, deck.length);
});
