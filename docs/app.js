import { CATEGORIES, makeDeck, checkAnswer, shuffle, formatNumber } from './engine.js';
import { QUESTIONS, SOURCES } from './question-bank.js';

const main = document.querySelector('#main');
const settings = { category: 'bases', difficulty: '2', length: '10', base: 'any', baseMode: 'mixed', fireScope: 'all' };
let session = null;
let selected = null;
let revealed = false;
let hintUsed = false;
let screen = 'home';
const esc = value => String(value).replace(/[&<>"']/g, x => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
const options = (entries, value) => entries.map(([v, text]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${text}</option>`).join('');
const setAccent = category => document.documentElement.style.setProperty('--accent', CATEGORIES[category]?.color || '#d9fc72');
const focusHeading = () => main.querySelector('h1, h2')?.focus({ preventScroll: true });

function home(focusCategory = null) {
  screen = 'home'; setAccent(settings.category);
  const basesVisible = ['bases', 'mixed'].includes(settings.category);
  const fireVisible = ['fire', 'mixed'].includes(settings.category);
  main.innerHTML = `
    <section class="setup">
      <div class="intro"><p class="eyebrow">YOUR PRACTICE BENCH</p><h1 tabindex="-1">What are we practicing?</h1><p>Pick a topic. Work it out. See why it works.</p></div>
      <div class="category-grid" role="group" aria-label="Quiz category">
      ${Object.entries(CATEGORIES).map(([id, category]) => `<button type="button" class="category-card ${settings.category === id ? 'is-selected' : ''}" data-category="${id}" aria-pressed="${settings.category === id}" style="--card-accent:${category.color}">
        <span class="category-top"><span class="category-index">${category.mark}</span><span class="selection-dot" aria-hidden="true">${settings.category === id ? '✓' : ''}</span></span>
        <span class="category-name">${category.name}</span><span class="category-description">${category.description}</span>
        <span class="category-foot">${id === 'bases' ? '2  3  4  5  6  7  8  9  10  11  12' : id === 'fire' ? 'SCENARIOS + LABELLED RULES' : 'SCENARIOS + CALCULATIONS'}</span>
      </button>`).join('')}
      </div>
      <button type="button" class="mixed-toggle ${settings.category === 'mixed' ? 'active' : ''}" data-category="mixed" aria-pressed="${settings.category === 'mixed'}"><span aria-hidden="true">◈</span> Mix all four topics <span class="mixed-check">${settings.category === 'mixed' ? '✓' : '+'}</span></button>
      <div class="setup-panel">
        <div class="panel-label"><span class="eyebrow">SET YOUR ROUND</span><span class="panel-note">No timer. Take your time.</span></div>
        <div class="controls-row">
          <label>Difficulty<select id="difficulty">${options([['1', 'Starter'], ['2', 'Standard'], ['3', 'Advanced']], settings.difficulty)}</select></label>
          <label>Questions<select id="length">${options([['10', '10 questions'], ['20', '20 questions'], ['endless', 'Keep practicing']], settings.length)}</select></label>
          ${basesVisible ? `<label>Base<select id="base">${options([['any', 'All bases · 2–12'], ...Array.from({ length: 11 }, (_, i) => [String(i + 2), `Base ${i + 2}`])], settings.base)}</select></label><label>Practice<select id="baseMode">${options([['mixed', 'Counting + conversions + arithmetic'], ['count', 'Counting sequences'], ['convert', 'Conversions'], ['arithmetic', 'Addition and subtraction']], settings.baseMode)}</select></label>` : ''}
          ${fireVisible ? `<label>Fire safety focus<select id="fireScope">${options([['all', 'International · labelled US + UK'], ['general', 'Practical safety'], ['us', 'US · OSHA'], ['uk', 'UK · Home Office']], settings.fireScope)}</select></label>` : ''}
        </div>
        ${fireVisible ? '<p class="scope-note">Each fire question identifies its rule set. Placement depends on the hazard, local requirements, and the site’s fire plan.</p>' : basesVisible ? '<p class="scope-note">In bases 11 and 12: <strong>A = 10</strong> and <strong>B = 11</strong>. Counting rolls over when you run out of digits.</p>' : '<p class="scope-note">Real situations first. Calculations include units, assumptions, and worked answers.</p>'}
        <div class="start-row"><span class="start-description"><span class="round-marker" aria-hidden="true"></span>${settings.category === 'mixed' ? 'A bit of everything' : esc(CATEGORIES[settings.category].name)}<small>${settings.length === 'endless' ? 'Stop whenever you like' : `${settings.length} questions · answers explained`}</small></span><button class="primary-button" id="start">Start round <span aria-hidden="true">▶</span></button></div>
      </div>
      <div class="home-foot"><span><strong>${QUESTIONS.length}</strong> scenario questions + generated calculations</span><span>Keyboard friendly <kbd>1–4</kbd> <kbd>Enter</kbd></span></div>
    </section>`;
  main.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { settings.category = button.dataset.category; home(settings.category); }));
  for (const id of ['difficulty', 'length', 'base', 'baseMode', 'fireScope']) {
    main.querySelector(`#${id}`)?.addEventListener('change', e => { settings[id] = e.target.value; if (id === 'length') main.querySelector('.start-description small').textContent = settings.length === 'endless' ? 'Stop whenever you like' : `${settings.length} questions · answers explained`; });
  }
  main.querySelector('#start').addEventListener('click', () => start());
  if (focusCategory) main.querySelector(`[data-category="${focusCategory}"]`).focus({ preventScroll: true });
}

function start(reviewDeck = null) {
  const seen = new Set();
  const endless = !reviewDeck && settings.length === 'endless';
  session = { settings: { ...settings }, deck: reviewDeck ? shuffle(reviewDeck) : makeDeck(settings, endless ? 10 : Number(settings.length), Math.random, seen), seen, endless, index: 0, answers: [], streak: 0, bestStreak: 0, score: 0, review: !!reviewDeck };
  renderQuestion();
}

function renderVisual(q) {
  if (typeof q.visual === 'string') return `<div class="number-display" aria-label="${esc(q.visual)}">${esc(q.visual)}</div>`;
  if (Array.isArray(q.visual)) return `<div class="givens">${q.visual.map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>`;
  return '';
}

function renderQuestion() {
  screen = 'quiz'; selected = null; revealed = false; hintUsed = false;
  const q = session.deck[session.index], cat = CATEGORIES[q.category];
  setAccent(q.category);
  const total = session.endless ? '∞' : session.deck.length;
  const progress = session.endless ? 0 : session.index / session.deck.length * 100;
  main.innerHTML = `
    <section class="quiz">
      <div class="round-top"><button class="text-button" id="end-round">End round</button><div class="round-position">QUESTION <strong>${session.index + 1}</strong><span>/ ${total}</span></div><div class="round-score"><span id="score">${session.score}</span> <span class="muted">PTS</span></div></div>
      ${!session.endless ? `<div class="progress-track" role="progressbar" aria-label="Round progress" aria-valuemin="0" aria-valuemax="${session.deck.length}" aria-valuenow="${session.index}"><div style="width:${progress}%"></div></div>` : '<div class="endless-rule"></div>'}
      <div class="question-meta"><span class="topic-chip">${esc(cat.short)}</span><span>${esc(q.topic)}</span>${q.jurisdiction ? `<span class="jurisdiction">${esc(q.jurisdiction)}</span>` : ''}<span class="streak">${session.streak > 1 ? `${session.streak} in a row` : ''}</span></div>
      <div class="question-card">
        <h1 class="question-title" tabindex="-1">${esc(q.prompt)}</h1>
        ${renderVisual(q)}
        <form id="answer-form" novalidate>
          ${q.type === 'choice' ? `<fieldset class="answer-choices"><legend class="sr-only">Choose an answer</legend>${q.options.map((choice, i) => `<label class="answer-choice" data-choice="${i}"><input type="radio" name="answer" value="${i}"><span class="choice-key" aria-hidden="true">${i + 1}</span><span>${esc(choice)}</span><span class="choice-status" aria-hidden="true"></span></label>`).join('')}</fieldset>` : `<div class="input-area"><label for="answer-input">${esc(q.inputLabel)}</label><div class="answer-input-wrap"><input id="answer-input" name="answer" type="text" inputmode="${q.type === 'base' && q.answerBase > 10 ? 'text' : 'decimal'}" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="input-help input-error" placeholder="${q.type === 'base' ? 'Type your number' : 'Type your value'}">${q.unit ? `<span class="input-unit">${esc(q.unit)}</span>` : `<span class="input-unit">base ${q.answerBase}</span>`}</div><p id="input-help" class="input-help">${esc(q.inputHelp)}</p></div>`}
          <p class="input-error" id="input-error" role="alert"></p>
          <div class="answer-actions"><div><button type="button" class="text-button hint-button" id="hint">Show hint</button><button type="button" class="text-button skip-button" id="skip">Skip</button></div><button class="primary-button" type="submit" id="check">Check answer <kbd>↵</kbd></button></div>
        </form>
        <div id="hint-panel" class="hint-panel" hidden></div>
        <div id="feedback" class="feedback" aria-live="polite" aria-atomic="true" hidden></div>
      </div>
      <p class="quiz-foot">${q.type === 'choice' ? 'Choose an answer with 1–4. Press Enter to check.' : 'Write your answer, then press Enter to check.'} <span>Correct answers earn points. Hints are always available.</span></p>
    </section>`;
  const form = main.querySelector('#answer-form');
  form.addEventListener('submit', e => { e.preventDefault(); submit(); });
  main.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => pick(Number(input.value))));
  main.querySelector('#hint').addEventListener('click', () => {
    if (revealed) return;
    hintUsed = true;
    const panel = main.querySelector('#hint-panel'); panel.hidden = !panel.hidden; panel.innerHTML = `<strong>A nudge</strong><p>${esc(q.hint)}</p>`;
    main.querySelector('#hint').textContent = panel.hidden ? 'Show hint' : 'Hide hint';
  });
  main.querySelector('#skip').addEventListener('click', () => submit(true));
  main.querySelector('#end-round').addEventListener('click', finish);
  if (q.type !== 'choice') main.querySelector('#answer-input').focus({ preventScroll: true }); else focusHeading();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function pick(index) {
  if (revealed) return;
  selected = index;
  main.querySelectorAll('.answer-choice').forEach(label => { const active = Number(label.dataset.choice) === index; label.classList.toggle('selected', active); label.querySelector('input').checked = active; });
  main.querySelector('#input-error').textContent = '';
}

function submit(skip = false) {
  if (revealed) return;
  const q = session.deck[session.index];
  const input = q.type === 'choice' ? selected : main.querySelector('#answer-input').value.trim();
  if (!skip && (input === null || input === '')) {
    main.querySelector('#input-error').textContent = q.type === 'choice' ? 'Choose an answer first.' : 'Enter an answer first.';
    main.querySelector('#answer-input')?.focus(); return;
  }
  revealed = true;
  const correct = !skip && checkAnswer(q, input);
  session.streak = correct ? session.streak + 1 : 0;
  session.bestStreak = Math.max(session.bestStreak, session.streak);
  const points = correct ? (hintUsed ? 75 : 100) + Math.min((session.streak - 1) * 10, 50) : 0;
  session.score += points;
  session.answers.push({ q, correct, skipped: skip, input: skip ? null : input, hintUsed, points });
  main.querySelector('#score').textContent = session.score;
  main.querySelectorAll('#answer-form input').forEach(el => el.disabled = true);
  main.querySelectorAll('#answer-form button').forEach(el => el.disabled = true);
  if (q.type === 'choice') {
    main.querySelectorAll('.answer-choice').forEach(label => {
      const index = Number(label.dataset.choice);
      if (index === q.correctIndex) { label.classList.add('correct'); label.querySelector('.choice-status').textContent = '✓'; }
      else if (index === input && !skip) { label.classList.add('incorrect'); label.querySelector('.choice-status').textContent = '×'; }
    });
  } else main.querySelector('.answer-input-wrap').classList.add(correct ? 'correct' : 'incorrect');
  const feedback = main.querySelector('#feedback');
  feedback.hidden = false; feedback.className = `feedback ${correct ? 'feedback-correct' : 'feedback-incorrect'}`;
  const final = !session.endless && session.index === session.deck.length - 1;
  feedback.innerHTML = `<div class="feedback-heading"><strong>${correct ? 'That’s right.' : skip ? 'Let’s work it out.' : 'Not quite.'}</strong><span>${correct ? `+${points} pts` : 'Keep going'}</span></div>${!correct ? `<p class="correct-answer">Answer: <strong>${esc(q.answer)}${q.unit ? ` ${esc(q.unit)}` : q.type === 'base' ? ` (base ${q.answerBase})` : ''}</strong></p>` : ''}<p class="explanation">${esc(q.explanation)}</p>${sourceLink(q)}<button class="primary-button next-button" id="next">${final ? 'See results' : 'Next question'} <kbd>↵</kbd></button>`;
  main.querySelector('#next').addEventListener('click', next);
  main.querySelector('#next').focus({ preventScroll: true });
  feedback.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

function sourceLink(q) {
  const source = SOURCES[q.source];
  return source ? `<a class="source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.name)} <span class="sr-only">(opens in a new tab)</span></a>` : '';
}

function next() {
  if (!revealed) return;
  session.index++;
  if (session.index === session.deck.length) {
    if (session.endless) session.deck.push(...makeDeck(session.settings, 10, Math.random, session.seen));
    else { finish(); return; }
  }
  renderQuestion();
}

function finish() {
  if (!session.answers.length) { session = null; home(); focusHeading(); return; }
  screen = 'results'; setAccent(session.settings.category);
  const answers = session.answers, correct = answers.filter(a => a.correct).length, missed = answers.filter(a => !a.correct);
  const accuracy = Math.round(correct / answers.length * 100);
  const verdict = accuracy === 100 ? 'A clean sweep.' : accuracy >= 80 ? 'You know your way around.' : accuracy >= 50 ? 'Good work. Keep building.' : 'Every round teaches you something.';
  main.innerHTML = `<section class="results">
    <p class="eyebrow">${session.review ? 'REVIEW COMPLETE' : 'ROUND COMPLETE'}</p><h1 tabindex="-1">${verdict}</h1>
    <div class="result-score"><strong>${accuracy}<span>%</span></strong><div>${correct} of ${answers.length} correct<small>${session.settings.category === 'mixed' ? 'Mixed practice' : CATEGORIES[session.settings.category].name}</small></div></div>
    <div class="result-stats"><div><span>Points earned</span><strong>${session.score.toLocaleString()}</strong></div><div><span>Best streak</span><strong>${session.bestStreak}<small> in a row</small></strong></div><div><span>To revisit</span><strong>${missed.length}<small> question${missed.length === 1 ? '' : 's'}</small></strong></div></div>
    <div class="result-actions"><button class="primary-button" id="again">Play another round</button>${missed.length ? '<button class="secondary-button" id="review">Retry missed questions</button>' : ''}<button class="text-button" id="topics">Choose a topic</button></div>
    ${missed.length ? `<div class="review-area"><h2>Your takeaways <span>${missed.length}</span></h2>${missed.map((entry, i) => `<details class="review-item"><summary><span class="review-number">${String(i + 1).padStart(2, '0')}</span><span>${esc(entry.q.prompt)}</span><span class="review-plus" aria-hidden="true">+</span></summary><div class="review-content">${entry.q.jurisdiction ? `<span class="jurisdiction">${esc(entry.q.jurisdiction)}</span>` : ''}<p class="muted">${entry.skipped ? 'Skipped' : `Your answer: ${esc(entry.q.type === 'choice' ? entry.q.options[entry.input] : entry.input)}`}</p><p>Answer: <strong>${esc(entry.q.answer)}${entry.q.unit ? ` ${esc(entry.q.unit)}` : entry.q.type === 'base' ? ` (base ${entry.q.answerBase})` : ''}</strong></p><p>${esc(entry.q.explanation)}</p>${sourceLink(entry.q)}</div></details>`).join('')}</div>` : '<div class="perfect-note"><span aria-hidden="true">✓</span><p>Everything clicked this round. Try another base or raise the difficulty.</p></div>'}
  </section>`;
  main.querySelector('#again').addEventListener('click', () => start());
  main.querySelector('#review')?.addEventListener('click', () => start(missed.map(a => a.q)));
  main.querySelector('#topics').addEventListener('click', () => { session = null; home(); focusHeading(); });
  focusHeading(); window.scrollTo({ top: 0, behavior: 'instant' });
}

document.querySelector('.brand').addEventListener('click', e => { e.preventDefault(); session = null; home(); focusHeading(); });

document.addEventListener('keydown', e => {
  if (screen !== 'quiz' || e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
  const q = session.deck[session.index];
  if (!revealed && q.type === 'choice' && /^[1-4]$/.test(e.key)) { e.preventDefault(); pick(Number(e.key) - 1); }
  if (e.key === 'Enter' && e.target?.tagName !== 'BUTTON' && e.target?.tagName !== 'A') {
    e.preventDefault(); if (revealed) next(); else submit();
  }
});

home();
