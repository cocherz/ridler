import React from "react";


const HelpModal = () => {
  return (
    <section className="container helpModal mw500">
      <h2> How to play</h2>
      <div className="helpSection">
      <span className="center"> You have 3 attempts to guess the riddle </span>
            <div className="helpRow">
                <div className="tile noShrink darkBG"> R </div>
                <p className="noPadding leftAlign"> Enter your answer into the cells </p>
            </div>
            <div className="helpRow">
                <div className="tile correct noShrink"> I </div>
                <p className="noPadding leftAlign"> Correct letters submitted into the correct cell turn green </p>
            </div>
            <div className="helpRow">
                <div className="tile close noShrink" > D </div>
                <p className="noPadding leftAlign"> Correct letters submitted into the <b>INCORRECT</b> cell turn white </p>
            </div>
        </div>
        <span className="center lowMarg"> You will be scored on your time and how many guesses you use to answer the Riddle </span>
      <h3 className="center"> A new riddle every day </h3>
    </section> 
    
  );
};

export default HelpModal;
