import React from 'react';
import Share from '../share/share';


const Wrong = ({q}) => {

  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
          <h2> Not today...</h2>
          <span className="center riddleSpan"> Todays riddle: {q} </span>
          <Share />
        </section>
        </div>
  );
};

export default Wrong;