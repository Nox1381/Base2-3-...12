import { QUESTIONS } from './question-bank.js';
import { makeCargoQuestion } from './cargo.js';
import { makeMathQuestion } from './extra-questions.js';

export const DIGITS = '0123456789AB';
export const CATEGORIES = {
  bases: { name: 'Number bases', short: 'Bases', description: 'Count, convert, and calculate in bases 2–12.', mark: '01', color: '#d9fc72', group: 'numbers' },
  logic: { name: 'Digital logic', short: 'Logic', description: 'Gates, truth tables, counters, and timing.', mark: '02', color: '#d9fc72', group: 'numbers' },
  maths: { name: 'Engineering maths', short: 'Maths', description: 'Units, formulas, calibration, and waveforms.', mark: '03', color: '#f3d884', group: 'numbers' },
  electronics: { name: 'Electronics', short: 'Electronics', description: 'Components, circuits, audio, and fault finding.', mark: '04', color: '#86c9ff', group: 'circuits' },
  electrical: { name: 'Electrical engineering', short: 'Electrical', description: 'Power, motors, batteries, and real loads.', mark: '05', color: '#c4a5ff', group: 'circuits' },
  signals: { name: 'Signals & communication', short: 'Signals', description: 'Sampling, serial links, filtering, and noise.', mark: '06', color: '#81ddd0', group: 'circuits' },
  python: { name: 'Python', short: 'Python', description: 'Read code, fix bugs, and run small programs.', mark: '07', color: '#f3d884', group: 'computing', coding: true },
  msx: { name: 'MSX BASIC 1', short: 'MSX BASIC 1', description: 'Line numbers, loops, graphics, and subroutines.', mark: '08', color: '#ffacdb', group: 'computing', coding: true },
  embedded: { name: 'Embedded systems', short: 'Embedded', description: 'GPIO, sensors, PWM, interrupts, and firmware.', mark: '09', color: '#86c9ff', group: 'computing' },
  architecture: { name: 'Computer architecture', short: 'Architecture', description: 'Memory, CPU instructions, and MSX hardware ideas.', mark: '10', color: '#c4a5ff', group: 'computing' },
  fire: { name: 'Fire safety', short: 'Fire safety', description: 'Extinguishers, placement, and safe decisions.', mark: '11', color: '#ffad85', group: 'safety' },
  cargo: { name: 'Cargo-ship dangerous goods', short: 'IMDG cargo', description: 'Class 1 compatibility, container placement, and segregation.', mark: '12', color: '#81ddd0', group: 'safety' },
};
export const CATEGORY_GROUPS = { numbers: 'Numbers & logic', circuits: 'Circuits & signals', computing: 'Programming & computers', safety: 'Fire & cargo' };

