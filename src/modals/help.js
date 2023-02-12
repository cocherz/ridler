import React from "react";


const HelpModal = () => {
  return (
    <section className="container helpModal mw500">
      <h2> How to play</h2>
      <div className="helpSection">
            <div className="helpRow">
                <div className="tile noShrink darkBG"> R </div>
                <p className="noPadding"> Each letter to the answer of the riddle will have its own cell </p>
            </div>
            <div className="helpRow">
                <div className="tile correct noShrink"> I </div>
                <p className="noPadding"> Correct letters submitted into the correct cell turn green </p>
            </div>
            <div className="helpRow">
                <div className="tile close noShrink" > D </div>
                <p className="noPadding"> Correct letters submitted into the <b>INCORRECT</b> cell turn white </p>
            </div>
        </div>
      <h3 className="center"> New riddles start at midnight! </h3>
    </section> 
    
  );
};

export default HelpModal;
