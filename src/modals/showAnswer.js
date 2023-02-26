import React, { useState } from "react";


const ShowAnswer = ({a}) => {
const [showAnswer, setShowAnswer] = useState(false)


const toggleAnswer = () => {
    setShowAnswer(true)
    setTimeout(() => {
        setShowAnswer(false);
      }, 3000);
}

return (
        <button onClick={toggleAnswer} > 
        <p className="focus lh tbLowMarg b"> { showAnswer ? a : "Show answer"} </p> 

      </button>
    )
}
export default ShowAnswer;