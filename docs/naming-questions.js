// Questions teach practical drug-name and carton reading, not regulatory paperwork.
// Correct answer always appears first here; the game shuffles displayed options.
const PHARMA_STEMS = [
 ['-pril','ACE inhibitors','enalapril',1],
 ['-sartan','Angiotensin II receptor blockers (ARBs)','losartan',1],
 ['-vastatin','HMG-CoA reductase inhibitors (statins)','atorvastatin',1],
 ['-olol','Beta blockers','propranolol',1],
 ['-prazole','Proton-pump inhibitors','omeprazole',1],
 ['-cillin','Penicillin antibiotics','amoxicillin',1],
 ['-gliflozin','SGLT2 inhibitors','empagliflozin',1],
 ['-gliptin','DPP-4 inhibitors','sitagliptin',2],
 ['-floxacin','Fluoroquinolone antibiotics','ciprofloxacin',2],
 ['-cycline','Tetracycline-family antibiotics','doxycycline',2],
 ['-xaban','Factor Xa inhibitors','apixaban',2],
 ['-mab','Many earlier monoclonal antibodies','adalimumab',2],
 ['-vir','Various antiviral names, without a single implied mechanism','acyclovir',2]
];
const PHARMA_BRANDS = [
 ['Panadol','paracetamol','The named plain paracetamol product',1],
 ['Tylenol','acetaminophen','A US product with the same substance as paracetamol',1],
 ['Advil','ibuprofen','The named plain ibuprofen product',1],
 ['Lipitor','atorvastatin','Commonly supplied as atorvastatin calcium',1],
 ['Cozaar','losartan','The potassium salt of losartan',2],
 ['Zestril','lisinopril','An ACE inhibitor example',2],
 ['Prilosec','omeprazole','A proton-pump inhibitor example',2],
 ['Jardiance','empagliflozin','An SGLT2 inhibitor example',2]
];
const PHARMA_NAME_QUESTIONS=[];
function pharmaAdd(id,focus,level,topic,prompt,options,explanation,source) {
 if(options.length!==4 || new Set(options).size!==4) throw new Error('Bad pharmaceutical question '+id);
 PHARMA_NAME_QUESTIONS.push({id:'naming-label-'+id,category:'naming',focus,level,topic,prompt,options,explanation,source,
  jurisdiction:source==='namingStems'?'WHO · naming stems':source==='namingFDAFacts'?'US · OTC label guidance':'Medicine names · learning example'});
}
const pharmaMixWrong=(rows,i,field)=>[1,2,3].map(j=>rows[(i+j)%rows.length][field]);
for(let i=0;i<PHARMA_STEMS.length;i++){
 const [stem,family,example,level]=PHARMA_STEMS[i],others=pharmaMixWrong(PHARMA_STEMS,i,1);
 pharmaAdd('stem-class-'+i,'stems',level,'Recognize a generic-name stem',
  'In generic pharmaceutical naming, what family is suggested by '+stem+'?',
  [family,...others],
  'The shared ending '+stem+' is associated with '+family+'. It cannot by itself tell you dose, route or full chemical structure.','namingStems');
 pharmaAdd('stem-example-'+i,'stems',Math.min(3,level+1),'Find the stem in a name',
  'Which real generic-name example contains the pattern '+stem+'?',
  [example,...pharmaMixWrong(PHARMA_STEMS,i,2)],
  example+' is a recognized example of the ending '+stem+'. Confirm the full ingredient name on the product label.','namingStems');
 pharmaAdd('stem-reverse-'+i,'stems',Math.min(3,level+1),'Decode a family name',
  'Which shared naming stem would you expect in a generic name from the family '+family+'?',
  [stem,...pharmaMixWrong(PHARMA_STEMS,i,0)],
  'The stem '+stem+' is the class clue. Brand names do not need to contain it.','namingStems');
}
for(let i=0;i<PHARMA_BRANDS.length;i++){
 const [brand,generic,comment,level]=PHARMA_BRANDS[i];
 pharmaAdd('brand-to-generic-'+i,'types',level,'Brand versus generic',
  'For the named plain '+brand+' example, which is the generic active ingredient?',
  [generic,...pharmaMixWrong(PHARMA_BRANDS,i,1)],
  brand+' is the brand. '+generic+' is the generic active ingredient for this example. '+comment+'. Always check the exact product variant.','namingWho');
 pharmaAdd('generic-to-brand-'+i,'types',Math.min(3,level+1),'Recognize a brand',
  'Which is a commercial brand associated with '+generic+' in the corresponding named product?',
  [brand,...pharmaMixWrong(PHARMA_BRANDS,i,0)],
  brand+' is a commercial brand. '+generic+' is the generic ingredient for the named example.','namingWho');
 pharmaAdd('ingredient-check-'+i,'labels',level,'Verify a carton',
  'You recognize the brand '+brand+' on a box. What is the safest way to identify its pharmaceutical ingredient?',
  ['Read the exact active ingredient list on this product','Assume every brand variant contains the same substance','Infer ingredients from package colour','Use the batch code as a chemical name'],
  'Recognizing '+brand+' can help, but the active ingredient(s) printed for that particular product are the decisive identifier.','namingFDAFacts');
}
pharmaAdd('paracetamol-chemical','types',1,'Chemical, generic and brand names',
 'Which of the following is a systematic chemical name for paracetamol?',
 ['N-(4-hydroxyphenyl)acetamide','Paracetamol','Panadol','500 mg tablets'],
 'N-(4-hydroxyphenyl)acetamide describes the structure of paracetamol. The brand and dose are different fields.','namingPubChemParacetamol');
