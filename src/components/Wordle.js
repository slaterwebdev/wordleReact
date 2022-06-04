import { useDebugValue, useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";


export default function Wordle ({solution}) {
    //Directly destructuring the solution prop so props.solution = solution
    const {currentGuess, handleKeyup, guesses, isCorrect, usedKeys, turn} = useWordle(solution);
    useEffect(() => {
        window.addEventListener('keyup' , handleKeyup);

        if (isCorrect) {
            window.removeEventListener('keyup' , handleKeyup);
        }

        if (turn > 5) {
            window.removeEventListener('keyup' , handleKeyup);
        }
        
        return () => window.removeEventListener('keyup' , handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    useEffect(() => {
    }, [isCorrect, turn, guesses]);

    return ( 
        <div>
            <div>Solution - {solution}</div>
            <div>Wordle - {currentGuess}</div>

            <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} ></Grid>   

            <Keypad usedKeys={usedKeys} />         
        </div>
     );
};