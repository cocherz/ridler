import React from "react";

function Game( {guesses, currentGuess, solution}) {
 

    function Line({ guesses, row, guess, isFinal, solution, currentGuess }) {
        const tiles = [];
        for (let i = 0; i < solution.length; i++) {
          const char = guess[i];
      
          let className = `tile`;
      
          if (isFinal) {
            if (char === solution[i]) {
              className += " correct";
            } else if (solution.includes(char)) {
              className += " close shake";
            } else {
              className += " incorrect shake";
            }
          }
      
          if (currentGuess.length === i && row === guesses.filter((entry) => entry !== null).length) {
            className += " flash";
          }
      
          tiles.push(
            <div className={className} row={row} col={i} key={i}>
              {" "}
              {char}
            </div>
          );
        }
        return <div className="line"> {tiles}</div>;
      }
    return (
        <section className="game">
          <div className="board">
            {guesses.map((guess, i) => {
              const isCurrentGuess = i === guesses.findIndex((val) => val == null);
              return (
                <Line guess={isCurrentGuess ? currentGuess : guess ?? ""} isFinal={!isCurrentGuess && guess != null} solution={solution} currentGuess={currentGuess} guesses={guesses} row={i} key={i} />
              );
            })}
          </div>
        </section>
      );
}







export default Game;