pharmaAdd('paracetamol-generic','types',1,'Chemical, generic and brand names',
 'In the trio N-(4-hydroxyphenyl)acetamide / paracetamol / Panadol, which is the generic (INN) name?',
 ['paracetamol','Panadol','N-(4-hydroxyphenyl)acetamide','500 mg'],
 'Paracetamol is the nonproprietary ingredient name. Panadol is a brand and the longer descriptor is structural.','namingWho');
pharmaAdd('paracetamol-brand','types',1,'Chemical, generic and brand names',
 'In the trio N-(4-hydroxyphenyl)acetamide / paracetamol / Panadol, which is the brand name?',
 ['Panadol','Paracetamol','N-(4-hydroxyphenyl)acetamide','Acetamide'],
 'Panadol is the commercial brand name in this example.','namingWho');
pharmaAdd('paracetamol-synonym','types',1,'International and US names',
 'Which US-established generic name is used for the substance named paracetamol internationally?',
 ['Acetaminophen','Atorvastatin','Acyclovir','Amoxicillin'],
 'Paracetamol and acetaminophen refer to the same molecule; the naming varies by market.','namingPubChemParacetamol');
pharmaAdd('chemical-formula','types',2,'Molecular identity',
 'What does the molecular formula C₈H₉NO₂ tell you about paracetamol?',
 ['The elemental atom counts in its molecule','The name of its exclusive manufacturer','That it is a 500 mg tablet','That it is always safe'],
 'A molecular formula counts atoms; it does not give a brand, strength or complete product information.','namingPubChemParacetamol');
pharmaAdd('chemical-not-class','types',2,'Systematic versus nonproprietary',
 'Can you derive a molecule’s complete systematic chemical name from its generic-name ending -sartan alone?',
 ['No; -sartan suggests a drug family, not every bond in the structure','Yes; every -sartan has the same molecular formula','Yes; the stem identifies brand and strength','Yes; all members are the same exact molecule'],
 'A shared pharmacological stem is not a complete chemical-structure description.','namingWho');
pharmaAdd('brand-not-invariant','types',2,'Recognize real brands',
 'Can a familiar brand name guarantee every product variation contains exactly the same ingredients?',
 ['No; read each specific variant’s active ingredient list','Yes; brand names are chemical structures','Yes; the packaging colour guarantees composition','Yes; a brand always contains one active'],
 'A range of products can use variants of a commercial name; use the specific active ingredient list.','namingFDAFacts');
