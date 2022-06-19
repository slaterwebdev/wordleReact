import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";


export default function Wordle ({solution}) {
    //Directly destructuring the solution prop so props.solution = solution
    const {currentGuess, handleKeyup, guesses, isCorrect, usedKeys, turn} = useWordle(solution);
    const [showModal, setShowModal] = useState(false);
    const [showRules, setShowRules] = useState(true);

    useEffect(() => {
        window.addEventListener('keyup' , handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup' , handleKeyup);
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup' , handleKeyup);
        }
        
        return () => window.removeEventListener('keyup' , handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    useEffect(() => {
    }, [isCorrect, turn, guesses]);

    const closeRules = () => {
        setShowRules(false);
    };

    return ( 
        <div>
            {!showRules &&
            <div>
                <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} ></Grid>   
                <Keypad usedKeys={usedKeys} />         
                {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
            </div>
            }
            {showRules &&
            <div className="modal" onClick={closeRules}>
                <div>
                  <p className="close-modal" onClick={closeRules} >X</p>
                  <h1>Rules!</h1>
                  <p>Try to guess the 5 letter words in only 6 turns.</p>
                  <br></br>
                  <p>Simply start typing to input a guess</p>
                  <br></br>
                  <p><span className="green-rule">Green</span> - Right letter in the right place.</p>
                  <p><span className="yellow-rule" >Yellow</span> - Right letter in the wrong place.</p>
                  <p><span className="grey-rule" >Grey</span> - Wrong letter.</p>
                  <br></br>
                  <p>Refresh the page to start the game again.</p>
                  <p>Oh and you can't enter the same guess twice!</p>
                </div>
            </div>
            }
        </div>
     );
};