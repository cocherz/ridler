import React from 'react';
import Share from '../share/share';
import TodaysRiddle from './todaysRidle';

const Wrong = ({q}) => {

  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
          <h2> Not today...</h2>
          <TodaysRiddle q={q} />
          <Share />
        </section>
        </div>
  );
};

export default Wrong;