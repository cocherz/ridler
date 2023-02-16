import React from "react";


const TodaysRiddle = ({q}) => {

    return (
        <div > 
        <span className='b bLowMarg' >Today's riddle:</span>
        <p className="focus lh tbLowMarg"> {q} </p>
      </div>
    )
}
export default TodaysRiddle;