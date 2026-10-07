import { CHALLENGES, normalizeOutput } from './challenges.js';

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.mjs';
const WEBMSX_URL = 'https://cdn.jsdelivr.net/gh/ppeccin/WebMSX@4f4009e86d3e0bb9be7dcd7f0a582b0cd411d660/release/stable/6.0/embedded/wmsx.js';
const pythonWorkerSource = `
const { loadPyodide } = await import('${PYODIDE_URL}');
const python = await loadPyodide();
self.postMessage({type: 'ready'});
self.onmessage = async ({data}) => {
  let output = '', errors = '';
  python.setStdout({batched: line => { if (output.length < 20000) output += line + '\\n'; }});
  python.setStderr({batched: line => { if (errors.length < 20000) errors += line + '\\n'; }});
  python.setStdin({stdin: () => undefined});
  const globals = python.globals.get('dict')();
  globals.set('__name__', '__main__');
  try {
    await python.runPythonAsync(data.code, {globals});
    self.postMessage({type: 'result', output, error: errors});
  } catch (error) {
    self.postMessage({type: 'result', output, error: errors + error.message});
  } finally { globals.destroy(); }
};`;

class PythonRunner {
  worker = null;
  ready = false;
  pending = null;
  timer = null;
  async run(code, status) {
    if (this.pending) throw new Error('A program is already running.');
    return new Promise((resolve, reject) => {
      this.pending = {resolve, reject, code};
      if (!this.worker) {
        status('Loading Python… First load needs an internet connection.');
        const url = URL.createObjectURL(new Blob([pythonWorkerSource], {type: 'text/javascript'}));
        try { this.worker = new Worker(url, {type: 'module'}); }
        catch (error) { URL.revokeObjectURL(url); this.stop(error.message); return; }
        URL.revokeObjectURL(url);
        this.timer = setTimeout(() => this.stop('Python could not load. Check your connection, then run again.'), 45000);
        this.worker.onerror = () => this.stop('Python could not load. Check your connection, then run again.');
        this.worker.onmessage = ({data}) => {
          if (data.type === 'ready') { this.ready = true; this.send(status); }
          if (data.type === 'result' && this.pending) {
            clearTimeout(this.timer);
            const request = this.pending; this.pending = null;
            request.resolve(data);
          }
        };
      } else this.send(status);
    });
  }
  send(status) {
    if (!this.ready || !this.pending) return;
    clearTimeout(this.timer); status('Running Python…');
    this.timer = setTimeout(() => this.stop('Stopped after 5 seconds. Check for an infinite loop, then run again.'), 5000);
    this.worker.postMessage({code: this.pending.code});
  }
  stop(reason = 'Stopped. You can edit the code and run again.') {
    clearTimeout(this.timer); this.worker?.terminate(); this.worker = null; this.ready = false;
    const request = this.pending; this.pending = null;
    request?.reject(new Error(reason));
  }
}

let msxScriptPromise = null;
let msxHost = null;
let msxParking = null;
async function loadMSX() {
  if (window.WMSX?.room) return;
  if (!msxScriptPromise) msxScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WEBMSX_URL; script.crossOrigin = 'anonymous';
    script.integrity = 'sha384-kNkyHYQgtc2n314hU9laE0OhE+HSJ4vgEDskx8nWjJpq+STHkpMzmjhQWG0XnIlH';
    const timer = setTimeout(() => { script.remove(); msxScriptPromise = null; reject(new Error('MSX could not load. Check your connection, then run again.')); }, 30000);
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); script.remove(); msxScriptPromise = null; reject(new Error('MSX could not load. Check your connection, then run again.')); };
    document.head.append(script);
  });
  await msxScriptPromise;
}
const waitBriefly = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitMSX(test, active, limit = 10000) {
  const start = performance.now();
  while (performance.now() - start < limit) {
    if (!active()) throw new Error('Stopped. You can edit the code and run again.');
    const value = test(); if (value) return value;
    await waitBriefly(100);
  }
  throw new Error('The MSX program did not finish. Check for an infinite loop or an INPUT waiting for keyboard input.');
}
function parkMSX() {
  window.WMSX?.room?.keyboard?.cancelTypeString();
  window.WMSX?.room?.machine?.powerOff();
  if (msxHost) {
    if (!msxParking) { msxParking = document.createElement('div'); msxParking.hidden = true; document.body.append(msxParking); }
    msxParking.append(msxHost);
  }
}

