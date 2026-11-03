import test from 'node:test';
import assert from 'node:assert/strict';
import { NAMING_LESSONS } from '../docs/naming-lessons.js';
import { SOURCES } from '../docs/question-bank.js';
import { STUDY_LESSON_COUNT, studyProgress } from '../docs/naming-study.js';

test('naming course teaches the complete beginner path with source-backed checkpoints', () => {
  assert.equal(NAMING_LESSONS.length, 8);
  assert.equal(STUDY_LESSON_COUNT, 8);
  for (const lesson of NAMING_LESSONS) {
    const [title, time, intro, sections, check, sources] = lesson;
    assert.ok(title.length > 8 && time.includes('min') && intro.length > 35);
    assert.equal(sections.length, 4);
    assert.ok(sections.every(([heading, body]) => heading.length > 3 && body.length > 35));
    assert.equal(check.length, 4);
    assert.equal(new Set(check.slice(1)).size, 3);
    assert.ok(sources.every(key => SOURCES[key]?.url?.startsWith('https://')));
  }
});
test('study progress ignores invalid or duplicate saved chapter indices', () => {
  const storage = { getItem: () => JSON.stringify({completed:[0,0,2,5,-1,9,'1'],current:2}) };
  assert.deepEqual(studyProgress(storage),{completed:[0,2,5],current:2});
  assert.deepEqual(studyProgress({getItem:()=>'{invalid'}),{completed:[],current:0});
  assert.deepEqual(studyProgress(null),{completed:[],current:0});
});