export function shuffle(items, rng = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
const choose = (items, rng) => items[Math.floor(rng() * items.length)];
const integer = (min, max, rng) => min + Math.floor(rng() * (max - min + 1));
export const formatNumber = (n) => Number(n.toFixed(3)).toLocaleString('en-US', { maximumFractionDigits: 3, useGrouping: false });

export function toBase(value, base) {
  if (!Number.isSafeInteger(value) || !Number.isInteger(base) || base < 2 || base > 12) throw new RangeError('Use an integer and a base from 2 to 12.');
  return value.toString(base).toUpperCase();
}

export function parseBase(raw, base) {
  if (!Number.isInteger(base) || base < 2 || base > 12) return null;
  let value = String(raw).trim().toUpperCase().replace(/\s+/g, '');
  if (base === 2) value = value.replace(/^0B/, '');
  if (!/^-?[0-9AB]+$/.test(value)) return null;
  const negative = value.startsWith('-');
  const body = negative ? value.slice(1) : value;
  let result = 0;
  for (const digit of body) { const place = DIGITS.indexOf(digit); if (place >= base) return null; result = result * base + place; if (!Number.isSafeInteger(result)) return null; }
  return negative ? -result : result;
}

function placeValue(n, base) {
  return [...toBase(n, base)].map((digit, i, arr) => `${DIGITS.indexOf(digit)} × ${base}^${arr.length - i - 1}`).join(' + ');
}

export function makeBaseQuestion(settings, rng = Math.random) {
  const base = settings.base === 'any' ? integer(2, 12, rng) : Number(settings.base);
  const level = Number(settings.difficulty);
  const mode = settings.baseMode === 'mixed' ? choose(['count', 'convert', 'arithmetic', 'convert'], rng) : settings.baseMode;
  const max = [0, 30, 255, 4095][level];
  let prompt, value, answerBase = base, explanation, hint, visual, topic;
  if (mode === 'count') {
    const step = level === 3 ? choose([1, 2, 3, -1], rng) : 1;
    const start = integer(step < 0 ? 4 : 0, max, rng);
    const sequence = [start, start + step, start + 2 * step];
    value = start + 3 * step;
    prompt = `Keep counting in base ${base}. What comes next?`;
    visual = `${sequence.map(n => toBase(n, base)).join('  ·  ')}  ·  ?`;
    topic = 'Counting';
    explanation = `The step is ${step} in decimal. The next decimal value is ${value}, written ${toBase(value, base)} in base ${base}. Each digit must be smaller than ${base}.`;
    hint = step === 1 ? `After the largest digit (${DIGITS[base - 1]}), carry 1 into the next column.` : `Find the step in decimal, then write the next value in base ${base}.`;
  } else if (mode === 'convert') {
    const from = level === 1 ? choose([base, 10], rng) : choose([base, 10, integer(2, 12, rng)], rng);
    const to = from === base ? (base === 10 ? choose([2, 3, 8, 12], rng) : 10) : base;
    value = integer(1, max, rng);
    answerBase = to;
    prompt = `Convert this base-${from} number to base ${to}.`;
    visual = `${toBase(value, from)}${subscript(from)}  =  ?${subscript(to)}`;
    topic = 'Conversion';
    explanation = `${toBase(value, from)} in base ${from} = ${placeValue(value, from)} = ${value} in decimal. ${value} in base ${to} is ${toBase(value, to)}.`;
    hint = `Use powers of ${from} to reach decimal. Then repeatedly divide by ${to} and read the remainders backward.`;
  } else {
    const subtract = level > 1 && rng() < 0.5;
    let a = integer(1, Math.max(5, Math.floor(max / 3)), rng), b = integer(1, Math.max(5, Math.floor(max / 4)), rng);
    if (subtract && a < b) [a, b] = [b, a];
    value = subtract ? a - b : a + b;
    prompt = `${subtract ? 'Subtract' : 'Add'} these numbers in base ${base}.`;
    visual = `${toBase(a, base)}${subscript(base)}  ${subtract ? '−' : '+'}  ${toBase(b, base)}${subscript(base)}  =  ?`;
    topic = 'Arithmetic';
    explanation = `In decimal: ${a} ${subtract ? '−' : '+'} ${b} = ${value}. In base ${base}, the result is ${toBase(value, base)}. Carry or borrow using ${base}, rather than 10.`;
    hint = `Each column has a place value that is a power of ${base}. You can convert to decimal as a cross-check.`;
  }
  return { id: `bases-${mode}-${base}-${visual}`, category: 'bases', level, topic, prompt, visual, type: 'base', answer: toBase(value, answerBase), value, answerBase, explanation, hint, inputLabel: `Your answer in base ${answerBase}`, inputHelp: `Digits: ${DIGITS.slice(0, answerBase).split('').join(' ')}${answerBase > 10 ? ' · A = 10' + (answerBase > 11 ? ', B = 11' : '') : ''}` };
}

const subscript = n => String(n).split('').map(x => '₀₁₂₃₄₅₆₇₈₉'[Number(x)]).join('');

export function makeEngineeringQuestion(category, difficulty, rng = Math.random) {
  const level = Number(difficulty);
  const kind = category === 'electronics' ? choose(['led', 'divider', 'gain', ...(level > 1 ? ['rc', 'regulator'] : [])], rng) : choose(['current', 'energy', 'cable', 'runtime', ...(level > 1 ? ['power', 'efficiency'] : [])], rng);
  let prompt, value, unit, explanation, hint, visual = [], topic, source;
  if (kind === 'led') {
    const supply = choose([5, 9, 12], rng), forward = choose([2, 3], rng), current = choose([5, 10, 20], rng);
    value = (supply - forward) / (current / 1000); unit = 'Ω'; topic = 'LED resistor';
    prompt = `You want an LED to draw ${current} mA from a ${supply} V supply. Its forward voltage is ${forward} V. What is the calculated series resistance (before choosing a standard value)?`;
    visual = [['Supply', `${supply} V`], ['LED drop', `${forward} V`], ['Current', `${current} mA`]];
    hint = 'The resistor drops supply voltage minus LED voltage. Convert mA to A, then use R = V/I.';
    explanation = `R = (${supply} − ${forward}) / (${current}/1000) = ${formatNumber(value)} Ω. Select an appropriate standard value and verify resistor power.`;
  } else if (kind === 'divider') {
    const supply = choose([6, 9, 12], rng), top = choose([1, 2, 4, 10], rng), bottom = choose([1, 2, 5, 10], rng);
    value = supply * bottom / (top + bottom); unit = 'V'; topic = 'Voltage divider';
    prompt = `A ${supply} V supply feeds an unloaded divider: ${top} kΩ from supply to output and ${bottom} kΩ from output to ground. What is the output voltage?`;
    visual = [['Supply', `${supply} V`], ['Top resistor', `${top} kΩ`], ['Bottom resistor', `${bottom} kΩ`]];
    hint = 'Vout = Vin × Rbottom / (Rtop + Rbottom). Assume no load is connected.';
    explanation = `Vout = ${supply} × ${bottom}/(${top} + ${bottom}) = ${formatNumber(value)} V. Connecting a load can change this voltage.`;
  } else if (kind === 'gain') {
    const feedback = choose([10, 22, 47, 100], rng), ground = choose([1, 2, 10], rng);
    value = 1 + feedback / ground; unit = 'V/V'; topic = 'Amplifier gain'; source = 'ti';
    prompt = `An ideal non-inverting op-amp stage has Rf = ${feedback} kΩ and Rg = ${ground} kΩ. What is its closed-loop voltage gain?`;
    visual = [['Feedback Rf', `${feedback} kΩ`], ['Ground Rg', `${ground} kΩ`]];
    hint = 'For a non-inverting stage, gain = 1 + Rf/Rg.';
    explanation = `Gain = 1 + ${feedback}/${ground} = ${formatNumber(value)} V/V. This assumes operation within the amplifier’s linear limits.`;
  } else if (kind === 'rc') {
    const r = choose([1, 4.7, 10, 22], rng), c = choose([10, 22, 100, 220], rng);
    value = 1 / (2 * Math.PI * r * 1000 * c * 1e-9); unit = 'Hz'; topic = 'Audio filtering';
    prompt = `An ideal first-order RC filter has R = ${r} kΩ and C = ${c} nF. What is its cutoff frequency? Give your answer in Hz.`;
    visual = [['Resistance', `${r} kΩ`], ['Capacitance', `${c} nF`]];
    hint = 'fc = 1/(2πRC). Convert kΩ to Ω and nF to F.';
    explanation = `fc = 1/(2π × ${r * 1000} × ${c}×10⁻⁹) ≈ ${formatNumber(value)} Hz. The circuit arrangement determines whether it is high-pass or low-pass.`;
  } else if (kind === 'regulator') {
    const vin = choose([9, 12, 15], rng), vout = 5, current = choose([0.1, 0.25, 0.5], rng);
    value = (vin - vout) * current; unit = 'W'; topic = 'Regulator heat';
    prompt = `A linear regulator converts ${vin} V to ${vout} V while delivering ${current} A. Ignoring its own small supply current, how much heat power does it dissipate?`;
    visual = [['Input', `${vin} V`], ['Output', `${vout} V`], ['Load', `${current} A`]];
    hint = 'Heat dissipation ≈ (Vin − Vout) × I.';
    explanation = `P = (${vin} − ${vout}) × ${current} = ${formatNumber(value)} W. The regulator’s thermal path must handle this heat.`;
  } else if (kind === 'current') {
    const voltage = choose([6, 12, 24], rng), resistance = choose([6, 12, 24, 48], rng);
    value = voltage / resistance; unit = 'A'; topic = 'Load current';
    prompt = `A low-voltage resistive heater has ${resistance} Ω resistance and is connected to ${voltage} V DC. What current does it draw?`;
    visual = [['Voltage', `${voltage} V`], ['Resistance', `${resistance} Ω`]];
    hint = 'Use Ohm’s law: I = V/R.';
    explanation = `I = ${voltage}/${resistance} = ${formatNumber(value)} A, assuming the resistance stays constant.`;
  } else if (kind === 'energy') {
    const watts = choose([40, 60, 100, 1500, 2000], rng), hours = choose([2, 3, 4, 5], rng);
    value = watts * hours / 1000; unit = 'kWh'; topic = 'Energy use';
    prompt = `A ${watts} W appliance runs continuously for ${hours} hours. How much electrical energy does it use, in kWh?`;
    visual = [['Power', `${watts} W`], ['Time', `${hours} hours`]];
    hint = 'Convert watts to kilowatts, then multiply by hours.';
    explanation = `Energy = (${watts}/1000) × ${hours} = ${formatNumber(value)} kWh. Power and energy are different quantities.`;
  } else if (kind === 'cable') {
    const current = choose([1, 2, 5, 10], rng), resistance = choose([0.1, 0.2, 0.5, 1], rng);
    value = current * resistance; unit = 'V'; topic = 'Cable voltage drop';
    prompt = `A DC load draws ${current} A through a cable with ${resistance} Ω TOTAL outgoing-and-return resistance. What voltage is lost in the cable?`;
    visual = [['Current', `${current} A`], ['Loop resistance', `${resistance} Ω`]];
    hint = 'The total loop resistance is already given. Use Vdrop = I × R.';
    explanation = `Vdrop = ${current} × ${resistance} = ${formatNumber(value)} V. Do not double the resistance; it already includes both conductors.`;
  } else if (kind === 'runtime') {
    const ah = choose([2, 4, 7, 10], rng), amps = choose([0.5, 1, 2], rng);
    value = ah / amps; unit = 'hours'; topic = 'Battery runtime';
    prompt = `For an ideal battery with ${ah} Ah of usable capacity and a constant ${amps} A load, what is the estimated runtime? Ignore losses and discharge-rate effects.`;
    visual = [['Usable capacity', `${ah} Ah`], ['Load current', `${amps} A`]];
    hint = 'Runtime in hours = amp-hours / current in amps.';
    explanation = `Runtime = ${ah}/${amps} = ${formatNumber(value)} hours. Real runtime depends on usable capacity, temperature, load, and cutoff voltage.`;
  } else if (kind === 'power') {
    const voltage = choose([12, 24, 48], rng), current = choose([0.5, 1, 2, 5], rng);
    value = voltage * current; unit = 'W'; topic = 'DC power';
    prompt = `A DC motor driver supplies ${voltage} V at ${current} A to a motor. What is the electrical input power to the motor?`;
    visual = [['Voltage', `${voltage} V`], ['Current', `${current} A`]];
    hint = 'For DC input power, use P = V × I.';
    explanation = `P = ${voltage} × ${current} = ${formatNumber(value)} W. Mechanical output power will be lower because of losses.`;
  } else {
    const output = choose([40, 60, 90, 120], rng), efficiency = choose([80, 90, 95], rng);
    value = output / (efficiency / 100); unit = 'W'; topic = 'Converter input';
    prompt = `A power converter delivers ${output} W with ${efficiency}% efficiency. What input power does it require?`;
    visual = [['Output', `${output} W`], ['Efficiency', `${efficiency}%`]];
    hint = 'Efficiency = Pout/Pin, so Pin = Pout / efficiency as a fraction.';
    explanation = `Pin = ${output}/(${efficiency}/100) ≈ ${formatNumber(value)} W. Input power exceeds useful output power.`;
  }
  return { id: `${category}-${kind}-${prompt}`, category, level, type: 'number', topic, prompt, visual, value, answer: formatNumber(value), unit, explanation, hint, source, tolerance: Math.max(Math.abs(value) * 0.02, 0.002), inputLabel: `Your answer in ${unit}`, inputHelp: 'Enter the number in the unit shown. Rounding within 2% is accepted.' };
}

export function prepareChoice(question, rng = Math.random) {
  const correct = question.options[0];
  const options = shuffle(question.options, rng);
  return { ...question, type: 'choice', options, correctIndex: options.indexOf(correct), answer: correct, hint: question.hint || `Think about the ${question.topic.toLowerCase()} decision in this specific situation${question.jurisdiction ? ` and the ${question.jurisdiction} label` : ''}.` };
}

export function checkAnswer(question, input) {
  if (question.type === 'choice') return Number.isInteger(input) && input === question.correctIndex;
  if (question.type === 'base') return parseBase(input, question.answerBase) === question.value;
  const raw = String(input).trim().replace(/,/g, '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) return false;
  const value = Number(raw);
  return Number.isFinite(value) && Math.abs(value - question.value) <= question.tolerance;
}

export function eligibleQuestions(category, settings) {
  return QUESTIONS.filter(q => q.category === category && q.level <= Number(settings.difficulty)
    && (category !== 'fire' || !settings.fireScope || settings.fireScope === 'all' || (settings.fireScope === 'general' ? q.jurisdiction === 'General practice' : q.jurisdiction.startsWith(settings.fireScope === 'us' ? 'US' : 'UK')))
    && (category !== 'cargo' || !settings.cargoFocus || settings.cargoFocus === 'all' || (settings.cargoFocus === 'segregation' ? q.focus !== 'labels' : q.focus === settings.cargoFocus)));
}

export function makeDeck(settings, count = 10, rng = Math.random, previous = new Set()) {
  const categories = settings.category === 'mixed' ? shuffle(Object.keys(CATEGORIES), rng) : [settings.category];
  const pools = Object.fromEntries(categories.map(c => [c, shuffle(eligibleQuestions(c, settings), rng)]));
  const cursor = Object.fromEntries(categories.map(c => [c, 0]));
  const deck = [];
  for (let i = 0; i < count; i++) {
    const category = settings.category === 'mixed' ? categories[i % categories.length] : categories[0];
    let question;
    for (let tries = 0; tries < 30; tries++) {
      if (category === 'bases') question = makeBaseQuestion(settings, rng);
      else if (['electronics', 'electrical'].includes(category) && rng() < 0.45) question = makeEngineeringQuestion(category, settings.difficulty, rng);
      else if (category === 'maths' && rng() < 0.55) question = makeMathQuestion(settings.difficulty, rng);
      else if (category === 'cargo' && settings.cargoFocus !== 'labels' && rng() < 0.55) question = prepareChoice(makeCargoQuestion(settings, rng), rng);
      else {
        const pool = pools[category];
        if (!pool.length) throw new Error('No questions match this selection.');
        question = prepareChoice(pool[cursor[category]++ % pool.length], rng);
      }
      if (!previous.has(question.id) || tries === 29) break;
    }
    previous.add(question.id);
    deck.push(question);
  }
  return settings.category === 'mixed' ? shuffle(deck, rng) : deck;
}
