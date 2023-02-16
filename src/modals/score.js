import React from "react";

const Score = ({ hours, minutes, seconds, milliseconds, guessesCount }) => {
  return (
    <div>
      <div>
        <div className="correctStats">
          <span className="b ">Your Score:</span>
          <div className="timeContainer">
            <span className="largeTxt b">
              {hours}:{minutes}:{seconds}
            </span>
            .<span className="b">{milliseconds}</span>
          </div>
          <div className="guessesContainer">
            <span className="largeTxt b">{guessesCount} </span>
            <span className="b">{guessesCount > 1 ? "Guesses" : "Guess"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Score;