// Output checks compare displayed output, not source text. They are practice checks,
// not a sandboxed examination of whether a particular algorithm was used.
export function createCodingLab(container, language, onExit) {
  const labChallenges = CHALLENGES[language], isPython = language === 'python';
  const htmlEscape = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let active = true, busy = false, challengeIndex = 0, runToken = 0;
  const pythonRunner = new PythonRunner();
  const drafts = new Map();
  container.innerHTML = `<section class="coding-lab">
    <div class="lab-top"><button class="text-button" id="lab-back">← Choose a topic</button><span class="topic-chip">${isPython ? 'Python' : 'MSX BASIC 1'}</span></div>
    <p class="eyebrow">CODING CHALLENGES</p><h1 tabindex="-1">Make it work.</h1>
    <div class="lab-selection"><label for="challenge-select">Challenge</label><select id="challenge-select">${labChallenges.map((c, i) => `<option value="${i}">${i + 1}. ${htmlEscape(c.title)}</option>`).join('')}</select></div>
    <h2 id="challenge-title"></h2><p class="lab-prompt" id="challenge-prompt"></p>
    <div class="lab-grid"><div class="lab-editor-panel"><label for="code-editor">Your ${isPython ? 'Python' : 'MSX BASIC 1'} code</label><textarea id="code-editor" spellcheck="false" autocomplete="off" autocapitalize="off" aria-describedby="editor-help"></textarea><p id="editor-help" class="input-help">${isPython ? 'Run executes real Python in your browser. Runs stop after 5 seconds.' : 'Run types your numbered program into a real MSX1. Keep SCREEN 0 for these output exercises.'} Tab inserts four spaces.</p><div class="lab-buttons"><button class="primary-button" id="run-code">Run code ▶</button><button class="secondary-button" id="stop-code" disabled>Stop</button><button class="text-button" id="reset-code">Reset code</button></div></div>
    <div class="lab-output-panel"><span class="eyebrow">TARGET OUTPUT</span><pre id="target-output"></pre><span class="eyebrow">YOUR OUTPUT</span><pre id="code-output" aria-label="Program output">Run your code to see its output.</pre><p id="run-status" class="run-status" role="status" aria-live="polite"></p></div></div>
    ${!isPython ? '<div class="msx-display-panel" id="msx-display-panel" hidden><span class="eyebrow">LIVE MSX1</span><div id="msx-mount"></div><p class="input-help">Numbered BASIC program, executed by WebMSX. Screen capture checks the output after RUN.</p></div>' : ''}
    <details class="lab-help"><summary>Need a nudge?</summary><p id="code-hint"></p><button class="text-button" id="show-solution">Show a working solution</button><pre id="code-solution" hidden></pre></details>
    <p class="lab-foot">Quiz rounds work offline. The optional coding engines need an internet connection on first load. ${isPython ? 'Python: Pyodide 0.28.3.' : 'MSX1: WebMSX 6.0.8.'} Output checks ignore surrounding spaces and blank lines.</p>
  </section>`;
  const element = id => container.querySelector(`#${id}`);
  const editor = element('code-editor'), status = element('run-status');
  function setStatus(text, passed = false) { if (!active) return; status.textContent = text; status.classList.toggle('passed', passed); }
  function setBusy(value) {
    busy = value; if (!active) return;
    element('run-code').disabled = value; element('stop-code').disabled = !value;
    element('challenge-select').disabled = value; element('reset-code').disabled = value;
    editor.readOnly = value;
  }
  function loadChallenge() {
    const challenge = labChallenges[challengeIndex];
    element('challenge-title').textContent = challenge.title;
    element('challenge-prompt').textContent = challenge.prompt;
    element('target-output').textContent = challenge.expected;
    editor.value = drafts.get(challengeIndex) ?? challenge.starter;
    element('code-hint').textContent = challenge.hint;
    element('code-solution').hidden = true;
    element('code-solution').textContent = challenge.solution;
    element('code-output').textContent = 'Run your code to see its output.';
    setStatus('');
  }
  element('challenge-select').addEventListener('change', e => { drafts.set(challengeIndex, editor.value); challengeIndex = Number(e.target.value); loadChallenge(); });
  element('reset-code').addEventListener('click', () => { drafts.delete(challengeIndex); loadChallenge(); });
  element('show-solution').addEventListener('click', () => { element('code-solution').hidden = !element('code-solution').hidden; });
  editor.addEventListener('keydown', e => { if (e.key === 'Tab') { e.preventDefault(); editor.setRangeText('    ', editor.selectionStart, editor.selectionEnd, 'end'); } });
  element('stop-code').addEventListener('click', () => { runToken++; pythonRunner.stop(); window.WMSX?.room?.keyboard?.cancelTypeString(); window.WMSX?.room?.machine?.powerOff(); setStatus('Stopped. You can edit the code and run again.'); setBusy(false); });
  element('lab-back').addEventListener('click', onExit);
  element('run-code').addEventListener('click', async () => {
    if (busy || !editor.value.trim()) { if (!editor.value.trim()) setStatus('Write a program first.'); return; }
    const token = ++runToken; const running = () => active && runToken === token;
    setBusy(true); element('code-output').textContent = '';
    try {
      let output, error = '';
      if (isPython) {
        const result = await pythonRunner.run(editor.value, setStatus);
        output = result.output; error = result.error;
      } else {
        if (!/^\s*\d+\s+\S/m.test(editor.value) || editor.value.split('\n').some(line => line.trim() && !/^\s*\d+\s+/.test(line))) throw new Error('Use numbered MSX BASIC program lines, for example: 10 PRINT "HELLO"');
        if (editor.value.length > 4000) throw new Error('Keep these practice programs under 4000 characters.');
        setStatus('Loading MSX1… First load needs an internet connection.');
        await loadMSX(); if (!running()) return;
        element('msx-display-panel').hidden = false;
        if (!msxHost) { msxHost = document.createElement('div'); msxHost.id = 'wmsx-screen'; }
        element('msx-mount').append(msxHost);
        if (!window.WMSX.room) {
          const width = element('msx-mount').clientWidth || 500;
          Object.assign(window.WMSX, {AUTO_START: false, ALLOW_URL_PARAMETERS: false, MACHINE: 'MSX1A', PRESETS: 'NODISK', FAST_BOOT: 1, AUTO_POWER_ON_DELAY: 0, SCREEN_ELEMENT_ID: 'wmsx-screen', SCREEN_DEFAULT_SCALE: Math.min(1, Math.max(0.25, width / (544 * 1.14))), SCREEN_DEFAULT_ASPECT: 1.14, SCREEN_FULLSCREEN_MODE: 0, SCREEN_FILTER_MODE: 0, SCREEN_CRT_SCANLINES: 0, SCREEN_CONTROL_BAR: 0, ENVIRONMENT: 83, JOYKEYS_MODE: -1, TOUCH_MODE: 0, Z80_CLOCK_MODE: 2});
          window.WMSX.start();
        } else { window.WMSX.room.keyboard.cancelTypeString(); window.WMSX.room.machine.powerOn(); }
        await waitMSX(() => {
          const text = window.WMSX.room?.machine.vdp.getScreenText() || '';
          return text.includes('MSX BASIC') && text.includes('Ok') && !text.includes('RDEND');
        }, running, 15000);
        setStatus('Running MSX BASIC 1…');
        const program = editor.value.replace(/\r/g, '').replace(/\n/g, '\r');
        // Clear entered source before RUN. Only text after the executed marker is graded.
        window.WMSX.room.keyboard.typeString(`NEW\r${program}\rSCREEN 0:WIDTH 40:CLS\rPRINT "RDSTART"\rRUN\rPRINT "RDEND"\r`);
        const screenText = await waitMSX(() => {
          const lines = window.WMSX.room.machine.vdp.getScreenText().split('\n').map(line => line.trim());
          const begin = lines.lastIndexOf('RDSTART'), end = lines.lastIndexOf('RDEND');
          return begin >= 0 && end > begin ? lines.slice(begin + 1, end).join('\n') : null;
        }, running, 10000);
        const lines = screenText.split('\n').filter(line => line !== 'RUN' && line !== 'Ok' && !/^PRINT\s*"RDEND"$/i.test(line));
        output = lines.join('\n');
        if (/\b(?:error|without|undefined|overflow|out of|illegal|syntax)\b/i.test(output)) error = 'MSX BASIC reported an error. Check the live screen and your numbered lines.';
      }
      if (!running()) return;
      element('code-output').textContent = output + (error ? `${output ? '\n' : ''}${error}` : '') || '(No output)';
      const passed = !error && normalizeOutput(output) === normalizeOutput(labChallenges[challengeIndex].expected);
      setStatus(passed ? 'Output matches. Nicely done.' : error ? 'Fix the error and run again.' : 'Output differs from the target. Edit your code and try again.', passed);
    } catch (error) {
      if (running()) { setStatus(error.message); if (!isPython) { window.WMSX?.room?.keyboard?.cancelTypeString(); window.WMSX?.room?.machine?.powerOff(); } }
    } finally { if (running()) setBusy(false); }
  });
  loadChallenge(); container.querySelector('h1').focus({preventScroll: true});
  return () => { active = false; runToken++; pythonRunner.stop(); if (!isPython) parkMSX(); };
}