pharmaAdd('stem-vir-warning','stems',3,'Avoid overinterpreting a stem',
 'Does the broad ending -vir establish one exact antiviral mechanism for every name containing it?',
 ['No; different antivirals use more specific patterns','Yes; -vir determines the entire molecule','Yes; -vir establishes an identical dose','Yes; -vir means all products have the same brand'],
 'The ending -vir is broad. A specific mechanism needs more than this fragment.','namingStems');
pharmaAdd('stem-statin-warning','stems',3,'Precise stem recognition',
 'Which more specific ending identifies the HMG-CoA reductase inhibitor statin family?',
 ['-vastatin','-statin as any possible word fragment','-sartan','-olol'],
 'The specific stem is -vastatin. The fragment -statin in an unrelated word is not sufficient alone.','namingStems');


const PHARMA_LABELS=[
 ['LIPITOR','atorvastatin calcium','40 mg per tablet','tablets','-vastatin / statin family'],
 ['COZAAR','losartan potassium','50 mg per tablet','tablets','-sartan / ARB family'],
 ['PANADOL','paracetamol','500 mg per tablet','tablets','Paracetamol is the generic name'],
 ['TYLENOL','acetaminophen','325 mg per tablet','tablets','Acetaminophen is the US name for paracetamol'],
 ['PRILOSEC','omeprazole','20 mg per capsule','delayed-release capsules','-prazole / proton-pump inhibitors'],
 ['JARDIANCE','empagliflozin','10 mg per tablet','tablets','-gliflozin / SGLT2 inhibitors'],
 ['ZESTRIL','lisinopril','5 mg per tablet','tablets','-pril / ACE inhibitors'],
 ['ADVIL','ibuprofen','200 mg per tablet','tablets','The brand does not identify a stem by itself'],
 ['ZOVIRAX','acyclovir','400 mg per tablet','tablets','-vir is a broad antiviral naming clue'],
 ['AMOXIL','amoxicillin','250 mg per 5 mL','oral suspension','-cillin / penicillin family'],
 ['GLUCOPHAGE','metformin','850 mg per tablet','tablets','Do not infer a class from the brand spelling'],
 ['ELIQUIS','apixaban','2.5 mg per tablet','tablets','-xaban / factor Xa inhibitors']
];
for(let i=0;i<PHARMA_LABELS.length;i++){
 const [brand,active,strength,form,clue]=PHARMA_LABELS[i];
 const sample='ILLUSTRATIVE TRAINING LABEL: '+brand+' / '+active+' / '+strength+' / '+form+'.';
 const otherActives=[...new Set(PHARMA_LABELS.filter((x,j)=>j!==i).map(x=>x[1]))].slice(0,3);
 const otherBrands=[...new Set(PHARMA_LABELS.filter((x,j)=>j!==i).map(x=>x[0]))].slice(0,3);
 pharmaAdd('label-api-'+i,'labels',1,'Find active ingredients',sample+' Which text names the active ingredient?',
  [active,...otherActives],
  'The active ingredient is '+active+'. A brand may have different variants; this is a teaching example.','namingFDAFacts');
 pharmaAdd('label-brand-'+i,'labels',1,'Separate brand from generic',sample+' Which is the commercial brand?',
  [brand,...otherBrands],
  brand+' is the brand; '+active+' is the generic ingredient.','namingFDAFacts');
 pharmaAdd('label-strength-'+i,'labels',2,'Decode strength correctly',sample+' Which strength statement is printed?',
  [strength,'5 mL per tablet','20 tablets per dose','Every patient must take '+strength],
  'The label states '+strength+'. This is not a patient-specific dosage instruction.','namingFDAFacts');
 pharmaAdd('label-noninference-'+i,'labels',3,'What can a label prove?',sample+' What CANNOT be concluded from these fields alone?',
  ['That this is the correct dose and medicine for every patient','The brand shown is '+brand,'The listed ingredient is '+active,'The labeled strength is '+strength],
  'A product label identifies a product. Individual suitability and treatment directions require appropriate assessment.','namingFDAFacts');
}
const PHARMA_MODIFIERS=[
 ['hydrochloride','A salt form involving a chloride counterion','That it is guaranteed to act faster'],
 ['sodium','A sodium salt form of the stated substance','That it is a sodium supplement'],
 ['potassium','A potassium salt form of the stated substance','That it always has the same mass as its sodium salt'],
 ['calcium','A calcium salt where indicated','That the product is a calcium supplement'],
 ['monohydrate','A form containing defined water of crystallization','That the ingredient is more clinically effective'],
 ['anhydrous','A material with no crystal water in that specified form','That all batches are chemically identical in every respect'],
 ['ER / XR','An extended-release formulation abbreviation in relevant markets','That a tablet can safely be crushed'],
 ['SR','A sustained-release modifier in some product systems','That the product acts instantaneously'],
 ['delayed release','A dosage form with delayed release behaviour','That the active molecule has changed'],
 ['enteric-coated','A coating designed for a particular release environment','That the product has no risks'],
 ['oral suspension','A liquid dosage form intended for oral administration','That every 5 mL contains the same mass as a tablet'],
 ['topical cream','A dosage form intended for application to the skin','That it is safe to inject'],
 ['Rx only','A prescription-only designation where required','That an ingredient name determines suitability'],
 ['EXP','A product expiration marking','A drug’s pharmacological class'],
 ['LOT / batch','A manufacturing traceability identifier','The molecular structure of an active ingredient'],
 ['inactive ingredient','An excipient rather than a listed active drug substance','That it can never matter to allergies']
];
for(let i=0;i<PHARMA_MODIFIERS.length;i++){
 const [term,meaning,unsupported]=PHARMA_MODIFIERS[i];
 const others=[1,2,3].map(d=>PHARMA_MODIFIERS[(i+d)%PHARMA_MODIFIERS.length][1]);
 pharmaAdd('modifier-meaning-'+i,'forms',i<6?1:2,'Identify a package modifier',
  'A real medicine label includes "'+term+'". What is the best interpretation?',
  [meaning,...others],
  'On a product label, '+term+' generally indicates '+meaning.toLowerCase()+'. Check the exact product description.','namingFDAFacts');
 pharmaAdd('modifier-not-proof-'+i,'forms',i<7?2:3,'Avoid false label inferences',
  'A label mentions "'+term+'". What would be an unjustified inference?',
  [unsupported,meaning,'It is a field that should be interpreted in context','The exact product labeling matters'],
  'The modifier tells you about '+meaning.toLowerCase()+', not the unsupported implication.','namingFDAFacts');
}
const PHARMA_CLAIMS=[
 ['"100% safe with no side effects"','Unqualified safety guarantee without evidence','Clinical safety claims require adequate support and appropriate qualifications'],
 ['"cures every infection"','Sweeping, unsubstantiated efficacy claim','Therapeutic claims must be limited to supported indications'],
 ['"works faster because it is hydrochloride"','Salt identity alone cannot prove onset','Clinical onset requires suitable product evidence'],
 ['"stronger because it is a calcium salt"','Counterion does not automatically prove higher efficacy','Strength and clinical comparison are separate issues'],
 ['"non-drowsy" without supporting data','An unverified safety/tolerability claim','A claim must be supported and comply with local requirements'],
 ['"sugar-free" without a validated composition','An unverified ingredient/composition claim','Definitions and substantiation depend on jurisdiction and dosage form'],
 ['"guaranteed pain relief for everyone"','A universal efficacy promise','Individuals and outcomes vary'],
 ['"the world’s safest medicine"','An unsubstantiated superiority claim','Comparative claims require defensible evidence'],
 ['"zero risk"','An absolute safety assertion','No product name alone establishes the absence of risk'],
 ['"new chemical structure because it is XR"','Confusing release technology with molecular identity','XR typically describes formulation rather than a new active moiety'],
 ['"same brand, so identical ingredient list"','Brand variants may have differing components','Read the exact active ingredient list'],
 ['"more effective because it dissolves faster in a lab"','In-vitro dissolution alone does not prove clinical superiority','Clinical outcomes need appropriate evidence'],
 ['"a bigger mg number is always the better medicine"','Different substances and strengths are not interchangeable','Strength does not by itself prove comparative clinical efficacy'],
 ['"a -pril name guarantees a safe dose"','An INN stem indicates family, not patient dose','Dose and suitability are independent questions'],
 ['"monohydrate means faster acting"','Crystal water does not automatically establish clinical onset','Physical form is not a clinical efficacy claim'],
 ['"all products ending in -vir use the same mechanism"','The ending is too broad for that conclusion','Antiviral families can differ']
];
for(let i=0;i<PHARMA_CLAIMS.length;i++){
 const [claim,problem,better]=PHARMA_CLAIMS[i];
 pharmaAdd('claim-risk-'+i,'claims',i<8?1:2,'Check a medicine claim',
  'A product name or label suggests '+claim+'. What is the main problem?',
  [problem,'The name must include the manufacturer’s address','The active ingredient should be written as a chemical equation','Every generic medicine must have a short brand'],
  problem+'. '+better+'.','namingFDAClaims');
 pharmaAdd('claim-better-'+i,'claims',3,'Evidence versus implication',
  'For the statement '+claim+', which approach is defensible?',
  [better,'Assume every claim is true because it appears in a brand','Infer the same benefit for every formulation','Skip checking the active ingredient and dosage form'],
  'Avoid unsupported wording. '+better+'.','namingEMAClaims');
}
pharmaAdd('liquid-concentration','labels',2,'Strength per volume',
 'A liquid medicine says 250 mg per 5 mL. What is the concentration?',
 ['50 mg/mL','250 mg/mL','5 mg/mL','1250 mg/mL'],
 'Divide 250 mg by 5 mL to get 50 mg per mL. This is a unit conversion, not a dosing recommendation.','namingFDAFacts');
