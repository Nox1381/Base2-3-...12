// Procedural naming-only exercises. All product names and stems are fictional teaching labels.
const pickNaming = (items, rng) => items[Math.min(items.length - 1, Math.floor(rng() * items.length))];
const TOPICS = ['systems', 'inn', 'brand', 'bio', 'rules'];
const LABELS = {
  systems: ['Name-system decisions', 'IUPAC · chemical nomenclature', 'namingIupac'],
  inn: ['WHO INN design', 'WHO · hypothetical training stems', 'namingWho'],
  brand: ['Proprietary-name screening', 'US · FDA proprietary-name guidance', 'namingFda'],
  bio: ['US biologic-name suffixes', 'US · FDA 2017 suffix guidance', 'namingBio'],
  rules: ['Regulatory naming workflow', 'US FDA / EU EMA / WHO / IUPAC', 'namingEma'],
};
const VOWELS = ['luma', 'tori', 'meva', 'kora', 'seni', 'zala', 'viro', 'neza', 'mira', 'feno'];
const STEMS = ['vex', 'lun', 'mox', 'zun', 'qar', 'ren', 'til', 'pav'];
const SUFFIXES = ['qzrt', 'vpkm', 'nqrs', 'fbxr', 'twqn', 'bdvz', 'mkqp', 'qxvz'];
export function makeNamingGeneratedQuestion(settings, rng = Math.random) {
  const focus = settings.namingFocus && settings.namingFocus !== 'all' ? settings.namingFocus : pickNaming(TOPICS, rng);
  if (!LABELS[focus]) throw new RangeError('Unknown naming focus');
  const level = Number(settings.difficulty) || 1;
  const variant = Math.floor(rng() * 4);
  const root = pickNaming(VOWELS, rng);
  const serial = 100 + Math.floor(rng() * 800);
  let prompt, options, explanation;
  if (focus === 'systems') {
    if (variant % 2 === 0) {
      prompt = 'A fictitious substance is labelled DEVELOPMENT-' + serial + ' in a research notebook. Which naming role does that identifier play?';
      options = ['Internal development code', 'WHO-recommended INN', 'IUPAC systematic chemical name', 'Approved commercial brand'];
      explanation = 'A company tracking code is a research identifier. Neither its format nor its use grants WHO naming status or marketing approval.';
    } else {
      prompt = 'A scientist describes an imaginary compound by a systematic structural descriptor including bond positions and stereochemistry. Which naming objective is being served?';
      options = ['Precise chemical identity', 'Exclusive product branding', 'Manufacturer identification', 'Retail trademark clearance'];
      explanation = 'IUPAC nomenclature encodes information about molecular structure rather than commercial rights.';
    }
  } else if (focus === 'inn') {
    const stem = pickNaming(STEMS, rng);
    const candidates = [root + stem, root + 'ta', root + 'mi', root + 'no'];
    if (variant % 2 === 0) {
      prompt = 'Training scenario: assume the fictional suffix -' + stem + ' is a protected WHO INN stem. Which proposed fictional brand should be rejected for using that stem?';
      options = candidates;
      explanation = 'The first option contains the hypothetical protected stem -' + stem + '. WHO discourages appropriating common INN stems in trademarks. The stem and all names here are invented teaching examples.';
    } else {
      prompt = 'A proposed WHO INN for fictional candidate ' + root.toUpperCase() + '-' + serial + ' faces an unresolved formal trademark objection. Which step is appropriate?';
      options = ['Hold recommended publication until the objection is resolved', 'Automatically approve the INN on the objection deadline', 'Register the name as a private commercial trademark', 'Treat the development code as a chemical name'];
      explanation = 'WHO does not publish a proposed INN as recommended while a formal objection is maintained.';
    }
  } else if (focus === 'brand') {
    const first = root + 'ma';
    const confusing = root + 'mma';
    if (variant % 2 === 0) {
      prompt = 'A fictional US brand candidate "' + confusing + '" is proposed while a different product uses "' + first + '". Their written and spoken forms are very close. What should the naming team do?';
      options = ['Investigate look-alike/sound-alike risk and redesign if needed', 'Assume one extra letter is adequate clearance', 'Check only the logo and typography', 'Treat the candidate as an automatically assigned INN'];
      explanation = 'FDA proprietary-name review considers spelling and pronunciation similarity as medication-error risks. Both examples are invented.';
    } else {
      prompt = 'A US sponsor proposes adding a digit "' + (serial % 9 + 1) + '" to a made-up prescription brand to imply dosage frequency. What is the prudent review decision?';
      options = ['Investigate potential prescribing confusion from the modifier', 'Assume every numeral is universally prohibited without exceptions', 'Replace the chemical identity with the digit', 'Approve the modifier because it is memorable'];
      explanation = 'FDA generally advises against error-prone numeric modifiers that can be confused with dosing, though established class conventions may be treated differently.';
    }
  } else if (focus === 'bio') {
    const suffix = pickNaming(SUFFIXES, rng);
    if (variant % 2 === 0) {
      prompt = 'FDA 2017 guidance formatting exercise: which fictional suffix could satisfy the four-lowercase-letter and at-least-three-distinct-letter conditions, before other checks?';
      options = ['-' + suffix, '-aabb', '-QZrt', '-ab' + String(serial % 9)];
      explanation = 'A format-compliant suffix uses four lowercase letters, with at least three distinct characters, preceded by a hyphen. A unique meaningless suffix still needs regulatory assessment.';
    } else {
      prompt = 'A proposed US biologic suffix is "' + suffix.toUpperCase() + '". Which change is needed to satisfy the lowercase-letter element of the FDA 2017 format?';
      options = ['Use lowercase "' + suffix + '" after a hyphen', 'Add two digits to the uppercase suffix', 'Convert the suffix into a marketing slogan', 'Include the full manufacturer name in the suffix'];
      explanation = 'For products covered by the guidance, the suffix must be four lowercase letters attached to the core name with a hyphen; additional distinctness, uniqueness and meaning criteria apply.';
    }
  } else {
    const eu = variant % 2 === 0;
    prompt = eu
      ? 'A fictional medicinal product "' + root + serial + '" seeks an invented commercial name for an EU centralised marketing-authorisation application. Which naming review applies?'
      : 'A fictional prescription product "' + root + serial + '" seeks an invented commercial name for US FDA review. Which naming review applies?';
    options = eu
      ? ['EMA centralised invented-name acceptability review', 'IUPAC structure-name designation', 'WHO recommendation of an INN as the commercial mark', 'A local shipping code verification']
      : ['FDA proprietary-name medication-safety and misleading-name review', 'EMA centralised procedure as the sole US authority', 'IUPAC organic nomenclature review of its trademark', 'Automatic WHO trademark assignment'];
    explanation = eu
      ? 'EMA reviews proposed invented names for centrally processed EU medicines, including public-health and confusion concerns.'
      : 'FDA screens proprietary prescription names for look-alike/sound-alike errors and misleading implications.';
  }
  if (new Set(options).size !== 4) throw new Error('Duplicate generated naming options');
  const [topic, jurisdiction, source] = LABELS[focus];
  const fingerprint = prompt.replace(/\\W/g, '').slice(-100);
  return { id: 'naming-generated-' + focus + '-' + variant + '-' + serial + '-' + root + '-' + fingerprint,
    category: 'naming', level: Math.min(level, variant < 2 ? 1 : 2), topic, focus, prompt, options,
    explanation, jurisdiction, source, hint: 'Identify which naming layer and authority the scenario describes; do not assume one rule applies to every jurisdiction.' };
}
