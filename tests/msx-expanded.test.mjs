import test from 'node:test';
import assert from 'node:assert/strict';
import { MSX_QUESTIONS, makeMsxGeneratedQuestion } from '../docs/msx-questions.js';
import { CHALLENGES } from '../docs/challenges.js';
import { eligibleQuestions, makeDeck, checkAnswer } from '../docs/engine.js';

function rng(seed) { return () => { seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296; }; }
test('starter, standard and advanced have distinct deep MSX question pools',()=>{
  assert.ok(MSX_QUESTIONS.length>=50);
  assert.equal(new Set(MSX_QUESTIONS.map(q=>q.id)).size,MSX_QUESTIONS.length);
  for(const q of MSX_QUESTIONS){
    assert.ok([1,2,3].includes(q.level));
    assert.equal(new Set(q.options).size,4,q.id);
    assert.ok(q.code.startsWith('10 '),q.id);
    assert.ok(q.explanation && q.source==='msx');
  }
  for(const level of [1,2,3]){
    const pool=eligibleQuestions('msx',{category:'msx',difficulty:String(level)});
    assert.ok(pool.length>=15);
    const deck=makeDeck({category:'msx',difficulty:String(level)},20,rng(level*31));
    assert.equal(new Set(deck.map(q=>q.id)).size,20);
    assert.ok(deck.every(q=>q.level<=level));
    assert.ok(deck.every(q=>checkAnswer(q,q.correctIndex)));
  }
});
test('generated MSX questions vary and always have four different options',()=>{
  for(const level of [1,2,3]){
    const ids=new Set();
    const random=rng(level*71);
    for(let i=0;i<120;i++){
      const q=makeMsxGeneratedQuestion({difficulty:String(level)},random);
      assert.ok(q.level<=level);
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options).size,4,q.id);
      assert.ok(q.explanation && q.code);
      ids.add(q.id);
    }
    assert.ok(ids.size>=25,'generator must vary ' + level);
  }
});
test('MSX coding has 3 actual difficulty tiers and runnable numbered lines',()=>{
  assert.ok(CHALLENGES.msx.length>=30);
  for(const level of [1,2,3]){
    const tier=CHALLENGES.msx.filter(x=>(x.level||1)===level);
    assert.ok(tier.length>=8,'MSX tier ' +level);
    for(const c of tier){
      assert.ok(c.starter && c.solution && c.expected && c.hint,c.id);
      assert.ok(c.solution.split('\n').every(line=>/^\d+\s/.test(line)),c.id);
      assert.ok(c.solution.length<4000,c.id);
    }
  }
  assert.equal(new Set(CHALLENGES.msx.map(x=>x.id)).size,CHALLENGES.msx.length);
});
