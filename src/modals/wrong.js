import React from 'react';
import Share from '../share/share';


const Wrong = () => {

  return (
    <section className="container">
          <h2> Not today...</h2>
          <p className="center">Come back tomorrow for a new riddle. or share this with a mate or something...</p>
          <Share />
          <button onClick={() => localStorage.clear() + window.location.reload()}> <span> Try again  </span> Try again </button>
        </section>
  );
};

export default Wrong;