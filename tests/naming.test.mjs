import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_QUESTIONS } from '../docs/naming-questions.js';
import { makeNamingGeneratedQuestion } from '../docs/naming-generated.js';
import { CATEGORIES, CATEGORY_GROUPS, eligibleQuestions, makeDeck, checkAnswer } from '../docs/engine.js';
import { SOURCES, QUESTIONS } from '../docs/question-bank.js';

const focuses = ['chains','groups','positions','complex','stems'];
function rng(seed){ return ()=>{ seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296; }; }

test('chemical nomenclature replaced the old regulation/process quiz',()=>{
 assert.equal(Object.keys(CATEGORIES).length,13);
 assert.equal(CATEGORIES.naming.group,'science');
 assert.ok(CATEGORY_GROUPS.science);
 assert.ok(NAMING_QUESTIONS.length>=180);
 assert.ok(QUESTIONS.includes(NAMING_QUESTIONS[0]));
 assert.equal(new Set(NAMING_QUESTIONS.map(q=>q.id)).size,NAMING_QUESTIONS.length);
 for(const q of NAMING_QUESTIONS){
  assert.equal(q.category,'naming');
  assert.ok(focuses.includes(q.focus),q.id);
  assert.ok([1,2,3].includes(q.level),q.id);
  assert.equal(q.options.length,4,q.id);
  assert.equal(new Set(q.options).size,4,q.id);
  assert.ok(q.explanation.length>=40,q.id);
  assert.ok(SOURCES[q.source]?.url?.startsWith('https://'),q.id);
  assert.ok(!/trademark|proprietary-name review|regulatory approval|FDA|EMA|brand screening/i.test(q.prompt),q.id);
 }
});
test('correct structures have the expected systematic names',()=>{
 for(const [structure,name] of [
  ['CH₃CH(OH)CH₃','propan-2-ol'],
  ['CH₃CH(CH₃)CH₂CH₃','2-methylbutane'],
  ['CH₃C(=O)OCH₃','methyl ethanoate'],
  ['HOCH₂COOH','2-hydroxyethanoic acid'],
  ['CH₃COCH₂COOH','3-oxobutanoic acid'],
  ['CH₃CH₂C(=O)NH₂','propanamide']
 ]){
  const q=NAMING_QUESTIONS.find(x=>x.prompt.endsWith(structure));
  assert.ok(q,'Missing structure '+structure);
  assert.equal(q.options[0],name,structure);
 }
});
test('all chemical and stem topics support 20 question rounds at every difficulty',()=>{
 for(const focus of ['all',...focuses])for(const difficulty of ['1','2','3']){
  const settings={category:'naming',difficulty,namingFocus:focus};
  const pool=eligibleQuestions('naming',settings);
  assert.ok(pool.length>=5,focus+difficulty);
  assert.ok(pool.every(q=>q.level<=Number(difficulty)),focus+difficulty);
  assert.ok(pool.every(q=>focus==='all'||q.focus===focus),focus+difficulty);
  const deck=makeDeck(settings,20,rng(311+focuses.indexOf(focus)*13+Number(difficulty)));
  assert.equal(deck.length,20);
  assert.equal(new Set(deck.map(q=>q.id)).size,20,focus+difficulty);
  assert.ok(deck.every(q=>q.category==='naming' && q.level<=Number(difficulty) && (focus==='all'||q.focus===focus)));
  assert.ok(deck.every(q=>checkAnswer(q,q.correctIndex)));
 }
});
test('generated structure naming choices are distinct and sourced',()=>{
 for(const focus of focuses)for(const difficulty of ['1','2','3']){
  const random=rng(919+focuses.indexOf(focus)*37+Number(difficulty));
  const ids=new Set();
  for(let i=0;i<70;i++){
   const q=makeNamingGeneratedQuestion({namingFocus:focus,difficulty},random);
   assert.equal(q.category,'naming');
   assert.equal(q.focus,focus);
   assert.ok(q.level<=Number(difficulty));
   assert.equal(q.options.length,4);
   assert.equal(new Set(q.options).size,4,q.prompt);
   assert.ok(!ids.has(q.id),q.id);
   ids.add(q.id);
   assert.ok(q.prompt&&q.explanation&&q.jurisdiction&&SOURCES[q.source]);
  }
 }
});
test('mixed rounds still include all 13 topics',()=>{
 const settings={category:'mixed',difficulty:'3',namingFocus:'stems',cargoFocus:'segregation',fireScope:'all',base:'any',baseMode:'mixed'};
 const deck=makeDeck(settings,20,rng(247));
 assert.equal(deck.length,20);
 assert.deepEqual([...new Set(deck.map(q=>q.category))].sort(),Object.keys(CATEGORIES).sort());
 assert.equal(new Set(deck.map(q=>q.id)).size,20);
});
