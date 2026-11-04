import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_LESSONS } from '../docs/naming-lessons.js';
import { SOURCES } from '../docs/question-bank.js';
import { STUDY_LESSON_COUNT, studyProgress } from '../docs/naming-study.js';

test('the label-first study course contains real three-column tables and three checks per chapter',()=>{
 assert.equal(NAMING_LESSONS.length,9);
 assert.equal(STUDY_LESSON_COUNT,9);
 const allTitles=NAMING_LESSONS.map(l=>l.title.toLowerCase()).join(' ');
 for(const term of ['names','stems','brand','label','chemical','salt','claims','examples'])assert.ok(allTitles.includes(term),'Missing topic '+term);
 for(const lesson of NAMING_LESSONS){
  assert.ok(lesson.title.length>8 && lesson.intro.length>50);
  assert.ok(lesson.time.includes('min'));
  assert.ok(lesson.tables?.length>=1,lesson.title);
  for(const table of lesson.tables){
   assert.equal(table.headers.length,3,lesson.title);
   assert.ok(table.rows.length>=3,lesson.title);
   assert.ok(table.rows.every(row=>row.length===3),lesson.title);
  }
  assert.equal(lesson.sections.length,4,lesson.title);
  assert.ok(lesson.sections.every(([h,b,x])=>h.length>3&&b.length>40&&x?.length>=1),lesson.title);
  assert.equal(lesson.checks.length,3,lesson.title);
  for(const [prompt,correct,a,b,c,explanation] of lesson.checks){
   assert.ok(prompt && correct && explanation.length>35,lesson.title);
   assert.equal(new Set([correct,a,b,c]).size,4,lesson.title);
  }
  assert.ok(lesson.sources.every(key=>SOURCES[key]?.url?.startsWith('https://')),lesson.title);
 }
});
test('old irrelevant study progress is not reused',()=>{
 const storage={getItem:key=>{
  assert.equal(key,'radix.pharmaceutical-label-study.v3');
  return JSON.stringify({completed:[0,0,2,5,8,12,-1,'3'],current:4});
 }};
 assert.deepEqual(studyProgress(storage),{completed:[0,2,5,8],current:4});
 assert.deepEqual(studyProgress({getItem:()=>'{bad'}),{completed:[],current:0});
 assert.deepEqual(studyProgress(null),{completed:[],current:0});
});
