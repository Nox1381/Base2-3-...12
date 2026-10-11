import { class1Compatibility, generalSegregation, SEGREGATION_TERMS, IMDG_SOURCE } from './cargo.js?v=20261011-msx-cargo';

export const CARGO_MODES = [
  { id: 'packer', name: 'Pack the CTUs', subtitle: 'Drag Class 1 consignments into closed cargo transport units. Each unit holds two.' },
  { id: 'repair', name: 'Fix the load', subtitle: 'The ship starts with incompatible explosive groups sharing CTUs. Move cargo to resolve every conflict.' },
  { id: 'terms', name: 'Segregation deck', subtitle: 'Move pairs to the correct IMDG general-table term: 1–4, X or *.' },
  { id: 'desk', name: 'Harbour decisions', subtitle: 'Classify compatibility decisions, conditional permissions and DGL lookups.' },
];
export const CARGO_SIZES = [2, 4, 6];
export const CARGO_REFERENCE = IMDG_SOURCE.url;
const GROUPS = [
  { group: 'B', labels: ['1.1B', '1.2B'], cargo: 'Initiation articles' },
  { group: 'D', labels: ['1.1D', '1.2D'], cargo: 'Secondary explosive articles' },
  { group: 'F', labels: ['1.2F', '1.3F'], cargo: 'Articles with means of initiation' },
  { group: 'H', labels: ['1.2H', '1.3H'], cargo: 'Explosive articles containing white phosphorus' },
  { group: 'J', labels: ['1.1J', '1.2J'], cargo: 'Articles containing flammable liquid or gel' },
  { group: 'K', labels: ['1.2K', '1.3K'], cargo: 'Articles containing a toxic chemical agent' },
];
const GENERAL_LABELS = {
  '1.1': 'Explosives 1.1', '1.2': 'Explosives 1.2', '1.4': 'Explosives 1.4',
  '2.1': 'Flammable gas', '2.2': 'Non-flammable gas', '2.3': 'Toxic gas',
  '3': 'Flammable liquid', '4.1': 'Flammable solid', '4.2': 'Spontaneously combustible',
  '4.3': 'Dangerous when wet', '5.1': 'Oxidizer', '5.2': 'Organic peroxide',
  '6.1': 'Toxic substance', '6.2': 'Infectious substance', '7': 'Radioactive material',
  '8': 'Corrosive', '9': 'Miscellaneous',
};
const TERM_CODES = ['1', '2', '3', '4', 'X', '*'];
export const TERM_TARGETS = TERM_CODES.map(id => ({ id, label: id === '*' ? 'Class 1 procedure · *' : id === 'X' ? 'Consult DGL · X' : `${id} · ${SEGREGATION_TERMS[id]}` }));
export const DECISION_TARGETS = [
  { id: 'permitted', label: 'Class 1 table permits' },
  { id: 'forbidden', label: 'Class 1 table forbids' },
  { id: 'conditional', label: 'Class 1 has conditions' },
  { id: 'dgl', label: 'General X · consult DGL' },
  { id: 'term', label: 'General 1–4 · apply term' },
  { id: 'class1', label: 'General * · check Class 1' },
];

const randomInt = (limit, rng) => Math.min(limit - 1, Math.floor(rng() * limit));
function shuffled(items, rng) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, rng);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
const item = (id, label, detail, group) => ({ id, label, detail, group });
export const termForPair = (a, b) => generalSegregation(a, b);
export const class1Result = (a, b) => class1Compatibility(a, b);
export const pairExplanation = (pair) => pair.kind === 'explosive'
  ? `The ${pair.a.group}/${pair.b.group} Class 1 compatibility-table cell is ${pair.result === 'forbidden' ? 'blank (not authorized together)' : pair.result === 'conditional' ? 'X with a condition that needs verification' : 'X (permitted by this table check)'}. This is not full stowage approval; check the actual entries and other provisions. IMDG 7.2.7.1.4–7.2.7.1.5.`
  : `General table 7.2.4: ${pair.a.label} with ${pair.b.label} gives ${pair.code} — ${SEGREGATION_TERMS[pair.code]}. Check the actual DGL column 16b, subsidiary hazards, exceptions and ship/CTU provisions before any real stowage decision.`;

