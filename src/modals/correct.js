import React from "react";
import Share from "../share/share";

const Correct = ({ elapsedTime, guessesCount }) => {
  return (
    <section className="container">
      <h2> Correct!</h2>
      <h4>
        You guessed correctly in {Math.round(elapsedTime * 10) / 10} seconds and {guessesCount} {guessesCount > 1 ? "guesses" : "guess!"}
      </h4>
      <p className="center">Come back tomorrow for a new riddle... or share this with a mate or something in the meantime...</p>
      <Share />
      <button onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </section>
  );
};

export default Correct;
