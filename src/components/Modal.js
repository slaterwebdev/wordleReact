const Modal = ({ isCorrect, turn, solution }) => {

    const startNewGame = () => {
        window.location.reload()
    };

    return ( 
        <div className="modal" onClick={startNewGame}>
            {isCorrect && 
              <div>
                  <h1>You Won!</h1>
                  <p className="solution">Solution: {solution}</p>
                  <p>You found the answer in {turn} guesses!</p>
              </div>
            }
            {!isCorrect && 
              <div>
                  <h1>You Lost!</h1>
                  <p className="solution">Solution: {solution}</p>
                  <p>Nevermind, Better luck next time!</p>
              </div>
            }
        </div>
     );
}
 
export default Modal;