function cargoGroups(count, rng) {
  return shuffled(GROUPS, rng).slice(0, count).map((group, i) => [
    item(`G${i}-a`, group.labels[0], group.cargo, group.group),
    item(`G${i}-b`, group.labels[1], group.cargo, group.group),
  ]);
}
const SAMPLES = ['1.1', '1.2', '1.4', '2.1', '2.2', '2.3', '3', '4.1', '4.2', '4.3', '5.1', '5.2', '6.1', '6.2', '7', '8', '9'];
function generalCatalogue() {
  const list = [];
  for (let i = 0; i < SAMPLES.length; i++) for (let j = i; j < SAMPLES.length; j++) {
    const a = SAMPLES[i], b = SAMPLES[j], code = termForPair(a, b);
    list.push({ a, b, code });
  }
  return list;
}
const GENERAL_CATALOGUE = generalCatalogue();
export function createCargoMission(mode = 'packer', count = 2, rng = Math.random) {
  if (!CARGO_MODES.some(x => x.id === mode)) throw new RangeError('Unknown cargo game.');
  if (!CARGO_SIZES.includes(count)) throw new RangeError('Choose 2, 4, or 6 cargo pairs.');
  if (mode === 'packer' || mode === 'repair') {
    const pairs = cargoGroups(count, rng);
    const cards = shuffled(pairs.flat(), rng);
    const bins = Array.from({ length: count }, (_, i) => ({
      id: `CTU-${i + 1}`, label: `Closed CTU ${i + 1}`, capacity: 2, slots: [`CTU-${i + 1}-0`, `CTU-${i + 1}-1`],
    }));
    const placements = {};
    if (mode === 'repair') {
      pairs.forEach((p, i) => { placements[bins[i].slots[0]] = p[0].id; placements[bins[i].slots[1]] = p[1].id; });
      // Break two or more otherwise valid pairings, while keeping a solvable permutation.
      for (let i = 0; i < count; i += 2) {
        const a = bins[i].slots[1], b = bins[i + 1].slots[1];
        [placements[a], placements[b]] = [placements[b], placements[a]];
      }
    }
    return { mode, count, cards, bins, placements, moves: 0, inspected: false, kind: 'ship' };
  }
  if (mode === 'terms') {
    const choices = shuffled(TERM_CODES, rng).slice(0, count);
    const cards = shuffled(choices.map((code, i) => {
      const options = GENERAL_CATALOGUE.filter(x => x.code === code);
      const pick = options[randomInt(options.length, rng)];
      return { id: `pair-${i}`, label: `${pick.a} + ${pick.b}`, detail: `${GENERAL_LABELS[pick.a]} / ${GENERAL_LABELS[pick.b]}`, code, target: code, a: item('a', pick.a, GENERAL_LABELS[pick.a]), b: item('b', pick.b, GENERAL_LABELS[pick.b]), kind: 'general' };
    }), rng);
    return { mode, count, cards, bins: TERM_TARGETS.map(x => ({ ...x, capacity: count })), placements: {}, moves: 0, kind: 'sorting' };
  }
  const cases = [
    { kind: 'explosive', a: '1.1B', b: '1.2D' },
    { kind: 'explosive', a: '1.1D', b: '1.2D' },
    { kind: 'explosive', a: '1.1L', b: '1.2L' },
    { kind: 'explosive', a: '1.2F', b: '1.3J' },
    { kind: 'explosive', a: '1.3G', b: '1.1D' },
    { kind: 'general', a: '3', b: '5.1' },
    { kind: 'general', a: '3', b: '9' },
    { kind: 'general', a: '1.1', b: '1.2' },
    { kind: 'general', a: '6.2', b: '3' },
    { kind: 'general', a: '8', b: '2.1' },
  ];
  const chosen = shuffled(cases, rng).slice(0, count);
  const cards = shuffled(chosen.map((c, i) => {
    const a = item('a', c.a, GENERAL_LABELS[c.a] || `Explosives ${c.a}`, c.kind === 'explosive' ? c.a.at(-1) : undefined);
    const b = item('b', c.b, GENERAL_LABELS[c.b] || `Explosives ${c.b}`, c.kind === 'explosive' ? c.b.at(-1) : undefined);
    const result = c.kind === 'explosive' ? class1Result(a.group, b.group).status : null;
    const code = c.kind === 'general' ? termForPair(c.a, c.b) : null;
    const target = c.kind === 'explosive' ? result : code === 'X' ? 'dgl' : code === '*' ? 'class1' : 'term';
    return { id: `decision-${i}`, label: `${c.a} + ${c.b}`, detail: c.kind === 'explosive' ? 'Class 1 · same closed CTU' : 'General segregation table', a, b, kind: c.kind, result, code, target };
  }), rng);
  return { mode, count, cards, bins: DECISION_TARGETS.map(x => ({ ...x, capacity: count })), placements: {}, moves: 0, kind: 'sorting' };
}
export function slotOf(placements, cardId) {
  return Object.keys(placements).find(slot => placements[slot] === cardId) || null;
}
export function moveCargo(mission, placements, cardId, target) {
  if (!mission.cards.some(x => x.id === cardId)) return placements;
  const permittedSlots = mission.kind === 'ship' ? mission.bins.flatMap(bin => bin.slots) : mission.bins.map(bin => bin.id);
  if (target !== 'quay' && !permittedSlots.includes(target)) return placements;
  const next = { ...placements };
  const from = mission.kind === 'sorting' ? (next[cardId] ? cardId : null) : slotOf(next, cardId);
  if (from) delete next[from];
  if (target === 'quay') return next;
  if (mission.kind === 'ship') {
    const swapped = next[target];
    next[target] = cardId;
    if (swapped && from) next[from] = swapped;
  } else next[cardId] = target;
  return next;
}
export function inspectCargo(mission, placements = mission.placements) {
  const assignments = mission.kind === 'ship'
    ? mission.bins.flatMap(bin => bin.slots.map(slot => placements[slot]).filter(Boolean))
    : mission.cards.filter(card => !!placements[card.id]).map(card => card.id);
  const placed = new Set(assignments).size;
  const findings = [];
  if (mission.kind === 'ship') {
    for (const bin of mission.bins) {
      const inBin = bin.slots.map(slot => mission.cards.find(card => card.id === placements[slot])).filter(Boolean);
      if (inBin.length === 2) {
        const result = class1Result(inBin[0].group, inBin[1].group);
        if (result.status !== 'permitted') findings.push({
          id: bin.id, message: `${bin.label}: ${inBin[0].label} / ${inBin[1].label} — ${result.status === 'conditional' ? 'conditional compatibility; no automatic approval' : 'not authorized together in the Class 1 table'}.`,
        });
      }
    }
  } else {
    for (const card of mission.cards) if (placements[card.id] && placements[card.id] !== card.target) {
      findings.push({ id: card.id, message: `${card.label}: this belongs in "${mission.bins.find(x => x.id === card.target).label}". ${pairExplanation(card)}` });
    }
  }
  return { placed, total: mission.cards.length, findings, complete: placed === mission.cards.length && findings.length === 0, passed: placed === mission.cards.length && findings.length === 0 && (mission.mode !== 'repair' || Object.keys(placements).some(k => placements[k] !== mission.placements[k])) };
}
