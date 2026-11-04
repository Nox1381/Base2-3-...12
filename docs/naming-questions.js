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
 ['-mab (older names)','Many earlier monoclonal antibodies','adalimumab',2],
 ['-vir (broad)','Various antiviral names, without a single implied mechanism','acyclovir',2]
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
