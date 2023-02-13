import React from 'react';
import Share from '../share/share';


const Wrong = () => {

  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
          <h2> Not today...</h2>
          <p className="center">Come back tomorrow for a new riddle. or share this with a mate or something...</p>
          <Share />
          <button onClick={() => localStorage.clear() + window.location.reload()}> <span> Try again  </span> </button>
        </section>
        </div>
  );
};

export default Wrong;