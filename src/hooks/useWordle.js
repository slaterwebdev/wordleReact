import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); 
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // object construtor function to create 6 empty arrays as this is used to create the rows later on in the code
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map(l => {
        return {key: l, color: 'grey'};
    });

    //Find green letters (Green = right letter, right place)
    formattedGuess.forEach((l, i) => {
        if(solutionArray[i] === l.key){
            formattedGuess[i].color = 'green';
            solutionArray[i] = null;
            //has to be set to null so it wont get processed again in other color checks
        }
    });

    //Find yellow letters (Yellow = right letter, wrong place)
    formattedGuess.forEach((l, i) => {
        if(solutionArray.includes(l.key) && l.color !== 'green'){
            formattedGuess[i].color = 'yellow';
            solutionArray[solutionArray.indexOf(l.key)] = null;
        }
    });

    return formattedGuess;
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
      if(currentGuess === solution){
          setIsCorrect(true)
      }
      //prevGuesses - value state creates which equals previous value within the state before its now being changed
      setGuesses((prevGuesses) => {
          let newGuesses = [...prevGuesses];
          //Spreading out previous guesses into newguesses array

          newGuesses[turn] = formattedGuess;
          return newGuesses;
      });

      setHistory((...prevHistory) => {
          return [...prevHistory, currentGuess];
      });

      setTurn((prevTurn) => {
          return prevTurn + 1;
      });

      setUsedKeys(prevUsedKeys => {
          formattedGuess.forEach((l) => {
            const currentColor = prevUsedKeys[l.key];
            
                if(l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return
                }

                if(l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow'
                    return
                }

                if(l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey'
                    return
                }
          });
          console.log(prevUsedKeys);
          return prevUsedKeys;
      });
      setCurrentGuess('');
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {

      if (key === 'Enter') {
          if (turn > 5) {
            console.log(`You've used all your turns`);
            return
          }

          if (history.includes(currentGuess)) {
            console.log('You already tried that one');
            return
          }

          if (currentGuess.length !== 5) {
            console.log('Guess must be 5 chars long');
            return
          }

         const formatted =  formatGuess();
         addNewGuess(formatted);
      }

      if (key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1))
      }

      //Regex pattern to allow only one lettered keys through
      const regex = /^[A-Za-z]$/;

      if (regex.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key)
        }
      }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle