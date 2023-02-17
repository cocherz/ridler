import React from "react";
import Share from "../share/share";
import TodaysRiddle from "./todaysRidle";
import Score from "./score";

const Correct = ({ elapsedTime, guessesCount, q }) => {
  function convertElapsedTime(elapsedTime) {
    const seconds = Math.floor(elapsedTime % 60);
    const minutes = Math.floor(elapsedTime / 60);
    const hours = Math.floor(minutes / 60);
    const milliseconds = Math.round((elapsedTime - Math.floor(elapsedTime)) * 1000 / 60) ;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0')
    };
  }  
  
  
  const { hours, minutes, seconds, milliseconds } = convertElapsedTime(
    parseFloat(elapsedTime)
  );

    console.log(elapsedTime)

  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
      <h2> Correct!</h2>
      <TodaysRiddle q={q}/> 
      <Score hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds} guessesCount={guessesCount}/>
      <Share />
    </section>
    </div>
  );
};

export default Correct;
