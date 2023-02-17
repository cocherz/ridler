import React from "react";

const Keyboard = ( {handleType}) => {
    const test = (e) => {
        const { value } = e.target;
        handleType(value);
      };
    
      const rowOneKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
      const rowTwoKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
      const rowThreeKeys = ["z", "x", "c", "v", "b", "n", "m"];
    
      return (
        <div className="keyboardContainer ">
          <div className="keyboard">
            <section className="rowOne">
              {rowOneKeys.map((value) => (
                <button className="key letterKey" key={value} value={value} id={value} onClick={test}>
                  {value.toLocaleUpperCase()}
                </button>
              ))}
            </section>
    
            <section className="rowTwo">
              {rowTwoKeys.map((value) => (
                <button className="key letterKey" key={value} value={value} id={value} onClick={test}>
                  {value.toLocaleUpperCase()}
                </button>
              ))}
            </section>
    
            <section className="rowThree">
            <button className="key actionKey bigBtn" key="Backspace" value="Backspace" onClick={test}>
                ❌
              </button>
              {rowThreeKeys.map((value) => (
                <button className="key letterKey" key={value} value={value} id={value} onClick={test}>
                  {value.toLocaleUpperCase()}
                </button>
              ))}
              <button className="key actionKey bigBtn"  key="enter" value="Enter" onClick={test}>
                ✅
              </button>
            </section>
          </div>
        </div>
  );
};

export default Keyboard