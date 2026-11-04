import { NAMING_QUESTIONS } from './naming-questions.js?v=20261104-labels';
// Randomized practice is drawn exclusively from the same real-label question bank as curated rounds.
export function makeNamingGeneratedQuestion(settings,rng=Math.random) {
 const focus=settings.namingFocus&&settings.namingFocus!=='all'?settings.namingFocus:'all';
 const level=Number(settings.difficulty)||1;
 const pool=NAMING_QUESTIONS.filter(q=>q.level<=level&&(focus==='all'||q.focus===focus));
 if(!pool.length)throw new Error('No matching pharmaceutical label questions');
 const choice=pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];
 return {...choice,id:'naming-random-'+choice.id+'-'+Math.floor(rng()*1000000000)+'-'+Math.floor(rng()*1000000000)};
}
