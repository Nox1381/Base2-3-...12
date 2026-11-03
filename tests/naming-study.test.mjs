import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_LESSONS } from '../docs/naming-lessons.js';
import { SOURCES } from '../docs/question-bank.js';
import { STUDY_LESSON_COUNT, studyProgress } from '../docs/naming-study.js';

test('beginner curriculum has 12 substantive chemical-naming lessons with examples',()=>{
 assert.equal(NAMING_LESSONS.length,12);
 assert.equal(STUDY_LESSON_COUNT,12);
 const titles=NAMING_LESSONS.map(l=>l[0].toLowerCase()).join(' ');
 for(const word of ['formula','carbon','double','oxygen','nitrogen','branches','mixed','esters','rings','stereo','stems','decode'])
  assert.ok(titles.includes(word),'Missing chapter: '+word);
 for(const lesson of NAMING_LESSONS){
  const [title,time,intro,sections,check,sources]=lesson;
  assert.ok(title.length>8 && time.includes('min') && intro.length>30);
  assert.equal(sections.length,4);
  assert.ok(sections.every(([heading,body])=>heading.length>3&&body.length>35),title);
  assert.ok(sections.some(x=>x[2]?.length>=1),'Missing worked examples for '+title);
  assert.equal(check.length,4);
  assert.equal(new Set(check.slice(1)).size,3);
  assert.ok(sources.every(key=>SOURCES[key]?.url?.startsWith('https://')));
  assert.ok(!/trademark|FDA regulations|proprietary-name approval/i.test(intro));
 }
});
test('study progress is versioned separately from the previous unrelated lessons',()=>{
 const storage={getItem:key=>{
  assert.equal(key,'radix.naming-study.chemistry.v2');
  return JSON.stringify({completed:[0,0,2,9,-1,15,'1'],current:4});
 }};
 assert.deepEqual(studyProgress(storage),{completed:[0,2,9],current:4});
 assert.deepEqual(studyProgress({getItem:()=>'{invalid'}),{completed:[],current:0});
 assert.deepEqual(studyProgress(null),{completed:[],current:0});
});
