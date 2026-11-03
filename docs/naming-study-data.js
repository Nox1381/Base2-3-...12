// Teaching content only; hypothetical names are not screened or approved.
// WHO, IUPAC, USAN, US FDA and EMA source scopes are separated in each lesson.
export const NAMING_STUDY_SOURCES = {
  "who": {
    "name": "WHO · Guidance on INN",
    "url": "https://www.who.int/teams/health-product-and-policy-standards/inn/guidance-on-inn"
  },
  "whoSelection": {
    "name": "WHO · How an INN is selected",
    "url": "https://www.who.int/teams/health-product-and-policy-standards/inn/selection"
  },
  "iupac": {
    "name": "IUPAC · Nomenclature",
    "url": "https://iupac.org/what-we-do/nomenclature/"
  },
  "usan": {
    "name": "AMA · USAN naming guidelines",
    "url": "https://www.ama-assn.org/about/united-states-adopted-names-usan/united-states-adopted-names-naming-guidelines"
  },
  "fdaBrand": {
    "name": "US FDA · Proprietary-name best practices (2020)",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/best-practices-developing-proprietary-names-human-prescription-drug-products-guidance-industry"
  },
  "ema": {
    "name": "EMA · Acceptability of invented names (revision 7)",
    "url": "https://www.ema.europa.eu/en/scientific-guidelines/acceptability-names-human-medicinal-products-processed-through-centralised-procedure"
  },
  "fdaBio": {
    "name": "US FDA · Nonproprietary naming of biological products (2017)",
    "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/nonproprietary-naming-biological-products-guidance-industry"
  }
};
export const NAMING_STUDY_LESSONS = [
  {
    "id": "map",
    "title": "Why one substance has different names",
    "tag": "Start here",
    "focus": "systems",
    "duration": "Basics",
    "objective": "Understand the job of each name before memorizing any naming rule.",
    "opener": "Imagine a research company has discovered a fictional active substance. Different teams need to talk about it: chemists need a precise identity, researchers need a tracking label, regulators need a shared public name, and customers may see a commercial brand. These are different jobs, not four synonyms.",
    "visual": "layers",
    "sections": [
      {
        "title": "The four-name map",
        "body": "A chemical or systematic name describes the substance's molecular structure. An internal development code labels a candidate while it is being studied. A generic or nonproprietary name identifies the active substance across companies. A proprietary or brand name identifies a marketed product. One active substance may have several brands, but its public substance identity is meant to be consistent."
      },
      {
        "title": "Fictional example",
        "body": "Picture a candidate tracked as QX-204. The structural name would come from its chemistry, not that code. If a WHO International Nonproprietary Name (INN) is later recommended, that name is available to everyone. A company might separately propose a commercial name, such as the invented example “Velmora”. These are teaching labels, not verified available or approved names.",
        "example": "Research code: QX-204 → substance-level name: WHO INN (only after the WHO process) → commercial product: proposed brand “Velmora”."
      },
      {
        "title": "The key rule",
        "body": "Do not infer authorisation from a name. Giving a candidate a code, constructing a chemical name, securing a trademark or proposing an INN does not, by itself, authorise a medicinal product to be marketed."
      }
    ],
    "takeaways": [
      "Chemical name = structure.",
      "Development code = internal project tracking.",
      "INN = public identity of the substance.",
      "Brand = proposed commercial identity; acceptance is a separate step."
    ],
    "glossary": [
      [
        "INN",
        "International Nonproprietary Name: a public name selected by WHO for an active substance."
      ],
      [
        "Proprietary",
        "Owned or controlled commercially, such as a trademark, subject to applicable law."
      ]
    ],
    "checks": [
      {
        "question": "A document uses “QX-204” to track a hypothetical compound before official naming. What is it?",
        "options": [
          "An internal development code",
          "A WHO-recommended INN",
          "A marketed brand approval",
          "A chemical structure formula"
        ],
        "answer": 0,
        "explanation": "Internal codes track research candidates. They do not become official names or approvals simply by being used."
      },
      {
        "question": "What is the primary purpose of a WHO-recommended INN?",
        "options": [
          "Identify an active substance publicly",
          "Identify the only company permitted to sell it",
          "Describe every bond in the molecule",
          "Prove the product is approved"
        ],
        "answer": 0,
        "explanation": "An INN provides a shared public active-substance name; it is neither a trademark nor a marketing authorisation."
      }
    ],
    "sources": [
      "who",
      "iupac"
    ]
  },
  {
    "id": "chemical",
    "title": "Chemical names and development codes",
    "tag": "Identity",
    "focus": "systems",
    "duration": "Basics",
    "objective": "Tell a structure-based name from a convenient research label.",
    "opener": "A chemist cannot rely on a catchy invented word to describe a molecular structure. A systematic name is built from chemical naming conventions; an internal code does not attempt to encode a full structure.",
    "visual": "chemical",
    "sections": [
      {
        "title": "What systematic nomenclature does",
        "body": "IUPAC develops recommendations for systematic chemical nomenclature. A systematic name can reflect a parent structure, bond positions, functional groups and—in relevant cases—stereochemistry. It aims to give chemists a precise way to refer to the structure, but the full rules depend on the type of chemical compound."
      },
      {
        "title": "What a development code does",
        "body": "A fictional code such as “LAB-684” may identify a research candidate in experiments, databases and trial documents. Its letters and digits are a sponsor's internal convention; they do not automatically encode chemistry, dosage, efficacy or legal status.",
        "example": "“LAB-684” = tracking identifier; “a systematic name based on the actual structure” = chemical identity. The code cannot replace structural verification."
      },
      {
        "title": "Why both exist",
        "body": "Research codes are compact and convenient when candidate identities or programmes are evolving. A chemical systematic name is based on the compound itself. Neither is the same thing as WHO selecting a public INN or a medicine regulator assessing a product brand."
      }
    ],
    "takeaways": [
      "IUPAC gives structural naming recommendations.",
      "Codes help researchers track candidates.",
      "A code cannot establish a chemical structure or regulatory approval."
    ],
    "glossary": [
      [
        "IUPAC",
        "International Union of Pure and Applied Chemistry."
      ],
      [
        "Stereochemistry",
        "How atoms are arranged in three-dimensional space; relevant in some systematic names."
      ]
    ],
    "checks": [
      {
        "question": "Which naming type is constructed from the actual molecule's structure?",
        "options": [
          "Systematic chemical name",
          "Research code",
          "Advertising slogan",
          "Trademark search result"
        ],
        "answer": 0,
        "explanation": "Chemical nomenclature expresses structural identity; codes and commercial labels serve different purposes."
      },
      {
        "question": "A fictional candidate's code changes from “LAB-684” to “LAB-685”. What can you conclude?",
        "options": [
          "Its internal identifier changed, but little else",
          "WHO formally recommended a new INN",
          "Its chemical structure necessarily changed",
          "A brand was automatically approved"
        ],
        "answer": 0,
        "explanation": "The tracking label alone does not establish any chemical, regulatory or clinical change."
      }
    ],
    "sources": [
      "iupac",
      "who"
    ]
  },
  {
    "id": "inn",
    "title": "Generic names, INNs and protected stems",
    "tag": "WHO",
    "focus": "inn",
    "duration": "Core",
    "objective": "Understand why generic names are shared and why common stems need protection.",
    "opener": "A generic name should not work like a private brand. WHO's INN system is designed to provide a shared, recognizable name for active substances, even when different companies market products containing them.",
    "visual": "stems",
    "sections": [
      {
        "title": "What WHO selects",
        "body": "The World Health Organization selects International Nonproprietary Names for pharmaceutical substances. A recommended INN is in the public domain and is intended for common use; it should not be claimed as an exclusive trademark. INNs are normally devised for individual, well-defined substances."
      },
      {
        "title": "The purpose of common stems",
        "body": "Some INNs contain shared word elements, called stems, that signal pharmacological relationships. The distinction is important: a stem communicates a family relationship, not identical dosage, strength, efficacy or interchangeable products. Stem placement and meanings are governed by WHO rules, rather than made up by a manufacturer."
      },
      {
        "title": "What to avoid in trademarks",
        "body": "WHO urges applicants not to derive trademarks from INNs or incorporate established common INN stems. Why? Turning a shared nomenclature element into a commercial brand can confuse product identities and restrict naming future related substances.",
        "example": "Teaching rule only: pretend “-vex” is a protected stem. A proposed brand ending in “-vex” would be a bad choice under that hypothetical rule. “-vex” is NOT presented as a real WHO stem."
      }
    ],
    "takeaways": [
      "INNs are public substance names, not private brands.",
      "Common stems indicate pharmacological relationships.",
      "WHO discourages using INNs and their common stems in trademarks.",
      "Never treat a fictional example stem as an official WHO stem."
    ],
    "glossary": [
      [
        "Stem",
        "A shared naming element used for a pharmacological group."
      ],
      [
        "Nonproprietary",
        "Not exclusive to a company as a product trademark."
      ]
    ],
    "checks": [
      {
        "question": "Why do some INNs share a stem?",
        "options": [
          "To indicate a pharmacological relationship",
          "To declare the same marketing owner",
          "To guarantee an identical dose",
          "To encode a package size"
        ],
        "answer": 0,
        "explanation": "Shared stems help relate substance names by pharmacological class. They do not imply matching doses or owners."
      },
      {
        "question": "In a fictional classroom example, “-vex” is declared a protected INN stem. What should a company do with a proposed brand “Solvex”?",
        "options": [
          "Reconsider the brand because it uses the protected stem",
          "Register the shared stem as exclusive property",
          "Assume a capital V makes the stem available",
          "Use the stem to advertise superior efficacy"
        ],
        "answer": 0,
        "explanation": "WHO advises against incorporating established INN stems in proprietary names. The stem in this exercise is hypothetical."
      }
    ],
    "sources": [
      "who",
      "whoSelection"
    ]
  },
  {
    "id": "process",
    "title": "How WHO selects an INN",
    "tag": "WHO",
    "focus": "inn",
    "duration": "Core",
    "objective": "Recognise proposed versus recommended INNs and the formal objection stage.",
    "opener": "Applicants do not award themselves an official INN. They request one; WHO's expert-led procedure selects and publishes names in stages.",
    "visual": "timeline",
    "sections": [
      {
        "title": "Step 1 — Request and expert review",
        "body": "A manufacturer or inventor requests an INN and may suggest candidate names. WHO reviews them against naming principles, existing names and possible conflicts. An expert review process selects a candidate; the sponsor cannot simply declare a suggestion official."
      },
      {
        "title": "Step 2 — Proposed INN",
        "body": "The selected candidate is published as a proposed INN. Interested parties have a four-month period to comment or lodge a formal objection—for example because of a conflicting trademark. WHO advises against premature reliance on a proposed name because it may change.",
        "example": "“Proposed” is a real procedural status, not a synonym for “recommended”."
      },
      {
        "title": "Step 3 — Recommended INN",
        "body": "If no unresolved objection remains, WHO publishes a recommended INN. A maintained formal objection prevents that recommendation until it is resolved. Once recommended, the name is available in the public domain for shared substance identification."
      }
    ],
    "takeaways": [
      "Applicant requests; WHO selects.",
      "Proposed INN → four-month objection period → recommended INN.",
      "An unresolved formal objection blocks recommendation.",
      "An INN does not itself approve a medicine for sale."
    ],
    "glossary": [
      [
        "Proposed INN",
        "A WHO-selected candidate published for objections."
      ],
      [
        "Recommended INN",
        "The final published INN, normally stable and in public use."
      ]
    ],
    "checks": [
      {
        "question": "A name has just appeared on WHO's proposed-INN list. Which statement is accurate?",
        "options": [
          "It is open to a four-month comment/objection period",
          "It is already a privately owned registered trademark",
          "A product is automatically approved for sale",
          "There is no further WHO naming stage"
        ],
        "answer": 0,
        "explanation": "WHO publishes a proposed name before the recommendation stage and allows four months for comment and objection."
      },
      {
        "question": "A formal trademark objection remains unresolved. Can WHO publish that proposed name as recommended?",
        "options": [
          "No; it remains unresolved until a suitable outcome",
          "Yes; every proposal becomes recommended automatically",
          "Yes; if the sponsor likes the name",
          "Only if the candidate name is uppercase"
        ],
        "answer": 0,
        "explanation": "WHO will not publish a recommended INN while a formal objection is maintained."
      }
    ],
    "sources": [
      "who",
      "whoSelection"
    ]
  },
  {
    "id": "usan",
    "title": "USAN and the design of generic names",
    "tag": "United States",
    "focus": "inn",
    "duration": "Core",
    "objective": "Know the difference between WHO INN and USAN, and recognise common prefix pitfalls.",
    "opener": "The US has a national adopted-name programme called USAN. It works closely with the global nonproprietary naming system; a national adopted name is not the same as an invented brand.",
    "visual": "usan",
    "sections": [
      {
        "title": "USAN versus INN",
        "body": "USAN means United States Adopted Names. It names drug substances within the US nomenclature system and cooperates closely with WHO. National adopted names and INNs are usually aligned, although rare differences exist. USAN is not a commercial brand licensing agency."
      },
      {
        "title": "What a proposed prefix should not imply",
        "body": "USAN's naming guidelines discourage or reject prefixes that claim better effectiveness, suggest a particular medical condition or refer to the developer's company. These are naming-design criteria: a word element should support neutral identification rather than function as an advertisement."
      },
      {
        "title": "A naming design test",
        "body": "Consider three fictional prefix ideas: “Best-” (suggests superiority), “CompanyX-” (suggests the owner) and “Cure-” (suggests a therapeutic promise). Each raises concerns for a nonproprietary name. A neutral, distinctive prefix still needs expert examination; there is no automatic acceptance based on this example.",
        "example": "A neutral-sounding invented prefix is not automatically an acceptable USAN: experts must still assess conflicts, common stems and the exact substance."
      }
    ],
    "takeaways": [
      "USAN = US national nonproprietary naming system.",
      "WHO INNs and USAN names usually align, but not always.",
      "Avoid sponsor references, unsupported superiority and indication suggestions in proposed generic names."
    ],
    "glossary": [
      [
        "USAN",
        "United States Adopted Names programme."
      ],
      [
        "Prefix",
        "The initial part of a compound word/name, whose choice can affect clarity and neutrality."
      ]
    ],
    "checks": [
      {
        "question": "How do USAN and WHO INN generally relate?",
        "options": [
          "They are separate but coordinated nonproprietary naming systems",
          "USAN is a trademark register for commercial brands",
          "Every WHO INN is always identical in every country without exception",
          "USAN only assigns laboratory project codes"
        ],
        "answer": 0,
        "explanation": "USAN is a national nomenclature programme that works closely with WHO; exact identity across all jurisdictions is not guaranteed."
      },
      {
        "question": "What is problematic about a fictional USAN prefix that means “more effective than all others”?",
        "options": [
          "It implies therapeutic superiority rather than neutral identification",
          "It accurately describes stereochemistry",
          "Such prefixes are compulsory for USANs",
          "It proves the active ingredient's clinical efficacy"
        ],
        "answer": 0,
        "explanation": "USAN guidance rejects prefixes implying better or more effective products."
      }
    ],
    "sources": [
      "usan",
      "who"
    ]
  },
  {
    "id": "brands",
    "title": "Commercial names: what is safe to propose?",
    "tag": "United States",
    "focus": "brand",
    "duration": "Core",
    "objective": "Screen a fictional brand for confusion and misleading messages.",
    "opener": "Brand names are not chosen solely for memorability. In US prescription medicines, the FDA evaluates proposed proprietary names for risks such as prescribing errors and misleading messages. Trademark availability is a different check.",
    "visual": "brand",
    "sections": [
      {
        "title": "Look-alike and sound-alike",
        "body": "Two imaginary names may differ by only one letter yet be difficult to distinguish when spoken, typed or handwritten. That may lead to a patient receiving the wrong product. FDA encourages sponsors to evaluate both spelling and pronunciation, not just exact matches."
      },
      {
        "title": "Misleading claims and modifiers",
        "body": "A proposed brand should not imply unsupported superiority, guaranteed cures or broader use than the evidence supports. FDA also flags error-prone numerals, symbols and abbreviations that might be confused with product strength or instructions. These are guidance-based risk factors, not a claim that every symbol is universally illegal.",
        "example": "“Vemora” versus “Vemoro” in a fictional exercise: the similarity calls for closer examination. An available trademark or a changed logo does not settle the medication-error question."
      },
      {
        "title": "A practical pre-screening sequence",
        "body": "First brainstorm names without protected INN stems. Next check possible meanings, look-alike and sound-alike candidates, potential confusion with dose or route, and trademark conflicts. Then submit the proposed name through the relevant product regulatory process. A marketing team cannot grant drug-name approval."
      }
    ],
    "takeaways": [
      "Brand name ≠ INN.",
      "Sound and appearance both matter.",
      "No unsupported benefit or safety promises.",
      "A trademark search does not replace FDA name review."
    ],
    "glossary": [
      [
        "Look-alike/sound-alike",
        "Names that could be confused in writing or speech."
      ],
      [
        "Misbranding",
        "Misleading presentation of a medicinal product under applicable regulatory law."
      ]
    ],
    "checks": [
      {
        "question": "Two proposed fictional US brands sound almost identical, despite different spelling. What should be assessed?",
        "options": [
          "Potential sound-alike medication errors",
          "Only whether the logo is unique",
          "Only the IUPAC chemical formula",
          "Whether both brands use the same font"
        ],
        "answer": 0,
        "explanation": "FDA brand-name evaluation considers phonetic and orthographic confusion risks."
      },
      {
        "question": "A sponsor has secured a trademark for a US prescription brand. What does that establish about FDA name acceptance?",
        "options": [
          "Nothing conclusive; the FDA review is separate",
          "The FDA must accept the brand",
          "The name has become a WHO-recommended INN",
          "The drug is approved for marketing"
        ],
        "answer": 0,
        "explanation": "Trademark rights and drug-regulatory name screening serve different purposes."
      }
    ],
    "sources": [
      "fdaBrand",
      "who"
    ]
  },
  {
    "id": "eu",
    "title": "EU versus US: who reviews the brand?",
    "tag": "Regional rules",
    "focus": "rules",
    "duration": "Core",
    "objective": "Separate WHO, FDA and EMA responsibilities when a company wants to market in different regions.",
    "opener": "The same proposed invented brand does not automatically pass review worldwide. Regulators use their own criteria, and the European Medicines Agency has a specific name-review procedure for centrally authorised medicines.",
    "visual": "regions",
    "sections": [
      {
        "title": "EU centrally authorised names",
        "body": "For human medicines using the EU centralised procedure, the European Medicines Agency (EMA) assesses invented names through its Name Review Group (NRG). It considers confusion with existing product names, misleading therapeutic or promotional messages, and other public-health issues. EMA's published guideline is revision 7."
      },
      {
        "title": "US proposed proprietary names",
        "body": "The US Food and Drug Administration (FDA) evaluates proposed proprietary names in its applicable product review context. Its guidance specifically aims to reduce medication errors and misleading names. FDA review of brands is different from WHO/USAN selection of nonproprietary names."
      },
      {
        "title": "What a multinational naming team does",
        "body": "For a fictional substance, identify the public INN/USAN naming route separately from the desired brand names. Assess trademark and regulatory name acceptability in each intended market, not just the headquarters country. An EMA centralised procedure is not automatically the naming procedure for every national EU application.",
        "example": "A brand candidate suitable to one review framework may still raise a sound-alike or promotional-name issue under another. Never assume a single global brand approval."
      }
    ],
    "takeaways": [
      "WHO handles international nonproprietary naming.",
      "USAN addresses US adopted nonproprietary names.",
      "FDA reviews US proprietary prescription names.",
      "EMA's NRG reviews invented names in the EU centralised procedure."
    ],
    "glossary": [
      [
        "EMA",
        "European Medicines Agency."
      ],
      [
        "NRG",
        "Name Review Group, the EMA body reviewing invented names in the centralised procedure."
      ]
    ],
    "checks": [
      {
        "question": "Who reviews invented commercial names for centrally authorised human medicines in the EU?",
        "options": [
          "EMA's Name Review Group",
          "IUPAC's chemical naming committee",
          "The WHO INN expert panel as a trademark office",
          "The medicine's distributor"
        ],
        "answer": 0,
        "explanation": "The EMA Name Review Group handles invented-name acceptability in the EU centralised procedure."
      },
      {
        "question": "A fictional product will seek marketing approval in both the US and EU. How should its proposed brand be assessed?",
        "options": [
          "Against each relevant regulator's name-acceptability criteria",
          "Once globally by filing a WHO INN",
          "Only by checking domain-name availability",
          "By treating US trademark registration as EU acceptance"
        ],
        "answer": 0,
        "explanation": "National/regional medication-safety, trademark and product naming assessments have separate scopes."
      }
    ],
    "sources": [
      "ema",
      "fdaBrand",
      "who"
    ]
  },
  {
    "id": "biologics",
    "title": "Special case: US biologic suffixes",
    "tag": "Biologics",
    "focus": "bio",
    "duration": "Core",
    "objective": "Read the US FDA suffix format without mistaking it for a universal naming rule.",
    "opener": "Some biological products have a different naming convention under US FDA guidance. It is important to understand both the rule and its limited scope.",
    "visual": "suffix",
    "sections": [
      {
        "title": "The shape of a covered name",
        "body": "For products within the scope of FDA's 2017 guidance, the nonproprietary name uses a core name, a hyphen and an FDA-designated four-letter lowercase suffix. At least three of those four letters should be different. The suffix is intended to be distinctive and devoid of meaning.",
        "example": "Fictional format demonstration: “core-name-qzrt”. The suffix “qzrt” has four lowercase letters and four distinct letters. This illustrates format, NOT an actual FDA-designated name."
      },
      {
        "title": "Which suffixes fail the first filter?",
        "body": "“-aabb” has four lowercase letters but only two distinct letters. “-Qzrt” contains uppercase. “-q7rt” includes a digit. FDA also advises avoiding suffixes that suggest the licence holder, a drug name or a clinical abbreviation, or that resemble another assigned suffix."
      },
      {
        "title": "What the suffix does NOT prove",
        "body": "The suffix helps distinguish nonproprietary names of biological products within this US convention. It does not tell you the dose, efficacy, manufacturer or clinical interchangeability. Not every medicine is a biologic; do not apply this convention to every generic drug or outside its US regulatory scope."
      }
    ],
    "takeaways": [
      "US-specific guidance for covered biological products.",
      "Format: core name + hyphen + four lowercase letters.",
      "At least three distinct letters; no intended meaning.",
      "Passing the format test is not FDA acceptance."
    ],
    "glossary": [
      [
        "Biologic",
        "A biological medical product; the naming guidance applies to specified products regulated under US law."
      ],
      [
        "Core name",
        "The shared part of the nonproprietary name before the identifying suffix."
      ]
    ],
    "checks": [
      {
        "question": "Which fictional suffix passes the basic FDA four-letter, lowercase, three-distinct-letter format test?",
        "options": [
          "-qzrt",
          "-aabb",
          "-Qzrt",
          "-q7rt"
        ],
        "answer": 0,
        "explanation": "qzrt contains four lowercase alphabetic characters and at least three different letters. Other conditions must still be checked."
      },
      {
        "question": "A fictional biologic name has a properly formatted suffix. What can you infer?",
        "options": [
          "Only that it meets some formal format requirements",
          "That the product has FDA marketing approval",
          "That the product is interchangeable with another biologic",
          "That the suffix describes the dose"
        ],
        "answer": 0,
        "explanation": "Format is only one part of naming review; it neither authorises the product nor establishes interchangeability."
      }
    ],
    "sources": [
      "fdaBio"
    ]
  },
  {
    "id": "capstone",
    "title": "Build a naming plan from scratch",
    "tag": "Practice",
    "focus": "rules",
    "duration": "Apply",
    "objective": "Use all the naming layers and regional checks in a complete imaginary case.",
    "opener": "You are part of the naming team for an entirely fictional active substance, currently called “LX-318”. It is being studied in the US and EU. The team wants a public substance name, a commercial brand and possibly a US biologic suffix if the product falls within the relevant FDA guidance.",
    "visual": "workflow",
    "sections": [
      {
        "title": "First: separate the identities",
        "body": "Keep “LX-318” as the development code. Chemists document its true structure using appropriate chemical nomenclature. Request an INN through WHO's process; do not treat a proposed INN as final or use a brand as a substitute."
      },
      {
        "title": "Second: design without stealing a common name",
        "body": "Review WHO stems and USAN principles for an INN proposal. The commercial brand should be distinct, neutral in its claims and screened for confusing similarity, including pronunciation. A fictional name that resembles an existing one or promises a guaranteed cure deserves redesign."
      },
      {
        "title": "Third: route by market and product type",
        "body": "For a US prescription brand, apply FDA brand guidance. For a centrally authorised EU invented name, apply EMA review. If this is a biologic covered by FDA's suffix convention, evaluate the separate suffix criteria. Keep the marketing authorisation decision separate from whether a name looks or sounds acceptable.",
        "example": "Decision order: What am I naming? → Which type of name? → Is there a protected element or confusion risk? → Which authority reviews it? → Has the relevant name and product actually been accepted?"
      }
    ],
    "takeaways": [
      "Identify the naming layer before applying a rule.",
      "Screen names against stems, misleading claims and confusion.",
      "Use the appropriate WHO, national and regional processes.",
      "After this lesson, start with Starter difficulty and broaden to Standard and Advanced."
    ],
    "glossary": [
      [
        "Naming clearance",
        "The process of reviewing a proposed name for conflicts and acceptability, not the same thing as product approval."
      ],
      [
        "Marketing authorisation",
        "A regulator's permission to market a medicinal product; separate from naming design."
      ]
    ],
    "checks": [
      {
        "question": "In this case, what is “LX-318” before any WHO naming action?",
        "options": [
          "The fictional development code",
          "A final WHO-recommended INN",
          "An EMA-accepted invented name",
          "A US FDA biologic suffix"
        ],
        "answer": 0,
        "explanation": "The made-up code is merely the candidate's internal research identifier."
      },
      {
        "question": "Which plan best keeps the responsibilities of the naming systems separate?",
        "options": [
          "Chemical structure → WHO INN → brand safety by market → product approval",
          "Trademark → automatically becomes a WHO INN → global marketing approval",
          "Sponsor chooses any INN and every country must accept it",
          "A four-letter suffix alone authorises all biologic products"
        ],
        "answer": 0,
        "explanation": "Structure description, shared naming, proprietary-name acceptance and marketing authorisation are different activities, often under different authorities."
      }
    ],
    "sources": [
      "who",
      "usan",
      "fdaBrand",
      "ema",
      "fdaBio",
      "iupac"
    ]
  }
];
