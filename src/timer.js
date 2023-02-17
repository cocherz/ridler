import React from "react";
import { useState, useEffect } from "react";

function Timer() {
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  

  const handleStop = () => {
    setEndTime(Date.now());
  };

  useEffect(() => {
    if (startTime && endTime) {
      setElapsedTime((endTime - startTime) / 1000);
    }
  }, [startTime, endTime]);

  return (
    <div>
      
      {startTime && !endTime && <button onClick={handleStop}>Stop</button>}
      {elapsedTime !== 0 && (
        <p>Elapsed time: {elapsedTime} seconds</p>
      )}
    </div>
  );
}

export default Timer;

