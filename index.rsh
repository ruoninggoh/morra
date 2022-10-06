'reach 0.1';

const [ isFingers, ZERO, ONE, TWO, THREE, FOUR, FIVE ] = makeEnum(6);
const [ isGuess, ZEROO, ONEO, TWOO, THREEO, FOURO, FIVEO, SIXO, SEVENO, EIGHTO, NINEO, TENO ] = makeEnum(11);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);


const winner = (fingersA, fingersB, guessA, guessB) => { 
  if ( guessA == guessB ) 
   {
    const myoutcome = DRAW; 
    return myoutcome;
}
 else {
  if ( ((fingersA + fingersB) == guessA ) ) {
    const myoutcome = A_WINS;
    return myoutcome;
  } 
    else {
      if (  ((fingersA + fingersB) == guessB)) {
        const myoutcome = B_WINS;
        return myoutcome;
    } 
      else {
        const myoutcome = DRAW; 
        return myoutcome;
      }
    
    }
  }
};


assert(winner(ZERO,TWO,ZEROO,TWOO)== B_WINS);
assert(winner(TWO,ZERO,TWOO,ZEROO)== A_WINS);
assert(winner(ZERO,ONE,ZEROO,TWOO)== DRAW);
assert(winner(ONE,ONE,ONEO,ONEO)== DRAW);

forall(UInt, fingersA =>
  forall(UInt, fingersB =>
    forall(UInt, guessA =>
      forall(UInt, guessB =>
    assert(isOutcome(winner(fingersA, fingersB, guessA, guessB)))))));

forall(UInt, (fingerA) =>
  forall(UInt, (fingerB) =>       
    forall(UInt, (guess) =>
      assert(winner(fingerA, fingerB, guess, guess) == DRAW))));    

const Player =
      { ...hasRandom,
        getClaw: Fun([], UInt),
        getGuess: Fun([], UInt),
        seeOutcome: Fun([UInt], Null) ,
        informTimeout: Fun([], Null)
       };
  
const Alice =
        { ...Player,
          wager: UInt, 
          deadline: UInt,
        };
const Bob =
        { ...Player,
          acceptWager: Fun([UInt], Null),          
        };


export const main=
  Reach.App(
    {},
    [Participant('Alice', Alice), Participant('Bob', Bob)],
    (A, B) => {
        const informTimeout = () => {
          each([A, B], () => {
            interact.informTimeout(); }); };
      A.only(() => {
        const wager = declassify(interact.wager);
        const deadline = declassify(interact.deadline)});

      A.publish(wager,deadline)
        .pay(wager);
      commit();   

      B.only(() => {
        interact.acceptWager(wager); });
      B.pay(wager)
        .timeout(relativeTime(deadline), () => closeTo(A, informTimeout));

      var outcome = DRAW;      
      invariant(balance() == 2 * wager && isOutcome(outcome) );
  
      while ( outcome == DRAW ) {
        commit();
        A.only(() => {    
          const _fingersA = interact.getClaw();
          const _guessA = interact.getGuess(); 
          

          const [_commitA, _saltA] = makeCommitment(interact, _fingersA);
          const commitA = declassify(_commitA);        
          const [_guessCommitA, _guessSaltA] = makeCommitment(interact, _guessA);
          const guessCommitA = declassify(_guessCommitA);   
      });
     
      A.publish(commitA, guessCommitA)
      commit();

      unknowable(B, A(_fingersA, _saltA));
      unknowable(B, A(_guessA, _guessSaltA));

        B.only(() => {

          const fingersB = declassify(interact.getClaw()); 
          const guessB = declassify(interact.getGuess());  
          });

        B.publish(fingersB)
          .timeout(relativeTime(deadline), () => closeTo(A, informTimeout));
        commit();
        B.publish(guessB)
          .timeout(relativeTime(deadline), () => closeTo(A, informTimeout));
          
        commit();

        
        A.only(() => {
          const [saltA, fingersA] = declassify([_saltA, _fingersA]); 
          const [guessSaltA, guessA] = declassify([_guessSaltA, _guessA]); 

        });
        A.publish(saltA, fingersA)
          .timeout(relativeTime(deadline), () => closeTo(B, informTimeout));
          checkCommitment(commitA, saltA, fingersA);
        commit();

        A.publish(guessSaltA, guessA)
        .timeout(relativeTime(deadline), () => closeTo(B, informTimeout));
        checkCommitment(guessCommitA, guessSaltA, guessA);
      
        outcome = winner(fingersA, fingersB, guessA, guessB);
        continue; 
       
      }

      assert(outcome == A_WINS || outcome == B_WINS);
      transfer(2 * wager).to(outcome == A_WINS ? A : B);
      commit();
 
      each([A, B], () => {
        interact.seeOutcome(outcome); })
      exit(); });