import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_STUDY_LESSONS as lessons, NAMING_STUDY_SOURCES as sources } from '../docs/naming-study-data.js';
import { normalizeNamingProgress, readNamingStudyProgress } from '../docs/naming-study.js';

const focuses = new Set(['systems','inn','brand','bio','rules']);

test('beginner course has nine ordered, fully explained lessons', () => {
  assert.equal(lessons.length, 9);
  assert.deepEqual(lessons.map(x=>x.id),['map','chemical','inn','process','usan','brands','eu','biologics','capstone']);
  assert.equal(new Set(lessons.map(x=>x.id)).size,lessons.length);
  assert.equal(lessons.reduce((s,l)=>s+l.checks.length,0),18);
  for (const l of lessons) {
    assert.ok(l.title && l.objective && l.opener && l.visual && focuses.has(l.focus),l.id);
    assert.ok(l.sections.length >= 3 && l.sections.every(s=>s.title && s.body.length>100),l.id);
    assert.ok(l.takeaways.length >= 3 && l.glossary.length >= 2,l.id);
    assert.ok(l.sources.length>=1 && l.sources.every(k=>sources[k]?.url.startsWith('https://')),l.id);
    for (const q of l.checks){
      assert.ok(q.question && q.explanation.length>45,l.id);
      assert.equal(q.options.length,4,l.id);
      assert.equal(new Set(q.options).size,4,l.id);
      assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,l.id);
    }
  }
});
test('knowledge-check correct answers vary across options rather than always being first',()=>{
  const answers=lessons.flatMap(l=>l.checks.map(q=>q.answer));
  for(const index of [0,1,2,3])assert.ok(answers.filter(i=>i===index).length>=4,'position '+index);
});
test('sources identify WHO, IUPAC, FDA, EMA and USAN explicitly',()=>{
  assert.ok(Object.keys(sources).length>=7);
  for(const name of ['who','whoSelection','iupac','usan','fdaBrand','ema','fdaBio']) {
    assert.match(sources[name].url,/^https:\/\//);
    assert.ok(sources[name].name);
  }
});
test('course keeps fictional drug examples separate from actual product trivia',()=>{
  const content=JSON.stringify(lessons);
  assert.doesNotMatch(content,/\b(?:paracetamol|ibuprofen|amoxicillin|atorvastatin|panadol)\b/i);
  assert.match(content,/fictional/i);
  assert.match(content,/four-month/i);
  assert.match(content,/trademark/i);
});
test('saved lesson state is validated, deduplicated and safely resumed',()=>{
  const raw={completed:['map','inn','inn','nonexistent',3],current:'capstone',checks:{map:[2,0],chemical:[null,4]}};
  const state=normalizeNamingProgress(raw);
  assert.deepEqual(state.completed,['map','inn']);
  assert.equal(state.current,'capstone');
  assert.deepEqual(state.checks.map,[2,0]);
  assert.deepEqual(state.checks.chemical,[null,null]);
  assert.deepEqual(normalizeNamingProgress({current:'nonexistent'}).completed,[]);
  assert.equal(normalizeNamingProgress({current:'nonexistent'}).current,'map');
  const storage={getItem(){return '{ invalid JSON';}};
  assert.equal(readNamingStudyProgress(storage).current,'map');
});
test('readNamingStudyProgress accepts valid saved answers and gracefully handles storage denial',()=>{
  const storage={getItem(){return JSON.stringify({completed:['map'],current:'inn',checks:{inn:[0,2]}});}};
  const s=readNamingStudyProgress(storage);
  assert.equal(s.current,'inn');
  assert.deepEqual(s.checks.inn,[0,2]);
  assert.deepEqual(s.completed,['map']);
  assert.equal(readNamingStudyProgress({getItem(){throw new Error('private mode');}}).completed.length,0);
});
