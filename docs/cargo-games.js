import { CARGO_MODES, CARGO_SIZES, createCargoMission, inspectCargo, moveCargo, slotOf, CARGO_REFERENCE, pairExplanation } from './cargo-games-engine.js?v=20261011-msx-cargo';

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const icons = { B: '◆', D: '◇', F: '▲', H: '◈', J: '⬡', K: '✦' };
const badge = card => `<span class="cargo-hazard" aria-hidden="true">${icons[card.group] || '▣'}</span>`;
const renderCard = (card, selected) => `<button type="button" class="cargo-item ${selected ? 'is-selected' : ''}" data-card="${card.id}" draggable="true" aria-pressed="${selected}" aria-label="${escapeHTML(card.label)}. ${escapeHTML(card.detail)}. Select or drag to move.">${badge(card)}<span><strong>${escapeHTML(card.label)}</strong><small>${escapeHTML(card.detail)}</small></span><span class="cargo-grip" aria-hidden="true">⠿</span></button>`;

export function createCargoArcade(container, onExit) {
  let active = true;
  let mode = 'packer', count = 2, mission = createCargoMission(mode, count);
  let placements = { ...mission.placements };
  let selected = null, history = [], checked = false, success = 0, solvedMission = false, feedback = '';
  const getCard = id => mission.cards.find(card => card.id === id);
  const getReport = () => inspectCargo(mission, placements);
  function statusMarkup() {
    const result = getReport();
    return `<span class="cargo-stat"><strong>${result.placed}</strong> / ${result.total} placed</span><span class="cargo-stat"><strong>${result.findings.length}</strong> conflicts ${mission.kind === 'ship' ? 'in CTUs' : 'after checking'}</span><span class="cargo-stat"><strong>${success}</strong> solved</span>`;
  }
  function renderBoard() {
    const report = getReport();
    if (mission.kind === 'ship') {
      const bins = mission.bins.map(bin => {
        const conflict = checked && report.findings.some(f => f.id === bin.id);
        return `<div class="cargo-ctu ${conflict ? 'has-conflict' : ''}"><div class="cargo-ctu-label"><span class="cargo-ctu-icon" aria-hidden="true">▤</span>${escapeHTML(bin.label)}${conflict ? '<span class="cargo-warning">Conflict</span>' : ''}</div><div class="cargo-ctu-slots">${bin.slots.map(slot => `<div class="cargo-slot" data-slot="${slot}" tabindex="0" role="button" aria-label="Place selected cargo in ${escapeHTML(bin.label)} slot ${slot.endsWith('0') ? 1 : 2}">${placements[slot] ? renderCard(getCard(placements[slot]), selected === placements[slot]) : '<span class="cargo-empty">DROP CARGO HERE <small>or click to place</small></span>'}</div>`).join('')}</div></div>`;
      }).join('');
      return `<div class="cargo-ship"><div class="cargo-ship-top"><span>FORWARD <span aria-hidden="true">➜</span></span><strong>MV RADIX · CLOSED CTUs</strong><span>TRAINING PLAN</span></div><div class="cargo-ship-bays">${bins}</div><div class="cargo-hull" aria-hidden="true"><span></span></div></div>`;
    }
    return `<div class="cargo-sorting-board">${mission.bins.map(bin => {
      const assigned = mission.cards.filter(card => placements[card.id] === bin.id);
      return `<div class="cargo-sort-bin" data-bin="${bin.id}" tabindex="0" role="button" aria-label="Place selected cargo pair in ${escapeHTML(bin.label)}"><strong>${escapeHTML(bin.label)}</strong><div class="cargo-bin-items">${assigned.length ? assigned.map(card => renderCard(card, selected === card.id)).join('') : '<span class="cargo-empty">DROP PAIR HERE</span>'}</div></div>`;
    }).join('')}</div>`;
  }
  function refresh() {
    if (!active) return;
    const report = getReport();
    const modeText = CARGO_MODES.find(x => x.id === mode);
    container.innerHTML = `<section class="cargo-game">
      <div class="lab-top"><button class="text-button" id="cargo-back">← Choose a topic</button><span class="topic-chip">IMDG 42-24 · PRACTICE</span></div>
      <p class="eyebrow">INTERACTIVE CARGO ARCADE</p><h1 tabindex="-1">Stowage simulator</h1><p class="cargo-subhead">Four playable exercises. Drag the marked cargo, or select a card and then a slot. Move an already placed card to reorganize the load.</p>
      <div class="cargo-game-modes" role="group" aria-label="Cargo mini-game">${CARGO_MODES.map(entry => `<button type="button" class="cargo-mode ${entry.id === mode ? 'active' : ''}" data-mode="${entry.id}" aria-pressed="${entry.id === mode}">${escapeHTML(entry.name)}</button>`).join('')}</div>
      <div class="cargo-game-setup"><div><h2>${escapeHTML(modeText.name)}</h2><p>${escapeHTML(modeText.subtitle)}</p></div><label>Pairs in this mission <select id="cargo-size">${CARGO_SIZES.map(size => `<option value="${size}" ${count === size ? 'selected' : ''}>${size} pairs · ${size * 2} items</option>`).join('')}</select></label></div>
      <div class="cargo-game-stats" aria-live="polite">${statusMarkup()}</div>
      <div class="cargo-playfield">
        <div class="cargo-quay" data-quay="quay"><div class="cargo-quay-heading"><strong>QUAYSIDE · CARGO MANIFEST</strong><span>${mission.kind === 'ship' ? 'Individual marked packages' : 'Paired consignments'}</span></div><div class="cargo-quay-cards">${mission.cards.filter(card => !slotOf(placements, card.id) && !(mission.kind === 'sorting' && placements[card.id])).map(card => renderCard(card, selected === card.id)).join('') || '<span class="cargo-quay-clear">All cargo has been assigned. Move items between bays to correct conflicts.</span>'}</div><div class="cargo-quay-drop" data-quay="quay" tabindex="0" role="button">Unload selected cargo here</div></div>
        <div class="cargo-vessel-panel">${renderBoard()}</div>
      </div>
      <div class="cargo-game-actions"><button type="button" class="primary-button" id="cargo-check">Check ${mission.kind === 'ship' ? 'load' : 'answers'} <span aria-hidden="true">✓</span></button><button type="button" class="secondary-button" id="cargo-new">New mission</button><button type="button" class="secondary-button" id="cargo-undo" ${!history.length ? 'disabled' : ''}>Undo move</button><button type="button" class="text-button" id="cargo-reset">Reset</button></div>
      <div class="cargo-result ${checked ? report.passed ? 'cargo-result-pass' : 'cargo-result-issues' : ''}" id="cargo-feedback" role="status" aria-live="polite">${feedback || 'Place the cargo, then check your plan. A table result is not authorization for real-world loading.'}</div>
      <details class="cargo-game-notes"><summary>Rules and scope of this simulation</summary><p>The ship drawing is conceptual, not a scaled distance or approved bay plan. <strong>Pack the CTUs</strong> and <strong>Fix the load</strong> test only Class 1 compatibility within each closed CTU. They do not validate separation between different CTUs, stowage location, vessel type or particular UN entries. In real loading, incompatible Class 1 closed CTUs may require “separated from” under 7.2.7.1.5. <strong>Segregation deck</strong> and <strong>Harbour decisions</strong> test table interpretation, not physical placement. The general-table X means consult the DGL; Class 1 X may have notes and must not be treated as unconditional clearance. All loading needs the current code, DGL columns 16a/16b, subsidiary hazards and competent ship-specific checks.</p><a target="_blank" rel="noopener noreferrer" href="${CARGO_REFERENCE}">Official IMO amendment 42-24 · Chapter 7.2 ↗</a></details>
      <p class="cargo-accessible-tip">Keyboard and touch: select a cargo card, then tap or activate a target slot. Drag and drop also works on desktop.</p>
    </section>`;
    container.querySelector('#cargo-back').addEventListener('click', onExit);
    container.querySelectorAll('[data-mode]').forEach(el => el.addEventListener('click', () => { if (mode === el.dataset.mode) return; mode = el.dataset.mode; newMission(); }));
    container.querySelector('#cargo-size').addEventListener('change', e => { count = Number(e.target.value); newMission(); });
    container.querySelector('#cargo-new').addEventListener('click', newMission);
    container.querySelector('#cargo-undo').addEventListener('click', () => { if (!history.length) return; placements = history.pop(); checked = false; feedback = 'Last move undone.'; selected = null; refresh(); });
    container.querySelector('#cargo-reset').addEventListener('click', () => { placements = {...mission.placements}; selected = null; history = []; checked = false; solvedMission = false; feedback = 'Mission reset.'; refresh(); });
    container.querySelector('#cargo-check').addEventListener('click', check);
    container.querySelectorAll('[data-card]').forEach(el => {
      el.addEventListener('click', event => { event.stopPropagation(); selected = selected === el.dataset.card ? null : el.dataset.card; feedback = selected ? 'Cargo selected. Choose a position or the quayside.' : 'Selection cleared.'; refresh(); });
      el.addEventListener('dragstart', event => { event.dataTransfer.setData('text/plain', el.dataset.card); event.dataTransfer.effectAllowed = 'move'; selected = el.dataset.card; });
    });
    container.querySelectorAll('[data-slot], [data-bin], [data-quay]').forEach(el => {
      const target = el.dataset.slot || el.dataset.bin || 'quay';
      el.addEventListener('dragover', event => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; el.classList.add('cargo-drag-over'); });
      el.addEventListener('dragleave', () => el.classList.remove('cargo-drag-over'));
      el.addEventListener('drop', event => { event.preventDefault(); event.stopPropagation(); el.classList.remove('cargo-drag-over'); place(event.dataTransfer.getData('text/plain'), target); });
      el.addEventListener('click', event => { if (event.target.closest('[data-card]')) return; if (selected) place(selected, target); });
      el.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target === el) { event.preventDefault(); if (selected) place(selected, target); } });
    });
  }
  function newMission() { mission = createCargoMission(mode, count); placements = {...mission.placements}; history = []; selected = null; checked = false; solvedMission = false; feedback = ''; refresh(); }
  function place(cardId, target) {
    if (!getCard(cardId)) return;
    const next = moveCargo(mission, placements, cardId, target);
    if (JSON.stringify(next) === JSON.stringify(placements)) return;
    history.push({ ...placements }); placements = next; selected = null; checked = false;
    const result = getReport();
    feedback = mission.kind === 'ship' && result.findings.length
      ? `You have ${result.findings.length} incompatible or conditional pairing(s). Check the load to identify them.`
      : 'Cargo moved. Complete the manifest, then check the plan.';
    refresh();
  }
  function check() {
    const report = getReport(); checked = true;
    if (!report.passed) {
      feedback = `<strong>${report.placed}/${report.total} cargo entries assigned · ${report.findings.length} issue(s)</strong>${mission.mode === 'repair' && report.findings.length === 0 && report.placed === report.total ? '<p>Resolve the original conflict by making at least one change.</p>' : ''}${report.findings.map(x => `<p>${escapeHTML(x.message)}</p>`).join('')}${report.placed !== report.total ? '<p>Assign every cargo entry before checking again.</p>' : ''}`;
    } else {
      if (!solvedMission) success += 1;
      solvedMission = true;
      feedback = `<strong>Mission passed: all ${report.total} entries checked.</strong><p>${mode === 'packer' || mode === 'repair' ? 'Every closed CTU now contains a pair permitted by the Class 1 compatibility table.' : 'Every table decision is correctly classified.'} This is an educational table check, not a complete ship loading authorization.</p><p>Try another mission, or increase to ${count < 6 ? count + 2 : 6} pairs.</p>`;
    }
    refresh();
  }
  refresh();
  container.querySelector('h1')?.focus({preventScroll:true});
  return () => { active = false; };
}
