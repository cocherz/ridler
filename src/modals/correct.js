import React from "react";
import Share from "../share/share";






const Correct = ({ elapsedTime, guessesCount, q }) => {
  function convertElapsedTime(elapsedTime) {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 60) / 60);
    const seconds = Math.floor(elapsedTime % 60);
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


  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
      <h2> Correct!</h2>
      <h5 className="lowMarg" >Todays riddle:</h5>
      <span className="center riddleSpan back"> {q} </span>
      
      <div className="correctStats">
        <h5 className="lowMarg" >Your Score:</h5>
        <div className="timeContainer">
          <span className="largeTxt b">{hours}:{minutes}:{seconds}</span>.<span className="b">{milliseconds}</span>
        </div>
        <div className="guessesContainer">
        <span className="largeTxt b">{guessesCount} </span><span className="b">{guessesCount > 1 ? "Guesses" : "Guess"}</span>
        </div>  
      
      
      
      </div>     
      


      <Share />
    </section>
    
    </div>
  );
};

export default Correct;
