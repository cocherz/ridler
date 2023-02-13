import React from "react";
import Share from "../share/share";

const Correct = ({ elapsedTime, guessesCount, q }) => {
  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
      <h2> Correct!</h2>
      <p className="center"> <strong> {q} </strong></p>
      
      <div className="correctStats">
        <div className="secondsContainer">
          <h4>{Math.round(elapsedTime * 10) / 10 }</h4>
          <h5>Seconds</h5>
        </div>
        <div className="guessesContainer">
          <h4>{guessesCount}</h4>
          <h5>{guessesCount > 1 ? "Guesses" : "Guess"}</h5>
        </div>
      </div>
      
      
      <p className="center"> <strong> Come back tomorrow for a new riddle. <br/> <br/>  Share on social: </strong></p>
      <Share />
      <button onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </section>
    </div>
  );
};

export default Correct;
