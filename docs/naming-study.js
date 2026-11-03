import { NAMING_STUDY_LESSONS as LESSONS, NAMING_STUDY_SOURCES as SOURCES } from './naming-study-data.js?v=20261103-pharma-naming';

const STORAGE_KEY = 'radix.study.pharma-naming.v1';
const validId = id => LESSONS.some(l => l.id === id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const element = (selector, root) => root.querySelector(selector);
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

export function normalizeNamingProgress(raw) {
  const completed = Array.isArray(raw?.completed) ? [...new Set(raw.completed.filter(validId))] : [];
  const checks = {};
  for (const lesson of LESSONS) {
    const responses = raw?.checks?.[lesson.id];
    if (Array.isArray(responses)) checks[lesson.id] = lesson.checks.map((question, i) =>
      Number.isInteger(responses[i]) && responses[i] >= 0 && responses[i] < question.options.length ? responses[i] : null);
  }
  return { completed, checks, current: validId(raw?.current) ? raw.current : LESSONS[0].id };
}
export function readNamingStudyProgress(storage = typeof localStorage !== 'undefined' ? localStorage : null) {
  try { return normalizeNamingProgress(storage ? JSON.parse(storage.getItem(STORAGE_KEY)) : {}); }
  catch { return normalizeNamingProgress({}); }
}
function writeProgress(state, storage) {
  try { storage?.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { /* Browsing can continue without persistent storage. */ }
}

const lessonArt = {
  layers: '<div class="study-map" aria-label="Four naming layers"><div><small>01 · Chemical</small><strong>Molecular structure</strong><span>IUPAC naming rules</span></div><div><small>02 · Research</small><strong>LAB-684</strong><span>Internal tracking code</span></div><div><small>03 · Generic</small><strong>INN / USAN</strong><span>Public substance name</span></div><div><small>04 · Commercial</small><strong>Proposed brand</strong><span>Market-specific review</span></div></div>',
  chemical: '<div class="study-mini-visual"><div><small>RESEARCH LABEL</small><strong>LAB-684</strong><span>Tracks a candidate</span></div><div aria-hidden="true">≠</div><div><small>CHEMICAL NAME</small><strong>Structural description</strong><span>Based on the actual chemistry</span></div></div>',
  stems: '<div class="study-mini-visual"><div><small>GENERIC NAME</small><strong>Distinctive part <em>+ common stem</em></strong><span>Shared element helps signal a pharmacological family</span></div><div><small>BRAND</small><strong>Distinct commercial name</strong><span>Do not appropriate protected INN stems</span></div></div>',
  timeline: '<div class="study-timeline" aria-label="WHO naming procedure"><div><b>1</b><strong>Apply</strong><span>WHO expert review</span></div><div><b>2</b><strong>Proposed INN</strong><span>Four-month objection period</span></div><div><b>3</b><strong>Recommended</strong><span>Public nonproprietary name</span></div></div>',
  usan: '<div class="study-mini-visual"><div><small>INTERNATIONAL</small><strong>WHO · INN</strong><span>Worldwide public substance identity</span></div><div aria-hidden="true">↔</div><div><small>UNITED STATES</small><strong>USAN</strong><span>Coordinated adopted names</span></div></div>',
  brand: '<div class="study-map study-map-three"><div><small>SAFETY CHECK 01</small><strong>Sounds alike?</strong><span>Say it aloud</span></div><div><small>SAFETY CHECK 02</small><strong>Looks alike?</strong><span>Read and handwrite it</span></div><div><small>SAFETY CHECK 03</small><strong>Misleading?</strong><span>Avoid unsupported claims</span></div></div>',
  regions: '<div class="study-map study-map-three"><div><small>WHO</small><strong>INN</strong><span>International generic naming</span></div><div><small>US · FDA</small><strong>Brand review</strong><span>Medication errors + misleading names</span></div><div><small>EU · EMA</small><strong>Invented names</strong><span>Centralised procedure · NRG</span></div></div>',
  suffix: '<div class="study-suffix"><small>US BIOLOGIC NAMING FORMAT · FICTIONAL EXAMPLE</small><div><span>core-name</span><b>-</b><strong>q z r t</strong></div><p>Core name + hyphen + four lowercase letters; at least three letters must be distinct.</p></div>',
  workflow: '<div class="study-timeline study-timeline-four" aria-label="Naming workflow"><div><b>1</b><strong>Identify</strong><span>Structure and code</span></div><div><b>2</b><strong>Design</strong><span>WHO INN / USAN</span></div><div><b>3</b><strong>Screen</strong><span>Stems, claims, confusion</span></div><div><b>4</b><strong>Review</strong><span>Authority and market</span></div></div>'
};

export function createNamingStudy(container, { onExit, onPractice, storage = typeof localStorage !== 'undefined' ? localStorage : null } = {}) {
  let progress = readNamingStudyProgress(storage);
  let activeId = progress.current;
  let disposed = false;
  const persist = () => writeProgress(progress, storage);
  const activeLesson = () => LESSONS.find(l => l.id === activeId) || LESSONS[0];
  const answered = lesson => {
    const a = progress.checks[lesson.id] || [];
    return lesson.checks.every((q, i) => Number.isInteger(a[i]) && a[i] >= 0 && a[i] < q.options.length);
  };

  function chooseLesson(id) {
    if (!validId(id) || disposed) return;
    activeId = id;
    progress.current = id;
    persist();
    render();
    scrollToTop();
  }
  function answer(index, selected) {
    const lesson = activeLesson(), q = lesson.checks[index];
    if (!q || !Number.isInteger(selected) || selected < 0 || selected >= q.options.length) return;
    if (!progress.checks[lesson.id]) progress.checks[lesson.id] = new Array(lesson.checks.length).fill(null);
    if (progress.checks[lesson.id][index] !== null) return; // Freeze after first answer for honest feedback.
    progress.checks[lesson.id][index] = selected;
    persist();
    render();
    element('#check-' + index + '-feedback', container)?.focus({preventScroll:true});
  }
  function retry(index) {
    const lesson = activeLesson();
    if (!progress.checks[lesson.id] || !Number.isInteger(index)) return;
    progress.checks[lesson.id][index] = null;
    if (progress.completed.includes(lesson.id)) progress.completed = progress.completed.filter(id => id !== lesson.id);
    persist();
    render();
    element('#check-' + index, container)?.focus({preventScroll:true});
  }
  function complete() {
    const lesson = activeLesson();
    if (!answered(lesson)) return;
    if (!progress.completed.includes(lesson.id)) progress.completed.push(lesson.id);
    const next = LESSONS[LESSONS.findIndex(l => l.id === lesson.id) + 1];
    if (next) { activeId = next.id; progress.current = next.id; }
    persist(); render(); scrollToTop();
  }
  function renderCheck(q, i, lesson) {
    const selection = progress.checks[lesson.id]?.[i], locked = Number.isInteger(selection);
    const correct = locked && selection === q.answer;
    return `<section class="study-check" aria-labelledby="check-label-${i}">
      <div class="study-check-top"><span class="study-check-badge">CHECK ${i + 1} OF ${lesson.checks.length}</span>${locked ? `<span class="study-check-state">${correct ? '✓ Understood' : 'Review the explanation'}</span>` : '<span class="study-check-state">Choose one answer</span>'}</div>
      <h3 id="check-label-${i}">${escapeHtml(q.question)}</h3>
      <div class="study-check-choices" role="group" aria-label="Answer choices">${q.options.map((choice, j) =>
        `<button type="button" data-answer="${i}:${j}" id="${j === 0 ? 'check-' + i : ''}" class="study-check-option ${locked && j === q.answer ? 'is-correct' : ''} ${locked && j === selection && j !== q.answer ? 'is-wrong' : ''}" ${locked ? 'disabled' : ''}>${escapeHtml(choice)}</button>`).join('')}</div>
      ${locked ? `<div class="study-check-feedback ${correct ? 'passed' : 'needs-review'}" id="check-${i}-feedback" role="status" tabindex="-1"><strong>${correct ? 'Correct.' : 'Not quite.'}</strong><p>${escapeHtml(q.explanation)}</p>${correct ? '' : `<p class="study-correction">Correct answer: <strong>${escapeHtml(q.options[q.answer])}</strong></p><button type="button" class="text-button" data-retry="${i}">Try again</button>`}</div>` : ''}
    </section>`;
  }
  function render() {
    if (disposed) return;
    const lesson = activeLesson(), index = LESSONS.findIndex(l => l.id === lesson.id);
    const completeCount = progress.completed.length;
    const allFinished = completeCount === LESSONS.length;
    container.innerHTML = `<section class="naming-study" aria-label="Pharmaceutical naming study course">
      <div class="study-head"><button class="text-button" id="study-exit" type="button">← Back to topics</button><span class="study-kicker">PHARMACEUTICAL NAMING · STUDY MODE</span></div>
      <div class="study-hero"><div><p class="eyebrow">LEARN BEFORE YOU QUIZ</p><h1 tabindex="-1">From zero to naming rules.</h1><p>Nine short lessons. Fictional examples. Real regulatory sources. No chemistry degree or medical background needed.</p></div><div class="study-overall"><strong>${completeCount}<span>/${LESSONS.length}</span></strong><small>Lessons finished</small><div class="study-progress-track" role="progressbar" aria-label="Lessons completed" aria-valuemin="0" aria-valuemax="${LESSONS.length}" aria-valuenow="${completeCount}"><span style="width:${Math.round(100 * completeCount / LESSONS.length)}%"></span></div></div></div>
      <div class="study-layout">
        <aside class="study-sidebar" aria-label="Course lessons">
          <p class="study-sidebar-title">YOUR LEARNING PATH</p>
          <nav class="study-lessons" aria-label="Jump to a lesson">${LESSONS.map((l,i)=>`<button type="button" data-lesson="${l.id}" aria-current="${l.id === activeId ? 'step' : 'false'}" class="${l.id === activeId ? 'active' : ''} ${progress.completed.includes(l.id) ? 'completed' : ''}"><span class="study-lesson-num">${progress.completed.includes(l.id) ? '✓' : String(i + 1).padStart(2,'0')}</span><span><strong>${escapeHtml(l.title)}</strong><small>${escapeHtml(l.tag)}</small></span></button>`).join('')}</nav>
          <button type="button" class="secondary-button study-sidebar-quiz" id="study-quiz-all">Practice all naming topics →</button>
          <p class="study-storage">Progress is kept in this browser when local storage is available.</p>
        </aside>
        <article class="study-lesson" aria-labelledby="lesson-title">
          <div class="study-lesson-head"><div><span class="eyebrow">LESSON ${String(index + 1).padStart(2, '0')} / ${String(LESSONS.length).padStart(2,'0')} · ${escapeHtml(lesson.tag)}</span><h2 id="lesson-title">${escapeHtml(lesson.title)}</h2><p>${escapeHtml(lesson.objective)}</p></div><span class="study-level">${escapeHtml(lesson.duration)}</span></div>
          <div class="study-lead">${escapeHtml(lesson.opener)}</div>
          ${lessonArt[lesson.visual] || ''}
          <div class="study-lesson-sections">${lesson.sections.map((s,i) => `<section><h3>${String(i+1).padStart(2,'0')} <span>${escapeHtml(s.title)}</span></h3><p>${escapeHtml(s.body)}</p>${s.example ? `<div class="study-example"><strong>WORKED EXAMPLE</strong><p>${escapeHtml(s.example)}</p></div>` : ''}</section>`).join('')}</div>
          <section class="study-takeaways" aria-label="Key things to remember"><h3>Remember these</h3><ul>${lesson.takeaways.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul></section>
          <section class="study-terms" aria-label="New terms"><h3>New words</h3><div>${lesson.glossary.map(([term,definition])=>`<p><strong>${escapeHtml(term)}</strong> — ${escapeHtml(definition)}</p>`).join('')}</div></section>
          <section class="study-checks" aria-label="Knowledge checks"><div class="study-checks-head"><p class="eyebrow">CHECK YOUR UNDERSTANDING</p><h3>Make sure it clicked.</h3><p>Answer both questions. You can review the lesson and retry before moving on.</p></div>${lesson.checks.map((q,i) => renderCheck(q,i,lesson)).join('')}</section>
          <div class="study-lesson-actions"><button class="primary-button" id="study-complete" type="button" ${answered(lesson) ? '' : 'disabled'}>${progress.completed.includes(lesson.id) ? 'Review complete ✓' : (index === LESSONS.length - 1 ? 'Finish course ✓' : 'Complete & next lesson →')}</button><button class="secondary-button" id="study-practice" type="button">Quiz this topic →</button></div>
          ${!answered(lesson) ? '<p class="study-next-hint">Both knowledge checks unlock the next lesson. Lessons can also be opened from the sidebar at any time.</p>' : ''}
          ${allFinished ? '<div class="study-finished"><strong>All nine lessons finished.</strong><p>You can now test yourself with Starter difficulty, then move to Standard and Advanced.</p><button type="button" id="study-final-quiz" class="primary-button">Start the Starter quiz →</button></div>' : ''}
          <div class="study-lesson-sources"><h3>Official references</h3><p>These sources describe naming guidance or regulatory procedures; not every recommendation is a universal legal prohibition.</p>${lesson.sources.map(k=>`<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(SOURCES[k].url)}">${escapeHtml(SOURCES[k].name)} <span aria-hidden="true">↗</span></a>`).join('')}</div>
          <div class="study-bottom-nav"><button type="button" class="text-button" id="study-prev" ${index ? '' : 'disabled'}>← Previous lesson</button><span>${index + 1} of ${LESSONS.length}</span><button type="button" class="text-button" id="study-next" ${index < LESSONS.length - 1 ? '' : 'disabled'}>Next lesson →</button></div>
        </article>
      </div>
      <p class="study-disclaimer">Educational guide, not medicine naming approval or legal advice. All example drug candidates and hypothetical INN stems are invented for teaching and have not been checked for trademark clearance.</p>
    </section>`;
    container.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>chooseLesson(b.dataset.lesson)));
    container.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{const [i,j]=b.dataset.answer.split(':').map(Number);answer(i,j);}));
    container.querySelectorAll('[data-retry]').forEach(b=>b.addEventListener('click',()=>retry(Number(b.dataset.retry))));
    element('#study-complete',container).addEventListener('click',()=>{if(progress.completed.includes(lesson.id)){const next=LESSONS[index+1];if(next)chooseLesson(next.id);else render();}else complete();});
    element('#study-prev',container).addEventListener('click',()=>{if(index>0)chooseLesson(LESSONS[index-1].id)});
    element('#study-next',container).addEventListener('click',()=>{if(index<LESSONS.length-1)chooseLesson(LESSONS[index+1].id)});
    element('#study-exit',container).addEventListener('click',()=>onExit?.());
    element('#study-practice',container).addEventListener('click',()=>onPractice?.(lesson.focus));
    element('#study-quiz-all',container).addEventListener('click',()=>onPractice?.('all'));
    element('#study-final-quiz',container)?.addEventListener('click',()=>onPractice?.('all'));
  }
  render();
  container.querySelector('h1')?.focus({preventScroll:true});
  return () => { disposed = true; };
}
