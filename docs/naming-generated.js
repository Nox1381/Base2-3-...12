// Random structure-naming and drug-family stem exercises. No procedural or approval questions.
const NAMING_PARENT_ROOTS=['','meth','eth','prop','but','pent','hex','hept','oct'];
const pickNamingValue=(a,rng)=>a[Math.floor(rng()*a.length)];
const namingRandInt=(min,max,rng)=>min+Math.floor(rng()*(max-min+1));
const NAMING_FAMILY_STEMS=[['-pril','ACE inhibitors'],['-sartan','angiotensin II receptor blockers'],['-olol','beta blockers'],['-prazole','proton-pump inhibitors'],['-cillin','penicillin antibiotics'],['-gliflozin','SGLT2 inhibitors'],['-vastatin','HMG-CoA reductase inhibitors (statins)']];
export function makeNamingGeneratedQuestion(settings,rng=Math.random){
 const focusOptions=['chains','groups','positions','complex','stems'];
 const focus=settings.namingFocus&&settings.namingFocus!=='all'?settings.namingFocus:pickNamingValue(focusOptions,rng);
 if(!focusOptions.includes(focus))throw new RangeError('Unknown naming focus');
 const difficulty=Number(settings.difficulty)||1,randomKey=[0,1,2].map(()=>Math.floor(rng()*1000000000)).join('-');
 let prompt,options,explanation,level,topic,source,jurisdiction;
 if(focus==='chains'){
  const n=namingRandInt(4,8,rng),root=NAMING_PARENT_ROOTS[n],alkene=difficulty>1&&rng()<0.5;
  const formula=alkene?'CH₂=CH'+'CH₂'.repeat(n-3)+'CH₃':'CH₃'+'CH₂'.repeat(n-2)+'CH₃';
  const answer=alkene?root+'-1-ene':root+'ane';
  prompt='Name the condensed structure: '+formula+'.';
  options=alkene?[answer,root+'ane',root+'-1-yne',NAMING_PARENT_ROOTS[n-1]+'-1-ene']:[answer,root+'ene',root+'yne',NAMING_PARENT_ROOTS[n-1]+'ane'];
  explanation='Count '+n+' carbons and '+(alkene?'a double bond starting at C1':'only single carbon-carbon bonds')+'. The name is '+answer+'.';
  level=alkene?2:1;topic='Chains and unsaturation';source='namingChemGuide';jurisdiction='IUPAC · chain naming';
 }else if(focus==='groups'){
  const n=namingRandInt(3,6,rng),root=NAMING_PARENT_ROOTS[n],kind=pickNamingValue(difficulty===1?['alcohol','aldehyde','acid']:['alcohol','aldehyde','acid','ketone'],rng);
  let formula,name;
  if(kind==='alcohol'){formula='CH₃'+'CH₂'.repeat(n-1)+'OH';name=root+'an-1-ol';}
  if(kind==='aldehyde'){formula='CH₃'+'CH₂'.repeat(n-2)+'CHO';name=root+'anal';}
  if(kind==='acid'){formula='CH₃'+'CH₂'.repeat(n-2)+'COOH';name=root+'anoic acid';}
  if(kind==='ketone'){formula='CH₃CO'+'CH₂'.repeat(n-3)+'CH₃';name=n===3?'propanone':root+'an-2-one';}
  prompt='Identify the functional group and name '+formula+'.';
  options=[name,root+'anal',root+'an-1-ol',root+'anoic acid'].filter((x,i,a)=>a.indexOf(x)===i);
  for(const c of [root+'an-2-one',NAMING_PARENT_ROOTS[n-1]+'anoic acid',NAMING_PARENT_ROOTS[n-1]+'an-1-ol'])if(options.length<4&&!options.includes(c))options.push(c);
  explanation='The main functional group is '+kind+' and the parent contains '+n+' carbons, giving '+name+'.';
  level=kind==='ketone'?2:1;topic='Functional groups';source='namingChemGuide';jurisdiction='IUPAC · functional groups';
 }else if(focus==='positions'){
  const n=namingRandInt(5,8,rng),root=NAMING_PARENT_ROOTS[n],formula='CH₃CH(CH₃)'+'CH₂'.repeat(n-3)+'CH₃',correct='2-methyl'+root+'ane';
  prompt='Name the branched condensed structure '+formula+'.';
  options=[correct,'3-methyl'+root+'ane','2-ethyl'+root+'ane',n===8?'octane':NAMING_PARENT_ROOTS[n+1]+'ane'];
  explanation='The main chain contains '+n+' carbons. The methyl group is on carbon 2, giving '+correct+'.';
  level=2;topic='Branches and locants';source='namingOrgChem';jurisdiction='IUPAC · locants';
 }else if(focus==='complex'){
  const n=namingRandInt(2,5,rng),acid=NAMING_PARENT_ROOTS[n]+'anoate',alkyl=pickNamingValue(['methyl','ethyl'],rng);
  const formula='CH₃'+'CH₂'.repeat(n-2)+'C(=O)O'+(alkyl==='methyl'?'CH₃':'CH₂CH₃');
  const alt=alkyl==='methyl'?'ethyl':'methyl',otherAcid=NAMING_PARENT_ROOTS[n+1]+'anoate',answer=alkyl+' '+acid;
  prompt='Name the ester structure '+formula+'.';
  options=[answer,alt+' '+acid,alkyl+' '+otherAcid,alt+' '+otherAcid];
  explanation='The oxygen-side group is '+alkyl+'; the acid-side name is '+acid+'. Hence '+answer+'.';
  level=2;topic='Ester naming';source='namingOrgChem';jurisdiction='IUPAC · esters';
 }else{
  const i=namingRandInt(0,NAMING_FAMILY_STEMS.length-1,rng),stem=NAMING_FAMILY_STEMS[i][0],family=NAMING_FAMILY_STEMS[i][1],invented=pickNamingValue(['tore','luma','zela','nivo','femi','riva','xeno','kavi'],rng)+stem.slice(1);
  prompt='In the invented training name "'+invented+'", which family does the shared ending '+stem+' suggest?';
  options=[family,...[1,2,3].map(j=>NAMING_FAMILY_STEMS[(i+j)%NAMING_FAMILY_STEMS.length][1])];
  explanation='The shared stem '+stem+' corresponds to '+family+'. This fictional name is only a pattern-recognition exercise.';
  level=1;topic='Pharmacological name stems';source='namingStems';jurisdiction='WHO · INN stems';
 }
 if(options.length!==4||new Set(options).size!==4)throw new Error('Duplicate naming choices: '+prompt);
 return {id:'naming-generated-'+focus+'-'+randomKey,category:'naming',focus,level:Math.min(level,difficulty),topic,prompt,options,explanation,source,jurisdiction,hint:'Count the parent-chain atoms, check the highest-priority functional group and its position, or identify the exact shared drug-name stem.'};
}
