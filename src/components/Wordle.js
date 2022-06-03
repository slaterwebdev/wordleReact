import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";


export default function Wordle ({solution}) {
    //Directly destructuring the solution prop so props.solution = solution
    const {currentGuess, handleKeyup, guesses, isCorrect, turn} = useWordle(solution);
    useEffect(() => {
        window.addEventListener('keyup' , handleKeyup);

        return () => window.removeEventListener('keyup' , handleKeyup);
    });

    useEffect(() => {
        console.log(guesses, turn, isCorrect);
    }, [isCorrect, turn, guesses]);

    return ( 
        <div>
            <div>Solution - {solution}</div>
            <div>Wordle - {currentGuess}</div>

            <Grid currentGuess={currentGuess} turn={turn} guesses={guesses} ></Grid>            
        </div>
     );
};