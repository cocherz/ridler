import React from "react";


const HelpModal = () => {
  return (
    <section className="container helpModal mw500">
      <h2> How to play</h2>
      <div className="helpSection">
      <span className="center"> You have three chances to guess the riddle and each letter of the answer will go into a separate cell.</span>
            <div className="helpRow">
                <div className="tile noShrink darkBG"> R </div>
                <p className="noPadding leftAlign"> Type your answer into the cells provided.

</p>
            </div>
            <div className="helpRow">
                <div className="tile correct noShrink"> I </div>
                <p className="noPadding leftAlign"> If you put a correct letter in the correct cell, it will turn green.  </p>
            </div>
            <div className="helpRow">
                <div className="tile close noShrink" > D </div>
                <p className="noPadding leftAlign">  If you put a correct letter in the wrong cell, it will turn white. </p>
            </div>
        </div>
        <span className="center lowMarg"> Your score will depend on how quickly you answer the riddle and how many guesses you use.</span>
      <h3 className="center"> There's a new riddle every day </h3>
    </section> 
    
  );
};

export default HelpModal;
