// IMDG Code, Amendment 42-24 (mandatory 1 January 2026), chapter 7.2.
// General-table X and explosives-table X have DIFFERENT meanings.
export const IMDG_SOURCE = {
  name: 'IMO · IMDG 42-24 · MSC.556(108)',
  url: 'https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.556%28108%29.pdf',
};
export const SEGREGATION_TERMS = {
  '1': 'Away from',
  '2': 'Separated from',
  '3': 'Separated by a complete compartment or hold from',
  '4': 'Separated longitudinally by an intervening complete compartment or hold from',
  X: 'Consult the Dangerous Goods List for specific segregation provisions',
  '*': 'Use the Class 1 compatibility provisions in 7.2.7.1',
};
export const GENERAL_CLASSES = ['1.1/1.2/1.5', '1.3/1.6', '1.4', '2.1', '2.2', '2.3', '3', '4.1', '4.2', '4.3', '5.1', '5.2', '6.1', '6.2', '7', '8', '9'];
export const GENERAL_MATRIX = [
  '* * * 4 2 2 4 4 4 4 4 4 2 4 2 4 X',
  '* * * 4 2 2 4 3 3 4 4 4 2 4 2 2 X',
  '* * * 2 1 1 2 2 2 2 2 2 X 4 2 2 X',
  '4 4 2 X X X 2 1 2 2 2 2 X 4 2 1 X',
  '2 2 1 X X X 1 X 1 X X 1 X 2 1 X X',
  '2 2 1 X X X 2 X 2 X X 2 X 2 1 X X',
  '4 4 2 2 1 2 X X 2 2 2 2 X 3 2 X X',
  '4 3 2 1 X X X X 1 X 1 2 X 3 2 1 X',
  '4 3 2 2 1 2 2 1 X 1 2 2 1 3 2 1 X',
  '4 4 2 2 X X 2 X 1 X 2 2 X 2 2 1 X',
  '4 4 2 2 X X 2 1 2 2 X 2 1 3 1 2 X',
  '4 4 2 2 1 2 2 2 2 2 2 X 1 3 2 2 X',
  '2 2 X X X X X X 1 X 1 1 X 1 X X X',
  '4 4 4 4 2 2 3 3 3 2 3 3 1 X 3 3 X',
  '2 2 2 2 1 1 2 2 2 2 1 2 X 3 X 2 X',
  '4 2 2 1 X X X 1 1 1 2 2 X 3 2 X X',
  'X X X X X X X X X X X X X X X X X',
].map(row => row.split(' '));

export function generalSegregation(a, b) {
  const group = c => ['1.1', '1.2', '1.5'].includes(c) ? GENERAL_CLASSES[0] : ['1.3', '1.6'].includes(c) ? GENERAL_CLASSES[1] : c;
  const i = GENERAL_CLASSES.indexOf(group(a)), j = GENERAL_CLASSES.indexOf(group(b));
  if (i < 0 || j < 0) throw new RangeError('Unknown IMDG class or division.');
  return GENERAL_MATRIX[i][j];
}

export const COMPATIBILITY_GROUPS = 'A B C D E F G H J K L N S'.split(' ');
// Entries are the X cells; the suffix is the associated table note.
export const COMPATIBILITY_ROWS = {
  A: { A: 0 }, B: { B: 0, S: 0 },
  C: { C: 0, D: 6, E: 6, G: 1, N: 4, S: 0 },
  D: { C: 6, D: 0, E: 6, G: 1, N: 4, S: 0 },
  E: { C: 6, D: 6, E: 0, G: 1, N: 4, S: 0 },
  F: { F: 0, S: 0 }, G: { C: 1, D: 1, E: 1, G: 0, S: 0 },
  H: { H: 0, S: 0 }, J: { J: 0, S: 0 }, K: { K: 0, S: 0 },
  L: { L: 2 }, N: { C: 4, D: 4, E: 4, N: 3, S: 5 },
  S: { B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, J: 0, K: 0, N: 5, S: 0 },
};
export function class1Compatibility(a, b) {
  if (!COMPATIBILITY_GROUPS.includes(a) || !COMPATIBILITY_GROUPS.includes(b)) return { status: 'unknown', note: null };
  const note = COMPATIBILITY_ROWS[a][b];
  return note === undefined ? { status: 'forbidden', note: null } : { status: note ? 'conditional' : 'permitted', note };
}

