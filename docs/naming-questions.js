// Pharmaceutical naming-systems quiz. No names of actual medicines are tested.
// Each choice and explanation concerns the naming process, not treatment advice.
// WHO, IUPAC, FDA, EMA and USAN scopes are identified per question.
export const NAMING_QUESTIONS = [
  {
    "id": "naming-systems-01",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "A researcher wants a name built from the atoms, bonds and structure of a hypothetical molecule. Which naming system applies?",
    "options": [
      "Systematic chemical nomenclature",
      "A commercial trademark",
      "An internal project code",
      "A product's advertising slogan"
    ],
    "explanation": "IUPAC systematic nomenclature aims to identify chemical structure unambiguously; it is not primarily a marketed product name.",
    "source": "namingIupac",
    "jurisdiction": "IUPAC · chemical nomenclature"
  },
  {
    "id": "naming-systems-02",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Who develops the international rules for systematic chemical nomenclature?",
    "options": [
      "IUPAC",
      "A trademark registry",
      "An individual pharmacy",
      "The shipping operator"
    ],
    "explanation": "IUPAC develops recommendations for uniform chemical terminology and nomenclature.",
    "source": "namingIupac",
    "jurisdiction": "IUPAC · chemical nomenclature"
  },
  {
    "id": "naming-systems-03",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "A laboratory labels an experimental candidate 'LAB-472' for internal tracking. What sort of identifier is this?",
    "options": [
      "A development code",
      "A WHO-recommended INN",
      "An approved brand name",
      "A systematic chemical name"
    ],
    "explanation": "Internal research identifiers can be useful before a substance receives an official generic name; the code by itself confers no marketing approval.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-04",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Which layer of naming is designed to describe a molecule's structure rather than its manufacturer?",
    "options": [
      "A systematic chemical name",
      "A brand name",
      "A company project code",
      "A trademark"
    ],
    "explanation": "Systematic nomenclature relates a name to the underlying chemistry, unlike a name that identifies a commercial product.",
    "source": "namingIupac",
    "jurisdiction": "IUPAC · chemical nomenclature"
  },
  {
    "id": "naming-systems-05",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Two firms study the same theoretical active substance. What is the intended relationship between their WHO INNs?",
    "options": [
      "One public nonproprietary name for the substance",
      "A different protected INN for each firm",
      "A different INN for each package colour",
      "A different INN for every marketing slogan"
    ],
    "explanation": "An INN is intended as a single universally available designation for an active substance, not a company-specific brand.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-06",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Which item is primarily a company identifier rather than a standardized public ingredient name?",
    "options": [
      "An invented commercial brand",
      "A recommended INN",
      "A generic substance designation",
      "An established nonproprietary name"
    ],
    "explanation": "A proprietary name identifies a commercial product; a nonproprietary name identifies the substance and is generally available to others.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-systems-07",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Why might a scientific chemical name be impractical as the main label used in everyday prescribing?",
    "options": [
      "It can be lengthy and complex",
      "It must always be kept secret",
      "It always belongs to one trademark owner",
      "It cannot describe the molecular structure"
    ],
    "explanation": "Systematic names prioritize chemical precision; practical nonproprietary names support consistent communication.",
    "source": "namingIupac",
    "jurisdiction": "IUPAC · chemical nomenclature"
  },
  {
    "id": "naming-systems-08",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "A team changes the fictional project label 'AX-17' to 'AX-18'. What does that alone establish?",
    "options": [
      "Only that the internal identifier changed",
      "A new WHO-recommended INN exists",
      "The product received regulatory approval",
      "The molecule necessarily has a different structure"
    ],
    "explanation": "An internal code change does not itself prove a new substance, approval, or international naming designation.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-09",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Which pair compares the same naming level?",
    "options": [
      "Two research development codes",
      "One research code and one INN",
      "One trademark and one chemical structure",
      "One sales slogan and one INN"
    ],
    "explanation": "Development codes are internal identifiers; the other pairs mix distinct naming functions.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-10",
    "category": "naming",
    "level": 1,
    "topic": "Name systems",
    "focus": "systems",
    "prompt": "Who selects and publishes recommended international nonproprietary names?",
    "options": [
      "The World Health Organization",
      "A product's logo designer",
      "A local trademark owner",
      "A pharmacy chain"
    ],
    "explanation": "The WHO INN programme selects nonproprietary names on expert advice and publishes proposed and recommended names.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-01",
    "category": "naming",
    "level": 1,
    "topic": "INN basics",
    "focus": "inn",
    "prompt": "A proposed nonproprietary name is meant to identify what?",
    "options": [
      "An active substance",
      "A particular advertising campaign",
      "A manufacturer's office",
      "A retail distribution contract"
    ],
    "explanation": "INNs identify pharmaceutical substances or active pharmaceutical ingredients.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-02",
    "category": "naming",
    "level": 1,
    "topic": "INN basics",
    "focus": "inn",
    "prompt": "Which statement best describes the ownership of a recommended INN?",
    "options": [
      "It is a public nonproprietary designation",
      "It is an exclusive company trademark",
      "It is an internal laboratory secret",
      "It is licensed only to the first manufacturer"
    ],
    "explanation": "Recommended INNs are placed in the public domain for substance identification.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-03",
    "category": "naming",
    "level": 1,
    "topic": "INN basics",
    "focus": "inn",
    "prompt": "Why do some related nonproprietary names share a common stem?",
    "options": [
      "To signal a pharmacological relationship where appropriate",
      "To reveal a package's weight",
      "To identify the trademark owner",
      "To guarantee the same dose for every product"
    ],
    "explanation": "WHO stems help communicate relationships between pharmacologically related substances; they do not guarantee the same dose or use.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-04",
    "category": "naming",
    "level": 1,
    "topic": "INN basics",
    "focus": "inn",
    "prompt": "An imaginary INN candidate is difficult to distinguish when spoken aloud from an existing name. What is the naming concern?",
    "options": [
      "Risk of sound-alike confusion",
      "Insufficient commercial distinctiveness only",
      "Failure to specify retail price",
      "Too few trademarks on the label"
    ],
    "explanation": "WHO principles require distinctive sound and spelling to help prevent confusion.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-05",
    "category": "naming",
    "level": 1,
    "topic": "INN basics",
    "focus": "inn",
    "prompt": "Should a WHO INN normally be treated as a product trademark?",
    "options": [
      "No; it is a common nonproprietary name",
      "Yes; its first applicant owns it exclusively",
      "Yes; it is automatically a registered brand",
      "Only if it is shorter than eight letters"
    ],
    "explanation": "WHO places recommended INNs in the public domain; registering them as proprietary marks undermines their shared use.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-06",
    "category": "naming",
    "level": 1,
    "topic": "INN stages",
    "focus": "inn",
    "prompt": "In the WHO INN process, which stage comes before publication of a recommended name?",
    "options": [
      "Publication of a proposed INN for comments",
      "Automatic trademark registration",
      "A retail advertising campaign",
      "Assignment of a consumer loyalty number"
    ],
    "explanation": "WHO first publishes a proposed INN and allows comments and objections before recommending it.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-07",
    "category": "naming",
    "level": 1,
    "topic": "INN stages",
    "focus": "inn",
    "prompt": "A sponsor submits three suggested nonproprietary names to WHO. Who makes the official selection?",
    "options": [
      "WHO following expert review",
      "The applicant unilaterally",
      "The first trademark office to respond",
      "The first dispensing pharmacist"
    ],
    "explanation": "Applicants may suggest names, but WHO's INN process selects the proposed designation.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-08",
    "category": "naming",
    "level": 1,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "Which attribute is desirable for a proposed INN?",
    "options": [
      "Distinctive pronunciation and spelling",
      "A claim that it is the strongest product",
      "A direct copy of a registered trademark",
      "An intentional promise to cure a condition"
    ],
    "explanation": "WHO general principles favour distinctive, non-confusing names and discourage therapeutic suggestions.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-09",
    "category": "naming",
    "level": 1,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "A fictional brand copies an established WHO INN stem. What is the WHO-recommended approach?",
    "options": [
      "Avoid incorporating recognized INN stems in trademarks",
      "Reserve the stem as a private trademark",
      "Use the stem only in larger print",
      "Change the stem's capitalization and assume acceptance"
    ],
    "explanation": "WHO advises against brand names derived from INNs or containing recognized stems.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-10",
    "category": "naming",
    "level": 1,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "Why does WHO discourage names that imply a particular therapeutic benefit?",
    "options": [
      "They can mislead or restrict clear neutral identification",
      "They make the formula too detailed",
      "They are required for chemical structure",
      "They guarantee the substance is ineffective"
    ],
    "explanation": "WHO nomenclature principles discourage anatomical, pathological and therapeutic suggestions in INNs.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-brand-01",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "Which naming layer distinguishes one marketed product from competitors?",
    "options": [
      "A proprietary or brand name",
      "An internal lab specimen number",
      "An IUPAC locant",
      "A chemical bond descriptor"
    ],
    "explanation": "A proprietary name is the commercial identifier of a specific product.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-02",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "A fictitious proposed brand differs by one character from an existing drug name and sounds nearly identical. What should a US sponsor do?",
    "options": [
      "Treat it as a medication-error risk and assess alternatives",
      "Assume one different letter guarantees safety",
      "Register it immediately without checking names",
      "Ignore pronunciation if spelling differs"
    ],
    "explanation": "FDA reviews look-alike and sound-alike risks; a tiny spelling difference does not make the name safe.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-03",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "A company proposes 'AlwaysCures' as a fictional prescription product name without evidence for such a claim. What is the key US naming risk?",
    "options": [
      "An unsupported efficacy claim",
      "The absence of a chemical formula in the brand",
      "The lack of an internal project code",
      "An excessively long INN stem"
    ],
    "explanation": "FDA screening assesses names that mislead or overstate efficacy.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-04",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "What must be considered besides whether a new invented name is catchy?",
    "options": [
      "Patient-safety and confusion risks",
      "Whether every syllable is a Latin word",
      "Whether the company likes the logo",
      "Whether it contains the sponsor's initials"
    ],
    "explanation": "FDA brand-name assessment is designed to reduce medication errors and misleading presentation.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-05",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "Which statement about regulatory acceptance of a proposed US product name is sound?",
    "options": [
      "It requires the relevant regulator's assessment; a trademark search alone is insufficient",
      "A trademark registration automatically establishes medication safety",
      "An internal code proves that the name is approved",
      "The first invented name submitted must be accepted"
    ],
    "explanation": "Trademark and drug-regulatory reviews serve different purposes; FDA assesses safety and misleading names.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-06",
    "category": "naming",
    "level": 1,
    "topic": "Brand names",
    "focus": "brand",
    "prompt": "Two proposed fictional brands have nearly indistinguishable spoken pronunciations. What is the main clinical issue?",
    "options": [
      "A dispensing or prescribing mix-up",
      "A chemical structure mismatch proven by the sound",
      "Failure to register a domain name",
      "Loss of the internal project code"
    ],
    "explanation": "Confusable spoken names may contribute to medication errors even if their spelling differs.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-bio-01",
    "category": "naming",
    "level": 1,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Under the FDA 2017 guidance, what is added to the core nonproprietary name for biological products covered by its suffix convention?",
    "options": [
      "A distinguishing four-letter lowercase suffix",
      "A mandatory advertising slogan",
      "The manufacturer's complete legal name",
      "A numerical price code"
    ],
    "explanation": "The FDA convention uses a core name plus a hyphen and a four-letter lowercase suffix for products within its scope.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-02",
    "category": "naming",
    "level": 1,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "What character joins the core name and the FDA-designated suffix?",
    "options": [
      "A hyphen",
      "A slash",
      "An underscore",
      "An equals sign"
    ],
    "explanation": "The FDA guidance specifies a hyphen between the core name and suffix.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-03",
    "category": "naming",
    "level": 1,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "What should the four-letter FDA biologic suffix communicate by itself?",
    "options": [
      "No intended meaning",
      "The correct dose",
      "The sponsor's brand",
      "The product's clinical superiority"
    ],
    "explanation": "The suffix is intended to distinguish products without conveying substantive meaning.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-04",
    "category": "naming",
    "level": 1,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Which is the intended character case for a four-letter FDA biologic suffix?",
    "options": [
      "Lowercase letters",
      "Uppercase letters",
      "Mixed-case brand initials",
      "Any combination of digits and letters"
    ],
    "explanation": "FDA's suffix format calls for four lowercase letters.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-rules-01",
    "category": "naming",
    "level": 1,
    "topic": "Review systems",
    "focus": "rules",
    "prompt": "Which organisation reviews invented names of products in the EU centralised marketing-authorisation procedure?",
    "options": [
      "The EMA through its name-review process",
      "The International Union of Pure and Applied Chemistry",
      "The WHO stem assignment board acting as a trademark office",
      "The applicant's packaging printer"
    ],
    "explanation": "EMA applies a procedure for reviewing invented names, including potential safety concerns, for centrally authorised products.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-02",
    "category": "naming",
    "level": 1,
    "topic": "Review systems",
    "focus": "rules",
    "prompt": "What is an important goal of the EU EMA's invented-name review?",
    "options": [
      "Identify potential safety and public-health concerns",
      "Assign a unique systematic chemical structure",
      "Grant an international WHO INN automatically",
      "Approve a manufacturer's retail pricing"
    ],
    "explanation": "EMA's guidelines evaluate proposed invented names for safety-related and product-specific concerns.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-03",
    "category": "naming",
    "level": 1,
    "topic": "Review systems",
    "focus": "rules",
    "prompt": "Why should a fictional product name be assessed in its intended market?",
    "options": [
      "Naming review requirements and existing-name risks vary by jurisdiction",
      "International spelling rules guarantee all markets accept it",
      "A trademark in one country grants automatic global authorisation",
      "Marketing names have no regulatory assessment"
    ],
    "explanation": "WHO nomenclature, FDA proprietary-name guidance and EMA naming procedures have different functions and scopes.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-systems-11",
    "category": "naming",
    "level": 2,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A document lists 'LAB-201', an IUPAC-style structure name and a proposed brand. Which of these is automatically a WHO-recommended INN?",
    "options": [
      "None of them",
      "The laboratory code",
      "The IUPAC-style name",
      "The proposed brand"
    ],
    "explanation": "No naming layer becomes a recommended INN merely by being used; WHO must select and publish one.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-12",
    "category": "naming",
    "level": 2,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A company wants one unique label for an active substance across markets but also a distinctive commercial label. Which pairing of roles is appropriate?",
    "options": [
      "INN for substance identity; brand for the marketed product",
      "Brand for molecular structure; development code for public INN",
      "Trademark for public substance identity; INN for logo",
      "IUPAC name for marketing owner; brand for research code"
    ],
    "explanation": "The INN is the common substance name, and the commercial brand identifies the marketed product.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-13",
    "category": "naming",
    "level": 2,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A fictional active ingredient enters a clinical study using code 'QX-402'. Can a research code by itself establish an official nonproprietary designation?",
    "options": [
      "No; official naming follows separate processes",
      "Yes; any two-letter code is automatically an INN",
      "Yes; publication in an internal spreadsheet is sufficient",
      "Yes; once the code appears on a shipping box"
    ],
    "explanation": "Project codes and officially selected names are separate designation mechanisms.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-14",
    "category": "naming",
    "level": 2,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A systematic chemical name changes after chemists correct its stereochemical description. What is the immediate reason for that change?",
    "options": [
      "To represent the chemical structure more accurately",
      "To protect a new company slogan",
      "To change the existing brand automatically",
      "To replace WHO's public-name procedure"
    ],
    "explanation": "Chemical systematic nomenclature is constructed to describe the correct identity and structure of a compound.",
    "source": "namingIupac",
    "jurisdiction": "IUPAC · chemical nomenclature"
  },
  {
    "id": "naming-systems-15",
    "category": "naming",
    "level": 2,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A company asks whether registering a fictional product's brand also owns the WHO INN used for its active ingredient. What is the correct distinction?",
    "options": [
      "Trademark rights do not create ownership of the public INN",
      "Every brand registration creates exclusive rights to its INN",
      "The INN becomes private when sold in one country",
      "A chemical systematic name becomes the brand automatically"
    ],
    "explanation": "INNs are public designations independent of proprietary brand rights.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-11",
    "category": "naming",
    "level": 2,
    "topic": "INN procedure",
    "focus": "inn",
    "prompt": "WHO publishes a proposed INN. What is the standard period in which interested parties can object?",
    "options": [
      "Four months",
      "Four days",
      "Four weeks",
      "Four years"
    ],
    "explanation": "WHO's proposed-INN publication provides a four-month comment and objection period.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-12",
    "category": "naming",
    "level": 2,
    "topic": "INN procedure",
    "focus": "inn",
    "prompt": "A formal trademark objection to a proposed INN remains unresolved. What is WHO's described approach?",
    "options": [
      "Do not publish it as recommended while the objection remains",
      "Immediately publish it as recommended despite the objection",
      "Convert the trademark into a chemical name",
      "Ask every pharmacy to rename the substance"
    ],
    "explanation": "WHO does not publish an INN as recommended while a formal objection is maintained.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-13",
    "category": "naming",
    "level": 2,
    "topic": "INN procedure",
    "focus": "inn",
    "prompt": "Why does WHO advise caution in using a proposed INN before it is recommended?",
    "options": [
      "The proposed name might be modified following review or objection",
      "The sponsor must first buy the generic name",
      "Proposed INNs are always illegal laboratory codes",
      "A proposed INN has no letters yet"
    ],
    "explanation": "WHO advises avoiding premature use of proposed names to reduce confusion if names change.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-14",
    "category": "naming",
    "level": 2,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "Under WHO principles, should a newly selected INN typically be an unusually long marketing phrase?",
    "options": [
      "No; it should not be inconveniently long",
      "Yes; long promotional wording is preferred",
      "Yes; company slogans are required",
      "Only if the phrase contains four numbers"
    ],
    "explanation": "WHO emphasizes distinctive, practical nonproprietary names, not lengthy promotional expressions.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-15",
    "category": "naming",
    "level": 2,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "A candidate INN includes a syllable implying 'newer and stronger'. What is the best design assessment?",
    "options": [
      "Avoid unsupported therapeutic or superiority suggestions",
      "Such claims are mandatory for INNs",
      "Add the company logo to validate the claim",
      "Use the syllable only in uppercase"
    ],
    "explanation": "WHO aims for neutral nonproprietary names; USAN guidance also rejects superiority-related prefixes.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-16",
    "category": "naming",
    "level": 2,
    "topic": "INN stems",
    "focus": "inn",
    "prompt": "A fictitious pharmacological group has an assigned stem '-vex' in the exercise. Which proposed commercial name conflicts with the WHO stem-protection principle?",
    "options": [
      "Curalvex",
      "Mirotane",
      "Zeluma",
      "Toriza"
    ],
    "explanation": "In this hypothetical example, Curalvex incorporates the stipulated protected stem. WHO discourages such use in trademarks; the stem is invented for training.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-17",
    "category": "naming",
    "level": 2,
    "topic": "INN stems",
    "focus": "inn",
    "prompt": "In a classroom exercise, '-tor' is declared to be a protected INN stem. Which fictional company action is most appropriate?",
    "options": [
      "Choose a distinct commercial name without that stem",
      "Use a brand ending '-tor' to claim the whole class",
      "Trademark the stem by itself",
      "Add a number to the stem and assume exemption"
    ],
    "explanation": "A protected common stem is intended for nonproprietary names and should not be appropriated as a brand feature. The example stem is fictional.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-18",
    "category": "naming",
    "level": 2,
    "topic": "INN stems",
    "focus": "inn",
    "prompt": "If two nonproprietary candidates share a known class stem, what does that suggest?",
    "options": [
      "They may be pharmacologically related",
      "They are made by the same company",
      "They have the same exact chemical structure",
      "They must use the same strength"
    ],
    "explanation": "INN common stems help identify pharmacological group relationships, not identical formulations or corporate ownership.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-19",
    "category": "naming",
    "level": 2,
    "topic": "INN procedure",
    "focus": "inn",
    "prompt": "After a proposed INN passes the WHO objection process and appears as recommended, what changes?",
    "options": [
      "It becomes the published recommended public name",
      "It becomes a private commercial trademark",
      "It becomes an automatically approved product licence",
      "It becomes a complete chemical structure drawing"
    ],
    "explanation": "Recommended INNs are published for common use as names identifying substances.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-20",
    "category": "naming",
    "level": 2,
    "topic": "INN design",
    "focus": "inn",
    "prompt": "Under the AMA USAN naming guidelines, is a proposed prefix referencing the sponsor's company generally acceptable?",
    "options": [
      "No; company-referencing prefixes are not accepted",
      "Yes; company initials are required",
      "Yes; the full parent-company name is compulsory",
      "Only if the name uses digits"
    ],
    "explanation": "USAN guidance rejects proposed prefixes referring to the developer company.",
    "source": "namingUsan",
    "jurisdiction": "US · USAN naming guidelines"
  },
  {
    "id": "naming-brand-07",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A fictional brand embeds '24' to imply its duration of action, but the proposed product has no validated duration in its name. What is the prudent FDA naming assessment?",
    "options": [
      "Check for misleading dosing implications and medication-error risk",
      "Assume a number is never a concern",
      "Treat the number as a substitute for clinical evidence",
      "Assume the number makes the brand a WHO INN"
    ],
    "explanation": "FDA cautions against numbers or modifiers that can convey dose, duration, frequency or strength ambiguously; exceptions may exist in established classes.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-08",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A company considers 'Mera+' for a fictional US prescription product. Why does FDA generally discourage symbols in proprietary names?",
    "options": [
      "Symbols can be misread or interpreted inconsistently",
      "Symbols change an active ingredient's structure",
      "Symbols make the INN public",
      "Symbols automatically designate a biosimilar"
    ],
    "explanation": "FDA recommends words instead of error-prone symbols as a general best practice, with context-dependent exceptions.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-09",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A new invented name looks distinct in block capitals but resembles another name when handwritten. What is the appropriate concern?",
    "options": [
      "Orthographic confusion in medication use",
      "Whether the laboratory code is memorable",
      "An automatic problem with the chemical formula",
      "Whether its vowels are trademarked"
    ],
    "explanation": "FDA asks sponsors to assess look-alike visual forms, including possible written confusion.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-10",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A company checks the trademark database and sees no identical mark. Is that enough for a US prescription-product name?",
    "options": [
      "No; medication safety and misleading implications still need assessment",
      "Yes; regulatory review is always unnecessary",
      "Yes; no exact match rules out sound-alike risk",
      "Yes; the name automatically becomes an INN"
    ],
    "explanation": "FDA proprietary-name review serves patient-safety and misbranding purposes distinct from trademark availability.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-11",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A fictional brand name suggests a treatment works for a condition outside the evidence submitted. Which FDA concern does that raise?",
    "options": [
      "The name may be misleading about its therapeutic effect",
      "It is automatically a chemical name",
      "It cannot be pronounced in any language",
      "It contains too few characters to be a brand"
    ],
    "explanation": "Proprietary names should not imply unsupported effectiveness or indications.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-12",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "A proposed product name differs in spelling from an existing name but sounds identical when read aloud. Which evaluation remains necessary?",
    "options": [
      "Phonetic similarity and potential medication errors",
      "Only a font change",
      "Only a chemical structure comparison",
      "Only a domain-name check"
    ],
    "explanation": "Medication orders may be spoken; FDA considers sound-alike as well as look-alike name risks.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-13",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "Which proposal best fits an early US brand-name prescreening workflow?",
    "options": [
      "Assess similarity, potential misleading meaning and error-prone modifiers",
      "Approve immediately if a marketer likes the name",
      "Use only trademark search results as the safety test",
      "Choose names by the number of letters alone"
    ],
    "explanation": "FDA best practices consider several potential sources of name-related medical error and misbranding.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-14",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "Two imaginary products may be confused because their brand names have similar spelling and pronunciation. What is the preferred action before submission?",
    "options": [
      "Investigate the collision and consider alternatives",
      "Increase the name's font size and skip comparison",
      "Ignore phonetic similarity if packaged differently",
      "Claim the competitor's INN stem"
    ],
    "explanation": "FDA recommends evaluating similarity-related medication error risk early in the naming process.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-15",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "Can a commercial invented name imply that the product is safer than alternatives without adequate support?",
    "options": [
      "That is a potential misleading-name concern",
      "Yes; the claim is always exempt in a product name",
      "Yes; product names are not part of FDA review",
      "Only when the name contains a hyphen"
    ],
    "explanation": "FDA brand-name review considers claims that minimize risk or overstate benefit.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-16",
    "category": "naming",
    "level": 2,
    "topic": "Brand screening",
    "focus": "brand",
    "prompt": "Which is not a guarantee of FDA acceptance for a fictional proposed brand?",
    "options": [
      "A successful trademark availability search",
      "A satisfactory regulatory safety assessment",
      "A considered phonetic screening",
      "A review for misleading implications"
    ],
    "explanation": "Trademark clearance alone is not FDA drug-name acceptance; regulatory assessment also considers patient safety and misleading impressions.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-bio-05",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Under the FDA 2017 suffix format, a four-letter suffix must contain at least how many distinct letters?",
    "options": [
      "Three",
      "One",
      "Two",
      "Five"
    ],
    "explanation": "FDA guidance requires at least three distinct characters among the four lowercase letters.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-06",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Which fictitious suffix best meets the FDA format requirement of four lowercase letters with at least three different letters?",
    "options": [
      "-qzrt",
      "-aabb",
      "-QQRT",
      "-q7rt"
    ],
    "explanation": "qzrt has four lowercase letters, all distinct, and is joined by a hyphen. This checks format only, not FDA acceptance or uniqueness.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-07",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Under the FDA 2017 suffix guidance, what is a problem with '-abca'?",
    "options": [
      "None inherent to the four-letter/three-distinct-letter format",
      "It has only two distinct letters",
      "It contains digits",
      "It uses uppercase"
    ],
    "explanation": "abca contains four lowercase letters and three distinct letters. Actual acceptability additionally requires uniqueness, no meaning and other checks.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-08",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "A fictional US biologic candidate uses suffix '-kkmm'. What fails the FDA 2017 format?",
    "options": [
      "It has only two distinct letters",
      "It has five characters",
      "It contains uppercase letters",
      "It has no hyphen"
    ],
    "explanation": "The four characters contain just k and m; the guidance calls for at least three distinct letters.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-09",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "A sponsor proposes initials of its company as a biologic suffix. What is the issue?",
    "options": [
      "The suffix should not connote the licence holder",
      "Company initials are mandatory",
      "A suffix must describe the manufacturer",
      "A suffix must be a protected brand"
    ],
    "explanation": "FDA guidance seeks meaningless, nonproprietary identifiers, not sponsor-identifying suffixes.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-10",
    "category": "naming",
    "level": 2,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "What is the role of uniqueness when selecting the US biologic suffix?",
    "options": [
      "Avoid confusion with other FDA-designated suffixes",
      "Guarantee that two products are interchangeable",
      "Encode the product's potency",
      "Replace all product labelling"
    ],
    "explanation": "FDA asks for a unique suffix distinguishable from other designated suffixes; it does not by itself establish interchangeability.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-rules-04",
    "category": "naming",
    "level": 2,
    "topic": "Regional review",
    "focus": "rules",
    "prompt": "A fictional EU medicine uses an invented commercial name. Which agency's formal review framework is relevant if the product is submitted through the centralised procedure?",
    "options": [
      "EMA invented-name review",
      "IUPAC chemical-naming approval",
      "WHO trademark registration",
      "A pharmaceutical wholesale price board"
    ],
    "explanation": "EMA operates a name acceptability procedure for centrally processed human medicinal products.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-05",
    "category": "naming",
    "level": 2,
    "topic": "Regional review",
    "focus": "rules",
    "prompt": "When reviewing an EU centralised invented name, why is similarity to existing product names important?",
    "options": [
      "It can create medication-error risks",
      "It ensures the chemical formula has changed",
      "It always establishes the same manufacturer",
      "It determines the product's shelf life"
    ],
    "explanation": "EMA's name acceptability process considers public-health risks, including confusion with existing names.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-06",
    "category": "naming",
    "level": 2,
    "topic": "Regional review",
    "focus": "rules",
    "prompt": "A US sponsor chooses a brand using the suffix of a WHO INN as a selling point. Which two review considerations are relevant?",
    "options": [
      "WHO stem protection and US medication-name safety",
      "Only the packaging colour and retail price",
      "Only the IUPAC locant numbering",
      "Only the laboratory's file-naming convention"
    ],
    "explanation": "WHO discourages INN-stem appropriation, and FDA reviews names that may contribute to medication errors.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-rules-07",
    "category": "naming",
    "level": 2,
    "topic": "Regional review",
    "focus": "rules",
    "prompt": "What is the safest interpretation when WHO and local national nomenclature practice generally align but sometimes differ?",
    "options": [
      "Check the applicable jurisdiction rather than assume perfect identity",
      "Assume every country always uses identical adopted names",
      "Assume national committees never collaborate with WHO",
      "Treat every generic name as a protected brand"
    ],
    "explanation": "WHO notes close alignment of many national adopted names with INNs but acknowledges rare exceptions.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-rules-08",
    "category": "naming",
    "level": 2,
    "topic": "Regional review",
    "focus": "rules",
    "prompt": "Which naming authority should be consulted for a US adopted generic name proposal?",
    "options": [
      "The USAN programme's naming guidelines",
      "The EU brand trademark examiner alone",
      "An electronic component data sheet",
      "A website domain registrar alone"
    ],
    "explanation": "The AMA's USAN guidance describes rules for adopted names in the United States.",
    "source": "namingUsan",
    "jurisdiction": "US · USAN naming guidelines"
  },
  {
    "id": "naming-systems-16",
    "category": "naming",
    "level": 3,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "An invented product name has passed a company's internal review, but its INN is only proposed. Which claim is justified?",
    "options": [
      "Neither the commercial name nor the proposed INN is automatically finally authorised",
      "Both are now internationally approved names",
      "The INN is a protected trademark",
      "The internal review replaces FDA and EMA processes"
    ],
    "explanation": "Private internal review is not the same as WHO recommendation or national regulatory acceptance.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-17",
    "category": "naming",
    "level": 3,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A company sells one hypothetical substance under different commercial names in different markets. What can still provide a common substance identity?",
    "options": [
      "The internationally recommended INN",
      "The local trademark logo",
      "The distributor's business name",
      "The marketing campaign tagline"
    ],
    "explanation": "INNs enable cross-market identification even when commercial names differ.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-systems-18",
    "category": "naming",
    "level": 3,
    "topic": "Naming strategy",
    "focus": "systems",
    "prompt": "A team proposes a brand that imitates a familiar generic-name family but insists the product has a different molecular structure. What is the central naming concern?",
    "options": [
      "The brand may confuse the distinction between protected INN stems and commercial identity",
      "Chemical differences automatically allow INN-stem branding",
      "Every chemical structure must share a commercial prefix",
      "The company can register the entire pharmacological class as its trademark"
    ],
    "explanation": "WHO stem protection concerns the public naming system, not merely whether the commercial product has identical chemistry.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-21",
    "category": "naming",
    "level": 3,
    "topic": "INN decision",
    "focus": "inn",
    "prompt": "A fictitious proposed INN passes a trademark check but is almost indistinguishable in pronunciation from a published INN. What WHO criterion remains unmet?",
    "options": [
      "Distinctive sound and spelling relative to existing names",
      "A requirement to include the manufacturer's name",
      "A rule to add an advertising claim",
      "A duty to register the proposed name as a trademark"
    ],
    "explanation": "INN review checks sound/spelling similarity and potential confusion independently of trademark conflicts.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-22",
    "category": "naming",
    "level": 3,
    "topic": "INN decision",
    "focus": "inn",
    "prompt": "An applicant wants a WHO INN containing a promise of guaranteed recovery. How should reviewers assess that element?",
    "options": [
      "It conflicts with the principle of avoiding therapeutic suggestions",
      "It is required if the product is novel",
      "It is merely a chemical locant",
      "It converts the name into an internal code"
    ],
    "explanation": "WHO discourages pathological, physiological and therapeutic suggestions in INN construction.",
    "source": "namingPrinciples",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-23",
    "category": "naming",
    "level": 3,
    "topic": "INN decision",
    "focus": "inn",
    "prompt": "A hypothetical proposed INN receives an unresolved formal objection during WHO's comment period. What happens to recommendation?",
    "options": [
      "It is not recommended until the objection is resolved",
      "It is recommended immediately at the four-month deadline",
      "The objector must use the proposed name as a trademark",
      "The proposed INN becomes a systematic chemical name"
    ],
    "explanation": "WHO states that an unresolved formal objection prevents publication as a recommended INN.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-inn-24",
    "category": "naming",
    "level": 3,
    "topic": "USAN prefixes",
    "focus": "inn",
    "prompt": "A USAN applicant suggests a made-up prefix designed to mean 'maximum effectiveness'. What is the USAN concern?",
    "options": [
      "Prefixes implying superior effectiveness are not accepted",
      "Such a prefix is compulsory for every novel ingredient",
      "The prefix turns the name into a chemical formula",
      "Only companies outside the US may use that meaning"
    ],
    "explanation": "The AMA's USAN naming guidance rejects prefixes implying that a substance is better or more effective.",
    "source": "namingUsan",
    "jurisdiction": "US · USAN naming guidelines"
  },
  {
    "id": "naming-inn-25",
    "category": "naming",
    "level": 3,
    "topic": "USAN prefixes",
    "focus": "inn",
    "prompt": "A USAN proposal uses a prefix that obviously names the medical condition to be treated. What is the stated USAN approach?",
    "options": [
      "Reject indication-linked prefixes",
      "Treat the condition name as a required stem",
      "Make the prefix a protected brand instead",
      "Use the same prefix for all unrelated substances"
    ],
    "explanation": "USAN guidelines reject prefixes with obvious indications or medical-condition references.",
    "source": "namingUsan",
    "jurisdiction": "US · USAN naming guidelines"
  },
  {
    "id": "naming-brand-17",
    "category": "naming",
    "level": 3,
    "topic": "Brand safety",
    "focus": "brand",
    "prompt": "A fictional prescription brand is proposed as 'Qera-4' and the '4' is meant to convey dose frequency. What is the most defensible FDA-style assessment?",
    "options": [
      "Examine whether the modifier could be confused with directions or strength",
      "Assume any numeric modifier is automatically safe",
      "Assume all digits are universally prohibited without exceptions",
      "Conclude that the brand is a chemical name"
    ],
    "explanation": "FDA generally discourages potentially confusing numbers in proprietary names, while recognising established class-specific conventions.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-18",
    "category": "naming",
    "level": 3,
    "topic": "Brand safety",
    "focus": "brand",
    "prompt": "A brand passes spelling comparison but fails a spoken-name comparison with another fictional product. What does that imply?",
    "options": [
      "There remains a meaningful sound-alike medication-error risk",
      "The name is safe because only written similarity matters",
      "It is automatically a WHO recommended INN",
      "The letters must be arranged as a chemical formula"
    ],
    "explanation": "FDA risk assessment covers phonetic as well as orthographic similarities.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-19",
    "category": "naming",
    "level": 3,
    "topic": "Brand safety",
    "focus": "brand",
    "prompt": "A sponsor's proposed brand combines a very similar existing name with a new symbol to 'differentiate' it. What is the best response?",
    "options": [
      "Reconsider the root similarity; a symbol does not erase safety concerns",
      "Accept it automatically because symbols make unique strings",
      "Treat it as an official INN because it is different in writing",
      "Assume the new symbol changes the active substance"
    ],
    "explanation": "FDA discourages error-prone symbols and evaluates similarity beyond literal character identity.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-20",
    "category": "naming",
    "level": 3,
    "topic": "Brand safety",
    "focus": "brand",
    "prompt": "Which sequence best reflects a sound fictitious prescription brand-name design process in the US?",
    "options": [
      "Create candidates; screen for confusion and misleading claims; submit for relevant review",
      "Trademark one candidate; skip patient-safety evaluation; market immediately",
      "Pick a WHO stem; assert exclusive ownership; advertise",
      "Publish an internal code; infer marketing permission"
    ],
    "explanation": "FDA recommends early safety prescreening and formally evaluates proposed proprietary names within its regulatory framework.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-brand-21",
    "category": "naming",
    "level": 3,
    "topic": "Brand safety",
    "focus": "brand",
    "prompt": "A hypothetical brand name promises a superior safety profile over every competitor. The sponsor has not substantiated that implication. What is the best answer?",
    "options": [
      "The implication warrants rejection or redesign due to misleading risk",
      "Name wording is exempt from the misleading-presentation review",
      "The claim automatically becomes true when trademarked",
      "The promise belongs in the systematic chemical name"
    ],
    "explanation": "FDA evaluates commercial names for misleading claims and potential medication errors.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  },
  {
    "id": "naming-bio-11",
    "category": "naming",
    "level": 3,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Which hypothetical suffix violates FDA's format specifically because it lacks three distinct lowercase letters?",
    "options": [
      "-zzxx",
      "-zxyz",
      "-qtrq",
      "-zrst"
    ],
    "explanation": "zzxx contains only two distinct letters. The others meet the minimum distinct-letter count; additional acceptability checks still apply.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-12",
    "category": "naming",
    "level": 3,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "A proposed FDA biologic suffix '-qvtr' meets length and character variety. Which conclusion is justified?",
    "options": [
      "It passes those format checks, but uniqueness and meaning still require assessment",
      "It is automatically FDA-designated",
      "It guarantees product interchangeability",
      "It can be registered as the sponsor's trademark"
    ],
    "explanation": "Meeting the four-lowercase-letter/three-distinct-character test is necessary but not sufficient for suffix acceptance.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-13",
    "category": "naming",
    "level": 3,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "A fictional suffix uses a common abbreviation for a dosing instruction. What risk does FDA's suffix guidance flag?",
    "options": [
      "It might be mistaken for a clinical instruction",
      "It must appear on every prescription twice",
      "It proves the ingredient is a small molecule",
      "It eliminates the need for a core name"
    ],
    "explanation": "FDA advises avoiding clinical abbreviations in biologic suffixes to reduce misinterpretation.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-14",
    "category": "naming",
    "level": 3,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "A biologic sponsor wants to use its own corporate initials as the FDA-designated suffix. Which criterion is at issue?",
    "options": [
      "The suffix must not connote the licence holder",
      "The suffix must be the company trademark",
      "The suffix must encode the brand's advertising campaign",
      "The suffix must contain digits"
    ],
    "explanation": "FDA guidance says the suffix should not look similar to or suggest the license holder's name.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-bio-15",
    "category": "naming",
    "level": 3,
    "topic": "Biologic suffixes",
    "focus": "bio",
    "prompt": "Which inference about US biosimilar naming is NOT established by a compliant four-letter suffix?",
    "options": [
      "That products with different suffixes are necessarily non-interchangeable",
      "That a suffix is part of the applicable nonproprietary format",
      "That the suffix should be nonproprietary",
      "That the suffix should not imply a company"
    ],
    "explanation": "An FDA-designated suffix differentiates names but does not alone establish clinical interchangeability or its absence.",
    "source": "namingBio",
    "jurisdiction": "US · FDA biological-product guidance"
  },
  {
    "id": "naming-rules-09",
    "category": "naming",
    "level": 3,
    "topic": "EU name review",
    "focus": "rules",
    "prompt": "A fictional centrally reviewed EU product's proposed invented name is too similar to another product and could cause selection errors. What is the appropriate regulatory concern?",
    "options": [
      "The proposed invented name may be unacceptable for public-health reasons",
      "A similarity is automatically resolved by a different company logo",
      "The invented name becomes the IUPAC chemical name",
      "The similarity has no bearing on the name-review process"
    ],
    "explanation": "EMA assesses potential safety and public-health problems with proposed invented names.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-10",
    "category": "naming",
    "level": 3,
    "topic": "EU name review",
    "focus": "rules",
    "prompt": "An invented name for a fictional fixed-combination medicine reproduces the entire invented name of one component product. What does EMA's centralised guideline say?",
    "options": [
      "That incorporation is not acceptable in the proposed combination name",
      "It is mandatory for all fixed combinations",
      "It automatically qualifies as a recommended INN",
      "It substitutes for ingredient declarations"
    ],
    "explanation": "EMA's revision 7 guideline advises that fixed-combination names be sufficiently different and not incorporate an individual component's entire invented name.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-11",
    "category": "naming",
    "level": 3,
    "topic": "EU name review",
    "focus": "rules",
    "prompt": "A fictional product name has WHO naming compatibility but has not been assessed by EMA for a centralised EU marketing application. Which conclusion is valid?",
    "options": [
      "INN compatibility does not substitute for EMA's invented-name acceptability review",
      "A WHO-compatible commercial name is automatically accepted by EMA",
      "The commercial name must be a chemical locant",
      "The WHO permanently owns the commercial trademark"
    ],
    "explanation": "INN-stem protection and EMA invented-name assessment are related but distinct checks.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-12",
    "category": "naming",
    "level": 3,
    "topic": "Regulatory strategy",
    "focus": "rules",
    "prompt": "A product naming team proposes one identical fictional brand for the US and EU. What is the most defensible plan?",
    "options": [
      "Check name acceptability separately against FDA and EMA criteria and existing markets",
      "Assume one approval binds both regulators",
      "Check only WHO INN spelling and skip brand review",
      "Treat trademark registration in one jurisdiction as global drug approval"
    ],
    "explanation": "FDA and EMA apply their own brand-name assessments, and trademarks do not replace those reviews.",
    "source": "namingEma",
    "jurisdiction": "EU · EMA centralised procedure"
  },
  {
    "id": "naming-rules-13",
    "category": "naming",
    "level": 3,
    "topic": "Regulatory strategy",
    "focus": "rules",
    "prompt": "A fictional brand is highly marketable but contains a WHO protected stem and resembles an existing product name. Which consideration should take priority?",
    "options": [
      "Address stem appropriation and patient-safety confusion before branding appeal",
      "Prefer memorability over nomenclature and safety",
      "Keep the stem because class similarities are ideal for brands",
      "Ignore potential confusion when packaging colours differ"
    ],
    "explanation": "WHO guidance protects INN stems, and FDA evaluates look-alike and sound-alike risks to patients.",
    "source": "namingWho",
    "jurisdiction": "WHO · INN principles"
  },
  {
    "id": "naming-rules-14",
    "category": "naming",
    "level": 3,
    "topic": "Regulatory strategy",
    "focus": "rules",
    "prompt": "Which statement best distinguishes guidance from an automatic worldwide naming prohibition?",
    "options": [
      "Apply the scope of each regulator's guidance and assess local legal requirements",
      "Every FDA best practice is criminal law in every country",
      "All jurisdictions employ one global trademark examination",
      "An internal policy has the same status as WHO recommendation"
    ],
    "explanation": "Many cited naming rules are guidance or jurisdiction-specific practices; a global blanket prohibition would be inaccurate.",
    "source": "namingFda",
    "jurisdiction": "US · FDA proprietary-name guidance"
  }
];
