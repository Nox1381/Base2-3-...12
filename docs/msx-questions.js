// MSX BASIC 1 question expansion. Correct answer is always first; engine shuffles choices.
const msxQ = (id, level, topic, prompt, code, correct, a, b, c, explanation) => ({
  id: 'msx-extra-' + id, category: 'msx', level, topic, prompt, code,
  options: [correct, a, b, c], explanation, source: 'msx',
});
export const MSX_QUESTIONS = [
  msxQ('print',1,'PRINT','What appears on screen?', '10 PRINT "MSX"\n20 END', 'MSX','10 MSX','"MSX"','Nothing','PRINT displays the string without quotation marks.'),
  msxQ('colon',1,'Statements','How many numbers does this one numbered program line print?', '10 PRINT 2:PRINT 4:PRINT 6\n20 END', '3','1','2','6','A colon separates three statements on one numbered line.'),
  msxQ('add',1,'Arithmetic','What does BASIC print?', '10 A=7:B=5\n20 PRINT A+B', '12','75','2','35','+ adds numeric variables.'),
  msxQ('times',1,'Arithmetic','What does BASIC print?', '10 A=3\n20 PRINT A*4', '12','34','7','0','The multiplication operator in BASIC is *.'),
  msxQ('division',1,'Arithmetic','What is the numerical result?', '10 PRINT 10/2', '5','20','12','2','The slash divides the left numeric operand by the right.'),
  msxQ('precedence',1,'Arithmetic','What is printed?', '10 PRINT 2+3*4', '14','20','24','9','Multiplication happens before addition.'),
  msxQ('parentheses',1,'Arithmetic','What is printed?', '10 PRINT (2+3)*4', '20','14','24','9','Parentheses force the addition first.'),
  msxQ('first-loop',1,'FOR / NEXT','How many times does HELLO appear?', '10 FOR I=1 TO 4\n20 PRINT "HELLO"\n30 NEXT I', '4','3','5','1','The ending value in FOR is inclusive.'),
  msxQ('zero-loop',1,'FOR / NEXT','What is the first number printed?', '10 FOR I=0 TO 3\n20 PRINT I\n30 NEXT I', '0','1','3','4','FOR starts at its specified initial value.'),
  msxQ('assign',1,'Variables','What is the value printed?', '10 X=2\n20 X=X+3\n30 PRINT X', '5','2','3','6','The assignment updates X using its previous value.'),
  msxQ('semicolon',1,'Formatting','What does the semicolon do in this code?', '10 PRINT "HEL";"LO"', 'Print HELLO without a line break between parts','Print HEL and LO on different lines','Start a comment','Erase the screen','A semicolon in PRINT joins output fields without an inserted newline.'),
  msxQ('remark',1,'REM','Which line is a comment?', '10 REM SHOW THE SCORE\n20 PRINT 5', '10 REM SHOW THE SCORE','20 PRINT 5','Both execute as printing','Neither','REM introduces a comment; it does not display text.'),
  msxQ('end',1,'Program control','What appears?', '10 PRINT "A"\n20 END\n30 PRINT "B"', 'A only','A and B','B only','Nothing','END stops execution before line 30.'),
  msxQ('if-true',1,'IF / THEN','Which word is displayed?', '10 N=9\n20 IF N>5 THEN PRINT "BIG" ELSE PRINT "SMALL"', 'BIG','SMALL','9','Both','9 is greater than 5, so the THEN branch executes.'),
  msxQ('if-false',1,'IF / THEN','Which word appears?', '10 N=3\n20 IF N>=5 THEN PRINT "GO" ELSE PRINT "WAIT"', 'WAIT','GO','3','Nothing','3 does not satisfy the >= comparison.'),
  msxQ('goto',1,'GOTO','What is printed?', '10 GOTO 30\n20 PRINT "NO"\n30 PRINT "YES"\n40 END', 'YES','NO','NO then YES','Nothing','GOTO branches to the numbered line.'),
  msxQ('strings',1,'Strings','Which variable holds text?', '10 A$="RADIX"\n20 PRINT A$', 'A$','A','A%','RADIX$','The $ suffix denotes a string variable.'),
  msxQ('screen',1,'MSX screen modes','Which command selects the 40-column text screen used in these challenges?', '10 SCREEN 0:WIDTH 40', 'SCREEN 0','SCREEN 2','SCREEN 3','SCREEN 1','SCREEN 0 is the MSX text screen; WIDTH sets its columns.'),
  msxQ('step',2,'FOR / NEXT','Which sequence prints?', '10 FOR I=2 TO 8 STEP 2\n20 PRINT I\n30 NEXT I', '2, 4, 6, 8','2, 3, 4, 5, 6, 7, 8','2, 4, 6','8, 6, 4, 2','STEP 2 increments the loop variable by two, including 8.'),
  msxQ('reverse',2,'FOR / NEXT','Which output is correct?', '10 FOR I=5 TO 1 STEP -2\n20 PRINT I\n30 NEXT I', '5, 3, 1','5, 4, 3, 2, 1','1, 3, 5','5 only','Negative STEP counts down: 5, 3, 1.'),
  msxQ('counter',2,'Accumulator','What is the final value?', '10 S=0\n20 FOR I=1 TO 3\n30 S=S+I\n40 NEXT I\n50 PRINT S', '6','3','4','0','1 + 2 + 3 accumulates to 6.'),
  msxQ('read',2,'DATA / READ','What is printed?', '10 DATA 8,13\n20 READ A,B\n30 PRINT B-A', '5','21','8','13','READ takes successive DATA entries into A then B.'),
  msxQ('restore',2,'DATA / RESTORE','What is printed?', '10 DATA 4,9\n20 READ A,B\n30 RESTORE\n40 READ C\n50 PRINT C', '4','9','13','0','RESTORE resets the DATA pointer; READ starts from its first item.'),
  msxQ('sub',2,'GOSUB / RETURN','What is printed?', '10 X=5\n20 GOSUB 100\n30 PRINT X\n40 END\n100 X=X*2\n110 RETURN', '10','5','20','0','GOSUB invokes a subroutine, which changes X before returning.'),
  msxQ('nested',2,'Nested loops','How many stars print?', '10 FOR I=1 TO 2\n20 FOR J=1 TO 3\n30 PRINT "*"\n40 NEXT J\n50 NEXT I', '6','5','3','2','The inner loop runs three times for each of two outer iterations.'),
  msxQ('left',2,'String slicing','What is printed?', '10 PRINT LEFT$("RADIX",2)', 'RA','DI','RADI','AX','LEFT$ extracts two characters from the left.'),
  msxQ('right',2,'String slicing','What is printed?', '10 PRINT RIGHT$("COMPUTER",3)', 'TER','COM','PUT','ER','RIGHT$ returns the final three characters.'),
  msxQ('mid',2,'String slicing','What is printed?', '10 PRINT MID$("RADIX",2,3)', 'ADI','RAD','DIX','ADI X','MID$ starts at 1-based position 2 and takes three characters.'),
  msxQ('length',2,'String length','What number is printed?', '10 PRINT LEN("BASIC")', '5','4','6','0','LEN returns the length of a string.'),
  msxQ('ascii',2,'Character codes','What is printed?', '10 PRINT ASC("A")', '65','64','97','1','ASC returns the character code of A (65).'),
  msxQ('chr',2,'Character codes','What does the code print?', '10 PRINT CHR$(66)', 'B','A','66','C','CHR$ converts the ASCII code 66 to the character B.'),
  msxQ('int',2,'Numeric functions','What is printed?', '10 PRINT INT(8/3)', '2','3','2.67','8','INT rounds down to the nearest integer.'),
  msxQ('mod',2,'Remainders','Which value is printed?', '10 PRINT 17 MOD 5', '2','3','5','12','MOD returns the remainder after integer division.'),
  msxQ('dim',2,'Arrays','What is the final output?', '10 DIM A(3)\n20 A(1)=5:A(2)=7\n30 PRINT A(1)+A(2)', '12','2','7','0','Array indices reference different values; DIM reserves array elements.'),
  msxQ('swap',2,'Variables','What is printed?', '10 A=2:B=9\n20 T=A:A=B:B=T\n30 PRINT A;B', '9 then 2','2 then 9','9 then 9','2 then 2','T temporarily preserves A while the two variables exchange values.'),
  msxQ('and',2,'Boolean operators','Will the program print OK?', '10 A=1:B=0\n20 IF A=1 AND B=1 THEN PRINT "OK" ELSE PRINT "NO"', 'No; it prints NO','Yes; it prints OK','It prints 1','It prints 0','Both parts of AND must be true.'),
  msxQ('or',2,'Boolean operators','What is printed?', '10 A=1:B=0\n20 IF A=1 OR B=1 THEN PRINT "YES" ELSE PRINT "NO"', 'YES','NO','1','0','OR needs at least one true condition.'),
  msxQ('on-goto',3,'ON GOTO','Where does execution jump?', '10 N=2\n20 ON N GOTO 100,200,300\n30 END\n100 PRINT "A":END\n200 PRINT "B":END\n300 PRINT "C":END', 'Line 200; it prints B','Line 100; it prints A','Line 300; it prints C','Line 30; no output','ON N GOTO picks the Nth line from the target list.'),
  msxQ('on-gosub',3,'ON GOSUB','What is printed?', '10 N=1\n20 ON N GOSUB 100,200\n30 PRINT "END":END\n100 PRINT "ONE":RETURN\n200 PRINT "TWO":RETURN', 'ONE then END','TWO then END','ONE only','END only','The first subroutine is called, then RETURN resumes at line 30.'),
  msxQ('nested-acc',3,'Nested loops','What total is printed?', '10 S=0\n20 FOR I=1 TO 3\n30 FOR J=1 TO 2\n40 S=S+I\n50 NEXT J:NEXT I\n60 PRINT S', '12','6','9','3','Each I is added twice, so 2 × (1+2+3) = 12.'),
  msxQ('restore-line',3,'RESTORE line','What is printed?', '10 DATA 2,3\n20 DATA 7,8\n30 RESTORE 20\n40 READ A,B\n50 PRINT A+B', '15','5','10','7','RESTORE 20 positions the DATA pointer at the statement on line 20.'),
  msxQ('integer-overflow',3,'MSX numeric types','Which declaration represents an integer typed variable?', '10 X%=120', 'X%','X$','X!','X#','The % suffix denotes a 16-bit integer variable in MSX BASIC.'),
  msxQ('hex',3,'Hexadecimal','What value is printed in decimal?', '10 PRINT &H10+2', '18','12','16','258','&H10 is hexadecimal 16; 16 + 2 = 18.'),
  msxQ('binary',3,'Number constants','What is printed?', '10 PRINT &B1010', '10','1010','12','5','&B introduces a binary integer literal: 1010₂ is ten.'),
  msxQ('octal',3,'Octal constants','What is printed?', '10 PRINT &O17', '15','17','8','7','&O17 is octal 17, equal to 1×8 + 7 = 15.'),
  msxQ('xor',3,'Bitwise logic','What is printed?', '10 PRINT 5 XOR 3', '6','7','1','2','0101 XOR 0011 = 0110, decimal 6.'),
  msxQ('mask',3,'Bitwise logic','What is printed?', '10 PRINT 12 AND 10', '8','14','2','6','1100 AND 1010 leaves 1000 (decimal 8).'),
  msxQ('not-equals',3,'Conditional logic','Which word appears?', '10 X=5\n20 IF X<>4 THEN PRINT "DIFFERENT" ELSE PRINT "SAME"', 'DIFFERENT','SAME','5','Neither','<> means not equal.'),
  msxQ('while',3,'WHILE / WEND','Which final output does this loop produce?', '10 N=1\n20 WHILE N<5\n30 N=N*2\n40 WEND\n50 PRINT N', '8','4','5','16','N goes 1→2→4→8; the loop exits when N is not below 5.'),
  msxQ('def-fn',3,'Functions','What is printed?', '10 DEF FNA(X)=X*X+1\n20 PRINT FNA(4)', '17','16','9','5','DEF FN creates a user-defined expression; 4²+1 = 17.'),
  msxQ('string-array',3,'Arrays','What appears?', '10 DIM N$(2)\n20 N$(0)="RED":N$(1)="BLUE"\n30 PRINT N$(1)', 'BLUE','RED','0','1','String arrays use the $ suffix; element 1 contains BLUE.'),
  msxQ('instr',3,'String search','What is printed?', '10 PRINT INSTR("RADIX","DI")', '3','2','4','0','INSTR returns the 1-based start position of DI in RADIX.'),
  msxQ('val',3,'String conversion','What is printed?', '10 PRINT VAL("12")+3', '15','123','3','12','VAL converts a numeric string to a number before arithmetic.'),
  msxQ('str',3,'String conversion','Which function converts a numeric value into a string?', '10 A$=STR$(42)', 'STR$','VAL','ASC','CHR$','STR$ converts numbers to text (formatting may include a leading sign space).'),
  msxQ('gosub-math',3,'Subroutine side-effects','What does this program print?', '10 A=1\n20 FOR I=1 TO 3\n30 GOSUB 100\n40 NEXT I\n50 PRINT A:END\n100 A=A*2:RETURN', '8','4','6','16','Each GOSUB doubles A: 1→2→4→8.'),
  msxQ('sprite',3,'MSX sprites','Which command writes an eight-byte pattern to sprite pattern 0?', '10 SPRITE$(0)=CHR$(&HFF)+STRING$(7,CHR$(0))', 'SPRITE$(0)=...','SCREEN 0','COLOR 15','LOCATE 0,0','SPRITE$ is the pattern-string array; eight bytes describe an 8×8 sprite pattern.'),
  msxQ('screen2',3,'MSX graphics','Which screen mode provides 256×192 pattern graphics with sprites on MSX1?', '10 SCREEN 2', 'SCREEN 2','SCREEN 0','SCREEN 3','WIDTH 40','MSX1 SCREEN 2 is the high-resolution pattern-based graphics mode.'),
];
const msxPick = (xs, rng) => xs[Math.min(xs.length - 1, Math.floor(rng() * xs.length))];
export function makeMsxGeneratedQuestion(settings, rng = Math.random) {
  const level = Number(settings.difficulty) || 1;
  const types = level === 1 ? ['loop', 'compare', 'math'] : level === 2 ? ['step', 'read', 'mid', 'loop', 'compare', 'math'] : ['branch', 'subroutine', 'nested', 'step', 'read', 'mid'];
  const type = msxPick(types, rng);
  const n = 2 + Math.floor(rng()*7), m = 1 + Math.floor(rng()*5);
  let code, prompt, answer, distractors, explanation;
  if (type === 'loop') {
    code = `10 FOR I=1 TO ${n}\n20 PRINT I\n30 NEXT I`; prompt = 'How many numbers does the program print?'; answer = String(n); distractors = [String(n-1), String(n+1), String(n*2)]; explanation = 'FOR includes both endpoints: 1 through ' + n + '.';
  } else if (type === 'compare') {
    code = `10 X=${n}\n20 IF X>=${m} THEN PRINT "READY" ELSE PRINT "WAIT"`; prompt = 'What word is printed?'; answer = n>=m?'READY':'WAIT'; distractors = [n>=m?'WAIT':'READY',String(n),'Nothing']; explanation = 'Evaluate the >= comparison before choosing THEN or ELSE.';
  } else if (type === 'math') {
    code = `10 A=${n}:B=${m}\n20 PRINT A*B+2`; prompt = 'What value is printed?'; answer = String(n*m+2); distractors = [String(n*(m+2)), String(n+m+2), String(n*m)]; explanation = 'Multiply A by B before adding 2.';
  } else if (type === 'step') {
    code = `10 FOR I=${m} TO ${m+2*n} STEP 2\n20 PRINT I\n30 NEXT I`; prompt = 'How many lines of numbers are printed?'; answer = String(n+1); distractors = [String(n),String(2*n),String(2*n+1)]; explanation = 'The inclusive loop visits ' + (n+1) + ' values.';
  } else if (type === 'read') {
    code = `10 DATA ${n},${m}\n20 READ A,B\n30 RESTORE\n40 READ C\n50 PRINT B+C`; prompt = 'What number is printed?'; answer = String(n+m); distractors = [String(n*2),String(m*2),String(n)]; explanation = 'RESTORE resets to the first DATA item, so C equals A.';
  } else if (type === 'mid') {
    const words = ['RADIX','BASIC','PIXEL','SOUND','SPRITE']; const word=msxPick(words,rng);
    code = `10 PRINT MID$("${word}",2,${m>3?3:m})`; prompt = 'What exactly is printed?'; const width=m>3?3:m; answer=word.slice(1,1+width); distractors = [word.slice(0,width),word.slice(-width),word.slice(1,2) + 'X'];
    explanation='MID$ uses 1-based character positions; position 2 begins at the second letter.';
  } else if (type === 'branch') {
    code = `10 A=${n}\n20 ON 2 GOSUB 100,200\n30 PRINT A:END\n100 A=A+1:RETURN\n200 A=A*${m}:RETURN`; prompt='What final number does PRINT display?'; answer=String(n*m); distractors=[String(n+1),String(n*m+1),String(n)]; explanation='ON 2 GOSUB calls line 200, which multiplies A by ' + m + '.';
  } else if (type === 'subroutine') {
    code = `10 X=${m}\n20 FOR I=1 TO ${n}\n30 GOSUB 100\n40 NEXT I\n50 PRINT X:END\n100 X=X+2:RETURN`; prompt='What is the final value of X?'; answer=String(m+2*n); distractors=[String(m+n),String(2*n),String(m+2*(n-1))]; explanation='The subroutine adds two exactly ' + n + ' times.';
  } else {
    code = `10 S=0\n20 FOR I=1 TO ${n}\n30 FOR J=1 TO ${m}\n40 S=S+1\n50 NEXT J:NEXT I\n60 PRINT S`; prompt='What final count is printed?'; answer=String(n*m); distractors=[String(n+m),String(n*m+1),String(n)]; explanation='Each of the ' + n + ' outer iterations runs the inner loop ' + m + ' times.';
  }
  // Prevent any duplicate answer options for special operand combinations.
  const options = [answer, ...distractors.filter(x => x !== answer)].filter((x, index, all) => all.indexOf(x) === index);
  for (let k = 1; options.length < 4; k++) { const v = String(Number(answer) + 10*k); if (!options.includes(v)) options.push(v); }
  return {
    id: 'msx-generated-' + type + '-' + n + '-' + m + '-' + code,
    category: 'msx', level: type === 'branch' || type === 'subroutine' || type === 'nested' ? 3 : type === 'step' || type === 'read' || type === 'mid' ? 2 : 1,
    topic: 'MSX BASIC · ' + type, prompt, code, options: options.slice(0,4), explanation, source: 'msx',
  };
}