const cargoQuestion = (id, level, focus, topic, prompt, options, explanation, extra = {}) => ({
  id: `cargo-${id}`, category: 'cargo', level, focus, topic, prompt, options, explanation,
  source: 'imdg', jurisdiction: 'IMDG 42-24 · packaged dangerous goods', ...extra,
});
const pair = (a, b, context) => ({ cargo: { a, b, context } });
export const CARGO_QUESTIONS = [
  cargoQuestion('missing-letters', 1, 'class1', 'Full classification', 'A booking lists only explosive divisions 1.1 and 1.2. Can you decide whether they may share a closed cargo transport unit (CTU)?', ['No: obtain compatibility groups and the full applicable cargo provisions', 'No: every 1.1/1.2 pairing is forbidden', 'Yes: every Class 1 pairing is permitted', 'Yes: place the smaller consignment at the door'], 'Divisions describe explosion hazards; compatibility letters determine this Class 1 mixed-stowage check. For example, B/D is blank (not permitted), whereas D/D is X (permitted by the table). Full cargo entries and other applicable provisions still matter.', { reference: '7.2.7.1.1–7.2.7.1.4', page: 491, ...pair('1.1 · group unknown', '1.2 · group unknown', 'Proposed: same closed CTU') }),
  cargoQuestion('bd-separate', 1, 'class1', 'Container placement', 'Closed CTUs contain 1.1B and 1.2D. Their compatibility-table cell is blank. Which plan meets the Class 1 segregation requirement in 7.2.7.1.5?', ['Apply “separated from” between the closed CTUs using the applicable ship/CTU provisions', 'Put them next to each other because both are Class 1', 'Use one shared closed CTU', 'Change 1.2D to 1.4S on the shipping label'], 'B/D is not an authorized mixed-stowage combination. Under 7.2.7.1.5, closed CTUs whose explosives are not authorized together must be “separated from” one another. The physical arrangement comes from the relevant ship and CTU rules.', { reference: '7.2.7.1.4–7.2.7.1.5', page: 491, ...pair('1.1B', '1.2D', 'Two closed CTUs on a ship') }),
  cargoQuestion('dd-most-stringent', 2, 'class1', 'Mixed explosive divisions', 'The D/D compatibility check permits 1.1D and 1.2D in one hold. Which hazard division governs the allowed mixed load for stowage?', ['Division 1.1', 'Division 1.2', 'Whichever consignment is lighter', 'Division 1.4 automatically'], '7.2.7.1.2 requires the most stringent stowage provisions. Under 7.2.7.1.3, 1.1 has higher precedence than 1.2. Table permission is one check, not complete loading approval.', { reference: '7.2.7.1.2–7.2.7.1.3', page: 491, ...pair('1.1D', '1.2D', 'Mixed stowage already permitted by the compatibility check') }),
  cargoQuestion('x-difference', 1, 'class1', 'Find the mistake', 'A planner says: “X always means mixed stowage is permitted, whichever IMDG table I use.” What is wrong?', ['X permits the explosives compatibility-table pairing; general-table X instead directs you to the DGL', 'X always means completely forbidden', 'X always means 3 metres', 'Both tables use X to mean no paperwork'], 'The two tables use X differently. In 7.2.7.1.4 it marks a permitted Class 1 combination, subject to any note. In 7.2.4 it directs the reader to the Dangerous Goods List for specific provisions.', { reference: '7.2.4 and 7.2.7.1.4', page: 487 }),
  cargoQuestion('l-note', 3, 'class1', 'Conditional compatibility', 'Two group L consignments have an X with note 2. What extra condition must be met before using that permission?', ['They must be the same type of consignment within group L', 'Any two group L types may always be mixed', 'One must be relabelled group S', 'Both must have the same package colour'], 'Note 2 permits group L mixed stowage only with the same type of consignment within that compatibility group. The letter alone is insufficient here.', { reference: '7.2.7.1.4 note 2', page: 492, ...pair('Group L · type A', 'Group L · type B', 'Proposed: same hold or closed CTU') }),
  cargoQuestion('g-fireworks', 3, 'class1', 'Conditional compatibility', 'You want to mix group G fireworks with group D articles. Can the G/D table note 1 itself authorize this?', ['No: note 1 applies to group G articles other than fireworks, with additional conditions', 'Yes: all group G goods qualify', 'Yes: if the fireworks are small', 'Yes: division numbers replace the note'], 'Note 1 excludes fireworks from its permission for group G articles with C/D/E articles; it also requires no explosive substances in that hold or closed CTU. Do not turn a conditional X into a blanket permission.', { reference: '7.2.7.1.4 note 1', page: 492 }),
  cargoQuestion('n-proof', 3, 'class1', 'Conditional compatibility', 'Different types of 1.6N articles are proposed together. What does compatibility-table note 3 require?', ['Proof that there is no added sympathetic-detonation risk; otherwise treat them as division 1.1', 'Only equal gross mass', 'Only matching package sizes', 'No condition because both are 1.6N'], 'The note allows different types of 1.6N articles together only if the stated additional risk is absent. Otherwise the articles are treated as division 1.1.', { reference: '7.2.7.1.4 note 3', page: 492 }),
  cargoQuestion('cde-articles', 2, 'class1', 'Mixed compatibility groups', 'An allowed mixed load contains explosive ARTICLES of groups C and D. Under note 6, which compatibility group is assigned to that combination?', ['Group E', 'Group S', 'Group A', 'Always group C'], 'Note 6 assigns any combination of articles in groups C, D and E to group E. Its separate rule for explosive substances of C and D uses the most appropriate classification based on combined properties.', { reference: '7.2.7.1.4 note 6', page: 492 }),
  cargoQuestion('ns-group', 3, 'class1', 'Mixed compatibility groups', 'Groups N and S are stowed together under note 5. Which compatibility group is assigned to the entire load?', ['Group N', 'Group S', 'Group A', 'No compatibility group'], 'Note 5 treats the entire combined N/S load as group N.', { reference: '7.2.7.1.4 note 5', page: 492 }),
  cargoQuestion('dgl-priority', 1, 'general', 'Loading-plan checks', 'The general segregation table and the specific DGL column 16b provision conflict. Which takes precedence?', ['The specific Dangerous Goods List column 16b provision', 'The general table always overrides it', 'The container’s paint colour', 'The cargo that arrived first'], '7.2.3.1 requires both checks and gives column 16b precedence when they conflict. Use the complete UN entry and applicable special provisions.', { reference: '7.2.3.1', page: 486 }),
  cargoQuestion('same-ctu', 2, 'general', 'Container packing', 'Two ordinary full-regulation consignments have an applicable segregation requirement. No exception applies. Can putting their packages at opposite ends of the SAME CTU satisfy it?', ['No: they must not be transported in the same CTU under 7.2.3.2', 'Yes: opposite corners always satisfy every term', 'Yes: add a cardboard divider', 'Yes: close the CTU doors'], '7.2.3.2 excludes a shared outer packaging and shared CTU when a segregation term applies, subject to the cited exceptions. A shipboard separation plan does not make incompatible co-packing acceptable.', { reference: '7.2.3.2', page: 486 }),
  cargoQuestion('subsidiary', 2, 'general', 'Subsidiary hazards', 'A consignment has one subsidiary hazard that requires stricter segregation than its primary class. What governs?', ['The stricter subsidiary-hazard segregation requirement', 'Only the primary hazard label', 'Only the gross mass', 'Only the container size'], '7.2.3.3 says to use the more stringent requirement when a single subsidiary hazard is stricter. With two or more subsidiary hazards, consult the specific DGL column 16b provisions.', { reference: '7.2.3.3–7.2.3.4', page: 486 }),
  cargoQuestion('no-fixed-distance', 1, 'general', 'Practical placement', 'You read “separated from” in an IMDG question. Is that enough to assign one universal number of metres for every cargo ship?', ['No: use the applicable ship type, CTU arrangement and relevant segregation provisions', 'Yes: it always means 1 metre', 'Yes: it always means adjacent slots', 'Yes: it always means separate ports'], '7.2.2 explains that segregation uses distances and/or steel bulkheads and decks, with terms defined for the type of ship and CTU arrangement. Do not apply a general-cargo example as a universal container-ship rule.', { reference: '7.2.2', page: 486 }),
  cargoQuestion('class5', 1, 'labels', 'Hazard sorting', 'Which pair correctly sorts these cargo labels: 5.1 and 5.2?', ['5.1 oxidizing substances; 5.2 organic peroxides', '5.1 flammable liquids; 5.2 corrosives', '5.1 radioactive; 5.2 infectious', '5.1 explosives; 5.2 miscellaneous'], 'Class 5 distinguishes oxidizing substances (5.1) from organic peroxides (5.2). Their reactions and specific cargo provisions make that distinction useful in stowage decisions.', { reference: '2.5', page: null }),
  cargoQuestion('water-reactive', 1, 'labels', 'Hazard sorting', 'A cargo releases flammable gas on contact with water. Which division describes that hazard?', ['4.3', '4.1', '2.2', '6.2'], 'Division 4.3 covers substances that, in contact with water, emit flammable gases. Protecting the cargo from water and checking its particular entry are central to its handling.', { reference: '2.4.4', page: null }),
  cargoQuestion('un-entry', 1, 'general', 'Cargo information', 'Two consignments both have Class 8 labels. What should you obtain before making their complete segregation plan?', ['Their full UN entries, subsidiary hazards and specific segregation provisions', 'Only the largest package dimensions', 'Only their common class number', 'Only the voyage length'], 'Class numbers support the general table lookup, but specific entries, chemical segregation groups, subsidiary risks and other applicable provisions can add requirements.', { reference: '7.2.3–7.2.5', page: 486 }),
];

