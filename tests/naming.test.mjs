import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_QUESTIONS } from '../docs/naming-questions.js';
import { makeNamingGeneratedQuestion } from '../docs/naming-generated.js';
import { CATEGORIES, CATEGORY_GROUPS, eligibleQuestions, makeDeck, checkAnswer } from '../docs/engine.js';
import { SOURCES, QUESTIONS } from '../docs/question-bank.js';

const focuses=['types','stems','labels','forms','claims'];
const rng=seed=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};

test('all pharmaceutical questions match label-reading focus, not obsolete chemical worksheets',()=>{
 assert.equal(Object.keys(CATEGORIES).length,13);
 assert.equal(CATEGORIES.naming.group,'science');
 assert.ok(CATEGORY_GROUPS.science);
 assert.ok(NAMING_QUESTIONS.length>=185,'expected a fully rebuilt bank');
 assert.ok(QUESTIONS.includes(NAMING_QUESTIONS[0]));
 assert.equal(new Set(NAMING_QUESTIONS.map(q=>q.id)).size,NAMING_QUESTIONS.length);
 for(const q of NAMING_QUESTIONS){
  assert.equal(q.category,'naming',q.id);
  assert.ok(focuses.includes(q.focus),q.id);
  assert.ok([1,2,3].includes(q.level),q.id);
  assert.equal(q.options.length,4,q.id);
  assert.equal(new Set(q.options).size,4,q.id);
  assert.ok(q.prompt&&q.explanation?.length>=35,q.id);
  assert.ok(SOURCES[q.source]?.url?.startsWith('https://'),q.id);
  assert.ok(!/count the carbon|carbon-chain parent|but-1-ene|systematic name of the structure/i.test(q.prompt),q.id);
 }
});
test('real names, recognized stems, strength units and claims are represented',()=>{
 const find=term=>NAMING_QUESTIONS.some(q=>q.prompt.toLowerCase().includes(term.toLowerCase()));
 for(const term of ['-pril','-sartan','-vastatin','-olol','-prazole','-cillin','-vir','-gliflozin','N-(4-hydroxyphenyl)acetamide','Panadol','Lipitor','Cozaar','250 mg per 5 mL','hydrochloride','100% safe'])assert.ok(find(term),'missing '+term);
});
test('all five naming focuses offer workable nonrepeating rounds at every level',()=>{
 for(const focus of ['all',...focuses])for(const difficulty of ['1','2','3']){
  const settings={category:'naming',difficulty,namingFocus:focus};
  const eligible=eligibleQuestions('naming',settings);
  assert.ok(eligible.length>=5,focus+difficulty);
  assert.ok(eligible.every(q=>q.level<=Number(difficulty) && (focus==='all'||q.focus===focus)));
  const deck=makeDeck(settings,20,rng(617+focuses.indexOf(focus)*31+Number(difficulty)));
  assert.equal(deck.length,20,focus+difficulty);
  assert.equal(new Set(deck.map(q=>q.id)).size,20,focus+difficulty);
  assert.ok(deck.every(q=>q.category==='naming' && q.level<=Number(difficulty) && (focus==='all'||q.focus===focus)),focus+difficulty);
  assert.ok(deck.every(q=>checkAnswer(q,q.correctIndex)),focus+difficulty);
 }
});
test('random naming questions never revive old chemistry-worksheet topics',()=>{
 for(const focus of focuses)for(const difficulty of ['1','2','3']){
  const rand=rng(921+focuses.indexOf(focus)*19+Number(difficulty));
  const ids=new Set();
  for(let i=0;i<40;i++){
   const q=makeNamingGeneratedQuestion({namingFocus:focus,difficulty},rand);
   assert.equal(q.category,'naming');
   assert.equal(q.focus,focus);
   assert.ok(q.level<=Number(difficulty));
   assert.equal(new Set(q.options).size,4);
   assert.ok(!ids.has(q.id));ids.add(q.id);
   assert.ok(SOURCES[q.source]);
  }
 }
});
test('mixed practice still samples every quiz subject',()=>{
 const settings={category:'mixed',difficulty:'3',namingFocus:'labels',cargoFocus:'segregation',fireScope:'all',base:'any',baseMode:'mixed'};
 const deck=makeDeck(settings,20,rng(247));
 assert.equal(deck.length,20);
 assert.deepEqual([...new Set(deck.map(q=>q.category))].sort(),Object.keys(CATEGORIES).sort());
 assert.equal(new Set(deck.map(q=>q.id)).size,20);
});
