import React from 'react';
import Share from '../share/share';
import TodaysRiddle from './todaysRidle';
import ShowAnswer from './showAnswer';

const Wrong = ({q, a}) => {

  return (
    <div> 
    <div className="backdrop" />
    <section className="container helpModal mw500">
          <h2> Not today...</h2>
          <TodaysRiddle q={q} />
          <ShowAnswer a={a}/>
          <Share />
        </section>
        </div>
  );
};

export default Wrong;