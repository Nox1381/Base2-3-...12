import { NAMING_LESSONS } from './naming-lessons.js?v=20261103-chemical-names';
import { SOURCES } from './question-bank.js?v=20261103-chemical-names';

const escStudy = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const STORAGE_KEY = 'radix.pharmaceutical-label-study.v3';
export const STUDY_LESSON_COUNT = NAMING_LESSONS.length;
export function studyProgress(storage) {
  try {
    const saved = JSON.parse(storage?.getItem(STORAGE_KEY) || '{}');
    return {completed: Array.isArray(saved.completed) ? [...new Set(saved.completed.filter(x=>Number.isInteger(x) && x>=0 && x<NAMING_LESSONS.length))] : [], current: Number.isInteger(saved.current) && saved.current>=0 && saved.current<NAMING_LESSONS.length ? saved.current : 0};
  } catch { return {completed:[],current:0}; }
}
export function createNamingStudy(root, onBack, onQuiz, storage = typeof localStorage === 'undefined' ? null : localStorage) {
  let state = studyProgress(storage);
  let index = state.current;
  let answer = null;
  let checkIndex = 0;
  function save() { try {storage?.setItem(STORAGE_KEY,JSON.stringify({completed:state.completed,current:index}));} catch {} }
  function choose(i) {index=Math.max(0,Math.min(NAMING_LESSONS.length-1,i));answer=null;checkIndex=0;save();render();root.querySelector('h1')?.focus({preventScroll:true});}
  function render() {
    const lesson = NAMING_LESSONS[index];
    const {title,time,intro,sections,checks,sources,tables=[]}=lesson;
    const check=checks[checkIndex];
    const done = state.completed.includes(index);
    const answerOrder = index % 3 === 0 ? [1,0,3,2] : index % 3 === 1 ? [2,1,0,3] : [3,0,2,1];
    const progress = Math.round(state.completed.length / NAMING_LESSONS.length * 100);
    root.innerHTML = `<section class="study">
      <div class="study-top"><button type="button" class="text-button" id="study-back">← Back to topics</button><span class="study-tag">PHARMACEUTICAL NAMING · STUDY MODE</span></div>
      <div class="study-hero"><p class="eyebrow">LEARN BEFORE YOU TEST</p><h1 tabindex="-1">Pharmaceutical naming · study guide</h1><p>Identify generic, brand and chemical names on real products; recognize drug-family stems, strengths, dosage forms, salt modifiers and unsupported claims. Study the tables and example labels.</p>
      <div class="study-meter"><div><strong>${state.completed.length} / ${NAMING_LESSONS.length} lessons completed</strong><span>${progress}%</span></div><div class="progress-track" role="progressbar" aria-label="Study progress" aria-valuenow="${state.completed.length}" aria-valuemin="0" aria-valuemax="${NAMING_LESSONS.length}"><div style="width:${progress}%"></div></div></div></div>
      <div class="study-layout"><nav class="study-nav" aria-label="Course chapters"><p class="eyebrow">YOUR LEARNING PATH</p>
      ${NAMING_LESSONS.map((l,i)=>`<button type="button" data-study-lesson="${i}" class="study-nav-item ${i===index?'active':''}" aria-current="${i===index?'step':'false'}"><span class="study-nav-number">${state.completed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span><span><strong>${escStudy(l.title)}</strong><small>${escStudy(l.time)}</small></span></button>`).join('')}
      <div class="study-nav-tip">Answer all three quick checks in a lesson to save your progress.</div></nav>
      <article class="study-article"><div class="study-lesson-heading"><span class="eyebrow">LESSON ${index+1} OF ${NAMING_LESSONS.length} · ${escStudy(time)}</span><h2>${escStudy(title)}</h2><p>${escStudy(intro)}</p></div>
      ${tables.map(t=>`<section class="study-data-table"><h3>${escStudy(t.title)}</h3><div class="study-table-scroll"><table><thead><tr>${t.headers.map(h=>`<th scope="col">${escStudy(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map((cell,j)=>j===0?`<th scope="row">${escStudy(cell)}</th>`:`<td>${escStudy(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`).join('')}
      ${sections.map(([heading,body,examples],i)=>`<section class="study-section"><span class="study-section-index">${String(i+1).padStart(2,'0')}</span><div><h3>${escStudy(heading)}</h3><p>${escStudy(body)}</p>${Array.isArray(examples) && examples.length ? `<div class="study-worked"><span class="eyebrow">NAME OR LABEL EXAMPLE</span>${examples.map(item=>`<code>${escStudy(item)}</code>`).join('')}</div>` : ''}</div></section>`).join('')}
      <section class="study-check"><div class="study-check-head"><span class="eyebrow">KNOWLEDGE CHECK</span><span>${done?'Completed':`Check ${checkIndex+1} of ${checks.length}`}</span></div><h3>${escStudy(check[0])}</h3>
      <div class="study-check-options">${answerOrder.map(i=>`<button type="button" data-study-answer="${i}" class="study-answer ${answer===i?(i===0?'correct':'incorrect'):''}" ${answer!==null?'disabled':''}>${escStudy(check[i+1])}</button>`).join('')}</div>
      ${answer!==null?`<p class="study-feedback" role="status">${answer===0?'Correct.':'Not quite. '}${answer===0?'${check[5]}':'Correct answer: ${escStudy(check[1])}. Review the worked examples above, then try again.'}</p>${answer!==0?'<button type="button" class="secondary-button" id="study-retry">Try again</button>':''}`:''}
      ${answer===0 && checkIndex<checks.length-1 ? '<button type="button" class="secondary-button" id="study-next-check">Next check →</button>':''}
      </section>
      <div class="study-sources"><span class="eyebrow">OFFICIAL SOURCES</span><div>${sources.map(key=>SOURCES[key]?`<a href="${escStudy(SOURCES[key].url)}" target="_blank" rel="noopener noreferrer">${escStudy(SOURCES[key].name)} ↗</a>`:'').join('')}</div></div>
      <div class="study-actions"><button type="button" class="secondary-button" id="study-prev" ${index===0?'disabled':''}>← Previous</button>${index===NAMING_LESSONS.length-1?`<button type="button" class="primary-button" id="study-quiz">Start Starter quiz →</button>`:`<button type="button" class="primary-button" id="study-next">Next lesson →</button>`}</div>
      </article></div></section>`;
    root.querySelector('#study-back').addEventListener('click',onBack);
    root.querySelectorAll('[data-study-lesson]').forEach(button=>button.addEventListener('click',()=>choose(Number(button.dataset.studyLesson))));
    root.querySelectorAll('[data-study-answer]').forEach(button=>button.addEventListener('click',()=>{
      answer=Number(button.dataset.studyAnswer);
      if(answer===0 && checkIndex===checks.length-1 && !state.completed.includes(index)){state.completed.push(index);save();}
      render();
      root.querySelector('.study-feedback')?.scrollIntoView({block:'nearest'});
    }));
    root.querySelector('#study-next-check')?.addEventListener('click',()=>{checkIndex++;answer=null;render();});
    root.querySelector('#study-retry')?.addEventListener('click',()=>{answer=null;render();});
    root.querySelector('#study-prev')?.addEventListener('click',()=>choose(index-1));
    root.querySelector('#study-next')?.addEventListener('click',()=>choose(index+1));
    root.querySelector('#study-quiz')?.addEventListener('click',onQuiz);
  }
  render();
  return ()=>{};
}
