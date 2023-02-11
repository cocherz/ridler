import React from "react";

const HelpModal = () => {
  return (
    <section className="container helpModal">
      <h2> How to play</h2>
      <div className="helpSection">
            <div className="helpRow">
                <div className="tile noShrink"> R </div>
                <p className="noPadding"> Each letter for the riddle will have a cell </p>
            </div>
            <div className="helpRow">
                <div className="tile correct noShrink"> I </div>
                <p className="noPadding"> Correct letters in the correct cell are green </p>
            </div>
            <div className="helpRow">
                <div className="tile close noShrink" > D </div>
                <p className="noPadding"> Correct letters in the incorrect cell are white </p>
            </div>
        </div>
      <h3 className="center"> A new riddle with start at midnight! </h3>
    </section> 
    
  );
};

export default HelpModal;