pharmaAdd('lot-vs-exp','labels',1,'Batch versus expiry',
 'On a medicine carton, what does LOT typically mean?',
 ['Production batch identifier','The generic active ingredient','The expiry date','The recommended daily dose'],
 'LOT supports batch traceability. EXP usually identifies the expiration date.','namingFDAFacts');
pharmaAdd('exp-vs-lot','labels',1,'Batch versus expiry',
 'On a medicine carton, what does EXP typically mean?',
 ['Expiration date','Manufacturer’s pharmacological class','INN naming stem','Chemical molecular formula'],
 'EXP is an expiration marker; LOT is a batch code. Local date conventions can differ.','namingFDAFacts');
pharmaAdd('dual-actives','labels',2,'Combination products',
 'ILLUSTRATIVE: a tablet says paracetamol 500 mg + caffeine 65 mg. What is the active-ingredient count?',
 ['Two distinct active ingredients','One active ingredient because it is one tablet','Zero active ingredients because caffeine is not part of the brand','Three active ingredients because mg is a third item'],
 'The printed formulation identifies paracetamol and caffeine as two actives, with separate strengths.','namingFDAFacts');
pharmaAdd('salt-lipitor','forms',3,'Equivalent strength and salt forms',
 'Official Lipitor labeling: 40 mg atorvastatin is provided as atorvastatin calcium. What does 40 mg refer to?',
 ['The atorvastatin-equivalent declared strength','40 mg elemental calcium','40 mg of all inactive ingredients combined','40 mg taken by every patient each day'],
 'The label specifies atorvastatin-equivalent strength, with atorvastatin calcium as the substance form.','namingDailyMedLipitor');
export const NAMING_QUESTIONS = PHARMA_NAME_QUESTIONS;
