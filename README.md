# Radix · Quiz Lab

A personal browser quiz game with 12 categories, practical scenarios, code questions, and live Python/MSX BASIC 1 coding challenges.

**Repository:** [Nox1381/Base2-3-...12](https://github.com/Nox1381/Base2-3-...12)

## Play on GitHub Pages

The complete static website is in `docs/`.

Enable it once in [Settings → Pages](https://github.com/Nox1381/Base2-3-...12/settings/pages):

1. Under **Build and deployment**, select **Deploy from a branch**.
2. Select branch **main**, folder **/docs**, and click **Save**.
3. Open the URL GitHub displays after publication, normally **https://nox1381.github.io/Base2-3-...12/**.

The URL is only playable after GitHub Pages is enabled and its deployment completes. Future commits to `docs/` publish automatically.

## What you can practice

- **Number bases 2–12:** counting sequences, conversions, addition, and subtraction. Bases 11 and 12 use A = 10 and B = 11. Select one base or mix all of them.
- **Electronics:** LED resistors, guitar-pedal loading and clipping, op-amp gain, RC filters, motor drivers, ADC interfaces, multimeter use, and troubleshooting.
- **Electrical engineering:** actual loads, power, energy, cable voltage drop, motor startup, batteries, transformers, efficiency, and protective devices.
- **Fire safety:** extinguisher access, placement, mounting, checks, servicing, fire classes, agent selection, workplace emergency procedures, and safe responses.
- **Digital logic:** gates, active-low controls, truth tables, flip-flops, latches, debounce, and clock-domain crossings.
- **Engineering maths:** SI prefixes, periods/frequencies, tolerances, formula rearrangement, RMS, decibels, and calibration.
- **Signals and communication:** UART, I²C, SPI, sampling, aliasing, filters, differential links, and transmission-line behaviour.
- **Python:** read output, repair loops, use functions/lists/dictionaries, and find common bugs.
- **MSX BASIC 1:** numbered programs, FOR/NEXT, GOTO, GOSUB/RETURN, DATA/READ/RESTORE, arrays, and MSX1 screen modes.
- **Embedded systems:** GPIO, ADC, PWM, sensor scaling, responsive loops, interrupts, watchdogs, and rollover.
- **Computer architecture:** RAM/ROM, registers, address spaces, byte order, stacks, integer limits, and memory banking.
- **Cargo-ship dangerous goods:** IMDG general segregation lookup, full explosive classifications, compatibility groups, closed-CTU placement, subsidiary hazards, and loading-plan checks.

Choose a topic from four topic groups, or mix all 12. A mixed 20-question round includes every category; a mixed 10-question round samples 10 categories. Use Starter, Standard, or Advanced difficulty. Choose 10 questions, 20 questions, or continuous practice. Every answer has an explanation; calculations show working. Missed questions can be retried at the end. The game uses multiple-choice and written numerical answers, with points and streaks. Questions repeat once a selected finite bank is exhausted.

**Keyboard:** 1–4 selects an option; Enter checks an answer or continues. Numerical engineering answers must use the displayed unit; a 2% rounding tolerance is allowed. Units are shown beside the input, so type just the number.

## Cargo segregation: divisions are not compatibility groups

The cargo category uses **IMDG Amendment 42-24**, mandatory from 1 January 2026, with the December 2025 errata checked. It focuses on packaged dangerous goods, not bulk cargo codes.

Explosive divisions **1.1 and 1.2 alone do not decide whether two consignments may be stowed together**. Under 7.2.7.1.4:

- **1.1B + 1.2D:** the B/D cell is blank, so mixed stowage in the same compartment, hold or closed CTU is not permitted by this table. Separate closed CTUs must be **“separated from”** each other under 7.2.7.1.5.
- **1.1D + 1.2D:** the D/D cell is X, so the compatibility table permits the combination. The most stringent stowage provisions apply to the entire load, with division 1.1 taking precedence. Other cargo and vessel provisions still require checks.
- **Conditional X entries:** the table notes matter, including special conditions for G, L and N and classification of mixed loads.

In the **general** segregation table, X instead means to consult the Dangerous Goods List for specific provisions. It is not automatic permission to put the goods together. DGL column 16b takes precedence over a conflicting general table entry. Subsidiary hazards and chemical segregation provisions can add requirements.

Questions distinguish same-CTU compatibility from separation between closed CTUs. They teach segregation terms without inventing one universal distance for all ships. This is a study game: a full loading plan also requires the complete UN entries, current code, vessel/CTU provisions and competent operational checks.

- [Official IMO resolution MSC.556(108), complete Amendment 42-24](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.556%28108%29.pdf) — 7.2.3, 7.2.4, and 7.2.7.1. Source links in each answer include the section and relevant PDF page.
- [IMO December 2025 errata](https://wwwcdn.imo.org/localresources/en/publications/Documents/Supplements/English/QO200E_errata_December2025_PQ.pdf)

## Coding challenges

Select **Python** or **MSX BASIC 1**, then **Open coding challenges**. Each has six small repair/build tasks, a target output, hints, a working solution, Run, Stop, and Reset. The editor preserves your draft while switching challenges. Output comparison ignores leading/trailing line whitespace and blank lines; it verifies output rather than enforcing a particular algorithm.

- Python runs genuine CPython using pinned [Pyodide 0.28.3](https://pyodide.org/en/0.28.3/usage/webworker.html) in a separate worker. Runs have a five-second limit and can be stopped without freezing the quiz. Input prompts have no stdin in these exercises and will receive EOF.
- MSX BASIC runs on a genuine **MSX1** using pinned [WebMSX 6.0.8](https://github.com/ppeccin/WebMSX/tree/4f4009e86d3e0bb9be7dcd7f0a582b0cd411d660). The live screen is visible; only screen output after RUN is compared. Each Run starts a fresh program. Numbered programs should fit within 4000 characters. These short tasks use text mode, not graphical output checks.

Coding engines load on demand from jsDelivr and need internet access on first load. A failed load gives a retry message; quizzes remain available offline. Stop or timeout recovers from infinite loops. Running your edited code executes it inside the browser runtime; it is not an exam or a hardened sandbox for untrusted third-party code.

Language references: [Python tutorial](https://docs.python.org/3/tutorial/) and [MSX BASIC instructions and version compatibility](https://www.msx.org/wiki/MSX-BASIC_Instructions).

## Fire-safety sources and scope

Fire-safety questions show their jurisdiction **before** you answer. Numeric US OSHA requirements, OSHA eTool advice, and UK Home Office guidance are distinguished. UK/European Class C (gases) is different from US Class C (energized electrical equipment); cooking oils are UK/European Class F and US Class K.

Placement and equipment selection depend on the actual hazard, applicable local rules, and the workplace emergency plan. This quiz covers selected requirements and guidance; it does not certify a premises or provide hands-on extinguisher training.

Primary sources, checked **7 October 2026**:

- [OSHA 29 CFR 1910.157](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.157)
- [OSHA extinguisher placement and spacing](https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/placement)
- [OSHA extinguisher basics](https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/about)
- [US Fire Administration: fire extinguishers](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/fire-extinguishers/)
- [UK Home Office: offices and shops fire-risk guidance](https://www.gov.uk/government/publications/fire-safety-risk-assessment-offices-and-shops/fire-safety-risk-assessment-offices-and-shops-accessible)
- [Texas Instruments: Op Amps for Everyone](https://e2echina.ti.com/cfs-file/__key/communityserver-discussions-components-files/42/OP-amp-for-everyone.pdf)
- [Fluke: resistance measurements](https://www.fluke.com/en-us/learn/blog/digital-multimeters/how-to-measure-resistance)
- [Fluke 287/289 user manual](https://assets.fluke.com/manuals/287_289_umeng0000.pdf)

## Run locally

Requires Python 3. No package installation, server-side backend, or login is needed.

```sh
python3 -m http.server 8080 --directory docs
```

Open **http://localhost:8080**. You can also download `play.html` and open it directly for a standalone copy.

Run the mathematical/content checks with Node.js 18 or later:

```sh
node --test tests/engine.test.mjs
```

## Edit questions

Curated questions are in `docs/question-bank.js` and `docs/extra-questions.js`. IMDG tables and questions are in `docs/cargo.js`; coding tasks and runtimes are in `docs/challenges.js` and `docs/coding.js`. The first option is the correct answer in source; choices are shuffled for play. Add a jurisdiction and a source for regulatory questions. Generated problems and answer validation are in `docs/engine.js`; quiz UI is in `docs/app.js`, and appearance is in `docs/styles.css`.

The standalone `play.html` is generated by `node tools/build-standalone.mjs` after any source changes. Quiz progress is kept only in the current session; closing or refreshing the page starts fresh. No analytics or account data are collected by the game. Optional Google Fonts fall back to system fonts when unavailable.
