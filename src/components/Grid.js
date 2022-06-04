import Row from "./Row";

const Grid = ({ currentGuess, turn, guesses }) => {
    return ( 
        <div>
            {//Generating content based on data - Now only one component is needed to show 6 more within it dynamically created.
            
            guesses.map((g, i) => {
                if(turn === i) {
                    return <Row key={i} currentGuess={currentGuess}  />
                }
                return <Row key={i} guess={g} />
            })}
        </div>
     );
}
 
export default Grid;
