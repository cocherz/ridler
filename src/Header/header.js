import {React, useState} from "react";
import HelpModal from "../modals/help";

const Header = () => {

    const [showHelpModal, setShowHelpModal] = useState(false)

    function handleClick() {
        setShowHelpModal(showHelpModal => !showHelpModal)
    } 

  return (
    <section>

    <div className="header"> 
      <h1 className="title noPad"> RIDLr.</h1> 
        <div className="helpIcon"> 
              <button className='' onClick={handleClick}>ℹ️</button>
        </div>

    </div>
     {showHelpModal ? ( 
     <div> 
        <HelpModal /> 
        <div className="backdrop" onClick={handleClick} /> 
        
     </div>
    )
     
 : null}
   </section>
    );
};

export default Header;