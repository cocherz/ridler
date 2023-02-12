import { React, useState } from "react";
import HelpModal from "../modals/help";
// import ScoreModal from "./score";

const Header = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false)

  function changeHelpModal() {
    setShowHelpModal((showHelpModal) => !showHelpModal);
  }
  function handleClick() {
    setShowScoreModal((showScoreModal) => !showScoreModal);
  }

  return (
    <section className="banner">
      <div className="header mw500 ma">
        <h1 className="title noPad"> RIDLr.</h1>
        <div className="menuOptions">
          {/* <div className="scoreIcon">
            <button className="large" onClick={handleClick}>
              ℹ️
            </button>
          </div> */}
          <div className="helpIcon">
            <button className="large" onClick={changeHelpModal}>
              ℹ️
            </button>
          </div>
        </div>
        </div>
        {/* {showScoreModal ? (
          <div> 
            <ScoreModal />
            <div className="backdrop" onClick={handleClick} />
          </div>
        ) : null} */}



        {showHelpModal ? (
          <div>
            <HelpModal />
            <div className="backdrop" onClick={changeHelpModal} />
          </div>
        ) : null}
     
    </section>
  );
};

export default Header;