const simpleExplosivePairs = [
  ['1.1B', '1.2D'], ['1.1D', '1.2D'], ['1.1B', '1.4S'], ['1.1D', '1.4S'],
  ['1.3C', '1.2F'], ['1.3G', '1.4S'], ['1.1A', '1.4S'], ['1.2H', '1.2J'],
  ['1.2F', '1.4S'], ['1.2J', '1.4S'], ['1.3C', '1.3C'], ['1.1D', '1.2F'],
];
const classLabels = { '1.1': 'Explosives · mass explosion', '1.2': 'Explosives · projection hazard', '1.3': 'Explosives · fire/minor blast or projection', '1.4': 'Explosives · small hazard', '2.1': 'Flammable gas', '2.2': 'Non-flammable, non-toxic gas', '2.3': 'Toxic gas', '3': 'Flammable liquid', '4.1': 'Flammable solid / related hazards', '4.2': 'Spontaneously combustible', '4.3': 'Dangerous when wet', '5.1': 'Oxidizing substance', '5.2': 'Organic peroxide', '6.1': 'Toxic substance', '6.2': 'Infectious substance', '7': 'Radioactive material', '8': 'Corrosive substance', '9': 'Miscellaneous dangerous goods' };
export function makeCargoQuestion(settings, rng = Math.random) {
  const focus = settings.cargoFocus || 'segregation';
  const explosives = focus === 'class1' || (focus !== 'general' && focus !== 'labels' && rng() < 0.45);
  if (explosives) {
    const [a, b] = simpleExplosivePairs[Math.floor(rng() * simpleExplosivePairs.length)];
    const ga = a.at(-1), gb = b.at(-1), result = class1Compatibility(ga, gb);
    const allowed = result.status === 'permitted';
    return cargoQuestion(`pair-${a}-${b}`, 1, 'class1', 'Same-container compatibility', `For ${a} and ${b}, what does the Class 1 compatibility table say about mixed stowage in the same closed CTU?`, [
      allowed ? 'Permitted by this compatibility-table check; complete the other applicable checks' : 'Not permitted together: use separate closed CTUs and apply “separated from” between them',
      allowed ? 'Forbidden solely because the divisions must always match' : 'Permitted because both consignments are Class 1',
      'Permitted if separated by cardboard inside one CTU', 'The compatibility letters have no effect',
    ], `${ga}/${gb} is ${allowed ? 'an X cell, so this table permits the combination' : 'a blank cell, so this table does not permit the combination'}. ${allowed ? 'Use the most stringent stowage provisions for the whole mixed load and check the full cargo entries.' : '7.2.7.1.1 requires separate compartments/holds/closed CTUs. For separate closed CTUs, 7.2.7.1.5 requires “separated from”.'} Division numbers alone are not the compatibility test.`, { reference: '7.2.7.1.1–7.2.7.1.5', page: 491, ...pair(a, b, 'Proposed: same closed CTU') });
  }
  const classes = Object.keys(classLabels);
  const a = classes[Math.floor(rng() * classes.length)], b = classes[Math.floor(rng() * classes.length)];
  const key = generalSegregation(a, b), correct = SEGREGATION_TERMS[key];
  const rest = Object.values(SEGREGATION_TERMS).filter(x => x !== correct);
  const distractors = rest.slice(0, 3);
  return cargoQuestion(`general-${a}-${b}`, 1, 'general', 'General segregation lookup', `Class/division ${a} and ${b}: what is the starting result in the general segregation table 7.2.4? Use primary hazards only for this table-reading exercise.`, [correct, ...distractors], `The ${a}/${b} cell is ${key}: “${correct}”. ${key === 'X' ? 'This is not blanket permission to place the cargo together.' : key === '*' ? 'Obtain the explosive compatibility groups and apply the Class 1 provisions.' : 'Apply the term through the relevant ship/CTU provisions.'} Then check DGL column 16b (which takes precedence), subsidiary hazards and other applicable provisions before approving any plan.`, { reference: '7.2.3.1 and 7.2.4', page: 487, ...pair(`${a} · ${classLabels[a]}`, `${b} · ${classLabels[b]}`, 'General-table exercise · full loading approval requires further checks') });
}
